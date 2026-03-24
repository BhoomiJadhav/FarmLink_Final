const mongoose = require("mongoose");
const {
  CONTRACT_STATUS,
  CONTRACT_TYPE,
} = require("../constants/contractEnums.js");

const BaseContractSchema = new mongoose.Schema(
  {
    contractId: {
      type: String,
      unique: true,
      required: true,
    },

    contractName: {
      type: String,
      required: true,
    },

    contractType: {
      type: String,
      enum: Object.values(CONTRACT_TYPE),
      required: true,
    },

    contractDate: {
      type: Date,
      required: true,
    },

    buyerLocation: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(CONTRACT_STATUS),
      default: CONTRACT_STATUS.DRAFT,
    },

    buyerSignature: {
      signed: { type: Boolean, default: false },
      signedAt: Date,
      signatureType: String,
      signatureValue: String,
    },

    farmerSignature: {
      signed: { type: Boolean, default: false },
      signedAt: Date,
      signatureType: String,
      signatureValue: String,
    },
    dispute: {
      isDisputed: { type: Boolean, default: false },
      disputeReason: String,
      resolvedBy: {
        type: String,
        enum: ["MEDIATION", "COURT"],
      },
      resolutionNotes: String,
    },
  },
  { timestamps: true, discriminatorKey: "contractType" }
);

module.exports = mongoose.model("Contract", BaseContractSchema);
