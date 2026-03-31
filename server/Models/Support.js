const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: {
    type: String,
    enum: ["farmer", "buyer"],
    required: true,
  },
  subject: String,
  problem: String,
  fileUrl: String,

  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "NEEDS_INFO", "RESOLVED"],
    default: "OPEN",
  },

  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  },

  adminNotes: [
    {
      text: String,
      addedAt: { type: Date, default: Date.now },
    },
  ],

  replies: [
    {
      message: String,
      from: { type: String, enum: ["ADMIN", "FARMER"] },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model("SupportTicket", SupportSchema);
