// // // const PaymentSchedule = ({ payments = [] }) => {
// // //   return (
// // //     <div className="bg-white border rounded-xl p-6">
// // //       <h2 className="font-semibold mb-4">Payment Schedule</h2>

// // //       <div className="space-y-4">
// // //         {payments.map((p, i) => (
// // //           <div
// // //             key={i}
// // //             className="flex justify-between items-center p-4 rounded-lg border"
// // //           >
// // //             <div>
// // //               <div className="font-medium">{p.label}</div>
// // //               <div className="text-sm text-gray-500">
// // //                 ₹{p.amount.toLocaleString()}
// // //               </div>
// // //             </div>

// // //             {p.status === "paid" && (
// // //               <span className="text-green-600">Paid</span>
// // //             )}
// // //             {p.status === "pending" && (
// // //               <button className="btn-primary">Pay Now</button>
// // //             )}
// // //             {p.status === "upcoming" && (
// // //               <span className="text-gray-400">Upcoming</span>
// // //             )}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentSchedule;
// // const PaymentSchedule = ({ payments = [] }) => {
// //   return (
// //     <div className="bg-white border rounded-xl p-6">
// //       <h2 className="font-semibold mb-4">Payment Schedule</h2>

// //       <div className="space-y-4">
// //         {payments.map((p, i) => (
// //           <div
// //             key={i}
// //             className="flex justify-between items-center p-4 rounded-lg border"
// //           >
// //             <div>
// //               <div className="font-medium">{p.type}</div>
// //               <div className="text-sm text-gray-500">
// //                 ₹{p.amount?.toLocaleString() || "—"}
// //               </div>
// //             </div>

// //             {p.status === "PAID" && (
// //               <span className="text-green-600 font-medium">Paid</span>
// //             )}

// //             {p.status === "DUE" && (
// //               <button className="px-3 py-1 text-sm rounded bg-green-600 text-white">
// //                 Pay Now
// //               </button>
// //             )}

// //             {p.status === "LOCKED" && (
// //               <span className="text-gray-400 text-sm">Locked</span>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentSchedule;

// import React from "react";
// import axios from "../../../api/axios";

// const statusColor = {
//   LOCKED: "bg-gray-200 text-gray-500",
//   DUE: "bg-yellow-100 text-yellow-700",
//   PENDING_VERIFICATION: "bg-blue-100 text-blue-700",
//   COMPLETED: "bg-green-100 text-green-700",
//   PENALIZED: "bg-red-100 text-red-700",
// };

// const PaymentSchedule = ({ contractId, payments = [], dispute }) => {
//   const isPaymentFrozen =
//     dispute?.status === "OPEN" || dispute?.status === "UNDER_REVIEW";

//   const uploadProof = async (paymentId, file) => {
//     if (!file) return;

//     const formData = new FormData();
//     // ✅ KEY FIX: Changed "proof" to "images" to match Backend Multer config
//     formData.append("images", file);

//     try {
//       await axios.post(
//         `/contracts/${contractId}/payments/${paymentId}/upload-proof`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Upload failed");
//     }
//   };

//   const verifyPayment = async (paymentId) => {
//     // Note: Your controller doesn't strictly need a URL anymore as it just flips status
//     // but keeping this to match your existing UI logic
//     try {
//       await axios.post(
//         `/contracts/${contractId}/payments/${paymentId}/verify`
//       );

//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Verification failed");
//     }
//   };

//   const isOverdue = (payment) => {
//     if (!payment.dueDate) return false;
//     return new Date() > new Date(payment.dueDate);
//   };

