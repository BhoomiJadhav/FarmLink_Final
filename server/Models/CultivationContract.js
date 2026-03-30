const Contract = require("./BaseContract.js");
const mongoose = require("mongoose");

const CultivationContractSchema = new mongoose.Schema(
  {
    /* ======================================================
        BUYER SNAPSHOT (IMMUTABLE)
     ====================================================== */
    buyer: {
      buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      address: String,
      mobile: String,
      email: String,
    },

    /* ======================================================
        FARMER SNAPSHOT (IMMUTABLE)
     ====================================================== */
    farmer: {
      farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      address: String,
    },

    /* ======================================================
        CROP & AGREEMENT DETAILS
     ====================================================== */
    cropDetails: {
      cropName: String,
      variety: String,
      season: String,
      contractedArea: String,
      expectedYield: String,

      fertilizer: {
        specifiedByBuyer: Boolean,
        fertilizerDetails: String,
      },

      cultivationGuidelines: String,
    },
    seed: {
      provider: {
        type: String,
        enum: ["BUYER", "FARMER"],
        default: "BUYER",
      },
      dispatchedAt: Date,
      receivedAt: Date,
    },
    /* ======================================================
        PRICING & PAYMENT AGREEMENT (RESTORED)
     ====================================================== */
    pricing: {
      agreedPricePerUnit: Number,
      estimatedValue: Number,

      advancePaymentPercent: Number,
      advanceAmount: Number,

      finalPaymentTerms: String,

      priceNegotiable: {
        type: Boolean,
        default: true,
      },
    },
    payments: [
      {
        type: {
          type: String,
          enum: ["ADVANCE", "MID", "FINAL"],
          required: true,
        },

        percentage: {
          type: Number,
          required: true,
        },

        amount: {
          type: Number,
          required: true,
        },

        dueStage: {
          type: String,
          enum: [
            "SEED_CONFIRMATION",
            "GERMINATION",
            "FLOWERING",
            "HARVEST",
            "DELIVERY",
          ],
          required: true,
        },

        status: {
          type: String,
          enum: [
            "LOCKED",
            "DUE",
            "PENDING_VERIFICATION",
            "VERIFIED",
            "COMPLETED",
            "DELAYED",
            "PENALIZED",
          ],
          default: "LOCKED",
        },

        dueDate: Date,
        paidAt: Date,

        penalty: {
          percentagePerWeek: {
            type: Number,
            default: 1,
          },
          maxCapPercent: {
            type: Number,
            default: 10,
          },
          appliedAmount: {
            type: Number,
            default: 0,
          },
        },

        buyerProof: {
          fileUrl: String,
          uploadedAt: Date,
        },

        farmerConfirmation: {
          fileUrl: String,
          confirmedAt: Date,
        },
      },
    ],
    /* ======================================================
        DELIVERY TERMS (RESTORED)
     ====================================================== */
    delivery: {
      approxDeliveryMonth: String,
      deliveryLocation: String,

      transportationByBuyer: Boolean,
      transportationIncludedInPrice: Boolean,

      deliveryManagedBy: {
        type: String,
        enum: ["BUYER", "FARMER", "THIRD_PARTY"],
      },
    },

    /* ======================================================
        INSURANCE & RISK (RESTORED)
     ====================================================== */
    insurance: {
      providedByCompany: { type: Boolean, default: false },
      pmfbyMandatory: { type: Boolean, default: true },

      providerName: String,
      policyNumber: String,
      policyValidTill: Date,

      documentUrl: String, // 🔥 ADD THIS (VERY IMPORTANT)

      riskManagement: {
        flood: String,
        drought: String,
      },
    },
    policyVerification: {
      status: {
        type: String,
        enum: ["PENDING", "VERIFIED", "REJECTED", "RESUBMITTED"],
        default: "PENDING",
      },
      remarks: String,
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      verifiedAt: Date,
    },
    /* ======================================================
        RESPONSIBILITIES (LEGAL)
     ====================================================== */
    responsibilities: {
      buyerResponsibilities: {
        type: [String],
        default: [
          "Timely payment",
          "Provide inputs as agreed",
          "Clear communication",
        ],
      },
      farmerResponsibilities: [String],
    },

    /* ======================================================
        LEGAL & COMPLIANCE
     ====================================================== */
    legal: {
      applicableLaws: {
        type: String,
        default:
          "Indian Contract Act 1872, Essential Commodities Act, Farmlink Platform Policy",
      },

      disputeResolutionMethod: {
        type: String,
        default: "Farmlink Mediation followed by Court",
      },
    },

    /* ======================================================
        EXECUTION: SEED DISPATCH (WEEK 1)
     ====================================================== */
    seedDispatch: {
      buyerConfirmed: { type: Boolean, default: false },
      buyerConfirmedAt: Date,

      farmerConfirmed: { type: Boolean, default: false },
      farmerConfirmedAt: Date,

      farmerSeedImages: [String],
    },
    seedSupply: {
      provider: {
        type: String,
        enum: ["BUYER", "FARMER"],
        required: true,
        default: "BUYER",
      },

      status: {
        type: String,
        enum: ["PENDING", "DISPATCHED", "RECEIVED", "VERIFIED"],
        default: "PENDING",
      },

      seedDetails: {
        type: {
          cropName: String,
          variety: String,
          brand: String,
          quantityKg: Number,
        },
        default: null,
      },

      dispatchProof: {
        type: {
          images: [String],
          remarks: String,
          dispatchedAt: Date,
        },
        default: null,
      },

      receiveProof: {
        type: {
          images: [String],
          remarks: String,
          receivedAt: Date,
        },
        default: null,
      },
    },

    /* ======================================================
        EXECUTION: CULTIVATION
     ====================================================== */
    sowingDate: Date,

    cultivationStages: [
      {
        name: String,

        expectedDate: Date,
        expectedDays: Number,

        completedDate: Date,

        status: {
          type: String,
          enum: ["LOCKED", "PENDING", "COMPLETED"],
          default: "LOCKED",
        },

        farmerConfirmed: { type: Boolean, default: false },
        buyerVerified: { type: Boolean, default: false },

        farmerImages: [String],

        reminder: {
          levelSent: {
            type: Number,
            default: 0,
          },
          lastSentAt: Date,
        },
        request: {
          stageUpdateRequested: {
            type: Boolean,
            default: false,
          },
          requestedAt: {
            type: Date,
          },
        },
      },
    ],

    /* ======================================================
        TRACKING (DERIVED STATE)
     ====================================================== */
    tracking: {
      currentStage: {
        type: String,
        enum: [
          "SOWING",
          "GERMINATION",
          "VEGETATIVE",
          "TILLERING",
          "FLOWERING",
          "HARVEST",
        ],
      },

      progressPercent: { type: Number, default: 0 },
      lastUpdatedAt: Date,
    },

    /* ======================================================
       NEW: AI QUALITY VERIFICATION (GATEKEEPER)
    ====================================================== */
    aiQualityDetails: {
      grade: {
        type: String,
        enum: ["Chalky", "Discolored", "Premium", "Pending"],
        default: "Pending",
      },
      confidence: Number,
      breakdown: {
        Chalky: Number,
        Discolored: Number,
        Premium: Number,
      },
      verifiedAt: Date,
    },

    /* ======================================================
        DELIVERY TRACKING
     ====================================================== */
    deliveryTracking: {
      pickupLocation: String,
      deliveryLocation: String,
      expectedWindow: String,

      milestones: [
        {
          label: String,
          done: { type: Boolean, default: false },
          date: Date,
        },
      ],
    },

    /* ======================================================
       REAL DELIVERY EXECUTION (NEW)
    ====================================================== */
    deliveryExecution: {
      vehicleNumber: String,
      driverContact: String,

      status: {
        type: String,
        enum: ["PENDING", "IN_TRANSIT", "DELIVERED"],
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

      pickedUpAt: Date,
      deliveredAt: Date,
    },
    negotiation: {
      negotiationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Negotiation",
      },

      finalPrice: Number,

      negotiationSnapshot: {
        type: Array,
        default: [],
      },
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
  { timestamps: true },
);

module.exports = Contract.discriminator(
  "CULTIVATION",
  CultivationContractSchema,
);
