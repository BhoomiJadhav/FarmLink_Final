// import {
//   MessageSquare,
//   FileText,
//   AlertTriangle,
//   ShieldCheck,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const QuickActions = ({
//   contractId,
//   onOpenChat,
//   unreadCount,
//   onRequestStage,
//   isRequestAlreadySent,
//   onRaiseDispute,
//   dispute,
// }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
//       <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>

//       {/* Communication Section */}
//       <div className="space-y-3">
//         <p className="text-xs uppercase text-gray-400 tracking-wide">
//           Communication
//         </p>

//         <button
//           onClick={onOpenChat}
//           className="relative w-full flex items-center gap-3 border p-3 rounded-lg hover:bg-gray-50 transition"
//         >
//           <MessageSquare size={18} className="text-gray-600" />
//           <span className="text-sm font-medium text-gray-700">
//             Open Secure Chat
//           </span>

//           {unreadCount > 0 && (
//             <span className="absolute right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//               {unreadCount}
//             </span>
//           )}
//         </button>

//         <button
//           onClick={onRequestStage}
//           disabled={isRequestAlreadySent}
//           className={`w-full flex items-center gap-3 border p-3 rounded-lg transition
//     ${
//       isRequestAlreadySent
//         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//         : "hover:bg-gray-50"
//     }
//   `}
//         >
//           <ShieldCheck size={18} />
//           <span className="text-sm font-medium">
//             {isRequestAlreadySent
//               ? "Stage Update Requested"
//               : "Request Stage Update"}
//           </span>
//         </button>
//       </div>

//       {/* Documents Section */}
//       <div className="space-y-3">
//         <p className="text-xs uppercase text-gray-400 tracking-wide">
//           Documents
//         </p>

//         <button
//           onClick={() => navigate(`/contracts/${contractId}/document`)}
//           className="w-full flex items-center gap-3 border p-3 rounded-lg hover:bg-gray-50 transition"
//         >
//           <FileText size={18} className="text-gray-600" />
//           <span className="text-sm font-medium text-gray-700">
//             Download Contract Agreement
//           </span>
//         </button>
//       </div>

//       {/* Resolution Section */}
//       <div className="space-y-3">
//         <p className="text-xs uppercase text-gray-400 tracking-wide">
//           Resolution
//         </p>

//         {/* <button
//           className="w-full flex items-center gap-3 border p-3 rounded-lg text-red-600 border-red-200 hover:bg-red-50 transition"
//           onClick={() => {
//             console.log("Raise dispute for contract:", contractId);
//           }}
//         >
//           <AlertTriangle size={18} />
//           <span className="text-sm font-semibold">Raise Dispute</span>
//         </button> */}
//         {!dispute && (
//           <button
//             onClick={onRaiseDispute}
//             className="w-full flex items-center gap-3 border p-3 rounded-lg text-red-600 border-red-200 hover:bg-red-50 transition"
//           >
//             <AlertTriangle size={18} />
//             <span className="text-sm font-semibold">Raise Dispute</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuickActions;
import {
  MessageSquare,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = ({
  contractId,
  onOpenChat,
  unreadCount,
  onRequestStage,
  isRequestAlreadySent,
  onRaiseDispute,
  dispute,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
        <Zap size={16} className="text-emerald-600" />
        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Command Center</h4>
      </div>

      {/* Communication Section */}
      <div className="mb-6">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
          Live Comms
        </p>

        <div className="space-y-2.5">
          <button
            onClick={onOpenChat}
            className="relative w-full flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-all group"
          >
            <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm shrink-0 group-hover:border-emerald-300 transition-colors">
              <MessageSquare size={14} className="text-slate-600 group-hover:text-emerald-600 transition-colors" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-700 group-hover:text-emerald-700 transition-colors">
              Secure Channel
            </span>

            {unreadCount > 0 && (
              <span className="absolute right-3 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={onRequestStage}
            disabled={isRequestAlreadySent}
            className={`w-full flex items-center gap-3 border p-2.5 rounded-xl transition-all group
            ${
              isRequestAlreadySent
                ? "bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed"
                : "bg-slate-50 border-slate-200 hover:bg-blue-50 hover:border-blue-200"
            }`}
          >
            <div className={`p-1.5 bg-white rounded-lg border shadow-sm shrink-0 transition-colors ${isRequestAlreadySent ? "border-slate-100" : "border-slate-200 group-hover:border-blue-300"}`}>
              <ShieldCheck size={14} className={isRequestAlreadySent ? "text-slate-400" : "text-slate-600 group-hover:text-blue-600"} />
            </div>
            <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isRequestAlreadySent ? "text-slate-400" : "text-slate-700 group-hover:text-blue-700"}`}>
              {isRequestAlreadySent
                ? "Update Requested"
                : "Request Stage Update"}
            </span>
          </button>
        </div>
      </div>

      {/* Documents Section */}
      <div className="mb-6">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
          Documentation
        </p>

        <button
          onClick={() => navigate(`/contracts/${contractId}/document`)}
          className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl hover:bg-slate-100 transition-all group"
        >
          <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm shrink-0">
            <FileText size={14} className="text-slate-600" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">
            Master Agreement
          </span>
        </button>
      </div>

      {/* Resolution Section */}
      {!dispute && (
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Resolution
          </p>

          <button
            onClick={onRaiseDispute}
            className="w-full flex items-center gap-3 bg-rose-50 border border-rose-200 p-2.5 rounded-xl hover:bg-rose-100 transition-all group"
          >
            <div className="p-1.5 bg-white rounded-lg border border-rose-200 shadow-sm shrink-0">
              <AlertTriangle size={14} className="text-rose-600" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-rose-700">
              Initiate Dispute Protocol
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickActions;