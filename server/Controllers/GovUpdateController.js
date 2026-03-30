const GovtUpdate = require("../Models/GovUpdate");

exports.createUpdate = async (req, res) => {
  try {
    const { title, description, type, link } = req.body;

    const update = await GovtUpdate.create({
      title,
      description,
      type,
      link,
      createdBy: req.user._id,
    });

    res.json({ success: true, update });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUpdates = async (req, res) => {
  try {
    const updates = await GovtUpdate.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ updates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
