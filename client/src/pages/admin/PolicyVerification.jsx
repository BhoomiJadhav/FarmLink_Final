// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import { Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

// /* =========================
//    DOCUMENT MODAL
// ========================= */
// function DocumentModal({ doc, onClose }) {
//   if (!doc) return null;

//   const fixedPath = doc.replace(/\\/g, "/");

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl p-4 w-[85%] h-[85%] relative shadow-2xl">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-red-500 font-bold text-lg"
//         >
//           ✕
//         </button>

//         <img
//           src={`http://localhost:5000/${fixedPath}`}
//           alt="Policy Document"
//           className="w-full h-full object-contain rounded-xl"
//         />
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN PAGE
// ========================= */
// export default function PolicyVerification() {
//   const [data, setData] = useState([]);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const res = await api.get("/admin/policies");
//       setData(res.data.policies || []);
//     } catch (err) {
//       console.error("Policy fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const verify = async (id, status) => {
//     let remarks = "Approved";

//     if (status === "REJECTED") {
//       remarks = prompt("Enter rejection reason");
//       if (!remarks) return;
//     }

//     try {
//       await api.patch(`/admin/verify-policy/${id}`, {
//         status,
//         remarks,
//       });

//       fetchData(); // 🔥 refresh UI
//     } catch (err) {
//       console.error("Verification error:", err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f4f7f9]">
//       <AdminSidebar />

//       <main className="flex-1 flex flex-col">
//         <div className="p-8 overflow-y-auto">
//           <h1 className="text-2xl font-black text-[#064e3b] mb-6">
//             Policy Verification
//           </h1>

//           {loading ? (
//             <div className="flex justify-center py-20">
//               <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {data.map((farmer, i) => (
//                 <div
//                   key={i}
//                   className="bg-white p-6 rounded-3xl shadow border border-slate-100"
//                 >
//                   <h2 className="text-lg font-bold text-slate-800">
//                     {farmer.user?.name || "Unknown"}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     {farmer.user?.email || "N/A"}
//                   </p>

//                   <div className="mt-4 grid md:grid-cols-2 gap-4">
//                     {farmer.policies.map((p, idx) => {
//                       const insurance = p.insurance || {};

//                       const docPath =
//                         insurance.document || insurance.documentUrl;

//                       const isExpired =
//                         insurance.policyValidTill &&
//                         new Date(insurance.policyValidTill) < new Date();

//                       // 🔥 FIXED STATUS LOGIC
//                       const finalStatus =
//                         insurance?.policyVerification?.status ||
//                         insurance?.autoCheck?.status ||
//                         "PENDING";

//                       const isDone =
//                         finalStatus === "VERIFIED" ||
//                         finalStatus === "REJECTED";

//                       return (
//                         <div
//                           key={p.contractId}
//                           className="border p-4 rounded-xl bg-slate-50 hover:shadow-md transition"
//                         >
//                           <p>
//                             <b>Provider:</b> {insurance.providerName || "N/A"}
//                           </p>

//                           <p>
//                             <b>Policy No:</b> {insurance.policyNumber || "N/A"}
//                           </p>

//                           <p>
//                             <b>Valid Till:</b>{" "}
//                             {insurance.policyValidTill
//                               ? new Date(
//                                   insurance.policyValidTill,
//                                 ).toLocaleDateString()
//                               : "N/A"}
//                           </p>

//                           {isExpired && (
//                             <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
//                               <AlertTriangle size={12} />
//                               Expired Policy
//                             </div>
//                           )}

//                           {/* STATUS */}
//                           <div className="mt-2 text-xs font-semibold">
//                             Status:{" "}
//                             <span
//                               className={`px-2 py-1 rounded ${
//                                 finalStatus === "VERIFIED"
//                                   ? "bg-green-100 text-green-700"
//                                   : finalStatus === "REJECTED"
//                                     ? "bg-red-100 text-red-700"
//                                     : finalStatus === "AUTO_VERIFIED"
//                                       ? "bg-blue-100 text-blue-700"
//                                       : "bg-yellow-100 text-yellow-700"
//                               }`}
//                             >
//                               {finalStatus}
//                             </span>
//                           </div>

