const express = require("express");
const {
  generateCultivationContractPDF,
} = require("../Controllers/contractPdfController.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

// Only buyer or farmer involved should access (can be extended)
router.get(
  "/cultivation/:contractId/pdf",
  protect,
  generateCultivationContractPDF
);

module.exports = router;
