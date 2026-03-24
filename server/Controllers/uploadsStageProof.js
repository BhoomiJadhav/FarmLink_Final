const Contract = require("../Models/CultivationContract");

exports.uploadStageProof = async (req, res) => {
  try {
    const { contractId, stageId } = req.params;

    const contract = await Contract.findById(contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    const stage = contract.cultivationStages.id(stageId);
    if (!stage) return res.status(404).json({ message: "Stage not found" });

    if (stage.status === "LOCKED") {
      return res.status(400).json({
        message: "Stage is locked. Complete previous requirements first.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    req.files.forEach((file) => {
      stage.farmerImages.push(file.filename);
    });

    stage.farmerConfirmed = true;
    stage.status = "PENDING";

    contract.tracking.lastUpdatedAt = new Date();
    await contract.save();

    res.status(200).json({
      message: "Stage proof uploaded successfully",
      images: stage.farmerImages,
      stageStatus: stage.status,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.verifyStage = async (req, res) => {
//   try {
//     const { id, stageId } = req.params;
//     const { approved, remark } = req.body;

//     const contract = await Contract.findById(id);
//     if (!contract)
//       return res.status(404).json({ message: "Contract not found" });

//     // permission
//     if (String(contract.buyer.buyerId) !== String(req.user._id)) {
//       return res.status(403).json({ message: "Only buyer can verify stages" });
//     }

//     const stageIndex = contract.cultivationStages.findIndex(
//       (s) => String(s._id) === stageId,
//     );

//     if (stageIndex === -1)
//       return res.status(404).json({ message: "Stage not found" });

//     const stage = contract.cultivationStages[stageIndex];

//     if (!stage.farmerConfirmed) {
//       return res.status(400).json({ message: "Farmer proof not uploaded yet" });
//     }

//     if (approved) {
//       stage.status = "COMPLETED";
//       stage.buyerVerified = true;

//       // unlock next stage
//       if (contract.cultivationStages[stageIndex + 1]) {
//         contract.cultivationStages[stageIndex + 1].status = "PENDING";
//       }
//     } else {
//       stage.farmerConfirmed = false;
//       stage.farmerImages = [];
//     }
//     // Block first stage if advance not completed
//     const advancePayment = contract.payments.find((p) => p.type === "ADVANCE");

//     if (!advancePayment || advancePayment.status !== "COMPLETED") {
//       return res.status(400).json({
//         message: "Advance payment must be completed before cultivation begins.",
//       });
//     }

//     contract.tracking.lastUpdatedAt = new Date();
//     await contract.save();

//     res.json({ message: "Stage verification updated", stage });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.verifyStage = async (req, res) => {
  try {
    const { id, stageId } = req.params;
    const { approved } = req.body;

    const contract = await Contract.findById(id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (String(contract.buyer.buyerId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Only buyer can verify stages" });
    }

    const stageIndex = contract.cultivationStages.findIndex(
      (s) => String(s._id) === stageId,
    );

    if (stageIndex === -1)
      return res.status(404).json({ message: "Stage not found" });

    const stage = contract.cultivationStages[stageIndex];

    // 🔒 BLOCK FIRST STAGE IF ADVANCE NOT COMPLETED
    if (stageIndex === 0) {
      const advancePayment = contract.payments.find(
        (p) => p.type === "ADVANCE",
      );

      if (!advancePayment || advancePayment.status !== "COMPLETED") {
        return res.status(400).json({
          message:
            "Advance payment must be completed before cultivation begins.",
        });
      }
    }

    if (!stage.farmerConfirmed) {
      return res.status(400).json({
        message: "Farmer proof not uploaded yet",
      });
    }

    if (approved) {
      stage.status = "COMPLETED";
      stage.buyerVerified = true;
      /* ================= HARVEST COMPLETION ================= */

      const allCompleted = contract.cultivationStages.every(
        (s) => s.status === "COMPLETED",
      );

      if (allCompleted) {
        contract.status = "HARVEST_COMPLETED";
      }
      // unlock next stage
      if (contract.cultivationStages[stageIndex + 1]) {
        contract.cultivationStages[stageIndex + 1].status = "PENDING";
      }
      /* ================= PAYMENT UNLOCK LOGIC ================= */

      contract.payments.forEach((payment) => {
        if (
          payment.status === "LOCKED" &&
          stage.name.toUpperCase().includes(payment.dueStage)
        ) {
          payment.status = "DUE";
          payment.dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
          console.log(">>> PAYMENT UNLOCKED:", payment.type);
        }
      });
    } else {
      stage.farmerConfirmed = false;
      stage.farmerImages = [];
    }

    contract.tracking.lastUpdatedAt = new Date();
    await contract.save();

    res.json({ message: "Stage verification updated", stage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