//   return (
//     <div className="space-y-4">
//       {isPaymentFrozen && (
//         <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-xl text-sm mb-4">
//           ⚠ Payments are temporarily frozen due to an active dispute.
//         </div>
//       )}
//       {payments.map((p) => (
//         <div
//           key={p._id}
//           className="border rounded-lg p-4 flex justify-between items-center shadow-sm bg-white"
//         >
//           <div>
//             <h4 className="font-semibold text-lg">{p.type} PAYMENT</h4>
//             <p className="text-sm">Amount: ₹{p.amount}</p>
//             {p.dueDate && (
//               <p className="text-sm text-gray-500">
//                 Due: {new Date(p.dueDate).toLocaleDateString()}
//               </p>
//             )}
//             {p.status === "PENALIZED" && (
//               <p className="text-red-600 text-sm">
//                 Penalty: ₹{p.penalty?.appliedAmount || 0}
//               </p>
//             )}
//             {p.status === "DUE" && isOverdue(p) && (
//               <p className="text-red-600 text-sm font-semibold">Overdue</p>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             <span
//               className={`px-3 py-1 rounded text-sm font-medium ${
//                 statusColor[p.status]
//               }`}
//             >
//               {p.status.replace("_", " ")}
//             </span>

//             {(p.status === "DUE" || p.status === "PENALIZED") && (
//               <label
//                 className={`px-4 py-1 rounded transition ${
//                   isPaymentFrozen
//                     ? "bg-gray-300 cursor-not-allowed text-gray-500"
//                     : p.status === "PENALIZED" 
//                       ? "bg-red-600 text-white cursor-pointer hover:bg-red-700" 
//                       : "bg-black text-white cursor-pointer hover:bg-gray-800"
//                 }`}
//               >
//                 {p.status === "PENALIZED" ? "Pay with Penalty" : "Upload Proof"}
//                 <input
//                   type="file"
//                   hidden
//                   disabled={isPaymentFrozen}
//                   accept="image/*"
//                   onChange={(e) => uploadProof(p._id, e.target.files[0])}
//                 />
//               </label>
//             )}

//             {p.status === "PENDING_VERIFICATION" && (
//               <button
//                 disabled={isPaymentFrozen}
//                 onClick={() => verifyPayment(p._id)}
//                 className={`px-4 py-1 rounded font-medium transition ${
//                   isPaymentFrozen
//                     ? "bg-gray-300 cursor-not-allowed text-gray-500"
//                     : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//               >
//                 Verify Receipt
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PaymentSchedule;

// import React from "react";
// import axios from "../../../api/axios";
// import { 
//   CreditCard, 
//   Clock, 
//   AlertCircle, 
//   CheckCircle2, 
//   Upload, 
//   ShieldCheck, 
//   Lock,
//   Banknote
// } from "lucide-react";

// const statusConfig = {
//   LOCKED: { bg: "bg-slate-100", text: "text-slate-500", border: "border-slate-200", icon: <Lock size={12}/> },
//   DUE: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: <Clock size={12}/> },
//   PENDING_VERIFICATION: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <ShieldCheck size={12}/> },
//   COMPLETED: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: <CheckCircle2 size={12}/> },
//   PENALIZED: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: <AlertCircle size={12}/> },
// };

// const PaymentSchedule = ({ contractId, payments = [], dispute }) => {
//   const isPaymentFrozen =
//     dispute?.status === "OPEN" || dispute?.status === "UNDER_REVIEW";

//   const uploadProof = async (paymentId, file) => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("images", file);

//     try {
//       await axios.post(
//         `/contracts/${contractId}/payments/${paymentId}/upload-proof`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );
//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Upload failed");
//     }
//   };

//   const verifyPayment = async (paymentId) => {
//     try {
//       await axios.post(`/contracts/${contractId}/payments/${paymentId}/verify`);
//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Verification failed");
//     }
//   };

//   const isOverdue = (payment) => {
//     if (!payment.dueDate) return false;
//     return new Date() > new Date(payment.dueDate);
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
//         <div>
//           <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
//             <CreditCard size={16} className="text-emerald-600" /> Payment Ledger
//           </h2>
//           <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">Milestone-based financial settlement</p>
//         </div>
//       </div>

//       {isPaymentFrozen && (
//         <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-start gap-3 mb-6">
//           <AlertCircle size={18} className="shrink-0 mt-0.5" />
//           <div>
//             <p className="text-[11px] font-black uppercase tracking-widest">Financial Hold Active</p>
//             <p className="text-xs font-bold opacity-80 mt-1">Payments are temporarily frozen due to an open dispute protocol.</p>
//           </div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {payments.map((p) => {
//           const config = statusConfig[p.status] || statusConfig.LOCKED;
//           const overdue = p.status === "DUE" && isOverdue(p);

