import React from "react";

const NegotiationHeader = ({ contract }) => {
  return (
    // <div className="bg-white border rounded-xl p-5 shadow-sm">
    //   <h2 className="text-lg font-semibold text-gray-800">
    //     Negotiation - {contract.cropDetails.cropName}
    //   </h2>

    //   <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-4">
    //     <div>
    //       Initial Price:
    //       <span className="font-medium text-gray-800 ml-1">
    //         ₹ {contract.pricing.agreedPricePerUnit}
    //       </span>
    //     </div>

    //     <div>
    //       Quantity:
    //       <span className="font-medium text-gray-800 ml-1">
    //         {contract.cropDetails.expectedYield}
    //       </span>
    //     </div>
    //     <div className="flex justify-between items-center">
    //       <h2 className="text-lg font-bold">{contract.cropDetails.cropName}</h2>

    //       <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
    //         Active
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">{contract.cropDetails.cropName}</h2>
        <p className="text-xs text-gray-500">
          ₹ {contract.pricing.agreedPricePerUnit} • Qty:{" "}
          {contract.cropDetails.expectedYield}
        </p>
      </div>

      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
        Active
      </span>
    </div>
  );
};

export default NegotiationHeader;
