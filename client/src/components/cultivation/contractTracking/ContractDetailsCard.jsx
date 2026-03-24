const ContractDetailsCard = ({ contract }) => {
  if (!contract || !contract.cropDetails || !contract.pricing) {
    return (
      <div className="bg-white border rounded-xl p-6">
        Loading contract details...
      </div>
    );
  }

  const { cropDetails, pricing, delivery } = contract;

  const quantity = Number(cropDetails.expectedYield || 0);
  const pricePerUnit = Number(pricing.agreedPricePerUnit || 0);
  const total = quantity * pricePerUnit;

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold">Contract Details</h3>

      <div className="text-sm space-y-1">
        <div>
          Crop: {cropDetails.cropName} ({cropDetails.variety})
        </div>

        <div>Quantity: {quantity} Quintals</div>

        <div>Price: ₹{pricePerUnit} / Quintal</div>

        <div className="font-medium mt-2">Total: ₹{total.toLocaleString()}</div>
      </div>

      <div className="text-sm text-gray-500">
        Start: {new Date(contract.contractDate).toLocaleDateString()} <br />
        Expected Harvest: {delivery?.approxDeliveryMonth || "-"}
      </div>
    </div>
  );
};
export default ContractDetailsCard;
