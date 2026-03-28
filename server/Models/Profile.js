const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  personal: {
    fullName: String,
    phone: String,
    email: String,
    dob: String,
    governmentId: String,
    address: String,
  },
  farm: {
    farmSize: String,
    farmLocation: String,
    cropTypes: [String],
    irrigation: String,
    machinery: String,
    fertilizers: String,
  },
  preferences: {
    interests: [String],
    communication: String,
    language: String,
    additionalInfo: String,
  },
  availabilityStatus: {
    type: String,
    enum: ["AVAILABLE", "NEGOTIATING", "CONTRACTED"],
    default: "AVAILABLE",
  },
  policyVerification: {
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: Date,
    remarks: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
