// Routes/updatesRoutes.js
const express = require("express");
const router = express.Router();
const Update = require("../Models/Update");

// GET /api/updates
router.get("/", async (req, res) => {
  try {
    const updates = await Update.find().sort({ date: -1 }).limit(50);
    res.json({ success: true, updates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/updates (admin creates new update)
router.post("/", async (req, res) => {
  try {
    const { title, message, tag, source, date } = req.body;
    const u = await Update.create({ title, message, tag, source, date });
    res.json({ success: true, update: u });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
