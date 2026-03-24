// const mongoose = require("mongoose");
// const HarvestListingSchema = new mongoose.Schema(
//   {
//     farmer: {
//       farmerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       name: String,
//       address: String,
//     },

//     harvest: {
//       cropName: { type: String, required: true },
//       variety: String,
//       qualityGrade: {
//         type: String,
//         enum: ["A", "B", "C", "FAQ"],
//         required: true,
//       },
//       quantityAvailable: { type: Number, required: true },
//       unit: { type: String, default: "Quintal" },

//       harvestedMonth: {
//         type: String,
//         enum: [
//           "January",
//           "February",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "August",
//           "September",
//           "October",
//           "November",
//           "December",
//         ],
//         required: true,
//       },

//       harvestedYear: {
//         type: Number,
//         required: true,
//       },
//     },

//     expectedPrice: {
//       minPricePerUnit: { type: Number, required: true },
//       maxPricePerUnit: { type: Number, required: true },
//     },

//     delivery: {
//       pickupLocation: { type: String, required: true },
//     },

//     status: {
//       type: String,
//       enum: ["OPEN", "CONTRACT_SENT", "SOLD", "EXPIRED"],
//       default: "OPEN",
//     },
//     pendingContracts: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "HarvestSaleContract",
//       default: [],
//     },
//     offersSentBy: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "User",
//       default: [],
//     },
//   },
//   { timestamps: true }
// );
// module.exports = mongoose.model("HarvestListing", HarvestListingSchema);
const mongoose = require("mongoose");

const HarvestListingSchema = new mongoose.Schema(
  {
    /* ================= FARMER DETAILS ================= */
    farmer: {
      farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
    },

    /* ================= HARVEST DETAILS ================= */
    harvest: {
      cropName: {
        type: String,
        required: true,
        trim: true,
      },
      variety: {
        type: String,
        trim: true,
      },

      quantityAvailable: {
        type: Number,
        required: true,
        min: 1,
      },
      unit: {
        type: String,
        default: "Quintal",
      },

      harvestedMonth: {
        type: String,
        enum: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        required: true,
      },

      harvestedYear: {
        type: Number,
        required: true,
      },
    },

    /* ================= QUALITY (DECLARATIVE, REAL-WORLD) ================= */
    qualityDetails: {
      cropCondition: {
        type: String,
        enum: [
          "FRESH",
          "STORED_LT_1_MONTH",
          "STORED_1_3_MONTHS",
          "STORED_GT_3_MONTHS",
        ],
        required: true,
      },

      moistureLevel: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH", "NOT_TESTED"],
        default: "NOT_TESTED",
      },

      sortingStatus: {
        type: String,
        enum: ["SORTED", "PARTIALLY_SORTED", "NOT_SORTED"],
        required: true,
      },

      images: {
        type: [String], // Cloudinary / S3 URLs
        default: [],
      },
    },

    /* ================= PRICE EXPECTATION ================= */
    expectedPrice: {
      minPricePerUnit: {
        type: Number,
        required: true,
      },
      maxPricePerUnit: {
        type: Number,
        required: true,
      },
    },

    /* ================= PICKUP LOCATION ================= */
    delivery: {
      pickupLocation: {
        addressLine: {
          type: String,
          required: true,
          trim: true,
        },
        villageOrCity: {
          type: String,
          required: true,
          trim: true,
        },
        district: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        pincode: {
          type: String,
          required: true,
          match: /^[1-9][0-9]{5}$/, // Indian PIN code validation
        },
      },
    },

    /* ================= LEGAL DECLARATION ================= */
    declarationAccepted: {
      type: Boolean,
      required: true,
    },

    /* ================= CONTRACT & STATUS ================= */
    status: {
      type: String,
      enum: ["OPEN", "CONTRACT_SENT", "SOLD", "EXPIRED"],
      default: "OPEN",
    },

    pendingContracts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "HarvestSaleContract",
      default: [],
    },

    offersSentBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HarvestListing", HarvestListingSchema);
