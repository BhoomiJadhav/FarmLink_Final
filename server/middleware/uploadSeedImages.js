const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const seedStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const contractId = req.params.id || "unknown";

    let subFolder = "general";

    if (req.originalUrl.includes("seed/dispatch")) {
      subFolder = "buyer-dispatch";
    } else if (req.originalUrl.includes("seed/confirm")) {
      subFolder = "farmer-receipt";
    } else if (req.originalUrl.includes("seed/upload")) {
      subFolder = "farmer-self";
    }

    return {
      folder: `seed-supply/${subFolder}/contract_${contractId}`,
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 1200, crop: "limit" }],
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const uploadSeedImages = multer({
  storage: seedStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadSeedImages;
