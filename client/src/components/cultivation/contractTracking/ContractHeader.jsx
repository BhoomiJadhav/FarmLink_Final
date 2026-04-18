// import { ArrowLeft, FileText, Download } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const STATUS_STYLES = {
//   active: "bg-green-100 text-green-700",
//   completed: "bg-gray-200 text-gray-700",
//   disputed: "bg-red-100 text-red-700",
// };

// export default function ContractHeader({ contract }) {
//   const navigate = useNavigate();
//   if (!contract) return null;

//   return (
//     <div className="border-b bg-white px-6 py-4">
//       <div className="flex items-start justify-between">
//         {/* LEFT */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-1 text-gray-500 hover:text-black"
//           >
//             <ArrowLeft size={20} />
//           </button>

//           <div>
//             <div className="flex items-center gap-2">
//               <h1 className="text-lg font-semibold">
//                 Contract #{contract.contractId}
//               </h1>

//               <span
//                 className={`rounded-full px-3 py-0.5 text-xs font-medium ${
//                   STATUS_STYLES[contract.status || "active"]
//                 }`}
//               >
//                 {(contract.status || "active").toUpperCase()}
//               </span>
//             </div>

//             <p className="text-sm text-gray-500">
//               {contract.contractName ||
//                 `${contract.crop?.name} Cultivation Contract`}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => navigate(`/contracts/${contract._id}/document`)}
//             className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
//           >
//             <FileText size={16} />
//             View Contract
//           </button>

//           <button
//             disabled
//             className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
//           >
//             <Download size={16} />
//             Export
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { ArrowLeft, FileText, Download, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-slate-50 text-slate-700 border-slate-200",
  disputed: "bg-rose-50 text-rose-700 border-rose-200",
  frozen: "bg-amber-50 text-amber-700 border-amber-200"
};

export default function ContractHeader({ contract }) {
  const navigate = useNavigate();
  if (!contract) return null;

  const statusKey = (contract.status || contract.contractStatus || "active").toLowerCase();
  const badgeStyle = STATUS_STYLES[statusKey] || STATUS_STYLES.active;

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-40 mb-6 -mx-6 -mt-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded">
                Cultivation
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-0.5">
                <Hash size={10} /> {contract.contractId || contract._id?.slice(-8).toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none flex items-center gap-3">
              {contract.contractName || `${contract.crop?.name || "Crop"} Cultivation Contract`}
              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${badgeStyle}`}>
                {(contract.status || contract.contractStatus || "active").replace(/_/g, " ")}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/contracts/${contract._id}/document`)}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <FileText size={14} /> View Contract
          </button>
          <button
            disabled
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-not-allowed opacity-70"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>
    </div>
  );
}