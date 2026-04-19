// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function StageImageViewer({
//   open,
//   stage,
//   role,
//   onClose,
//   onVerify,
// }) {
//   if (!open || !stage) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-xl w-[720px] p-6 relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-xl">
//           ✕
//         </button>

//         <h2 className="text-lg font-semibold mb-4">
//           Stage Proof – {stage.name}
//         </h2>

//         <div className="grid grid-cols-3 gap-4">
//           {stage.farmerImages?.map((file, idx) => (
//             <img
//               key={idx}
//               src={`${API_BASE}/uploads/stages/${file}`}
//               alt={`proof-${idx}`}
//               className="w-full h-40 object-cover rounded border"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.src = "/placeholder.png";
//               }}
//             />
//           ))}
//         </div>

//         {role === "BUYER" && !stage.buyerVerified && (
//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               onClick={() => onVerify(stage, false)}
//               className="px-4 py-2 border rounded"
//             >
//               Request Re-upload
//             </button>

//             <button
//               onClick={() => onVerify(stage, true)}
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Verify Stage
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { X, ShieldCheck, AlertTriangle, Image as ImageIcon } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function StageImageViewer({
  open,
  stage,
  role,
  onClose,
  onVerify,
}) {
  if (!open || !stage) return null;

  const isCompleted = stage.buyerVerified;
  // Show verification buttons if user is buyer and stage is not yet verified
  const isPendingVerification = role === "BUYER" && !isCompleted;

  // Helper to safely format the image URL based on your backend structure
  const getImageUrl = (file) => {
    if (!file) return "/placeholder.png";
    if (file.startsWith("http")) return file;
    // If the DB saves "uploads/stages/file.jpg", just prepend API base.
    // Otherwise, use your original explicit path structure.
    if (file.includes("uploads")) return `${API_BASE}/${file.replace(/\\/g, "/")}`;
    return `${API_BASE}/uploads/stages/${file}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em] flex items-center gap-2">
              <ImageIcon size={18} className="text-emerald-600" /> Stage Proof
            </h3>
            <p className="text-[11px] font-bold text-slate-500 uppercase mt-1 tracking-widest">
              Phase 0{stage.stageIndex + 1 || "?"}: {stage.name}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* IMAGE GALLERY SCROLL AREA */}
        <div className="p-8 overflow-y-auto bg-[#f8fafc] flex-1">
          {stage.farmerImages && stage.farmerImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stage.farmerImages.map((file, idx) => (
                <div key={idx} className="group relative rounded-2xl overflow-hidden border-4 border-white shadow-lg shadow-slate-200/50 bg-slate-100">
                  <img
                    src={getImageUrl(file)}
                    alt={`proof-${idx}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">
                    File 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
              <ImageIcon size={48} className="mb-4 opacity-20" />
              <p className="text-[11px] font-black uppercase tracking-widest">No visual evidence found in system.</p>
            </div>
          )}
        </div>

        {/* FOOTER: BUYER VERIFICATION ACTIONS */}
        {isPendingVerification && (
          <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" />
              <div>
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Audit Required</p>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">Approve evidence to unlock next phase.</p>
              </div>
            </div>

            <div className="flex w-full sm:w-auto gap-3">
              <button
                onClick={() => {
                  onVerify(stage, false);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-6 py-3 text-[11px] font-black uppercase tracking-widest border border-rose-200 bg-rose-50 text-rose-700 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-[0.98]"
              >
                Request Re-upload
              </button>
              <button
                onClick={() => {
                  onVerify(stage, true);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-8 py-3 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
              >
                <ShieldCheck size={14} /> Verify Stage
              </button>
            </div>
          </div>
        )}

        {/* FOOTER: ALREADY VERIFIED */}
        {isCompleted && (
          <div className="p-5 border-t border-slate-100 bg-emerald-50/50 flex justify-center">
            <p className="text-[11px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> Evidence Verified & Approved
            </p>
          </div>
        )}

      </div>
    </div>
  );
}