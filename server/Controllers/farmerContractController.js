const CultivationContract = require("../Models/CultivationContract");
const Profile = require("../Models/Profile");
const { CONTRACT_STATUS } = require("../constants/contractEnums");

/* ======================================================
   FARMER ACTION ON CONTRACT
   ====================================================== */
const respondToCultivationContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { action } = req.body; // ACCEPT | REJECT | NEGOTIATE
    const farmerId = req.user._id;

    const contract = await CultivationContract.findOne({
      _id: contractId,
      "farmer.farmerId": farmerId,
    });

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    /* ---------- ACTION HANDLING ---------- */
    if (action === "ACCEPT") {
      contract.status = CONTRACT_STATUS.ACCEPTED;

      await Profile.findOneAndUpdate(
        { userId: farmerId },
        { availabilityStatus: "CONTRACTED" },
      );
    }

    if (action === "REJECT") {
      contract.status = CONTRACT_STATUS.REJECTED;

      await Profile.findOneAndUpdate(
        { userId: farmerId },
        { availabilityStatus: "AVAILABLE" },
      );
    }

    if (action === "NEGOTIATE") {
      contract.status = CONTRACT_STATUS.NEGOTIATING;
      // availability stays NEGOTIATING
    }

    await contract.save();

    res.status(200).json({
      success: true,
      message: `Contract ${action.toLowerCase()}ed`,
      contract,
    });
  } catch (error) {
    console.error("Farmer contract response error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  respondToCultivationContract,
};
