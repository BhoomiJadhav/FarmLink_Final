const Profile = require("../Models/Profile");
const User = require("../Models/User");

const saveProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Destructure sections safely
    const { personal, farm, preferences } = req.body;

    const updateData = {
      ...(personal && { personal }),
      ...(farm && { farm }),
      ...(preferences && { preferences }),
    };

    const existing = await Profile.findOne({ userId });

    if (existing) {
      await Profile.updateOne({ userId }, { $set: updateData });
    } else {
      await Profile.create({ userId, ...updateData });
    }

    await User.findByIdAndUpdate(userId, { isProfileComplete: true });

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      userId,
    });
  } catch (err) {
    console.error("Save Profile Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password").lean();

    const profile = await Profile.findOne({ userId }).lean();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
      profile,
    });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// Add this in your controller
const getProfileById = async (req, res) => {
  try {
    let { id } = req.params;

    // If client asked for "me", require authentication and use req.user id
    if (id === "me") {
      if (!req.user || !(req.user._id || req.user.id)) {
        return res
          .status(401)
          .json({ success: false, message: "Not authenticated" });
      }
      id = req.user._id || req.user.id;
    }

    // Validate ObjectId (very important)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });
    }

    // Fetch user, profile and contracts
    const user = await User.findById(id).select("-password").lean();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const profile = await Profile.findOne({ userId: id }).lean();
    const contracts = await Contract.find({ farmerId: id })
      .sort({ createdAt: -1 })
      .lean();

    // Map contracts -> crop summary
    const crops = (contracts || []).map((c) => ({
      id: c._id,
      name: c.cropDetails?.cropName || c.crop || c.cropName || "Unknown",
      qty: c.cropDetails?.quantity || c.quantity || c.qty || "-",
      price:
        c.pricing?.pricePerUnit || c.pricing?.totalContract || c.price || "₹—",
      status: c.status || "active",
    }));

    return res.status(200).json({
      success: true,
      user,
      profile,
      crops,
      contracts,
      contractsCount: contracts.length,
    });
  } catch (err) {
    console.error("Get Profile By ID Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getAllFarmers = async (req, res) => {
  try {
    // Only fetch users who are farmers
    const profiles = await Profile.find().populate("userId", "role email");
    const farmers = profiles.filter((p) => p.userId?.role === "farmer");
    res.status(200).json(farmers);
  } catch (err) {
    console.error("Get All Farmers Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { saveProfile, getProfile, getAllFarmers, getProfileById };
