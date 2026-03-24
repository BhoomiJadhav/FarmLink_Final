const axios = require('axios');
const FormData = require('form-data');

exports.analyzeGrain = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("No image uploaded.");

        const formData = new FormData();
        // req.file.buffer comes from Multer memoryStorage
        formData.append('file', req.file.buffer, { filename: req.file.originalname });

        const response = await axios.post('http://localhost:8000/predict', formData, {
            headers: { ...formData.getHeaders() }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("AI Service Error:", error.message);
        res.status(500).json({ error: "AI Service is not responding" });
    }
};