// server/Routes/markerRoutes.js
const express = require("express");
const router = express.Router();
const {
  getMarketPrices,
  getMarketFallback,
} = require("../Controllers/marketController");

router.get("/", getMarketPrices);
router.get("/fallback", getMarketFallback);

module.exports = router;