//           return (
//             <div
//               key={p._id}
//               className={`group relative border rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
//                 overdue ? "bg-rose-50/30 border-rose-200" : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md"
//               }`}
//             >
//               {/* Left Side: Payment Details */}
//               <div className="flex items-center gap-4">
//                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${config.bg} ${config.border} ${config.text}`}>
//                   <Banknote size={20} />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <h4 className="font-black text-slate-900 text-sm tracking-tight">
//                       {p.type} Milestone
//                     </h4>
//                     <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${config.bg} ${config.text} ${config.border}`}>
//                       {config.icon} {p.status.replace("_", " ")}
//                     </span>
//                   </div>
//                   <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
//                     <p className="text-xs font-black text-slate-700">₹{p.amount.toLocaleString()}</p>
//                     {p.dueDate && (
//                       <p className={`text-[10px] font-bold uppercase tracking-tight flex items-center gap-1 ${overdue ? "text-rose-600" : "text-slate-400"}`}>
//                         <Clock size={10} /> {overdue ? "Overdue Since" : "Due Date"}: {new Date(p.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
//                       </p>
//                     )}
//                   </div>
                  
//                   {p.status === "PENALIZED" && (
//                     <div className="mt-2 flex items-center gap-1.5 text-rose-600 bg-rose-100/50 w-fit px-2 py-0.5 rounded border border-rose-200">
//                       <AlertCircle size={10} />
//                       <p className="text-[10px] font-black uppercase tracking-tighter">
//                         Penalty Applied: ₹{p.penalty?.appliedAmount || 0}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right Side: Actions */}
//               <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
//                 {(p.status === "DUE" || p.status === "PENALIZED") && (
//                   <label
//                     className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98] ${
//                       isPaymentFrozen
//                         ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
//                         : p.status === "PENALIZED" 
//                           ? "bg-rose-600 text-white cursor-pointer hover:bg-rose-700 shadow-lg shadow-rose-100" 
//                           : "bg-slate-900 text-white cursor-pointer hover:bg-emerald-600 shadow-lg shadow-slate-200"
//                     }`}
//                   >
//                     <Upload size={14} />
//                     {p.status === "PENALIZED" ? "Clear with Penalty" : "Upload Proof"}
//                     <input
//                       type="file"
//                       hidden
//                       disabled={isPaymentFrozen}
//                       accept="image/*"
//                       onChange={(e) => uploadProof(p._id, e.target.files[0])}
//                     />
//                   </label>
//                 )}

//                 {p.status === "PENDING_VERIFICATION" && (
//                   <button
//                     disabled={isPaymentFrozen}
//                     onClick={() => verifyPayment(p._id)}
//                     className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98] ${
//                       isPaymentFrozen
//                         ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
//                         : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100"
//                     }`}
//                   >
//                     <ShieldCheck size={14} /> Verify Funds
//                   </button>
//                 )}

//                 {p.status === "LOCKED" && (
//                   <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 italic">
//                     <Lock size={10} /> Awaiting Milestone
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default PaymentSchedule;
import React from "react";
import axios from "../../../api/axios";
import { 
  CreditCard, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  Lock,
  Banknote,
  AlertTriangle
} from "lucide-react";

const statusConfig = {
  LOCKED: { bg: "bg-slate-100", text: "text-slate-500", border: "border-slate-200", icon: <Lock size={12}/> },
  DUE: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: <Clock size={12}/> },
  PENDING_VERIFICATION: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <ShieldCheck size={12}/> },
  COMPLETED: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: <CheckCircle2 size={12}/> },
  PENALIZED: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: <AlertCircle size={12}/> },
};

