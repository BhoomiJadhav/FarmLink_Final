const Contract = require("../Models/BaseContract.js");

const CultivationContract = require("../Models/CultivationContract");
const { CONTRACT_STATUS } = require("../constants/contractEnums");
const initializeCultivationTracking = require("../utils/initializeCultivationTracking");

const buyerSignContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const buyerId = req.user._id;

    const contract = await Contract.findOne({
      _id: contractId,
      "buyer.buyerId": buyerId,
    });

    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (contract.status !== "AWAITING_BUYER_SIGNATURE") {
      return res.status(400).json({
        message: "Contract not ready for buyer signature",
      });
    }

    /* ===============================
       SAVE BUYER SIGNATURE
       =============================== */
    contract.buyerSignature = {
      signed: true,
      signedAt: new Date(),
    };

    /* ===============================
       FINALIZE CONTRACT
       =============================== */
    contract.status = "ACTIVE";

    initializeCultivationTracking(contract);

    await contract.save();

    res.json({
      success: true,
      message: "Buyer signed successfully. Contract is now ACTIVE.",
      contract,
    });
  } catch (error) {
    console.error("Buyer sign error:", error);
    res.status(500).json({ message: "Failed to sign contract" });
  }
};
/* ======================================================
   FARMER SIGN CONTRACT
   ====================================================== */
const farmerSignContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const farmerId = req.user._id;

    const {
      insuranceProvider,
      policyNumber,
      policyValidTill,
      signatureType,
      signatureValue,
    } = req.body;

    const contract = await Contract.findOne({
      _id: contractId,
      "farmer.farmerId": farmerId,
    });

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    /* ===============================
       SAVE INSURANCE DETAILS
       =============================== */
    contract.insurance = {
      providedByCompany: false,
      pmfbyMandatory: true,
      providerName: insuranceProvider,
      policyNumber,
      policyValidTill,
    };

    /* ===============================
       SAVE FARMER SIGNATURE
       =============================== */
    contract.farmerSignature = {
      signed: true,
      signedAt: new Date(),
      signatureType,
      signatureValue,
    };

    /* ===============================
       UPDATE CONTRACT STATUS
       =============================== */
    /* ===============================
   UPDATE CONTRACT STATUS
   =============================== */
    contract.status = "AWAITING_BUYER_SIGNATURE";

    await contract.save();

    res.status(200).json({
      success: true,
      message: "Contract accepted and signed by farmer",
      contract,
    });
  } catch (error) {
    console.error("Farmer sign error:", error);
    res.status(500).json({ message: "Failed to sign contract" });
  }
};

module.exports = {
  buyerSignContract,
  farmerSignContract,
};
