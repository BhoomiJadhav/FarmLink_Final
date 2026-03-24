const mongoose = require("mongoose");

const negotiationMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["BUYER", "FARMER", "PLATFORM"],
    required: true,
  },
  offeredPrice: Number,
  message: String,
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const negotiationSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "AGREED", "REJECTED"],
      default: "ACTIVE",
    },

    rounds: {
      type: Number,
      default: 1,
    },

    currentTurn: {
      type: String,
      enum: ["BUYER", "FARMER"],
    },
    buyerAcceptedMidpoint: {
      type: Boolean,
      default: false,
    },
    farmerAcceptedMidpoint: {
      type: Boolean,
      default: false,
    },
    finalAgreedPrice: Number,

    messages: [negotiationMessageSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Negotiation", negotiationSchema);
