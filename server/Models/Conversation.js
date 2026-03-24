const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["BUYER", "FARMER"],
    required: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema({
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
    required: true,
    unique: true,
  },

  messages: [messageSchema],

  unread: {
    BUYER: { type: Number, default: 0 },
    FARMER: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
