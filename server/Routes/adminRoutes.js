const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const {
  getAllUsers,
  verifyFarmerPolicy,
  blockUser,
  unblockUser,
  freezeContract,
  getAllDisputes,
  resolveDispute,
  getDashboardStats,
  getAllPolicies,
  getTickets,
  updateTicket,
  getAdminAnalytics,
  userReply,
  adminReply,
  markSeen,
} = require("../Controllers/adminController");

const { createUpdate } = require("../Controllers/GovUpdateController");

// 🔥 Dashboard test
router.get("/dashboard", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin 🚀" });
});
router.get("/dashboard-stats", protect, authorize("admin"), getDashboardStats);
// 👥 Get all users
router.get("/users", protect, authorize("admin"), getAllUsers);
router.get("/policies", protect, authorize("admin"), getAllPolicies);
// 🧾 Verify farmer policy
router.patch(
  "/verify-policy/:id",
  protect,
  authorize("admin"),
  verifyFarmerPolicy,
);

// 🚫 Block user
router.patch("/users/:id/block", protect, authorize("admin"), blockUser);
router.patch("/users/:id/unblock", protect, authorize("admin"), unblockUser);
// ❄️ Freeze contract
router.patch(
  "/contracts/:id/freeze",
  protect,
  authorize("admin"),
  freezeContract,
);
router.get("/disputes", protect, authorize("admin"), getAllDisputes);
// ⚖️ Resolve dispute
router.patch(
  "/disputes/:id/resolve",
  protect,
  authorize("admin"),
  resolveDispute,
);
router.get("/tickets", protect, authorize("admin"), getTickets);

router.patch("/ticket/:id", protect, authorize("admin"), updateTicket);
// Admin reply
router.post("/ticket/admin-reply/:id", protect, authorize("admin"), adminReply);

// User reply
router.post("/ticket/user-reply/:id", protect, userReply);
router.patch("/ticket/mark-seen/:id", protect, markSeen);
router.get("/analytics", protect, authorize("admin"), getAdminAnalytics);
router.post("/govt-update", protect, authorize("admin"), createUpdate);

module.exports = router;
