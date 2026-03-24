const express = require("express");
const router = express.Router();
const {
  completeProfile,
  getBuyerDetails,
} = require("../Controllers/buyercontroller");
const { protect } = require("../middleware/auth");

router.post("/profile/:id", protect, completeProfile);
router.get("/details", protect, getBuyerDetails);
module.exports = router;
