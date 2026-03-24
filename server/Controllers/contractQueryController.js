const Contract = require("../Models/BaseContract.js");
const { CONTRACT_STATUS } = require("../constants/contractEnums");
const getBuyerContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({
      "buyer.buyerId": req.user._id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, contracts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFarmerContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({
      "farmer.farmerId": req.user._id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, contracts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getContractById = async (req, res) => {
  try {
    const { contractId } = req.params;

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Buyer-only access for drafts
    if (
      contract.status === "DRAFT" &&
      contract.buyer.buyerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ success: true, contract });
  } catch (err) {
    console.error("Fetch contract failed:", err);
    res.status(500).json({ message: "Failed to fetch contract" });
  }
};

const getActiveContracts = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role; // buyer | farmer

    const query =
      role === "buyer"
        ? { "buyer.buyerId": userId }
        : { "farmer.farmerId": userId };

    const activeStatuses = [
      CONTRACT_STATUS.ACTIVE,
      CONTRACT_STATUS.HARVEST_COMPLETED,
      CONTRACT_STATUS.DELIVERY_IN_PROGRESS,
      CONTRACT_STATUS.DELIVERED,
    ];

    const contracts = await Contract.find({
      ...query,
      status: { $in: activeStatuses },
    }).sort({ createdAt: -1 });

    res.json({ success: true, contracts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getBuyerContracts,
  getFarmerContracts,
  getContractById,
  getActiveContracts,
};