//                           {/* ACTIONS */}
//                           <div className="flex gap-2 mt-4">
//                             {docPath ? (
//                               <button
//                                 onClick={() => setSelectedDoc(docPath)}
//                                 className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded flex items-center justify-center gap-1 text-sm"
//                               >
//                                 <Eye size={14} /> View
//                               </button>
//                             ) : (
//                               <span className="flex-1 text-xs text-gray-400 italic flex items-center justify-center">
//                                 No Document
//                               </span>
//                             )}

//                             <button
//                               disabled={isDone}
//                               onClick={() => verify(p.contractId, "VERIFIED")}
//                               className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-1 ${
//                                 isDone
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-green-600 hover:bg-green-700 text-white"
//                               }`}
//                             >
//                               <CheckCircle size={14} /> Approve
//                             </button>

//                             <button
//                               disabled={isDone}
//                               onClick={() => verify(p.contractId, "REJECTED")}
//                               className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-1 ${
//                                 isDone
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-red-500 hover:bg-red-600 text-white"
//                               }`}
//                             >
//                               <XCircle size={14} /> Reject
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import { Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

// /* =========================
//    DOCUMENT MODAL
// ========================= */
// function DocumentModal({ doc, onClose }) {
//   if (!doc) return null;

//   const fixedPath = doc.replace(/\\/g, "/");

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl p-4 w-[85%] h-[85%] relative shadow-2xl">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-red-500 font-bold text-lg"
//         >
//           ✕
//         </button>

//         <img
//           src={`http://localhost:5000/${fixedPath}`}
//           alt="Policy Document"
//           className="w-full h-full object-contain rounded-xl"
//         />
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN PAGE
// ========================= */
// export default function PolicyVerification() {
//   const [data, setData] = useState([]);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(null);

//   const fetchData = async () => {
//     try {
//       const res = await api.get("/admin/policies");
//       setData([...res.data.policies]); // 🔥 force new reference
//     } catch (err) {
//       console.error("Policy fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const verify = async (id, status) => {
//     let remarks = "Approved";

//     if (status === "REJECTED") {
//       remarks = prompt("Enter rejection reason");
//       if (!remarks) return;
//     }

//     try {
//       setActionLoading(id);

//       await api.patch(`/admin/verify-policy/${id}`, {
//         status,
//         remarks,
//       });

//       await fetchData(); // 🔥 ensure updated data
//     } catch (err) {
//       console.error("Verification error:", err);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f4f7f9]">
//       <AdminSidebar />

//       <main className="flex-1 flex flex-col">
//         <div className="p-8 overflow-y-auto">
//           <h1 className="text-2xl font-black text-[#064e3b] mb-6">
//             Policy Verification
//           </h1>

//           {loading ? (
//             <div className="flex justify-center py-20">
//               <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {data.map((farmer) => (
//                 <div
//                   key={farmer.user?.id}
//                   className="bg-white p-6 rounded-3xl shadow border border-slate-100"
//                 >
//                   <h2 className="text-lg font-bold text-slate-800">
//                     {farmer.user?.name || "Unknown"}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     {farmer.user?.email || "N/A"}
//                   </p>

//                   <div className="mt-4 grid md:grid-cols-2 gap-4">
//                     {(farmer.policies || []).map((p) => {
//                       const insurance = p.insurance || {};

//                       const docPath =
//                         insurance.document || insurance.documentUrl || null;

//                       const isExpired =
//                         insurance.policyValidTill &&
//                         new Date(insurance.policyValidTill) < new Date();

//                       const finalStatus =
//                         p.policyVerification?.status || "PENDING";

//                       // 🔥 NEW STATUS FLAGS
//                       const isVerified = finalStatus === "VERIFIED";
//                       const isRejected = finalStatus === "REJECTED";
//                       const isResubmitted = finalStatus === "RESUBMITTED";

//                       return (
//                         <div
//                           key={p.contractId}
//                           className={`border p-4 rounded-xl transition relative ${
//                             isResubmitted
//                               ? "bg-purple-50 border-purple-300 shadow-md"
//                               : "bg-slate-50 hover:shadow-md"
//                           }`}
//                         >
//                           {/* 🔥 RESUBMITTED BADGE */}
//                           {isResubmitted && (
//                             <div className="absolute top-2 right-2 text-[10px] bg-purple-600 text-white px-2 py-1 rounded-full">
//                               Re-submitted
//                             </div>
//                           )}

//                           <p>
//                             <b>Provider:</b> {insurance.providerName || "N/A"}
//                           </p>
//                           <p>
//                             <b>Policy No:</b> {insurance.policyNumber || "N/A"}
//                           </p>
//                           <p>
//                             <b>Valid Till:</b>{" "}
//                             {insurance.policyValidTill
//                               ? new Date(
//                                   insurance.policyValidTill,
//                                 ).toLocaleDateString()
//                               : "N/A"}
//                           </p>

//                           {isExpired && (
//                             <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
//                               <AlertTriangle size={12} />
//                               Expired Policy
//                             </div>
//                           )}

//                           {/* STATUS */}
//                           <div className="mt-2 text-xs font-semibold">
//                             Status:{" "}
//                             <span
//                               className={`px-3 py-1 rounded-full font-bold ${
//                                 isVerified
//                                   ? "bg-green-100 text-green-700"
//                                   : isRejected
//                                     ? "bg-red-100 text-red-700"
//                                     : isResubmitted
//                                       ? "bg-purple-100 text-purple-700"
//                                       : "bg-yellow-100 text-yellow-700"
//                               }`}
//                             >
//                               {finalStatus}
//                             </span>
//                           </div>

//                           {/* 🔥 EXTRA: SHOW REJECTION REASON */}
//                           {isRejected && p.policyVerification?.remarks && (
//                             <p className="text-xs text-red-500 mt-1">
//                               Reason: {p.policyVerification.remarks}
//                             </p>
//                           )}

//                           {/* ACTIONS */}
//                           <div className="flex gap-2 mt-4">
//                             {/* VIEW */}
//                             {docPath ? (
//                               <button
//                                 onClick={() => setSelectedDoc(docPath)}
//                                 className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded flex items-center justify-center gap-1 text-sm"
//                               >
//                                 <Eye size={14} /> View
//                               </button>
//                             ) : (
//                               <span className="flex-1 text-xs text-gray-400 italic flex items-center justify-center">
//                                 No Document
//                               </span>
//                             )}

//                             {/* ✅ APPROVE BUTTON */}
//                             <button
//                               disabled={
//                                 isVerified ||
//                                 isRejected ||
//                                 actionLoading === p.contractId
//                               }
//                               onClick={() => verify(p.contractId, "VERIFIED")}
//                               className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-1 ${
//                                 isVerified || isRejected
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-green-600 hover:bg-green-700 text-white"
//                               }`}
//                             >
//                               <CheckCircle size={14} /> Approve
//                             </button>

//                             {/* ❌ REJECT BUTTON */}
//                             <button
//                               disabled={
//                                 isRejected || actionLoading === p.contractId
//                               }
//                               onClick={() => verify(p.contractId, "REJECTED")}
//                               className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-1 ${
//                                 isRejected
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-red-500 hover:bg-red-600 text-white"
//                               }`}
//                             >
//                               <XCircle size={14} /> Reject
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import { 
//   Eye, 
//   CheckCircle, 
//   XCircle, 
//   AlertTriangle, 
//   ShieldCheck, 
//   Mail, 
//   FileText, 
//   Clock,
//   User 
// } from "lucide-react";

// /* =========================
//    DOCUMENT MODAL
// ========================= */
// function DocumentModal({ doc, onClose }) {
//   if (!doc) return null;
//   const fixedPath = doc.replace(/\\/g, "/");

//   return (
//     <div className="fixed inset-0 bg-[#0f172a]/90 flex items-center justify-center z-50 backdrop-blur-md p-4">
//       <div className="bg-white rounded-[2.5rem] p-6 w-full max-w-5xl h-[90vh] relative shadow-2xl overflow-hidden flex flex-col">
//         <div className="flex justify-between items-center mb-4 px-2">
//           <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
//             <FileText size={16} className="text-indigo-600" /> Policy Document Preview
//           </h3>
//           <button
//             onClick={onClose}
//             className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-bold"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="flex-1 bg-slate-100 rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-inner">
//           <img
//             src={`http://localhost:5000/${fixedPath}`}
//             alt="Policy Document"
//             className="w-full h-full object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN PAGE
// ========================= */
// export default function PolicyVerification() {
//   const [data, setData] = useState([]);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(null);

//   const fetchData = async () => {
//     try {
//       const res = await api.get("/admin/policies");
//       setData([...res.data.policies]); 
//     } catch (err) {
//       console.error("Policy fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const verify = async (id, status) => {
//     let remarks = "Approved";
//     if (status === "REJECTED") {
//       remarks = prompt("Enter rejection reason");
//       if (!remarks) return;
//     }
//     try {
//       setActionLoading(id);
//       await api.patch(`/admin/verify-policy/${id}`, { status, remarks });
//       await fetchData(); 
//     } catch (err) {
//       console.error("Verification error:", err);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
//               <ShieldCheck className="text-indigo-600" size={32} /> Policy Verification
//             </h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Insurance Compliance Review Center</p>
//           </div>
//           <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
//             <Clock size={16} className="text-amber-500" />
//             <span className="text-[10px] font-black text-slate-700 uppercase">
//               {data.length} Farmer Portfolios
//             </span>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
//              <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
//              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scanning Insurance Vault...</p>
//           </div>
//         ) : (
//           <div className="space-y-8 pb-20">
//             {data.map((farmer) => (
//               <div key={farmer.user?.id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
//                 <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div className="flex items-center gap-4">
//                     <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-lg text-lg">
//                       {farmer.user?.name?.charAt(0) || "U"}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-black text-slate-800 leading-tight">
//                         {farmer.user?.name || "Unknown Farmer"}
//                       </h2>
//                       <div className="flex items-center gap-4 mt-1">
//                         <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
//                           <Mail size={10} className="text-indigo-400" /> {farmer.user?.email || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-8">
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {(farmer.policies || []).map((p) => {
//                       const insurance = p.insurance || {};
//                       const docPath = insurance.document || insurance.documentUrl || null;
//                       const isExpired = insurance.policyValidTill && new Date(insurance.policyValidTill) < new Date();
                      
//                       const finalStatus = p.policyVerification?.status || "PENDING";
//                       const isVerified = finalStatus === "VERIFIED";
//                       const isRejected = finalStatus === "REJECTED";
//                       const isResubmitted = finalStatus === "RESUBMITTED";

//                       return (
//                         <div
//                           key={p.contractId}
//                           className={`group rounded-3xl p-6 border transition-all duration-300 relative ${
//                             isResubmitted 
//                               ? "bg-indigo-50/30 border-indigo-200 shadow-md ring-1 ring-indigo-100" 
//                               : "bg-slate-50 border-slate-100 hover:shadow-xl hover:bg-white hover:border-indigo-300"
//                           }`}
//                         >
//                           <div className="absolute top-4 right-4">
//                             <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest ${
//                               isVerified ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
//                               isRejected ? "bg-rose-100 text-rose-700 border-rose-200" :
//                               isResubmitted ? "bg-indigo-600 text-white border-indigo-600 shadow-lg" :
//                               "bg-amber-100 text-amber-700 border-amber-200"
//                             }`}>
//                               {isResubmitted ? "Resubmitted" : finalStatus}
//                             </span>
//                           </div>

//                           <div className="space-y-4 mb-6">
//                             <div className="flex items-center gap-2 text-indigo-600 uppercase font-black text-[10px] tracking-widest">
//                                <FileText size={14} /> Policy Details
//                             </div>
//                             <div className="grid grid-cols-1 gap-3">
//                                <p className="text-sm font-bold text-slate-700">
//                                  <span className="text-slate-400 font-medium text-[10px] block uppercase mb-0.5">Provider</span>
//                                  {insurance.providerName || "N/A"}
//                                </p>
//                                <div className="grid grid-cols-2 gap-4">
//                                  <p className="text-sm font-bold text-slate-700">
//                                    <span className="text-slate-400 font-medium text-[10px] block uppercase mb-0.5">Number</span>
//                                    {insurance.policyNumber || "N/A"}
//                                  </p>
//                                  <p className="text-sm font-bold text-slate-700">
//                                    <span className="text-slate-400 font-medium text-[10px] block uppercase mb-0.5">Valid Till</span>
//                                    <span className={isExpired ? "text-rose-600 flex items-center gap-1" : ""}>
//                                      {insurance.policyValidTill ? new Date(insurance.policyValidTill).toLocaleDateString() : "N/A"}
//                                      {isExpired && <AlertTriangle size={12} />}
//                                    </span>
//                                  </p>
//                                </div>
//                             </div>
//                           </div>

//                           {/* 🔥 FEATURE 2: AUDIT TRAIL LOGS */}
//                           {p.verificationHistory && p.verificationHistory.length > 0 && (
//                             <div className="mb-6 p-4 bg-white/50 rounded-2xl border border-slate-100">
//                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
//                                 <Clock size={12} className="text-indigo-400" /> Audit History
//                               </p>
//                               <div className="space-y-2 max-h-24 overflow-y-auto no-scrollbar">
//                                 {p.verificationHistory.map((log, idx) => (
//                                   <div key={idx} className="flex justify-between items-center text-[10px] border-b border-slate-50 pb-1 last:border-0">
//                                     <div className="flex items-center gap-2">
//                                       <span className={`font-black ${log.action === 'VERIFIED' ? 'text-emerald-600' : 'text-rose-600'}`}>
//                                         {log.action}
//                                       </span>
//                                       <span className="text-slate-400 italic truncate w-24">"{log.remarks}"</span>
//                                     </div>
//                                     <span className="text-slate-400 font-bold">{new Date(log.at).toLocaleDateString()}</span>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
//                             {docPath ? (
//                               <button onClick={() => setSelectedDoc(docPath)} className="bg-slate-900 text-white h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
//                                 <Eye size={14} /> View
//                               </button>
//                             ) : (
//                               <div className="flex-1 bg-slate-100 rounded-xl h-10 flex items-center justify-center text-[9px] font-black text-slate-400 uppercase italic">Missing</div>
//                             )}

//                             <div className="flex gap-2 flex-1 justify-end">
//                               <button disabled={isVerified || isRejected || actionLoading === p.contractId} onClick={() => verify(p.contractId, "VERIFIED")} className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all active:scale-90 ${isVerified || isRejected ? "bg-slate-200 text-slate-400" : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200"}`}>
//                                 <CheckCircle size={18} />
//                               </button>
//                               <button disabled={isRejected || actionLoading === p.contractId} onClick={() => verify(p.contractId, "REJECTED")} className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all active:scale-90 ${isRejected ? "bg-slate-200 text-slate-400" : "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200"}`}>
//                                 <XCircle size={18} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Mail, 
  FileText, 
  Clock,
  CalendarX,
  ShieldAlert
} from "lucide-react";

/* =========================
   DOCUMENT MODAL
========================= */
function DocumentModal({ doc, onClose }) {
  if (!doc) return null;
  const fixedPath = doc.replace(/\\/g, "/");
  const isPdf = fixedPath.toLowerCase().endsWith(".pdf");

  return (
    <div className="fixed inset-0 bg-[#0f172a]/90 flex items-center justify-center z-50 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] p-6 w-full max-w-5xl h-[90vh] relative shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
            {/* Swapped FileShield to FileText here */}
            <FileText size={18} className="text-indigo-600" /> Secure Policy Document Preview
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-all font-black shadow-sm"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 bg-slate-100/50 rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-inner p-2 flex items-center justify-center">
          {isPdf ? (
            <iframe 
              src={`http://localhost:5000/${fixedPath}`} 
              className="w-full h-full rounded-xl"
              title="Policy PDF"
            />
          ) : (
            <img
              src={`http://localhost:5000/${fixedPath}`}
              alt="Policy Document"
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Document+Not+Found'; }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function PolicyVerification() {
  const [data, setData] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/policies");
      setData([...res.data.policies]); 
    } catch (err) {
      console.error("Policy fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const verify = async (id, status) => {
    let remarks = "Approved by Admin via Dashboard";
    if (status === "REJECTED") {
      remarks = prompt("Enter specific reason for rejection (this will be sent to the farmer):");
      if (!remarks) return; // Cancel if no reason provided
    }
    try {
      setActionLoading(id);
      await api.patch(`/admin/verify-policy/${id}`, { status, remarks });
      await fetchData(); 
    } catch (err) {
      console.error("Verification error:", err);
      alert("Failed to update policy status.");
    } finally {
      setActionLoading(null);
    }
  };

  const getDaysRemaining = (dateString) => {
    if (!dateString) return null;
    const expiry = new Date(dateString);
    const now = new Date();
    return Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-indigo-600" size={32} /> Policy Verification
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Insurance Compliance & Audit Center</p>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg"><Clock size={16} /></div>
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">
              {data.length} Portfolios Under Management
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
             <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Scanning Compliance Vault...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm border-dashed">
             <ShieldCheck size={48} className="text-emerald-300 mb-4" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No pending policies to review.</p>
          </div>
        ) : (
          <div className="space-y-8 pb-24">
            {data.map((farmer) => {
              // Calculate Portfolio Summary
              const total = farmer.policies?.length || 0;
              const pending = farmer.policies?.filter(p => p.policyVerification?.status === "PENDING" || p.policyVerification?.status === "RESUBMITTED").length || 0;

              return (
                <div key={farmer.user?.id} className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden group hover:border-indigo-300 transition-colors duration-500">
                  
                  {/* FARMER HEADER */}
                  <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-[1.2rem] bg-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-indigo-200 text-2xl">
                        {farmer.user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800 leading-tight">
                          {farmer.user?.name || "Unknown Farmer"}
                        </h2>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
                            <Mail size={12} className="text-indigo-500" /> {farmer.user?.email || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Portfolio Quick Stats */}
                    <div className="flex items-center gap-3">
                      {pending > 0 && (
                        <span className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                          <AlertTriangle size={12}/> {pending} Action Required
                        </span>
                      )}
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        Total Policies: {total}
                      </span>
                    </div>
                  </div>

                  {/* POLICY GRID */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {(farmer.policies || []).map((p) => {
                        const insurance = p.insurance || {};
                        const docPath = insurance.document || insurance.documentUrl || null;
                        
                        // Expiry Logic
                        const daysRemaining = getDaysRemaining(insurance.policyValidTill);
                        const isExpired = daysRemaining !== null && daysRemaining < 0;
                        const isExpiringSoon = daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 30;
                        
                        // Status Logic
                        const finalStatus = p.policyVerification?.status || "PENDING";
                        const isVerified = finalStatus === "VERIFIED";
                        const isRejected = finalStatus === "REJECTED";
                        const isResubmitted = finalStatus === "RESUBMITTED";

                        return (
                          <div
                            key={p.contractId}
                            className={`rounded-3xl p-6 border transition-all duration-300 relative ${
                              isExpired 
                                ? "bg-rose-50/30 border-rose-200" 
                                : isResubmitted 
                                ? "bg-indigo-50/30 border-indigo-200 shadow-sm" 
                                : "bg-slate-50 border-slate-100 hover:shadow-lg hover:bg-white hover:border-indigo-300"
                            }`}
                          >
                            {/* TOP BADGE */}
                            <div className="absolute top-5 right-5">
                              <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl border uppercase tracking-widest flex items-center gap-1 shadow-sm ${
                                isVerified && !isExpired ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                                isRejected ? "bg-rose-100 text-rose-700 border-rose-200" :
                                isResubmitted ? "bg-indigo-600 text-white border-indigo-600" :
                                isExpired ? "bg-rose-600 text-white border-rose-600" :
                                "bg-amber-100 text-amber-700 border-amber-200"
                              }`}>
                                {isExpired ? <ShieldAlert size={10} /> : null}
                                {isExpired ? "EXPIRED" : isResubmitted ? "RESUBMITTED" : finalStatus}
                              </span>
                            </div>

                            <div className="space-y-5 mb-6 pr-24">
                              <div className="flex items-center gap-2 text-indigo-600 uppercase font-black text-[10px] tracking-widest">
                                 {/* Swapped FileShield to FileText here */}
                                 <FileText size={16} /> Policy Documentation
                              </div>
                              
                              <div className="grid grid-cols-1 gap-4">
                                 <p className="text-sm font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                   <span className="text-slate-400 font-black text-[9px] block uppercase tracking-widest mb-1">Insurance Provider</span>
                                   {insurance.providerName || "N/A"}
                                 </p>
                                 <div className="grid grid-cols-2 gap-4">
                                   <p className="text-sm font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                     <span className="text-slate-400 font-black text-[9px] block uppercase tracking-widest mb-1">Policy Number</span>
                                     {insurance.policyNumber || "N/A"}
                                   </p>
                                   <p className="text-sm font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                     <span className="text-slate-400 font-black text-[9px] block uppercase tracking-widest mb-1">Valid Till</span>
                                     <span className={`flex items-center gap-1.5 ${isExpired ? "text-rose-600" : isExpiringSoon ? "text-amber-600" : "text-emerald-600"}`}>
                                       {insurance.policyValidTill ? new Date(insurance.policyValidTill).toLocaleDateString() : "N/A"}
                                       {isExpired ? <CalendarX size={14} /> : isExpiringSoon ? <Clock size={14} /> : <CheckCircle size={14} />}
                                     </span>
                                     {daysRemaining !== null && (
                                       <span className={`text-[9px] font-black uppercase tracking-widest mt-1 block ${isExpired ? "text-rose-500" : "text-slate-400"}`}>
                                         {isExpired ? `${Math.abs(daysRemaining)} days ago` : `${daysRemaining} days left`}
                                       </span>
                                     )}
                                   </p>
                                 </div>
                              </div>
                            </div>

                            {/* AUDIT STAMP */}
                            {p.policyVerification?.verifiedAt && (
                              <div className="mb-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${isVerified ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"}`}>
                                  <ShieldCheck size={16} />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-none mb-1">Last Audit Record</p>
                                  <p className="text-xs font-bold text-slate-500 mb-1">"{p.policyVerification.remarks || "No remarks provided"}"</p>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    {new Date(p.policyVerification.verifiedAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* ACTIONS FOOTER */}
                            <div className="flex items-center gap-3 pt-5 border-t border-slate-200/60 mt-auto">
                              {docPath ? (
                                <button onClick={() => setSelectedDoc(docPath)} className="bg-slate-900 text-white h-12 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                                  <Eye size={16} strokeWidth={2.5} /> View File
                                </button>
                              ) : (
                                <div className="flex-1 bg-slate-100 rounded-2xl h-12 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest italic border border-slate-200">
                                  Document Missing
                                </div>
                              )}

                              <div className="flex gap-2 flex-1 justify-end">
                                <button 
                                  disabled={isVerified || actionLoading === p.contractId} 
                                  onClick={() => verify(p.contractId, "VERIFIED")} 
                                  className={`h-12 px-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95 ${
                                    isVerified 
                                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                      : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200"
                                  }`}
                                >
                                  {actionLoading === p.contractId ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={16} />}
                                  <span className="hidden sm:inline">Approve</span>
                                </button>
                                
                                <button 
                                  disabled={isRejected || actionLoading === p.contractId} 
                                  onClick={() => verify(p.contractId, "REJECTED")} 
                                  className={`h-12 px-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95 ${
                                    isRejected 
                                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                      : "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200"
                                  }`}
                                >
                                  {actionLoading === p.contractId ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <XCircle size={16} />}
                                  <span className="hidden sm:inline">Reject</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}