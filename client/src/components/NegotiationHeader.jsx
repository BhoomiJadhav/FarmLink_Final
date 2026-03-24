import React from "react";

const NegotiationHeader = ({ contract }) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        Negotiation - {contract.cropDetails.cropName}
      </h2>

      <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-4">
        <div>
          Initial Price:
          <span className="font-medium text-gray-800 ml-1">
            ₹ {contract.pricing.agreedPricePerUnit}
          </span>
        </div>

        <div>
          Quantity:
          <span className="font-medium text-gray-800 ml-1">
            {contract.cropDetails.expectedYield}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NegotiationHeader;
