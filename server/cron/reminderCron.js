const Contract = require("../Models/CultivationContract");
const { computeStageDueInfo } = require("../utils/stageDueCalculator");
const { getReminderLevel } = require("../utils/reminderEvaluator");
const Notification = require("../Models/Notification");
const { emitToUser } = require("../socket/socket");

const runReminderCron = async () => {
  console.log("🔔 Running cultivation reminder cron");

  const contracts = await Contract.find({
    status: "ACTIVE",
    "seedDispatch.farmerConfirmed": true,
  });
  console.log("📦 Contracts found:", contracts.length);
  for (const contract of contracts) {
    console.log("✅ Contract:", contract.contractId);
    const stages = computeStageDueInfo(contract);

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      //   console.log("➡️ Stage check:", {
      //     name: stage.name,
      //     daysRemaining: stage.daysRemaining,
      //     levelSent: stage.reminder?.levelSent,
      //     farmerConfirmed: stage.farmerConfirmed,
      //   });

      // Skip completed stages

      if (stage.farmerConfirmed) continue;

      const reminderLevel = getReminderLevel({
        daysRemaining: stage.daysRemaining,
        reminderLevelSent: stage.reminder?.levelSent || 0,
      });

      if (!reminderLevel) continue;

      // 🔔 LOG
      console.log(
        `🔔 Reminder L${reminderLevel} | Contract ${contract.contractId} | Stage: ${stage.name}`,
      );

      // 1️⃣ Create FARMER notification (DB)
      await Notification.create({
        userId: contract.farmer.farmerId,
        role: "FARMER",
        type: "REMINDER",
        contractId: contract.contractId,
        stageName: stage.name,
        reminderLevel,
        title: `Stage Pending: ${stage.name}`,
        message: `Please complete the "${stage.name}" stage for contract ${contract.contractId}.`,
      });

      // 2️⃣ SOCKET → FARMER (after DB write)
      emitToUser(contract.farmer.farmerId.toString(), "notification", {
        role: "FARMER",
        type: "REMINDER",
        contractId: contract.contractId,
        stageName: stage.name,
        reminderLevel,
      });
      emitToUser(contract.farmer.farmerId.toString(), "notification", {
        test: true,
        message: "🔥 SOCKET TEST FROM CRON",
        stage: stage.name,
      });
      // 3️⃣ BUYER ESCALATION (ONLY AT LEVEL 3)
      if (reminderLevel === 3) {
        // Buyer DB notification
        await Notification.create({
          userId: contract.buyer.buyerId,
          role: "BUYER",
          type: "ESCALATION",
          contractId: contract.contractId,
          stageName: stage.name,
          reminderLevel: 3,
          title: `Stage Overdue: ${stage.name}`,
          message: `The "${stage.name}" stage is overdue for contract ${contract.contractId}.`,
        });

        // SOCKET → BUYER
        emitToUser(contract.buyer.buyerId.toString(), "notification", {
          role: "BUYER",
          type: "ESCALATION",
          contractId: contract.contractId,
          stageName: stage.name,
          reminderLevel: 3,
        });

        // Mark stage as OVERDUE
        await Contract.updateOne(
          {
            _id: contract._id,
            "cultivationStages._id": stage._id,
          },
          {
            $set: {
              "cultivationStages.$.status": "OVERDUE",
            },
          },
        );
      }

      console.log(
        `🔔 Reminder L${reminderLevel} | Contract ${contract.contractId} | Stage: ${stage.name}`,
      );

      // Persist reminder state
      await Contract.updateOne(
        {
          _id: contract._id,
          "cultivationStages._id": stage._id,
        },
        {
          $set: {
            "cultivationStages.$.reminder.levelSent": reminderLevel,
            "cultivationStages.$.reminder.lastSentAt": new Date(),
          },
        },
      );
    }
  }
};

module.exports = { runReminderCron };
