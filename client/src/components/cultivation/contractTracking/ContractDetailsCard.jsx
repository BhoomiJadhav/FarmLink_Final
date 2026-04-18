// const ContractDetailsCard = ({ contract }) => {
//   if (!contract || !contract.cropDetails || !contract.pricing) {
//     return (
//       <div className="bg-white border rounded-xl p-6">
//         Loading contract details...
//       </div>
//     );
//   }

//   const { cropDetails, pricing, delivery } = contract;

//   const quantity = Number(cropDetails.expectedYield || 0);
//   const pricePerUnit = Number(pricing.agreedPricePerUnit || 0);
//   const total = quantity * pricePerUnit;

//   return (
//     <div className="bg-white border rounded-xl p-6 space-y-4">
//       <h3 className="font-semibold">Contract Details</h3>

//       <div className="text-sm space-y-1">
//         <div>
//           Crop: {cropDetails.cropName} ({cropDetails.variety})
//         </div>

//         <div>Quantity: {quantity} Quintals</div>

//         <div>Price: ₹{pricePerUnit} / Quintal</div>

//         <div className="font-medium mt-2">Total: ₹{total.toLocaleString()}</div>
//       </div>

//       <div className="text-sm text-gray-500">
//         Start: {new Date(contract.contractDate).toLocaleDateString()} <br />
//         Expected Harvest: {delivery?.approxDeliveryMonth || "-"}
//       </div>
//     </div>
//   );
// };
// export default ContractDetailsCard;
import React from "react";
import { FileText, CalendarDays, Banknote, Package, Tag, Hash } from "lucide-react";

const ContractDetailsCard = ({ contract }) => {
  if (!contract || !contract.cropDetails || !contract.pricing) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-center min-h-[200px]">
        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { cropDetails, pricing, delivery } = contract;

  const quantity = Number(cropDetails.expectedYield?.replace(/[^0-9.]/g, '') || 0); // Safely parse in case backend sends string with units
  const pricePerUnit = Number(pricing.agreedPricePerUnit || 0);
  const total = pricing.estimatedValue || (quantity * pricePerUnit);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
        <FileText size={16} className="text-emerald-600" />
        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Agreement Details</h4>
      </div>

      <div className="space-y-4">
        {/* Crop Profile */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm shrink-0">
            <Tag size={14} className="text-slate-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Target Crop</p>
            <p className="text-sm font-black text-slate-900 leading-tight truncate">
              {cropDetails.cropName} 
            </p>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5 truncate">
              {cropDetails.variety || "Standard Variety"}
            </p>
          </div>
        </div>

        {/* Financials & Volume Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Package size={10}/> Expected Yield
            </p>
            <p className="text-xs font-black text-slate-900 truncate">
              {cropDetails.expectedYield || "—"}
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Hash size={10}/> Unit Rate
            </p>
            <p className="text-xs font-black text-slate-900 truncate">
              ₹{pricePerUnit.toLocaleString()} <span className="text-[9px] text-slate-500 font-bold">/ Q</span>
            </p>
          </div>

          <div className="col-span-2 bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-100/50">
            <p className="text-[10px] font-black text-emerald-600/70 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Banknote size={12}/> Estimated Contract Value
            </p>
            <p className="text-lg font-black text-emerald-700 tracking-tight">
              ₹{total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Timeline Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Initiation Date</span>
            <span className="text-slate-700 flex items-center gap-1">
              <CalendarDays size={10}/>
              {new Date(contract.createdAt || contract.contractDate || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Target Harvest</span>
            <span className="text-blue-600 flex items-center gap-1">
              <CalendarDays size={10}/>
              {delivery?.approxDeliveryMonth || "—"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContractDetailsCard;