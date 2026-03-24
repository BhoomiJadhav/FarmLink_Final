// const Contract = require("../Models/BaseContract");
// const HarvestSaleContract = require("../Models/HarvestSaleContract");
// const Notification = require("../Models/Notification");
// const crypto = require("crypto");
// const { CONTRACT_STATUS } = require("../constants/contractEnums");

// exports.payHarvestContract = async (req, res) => {
//   const contract = await HarvestSaleContract.findById(req.params.id);

//   if (!contract) {
//     return res.status(404).json({ message: "Contract not found" });
//   }

//   if (contract.payment.status === "PAID") {
//     return res.status(400).json({ message: "Payment already completed" });
//   }

//   // RULE 1
//   if (
//     contract.payment.mode === "BEFORE_DELIVERY" &&
//     contract.status !== "ACCEPTED"
//   ) {
//     return res.status(400).json({
//       message: "Payment allowed only after acceptance",
//     });
//   }

//   // RULE 2
//   if (
//     contract.payment.mode === "ON_DELIVERY" &&
//     contract.status !== "DELIVERED"
//   ) {
//     return res.status(400).json({
//       message: "Payment allowed only after delivery",
//     });
//   }

//   contract.payment.status = "PAID";
//   contract.payment.paidAt = new Date();
//   contract.payment.transactionRef = req.body.transactionRef;

//   await contract.save();

//   // notify farmer
//   await Notification.create({
//     user: contract.farmer,
//     title: "Payment Received",
//     message: `₹${contract.payment.amount} received for ${contract.crop.name}`,
//     type: "PAYMENT",
//     refId: contract._id,
//   });

//   res.json({ success: true, contract });
// };

// /* ================= BUYER: MARK PAYMENT DONE ================= */
// exports.markPaymentDone = async (req, res) => {
//   const contract = await Contract.findById(req.params.contractId);
//   if (!contract) return res.status(404).json({ message: "Contract not found" });

//   if (req.user.role !== "buyer")
//     return res.status(403).json({ message: "Only buyer allowed" });

//   contract.payment.status = "PAID";
//   contract.payment.referenceId = req.body.referenceId;
//   contract.payment.paidAt = new Date();
//   contract.status = CONTRACT_STATUS.PAYMENT_PENDING;

//   await contract.save();

//   await Notification.create({
//     userId: contract.farmer.farmerId,
//     title: "Payment Marked",
//     message: "Buyer marked payment as completed.",
//     type: "PAYMENT",
//     relatedContractId: contract._id,
//   });

//   res.json({ success: true });
// };

// /* ================= FARMER: VERIFY PAYMENT ================= */
// exports.verifyPayment = async (req, res) => {
//   const contract = await Contract.findById(req.params.contractId);
//   if (!contract) return res.status(404).json({ message: "Contract not found" });

//   if (req.user.role !== "farmer")
//     return res.status(403).json({ message: "Only farmer allowed" });

//   contract.payment.status = "VERIFIED";
//   contract.payment.verifiedAt = new Date();
//   contract.status = CONTRACT_STATUS.ACTIVE;

//   await contract.save();

//   await Notification.create({
//     userId: contract.buyer.buyerId,
//     title: "Payment Verified",
//     message: "Farmer verified your payment.",
//     type: "PAYMENT",
//     relatedContractId: contract._id,
//   });

//   res.json({ success: true });
// };

// /* ================= BUYER: DISPATCH VEHICLE ================= */

// /* ================= LIVE LOCATION UPDATE ================= */

// exports.dispatchVehicle = async (req, res) => {
//   const contract = await HarvestSaleContract.findById(req.params.contractId);

//   if (!contract) return res.status(404).json({ message: "Contract not found" });

//   // Ensure this is harvest contract
//   if (contract.contractType !== "HARVEST_SALE") {
//     return res.status(400).json({ message: "Not a harvest contract" });
//   }

//   const responsibleParty = contract.delivery.transportationByBuyer
//     ? "buyer"
//     : "farmer";

