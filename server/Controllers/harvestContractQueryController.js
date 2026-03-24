const HarvestSaleContract = require("../Models/HarvestSaleContract");
const { CONTRACT_TYPE } = require("../constants/contractEnums");

/* ================= FARMER ================= */
exports.getFarmerHarvestContracts = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const contracts = await HarvestSaleContract.find({
      contractType: CONTRACT_TYPE.HARVEST_SALE,
      "farmer.farmerId": farmerId,
    }).sort({ updatedAt: -1 });

    res.json({
      success: true,
      contracts,
    });
  } catch (error) {
    console.error("Farmer harvest contracts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch farmer harvest contracts",
    });
  }
};

/* ================= BUYER ================= */
exports.getBuyerHarvestContracts = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const contracts = await HarvestSaleContract.find({
      contractType: CONTRACT_TYPE.HARVEST_SALE,
      "buyer.buyerId": buyerId,
      status: {
        $in: ["ACTIVE", "IN_TRANSIT", "DELIVERED", "COMPLETED"],
      },
    }).sort({ updatedAt: -1 });

    res.json({
      success: true,
      contracts,
    });
  } catch (error) {
    console.error("Buyer harvest contracts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch buyer harvest contracts",
    });
  }
};
