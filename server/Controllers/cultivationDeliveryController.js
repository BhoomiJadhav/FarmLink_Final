const CultivationContract = require("../Models/CultivationContract");
const crypto = require("crypto");

/* ======================================================
   1️⃣ DISPATCH DELIVERY (BUYER ONLY)
====================================================== */
exports.dispatchCultivationDelivery = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { vehicleNumber, driverContact } = req.body;

    const contract = await CultivationContract.findById(contractId);

    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (req.user.role !== "buyer")
      return res
        .status(403)
        .json({ message: "Only buyer can dispatch delivery" });

    if (contract.status !== "HARVEST_COMPLETED")
      return res.status(400).json({ message: "Harvest not completed yet" });

    if (!vehicleNumber || !driverContact)
      return res.status(400).json({
        message: "Vehicle number and driver contact required",
      });
    contract.status = "DELIVERY_IN_PROGRESS";
    contract.deliveryExecution = {
      ...contract.deliveryExecution,
      vehicleNumber,
      driverContact,
      status: "IN_TRANSIT",
      liveLocation: {
        lat: null,
        lng: null,
        updatedAt: null,
      },
      trackingToken: crypto.randomUUID(),
      assignedAt: new Date(),
      deliveryOtp: Math.floor(100000 + Math.random() * 900000).toString(),
    };

    await contract.save();

    return res.json({
      success: true,
      trackingToken: contract.deliveryExecution.trackingToken,
    });
  } catch (err) {
    console.error("Dispatch cultivation delivery error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   2️⃣ UPDATE DRIVER LOCATION
====================================================== */
exports.updateCultivationDriverLocation = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { lat, lng, token } = req.body;

    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({
        success: false,
        reason: "INVALID_COORDINATES",
      });
    }

    const contract = await CultivationContract.findOne({
      _id: contractId,
      "deliveryExecution.trackingToken": token,
    });

    if (!contract)
      return res.status(403).json({
        success: false,
        reason: "INVALID_TRACKING_TOKEN",
      });

    if (contract.deliveryExecution.status !== "IN_TRANSIT") {
      return res.status(400).json({
        success: false,
        reason: "DELIVERY_NOT_ACTIVE",
      });
    }

    contract.deliveryExecution.liveLocation = {
      lat,
      lng,
      updatedAt: new Date(),
    };

    await contract.save();

    return res.json({
      success: true,
      stored: contract.deliveryExecution.liveLocation,
    });
  } catch (err) {
    console.error("Cultivation location update error:", err);
    return res.status(500).json({
      success: false,
      reason: "SERVER_ERROR",
    });
  }
};

/* ======================================================
   3️⃣ VERIFY DELIVERY OTP (PICKUP CONFIRMATION)
====================================================== */
exports.verifyCultivationDeliveryOtp = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { otp, token } = req.body;

    const contract = await CultivationContract.findOne({
      _id: contractId,
      "deliveryExecution.trackingToken": token,
    });

    if (!contract)
      return res.status(403).json({ message: "Invalid tracking link" });

    if (contract.deliveryExecution.status !== "IN_TRANSIT")
      return res.status(400).json({ message: "Delivery not active" });

    if (contract.deliveryExecution.deliveryOtp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    /* ================= DELIVERY SUCCESS ================= */
    contract.deliveryExecution.status = "DELIVERED";
    contract.deliveryExecution.otpVerified = true;
    contract.deliveryExecution.deliveredAt = new Date();
    contract.status = "DELIVERY_COMPLETED";
    /* ================= UNLOCK FINAL PAYMENT ================= */
    const finalPayment = contract.payments.find((p) => p.type === "FINAL");

    if (finalPayment) {
      // unlock after 2 days
      const unlockDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

      finalPayment.status = "LOCKED";
      finalPayment.dueDate = unlockDate;

      contract.status = "FINAL_PAYMENT_PENDING";
    }

    await contract.save();

    return res.json({ success: true });
  } catch (err) {
    console.error("OTP verify error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   4️⃣ OPTIONAL: MANUAL DELIVERY CONFIRM (ADMIN)
====================================================== */
exports.adminConfirmDelivery = async (req, res) => {
  try {
    const { contractId } = req.params;

    const contract = await CultivationContract.findById(contractId);

    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    contract.deliveryExecution.status = "DELIVERED";
    contract.deliveryExecution.deliveredAt = new Date();

    await contract.save();

    return res.json({ success: true });
  } catch (err) {
    console.error("Admin confirm error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
