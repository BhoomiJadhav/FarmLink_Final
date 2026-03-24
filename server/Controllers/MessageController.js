const Conversation = require("../Models/Conversation");
const Contract = require("../Models/CultivationContract");
const Notification = require("../Models/Notification");
const { emitToUser } = require("../socket/socket");

// 🔹 GET MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const { contractId } = req.params;

    let conversation = await Conversation.findOne({ contractId });

    if (!conversation) {
      conversation = await Conversation.create({
        contractId,
        messages: [],
        unread: { BUYER: 0, FARMER: 0 }, // IMPORTANT
      });
    }

    // Safety for old records
    if (!conversation.unread) {
      conversation.unread = { BUYER: 0, FARMER: 0 };
      await conversation.save();
    }

    res.json(conversation);
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// 🔹 SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { sender, message } = req.body;

    let conversation = await Conversation.findOne({ contractId });

    if (!conversation) {
      conversation = await Conversation.create({
        contractId,
        messages: [],
        unread: { BUYER: 0, FARMER: 0 }, // initialize properly
      });
    }

    // 🔹 Ensure unread exists (for old DB records)
    if (!conversation.unread) {
      conversation.unread = { BUYER: 0, FARMER: 0 };
    }

    conversation.messages.push({
      sender,
      message,
    });

    // 🔹 Increase unread for opposite party
    if (sender === "BUYER") {
      conversation.unread.FARMER = (conversation.unread.FARMER || 0) + 1;
    } else {
      conversation.unread.BUYER = (conversation.unread.BUYER || 0) + 1;
    }

    await conversation.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { role } = req.body;

    const conversation = await Conversation.findOne({ contractId });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (!conversation.unread) {
      conversation.unread = { BUYER: 0, FARMER: 0 };
    }

    conversation.unread[role] = 0;

    await conversation.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.requestStageUpdate = async (req, res) => {
  try {
    const { contractId } = req.params;

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }
    // 🔹 Find current running stage
    const currentStage = contract.cultivationStages.find(
      (stage) => stage.status === "PENDING" && !stage.farmerConfirmed,
    );

    if (!currentStage) {
      return res.status(400).json({
        error: "No active stage available for request",
      });
    }

    // 🔹 Prevent duplicate request
    if (currentStage.request?.stageUpdateRequested) {
      return res.status(400).json({
        error: "Stage update already requested",
      });
    }

    // 🔹 Mark request in DB
    currentStage.request = {
      stageUpdateRequested: true,
      requestedAt: new Date(),
    };

    await contract.save();

    // 🔹 Create notification
    await Notification.create({
      userId: contract.farmer.farmerId,
      role: "FARMER",
      type: "STAGE_UPDATE_REQUEST",
      contractId: contract.contractId,
      stageName: currentStage.name,
      title: `Stage Update Requested`,
      message: `Buyer has requested update for "${currentStage.name}".`,
    });

    emitToUser(contract.farmer.farmerId.toString(), "notification", {
      type: "STAGE_UPDATE_REQUEST",
      stageName: currentStage.name,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
