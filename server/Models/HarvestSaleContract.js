const Contract = require("./BaseContract.js");
const mongoose = require("mongoose");

const HarvestSaleContractSchema = new mongoose.Schema(
  {
    /* ================= BUYER SNAPSHOT ================= */
    buyer: {
      buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // Snapshot fields (must be copied from BuyerProfile at creation)
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
    },

    /* ================= FARMER SNAPSHOT ================= */
    farmer: {
      farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // Snapshot fields (must be copied from Profile.personal at creation)
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        default: "",
      },
      mobile: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
    },

    /* ================= SOURCE LISTING ================= */
    harvestListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HarvestListing",
      required: true,
    },

    /* ================= HARVEST DETAILS ================= */
    harvestDetails: {
      cropName: {
        type: String,
        required: true,
      },
      variety: {
        type: String,
      },
      qualityGrade: {
        type: String,
        enum: ["A", "B", "C", "FAQ"],
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        default: "Quintal",
      },
    },

    /* ================= PAYMENT TRACKING ================= */
    payment: {
      mode: {
        type: String,
        enum: ["BEFORE_DELIVERY", "ON_DELIVERY"],
        required: true,
      },
      pricePerUnit: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["PENDING", "MARKED", "VERIFIED", "REJECTED"],
        default: "PENDING",
      },
      transactionRef: String,
      proofUrl: String,
      paidAt: Date,
      verifiedAt: Date,
    },

    /* ================= DELIVERY TRACKING ================= */
    delivery: {
      expectedDeliveryDate: Date,

      deliveryLocation: {
        type: String,
        required: true,
      },

      transportationByBuyer: {
        type: Boolean,
        default: false,
      },

      vehicleNumber: String,
      driverContact: String,

      status: {
        type: String,
        enum: ["PENDING", "DISPATCHED", "IN_TRANSIT", "DELIVERED"],
        default: "PENDING",
      },

      trackingToken: {
        type: String,
        unique: true,
        sparse: true,
      },

      assignedAt: Date,

      liveLocation: {
        lat: Number,
        lng: Number,
        updatedAt: Date,
      },

      deliveryOtp: String,
      otpVerified: {
        type: Boolean,
        default: false,
      },
      deliveredAt: Date,
    },
    contractStatus: {
      type: String,
      enum: ["ACTIVE", "FROZEN", "CANCELLED", "COMPLETED"],
      default: "ACTIVE",
    },

    adminOverride: {
      isFrozen: { type: Boolean, default: false },
      frozenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      reason: String,
      actionAt: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Contract.discriminator(
  "HARVEST_SALE",
  HarvestSaleContractSchema,
);
