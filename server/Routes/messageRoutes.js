const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
  markAsRead,
  requestStageUpdate,
} = require("../Controllers/MessageController");

router.get("/contracts/:contractId/messages", getMessages);
router.post("/contracts/:contractId/messages", sendMessage);
router.post("/contracts/:contractId/messages/read", markAsRead);
router.post("/contracts/:contractId/request-stage-update", requestStageUpdate);
module.exports = router;