const PaymentSchedule = ({ contractId, payments = [], dispute }) => {
  const isPaymentFrozen =
    dispute?.status === "OPEN" || dispute?.status === "UNDER_REVIEW";

  const uploadProof = async (paymentId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("images", file);

    try {
      await axios.post(
        `/contracts/${contractId}/payments/${paymentId}/upload-proof`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const verifyPayment = async (paymentId) => {
    try {
      await axios.post(`/contracts/${contractId}/payments/${paymentId}/verify`);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  const isOverdue = (payment) => {
    if (!payment.dueDate) return false;
    return new Date() > new Date(payment.dueDate);
  };

  return (
    <div className="bg-white rounded-[1.8rem] border border-slate-200/60 p-8 shadow-xl shadow-slate-200/40">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
            <CreditCard size={16} className="text-emerald-600" /> Payment Ledger
          </h2>
          <p className="text-[11px] font-bold text-slate-500 uppercase mt-1 tracking-wider">Milestone-based financial settlement</p>
        </div>
      </div>

      {/* DISPUTE SYSTEM ALERT */}
      {isPaymentFrozen && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-start gap-3 mb-6">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest">Financial Hold Active</p>
            <p className="text-[13px] font-bold opacity-80 mt-1">Payments are temporarily frozen due to an open dispute protocol. Clear the dispute to resume transactions.</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {payments.map((p) => {
          const config = statusConfig[p.status] || statusConfig.LOCKED;
          const overdue = p.status === "DUE" && isOverdue(p);

          return (
            <div
              key={p._id}
              className={`group relative border rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                overdue ? "bg-rose-50/30 border-rose-200" : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md"
              }`}
            >
              {/* Left Side: Payment Details */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${config.bg} ${config.border} ${config.text}`}>
                  <Banknote size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-black text-slate-900 text-sm tracking-tight">
                      {p.type} Milestone
                    </h4>
                    <span className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-md border uppercase tracking-widest ${config.bg} ${config.text} ${config.border}`}>
                      {config.icon} {p.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                    <p className="text-[15px] font-black text-slate-700">₹{p.amount.toLocaleString()}</p>
                    
                    {/* BACKEND ALERT: DUE WINDOW */}
                    {p.dueDate && p.status === "DUE" && !overdue && (
                      <p className={`text-[11px] font-bold uppercase tracking-tight flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200`}>
                        <Clock size={12} /> Pay By: {new Date(p.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    )}

                    {/* BACKEND ALERT: OVERDUE WARNING */}
                    {overdue && (
                      <p className={`text-[11px] font-bold uppercase tracking-tight flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200`}>
                        <AlertTriangle size={12} /> Overdue Since: {new Date(p.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                  
                  {/* BACKEND ALERT: LATE PENALTY APPLIED */}
                  {p.status === "PENALIZED" && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-rose-700 bg-rose-100/60 w-fit px-3 py-1 rounded-lg border border-rose-300">
                      <AlertCircle size={14} />
                      <p className="text-[11px] font-black uppercase tracking-widest">
                        Late Penalty Applied: +₹{p.penalty?.appliedAmount || 0}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
                
                {/* ACTION: UPLOAD PROOF (For Buyer/Payer) */}
                {(p.status === "DUE" || p.status === "PENALIZED") && (
                  <label
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98] ${
                      isPaymentFrozen
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        : p.status === "PENALIZED" 
                          ? "bg-rose-600 text-white cursor-pointer hover:bg-rose-700 shadow-lg shadow-rose-100" 
                          : "bg-slate-900 text-white cursor-pointer hover:bg-emerald-600 shadow-lg shadow-slate-200"
                    }`}
                  >
                    <Upload size={16} />
                    {p.status === "PENALIZED" ? "Clear with Penalty" : "Upload Proof"}
                    <input
                      type="file"
                      hidden
                      disabled={isPaymentFrozen}
                      accept="image/*"
                      onChange={(e) => uploadProof(p._id, e.target.files[0])}
                    />
                  </label>
                )}

                {/* ACTION: VERIFY PAYMENT (For Receiver) */}
                {p.status === "PENDING_VERIFICATION" && (
                  <button
                    disabled={isPaymentFrozen}
                    onClick={() => verifyPayment(p._id)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98] ${
                      isPaymentFrozen
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100"
                    }`}
                  >
                    <ShieldCheck size={16} /> Verify Funds
                  </button>
                )}

                {/* STATUS: LOCKED */}
                {p.status === "LOCKED" && (
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Lock size={14} /> Awaiting Milestone
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentSchedule;