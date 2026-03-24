// const Contract = require("../Models/BaseContract.js");
// const { CONTRACT_STATUS } = require("../constants/contractEnums.js");
// const { computeStageDueInfo } = require("../utils/stageDueCalculator");

// /* =========================
//    HELPER: MAP STAGE STATUS
// ========================= */
// function mapStageStatus(status) {
//   if (status === "COMPLETED") return "COMPLETED";
//   if (status === "PENDING") return "IN_PROGRESS";
//   return "UPCOMING"; // LOCKED
// }

// /* =========================
//    GET TRACKING DETAILS
//    GET /api/contracts/:id/tracking
// ========================= */
// exports.getCultivationTracking = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const contract = await Contract.findById(id).lean();
//     const stagesWithDueInfo = computeStageDueInfo(contract);

//     if (!contract)
//       return res.status(404).json({ message: "Contract not found" });

//     if (contract.status !== CONTRACT_STATUS.ACTIVE) {
//       return res.status(400).json({
//         message: "Tracking available only for ACTIVE contracts",
//       });
//     }

//     /* ================= KPI CALCULATIONS ================= */
//     const totalStages = contract.cultivationStages.length;
//     const completedStages = contract.cultivationStages.filter(
//       (s) => s.status === "COMPLETED",
//     ).length;

//     const progressPercent =
//       totalStages === 0 ? 0 : Math.round((completedStages / totalStages) * 100);

//     const currentStageObj = contract.cultivationStages.find(
//       (s) => s.status === "PENDING",
//     );

//     const currentStage = currentStageObj?.name || "Not Started";

//     /* ================= CULTIVATION TIMELINE ================= */
//     const cultivationTimeline = stagesWithDueInfo.map((stage) => ({
//       name: stage.name,

//       expectedDays: stage.expectedDays,
//       dueDate: stage.dueDate,
//       daysRemaining: stage.daysRemaining,
//       isOverdue: stage.isOverdue,

//       completedDate: stage.completedDate,
//       status: mapStageStatus(stage.status),

//       farmerConfirmed: stage.farmerConfirmed,
//       buyerVerified: stage.buyerVerified,
//       images: stage.farmerImages || [],
//     }));

//     /* ================= PAYMENTS ================= */
//     const payments = contract.paymentSchedule.map((p) => ({
//       type: p.type,
//       amount: p.amount,
//       status:
//         p.status === "PAID"
//           ? "PAID"
//           : p.status === "PENDING"
//             ? "DUE"
//             : "LOCKED",
//       paidAt: p.paidAt,
//     }));

//     const nextPayment = payments.find((p) => p.status === "DUE") || null;

//     /* ================= DELIVERY ================= */
//     const delivery = contract.deliveryTracking || {
//       pickupLocation: null,
//       deliveryLocation: null,
//       expectedWindow: null,
//       milestones: [],
//     };

//     /* ================= FINAL RESPONSE ================= */
//     return res.json({
//       contractId: contract._id,
//       contractStatus: contract.status,

//       kpis: {
//         progressPercent,
//         completedStages,
//         totalStages,
//         currentStage,
//         estimatedValue: contract.payment?.estimatedValue || null,
//         advanceAmount: contract.payment?.advanceAmount || null,
//       },

//       cultivation: {
//         sowingDate: contract.sowingDate,
//         stages: cultivationTimeline,
//       },

//       payments: {
//         schedule: payments,
//         nextPayment,
//       },

//       delivery,
//     });
//   } catch (error) {
//     console.error("Tracking fetch error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// // };
// const Contract = require("../Models/CultivationContract.js");

// const { CONTRACT_STATUS } = require("../constants/contractEnums.js");
// const { computeStageDueInfo } = require("../utils/stageDueCalculator");

// /* =========================
//    HELPER: MAP STAGE STATUS
// ========================= */
// function mapStageStatus(status) {
//   if (status === "COMPLETED") return "COMPLETED";
//   if (status === "PENDING") return "IN_PROGRESS";
//   return "UPCOMING";
// }

