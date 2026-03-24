const express = require("express");
const router = express.Router();
const { protect: auth } = require("../middleware/auth");
const {
  getMyNotifications,
  markAsRead,
} = require("../Controllers/notificationController");

router.get("/", auth, getMyNotifications);
router.patch("/read/:id", auth, markAsRead);

module.exports = router;
