const express = require("express");
const router = express.Router();

const Contract = require("../Models/BaseContract");
const initializeCultivationTracking = require("../utils/initializeCultivationTracking");

router.get("/init-tracking/:id", async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    if (contract.cultivationStages?.length) {
      return res.json({ message: "Tracking already initialized" });
    }

    initializeCultivationTracking(contract);
    await contract.save();

    return res.json({
      message: "Tracking initialized",
      contractId: contract._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Init failed" });
  }
});

module.exports = router;
