// const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//     unique: true,
//   },
//   personal: {
//     fullName: String,
//     phone: String,
//     email: String,
//     dob: String,
//     governmentId: String,
//     address: String,
//   },
//   farm: {
//     name: String,
//     address: String,
//     size: String,
//     since: String,
//     activities: [String],
//     soilType: String,
//     waterSource: String,
//   },
//   preferences: {
//     interests: [String],
//     communication: String,
//     language: String,
//     additionalInfo: String,
//   },
// });
// module.exports = mongoose.model("Profile", profileSchema);
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
});

module.exports = mongoose.model("Profile", profileSchema);
