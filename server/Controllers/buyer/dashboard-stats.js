const Contract = require("../../Models/BaseContract");
const HarvestListing = require("../../Models/HarvestListing");
const Profile = require("../../Models/Profile");

const getBuyerDashboardStats = async (req, res) => {
  try {
    const buyerId = req.user._id;

    /* ===============================
       CONTRACT STATS
    =============================== */
    const contracts = await Contract.find({
      "buyer.buyerId": buyerId,
    });

    const totalContracts = contracts.length;

    const pendingRequests = contracts.filter(
      (c) => c.status === "AWAITING_BUYER_SIGNATURE",
    ).length;

    const completedDeals = contracts.filter(
      (c) => c.status === "COMPLETED",
    ).length;

    const activeNegotiations = contracts.filter(
      (c) => c.negotiation?.negotiationId,
    ).length;

    /* ===============================
       MARKET STATS
    =============================== */

    const listings = await HarvestListing.find({ status: "OPEN" });

    const activeListings = listings.length;

    const totalFarmers = await Profile.countDocuments();

    /* ===============================
       AVG WHEAT PRICE
    =============================== */
    const wheatListings = listings.filter(
      (l) => l.harvest.cropName?.toLowerCase() === "wheat",
    );

    let avgWheatPrice = "₹0/Q";

    if (wheatListings.length > 0) {
      const avg =
        wheatListings.reduce(
          (sum, l) => sum + l.expectedPrice.minPricePerUnit,
          0,
        ) / wheatListings.length;

      avgWheatPrice = `₹${Math.round(avg)}/Q`;
    }

    /* ===============================
       MONTH VOLUME
    =============================== */
    const currentMonth = new Date().getMonth();

    const monthContracts = contracts.filter(
      (c) => new Date(c.createdAt).getMonth() === currentMonth,
    );

    const monthVolume = `${monthContracts.length * 10} Q`; // approx logic

    res.json({
      stats: {
        totalContracts,
        pendingRequests,
        completedDeals,
        activeNegotiations,
        avgWheatPrice,
        totalFarmers,
        activeListings,
        monthVolume,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
const getRecentContracts = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const contracts = await Contract.find({
      "buyer.buyerId": buyerId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const formatted = contracts.map((c) => {
      let totalPrice = 0;

      /* ===============================
     GET QUANTITY (FIXED)
  =============================== */
      const quantity = parseInt(c.cropDetails?.expectedYield) || 0;

      /* ===============================
     CULTIVATION CONTRACT
  =============================== */
      if (c.pricing?.estimatedValue) {
        totalPrice = c.pricing.estimatedValue;
      } else if (c.pricing?.agreedPricePerUnit && quantity) {
        totalPrice = c.pricing.agreedPricePerUnit * quantity;
      } else if (c.payment?.pricePerUnit && c.harvestDetails?.quantity) {

      /* ===============================
     HARVEST CONTRACT
  =============================== */
        totalPrice = c.payment.pricePerUnit * c.harvestDetails.quantity;
      }

      console.log("FINAL PRICE:", totalPrice);

      return {
        _id: c._id,
        cropDetails: c.cropDetails || c.harvestDetails,
        farmer: c.farmer,
        pricing: {
          totalPrice,
        },
        status: c.status,
      };
    });

    res.json({ contracts: formatted });
  } catch (err) {
    res.status(500).json({ message: "Recent contracts error" });
  }
};
const getTopFarmers = async (req, res) => {
  try {
    const contracts = await Contract.aggregate([
      {
        $group: {
          _id: "$farmer.farmerId",
          name: { $first: "$farmer.name" },
          contractsCount: { $sum: 1 },
        },
      },
      { $sort: { contractsCount: -1 } },
      { $limit: 5 },
    ]);

    const farmers = contracts.map((f) => ({
      _id: f._id,
      name: f.name,
      contractsCount: f.contractsCount,
      rating: (4 + Math.random()).toFixed(1), // temp
    }));

    res.json({ farmers });
  } catch (err) {
    res.status(500).json({ message: "Top farmers error" });
  }
};
const getAllBuyerContracts = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const contracts = await Contract.find({
      "buyer.buyerId": buyerId,
    })
      .sort({ createdAt: -1 })
      .select(
        "_id cropDetails harvestDetails farmer pricing payment status createdAt",
      );

    const formatted = contracts.map((c) => ({
      _id: c._id,
      cropDetails: c.cropDetails || c.harvestDetails,
      farmer: c.farmer,
      pricing: c.pricing || {
        totalPrice: c.payment?.pricePerUnit * c.harvestDetails?.quantity || 0,
      },
      status: c.status,
      createdAt: c.createdAt,
    }));

    res.json({ contracts: formatted });
  } catch (err) {
    res.status(500).json({ message: "All contracts error" });
  }
};
module.exports = {
  getBuyerDashboardStats,
  getRecentContracts,
  getTopFarmers,
  getAllBuyerContracts,
};
