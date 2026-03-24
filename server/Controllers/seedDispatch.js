// const Contract = require("../Models/CultivationContract");

// exports.markSeedDispatched = async (req, res) => {
//   try {
//     const contract = await Contract.findById(req.params.id);
//     if (!contract)
//       return res.status(404).json({ message: "Contract not found" });

//     // Logged-in user must be buyer
//     if (String(contract.buyer.buyerId) !== String(req.user._id)) {
//       return res.status(403).json({ message: "Only buyer can dispatch seeds" });
//     }

//     if (contract.seed.provider !== "BUYER") {
//       return res.status(400).json({ message: "Buyer is not seed provider" });
//     }

//     if (contract.seed.dispatchedAt) {
//       return res.status(400).json({ message: "Seeds already dispatched" });
//     }

//     contract.seed.dispatchedAt = new Date();

//     // backward compatibility
//     contract.seedDispatch.buyerConfirmed = true;
//     contract.seedDispatch.buyerConfirmedAt = contract.seed.dispatchedAt;

//     await contract.save();

//     res.json({ message: "Seeds marked as dispatched", seed: contract.seed });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.confirmSeedReceipt = async (req, res) => {
//   try {
//     const contract = await Contract.findById(req.params.id);
//     if (!contract)
//       return res.status(404).json({ message: "Contract not found" });

//     // Logged-in user must be farmer
//     if (String(contract.farmer.farmerId) !== String(req.user._id)) {
//       return res
//         .status(403)
//         .json({ message: "Only farmer can confirm seed receipt" });
//     }

//     if (contract.seed.receivedAt) {
//       return res.status(400).json({ message: "Seed already confirmed" });
//     }

//     if (contract.seed.provider === "BUYER" && !contract.seed.dispatchedAt) {
//       return res
//         .status(400)
//         .json({ message: "Seeds not yet dispatched by buyer" });
//     }

//     contract.seed.receivedAt = new Date();

//     // backward compatibility
//     contract.seedDispatch.farmerConfirmed = true;
//     contract.seedDispatch.farmerConfirmedAt = contract.seed.receivedAt;
//     contract.seedDispatch.farmerSeedImages =
//       req.files?.map((f) => f.path) || [];

//     // Unlock first cultivation stage
//     if (contract.cultivationStages?.length) {
//       contract.cultivationStages[0].status = "PENDING";
//     }

//     contract.sowingDate = contract.seed.receivedAt;
//     contract.tracking.lastUpdatedAt = new Date();

//     await contract.save();

//     res.json({ message: "Seed receipt confirmed", seed: contract.seed });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

/**
 * BUYER → Dispatch Seeds
 * Mandatory: seed details + at least 1 proof image
 */
// exports.dispatchSeedsByBuyer = async (req, res) => {
//   try {
//     const contract = await Contract.findById(req.params.id);
//     if (!contract)
//       return res.status(404).json({ message: "Contract not found" });

//     // Only buyer allowed
//     if (String(contract.buyer.buyerId) !== String(req.user._id)) {
//       return res.status(403).json({ message: "Only buyer can dispatch seeds" });
//     }

//     if (contract.seedSupply.provider !== "BUYER") {
//       return res.status(400).json({
//         message: "Buyer is not the seed provider for this contract",
//       });
//     }

//     if (contract.seedSupply.status !== "PENDING") {
//       return res.status(400).json({ message: "Seeds already dispatched" });
//     }

//     const { cropName, variety, brand, quantityKg, remarks } = req.body;
//     const images = req.files?.map((f) => f.path) || [];

//     if (!images.length) {
//       return res
//         .status(400)
//         .json({ message: "Seed dispatch proof images are required" });
//     }

//     if (!cropName || !brand || !quantityKg) {
//       return res.status(400).json({
//         message: "Seed crop name, brand, and quantity are required",
//       });
//     }

//     contract.seedSupply = {
//       provider: "BUYER",
//       status: "DISPATCHED",
//       seedDetails: {
//         cropName,
//         variety,
//         brand,
//         quantityKg,
//       },
//       dispatchProof: {
//         images,
//         remarks,
//         dispatchedAt: new Date(),
//       },
//     };

//     /* Backward compatibility (do NOT remove yet) */
//     contract.seed = contract.seed || {};
//     contract.seed.dispatchedAt = new Date();

//     contract.seedDispatch = contract.seedDispatch || {};
//     contract.seedDispatch.buyerConfirmed = true;
//     contract.seedDispatch.buyerConfirmedAt =
//       contract.seedSupply.dispatchProof.dispatchedAt;

//     await contract.save();

//     res.json({
//       message: "Seeds dispatched successfully",
//       seedSupply: contract.seedSupply,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const Contract = require("../Models/CultivationContract");

