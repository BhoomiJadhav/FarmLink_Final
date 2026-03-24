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
const ContractKpiRow = ({ kpis }) => {
  if (!kpis) return null;

  const items = [
    { label: "Progress", value: `${kpis.progressPercent}%` },
    {
      label: "Stages Completed",
      value: `${kpis.completedStages}/${kpis.totalStages}`,
    },
    { label: "Current Stage", value: kpis.currentStage },
    { label: "Advance Paid", value: kpis.advanceAmount ?? "—" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-xs text-gray-500">{item.label}</p>
          <p className="text-lg font-semibold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ContractKpiRow;
