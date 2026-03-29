const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/policies",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const policyUpload = multer({ storage });

module.exports = policyUpload; // ✅ THIS WAS MISSING
