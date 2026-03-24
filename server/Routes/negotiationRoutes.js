const express = require("express");
const router = express.Router();

const { protect: auth } = require("../middleware/auth");
const {
  startNegotiation,
  getNegotiation,
  counterOffer,
  acceptOffer,
  rejectNegotiation,
  getMyNegotiations,
} = require("../Controllers/contractNegotiationController");
router.get("/my", auth, getMyNegotiations);
router.get("/:negotiationId", auth, getNegotiation);
router.post("/start/:contractId", startNegotiation);

router.post("/counter/:negotiationId", counterOffer);
router.post("/accept/:negotiationId", auth, acceptOffer);
router.post("/reject/:negotiationId", auth, rejectNegotiation);

module.exports = router;
