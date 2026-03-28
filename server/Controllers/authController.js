const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Manual Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "farmer",
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        name: user.name,
        email: user.email,
        id: user._id,
      },
      redirectTo:
        user.role === "farmer"
          ? user.isProfileComplete
            ? `/farmer/dashboard`
            : "/farmer/complete-profile"
          : user.isProfileComplete
            ? `/buyer/dashboard`
            : "/buyer/complete-profile",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manual Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (user.role === "admin" && user.email !== "admin@farmlink.com") {
      return res.status(403).json({ message: "Unauthorized admin access" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.password) {
      return res.status(400).json({ message: "Please login with Google" });
    }

    // Generate token
    if (user.status === "blocked") {
      return res.status(403).json({ message: "User is blocked by admin" });
    }
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        name: user.name,
        email: user.email,
        id: user._id,
      },

      // redirectTo:
      //   user.role === "farmer"
      //     ? user.isProfileComplete
      //       ? `/farmer/dashboard`
      //       : "/farmer/complete-profile"
      //     : user.isProfileComplete
      //     ? `/buyer/dashboard`
      //     : "/buyer/complete-profile",
      redirectTo:
        user.role === "admin"
          ? "/admin/dashboard"
          : user.role === "farmer"
            ? user.isProfileComplete
              ? `/farmer/dashboard`
              : "/farmer/complete-profile"
            : user.isProfileComplete
              ? `/buyer/dashboard`
              : "/buyer/complete-profile",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Google Login

exports.googleLogin = async (req, res) => {
  try {
    const { tokenId, role } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with chosen role
      user = await User.create({
        name,
        email,
        googleId: ticket.getUserId(),
        profileImage: picture,
        role: role || "farmer",
      });
    } else {
      // ✅ If user exists but role mismatch, reject
      if (role && user.role !== role) {
        return res.status(400).json({
          success: false,
          message: `This email is already registered as a ${user.role}. Please login as ${user.role}.`,
        });
      }

      if (!user.googleId) {
        user.googleId = ticket.getUserId();
        user.profileImage = picture;
        await user.save();
      }
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        name: user.name,
        email: user.email,
        id: user._id,
      },
      redirectTo:
        user.role === "farmer"
          ? user.isProfileComplete
            ? `/farmer/dashboard`
            : "/farmer/complete-profile"
          : user.isProfileComplete
            ? `/buyer/dashboard`
            : "/buyer/complete-profile",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
