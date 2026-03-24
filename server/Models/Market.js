// Models/Market.js
const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  price: { type: Number, required: true },
  changePercent: { type: Number, default: 0 }, // e.g. 5.2 => +5.2%
  unit: { type: String, default: "₹/Q" },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Market", marketSchema);
