const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { protect } = require("../middleware/auth");

const {
  createHarvestSaleContract,
  getHarvestContractById,
  getHarvestContracts,
  getHarvestDashboardStats,
} = require("../Controllers/harvestContractController");

const {
  getFarmerHarvestContracts,
  getBuyerHarvestContracts,
} = require("../Controllers/harvestContractQueryController");

const {
  acceptHarvestContract,
  rejectHarvestContract,
  markContractCompleted,
} = require("../Controllers/contractLifecycleController");

const {
  markPaymentDone,
  verifyPayment,
  dispatchVehicle,
  verifyDeliveryOtp,
  confirmDelivery,
  payHarvestContract,
  updateDriverLocation,
} = require("../Controllers/harvestPaymentDeliveryController");

router.use((req, res, next) => {
  console.log("🔥 HARVEST CONTRACT ROUTE HIT:", req.method, req.originalUrl);
  next();
});

/* CREATE */
router.post("/create", protect, createHarvestSaleContract);

/* QUERIES */
router.get("/farmer", protect, getFarmerHarvestContracts);
router.get("/buyer", protect, getBuyerHarvestContracts);

/* ACCEPT / REJECT */
router.post("/accept/:contractId", protect, acceptHarvestContract);
router.post("/reject/:contractId", protect, rejectHarvestContract);

router.get("/dashboard", protect, getHarvestDashboardStats);

router.get("/", protect, getHarvestContracts);

router.get("/:id", protect, getHarvestContractById);
/* PAYMENT */
router.post(
  "/payment/:contractId",
  protect,
  upload.single("proof"),
  markPaymentDone
);
router.post("/payment/verify/:contractId", protect, verifyPayment);
router.post("/:id/pay", protect, payHarvestContract);

/* DELIVERY */
router.post("/delivery/dispatch/:contractId", protect, dispatchVehicle);

router.post("/delivery/confirm/:contractId", protect, confirmDelivery);
router.post("/delivery/driver-location/:contractId", updateDriverLocation);
router.post("/delivery/verify-otp/:contractId", verifyDeliveryOtp);

/* COMPLETE */
router.post("/complete/:contractId", protect, markContractCompleted);

module.exports = router;
