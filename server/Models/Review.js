const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },

    contractType: {
      type: String,
      enum: ["CULTIVATION", "HARVEST_SALE"],
      required: true,
    },

    reviewer: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["farmer", "buyer"] },
    },

    reviewee: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["farmer", "buyer"] },
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: String,

    tags: [String],

    proofImages: [String],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Prevent duplicate review per contract per user
ReviewSchema.index({ contractId: 1, "reviewer.userId": 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
