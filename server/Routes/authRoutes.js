const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const { protect, checkProfileCompletion } = require("../middleware/auth");

// Manual authentication
router.post("/register", authController.register);
router.post("/login", authController.login);

// Google authentication
router.post("/googlelogin", authController.googleLogin);

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      role: req.user.role,
      email: req.user.email,
      mobile: req.user.mobile,
    },
  });
});

router.get("/dashboard", protect, checkProfileCompletion, (req, res) => {
  res.json({ message: "Welcome to dashboard" });
});
module.exports = router;
