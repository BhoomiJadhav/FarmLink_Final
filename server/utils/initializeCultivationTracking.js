module.exports = function initializeCultivationTracking(contract) {
  // Prevent double init
  if (contract.cultivationStages?.length) return;

  /* ================= CULTIVATION STAGES ================= */
  contract.cultivationStages = [
    { name: "Seeds Delivered & Sowing", status: "PENDING" },
    { name: "Germination Phase", status: "LOCKED" },
    { name: "Vegetative Growth", status: "LOCKED" },
    { name: "Tillering Stage", status: "LOCKED" },
    { name: "Flowering & Grain Formation", status: "LOCKED" },
    { name: "Ripening & Harvest", status: "LOCKED" },
  ];

  /* ================= PAYMENTS (SAFE MODE) ================= */

  const estimatedValue = Number(contract.payment?.estimatedValue);
  const advanceAmount = Number(contract.payment?.advanceAmount);

  const hasEstimatedValue = Number.isFinite(estimatedValue);
  const hasAdvanceAmount = Number.isFinite(advanceAmount);

  contract.paymentSchedule = [];

  // ADVANCE
  if (hasAdvanceAmount) {
    contract.paymentSchedule.push({
      type: "ADVANCE",
      amount: advanceAmount,
      status: "PENDING",
    });
  } else {
    contract.paymentSchedule.push({
      type: "ADVANCE",
      amount: 0,
      status: "LOCKED",
    });
  }

  // MID
  if (hasEstimatedValue) {
    contract.paymentSchedule.push({
      type: "MID",
      amount: Math.round(estimatedValue * 0.3),
      status: "LOCKED",
    });
  }

  // FINAL
  if (hasEstimatedValue) {
    contract.paymentSchedule.push({
      type: "FINAL",
      amount: Math.round(estimatedValue * 0.4),
      status: "LOCKED",
    });
  }
};
