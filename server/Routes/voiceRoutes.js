const express = require("express");
const { parseVoice } = require("../Controllers/voiceController.js");

const router = express.Router();

router.post("/voice-parse", parseVoice);

module.exports = router;
