const express = require("express");
const router = express.Router();

const Profile = require("../Models/Profile");
const CultivationContract = require("../Models/CultivationContract");
const HarvestContract = require("../Models/HarvestSaleContract");
const { protect } = require("../middleware/auth");
const {
  resubmitPolicy,
  createSupportTicket,
} = require("../Controllers/adminController");
const policyupload = require("../middleware/uploadPolicy");
const faqUpload = require("../middleware/uploadFaq");
const { getUpdates } = require("../Controllers/GovUpdateController");
/* ======================================================
   FARMER CONTRACT INBOX (NON-DRAFT ONLY)
   GET /api/farmer/contracts
   ====================================================== */
router.get("/contracts", protect, async (req, res) => {
  try {
    const farmerId = req.user._id;

    const contracts = await CultivationContract.find({
      "farmer.farmerId": farmerId,
      status: { $ne: "DRAFT" }, // 🔒 hide drafts
    }).sort({ createdAt: -1 });

    res.status(200).json({
      contracts,
      total: contracts.length,
    });
  } catch (err) {
    console.error("Fetch farmer contracts failed:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ======================================================
   FARMER DASHBOARD (COUNTS ONLY)
   GET /api/farmer/dashboard
   ====================================================== */
router.get("/dashboard", protect, async (req, res) => {
  try {
    const farmerId = req.user._id;

    const profile = await Profile.findOne({ userId: farmerId });
    if (!profile) {
      return res.status(404).json({ message: "Farmer profile not found" });
    }

    const contracts = await CultivationContract.find({
      "farmer.farmerId": farmerId,
      status: { $ne: "DRAFT" },
    });

    res.status(200).json({
      profile,
      stats: {
        totalContracts: contracts.length,
        pendingRequests: contracts.filter((c) => c.status === "SENT").length,
        acceptedDeals: contracts.filter((c) => c.status === "ACCEPTED").length,
        activeNegotiations: contracts.filter((c) => c.status === "NEGOTIATING")
          .length,
      },
    });
  } catch (err) {
    console.error("Farmer dashboard error:", err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/farmers", protect, async (req, res) => {
  try {
    const farmers = await Profile.find({
      availabilityStatus: "AVAILABLE",
    })
      .select(
        "personal.fullName farm.farmLocation farm.landSize farm.cropTypes farm.insurance",
      )
      .populate("userId", "role");

    res.status(200).json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* ======================================================
   PUBLIC FARMER PROFILE (KEEP LAST)
   ====================================================== */
router.get("/govt-updates", protect, getUpdates);
router.get("/:id", async (req, res) => {
  try {
    const farmerProfile = await Profile.findOne({
      userId: req.params.id,
    });
    if (!farmerProfile) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.status(200).json(farmerProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch(
  "/resubmit-policy/:id",
  protect,
  policyupload.single("file"), // if using multer
  resubmitPolicy,
);
router.post("/support", protect, faqUpload.single("file"), createSupportTicket);

module.exports = router;
