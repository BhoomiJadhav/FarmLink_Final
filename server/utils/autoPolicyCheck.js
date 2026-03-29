const CultivationContract = require("../Models/CultivationContract");

const suspiciousProviders = ["test", "abc", "dummy", "unknown", "na"];

exports.autoPolicyCheck = async ({
  providerName,
  policyNumber,
  policyValidTill,
}) => {
  let score = 0;
  let flags = [];

  /* =========================
     1. EXPIRY CHECK
  ========================= */
  if (!policyValidTill || new Date(policyValidTill) < new Date()) {
    flags.push("EXPIRED_POLICY");
  } else {
    score += 30;
  }

  /* =========================
     2. POLICY NUMBER CHECK
  ========================= */
  if (!policyNumber || policyNumber.length < 5) {
    flags.push("INVALID_POLICY_NUMBER");
  } else {
    score += 25;
  }

  /* =========================
     3. PROVIDER VALIDATION
  ========================= */
  if (
    !providerName ||
    suspiciousProviders.includes(providerName.toLowerCase())
  ) {
    flags.push("SUSPICIOUS_PROVIDER");
  } else {
    score += 25;
  }

  /* =========================
     4. DUPLICATE POLICY CHECK
  ========================= */
  const duplicate = await CultivationContract.findOne({
    "insurance.policyNumber": policyNumber,
  });

  if (duplicate) {
    flags.push("DUPLICATE_POLICY");
  } else {
    score += 20;
  }

  /* =========================
     FINAL DECISION
  ========================= */
  let status = "UNDER_REVIEW";

  if (flags.includes("EXPIRED_POLICY")) {
    status = "REJECTED";
  } else if (score >= 80) {
    status = "AUTO_VERIFIED";
  } else if (score >= 50) {
    status = "UNDER_REVIEW";
  } else {
    status = "REJECTED";
  }

  return {
    score,
    flags,
    status,
  };
};
