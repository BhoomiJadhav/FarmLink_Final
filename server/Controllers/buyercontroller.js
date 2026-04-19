// controllers/buyerController.js
const User = require("../Models/User");
const BuyerProfile = require("../Models/buyer");

// Save or update buyer profile
exports.completeProfile = async (req, res) => {
  try {
    const { id } = req.params; // userId from route
    const {
      buyerType,
      fullName,
      phone,
      address,
      companyName,
      contractDetails,
    } = req.body;

    const user = await User.findById(id);
    if (!user || user.role !== "buyer") {
      return res.status(404).json({ message: "Buyer user not found" });
    }

    // Create or update buyer profile
    let profile = await BuyerProfile.findOne({ user: id });

    if (!profile) {
      profile = new BuyerProfile({
        user: id,
        buyerType,
        phone,
        address,
        companyName,
        contractDetails,
      });
    } else {
      profile.buyerType = buyerType;
      profile.phone = phone;
      profile.address = address;
      profile.companyName = companyName;
      profile.contractDetails = contractDetails;
    }

    await profile.save();

    // Mark user profile as complete
    user.name = fullName || user.name;
    user.isProfileComplete = true;
    await user.save();

    res.json({
      success: true,
      message: "Buyer profile saved successfully",
      profile,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getBuyerDetails = async (req, res) => {
  try {
    const buyerId = req.user.id; // from auth middleware

    const user = await User.findById(buyerId).select(
      "_id name email role isProfileComplete",
    );

    if (!user || user.role !== "buyer") {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const buyerProfile = await BuyerProfile.findOne({ user: buyerId }).select(
      "buyerType phone address companyName contractDetails",
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
      buyerProfile: buyerProfile || null,
    });
  } catch (error) {
    console.error("Get buyer details failed:", error);
    res.status(500).json({ message: "Failed to fetch buyer details" });
  }
};
exports.saveBuyerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { personal, buyer } = req.body;

    let profile = await BuyerProfile.findOne({ user: userId });

    if (!profile) {
      profile = new BuyerProfile({ user: userId });
    }

    profile.phone = buyer?.phone || personal?.phone || profile.phone;
    profile.address = buyer?.address || personal?.address || profile.address;
    profile.buyerType = buyer?.buyerType || profile.buyerType;
    profile.companyName = buyer?.companyName || profile.companyName;
    profile.contractDetails = buyer?.contractDetails || profile.contractDetails;

    await profile.save();

    await User.findByIdAndUpdate(userId, {
      name: personal?.fullName,
      isProfileComplete: true,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
