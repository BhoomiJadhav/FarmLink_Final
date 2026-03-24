const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// const protect = async (req, res, next) => {
//   let token;

//   // 1️⃣ Try cookie first
//   if (req.cookies && req.cookies.token) {
//     token = req.cookies.token;
//   }

//   // 2️⃣ Fallback to Authorization header
//   if (
//     !token &&
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authorized to access this route",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Token invalid or expired",
//     });
//   }
// };

// Role-based authorization

const protect = async (req, res, next) => {
  try {
    let token;

    // 🔥 MUST read Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log("❌ NO TOKEN RECEIVED");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ USER NOT FOUND FOR TOKEN");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("✅ AUTH OK:", user._id, user.role);

    next();
  } catch (err) {
    console.error("❌ AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
const checkProfileCompletion = (req, res, next) => {
  if (!req.user.isProfileComplete) {
    return res.status(403).json({ message: "Profile not complete" });
  }
  next();
};
module.exports = {
  protect,
  authorize,
  checkProfileCompletion,
};
