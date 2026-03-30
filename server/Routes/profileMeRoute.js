const express = require("express");
const router = express.Router();

const User = require("../Models/User");
const Profile = require("../Models/Profile");

const CultivationContract = require("../Models/CultivationContract");
const HarvestContract = require("../Models/HarvestSaleContract");

const { protect } = require("../middleware/auth");

// GET /api/profile/me
router.get("/me", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    /* ---------- USER ---------- */
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    /* ---------- PROFILE ---------- */
    const profile = await Profile.findOne({ userId });

    /* ---------- FARMER CONTRACTS (NEW MODEL) ---------- */
    const cultivationContracts = await CultivationContract.find({
      "farmer.farmerId": userId,
    }).sort({ createdAt: -1 });

    const harvestContracts = await HarvestContract.find({
      "farmer.farmerId": userId,
    }).sort({ createdAt: -1 });

    /* ---------- DASHBOARD CROPS (NORMALIZED) ---------- */
    const crops = cultivationContracts.map((c) => ({
      contractId: c._id,
      contractType: "CULTIVATION",

      cropName: c.cropDetails?.cropName || "—",
      area: c.cropDetails?.contractedArea || "—",
      expectedYield: c.cropDetails?.expectedYield || "—",

      status: c.status,

      pricePerUnit: c.payment?.agreedPricePerUnit
        ? `₹${c.payment.agreedPricePerUnit}`
        : "—",

      // 🔥🔥 ADD THESE (CRITICAL)
      insurance: c.insurance,
      policyVerification: c.policyVerification,
    }));

    const harvestedCrops = harvestContracts.map((c) => ({
      contractId: c._id,
      contractType: "HARVEST",
      cropName: c.cropDetails?.cropName || "—",
      quantity: c.cropDetails?.quantity || "—",
      status: c.status,
      totalValue: c.payment?.totalValue ? `₹${c.payment.totalValue}` : "—",
    }));

    res.json({
      success: true,
      user,
      profile,
      dashboard: {
        cultivationContracts: crops,
        harvestContracts: harvestedCrops,
        totalContracts: cultivationContracts.length + harvestContracts.length,
      },
    });
  } catch (err) {
    console.error("profile me error =>", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
