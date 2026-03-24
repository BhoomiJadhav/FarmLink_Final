// const CultivationContract = require("../Models/CultivationContract");
// const Profile = require("../Models/Profile");
// const { v4: uuidv4 } = require("uuid");
// const {
//   CONTRACT_STATUS,
//   CONTRACT_TYPE,
// } = require("../constants/contractEnums");
// const { CROP_STAGE_DAYS } = require("../config/cropStageDays");
// /* ======================================================
//    CREATE CULTIVATION CONTRACT (PRE-HARVEST)
//    Buyer initiates → Farmer must approve
//    ====================================================== */
// const createCultivationContract = async (req, res) => {
//   try {
//     const contract = req.body;
//     const buyerId = req.user._id;

//     /* ---------- VALIDATION ---------- */
//     if (!contract.farmer?.farmerId) {
//       return res.status(400).json({ message: "Farmer data missing" });
//     }

//     if (!contract.cropDetails?.cropName) {
//       return res.status(400).json({ message: "Crop details missing" });
//     }

//     /* ---------- CHECK FARMER AVAILABILITY ---------- */
//     let farmerProfile = null;

//     if (contract.status === CONTRACT_STATUS.SENT) {
//       farmerProfile = await Profile.findOne({
//         userId: contract.farmer.farmerId,
//       });

//       if (!farmerProfile) {
//         return res.status(404).json({ message: "Farmer profile not found" });
//       }

//       if (farmerProfile.availabilityStatus !== "AVAILABLE") {
//         return res.status(409).json({
//           message: "Farmer is already negotiating or contracted",
//         });
//       }
//     }

//     /* ---------- SYSTEM FIELDS ---------- */
//     contract.contractId = `CULT-${uuidv4().slice(0, 8).toUpperCase()}`;
//     contract.contractType = CONTRACT_TYPE.CULTIVATION;
//     contract.status =
//       contract.status === CONTRACT_STATUS.SENT
//         ? CONTRACT_STATUS.SENT
//         : CONTRACT_STATUS.DRAFT;

//     contract.buyer.buyerId = buyerId;
//     const cropName = contract.cropDetails.cropName.toLowerCase();

//     contract.cultivationStages = contract.cultivationStages.map((stage) => {
//       const expectedDays = CROP_STAGE_DAYS[cropName]?.[stage.name] ?? null;

//       return {
//         ...stage,
//         expectedDays,
//         reminder: {
//           levelSent: 0,
//           lastSentAt: null,
//         },
//       };
//     });
//     const totalAmount = pricePerQuintal * quantity;

//     const advanceAmount = (advancePercentage / 100) * totalAmount;

//     const remainingAmount = totalAmount - advanceAmount;

//     const payments = [
//       {
//         type: "ADVANCE",
//         percentage: advancePercentage,
//         amount: advanceAmount,
//         dueStage: "SEED_CONFIRMATION",
//         status: "DUE",
//         dueDate: new Date(),
//       },
//       {
//         type: "MID",
//         percentage: (100 - advancePercentage) / 2,
//         amount: remainingAmount / 2,
//         dueStage: "FLOWERING",
//         status: "LOCKED",
//       },
//       {
//         type: "FINAL",
//         percentage: (100 - advancePercentage) / 2,
//         amount: remainingAmount / 2,
//         dueStage: "DELIVERY",
//         status: "LOCKED",
//       },
//     ];

//     /* ---------- CREATE CONTRACT ---------- */
//     const savedContract = await CultivationContract.create(contract);

//     /* ---------- LOCK FARMER ---------- */
//     if (contract.status === CONTRACT_STATUS.SENT) {
//       await Profile.findOneAndUpdate(
//         { userId: contract.farmer.farmerId },
//         { availabilityStatus: "NEGOTIATING" },
//       );
//     }

//     res.status(201).json({
//       success: true,
//       message: "Cultivation contract sent to farmer",
//       contract: savedContract,
//     });
//   } catch (error) {
//     console.error("Create cultivation contract failed:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   createCultivationContract,
// };
const CultivationContract = require("../Models/CultivationContract");
const Profile = require("../Models/Profile");
const { v4: uuidv4 } = require("uuid");
const {
  CONTRACT_STATUS,
  CONTRACT_TYPE,
} = require("../constants/contractEnums");
const { CROP_STAGE_DAYS } = require("../config/cropStageDays");

/* ======================================================
   CREATE CULTIVATION CONTRACT (PRE-HARVEST)
   ====================================================== */