// /* =========================
//    HELPER: APPLY PENALTY
// ========================= */
// function applyPenaltyIfLate(payment) {
//   if (!payment.dueDate) return;
//   if (payment.status !== "DUE") return;

//   const now = new Date();
//   if (now <= payment.dueDate) return;

//   const daysLate = Math.ceil((now - payment.dueDate) / (24 * 60 * 60 * 1000));

//   const dailyPercent = 1; // 1% per day

//   const penaltyPercent = Math.min(daysLate * dailyPercent, 10);

//   payment.penalty = {
//     appliedAmount: (penaltyPercent / 100) * payment.amount,
//   };

//   payment.status = "PENALIZED";
// }

// /* =========================
//    GET TRACKING DETAILS
// ========================= */
// exports.getCultivationTracking = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const contract = await Contract.findById(id);
//     if (!contract)
//       return res.status(404).json({ message: "Contract not found" });

//     const allowedStatuses = [
//       CONTRACT_STATUS.ACTIVE,
//       CONTRACT_STATUS.HARVEST_COMPLETED,
//       CONTRACT_STATUS.DELIVERY_IN_PROGRESS,
//       CONTRACT_STATUS.DELIVERY_COMPLETED,
//       CONTRACT_STATUS.FINAL_PAYMENT_PENDING,
//     ];

//     if (!allowedStatuses.includes(contract.status)) {
//       return res.status(400).json({
//         message: "Tracking not available for this contract status",
//       });
//     }

//     /* ================= KPI ================= */
//     const totalStages = contract.cultivationStages.length;
//     const completedStages = contract.cultivationStages.filter(
//       (s) => s.status === "COMPLETED",
//     ).length;

//     const progressPercent =
//       totalStages === 0 ? 0 : Math.round((completedStages / totalStages) * 100);

//     const currentStageObj = contract.cultivationStages.find(
//       (s) => s.status === "PENDING",
//     );

//     const currentStage = currentStageObj?.name || "Not Started";

//     /* ================= STAGES ================= */
//     const stagesWithDueInfo = computeStageDueInfo(contract);

//     const cultivationTimeline = stagesWithDueInfo.map((stage) => ({
//       name: stage.name,
//       expectedDays: stage.expectedDays,
//       dueDate: stage.dueDate,
//       daysRemaining: stage.daysRemaining,
//       isOverdue: stage.isOverdue,
//       completedDate: stage.completedDate,
//       status: mapStageStatus(stage.status),
//       farmerConfirmed: stage.farmerConfirmed,
//       buyerVerified: stage.buyerVerified,
//       images: stage.farmerImages || [],
//     }));

//     /* ================= PAYMENTS ================= */
//     /* ================= FINAL PAYMENT UNLOCK LOGIC ================= */

//     const now = new Date();

//     // Find FINAL payment
//     const finalPayment = contract.payments.find((p) => p.type === "FINAL");

//     // If delivery completed and final is locked
//     if (
//       finalPayment &&
//       finalPayment.status === "LOCKED" &&
//       contract.status === CONTRACT_STATUS.DELIVERY_COMPLETED &&
//       finalPayment.dueDate &&
//       now >= finalPayment.dueDate
//     ) {
//       // Unlock FINAL payment
//       finalPayment.status = "DUE";

//       // Buyer gets 3 days to pay
//       finalPayment.dueDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
//     }

//     /* ================= PENALTY CHECK ================= */

//     contract.payments.forEach(applyPenaltyIfLate);

//     await contract.save();

//     const payments = contract.payments.map((p) => ({
//       _id: p._id,
//       type: p.type,
//       amount: p.amount,
//       status: p.status,
//       dueDate: p.dueDate,
//       penalty: p.penalty?.appliedAmount || 0,
//       buyerProof: p.buyerProof,
//       farmerConfirmation: p.farmerConfirmation,
//       paidAt: p.paidAt,
//     }));

//     const nextPayment = payments.find((p) => p.status === "DUE") || null;

//     /* ================= FINAL RESPONSE ================= */
//     return res.json({
//       contractId: contract._id,
//       contractStatus: contract.status,

//       kpis: {
//         progressPercent,
//         completedStages,
//         totalStages,
//         currentStage,
//         totalAmount: contract.pricing.totalAmount,
//       },

