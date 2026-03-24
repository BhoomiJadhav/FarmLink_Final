const mongoose = require("mongoose");

const buyerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one-to-one with User
    },
    buyerType: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    companyName: { type: String },
    contractDetails: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BuyerProfile", buyerProfileSchema);
