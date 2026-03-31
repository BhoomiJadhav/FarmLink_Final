const express = require("express");
const router = express.Router();
const {
  completeProfile,
  getBuyerDetails,
} = require("../Controllers/buyercontroller");
const { createSupportTicket } = require("../Controllers/adminController");
const faqUpload = require("../middleware/uploadFaq");
const { protect } = require("../middleware/auth");

router.post("/profile/:id", protect, completeProfile);
router.get("/details", protect, getBuyerDetails);
router.post("/support", protect, faqUpload.single("file"), createSupportTicket);
module.exports = router;
