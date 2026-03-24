const express = require('express');
const router = express.Router();
const grainController = require('../Controllers/grainController');
const multer = require('multer');

// Use memory storage so we don't clutter the server with temp files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// This defines the endpoint: POST http://localhost:5000/api/ai/analyze
router.post('/analyze', upload.single('image'), grainController.analyzeGrain);

module.exports = router;