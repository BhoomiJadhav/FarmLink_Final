const express = require("express");
const router = express.Router();
const { protect: auth } = require("../middleware/auth");
const controller = require("../Controllers/cultivationDeliveryController");

router.post(
  "/delivery/dispatch/:contractId",
  auth,
  controller.dispatchCultivationDelivery,
);

router.post(
  "/delivery/driver-location/:contractId",
  controller.updateCultivationDriverLocation,
);

router.post(
  "/delivery/verify-otp/:contractId",
  controller.verifyCultivationDeliveryOtp,
);

module.exports = router;