//   if (req.user.role !== responsibleParty) {
//     return res.status(403).json({ message: "Not authorized" });
//   }

//   const { vehicleNumber, driverContact } = req.body;
//   if (!vehicleNumber || !driverContact) {
//     return res.status(400).json({
//       message: "Vehicle number and driver contact are mandatory",
//     });
//   }

//   // Generate token ONCE
//   if (!contract.delivery.trackingToken) {
//     contract.delivery.trackingToken = require("crypto").randomUUID();
//   }

//   contract.delivery.vehicleNumber = vehicleNumber;
//   contract.delivery.driverContact = driverContact;
//   contract.delivery.status = "IN_TRANSIT";
//   contract.delivery.assignedAt = new Date();
//   contract.delivery.deliveryOtp = Math.floor(
//     100000 + Math.random() * 900000
//   ).toString();
//   await contract.save();

//   res.json({
//     success: true,
//     trackingToken: contract.delivery.trackingToken,
//   });
// };
// exports.verifyDeliveryOtp = async (req, res) => {
//   const { otp, token } = req.body;
//   const { contractId } = req.params;

//   const contract = await HarvestSaleContract.findOne({
//     _id: contractId,
//     "delivery.trackingToken": token,
//   });

//   if (!contract) {
//     return res.status(403).json({ message: "Invalid tracking link" });
//   }

//   if (contract.delivery.status !== "IN_TRANSIT") {
//     return res.status(400).json({ message: "Delivery not in transit" });
//   }

//   if (contract.delivery.deliveryOtp !== otp) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   contract.delivery.status = "DELIVERED";
//   contract.delivery.otpVerified = true;
//   contract.delivery.deliveredAt = new Date();

//   if (contract.payment.mode === "ON_DELIVERY") {
//     contract.payment.status = "PAID";
//   }

//   await contract.save();

//   res.json({ success: true });
// };

// exports.updateDriverLocation = async (req, res) => {
//   const { contractId } = req.params;
//   const { latitude, longitude, token } = req.body;

//   if (!latitude || !longitude || !token) {
//     return res.status(400).json({ message: "Invalid data" });
//   }

//   const contract = await HarvestSaleContract.findOne({
//     _id: contractId,
//     "delivery.trackingToken": token,
//   });

//   if (!contract) {
//     return res.status(403).json({ message: "Invalid tracking link" });
//   }

//   if (contract.delivery.status !== "IN_TRANSIT") {
//     return res.status(400).json({ message: "Delivery not active" });
//   }

//   contract.delivery.liveLocation = {
//     lat: Number(latitude),
//     lng: Number(longitude),
//     updatedAt: new Date(),
//   };

//   await contract.save();

//   res.json({ success: true });
// };

// /* ================= FARMER: CONFIRM DELIVERY ================= */
// exports.confirmDelivery = async (req, res) => {
//   const contract = await HarvestSaleContract.findById(req.params.contractId);
//   if (!contract) return res.status(404).json({ message: "Contract not found" });

//   if (req.user.role !== "farmer")
//     return res.status(403).json({ message: "Only farmer allowed" });

//   contract.delivery.status = "DELIVERED";
//   contract.status = "COMPLETED";

//   await contract.save();

//   res.json({ success: true });
// };

const HarvestSaleContract = require("../Models/HarvestSaleContract");
const Notification = require("../Models/Notification");
const { CONTRACT_STATUS } = require("../constants/contractEnums");

