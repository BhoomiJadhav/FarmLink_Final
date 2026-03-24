const Contract = require("../Models/BaseContract.js");

const raiseDispute = async (req, res) => {
  const { reason } = req.body;
  const contract = await Contract.findById(req.params.contractId);

  if (!contract) return res.status(404).json({ message: "Contract not found" });

  contract.status = "DISPUTED";
  contract.dispute = {
    isDisputed: true,
    disputeReason: reason,
    resolvedBy: "MEDIATION",
  };

  await contract.save();

  res.json({ message: "Dispute raised successfully" });
};

module.exports = {
  raiseDispute,
};
