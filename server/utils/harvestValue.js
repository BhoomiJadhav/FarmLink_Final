exports.normalizeContractValue = (contract) => {
  const quantity = Number(contract.harvestDetails?.quantity || 0);
  const price = Number(contract.payment?.pricePerUnit || 0);

  if (typeof contract.payment?.amount === "number") {
    return contract.payment.amount;
  }

  return quantity * price;
};
