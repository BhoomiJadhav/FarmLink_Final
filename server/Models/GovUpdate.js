const mongoose = require("mongoose");

const govtUpdateSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    type: {
      type: String,
      enum: ["SCHEME", "ALERT", "DEADLINE"],
      default: "SCHEME",
    },

    link: String, // optional (apply link)

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("GovtUpdate", govtUpdateSchema);
