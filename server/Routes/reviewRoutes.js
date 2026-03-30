const express = require("express");
const router = express.Router();
const {
  createReview,
  checkReviewStatus,
} = require("../Controllers/reviewController");
const { protect } = require("../middleware/auth");

router.post("/:contractId", protect, createReview);
router.get("/:contractId/status", protect, checkReviewStatus);
module.exports = router;
