// GET /ticket/my
const Support = require("../Models/Support");

exports.getMyTickets = async (req, res) => {
  try {
    console.log("LOGGED USER:", req.user); // 🔥 ADD THIS

    const tickets = await Support.find({ userId: req.user._id });

    console.log("TICKETS FOUND:", tickets); // 🔥 ADD THIS

    res.json({ success: true, tickets });
  } catch (err) {
    console.error(err);
  }
};
exports.createFarmerTicket = async (req, res) => {
  try {
    const ticket = await Support.create({
      userId: req.user._id,
      role: "farmer",
      subject: req.body.subject,
      problem: req.body.problem,
      file: req.file?.path || null,
    });

    res.json({ success: true, ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
exports.createBuyerTicket = async (req, res) => {
  try {
    const ticket = await Support.create({
      userId: req.user._id,
      role: "buyer",
      subject: req.body.subject,
      problem: req.body.problem,
      file: req.file?.path || null,
    });

    res.json({ success: true, ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
