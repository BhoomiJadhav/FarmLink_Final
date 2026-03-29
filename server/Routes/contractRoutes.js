const express = require("express");

const { protect: auth } = require("../middleware/auth");
const Contract = require("../Models/CultivationContract");

// Controller Imports
const {
  getBuyerContracts,
  getFarmerContracts,
  getContractById,
  getActiveContracts,
} = require("../Controllers/contractQueryController");

const {
  updateFinalAmount,
  updateContract,
} = require("../Controllers/contractUpdateController");

const {
  buyerSignContract,
  farmerSignContract,
} = require("../Controllers/contractSignatureController");

const { raiseDispute } = require("../Controllers/contractDisputeController");

const {
  createCultivationContract,
} = require("../Controllers/cultivationContractController");
const {
  createHarvestSaleContract,
} = require("../Controllers/harvestContractController");

const {
  uploadStageProof,
  verifyStage,
} = require("../Controllers/uploadsStageProof");

// Seed & Payment Imports
const {
  dispatchSeedsByBuyer,
  confirmSeedReceiptByFarmer,
  uploadSeedByFarmer,
} = require("../Controllers/seedDispatch");

const {
  uploadPaymentProof,
  verifyPaymentByFarmer,
} = require("../Controllers/paymentController");

// AI Quality Tracking Import
const {
  saveAiQualityResult,
} = require("../Controllers/cultivationTrackingController");

const upload = require("../middleware/uploads");
const policyUpload = require("../middleware/uploadPolicy");
const router = express.Router();

/* 1. General Queries */
router.post("/create/cultivation", auth, createCultivationContract);
router.post("/create/harvest", auth, createHarvestSaleContract);
router.get("/active", auth, getActiveContracts);
router.get("/buyer/all", auth, getBuyerContracts);
router.get("/farmer/all", auth, getFarmerContracts);
router.get("/:contractId", auth, getContractById);
router.put("/update/:contractId", auth, updateContract);

/* 2. Negotiation & Signatures */
router.put("/update-amount/:contractId", auth, updateFinalAmount);
router.post("/sign/buyer/:contractId", auth, buyerSignContract);
router.post(
  "/sign/farmer/:contractId",
  auth,
  policyUpload.single("document"), // 🔥 IMPORTANT
  farmerSignContract,
);
/* 3. Seed Dispatch (Farmer or Buyer) */
router.post(
  "/:id/seed/dispatch",
  auth,
  upload.array("images", 5),
  dispatchSeedsByBuyer,
);
router.post(
  "/:id/seed/confirm",
  auth,
  upload.array("images", 5),
  confirmSeedReceiptByFarmer,
);
router.post(
  "/:id/seed/farmer-upload",
  auth,
  upload.array("images", 5),
  uploadSeedByFarmer,
);

/* 4. Payment Execution */
router.post(
  "/:contractId/payments/:paymentId/upload-proof",
  auth,
  upload.array("images", 1),
  uploadPaymentProof,
);

router.post(
  "/:contractId/payments/:paymentId/verify",
  auth,
  verifyPaymentByFarmer,
);

/* 5. Cultivation Stages & AI Quality */
router.post(
  "/:contractId/stages/:stageId/upload",
  auth,
  async (req, res, next) => {
    const contract = await Contract.findById(req.params.contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });
    const stage = contract.cultivationStages.id(req.params.stageId);
    if (!stage) return res.status(404).json({ message: "Stage not found" });
    req.stageName = stage.name;
    next();
  },
  upload.array("images", 5),
  uploadStageProof,
);

router.post("/:id/stages/:stageId/verify", auth, verifyStage);

// ✅ NEW: AI Quality Grade Update
// This matches your frontend call: axios.patch(`/contracts/${contractId}/ai-quality`, ...)
router.patch("/:id/ai-quality", auth, saveAiQualityResult);

/* 6. Disputes */
router.post("/dispute/:contractId", auth, raiseDispute);

module.exports = router;
