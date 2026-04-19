// const mongoose = require("mongoose");

// const SupportSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   role: {
//     type: String,
//     enum: ["farmer", "buyer"],
//     required: true,
//   },
//   subject: String,
//   problem: String,
//   fileUrl: String,

//   status: {
//     type: String,
//     enum: ["OPEN", "IN_PROGRESS", "NEEDS_INFO", "RESOLVED"],
//     default: "OPEN",
//   },

//   priority: {
//     type: String,
//     enum: ["LOW", "MEDIUM", "HIGH"],
//     default: "MEDIUM",
//   },

//   adminNotes: [
//     {
//       text: String,
//       addedAt: { type: Date, default: Date.now },
//     },
//   ],

//   replies: [
//     {
//       message: String,
//       from: { type: String, enum: ["ADMIN", "FARMER"] },
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
// });
// module.exports = mongoose.model("SupportTicket", SupportSchema);
const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Who raised ticket (farmer/buyer)
    role: {
      type: String,
      enum: ["farmer", "buyer"],
      required: true,
    },

    subject: String,
    problem: String,

    // 🔥 Multiple attachments
    files: [String],

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

    // 🧠 Workflow state
    waitingOn: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "ADMIN",
    },

    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },

    // Optional (future use)
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Internal notes
    adminNotes: [
      {
        text: String,
        addedAt: { type: Date, default: Date.now },
      },
    ],

    // 💬 Chat system
    replies: [
      {
        message: String,

        // 🔥 IMPORTANT: only ADMIN or USER
        from: {
          type: String,
          enum: ["ADMIN", "USER"],
        },

        seen: {
          type: Boolean,
          default: false,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("SupportTicket", SupportSchema);
