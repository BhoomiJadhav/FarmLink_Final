const Contract = require("../Models/BaseContract.js");
const HarvestListing = require("../Models/HarvestListing.js");
const { CONTRACT_STATUS } = require("../constants/contractEnums.js");
const Notification = require("../Models/Notification.js");

/* =========================
   HARVEST: ACCEPT CONTRACT
   ========================= */
const acceptHarvestContract = async (req, res) => {
  const { contractId } = req.params;

  const contract = await Contract.findById(contractId);
  if (!contract) return res.status(404).json({ message: "Contract not found" });

  if (contract.contractType !== "HARVEST_SALE")
    return res.status(400).json({ message: "Not a harvest contract" });

  if (contract.status !== CONTRACT_STATUS.SENT)
    return res.status(400).json({ message: "Contract not pending" });

  // 1. Accept this contract
  contract.status = CONTRACT_STATUS.ACTIVE;
  await contract.save();

  // 2. Lock the harvest listing
  const listing = await HarvestListing.findById(contract.harvestListingId);
  if (listing) {
    listing.status = "SOLD";
    await listing.save();
  }

  // 3. Reject all other offers for this listing
  await Contract.updateMany(
    {
      harvestListingId: contract.harvestListingId,
      _id: { $ne: contractId },
    },
    { status: CONTRACT_STATUS.REJECTED }
  );
  await Notification.create({
    userId: contract.buyer.buyerId,
    title: "Offer Accepted",
    message: `Your offer for ${contract.harvestDetails.cropName} was accepted.`,
    type: "CONTRACT",
    relatedContractId: contract._id,
  });

  res.json({ message: "Harvest contract accepted successfully" });
};

/* =========================
   HARVEST: REJECT CONTRACT
   ========================= */
const rejectHarvestContract = async (req, res) => {
  const { contractId } = req.params;

  const contract = await Contract.findById(contractId);
  if (!contract) return res.status(404).json({ message: "Contract not found" });

  if (contract.contractType !== "HARVEST_SALE")
    return res.status(400).json({ message: "Not a harvest contract" });

  if (contract.status !== CONTRACT_STATUS.SENT)
    return res.status(400).json({ message: "Contract not pending" });

  contract.status = CONTRACT_STATUS.REJECTED;
  await contract.save();
  await Notification.create({
    userId: contract.buyer.buyerId,
    title: "Offer Rejected",
    message: `Your offer for ${contract.harvestDetails.cropName} was rejected.`,
    type: "CONTRACT",
    relatedContractId: contract._id,
  });

  res.json({ message: "Harvest contract rejected" });
};

/* =========================
   COMPLETE (ALREADY EXISTS)
   ========================= */
const markContractCompleted = async (req, res) => {
  const contract = await Contract.findById(req.params.contractId);

  if (!contract) return res.status(404).json({ message: "Contract not found" });

  if (contract.status !== CONTRACT_STATUS.ACTIVE)
    return res.status(400).json({ message: "Contract not active" });

  contract.status = CONTRACT_STATUS.COMPLETED;
  await contract.save();

  res.json({ message: "Contract completed successfully" });
};

module.exports = {
  acceptHarvestContract,
  rejectHarvestContract,
  markContractCompleted,
};
