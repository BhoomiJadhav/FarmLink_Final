const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const {
  createFarmerTicket,
  createBuyerTicket,
} = require("../Controllers/SupportController");
const { getMyTickets } = require("../Controllers/SupportController");
const faqUpload = require("../middleware/uploadFaq");
router.post(
  "/farmer/support",
  protect,
  faqUpload.single("file"),
  createFarmerTicket,
);

router.post(
  "/buyer/support",
  protect,
  faqUpload.single("file"),
  createBuyerTicket,
);
router.get("/ticket/my", protect, getMyTickets);
module.exports = router;
