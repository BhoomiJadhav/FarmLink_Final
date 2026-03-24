const express = require("express");
const router = express.Router();
const {
  createDispute,
  getDisputeByContract,
  resolveDispute,
} = require("../Controllers/DisputeController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/disputeUpload");

router.post(
  "/contracts/:contractId/disputes",
  protect,
  upload.array("evidenceFiles", 5), // max 5 files
  createDispute,
);
router.get("/contracts/:contractId/disputes", protect, getDisputeByContract);
router.patch("/disputes/:disputeId/resolve", protect, resolveDispute);
module.exports = router;
