const Contract = require("../Models/BaseContract.js");
const { CONTRACT_STATUS } = require("../constants/contractEnums.js");

const updateContract = async (req, res) => {
  try {
    const { contractId } = req.params;

    const updatedContract = await Contract.findByIdAndUpdate(
      contractId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    res.json({
      success: true,
      contract: updatedContract,
    });
  } catch (error) {
    console.error("Update contract failed:", error);
    res.status(500).json({ message: "Failed to update contract" });
  }
};
const updateFinalAmount = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { agreedPricePerUnit, estimatedValue } = req.body;

    const contract = await Contract.findById(contractId);

    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (contract.status !== CONTRACT_STATUS.NEGOTIATING)
      return res.status(400).json({
        message: "Final amount can only be set after negotiation",
      });

    contract.payment.agreedPricePerUnit = agreedPricePerUnit;
    contract.payment.estimatedValue = estimatedValue;
    contract.payment.priceNegotiable = false;

    contract.status = CONTRACT_STATUS.CONFIRMED;

    await contract.save();

    res.json({
      success: true,
      message: "Final contract amount confirmed",
      contract,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  updateFinalAmount,
  updateContract,
};