/* ================= PAY HARVEST CONTRACT ================= */
exports.payHarvestContract = async (req, res) => {
  const contract = await HarvestSaleContract.findById(req.params.id);

  if (!contract) {
    return res.status(404).json({ message: "Contract not found" });
  }

  if (contract.payment.status === "PAID") {
    return res.status(400).json({ message: "Payment already completed" });
  }

  if (
    contract.payment.mode === "BEFORE_DELIVERY" &&
    contract.status !== "ACCEPTED"
  ) {
    return res.status(400).json({
      message: "Payment allowed only after acceptance",
    });
  }

  if (
    contract.payment.mode === "ON_DELIVERY" &&
    contract.delivery.status !== "DELIVERED"
  ) {
    return res.status(400).json({
      message: "Payment allowed only after delivery",
    });
  }

  contract.payment.status = "PAID";
  contract.payment.paidAt = new Date();
  contract.payment.transactionRef = req.body.transactionRef;

  await contract.save();

  await Notification.create({
    userId: contract.farmer.farmerId,
    title: "Payment Received",
    message: `₹${contract.payment.amount} received for ${contract.harvestDetails.cropName}`,
    type: "PAYMENT",
    relatedContractId: contract._id,
  });

  res.json({ success: true, contract });
};

/* ================= BUYER: MARK PAYMENT DONE ================= */
exports.markPaymentDone = async (req, res) => {
  try {
    // markPaymentDone
    const contract = await HarvestSaleContract.findById(req.params.contractId);

    // verifyPayment

    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (req.user.role !== "buyer")
      return res.status(403).json({ message: "Only buyer allowed" });

    console.log("==== MARK PAYMENT API HIT ====");
    console.log("PARAMS:", req.params);
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    // ✅ FIX 1: correct field name
    const transactionRef = req.body?.transactionRef || req.body?.referenceId;

    if (!transactionRef) {
      return res
        .status(400)
        .json({ message: "Transaction reference is required" });
    }

    // ✅ FIX 2: normalize payment object
    contract.payment = {
      ...contract.payment,
      status: "MARKED", // ✅ correct state
      transactionRef,
      paidAt: new Date(),
    };

    // Optional: contract-level status
    contract.status = CONTRACT_STATUS.PAYMENT_PENDING;

    await contract.save();

    // ✅ Notification stays correct
    await Notification.create({
      userId: contract.farmer.farmerId,
      title: "Payment Marked",
      message: "Buyer marked payment as completed.",
      type: "PAYMENT",
      relatedContractId: contract._id,
    });

    res.json({
      success: true,
      message: "Payment marked successfully",
      payment: contract.payment,
    });
  } catch (err) {
    console.error("markPaymentDone error:", err);
    res.status(500).json({ message: "Failed to mark payment" });
  }
};

