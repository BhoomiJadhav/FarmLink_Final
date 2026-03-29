const mongoose = require("mongoose");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const BuyerProfile = require("../Models/buyer");
const CultivationContract = require("../Models/CultivationContract");
const HarvestContract = require("../Models/HarvestSaleContract");
const Dispute = require("../Models/Dispute");
const Contract = require("../Models/BaseContract");
const Notification = require("../Models/Notification");
exports.getAllDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate("contractId")
      .sort({ createdAt: -1 });

    res.json({ success: true, disputes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resolveDispute = async (req, res) => {
  try {
    const { status, response } = req.body;

    const dispute = await Dispute.findById(req.params.id);

    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    // ✅ Update dispute
    dispute.status = status;
    dispute.adminResponse = response;
    dispute.handledBy = req.user._id;
    dispute.resolvedAt = new Date();

    await dispute.save();

    // ✅ FIX: Find contract from BOTH types
    let contract =
      (await CultivationContract.findById(dispute.contractId)) ||
      (await HarvestContract.findById(dispute.contractId));

    if (!contract) {
      return res.json({
        success: true,
        message: "Dispute resolved (contract not found)",
      });
    }

    // 🔔 Notifications

    const notifications = [];

    if (contract?.farmer?.farmerId) {
      notifications.push({
        userId: contract.farmer.farmerId,
        title: "Dispute Update",
        message: `Your dispute has been ${status}: ${response}`,
        type: "DISPUTE",
        relatedContractId: contract._id,
      });
    }

    if (contract?.buyer?.buyerId) {
      notifications.push({
        userId: contract.buyer.buyerId,
        title: "Dispute Update",
        message: `A dispute has been ${status}: ${response}`,
        type: "DISPUTE",
        relatedContractId: contract._id,
      });
    }

    if (notifications.length > 0) {
      await Notification.create(notifications);
    }

    res.json({ success: true, message: "Dispute resolved successfully" });
  } catch (err) {
    console.error("RESOLVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["farmer", "buyer"] } });

    const farmers = await Promise.all(
      users
        .filter((u) => u.role === "farmer")
        .map(async (user) => {
          const profile = await Profile.findOne({ userId: user._id });

          const cultivationCount = await CultivationContract.countDocuments({
            "farmer.farmerId": user._id,
          });

          return {
            user,
            profile,
            contracts: cultivationCount,
          };
        }),
    );

    const buyers = await Promise.all(
      users
        .filter((u) => u.role === "buyer")
        .map(async (user) => {
          const profile = await BuyerProfile.findOne({ user: user._id });

          const harvestCount = await HarvestContract.countDocuments({
            "buyer.buyerId": user._id,
          });

          return {
            user,
            profile,
            contracts: harvestCount,
          };
        }),
    );

    res.json({ farmers, buyers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.verifyFarmerPolicy = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const contract = await CultivationContract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // 🔥 SAVE INSIDE insurance
    contract.insurance.policyVerification = {
      status,
      remarks,
      verifiedBy: req.user._id,
      verifiedAt: new Date(),
    };

    await contract.save();
    await Notification.create({
      userId: contract.farmer.farmerId,
      title:
        status === "APPROVED" ? "Policy Approved ✅" : "Policy Rejected ❌",

      message:
        status === "APPROVED"
          ? "Your insurance policy has been verified successfully."
          : `Your policy was rejected. Reason: ${remarks}`,

      type: "SYSTEM",
      contractId: contract._id,
      role: "FARMER",
    });

    res.json({ success: true, message: "Policy verified" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.status = "blocked";

    await user.save();

    res.json({ success: true, message: "User blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.status = "active";

    await user.save();

    res.json({ success: true, message: "User unblocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.freezeContract = async (req, res) => {
//   try {
//     const contract = await Contract.findById(req.params.id);

//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     contract.contractStatus = "FROZEN";
//     contract.adminOverride = {
//       isFrozen: true,
//       frozenBy: req.user._id,
//       reason: req.body.reason,
//       actionAt: new Date(),
//     };

//     await contract.save();

//     res.json({ success: true, message: "Contract frozen" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.freezeContract = async (req, res) => {
  try {
    const contractId = req.params.id;

    console.log("🔥 FREEZE REQUEST ID:", contractId);

    // ✅ Step 1: Find contract using BASE model
    const contract = await Contract.findById(contractId);

    if (!contract) {
      console.log("❌ Contract NOT FOUND");
      return res.status(404).json({ message: "Contract not found" });
    }

    console.log("✅ Contract FOUND:", contract._id);

    // ✅ Step 2: Freeze contract
    contract.contractStatus = "FROZEN";
    contract.adminOverride = {
      isFrozen: true,
      frozenBy: req.user._id,
      reason: req.body.reason || "Admin freeze",
      actionAt: new Date(),
    };

    await contract.save();

    console.log("✅ Contract UPDATED:", contract.contractStatus);

    // ✅ Step 3: Find dispute
    const dispute = await Dispute.findOne({
      contractId: new mongoose.Types.ObjectId(contractId),
    });

    console.log("🔍 Dispute FOUND:", dispute);

    // ✅ Step 4: Update dispute
    if (dispute && dispute.status === "OPEN") {
      dispute.status = "UNDER_REVIEW";
      await dispute.save();
      console.log("✅ Dispute UPDATED to UNDER_REVIEW");
    }

    res.json({
      success: true,
      message: "Contract frozen & dispute updated",
    });
  } catch (err) {
    console.error("❌ FREEZE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.getDashboardStats = async (req, res) => {
  try {
    const farmers = await User.countDocuments({ role: "farmer" });
    const buyers = await User.countDocuments({ role: "buyer" });

    const disputes = await Dispute.countDocuments({ status: "OPEN" });

    const cultivationContracts = await CultivationContract.countDocuments();
    const harvestContracts = await HarvestContract.countDocuments();

    const totalContracts = cultivationContracts + harvestContracts;

    res.json({
      success: true,
      stats: {
        farmers,
        buyers,
        disputes,
        contracts: totalContracts,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPolicies = async (req, res) => {
  try {
    const contracts = await CultivationContract.find({
      "insurance.policyNumber": { $ne: "" },
    }).sort({ createdAt: -1 });

    const grouped = {};

    for (const c of contracts) {
      const farmerId = c.farmer.farmerId.toString();

      // 🔥 get profile
      const profile = await Profile.findOne({ userId: farmerId });

      if (!grouped[farmerId]) {
        grouped[farmerId] = {
          user: {
            id: farmerId,
            name: profile?.personal?.fullName || c.farmer.name,
            email: profile?.personal?.email || "N/A",
            phone: profile?.personal?.phone || "N/A",
          },
          policies: [],
        };
      }

      grouped[farmerId].policies.push({
        contractId: c._id,
        insurance: c.insurance,
        verification: c.policyVerification || { status: "PENDING" },
      });
    }

    res.json({ success: true, policies: Object.values(grouped) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
