// // const ContractKpiRow = ({ contract }) => {
// //   if (!contract) return null;

// //   const today = new Date();
// //   const harvest = new Date(contract.expectedHarvestDate);
// //   const daysLeft = Math.max(
// //     Math.ceil((harvest - today) / (1000 * 60 * 60 * 24)),
// //     0,
// //   );

// //   const stagesDone =
// //     contract.cultivationStages?.filter((s) => s.status === "completed")
// //       .length || 0;

// //   const totalStages = contract.cultivationStages?.length || 0;

// //   const nextPayment = contract.paymentSchedule?.find(
// //     (p) => p.status === "pending",
// //   );

// //   return (
// //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //       <Kpi label="Days to Harvest" value={daysLeft} />
// //       <Kpi label="Stages Done" value={`${stagesDone} / ${totalStages}`} />
// //       <Kpi label="Contract Status" value={contract.status} />
// //       <Kpi
// //         label="Next Payment"
// //         value={nextPayment ? nextPayment.dueDate : "—"}
// //       />
// //     </div>
// //   );
// // };

// // export default ContractKpiRow;
// const ContractKpiRow = ({ contract }) => {
//   if (!contract) return null;

//   const kpis = [
//     { label: "Crop", value: contract.cropName },
//     { label: "Area (acres)", value: contract.landArea },
//     { label: "Stage", value: contract.cultivationStage },
//     { label: "Expected Yield", value: contract.expectedYield },
//     { label: "Delivery Date", value: contract.deliveryDate },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//       {kpis.map((item, index) => (
//         <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
//           <p className="text-xs text-gray-500">{item.label}</p>
//           <p className="text-sm font-semibold text-gray-900">
//             {item.value || "—"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ContractKpiRow;
// const ContractKpiRow = ({ kpis }) => {
//   if (!kpis) return null;

//   const items = [
//     { label: "Progress", value: `${kpis.progressPercent}%` },
//     {
//       label: "Stages Completed",
//       value: `${kpis.completedStages}/${kpis.totalStages}`,
//     },
//     { label: "Current Stage", value: kpis.currentStage },
//     { label: "Advance Paid", value: kpis.advanceAmount ?? "—" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {items.map((item, index) => (
//         <div key={index} className="bg-white rounded-xl p-4 shadow-sm border">
//           <p className="text-xs text-gray-500">{item.label}</p>
//           <p className="text-lg font-semibold text-gray-900">{item.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ContractKpiRow;
import React from "react";
import { Activity, Layers, PlayCircle, Banknote } from "lucide-react";

const ContractKpiRow = ({ kpis }) => {
  if (!kpis) return null;

  const items = [
    { 
      label: "Progress", 
      value: `${kpis.progressPercent}%`, 
      icon: <Activity size={16} />, 
      color: "emerald" 
    },
    {
      label: "Stages Completed",
      value: `${kpis.completedStages}/${kpis.totalStages}`,
      icon: <Layers size={16} />,
      color: "blue",
    },
    { 
      label: "Current Stage", 
      value: kpis.currentStage || "Pending", 
      icon: <PlayCircle size={16} />, 
      color: "indigo" 
    },
    { 
      label: "Advance Paid", 
      value: kpis.advanceAmount ? `₹${kpis.advanceAmount.toLocaleString()}` : "—", 
      icon: <Banknote size={16} />, 
      color: "amber" 
    },
  ];

  const colorClasses = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClasses[item.color] || "bg-slate-50 text-slate-600"}`}>
            {item.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 truncate">
              {item.label}
            </p>
            <p className="text-lg font-black text-slate-900 leading-tight truncate">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContractKpiRow;