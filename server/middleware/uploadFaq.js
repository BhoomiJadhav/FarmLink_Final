const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/faq",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const faqUpload = multer({ storage });

module.exports = faqUpload; // ✅ THIS WAS MISSING