/* ================= FARMER: VERIFY PAYMENT ================= */
exports.verifyPayment = async (req, res) => {
  try {
    const contract = await HarvestSaleContract.findById(req.params.contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (req.user.role !== "farmer")
      return res.status(403).json({ message: "Only farmer allowed" });

    if (!["MARKED", "PAID"].includes(contract.payment?.status)) {
      return res
        .status(400)
        .json({ message: "Payment not ready for verification" });
    }

    contract.payment.status = "VERIFIED";
    contract.payment.verifiedAt = new Date();

    await contract.save();

    res.json({ success: true });
  } catch (err) {
    console.error("verifyPayment error:", err);
    res.status(500).json({ message: "Failed to verify payment" });
  }
};

/* ================= DISPATCH VEHICLE ================= */
exports.dispatchVehicle = async (req, res) => {
  const contract = await HarvestSaleContract.findById(req.params.contractId);

  if (!contract) return res.status(404).json({ message: "Contract not found" });

  const responsibleParty = contract.delivery.transportationByBuyer
    ? "buyer"
    : "farmer";

  if (req.user.role !== responsibleParty) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { vehicleNumber, driverContact } = req.body;
  if (!vehicleNumber || !driverContact) {
    return res.status(400).json({
      message: "Vehicle number and driver contact are mandatory",
    });
  }

  if (!contract.delivery.trackingToken) {
    contract.delivery.trackingToken = crypto.randomUUID();
  }

  contract.delivery.vehicleNumber = vehicleNumber;
  contract.delivery.driverContact = driverContact;
  contract.delivery.status = "IN_TRANSIT";

  // ADD THIS inside dispatchVehicle BEFORE save()
  if (contract.payment.mode === "ON_DELIVERY") {
    contract.status = "PAYMENT_PENDING";
  }

  contract.delivery.assignedAt = new Date();
  contract.delivery.deliveryOtp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  await contract.save();

  res.json({
    success: true,
    trackingToken: contract.delivery.trackingToken,
  });
};

/* ================= VERIFY DELIVERY OTP ================= */
exports.verifyDeliveryOtp = async (req, res) => {
  const { otp, token } = req.body;
  const { contractId } = req.params;

  const contract = await HarvestSaleContract.findOne({
    _id: contractId,
    "delivery.trackingToken": token,
  });

  if (!contract)
    return res.status(403).json({ message: "Invalid tracking link" });

  if (contract.delivery.status !== "IN_TRANSIT")
    return res.status(400).json({ message: "Delivery not in transit" });

  if (contract.delivery.deliveryOtp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  // 🔒 BLOCK OTP UNTIL PAYMENT VERIFIED
  if (
    contract.payment.mode === "ON_DELIVERY" &&
    contract.payment.status !== "VERIFIED"
  ) {
    return res.status(400).json({
      message: "Payment must be verified before delivery confirmation",
    });
  }

  contract.delivery.status = "DELIVERED";
  contract.delivery.otpVerified = true;
  contract.delivery.deliveredAt = new Date();
  contract.status = "COMPLETED";

  await contract.save();

  res.json({ success: true });
};

/* ================= UPDATE DRIVER LOCATION ================= */
exports.updateDriverLocation = async (req, res) => {
  try {
    const { contractId } = req.params;
    const lat = req.body.lat ?? req.body.latitude;
    const lng = req.body.lng ?? req.body.longitude;
    const { token } = req.body;

    console.log("==== DRIVER LOCATION API HIT ====");
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);

    if (typeof lat !== "number" || typeof lng !== "number") {
      console.warn("INVALID COORDS");
      return res.status(400).json({
        success: false,
        reason: "INVALID_COORDINATES",
        received: { lat, lng },
      });
    }

    const contract = await HarvestSaleContract.findById(contractId);

    if (!contract) {
      console.warn("CONTRACT NOT FOUND");
      return res.status(404).json({
        success: false,
        reason: "CONTRACT_NOT_FOUND",
      });
    }

    if (!contract.delivery?.trackingToken) {
      console.warn("NO TRACKING TOKEN IN DB");
      return res.status(409).json({
        success: false,
        reason: "NO_TRACKING_TOKEN",
      });
    }

    if (String(contract.delivery.trackingToken) !== String(token)) {
      console.warn("TOKEN MISMATCH");
      console.log("DB TOKEN:", contract.delivery.trackingToken);
      console.log("REQ TOKEN:", token);

      return res.status(401).json({
        success: false,
        reason: "TOKEN_MISMATCH",
      });
    }

    if (contract.delivery.status !== "IN_TRANSIT") {
      console.warn("DELIVERY NOT ACTIVE");
      return res.status(400).json({
        success: false,
        reason: "DELIVERY_NOT_IN_TRANSIT",
        status: contract.delivery.status,
      });
    }

    contract.delivery.liveLocation = {
      lat,
      lng,
      updatedAt: new Date(),
    };

    await contract.save();

    console.log("LOCATION UPDATED");

    return res.json({
      success: true,
      stored: contract.delivery.liveLocation,
    });
  } catch (err) {
    console.error("LOCATION UPDATE CRASH:", err);
    return res.status(500).json({
      success: false,
      reason: "SERVER_EXCEPTION",
      message: err.message,
    });
  }
};

/* ================= FARMER CONFIRM DELIVERY ================= */
exports.confirmDelivery = async (req, res) => {
  const contract = await HarvestSaleContract.findById(req.params.contractId);
  if (!contract) return res.status(404).json({ message: "Contract not found" });

  if (req.user.role !== "farmer")
    return res.status(403).json({ message: "Only farmer allowed" });

  contract.delivery.status = "DELIVERED";
  contract.status = "COMPLETED";

  await contract.save();

  res.json({ success: true });
};
