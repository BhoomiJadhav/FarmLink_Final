const HarvestSaleContract = require("../Models/HarvestSaleContract");
const HarvestListing = require("../Models/HarvestListing");
const BuyerProfile = require("../Models/buyer");
const Profile = require("../Models/Profile");
const Notification = require("../Models/Notification");
const { normalizeContractValue } = require("../utils/harvestValue");
const {
  CONTRACT_TYPE,
  CONTRACT_STATUS,
} = require("../constants/contractEnums");
const { v4: uuidv4 } = require("uuid");

/* ======================================================
   CREATE HARVEST SALE CONTRACT
====================================================== */
const createHarvestSaleContract = async (req, res) => {
  try {
    const buyerUser = req.user;
    const {
      harvestListingId,
      payment: { pricePerUnit, mode },
      delivery,
      buyerConfirmation,
    } = req.body;
    console.log("CREATE HARVEST CONTRACT BODY:", req.body);

    if (!buyerConfirmation) {
      return res.status(400).json({
        success: false,
        message: "Buyer must confirm crop details",
      });
    }

    const listing = await HarvestListing.findById(harvestListingId);
    if (!listing) {
      return res.status(404).json({ message: "Harvest listing not found" });
    }

    // 🔥 FETCH BUYER PROFILE
    const buyerProfile = await BuyerProfile.findOne({
      user: buyerUser._id,
    });

    // 🔥 FETCH FARMER PROFILE
    const farmerProfile = await Profile.findOne({
      userId: listing.farmer.farmerId,
    });
    if (!buyerProfile?.address) {
      return res.status(400).json({
        success: false,
        message: "Buyer address not found in profile",
      });
    }

    if (!buyerProfile || !farmerProfile) {
      return res.status(400).json({
        message: "Buyer or Farmer profile incomplete",
      });
    }
    if (!pricePerUnit || Number(pricePerUnit) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid price per unit is required",
      });
    }

    const quantity = Number(listing.harvest.quantityAvailable);
    const unitPrice = Number(pricePerUnit);
    if (!unitPrice || unitPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid price per unit is required",
      });
    }
    const totalAmount = quantity * unitPrice;

    const contract = await HarvestSaleContract.create({
      contractId: `HARV-${uuidv4().slice(0, 8).toUpperCase()}`,
      contractName: `Harvest Sale - ${listing.harvest.cropName}`,
      contractType: "HARVEST_SALE",
      contractDate: new Date(),
      status: "SENT",
      buyerLocation: buyerProfile.address,

      harvestListingId: listing._id,

      // ✅ BUYER SNAPSHOT (FIX)
      buyer: {
        buyerId: buyerUser._id,
        name: buyerUser.name,
        email: buyerUser.email,
        address: buyerProfile.address,
        mobile: buyerProfile.phone,
      },

      // ✅ FARMER SNAPSHOT (FIX)
      farmer: {
        farmerId: listing.farmer.farmerId,
        name: listing.farmer.name,
        address: farmerProfile.personal.address,
        mobile: farmerProfile.personal.phone,
      },

      harvestDetails: {
        cropName: listing.harvest.cropName,
        variety: listing.harvest.variety,
        qualityGrade: listing.harvest.qualityGrade,
        quantity: listing.harvest.quantityAvailable,
        unit: listing.harvest.unit,
      },

      payment: {
        mode,
        pricePerUnit: unitPrice,
        totalAmount,
        status: "PENDING",
      },

      delivery,
    });

    await Notification.create({
      userId: listing.farmer.farmerId,
      title: "New Harvest Offer",
      message: `You received an offer for ${listing.harvest.cropName}`,
      type: "CONTRACT",
      relatedContractId: contract._id,
    });

    res.status(201).json({ success: true, contract });
  } catch (error) {
    console.error("Create Harvest Contract Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   GET HARVEST CONTRACT BY ID
====================================================== */
const getHarvestContractById = async (req, res) => {
  try {
    const contract = await HarvestSaleContract.findById(req.params.id)
      .populate("buyer.buyerId", "name email mobile address")
      .populate("farmer.farmerId", "name email mobile address")
      .populate("harvestListingId")
      .lean(); // IMPORTANT

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // ✅ NORMALIZE AMOUNT (MISSING FIX)
    const amount = normalizeContractValue(contract);

    res.json({
      contract: {
        ...contract,
        payment: {
          ...contract.payment,
          amount,
        },
      },
    });
  } catch (err) {
    console.error("Fetch Harvest Contract Error:", err);
    res.status(500).json({ message: "Failed to fetch contract" });
  }
};

const getHarvestContracts = async (req, res) => {
  try {
    console.log("REQ.USER =", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id;
    const role = req.user.role?.toLowerCase();

    let query = { contractType: "HARVEST_SALE" };

    if (role === "farmer") {
      query["farmer.farmerId"] = userId;
    } else if (role === "buyer") {
      query["buyer.buyerId"] = userId;
    } else {
      return res.status(403).json({ message: "Invalid role" });
    }

    const contracts = await HarvestSaleContract.find(query)
      .sort({ updatedAt: -1 })
      .lean();

    const normalized = contracts.map((c) => {
      let amount = 0;
      try {
        amount = normalizeContractValue(c);
      } catch (e) {
        console.error("NORMALIZE ERROR:", c._id, e);
      }

      return {
        ...c,
        payment: {
          ...c.payment,
          amount,
        },
      };
    });

    res.json({
      success: true,
      contracts: normalized,
    });
  } catch (error) {
    console.error("Get harvest contracts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch harvest contracts",
    });
  }
};

const getHarvestDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;
    console.log("USER ID:", req.user?.id);
    console.log("USER ROLE:", req.user?.role);

    let query = { contractType: CONTRACT_TYPE.HARVEST_SALE };

    if (role === "farmer") {
      query["farmer.farmerId"] = userId;
    } else if (role === "buyer") {
      query["buyer.buyerId"] = userId;
    } else {
      return res.status(403).json({ message: "Invalid role" });
    }
    console.log("🔑 req.user =", req.user);

    const contracts = await HarvestSaleContract.find(query).lean();

    let activeValue = 0;
    let inTransitValue = 0;
    let completedValue = 0;

    contracts.forEach((c) => {
      const amount = normalizeContractValue(c);

      switch (c.status) {
        case "SENT":
        case "ACCEPTED":
        case "ACTIVE":
        case "PAYMENT_PENDING":
          activeValue += amount;
          break;

        case "IN_TRANSIT":
          inTransitValue += amount;
          break;

        case "COMPLETED":
          completedValue += amount;
          break;

        default:
          break;
      }
    });

    res.json({
      success: true,
      stats: {
        activeValue,
        inTransitValue,
        completedValue,
        totalValue: activeValue + inTransitValue + completedValue,
      },
    });
  } catch (error) {
    console.error("Harvest dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch harvest dashboard stats",
    });
  }
};

module.exports = {
  createHarvestSaleContract,
  getHarvestContractById,
  getHarvestContracts,
  getHarvestDashboardStats,
};
