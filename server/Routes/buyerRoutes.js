const express = require("express");
const router = express.Router();
const {
  completeProfile,
  getBuyerDetails,
} = require("../Controllers/buyercontroller");
const {
  getBuyerDashboardStats,
  getRecentContracts,
  getTopFarmers,
  getAllBuyerContracts,
} = require("../Controllers/buyer/dashboard-stats");

const { createSupportTicket } = require("../Controllers/adminController");
const faqUpload = require("../middleware/uploadFaq");
const { protect } = require("../middleware/auth");

router.post("/profile/:id", protect, completeProfile);
router.get("/details", protect, getBuyerDetails);
router.post("/support", protect, faqUpload.single("file"), createSupportTicket);
router.get("/dashboard-stats", protect, getBuyerDashboardStats);

/* ===============================
   CONTRACTS
=============================== */
router.get("/contracts/recent", protect, getRecentContracts);

router.get("/contracts", protect, getAllBuyerContracts);

/* ===============================
   FARMERS
=============================== */
router.get("/top-farmers", protect, getTopFarmers);
module.exports = router;
