const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/stages";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const stageName = req.stageName || "stage";
    const safeStage = stageName.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const ext = path.extname(file.originalname);
    const unique = Date.now();

    cb(null, `${safeStage}-${unique}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
