const express = require("express");
const router = express.Router();

const {
  getCultivationTracking,
} = require("../Controllers/cultivationTrackingController");
const {
  uploadPaymentProof,
  verifyPaymentByFarmer,
} = require("../Controllers/paymentController");
const {
  dispatchSeedsByBuyer,
  confirmSeedReceiptByFarmer,
  uploadSeedByFarmer,
} = require("../Controllers/seedDispatch");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/uploadSeedImages");
// GET tracking details
router.get("/:id/tracking", getCultivationTracking);

router.post(
  "/:contractId/payments/:paymentId/upload-proof",
  upload.single("proof"),
  uploadPaymentProof,
);

router.post("/:contractId/payments/:paymentId/verify", verifyPaymentByFarmer);
router.post(
  "/:id/seed/dispatch",
  protect,
  upload.array("images", 5),
  dispatchSeedsByBuyer,
);

/**
 * FARMER → Confirm Seed Receipt (Buyer provided seeds)
 * Required:
 * - at least 1 receiving proof image
 */
router.post(
  "/:id/seed/confirm",
  protect,
  upload.array("images", 5),
  confirmSeedReceiptByFarmer,
);

/**
 * FARMER → Upload Seed Proof (Farmer provides seeds)
 * Required:
 * - seed details
 * - at least 1 image proof
 */
router.post(
  "/:id/seed/upload",
  protect,
  upload.array("images", 5),
  uploadSeedByFarmer,
);
router.use((req, res, next) => {
  console.log("➡️ TRACKING ROUTE HIT:", req.method, req.originalUrl);
  next();
});

module.exports = router;
