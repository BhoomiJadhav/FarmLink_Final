const mongoose = require("mongoose");
const Contract = require("../Models/BaseContract");
const Negotiation = require("../Models/Negotiation");
const { CONTRACT_STATUS } = require("../constants/contractEnums");
const startNegotiation = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { suggestedPrice } = req.body;

    const contract = await Contract.findById(contractId);

    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (contract.status !== CONTRACT_STATUS.SENT)
      return res.status(400).json({ message: "Not negotiable" });

    const negotiation = await Negotiation.create({
      contractId: contract._id,
      buyerId: contract.buyer.buyerId,
      farmerId: contract.farmer.farmerId,
      currentTurn: "BUYER",
      rounds: 1,
      messages: [
        {
          sender: "BUYER",
          offeredPrice: contract.pricing.agreedPricePerUnit,
          message: "Initial Offer",
        },
        {
          sender: "FARMER",
          offeredPrice: suggestedPrice,
          message: "Farmer Counter Offer",
        },
      ],
    });

    contract.status = CONTRACT_STATUS.NEGOTIATING;
    contract.negotiation = {
      negotiationId: negotiation._id,
    };

    await contract.save();

    res.json({ success: true, negotiation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getNegotiation = async (req, res) => {
  try {
    const { negotiationId } = req.params;

    const negotiation = await Negotiation.findById(negotiationId)
      .populate("buyerId", "name")
      .populate("farmerId", "name");

    if (!negotiation) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, negotiation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const counterOffer = async (req, res) => {
  try {
    const { negotiationId } = req.params;
    const { offeredPrice, userRole } = req.body;

    const negotiation = await Negotiation.findById(negotiationId);

    if (!negotiation)
      return res.status(404).json({ message: "Negotiation not found" });

    if (negotiation.status !== "ACTIVE")
      return res.status(400).json({ message: "Negotiation closed" });

    if (negotiation.currentTurn !== userRole)
      return res.status(400).json({ message: "Not your turn" });

    if (negotiation.rounds >= 3)
      return res.status(400).json({ message: "Max rounds reached" });

    negotiation.messages.push({
      sender: userRole,
      offeredPrice,
      message: "Counter Offer",
    });

    negotiation.rounds += 1;

    negotiation.currentTurn = userRole === "BUYER" ? "FARMER" : "BUYER";

    await negotiation.save();

    // Platform Midpoint Suggestion
    if (negotiation.rounds === 3) {
      const lastTwo = negotiation.messages.slice(-2);

      const midpoint = (lastTwo[0].offeredPrice + lastTwo[1].offeredPrice) / 2;

      negotiation.messages.push({
        sender: "PLATFORM",
        offeredPrice: midpoint,
        message: "Platform Suggested Midpoint Price",
      });

      negotiation.currentTurn = null;
      await negotiation.save();
    }

    res.json({ success: true, negotiation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const acceptOffer = async (req, res) => {
  try {
    const { negotiationId } = req.params;

    const negotiation = await Negotiation.findById(negotiationId);
    if (!negotiation)
      return res.status(404).json({ message: "Negotiation not found" });

    const contract = await Contract.findById(negotiation.contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (negotiation.status !== "ACTIVE")
      return res.status(400).json({ message: "Negotiation closed" });

    const lastMessage = negotiation.messages[negotiation.messages.length - 1];

    const role = req.user.role.toUpperCase();

    /* ===============================
       CASE 1: PLATFORM MIDPOINT
    =============================== */

    if (lastMessage.sender === "PLATFORM") {
      if (role === "BUYER") {
        negotiation.buyerAcceptedMidpoint = true;
      }

      if (role === "FARMER") {
        negotiation.farmerAcceptedMidpoint = true;
      }

      negotiation.messages.push({
        sender: "PLATFORM",
        message: `${role} accepted midpoint price`,
        timestamp: new Date(),
      });
      const midpointMessage = negotiation.messages.find(
        (msg) =>
          msg.sender === "PLATFORM" && typeof msg.offeredPrice === "number",
      );
      if (
        negotiation.buyerAcceptedMidpoint &&
        negotiation.farmerAcceptedMidpoint
      ) {
        negotiation.status = "AGREED";
        negotiation.finalAgreedPrice = midpointMessage?.offeredPrice;

        contract.pricing.agreedPricePerUnit = midpointMessage?.offeredPrice;

        contract.status = CONTRACT_STATUS.PENDING_SIGNATURE;

        contract.negotiation.finalPrice = midpointMessage?.offeredPrice;

        contract.negotiation.negotiationSnapshot = negotiation.messages;

        negotiation.messages.push({
          sender: "PLATFORM",
          message: "Both parties accepted midpoint. Contract finalized.",
          timestamp: new Date(),
        });
      }

      await negotiation.save();
      await contract.save();

      return res.json({ success: true });
    }

    /* ===============================
       CASE 2: NORMAL ACCEPT (NOT MIDPOINT)
    =============================== */

    if (negotiation.currentTurn !== role)
      return res.status(403).json({ message: "Not your turn" });

    negotiation.status = "AGREED";
    negotiation.finalAgreedPrice = lastMessage.offeredPrice;

    contract.pricing.agreedPricePerUnit = lastMessage.offeredPrice;

    contract.status = CONTRACT_STATUS.PENDING_SIGNATURE;

    contract.negotiation.finalPrice = lastMessage.offeredPrice;

    contract.negotiation.negotiationSnapshot = negotiation.messages;

    negotiation.messages.push({
      sender: "PLATFORM",
      message: `${role} accepted the offer. Contract finalized.`,
      timestamp: new Date(),
    });

    await negotiation.save();
    await contract.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const rejectNegotiation = async (req, res) => {
  try {
    const { negotiationId } = req.params;

    const negotiation = await Negotiation.findById(negotiationId);
    if (!negotiation) return res.status(404).json({ message: "Not found" });

    const contract = await Contract.findById(negotiation.contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (negotiation.status !== "ACTIVE")
      return res.status(400).json({ message: "Negotiation closed" });

    const role = req.user.role.toUpperCase();

    negotiation.status = "REJECTED";

    contract.status = CONTRACT_STATUS.NEGOTIATION_FAILED;

    negotiation.messages.push({
      sender: "PLATFORM",
      message: `${role} rejected the negotiation. Contract terminated.`,
      timestamp: new Date(),
    });

    await negotiation.save();
    await contract.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMyNegotiations = async (req, res) => {
  try {
    console.log("Full user:", req.user);

    const role = req.user.role?.toUpperCase();
    const userId = new mongoose.Types.ObjectId(req.user._id || req.user.id);

    const field = role === "BUYER" ? "buyerId" : "farmerId";

    const negotiations = await Negotiation.find({
      [field]: userId,
      status: "ACTIVE",
    })
      .populate("contractId")
      .sort({ updatedAt: -1 });

    res.json({ negotiations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  startNegotiation,
  getNegotiation,
  counterOffer,
  acceptOffer,
  rejectNegotiation,
  getMyNegotiations,
};
