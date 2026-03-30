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
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";
import { Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

/* =========================
   DOCUMENT MODAL
========================= */
function DocumentModal({ doc, onClose }) {
  if (!doc) return null;

  const fixedPath = doc.replace(/\\/g, "/");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-4 w-[85%] h-[85%] relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 font-bold text-lg"
        >
          ✕
        </button>

        <img
          src={`http://localhost:5000/${fixedPath}`}
          alt="Policy Document"
          className="w-full h-full object-contain rounded-xl"
        />
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
      setData([...res.data.policies]); // 🔥 force new reference
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
    let remarks = "Approved";

    if (status === "REJECTED") {
      remarks = prompt("Enter rejection reason");
      if (!remarks) return;
    }

    try {
      setActionLoading(id);

      await api.patch(`/admin/verify-policy/${id}`, {
        status,
        remarks,
      });

      await fetchData(); // 🔥 ensure updated data
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f7f9]">
      <AdminSidebar />

      <main className="flex-1 flex flex-col">
        <div className="p-8 overflow-y-auto">
          <h1 className="text-2xl font-black text-[#064e3b] mb-6">
            Policy Verification
          </h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {data.map((farmer) => (
                <div
                  key={farmer.user?.id}
                  className="bg-white p-6 rounded-3xl shadow border border-slate-100"
                >
                  <h2 className="text-lg font-bold text-slate-800">
                    {farmer.user?.name || "Unknown"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {farmer.user?.email || "N/A"}
                  </p>

                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    {(farmer.policies || []).map((p) => {
                      const insurance = p.insurance || {};

                      const docPath =
                        insurance.document || insurance.documentUrl || null;

                      const isExpired =
                        insurance.policyValidTill &&
                        new Date(insurance.policyValidTill) < new Date();

                      const finalStatus =
                        p.policyVerification?.status || "PENDING";

                      // 🔥 NEW STATUS FLAGS
                      const isVerified = finalStatus === "VERIFIED";
                      const isRejected = finalStatus === "REJECTED";
                      const isResubmitted = finalStatus === "RESUBMITTED";

                      return (
                        <div
                          key={p.contractId}
                          className={`border p-4 rounded-xl transition relative ${
                            isResubmitted
                              ? "bg-purple-50 border-purple-300 shadow-md"
                              : "bg-slate-50 hover:shadow-md"
                          }`}
                        >
                          {/* 🔥 RESUBMITTED BADGE */}
                          {isResubmitted && (
                            <div className="absolute top-2 right-2 text-[10px] bg-purple-600 text-white px-2 py-1 rounded-full">
                              Re-submitted
                            </div>
                          )}

                          <p>
                            <b>Provider:</b> {insurance.providerName || "N/A"}
                          </p>
                          <p>
                            <b>Policy No:</b> {insurance.policyNumber || "N/A"}
                          </p>
                          <p>
                            <b>Valid Till:</b>{" "}
                            {insurance.policyValidTill
                              ? new Date(
                                  insurance.policyValidTill,
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>

                          {isExpired && (
                            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                              <AlertTriangle size={12} />
                              Expired Policy
                            </div>
                          )}

                          {/* STATUS */}
                          <div className="mt-2 text-xs font-semibold">
                            Status:{" "}
                            <span
                              className={`px-3 py-1 rounded-full font-bold ${
                                isVerified
                                  ? "bg-green-100 text-green-700"
                                  : isRejected
                                    ? "bg-red-100 text-red-700"
                                    : isResubmitted
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {finalStatus}
                            </span>
                          </div>

                          {/* 🔥 EXTRA: SHOW REJECTION REASON */}
                          {isRejected && p.policyVerification?.remarks && (
                            <p className="text-xs text-red-500 mt-1">
                              Reason: {p.policyVerification.remarks}
                            </p>
                          )}

                          {/* ACTIONS */}
                          <div className="flex gap-2 mt-4">
                            {/* VIEW */}
                            {docPath ? (
                              <button
                                onClick={() => setSelectedDoc(docPath)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded flex items-center justify-center gap-1 text-sm"
                              >
                                <Eye size={14} /> View
                              </button>
                            ) : (
                              <span className="flex-1 text-xs text-gray-400 italic flex items-center justify-center">
                                No Document
                              </span>
                            )}

                            {/* ✅ APPROVE BUTTON */}
                            <button
                              disabled={
                                isVerified ||
                                isRejected ||
                                actionLoading === p.contractId
                              }
                              onClick={() => verify(p.contractId, "VERIFIED")}
                              className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-1 ${
                                isVerified || isRejected
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-green-600 hover:bg-green-700 text-white"
                              }`}
                            >
                              <CheckCircle size={14} /> Approve
                            </button>

                            {/* ❌ REJECT BUTTON */}
                            <button
                              disabled={
                                isRejected || actionLoading === p.contractId
                              }
                              onClick={() => verify(p.contractId, "REJECTED")}
                              className={`flex-1 py-2 rounded text-sm flex items-center justify-center gap-1 ${
                                isRejected
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-red-500 hover:bg-red-600 text-white"
                              }`}
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}
