const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["CONTRACT", "PAYMENT", "DELIVERY"],
      required: true,
    },

    relatedContractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },

    read: {
      type: Boolean,
      default: false,
    },
    // ADD ONLY THESE (if not already present)

    contractId: {
      type: String,
    },

    stageName: {
      type: String,
    },

    reminderLevel: {
      type: Number,
      enum: [1, 2, 3],
    },

    type: {
      type: String,
      enum: [
        "REMINDER",
        "ESCALATION",
        "SYSTEM",
        "STAGE_UPDATE_REQUEST",
        "DISPUTE_CREATED",
      ],
      default: "SYSTEM",
    },

    role: {
      type: String,
      enum: ["FARMER", "BUYER", "ADMIN"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", NotificationSchema);
