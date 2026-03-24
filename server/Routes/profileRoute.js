const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  saveProfile,
  getProfile,
  getAllFarmers,
  getProfileById,
} = require("../Controllers/profileController");

// Get profile (current user)
router.get("/", protect, getProfile);

// Save or update profile (current user)
router.post("/", protect, saveProfile);

// list farmers (public)
router.get("/farmers", getAllFarmers);

// get profile by id or "me" (protected so "me" works)
router.get("/:id", protect, getProfileById);

module.exports = router;