//       cultivation: {
//         stages: cultivationTimeline,
//       },

//       payments: {
//         schedule: payments,
//         nextPayment,
//       },
//     });
//   } catch (error) {
//     console.error("Tracking fetch error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// /* =============================================
//    NEW: SAVE AI QUALITY & UNLOCK DELIVERY
// ============================================= */
// exports.saveAiQualityResult = async (req, res) => {
//   try {
//     const { id } = req.params; // Contract ID
//     const { label, confidence, breakdown } = req.body;

//     const contract = await Contract.findById(id);
//     if (!contract) return res.status(404).json({ message: "Contract not found" });

//     // 1. Update the AI specific fields
//     contract.aiQualityDetails = {
//       grade: label,
//       confidence: confidence,
//       breakdown: breakdown,
//       verifiedAt: new Date()
//     };

//     // 2. Change status to allow Delivery Phase
//     // Logic: Once AI confirms quality, we move from ACTIVE/HARVEST_COMPLETED to DELIVERY_IN_PROGRESS
//     if (contract.status === CONTRACT_STATUS.ACTIVE) {
//         contract.status = CONTRACT_STATUS.DELIVERY_IN_PROGRESS;
//     }

//     await contract.save();

//     return res.json({
//       success: true,
//       message: `Quality verified as ${label}. Delivery phase is now active.`,
//       newStatus: contract.status
//     });
//   } catch (error) {
//     console.error("AI Result Save Error:", error);
//     res.status(500).json({ message: "Failed to save AI quality result" });
//   }
// };
const Contract = require("../Models/CultivationContract.js");
const { CONTRACT_STATUS } = require("../constants/contractEnums.js");
const { computeStageDueInfo } = require("../utils/stageDueCalculator");

/* =========================
   HELPER: MAP STAGE STATUS
========================= */
function mapStageStatus(status) {
  if (status === "COMPLETED") return "COMPLETED";
  if (status === "PENDING") return "IN_PROGRESS";
  return "UPCOMING";
}

/* =========================
   HELPER: APPLY PENALTY
========================= */
function applyPenaltyIfLate(payment) {
  if (!payment.dueDate || payment.status !== "DUE") return;

  const now = new Date();
  if (now <= payment.dueDate) return;

  const daysLate = Math.ceil((now - payment.dueDate) / (24 * 60 * 60 * 1000));
  const dailyPercent = 1; 
  const penaltyPercent = Math.min(daysLate * dailyPercent, 10);

  payment.penalty = {
    appliedAmount: (penaltyPercent / 100) * payment.amount,
  };
  payment.status = "PENALIZED";
}

