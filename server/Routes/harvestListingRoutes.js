const express = require("express");
const router = express.Router();
const uploadCropImages = require("../middleware/uploadCropImages");
const {
  createHarvestListing,
  getOpenHarvestListings,
  getFarmerHarvestListings,
  getHarvestListingById,
  updateListing,
  deleteListing,
} = require("../Controllers/harvestListingController");
const { protect } = require("../middleware/auth");

router.post(
  "/create",
  protect,
  uploadCropImages.array("images", 5),
  createHarvestListing,
);

router.get("/farmer/my-listings", protect, getFarmerHarvestListings);

/* Buyer */
router.get("/market", protect, getOpenHarvestListings);
router.get("/:id", protect, getHarvestListingById);
router.delete("/:id", protect, deleteListing);
router.put("/:id", protect, updateListing);
module.exports = router;
