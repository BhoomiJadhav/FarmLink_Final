// Models/Update.js
const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String },
  tag: { type: String }, // e.g., 'Policy', 'Subsidy', 'Insurance'
  source: { type: String }, // optional source link
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Update", updateSchema);