/* =========================
   GET TRACKING DETAILS
========================= */
exports.getCultivationTracking = async (req, res) => {
  try {
    const { id } = req.params;

    const contract = await Contract.findById(id);
    if (!contract) return res.status(404).json({ message: "Contract not found" });

    // Allow tracking for all active/completed phases
    const allowedStatuses = [
      CONTRACT_STATUS.ACTIVE,
      CONTRACT_STATUS.HARVEST_COMPLETED,
      CONTRACT_STATUS.DELIVERY_IN_PROGRESS,
      CONTRACT_STATUS.DELIVERY_COMPLETED,
      CONTRACT_STATUS.FINAL_PAYMENT_PENDING,
    ];

    if (!allowedStatuses.includes(contract.status)) {
      return res.status(400).json({ message: "Tracking not available for this status" });
    }

    /* ================= KPI CALCULATIONS ================= */
    const totalStages = contract.cultivationStages.length;
    const completedStages = contract.cultivationStages.filter((s) => s.status === "COMPLETED").length;

    // AI logic for Progress bar: If AI is done, add a "bonus" completion point (Stage 7)
    const isAiDone = contract.aiQualityDetails?.grade && contract.aiQualityDetails.grade !== "Pending";
    const displayTotal = totalStages + 1; // Stages 1-6 + AI Stage 7
    const displayCompleted = completedStages + (isAiDone ? 1 : 0);

    const progressPercent = Math.round((displayCompleted / displayTotal) * 100);

    // Determine what text to show in the "Current Stage" KPI box
    const currentStageObj = contract.cultivationStages.find((s) => s.status === "PENDING");
    let currentStage = currentStageObj?.name || "Harvest Completed";
    
    // If physical stages are done but AI is pending, current stage is AI
    if (completedStages === totalStages && !isAiDone) {
        currentStage = "AI Quality Grading (Pending)";
    } else if (completedStages === totalStages && isAiDone) {
        currentStage = "Quality Verified / Ready for Delivery";
    }

    /* ================= TIMELINE STAGES ================= */
    const stagesWithDueInfo = computeStageDueInfo(contract);
    const cultivationTimeline = stagesWithDueInfo.map((stage) => ({
      name: stage.name,
      expectedDays: stage.expectedDays,
      dueDate: stage.dueDate,
      daysRemaining: stage.daysRemaining,
      isOverdue: stage.isOverdue,
      completedDate: stage.completedDate,
      status: mapStageStatus(stage.status),
      farmerConfirmed: stage.farmerConfirmed,
      buyerVerified: stage.buyerVerified,
      images: stage.farmerImages || [],
    }));

    /* ================= PAYMENTS & PENALTIES ================= */
    const now = new Date();
    const finalPayment = contract.payments.find((p) => p.type === "FINAL");

    // Unlock final payment only after delivery is fully complete
    if (finalPayment && finalPayment.status === "LOCKED" && contract.status === CONTRACT_STATUS.DELIVERY_COMPLETED) {
      finalPayment.status = "DUE";
      finalPayment.dueDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days to pay
    }

    contract.payments.forEach(applyPenaltyIfLate);
    await contract.save(); // Save any penalty/status updates

    /* ================= FINAL RESPONSE ================= */
    return res.json({
      contractId: contract._id,
      contractStatus: contract.status,
      // ✅ CRITICAL: Sending AI details so Timeline Stage 7 marks as "Completed"
      aiQualityDetails: contract.aiQualityDetails || { grade: "Pending" },

      kpis: {
        progressPercent,
        completedStages: displayCompleted,
        totalStages: displayTotal,
        currentStage,
        totalAmount: contract.pricing.totalAmount,
      },

      cultivation: {
        stages: cultivationTimeline,
      },

      payments: {
        schedule: contract.payments,
        nextPayment: contract.payments.find((p) => p.status === "DUE") || null,
      },
    });
  } catch (error) {
    console.error("Tracking fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* =============================================
   NEW: SAVE AI QUALITY & UNLOCK DELIVERY
============================================= */
exports.saveAiQualityResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, confidence, breakdown } = req.body;

    const contract = await Contract.findById(id);
    if (!contract) return res.status(404).json({ message: "Contract not found" });

    // 1. Update the AI specific fields
    contract.aiQualityDetails = {
      grade: label, // e.g. "PREMIUM"
      confidence: confidence,
      breakdown: breakdown,
      verifiedAt: new Date()
    };

    // 2. Advance the overall contract status automatically to unlock the Delivery Component
    if (contract.status === CONTRACT_STATUS.ACTIVE || contract.status === CONTRACT_STATUS.HARVEST_COMPLETED) {
        contract.status = CONTRACT_STATUS.DELIVERY_IN_PROGRESS;
    }

    // 3. Safety Check: Mark all previous physical stages as COMPLETED
    // (This ensures the timeline UI doesn't get stuck if a previous step was skipped)
    contract.cultivationStages.forEach(stage => {
        if (stage.status !== "COMPLETED") {
            stage.status = "COMPLETED";
            stage.buyerVerified = true;
            stage.farmerConfirmed = true;
            if(!stage.completedAt) stage.completedAt = new Date();
        }
    });

    await contract.save();

    return res.json({
      success: true,
      message: `Quality verified as ${label}. Delivery phase is now active.`,
      aiQualityDetails: contract.aiQualityDetails,
      newStatus: contract.status
    });
  } catch (error) {
    console.error("AI Result Save Error:", error);
    res.status(500).json({ message: "Failed to save AI quality result" });
  }
};