const Contract = require("../Models/BaseContract");

const initStages = (contract) => {
  const sowing = contract.sowingDate;

  const stages = [
    { name: "Germination", days: 7 },
    { name: "Vegetative Growth", days: 21 },
    { name: "Tillering", days: 35 },
    { name: "Flowering", days: 60 },
    { name: "Harvest", days: 90 },
  ];

  contract.cultivationStages = stages.map((s, i) => ({
    name: s.name,
    expectedDate: new Date(sowing.getTime() + s.days * 86400000),
    status: i === 0 ? "PENDING" : "LOCKED",
  }));
};

/* BUYER CONFIRMS SEED SENT */
exports.buyerConfirmSeed = async (req, res) => {
  const contract = await Contract.findById(req.params.contractId);
  contract.seedDispatch.buyerConfirmed = true;
  contract.seedDispatch.buyerConfirmedAt = new Date();
  await contract.save();
  res.json({ message: "Seed dispatch confirmed by buyer" });
};

/* FARMER CONFIRMS SEED RECEIVED */
exports.farmerConfirmSeed = async (req, res) => {
  const contract = await Contract.findById(req.params.contractId);

  if (!contract.seedDispatch.buyerConfirmed)
    return res.status(400).json({ message: "Buyer confirmation pending" });

  contract.seedDispatch.farmerConfirmed = true;
  contract.seedDispatch.farmerConfirmedAt = new Date();
  contract.seedDispatch.farmerSeedImages = req.files.map((f) => f.path);

  contract.sowingDate = new Date();
  initStages(contract);

  await contract.save();
  res.json({ message: "Seed received confirmed by farmer" });
};

/* FARMER SUBMITS STAGE */
exports.farmerSubmitStage = async (req, res) => {
  const contract = await Contract.findById(req.params.contractId);
  const stage = contract.cultivationStages[req.params.stageIndex];

  stage.farmerConfirmed = true;
  stage.farmerImages = req.files.map((f) => f.path);

  await contract.save();
  res.json({ message: "Stage proof submitted" });
};

/* BUYER VERIFIES STAGE */
const Contract = require("../Models/CultivationContract");

exports.buyerVerifyStage = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.contractId);
    const i = req.params.stageIndex;

    const stage = contract.cultivationStages[i];

    stage.status = "COMPLETED";
    stage.completedDate = new Date();
    stage.buyerVerified = true;
    console.log("=== STAGE VERIFIED ===");
    console.log("Stage Name:", stage.name);

    contract.payments.forEach((payment) => {
      console.log("Payment Type:", payment.type);
      console.log("Payment dueStage:", payment.dueStage);
      console.log("Payment Status Before:", payment.status);
    });
    /* 🔓 Unlock next stage */
    if (contract.cultivationStages[i + 1])
      contract.cultivationStages[i + 1].status = "PENDING";

    /* ================= PAYMENT UNLOCK LOGIC ================= */

    const stageMap = {
      "Germination Phase": "GERMINATION",
      "Vegetative Growth": "VEGETATIVE",
      "Tillering Stage": "TILLERING",
      "Flowering & Grain Formation": "FLOWERING",
      "Ripening & Harvest": "HARVEST",
    };

    const completedStageKey = stageMap[stage.name];

    contract.payments.forEach((payment) => {
      if (
        payment.status === "LOCKED" &&
        payment.dueStage === completedStageKey
      ) {
        payment.status = "DUE";
        payment.dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      }
      if (
        payment.status === "LOCKED" &&
        payment.dueStage === completedStageKey
      ) {
        console.log(">>> UNLOCKING PAYMENT:", payment.type);
        payment.status = "DUE";
      }
    });

    /* ================= HARVEST COMPLETION ================= */

    const allCompleted = contract.cultivationStages.every(
      (s) => s.status === "COMPLETED",
    );

    if (allCompleted) {
      contract.status = "HARVEST_COMPLETED";
    }

    await contract.save();
    res.json({ message: "Stage verified" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
