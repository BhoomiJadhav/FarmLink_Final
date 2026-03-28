const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CultivationContract",
      required: true,
    },

    raisedByRole: {
      type: String,
      enum: ["BUYER", "FARMER"],
      required: true,
    },

    raisedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "PAYMENT_ISSUE",
        "QUALITY_CONCERN",
        "STAGE_DISAGREEMENT",
        "DELIVERY_DELAY",
        "CONTRACT_VIOLATION",
        "OTHER",
      ],
      required: true,
    },

    stageId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    description: {
      type: String,
      required: true,
    },

    requestedResolution: {
      type: String,
      enum: [
        "RELEASE_PAYMENT",
        "REVERIFY_STAGE",
        "APPLY_PENALTY",
        "EXTEND_TIMELINE",
        "CANCEL_CONTRACT",
        "OTHER",
      ],
      required: true,
    },

    evidenceFiles: [
      {
        type: String, // store file URL or path
      },
    ],

    status: {
      type: String,
      enum: ["OPEN", "UNDER_REVIEW", "RESOLVED", "REJECTED"],
      default: "OPEN",
    },

    adminResponse: {
      type: String,
    },
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolvedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Dispute", disputeSchema);