const createCultivationContract = async (req, res) => {
  try {
    const contract = req.body;
    const buyerId = req.user._id;

    /* ---------- VALIDATION ---------- */
    if (!contract.farmer?.farmerId) {
      return res.status(400).json({ message: "Farmer data missing" });
    }

    if (!contract.cropDetails?.cropName) {
      return res.status(400).json({ message: "Crop details missing" });
    }

    /* ---------- CHECK FARMER AVAILABILITY ---------- */
    let farmerProfile = null;

    if (contract.status === CONTRACT_STATUS.SENT) {
      farmerProfile = await Profile.findOne({
        userId: contract.farmer.farmerId,
      });

      if (!farmerProfile) {
        return res.status(404).json({ message: "Farmer profile not found" });
      }

      if (farmerProfile.availabilityStatus !== "AVAILABLE") {
        return res.status(409).json({
          message: "Farmer is already negotiating or contracted",
        });
      }
    }

    /* ---------- SYSTEM FIELDS ---------- */
    contract.contractId = `CULT-${uuidv4().slice(0, 8).toUpperCase()}`;
    contract.contractType = CONTRACT_TYPE.CULTIVATION;
    contract.status =
      contract.status === CONTRACT_STATUS.SENT
        ? CONTRACT_STATUS.SENT
        : CONTRACT_STATUS.DRAFT;

    contract.buyer = contract.buyer || {};
    contract.buyer.buyerId = buyerId;

    /* ---------- STAGES SETUP ---------- */
    // const cropName = contract.cropDetails.cropName.toLowerCase();

    // const inputStages = Array.isArray(contract.cultivationStages)
    //   ? contract.cultivationStages
    //   : [];
    // if (
    //   !Array.isArray(contract.cultivationStages) ||
    //   contract.cultivationStages.length === 0
    // ) {
    //   const defaultStages = Object.keys(CROP_STAGE_DAYS[cropName] || {});

    //   contract.cultivationStages = defaultStages.map((stageName) => ({
    //     name: stageName,
    //     status: "PENDING",
    //     proofs: [],
    //   }));
    // }

    // contract.cultivationStages = inputStages.map((stage) => {
    //   const expectedDays = CROP_STAGE_DAYS[cropName]?.[stage.name] ?? null;

    //   return {
    //     name: stage.name,
    //     startDate: stage.startDate || null,
    //     endDate: stage.endDate || null,
    //     status: "PENDING",
    //     expectedDays,
    //     proofs: [],
    //     reminder: {
    //       levelSent: 0,
    //       lastSentAt: null,
    //     },
    //   };
    // });
    const cropName = contract.cropDetails.cropName.toLowerCase();

    let stages = [];

    if (
      Array.isArray(contract.cultivationStages) &&
      contract.cultivationStages.length > 0
    ) {
      stages = contract.cultivationStages;
    } else {
      const defaultStages = Object.keys(CROP_STAGE_DAYS[cropName] || {});
      stages = defaultStages.map((stageName) => ({
        name: stageName,
      }));
    }

    contract.cultivationStages = stages.map((stage) => {
      const expectedDays = CROP_STAGE_DAYS[cropName]?.[stage.name] ?? null;

      return {
        name: stage.name,
        startDate: stage.startDate || null,
        endDate: stage.endDate || null,
        status: "LOCKED",
        expectedDays,
        proofs: [],
        reminder: {
          levelSent: 0,
          lastSentAt: null,
        },
      };
    });
    console.log(
      "ADVANCE FROM FRONTEND:",
      contract.pricing.advancePaymentPercent,
    );

    /* ---------- PAYMENT CALCULATION ---------- */
    /* ---------- PAYMENT CALCULATION ---------- */

    const pricePerUnit = Number(contract.pricing?.agreedPricePerUnit || 0);
    const quantity = Number(contract.cropDetails?.expectedYield || 0);

    const advancePercentage = Number(
      contract.pricing?.advancePaymentPercent || 0,
    );

    console.log("PRICE:", pricePerUnit);
    console.log("QUANTITY:", quantity);
    console.log("ADVANCE %:", advancePercentage);

    const totalAmount = pricePerUnit * quantity;

    const advanceAmount = Math.round((advancePercentage / 100) * totalAmount);

    const remainingAmount = totalAmount - advanceAmount;

    const midFinalPercentage = (100 - advancePercentage) / 2;
    const midFinalAmount = Math.round(remainingAmount / 2);

    contract.pricing.totalAmount = totalAmount;

    contract.payments = [
      {
        type: "ADVANCE",
        percentage: advancePercentage,
        amount: advanceAmount,
        dueStage: "SEED_CONFIRMATION",
        status: "LOCKED",
        dueDate: null,
        penalty: {
          appliedAmount: 0,
          percentagePerWeek: 1,
          maxCapPercent: 10,
        },
      },
      {
        type: "MID",
        percentage: midFinalPercentage,
        amount: midFinalAmount,
        dueStage: "FLOWERING",
        status: "LOCKED",
        dueDate: null,
        penalty: {
          appliedAmount: 0,
          percentagePerWeek: 1,
          maxCapPercent: 10,
        },
      },
      {
        type: "FINAL",
        percentage: midFinalPercentage,
        amount: midFinalAmount,
        dueStage: "DELIVERY",
        status: "LOCKED",
        dueDate: null,
        penalty: {
          appliedAmount: 0,
          percentagePerWeek: 1,
          maxCapPercent: 10,
        },
      },
    ];

    console.log("FINAL CONTRACT SAFE:", JSON.stringify(contract, null, 2));

    /* ---------- CREATE CONTRACT ---------- */
    const savedContract = await CultivationContract.create(contract);

    /* ---------- LOCK FARMER ---------- */
    if (contract.status === CONTRACT_STATUS.SENT) {
      await Profile.findOneAndUpdate(
        { userId: contract.farmer.farmerId },
        { availabilityStatus: "NEGOTIATING" },
      );
    }

    return res.status(201).json({
      success: true,
      message: "Cultivation contract sent to farmer",
      contract: savedContract,
    });
  } catch (error) {
    console.error("Create cultivation contract failed:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCultivationContract,
};
