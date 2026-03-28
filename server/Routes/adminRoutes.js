const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const {
  getAllUsers,
  verifyFarmerPolicy,
  blockUser,
  unblockUser,
  freezeContract,
  resolveDispute,
  getDashboardStats,
} = require("../Controllers/adminController");

// 🔥 Dashboard test
router.get("/dashboard", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin 🚀" });
});
router.get("/dashboard-stats", protect, authorize("admin"), getDashboardStats);
// 👥 Get all users
router.get("/users", protect, authorize("admin"), getAllUsers);

// 🧾 Verify farmer policy
router.patch(
  "/farmers/:id/verify-policy",
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

// ⚖️ Resolve dispute
router.patch(
  "/disputes/:id/resolve",
  protect,
  authorize("admin"),
  resolveDispute,
);

module.exports = router;
