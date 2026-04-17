const HarvestListing = require("../Models/HarvestListing");
const Profile = require("../Models/Profile");

/* ================= CREATE HARVEST LISTING ================= */
const createHarvestListing = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in request",
      });
    }

    const farmerUser = req.user;
    console.log("BODY KEYS:", Object.keys(req.body));
    console.log("HARVEST RAW:", req.body.harvest);

    let harvest, qualityDetails, expectedPrice, delivery;
    let declarationAccepted;

    try {
      harvest = JSON.parse(req.body.harvest);
      qualityDetails = JSON.parse(req.body.qualityDetails);
      expectedPrice = JSON.parse(req.body.expectedPrice);
      delivery = JSON.parse(req.body.delivery);
      declarationAccepted =
        req.body.declarationAccepted === true ||
        req.body.declarationAccepted === "true";
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data format",
      });
    }

    if (
      !harvest.cropName ||
      !harvest.quantityAvailable ||
      !harvest.harvestedMonth ||
      !harvest.harvestedYear
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete harvest details",
      });
    }

    if (!qualityDetails.cropCondition || !qualityDetails.sortingStatus) {
      return res.status(400).json({
        success: false,
        message: "Quality details are required",
      });
    }
    // 📍 FIX PINCODE (IMPORTANT)
    if (req.body.delivery?.pickupLocation?.pincode) {
      req.body.delivery.pickupLocation.pincode =
        req.body.delivery.pickupLocation.pincode.replace(/\D/g, "");
    }
    // 💧 FIX MOISTURE ENUM
    let moisture = req.body.qualityDetails?.moistureLevel;

    if (moisture) {
      moisture = moisture.toUpperCase().replace(/\s/g, "");

      if (moisture === "LOW") moisture = "LOW";
      else if (moisture === "MEDIUM") moisture = "MEDIUM";
      else if (moisture === "HIGH") moisture = "HIGH";
      else moisture = "NOT_TESTED"; // fallback

      req.body.qualityDetails.moistureLevel = moisture;
    }
    // 🧺 SORTING DEFAULT
    if (!req.body.qualityDetails.sortingStatus) {
      req.body.qualityDetails.sortingStatus = "NOT_SORTED";
    }

    // 🌾 CONDITION DEFAULT
    if (!req.body.qualityDetails.cropCondition) {
      req.body.qualityDetails.cropCondition = "FRESH";
    }
    // FINAL BACKEND PINCODE FIX
    if (req.body.delivery?.pickupLocation?.pincode) {
      req.body.delivery.pickupLocation.pincode =
        req.body.delivery.pickupLocation.pincode.replace(/\D/g, "");
    }

    if (!declarationAccepted) {
      return res.status(400).json({
        success: false,
        message: "Declaration must be accepted",
      });
    }

    const farmerProfile = await Profile.findOne({
      userId: farmerUser._id,
    });

    if (!farmerProfile) {
      return res.status(400).json({
        success: false,
        message: "Farmer profile not completed",
      });
    }

    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    qualityDetails.images = imageUrls;

    const listing = await HarvestListing.create({
      farmer: {
        farmerId: farmerUser._id,
        name: farmerUser.name,
        address: farmerProfile.personal?.address || "",
      },
      harvest,
      qualityDetails,
      expectedPrice,
      delivery,
      declarationAccepted,
    });
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    return res.status(201).json({
      success: true,
      message: "Harvest listing added successfully",
      listing,
    });
  } catch (error) {
    console.error("HARVEST LISTING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create harvest listing",
      error: error.message,
    });
  }
};

/* ================= GET OPEN LISTINGS (BUYER) ================= */
const getOpenHarvestListings = async (req, res) => {
  try {
    const listings = await HarvestListing.find({
      status: "OPEN",
      offersSentBy: { $ne: req.user._id },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch harvest listings",
      error: error.message,
    });
  }
};

/* ================= GET FARMER’S OWN LISTINGS ================= */
const getFarmerHarvestListings = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const listings = await HarvestListing.find({
      "farmer.farmerId": farmerId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch farmer listings",
      error: error.message,
    });
  }
};

/* ================= UPDATE LISTING STATUS ================= */
const updateHarvestListingStatus = async (listingId, status) => {
  return await HarvestListing.findByIdAndUpdate(
    listingId,
    { status },
    { new: true },
  );
};

/* ================= GET LISTING BY ID ================= */
const getHarvestListingById = async (req, res) => {
  try {
    const listing = await HarvestListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Harvest listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch harvest listing",
      error: error.message,
    });
  }
};
const updateListing = async (req, res) => {
  try {
    const existingListing = await HarvestListing.findById(req.params.id);

    // 🧠 Parse incoming data
    const harvest = JSON.parse(req.body.harvest);
    const expectedPrice = JSON.parse(req.body.expectedPrice);
    const delivery = JSON.parse(req.body.delivery);
    const qualityDetails = JSON.parse(req.body.qualityDetails);

    // 📸 Existing images user kept
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    // 📸 New uploaded images (multer)
    const newImages = req.files ? req.files.map((file) => file.path) : [];

    // 🧠 Final images = kept + new
    const finalImages = [...existingImages, ...newImages];

    const updated = await HarvestListing.findByIdAndUpdate(
      req.params.id,
      {
        harvest,
        expectedPrice,
        delivery,
        qualityDetails: {
          ...qualityDetails,
          images: finalImages,
        },
      },
      { new: true },
    );

    res.json({ success: true, listing: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
const deleteListing = async (req, res) => {
  try {
    await HarvestListing.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {
  createHarvestListing,
  getOpenHarvestListings,
  getFarmerHarvestListings,
  updateHarvestListingStatus,
  getHarvestListingById,
  updateListing,
  deleteListing,
};
