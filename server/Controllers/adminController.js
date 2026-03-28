const User = require("../Models/User");
const Profile = require("../Models/Profile");
const BuyerProfile = require("../Models/buyer");
const CultivationContract = require("../Models/CultivationContract");
const HarvestContract = require("../Models/HarvestSaleContract");
const Dispute = require("../Models/Dispute");

exports.resolveDispute = async (req, res) => {
  try {
    const { status, response } = req.body;

    const dispute = await Dispute.findById(req.params.id);

    dispute.status = status;
    dispute.adminResponse = response;
    dispute.handledBy = req.user._id;
    dispute.resolvedAt = new Date();

    await dispute.save();

    res.json({ success: true, message: "Dispute updated" });
  } catch (err) {
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

    const profile = await Profile.findOne({ userId: req.params.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.policyVerification = {
      status,
      verifiedBy: req.user._id,
      verifiedAt: new Date(),
      remarks,
    };

    await profile.save();

    res.json({ success: true, message: "Policy updated" });
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

exports.freezeContract = async (req, res) => {
  try {
    let contract =
      (await CultivationContract.findById(req.params.id)) ||
      (await HarvestContract.findById(req.params.id));

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    contract.contractStatus = "FROZEN";
    contract.adminOverride = {
      isFrozen: true,
      frozenBy: req.user._id,
      reason: req.body.reason,
      actionAt: new Date(),
    };

    await contract.save();

    res.json({ success: true, message: "Contract frozen" });
  } catch (err) {
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
