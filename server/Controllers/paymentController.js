const Contract = require("../Models/CultivationContract");
const Dispute = require("../Models/Dispute");

/* =========================
   BUYER UPLOADS PAYMENT PROOF
========================= */
exports.uploadPaymentProof = async (req, res) => {
  try {
    const { contractId, paymentId } = req.params;

    // 1. Check for Active Disputes
    const activeDispute = await Dispute.findOne({
      contractId,
      status: { $in: ["OPEN", "UNDER_REVIEW"] },
    });

    if (activeDispute) {
      return res.status(400).json({
        message: "Payment action blocked due to active dispute",
      });
    }

    // 2. Find Contract and Payment
    const contract = await Contract.findById(contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    const payment = contract.payments.id(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    // 3. Status Check
    if (payment.status !== "DUE" && payment.status !== "PENALIZED")
      return res.status(400).json({
        message: "Payment is not payable or already paid",
      });

    // 4. File Check (Supports both single and array upload)
    const file = req.file || (req.files && req.files[0]);
    if (!file)
      return res.status(400).json({
        message: "Payment proof image is required",
      });

    // 5. Update Payment Details
    // .replace(/\\/g, '/') ensures paths work on all operating systems
    payment.buyerProof = {
      fileUrl: file.path.replace(/\\/g, "/"),
      uploadedAt: new Date(),
    };

    payment.status = "PENDING_VERIFICATION";

    await contract.save();

    res.json({ message: "Payment proof uploaded successfully" });
  } catch (err) {
    console.error("Payment Upload Error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   FARMER VERIFIES PAYMENT
========================= */
exports.verifyPaymentByFarmer = async (req, res) => {
  try {
    const { contractId, paymentId } = req.params;

    // 1. Check for Active Disputes
    const activeDispute = await Dispute.findOne({
      contractId,
      status: { $in: ["OPEN", "UNDER_REVIEW"] },
    });

    if (activeDispute) {
      return res.status(400).json({
        message: "Payment verification blocked due to active dispute",
      });
    }

    // 2. Find Contract and Payment
    const contract = await Contract.findById(contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    const payment = contract.payments.id(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    // 3. Verification Eligibility Check
    if (payment.status !== "PENDING_VERIFICATION")
      return res.status(400).json({
        message: "Payment not ready for verification",
      });

    // 4. Complete Payment
    payment.status = "COMPLETED";
    payment.paidAt = new Date();

    // 5. Lifecycle Updates
    if (payment.type === "FINAL") {
      contract.contractStatus = "COMPLETED";
    }

    /* 🔓 UNLOCK FIRST STAGE ONLY AFTER ADVANCE COMPLETED */
    if (payment.type === "ADVANCE") {
      const firstStage = contract.cultivationStages[0];

      if (firstStage && firstStage.status === "LOCKED") {
        firstStage.status = "PENDING";
      }
    }

    contract.tracking.lastUpdatedAt = new Date();
    await contract.save();

    res.json({ message: "Payment verified & completed" });
  } catch (err) {
    console.error("Payment Verification Error:", err);
    res.status(500).json({ message: err.message });
  }
};