exports.dispatchSeedsByBuyer = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (String(contract.buyer.buyerId) !== String(req.user._id))
      return res.status(403).json({ message: "Only buyer can dispatch seeds" });

    if (contract.seedSupply.provider !== "BUYER")
      return res.status(400).json({
        message: "Buyer is not seed provider",
      });

    if (contract.seedSupply.status !== "PENDING")
      return res.status(400).json({
        message: "Seeds already dispatched",
      });

    const { cropName, variety, brand, quantityKg, remarks } = req.body;
    const images = req.files?.map((f) => f.path) || [];

    if (!cropName || !brand || !quantityKg)
      return res.status(400).json({
        message: "Crop name, brand and quantity required",
      });

    if (!images.length)
      return res.status(400).json({
        message: "Dispatch proof images required",
      });

    contract.seedSupply = {
      provider: "BUYER",
      status: "DISPATCHED",
      seedDetails: { cropName, variety, brand, quantityKg },
      dispatchProof: {
        images,
        remarks,
        dispatchedAt: new Date(),
      },
    };

    contract.seedDispatch = {
      buyerConfirmed: true,
      farmerConfirmed: false,
      farmerSeedImages: [],
      buyerConfirmedAt: new Date(),
    };

    contract.tracking.lastUpdatedAt = new Date();
    await contract.save();

    res.json({ message: "Seeds dispatched successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * FARMER → Confirm Seed Receipt (Buyer provided)
 */
// exports.confirmSeedReceiptByFarmer = async (req, res) => {
//   try {
//     const contract = await Contract.findById(req.params.id);
//     if (!contract)
//       return res.status(404).json({ message: "Contract not found" });

//     // Only farmer allowed
//     if (String(contract.farmer.farmerId) !== String(req.user._id)) {
//       return res
//         .status(403)
//         .json({ message: "Only farmer can confirm seed receipt" });
//     }

//     if (contract.seedSupply.provider !== "BUYER") {
//       return res.status(400).json({
//         message:
//           "Seed receipt confirmation not required for farmer-provided seeds",
//       });
//     }

//     if (contract.seedSupply.status !== "DISPATCHED") {
//       return res.status(400).json({
//         message: "Seeds are not yet dispatched by buyer",
//       });
//     }

//     const images = req.files?.map((f) => f.path) || [];
//     const { remarks } = req.body;

//     if (!images.length) {
//       return res.status(400).json({
//         message: "Seed receiving proof images are required",
//       });
//     }

//     contract.seedSupply.status = "VERIFIED";
//     contract.seedSupply.receiveProof = {
//       images,
//       remarks,
//       receivedAt: new Date(),
//     };

//     /* Backward compatibility */
//     contract.seed.receivedAt = new Date();

//     contract.seedDispatch.farmerConfirmed = true;
//     contract.seedDispatch.farmerConfirmedAt =
//       contract.seedSupply.receiveProof.receivedAt;
//     contract.seedDispatch.farmerSeedImages = images;
//     // 🔓 Activate ADVANCE payment
//     const advancePayment = contract.payments.find((p) => p.type === "ADVANCE");

//     if (advancePayment && advancePayment.status === "LOCKED") {
//       advancePayment.status = "DUE";

//       const due = new Date();
//       due.setDate(due.getDate() + 7); // 7 days window
//       advancePayment.dueDate = due;
//     }

//     // 🔓 Unlock sowing stage ONLY now

//     contract.tracking.lastUpdatedAt = new Date();

//     await contract.save();

//     res.json({
//       message: "Seed receipt verified successfully",
//       seedSupply: contract.seedSupply,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.confirmSeedReceiptByFarmer = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (String(contract.farmer.farmerId) !== String(req.user._id))
      return res.status(403).json({
        message: "Only farmer can confirm receipt",
      });

    if (contract.seedSupply.status !== "DISPATCHED")
      return res.status(400).json({
        message: "Seeds not dispatched yet",
      });

    const images = req.files?.map((f) => f.path) || [];
    const { remarks } = req.body;

    if (!images.length)
      return res.status(400).json({
        message: "Receiving proof images required",
      });

    contract.seedSupply.status = "VERIFIED";
    contract.seedSupply.receiveProof = {
      images,
      remarks,
      receivedAt: new Date(),
    };

    contract.seedDispatch.farmerConfirmed = true;
    contract.seedDispatch.farmerConfirmedAt = new Date();
    contract.seedDispatch.farmerSeedImages = images;

    /* 🔓 ACTIVATE ADVANCE PAYMENT */
    const advance = contract.payments.find((p) => p.type === "ADVANCE");

    if (advance && advance.status === "LOCKED") {
      advance.status = "DUE";

      const due = new Date();
      due.setDate(due.getDate() + 7);
      advance.dueDate = due;
    }

    contract.tracking.lastUpdatedAt = new Date();
    await contract.save();

    res.json({ message: "Seed receipt confirmed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * FARMER → Upload Seed Proof (Farmer provides seeds)
 */
exports.uploadSeedByFarmer = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (String(contract.farmer.farmerId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Only farmer can upload seed details" });
    }

    if (contract.seedSupply.provider !== "FARMER") {
      return res.status(400).json({
        message: "Farmer is not the seed provider for this contract",
      });
    }

    if (contract.seedSupply.status === "VERIFIED") {
      return res.status(400).json({
        message: "Seed already verified",
      });
    }

    const { cropName, variety, brand, quantityKg, remarks } = req.body;
    const images = req.files?.map((f) => f.path) || [];

    if (!images.length) {
      return res
        .status(400)
        .json({ message: "Seed proof images are required" });
    }

    if (!cropName || !brand || !quantityKg) {
      return res.status(400).json({
        message: "Seed crop name, brand, and quantity are required",
      });
    }

    contract.seedSupply = {
      provider: "FARMER",
      status: "VERIFIED",
      seedDetails: {
        cropName,
        variety,
        brand,
        quantityKg,
      },
      receiveProof: {
        images,
        remarks,
        receivedAt: new Date(),
      },
    };

    // 🔓 Unlock sowing stage immediately

    contract.tracking.lastUpdatedAt = new Date();

    await contract.save();

    res.json({
      message: "Seed details uploaded and verified",
      seedSupply: contract.seedSupply,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
