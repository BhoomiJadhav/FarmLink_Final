const Dispute = require("../Models/Dispute");
const Contract = require("../Models/CultivationContract");
const Notification = require("../Models/Notification");
const { emitToUser } = require("../socket/socket");

// Create Dispute
exports.createDispute = async (req, res) => {
  try {
    const { contractId } = req.params;

    const { category, stageId, description, requestedResolution } = req.body;

    const user = req.user; // assuming auth middleware

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    // ❗ Check if active dispute already exists
    const existing = await Dispute.findOne({
      contractId,
      status: { $in: ["OPEN", "UNDER_REVIEW"] },
    });

    if (existing) {
      return res
        .status(400)
        .json({ error: "An active dispute already exists for this contract" });
    }
    if (!category || !description || !requestedResolution) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const dispute = await Dispute.create({
      contractId,
      raisedByRole: user.role.toUpperCase(),
      raisedByUserId: user._id,
      category,
      stageId,
      description,
      requestedResolution,
      evidenceFiles: req.files?.map((f) => f.path) || [],
    });

    const User = require("../Models/User");

    // const admin = await User.findOne({ role: "ADMIN" });

    // if (admin) {
    //   await Notification.create({
    //     userId: admin._id, // Replace with actual admin id logic
    //     role: "ADMIN",
    //     type: "DISPUTE_CREATED",
    //     contractId,
    //     title: "New Dispute Raised",
    //     message: `Dispute raised for contract ${contract.contractId}`,
    //   });

    //   await emitToUser(admin._id, "dispute:created", {
    //     contractId,
    //     dispute,
    //   });
    // }

    res.status(201).json(dispute);
  } catch (err) {
    console.error("Create Dispute Error:", err);
    res.status(500).json({ error: "Failed to create dispute" });
  }
};

exports.getDisputeByContract = async (req, res) => {
  try {
    const { contractId } = req.params;

    const dispute = await Dispute.findOne({
      contractId,
    }).sort({ createdAt: -1 });

    if (!dispute) {
      return res.status(200).json(null); // no dispute yet
    }

    res.json(dispute);
  } catch (err) {
    console.error("Fetch Dispute Error:", err);
    res.status(500).json({ error: "Failed to fetch dispute" });
  }
};
exports.resolveDispute = async (req, res) => {
  try {
    const { disputeId } = req.params;
    const { resolutionNote, status } = req.body;

    const dispute = await Dispute.findById(disputeId);

    if (!dispute) {
      return res.status(404).json({ error: "Dispute not found" });
    }

    if (!["RESOLVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    dispute.status = status;
    dispute.adminResponse = resolutionNote;
    dispute.resolvedAt = new Date();

    await dispute.save();

    res.json({ message: "Dispute updated successfully", dispute });
  } catch (err) {
    console.error("Resolve dispute error:", err);
    res.status(500).json({ error: "Failed to resolve dispute" });
  }
};
