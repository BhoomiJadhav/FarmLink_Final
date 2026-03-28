// // src/pages/ContractsPage.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/profileModal.jsx";
// import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";

// import api from "../../api/axios";
// import { format } from "date-fns";

// /* =========================
//    CONTRACT CARD
//    ========================= */
// function ContractCard({ contract, onAccept, onReject, onNegotiate }) {
//   const postedText = contract.createdAt
//     ? format(new Date(contract.createdAt), "MMM d, yyyy")
//     : "Unknown";

//   return (
//     <div className="bg-white rounded-2xl shadow-soft border border-[#E1E6D8] p-6">
//       <div className="flex justify-between gap-4">
//         <div>
//           <div className="text-lg font-semibold text-[#1F2933]">
//             {contract.buyer?.name || "Unknown Buyer"}
//           </div>

//           <div className="text-xs text-[#7A8A6D] mt-1">
//             {contract.buyer?.address || ""}
//           </div>

//           <div className="mt-3 flex gap-3 text-sm">
//             <span className="rounded-full bg-[#ECFDF5] text-[#065F46] px-3 py-1">
//               {contract.cropDetails?.cropName || "Crop"}
//             </span>
//             <span>Area: {contract.cropDetails?.contractedArea || "—"}</span>
//             <span>Season: {contract.cropDetails?.season || "—"}</span>
//           </div>
//         </div>

//         <div className="text-right min-w-[160px]">
//           <div className="text-sm text-[#7A8A6D]">Price / Unit</div>
//           <div className="text-lg font-semibold">
//             {contract.payment?.agreedPricePerUnit
//               ? `₹${contract.payment.agreedPricePerUnit}`
//               : "—"}
//           </div>
//           <div className="mt-2 text-xs text-[#6B7280]">
//             Delivery: {contract.delivery?.deliveryLocation || "—"}
//           </div>
//         </div>
//       </div>

//       <div className="mt-3 text-xs text-[#6B7280]">Posted on {postedText}</div>

//       {contract.status === "SENT" && (
//         <div className="mt-4 flex gap-3">
//           <button
//             onClick={() => onAccept(contract)}
//             className="flex-1 rounded-lg bg-emerald-600 text-white py-2 text-sm font-semibold"
//           >
//             Accept
//           </button>

//           <button
//             onClick={() => onReject(contract)}
//             className="flex-1 rounded-lg border border-red-300 text-red-600 py-2 text-sm font-semibold"
//           >
//             Reject
//           </button>

//           <button
//             onClick={() => onNegotiate(contract)}
//             className="flex-1 rounded-lg bg-amber-500 text-white py-2 text-sm font-semibold"
//           >
//             Negotiate
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// /* =========================
//    CONTRACTS PAGE
//    ========================= */
// export default function ContractsPage() {
//   const [profileData, setProfileData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");
//   const [selectedContract, setSelectedContract] = useState(null);

//   const [stats, setStats] = useState({
//     totalActive: 0,
//     pendingReview: 0,
//     inNegotiation: 0,
//   });

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);

//   /* =========================
//      LOAD PROFILE + CONTRACTS
//      ========================= */
//   useEffect(() => {
//     let mounted = true;

//     async function loadData() {
//       try {
//         const profileRes = await api.get("/profile/me");
//         if (mounted) setProfileData(profileRes.data);

//         const contractRes = await api.get("/farmer/contracts");

//         if (mounted && contractRes.data?.contracts) {
//           setContracts(contractRes.data.contracts);
//           computeStats(contractRes.data.contracts);
//         }
//       } catch (err) {
//         console.error(
//           "Failed to load contracts:",
//           err?.response?.data || err.message
//         );
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     loadData();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =========================
//      STATS
//      ========================= */
//   function computeStats(list) {
//     setStats({
//       totalActive: list.length,
//       pendingReview: list.filter((c) => c.status === "SENT").length,
//       inNegotiation: list.filter((c) => c.status === "NEGOTIATING").length,
//     });
//   }

//   /* =========================
//      CONTRACT STATUS ACTIONS
//      ========================= */

//   function handleAccept(contract) {
//     setSelectedContract(contract);
//   }

//   function handleReject(contract) {
//     if (!window.confirm("Reject this contract?")) return;

//     setContracts((prev) =>
//       prev.map((c) =>
//         c._id === contract._id ? { ...c, status: "REJECTED" } : c
//       )
//     );
//   }

//   function handleNegotiate(contract) {
//     setContracts((prev) =>
//       prev.map((c) =>
//         c._id === contract._id ? { ...c, status: "NEGOTIATING" } : c
//       )
//     );
//   }

//   /* =========================
//      FILTERED CONTRACTS
//      ========================= */
//   const filtered = useMemo(() => {
//     if (filter === "ALL") return contracts;
//     return contracts.filter((c) => c.status === filter);
//   }, [contracts, filter]);

//   function logout() {
//     localStorage.clear();
//     window.location.href = "/login";
//   }

//   /* =========================
//      RENDER
//      ========================= */
//   return (
//     <div className="min-h-screen flex bg-[#F5F7F2]">
//       <Sidebar onLogout={logout} />

//       <main className="flex-1 overflow-y-auto">
//         <Topbar
//           profileData={profileData}
//           onOpenProfile={() => setShowProfileModal(true)}
//           onLogout={logout}
//         />

//         <section className="px-10 py-6 space-y-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-[#25341F]">
//               My Contracts
//             </h1>
//             <p className="text-sm text-[#7A8A6D]">
//               Review and manage contract offers from buyers
//             </p>
//           </div>

//           {/* STATS */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             <div className="bg-white p-4 rounded-xl">
//               <div className="text-xs text-[#6C7C62]">Total</div>
//               <div className="text-3xl font-semibold">{stats.totalActive}</div>
//             </div>
//             <div className="bg-[#FFF2F0] p-4 rounded-xl">
//               <div className="text-xs text-[#D97757]">Pending</div>
//               <div className="text-3xl font-semibold">
//                 {stats.pendingReview}
//               </div>
//             </div>
//             <div className="bg-[#FFFBF0] p-4 rounded-xl">
//               <div className="text-xs text-[#B45309]">Negotiating</div>
//               <div className="text-3xl font-semibold">
//                 {stats.inNegotiation}
//               </div>
//             </div>
//           </div>

//           {/* FILTERS */}
//           <div className="flex gap-3">
//             {["ALL", "SENT", "NEGOTIATING", "ACCEPTED", "REJECTED"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setFilter(t)}
//                 className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
//                   filter === t
//                     ? "bg-[#F4F8F1] text-emerald-800"
//                     : "bg-white text-[#6B7280]"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           {/* CONTRACT LIST */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {loading ? (
//               <div>Loading contracts…</div>
//             ) : filtered.length === 0 ? (
//               <div>No contracts found</div>
//             ) : (
//               filtered.map((c) => (
//                 <ContractCard
//                   key={c._id}
//                   contract={c}
//                   onAccept={handleAccept}
//                   onReject={handleReject}
//                   onNegotiate={handleNegotiate}
//                 />
//               ))
//             )}
//           </div>
//         </section>
//       </main>

//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => {
//           setShowProfileModal(false);
//           setEditing(false);
//         }}
//         profileData={profileData}
//         editing={editing}
//         saving={saving}
//       />
//       {selectedContract && (
//         <AcceptanceReviewModal
//           contract={selectedContract}
//           onClose={() => setSelectedContract(null)}
//           onSuccess={() => {
//             // 1. Remove contract from list (recommended UX)
//             setContracts((prev) =>
//               prev.filter((c) => c._id !== selectedContract._id)
//             );

//             // 2. Success feedback
//             alert("Contract accepted and signed successfully");

//             // 3. Close modal handled already
//           }}
//         />
//       )}
//     </div>
//   );
// }
// src/pages/ContractsPage.jsx

// import React, { useEffect, useMemo, useState } from "react";
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/profileModal.jsx";
// import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { format } from "date-fns";
// import {
//   MapPin,
//   Calendar,
//   Scaling,
//   User,
//   IndianRupee,
//   Clock,
//   Filter,
//   CheckCircle2,
//   XCircle,
//   MessageSquare,
//   FileText,
//   TrendingUp,
//   AlertCircle,
// } from "lucide-react";

// /* =========================
//    CONTRACT CARD
//    ========================= */
// function ContractCard({
//   contract,
//   onAccept,
//   onReject,
//   onNegotiate,
//   onSelectContract,
// }) {
//   const postedText = contract.createdAt
//     ? format(new Date(contract.createdAt), "MMM d, yyyy")
//     : "Unknown";

//   const isPending = contract.status === "SENT";
//   const isAwaitingSignature = contract.status === "PENDING_SIGNATURE";

//   // Helper for dynamic status styles
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "SENT":
//         return "bg-amber-50 text-amber-700 border-amber-100";
//       case "NEGOTIATING":
//         return "bg-indigo-50 text-indigo-700 border-indigo-100";
//       case "ACCEPTED":
//         return "bg-emerald-50 text-emerald-700 border-emerald-100";
//       case "REJECTED":
//         return "bg-rose-50 text-rose-700 border-rose-100";
//       default:
//         return "bg-slate-50 text-slate-600 border-slate-100";
//     }
//   };

//   return (
//     <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
//       {/* Header */}
//       <div className="p-5 border-b border-slate-100 flex justify-between items-start gap-4">
//         <div className="flex gap-3">
//           <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
//             <User className="h-5 w-5" />
//           </div>
//           <div>
//             <h3 className="font-bold text-slate-800 text-lg leading-tight">
//               {contract.buyer?.name || "Unknown Buyer"}
//             </h3>
//             <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
//               <MapPin className="h-3 w-3" />
//               {contract.buyer?.address || "No address provided"}
//             </div>
//           </div>
//         </div>

//         <div className="text-right">
//           <div
//             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusBadge(contract.status)}`}
//           >
//             {contract.status === "SENT" ? "New Offer" : contract.status}
//           </div>
//           <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-slate-400">
//             <Clock className="h-3 w-3" /> {postedText}
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-5 flex-1">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               Crop
//             </span>
//             <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               {contract.cropDetails?.cropName || "Crop"}
//             </div>
//           </div>
//           <div className="text-right">
//             <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               Offer Price
//             </span>
//             <div className="text-xl font-bold text-emerald-600 flex items-center justify-end">
//               <IndianRupee className="h-4 w-4 stroke-[2.5]" />
//               {contract.payment?.agreedPricePerUnit || "—"}
//               <span className="text-sm font-medium text-slate-400 ml-1">
//                 /unit
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600">
//               <Scaling className="h-4 w-4" />
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-500 font-medium">Area</p>
//               <p className="text-sm font-semibold text-slate-700">
//                 {contract.cropDetails?.contractedArea || "—"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-600">
//               <Calendar className="h-4 w-4" />
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-500 font-medium">Season</p>
//               <p className="text-sm font-semibold text-slate-700">
//                 {contract.cropDetails?.season || "—"}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 text-xs text-slate-500 flex items-center gap-1.5 px-1">
//           <span className="font-medium text-slate-400">Delivery Location:</span>
//           <span className="text-slate-700 font-medium truncate">
//             {contract.delivery?.deliveryLocation || "—"}
//           </span>
//         </div>
//       </div>

//       {/* Actions */}
//       {isPending && (
//         <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
//           <button
//             onClick={() => onAccept(contract)}
//             className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-bold shadow-sm shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
//           >
//             <CheckCircle2 className="h-4 w-4" /> Accept
//           </button>

//           <button
//             onClick={() => onNegotiate(contract)}
//             className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm font-bold shadow-sm shadow-amber-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
//           >
//             <MessageSquare className="h-4 w-4" /> Negotiate
//           </button>

//           <button
//             onClick={() => onReject(contract)}
//             className="h-[36px] w-[36px] flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all active:scale-95"
//             title="Reject"
//           >
//             <XCircle className="h-5 w-5" />
//           </button>
//         </div>
//       )}

//       {!isPending && (
//         <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
//           <span className="text-xs font-medium text-slate-500">
//             Status:{" "}
//             <span className="text-slate-700 font-bold">{contract.status}</span>
//           </span>
//         </div>
//       )}
//       {isAwaitingSignature && (
//         <button
//           onClick={() => onSelectContract(contract)}
//           className="flex-1 bg-emerald-600 text-white py-2 rounded-lg"
//         >
//           Sign Contract
//         </button>
//       )}
//     </div>
//   );
// }

// /* =========================
//    CONTRACTS PAGE
//    ========================= */
// export default function ContractsPage() {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");
//   const [selectedContract, setSelectedContract] = useState(null);

//   const [stats, setStats] = useState({
//     totalActive: 0,
//     pendingReview: 0,
//     inNegotiation: 0,
//   });

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);

//   /* =========================
//      LOAD PROFILE + CONTRACTS
//      ========================= */
//   useEffect(() => {
//     let mounted = true;

//     async function loadData() {
//       try {
//         const profileRes = await api.get("/profile/me");
//         if (mounted) setProfileData(profileRes.data);

//         const contractRes = await api.get("/farmer/contracts");

//         if (mounted && contractRes.data?.contracts) {
//           setContracts(contractRes.data.contracts);
//           computeStats(contractRes.data.contracts);
//         }
//       } catch (err) {
//         console.error(
//           "Failed to load contracts:",
//           err?.response?.data || err.message,
//         );
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     loadData();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =========================
//      STATS
//      ========================= */
//   function computeStats(list) {
//     setStats({
//       totalActive: list.length,
//       pendingReview: list.filter((c) => c.status === "SENT").length,
//       inNegotiation: list.filter((c) => c.status === "NEGOTIATING").length,
//     });
//   }

//   /* =========================
//      CONTRACT STATUS ACTIONS
//      ========================= */

//   function handleAccept(contract) {
//     setSelectedContract(contract);
//   }

//   function handleReject(contract) {
//     if (!window.confirm("Reject this contract?")) return;

//     setContracts((prev) =>
//       prev.map((c) =>
//         c._id === contract._id ? { ...c, status: "REJECTED" } : c,
//       ),
//     );
//   }

//   async function handleNegotiate(contract) {
//     try {
//       const price = prompt("Enter your counter price:");

//       if (!price) return;

//       const res = await api.post(`/negotiation/start/${contract._id}`, {
//         suggestedPrice: Number(price),
//       });

//       const negotiationId = res.data.negotiation._id;

//       // Redirect to negotiation page
//       navigate("/farmer/negotiations", {
//         state: { selectedNegotiationId: negotiationId },
//       });
//     } catch (err) {
//       console.error(
//         "Failed to start negotiation:",
//         err?.response?.data || err.message,
//       );
//       alert("Failed to start negotiation");
//     }
//   }

//   /* =========================
//      FILTERED CONTRACTS
//      ========================= */
//   const filtered = useMemo(() => {
//     if (filter === "ALL") return contracts;
//     return contracts.filter((c) => c.status === filter);
//   }, [contracts, filter]);

//   function logout() {
//     localStorage.clear();
//     window.location.href = "/login";
//   }

//   /* =========================
//      RENDER
//      ========================= */
//   return (
//     <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
//       <Sidebar onLogout={logout} />

//       <main className="flex-1 flex flex-col relative overflow-hidden">
//         <Topbar
//           profileData={profileData}
//           onOpenProfile={() => setShowProfileModal(true)}
//           onLogout={logout}
//         />

//         <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
//           <div className="max-w-7xl mx-auto space-y-8">
//             {/* Header Section */}
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
//                   My Contracts
//                 </h1>
//                 <p className="text-slate-500 mt-2 text-base">
//                   Manage your farming agreements and negotiations in one place.
//                 </p>
//               </div>
//             </div>

//             {/* STATS CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//               {/* Card 1 */}
//               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
//                 <div className="absolute right-0 top-0 h-24 w-24 bg-blue-50 rounded-full -mr-6 -mt-6 z-0"></div>
//                 <div className="relative z-10">
//                   <p className="text-sm font-semibold text-slate-500 mb-1">
//                     Total Contracts
//                   </p>
//                   <p className="text-3xl font-bold text-slate-800">
//                     {stats.totalActive}
//                   </p>
//                 </div>
//                 <div className="relative z-10 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
//                   <FileText className="h-5 w-5" />
//                 </div>
//               </div>

//               {/* Card 2 */}
//               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
//                 <div className="absolute right-0 top-0 h-24 w-24 bg-amber-50 rounded-full -mr-6 -mt-6 z-0"></div>
//                 <div className="relative z-10">
//                   <p className="text-sm font-semibold text-slate-500 mb-1">
//                     Pending Review
//                   </p>
//                   <p className="text-3xl font-bold text-amber-600">
//                     {stats.pendingReview}
//                   </p>
//                 </div>
//                 <div className="relative z-10 h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
//                   <AlertCircle className="h-5 w-5" />
//                 </div>
//               </div>

//               {/* Card 3 */}
//               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
//                 <div className="absolute right-0 top-0 h-24 w-24 bg-indigo-50 rounded-full -mr-6 -mt-6 z-0"></div>
//                 <div className="relative z-10">
//                   <p className="text-sm font-semibold text-slate-500 mb-1">
//                     Negotiating
//                   </p>
//                   <p className="text-3xl font-bold text-indigo-600">
//                     {stats.inNegotiation}
//                   </p>
//                 </div>
//                 <div className="relative z-10 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
//                   <TrendingUp className="h-5 w-5" />
//                 </div>
//               </div>
//             </div>

//             {/* FILTERS */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
//               <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
//                 <div className="flex items-center gap-2 pr-2 border-r border-slate-200 mr-2">
//                   <Filter className="h-4 w-4 text-slate-400" />
//                   <span className="text-sm font-semibold text-slate-600">
//                     Filter:
//                   </span>
//                 </div>
//                 {[
//                   "ALL",
//                   "SENT",
//                   "NEGOTIATING",
//                   "ACCEPTED",
//                   "REJECTED",
//                   "PENDING_SIGNATURE",
//                   "AWAITING_BUYER_SIGNATURE",
//                 ].map((t) => {
//                   const isActive = filter === t;
//                   return (
//                     <button
//                       key={t}
//                       onClick={() => setFilter(t)}
//                       className={`
//                            px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200
//                            ${
//                              isActive
//                                ? "bg-slate-900 text-white shadow-md shadow-slate-200"
//                                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700"
//                            }
//                         `}
//                     >
//                       {t === "SENT"
//                         ? "New Offers"
//                         : t.charAt(0) + t.slice(1).toLowerCase()}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* CONTRACT LIST */}
//             <div className="min-h-[300px]">
//               {loading ? (
//                 <div className="flex flex-col items-center justify-center h-64">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
//                   <p className="mt-4 text-slate-500 font-medium">
//                     Loading your contracts...
//                   </p>
//                 </div>
//               ) : filtered.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
//                   <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
//                     <FileText className="h-8 w-8 text-slate-300" />
//                   </div>
//                   <h3 className="text-lg font-bold text-slate-700">
//                     No contracts found
//                   </h3>
//                   <p className="text-slate-500">
//                     {filter === "ALL"
//                       ? "You don't have any contracts yet."
//                       : `No contracts with status "${filter}".`}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {filtered.map((c) => (
//                     <ContractCard
//                       key={c._id}
//                       contract={c}
//                       onAccept={handleAccept}
//                       onReject={handleReject}
//                       onNegotiate={handleNegotiate}
//                       onSelectContract={setSelectedContract}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => {
//           setShowProfileModal(false);
//           setEditing(false);
//         }}
//         profileData={profileData}
//         editing={editing}
//         saving={saving}
//       />
//       {selectedContract && (
//         <AcceptanceReviewModal
//           contract={selectedContract}
//           onClose={() => setSelectedContract(null)}
//           onSuccess={() => {
//             // 1. Remove contract from list (recommended UX)
//             setContracts((prev) =>
//               prev.filter((c) => c._id !== selectedContract._id),
//             );

//             // 2. Success feedback
//             alert("Contract accepted and signed successfully");

//             // 3. Close modal handled already
//           }}
//         />
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useMemo, useState } from "react";
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/profileModal.jsx";
// import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { format } from "date-fns";
// import {
//   MapPin,
//   Calendar,
//   Scaling,
//   User,
//   IndianRupee,
//   Clock,
//   Filter,
//   CheckCircle2,
//   XCircle,
//   MessageSquare,
//   FileText,
//   TrendingUp,
//   AlertCircle,
//   ChevronRight,
//   ShieldCheck,
// } from "lucide-react";

// /* =========================
//    CONTRACT CARD (UPGRADED UI)
//    ========================= */
// function ContractCard({
//   contract,
//   onAccept,
//   onReject,
//   onNegotiate,
//   onSelectContract,
// }) {
//   const postedText = contract.createdAt
//     ? format(new Date(contract.createdAt), "MMM d, yyyy")
//     : "Unknown";

//   const isPending = contract.status === "SENT";
//   const isAwaitingSignature = contract.status === "PENDING_SIGNATURE";

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "SENT":
//         return "bg-amber-100 text-amber-700 border-amber-200";
//       case "NEGOTIATING":
//         return "bg-indigo-100 text-indigo-700 border-indigo-200";
//       case "ACCEPTED":
//         return "bg-emerald-100 text-emerald-700 border-emerald-200";
//       case "REJECTED":
//         return "bg-rose-100 text-rose-700 border-rose-200";
//       default:
//         return "bg-slate-100 text-slate-600 border-slate-200";
//     }
//   };

//   return (
//     <div className="group bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
//       {/* Decorative Corner Tag for New Offers */}
//       {isPending && (
//         <div className="absolute top-0 right-0">
//           <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-tighter">
//             New Offer
//           </div>
//         </div>
//       )}

//       {/* Header Area */}
//       <div className="p-6 pb-4">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:bg-emerald-50 transition-colors">
//             <User size={24} />
//           </div>
//           <div className="overflow-hidden">
//             <h3 className="font-extrabold text-slate-800 text-[17px] leading-tight truncate">
//               {contract.buyer?.name || "Unknown Buyer"}
//             </h3>
//             <div className="flex items-center gap-1 mt-1 text-[12px] text-slate-400 font-medium italic">
//               <MapPin size={12} />
//               {contract.buyer?.address || "Location not provided"}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between py-3 border-y border-slate-50">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Crop</p>
//             <p className="text-lg font-black text-[#064e3b] font-serif">
//               {contract.cropDetails?.cropName || "Unknown Crop"}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agreed Price</p>
//             <div className="text-xl font-black text-emerald-600 flex items-center justify-end">
//               <IndianRupee size={16} strokeWidth={3} />
//               {contract.payment?.agreedPricePerUnit || "0"}
//               <span className="text-[10px] font-bold text-slate-300 ml-1">/UNIT</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Middle Stats Section */}
//       <div className="px-6 grid grid-cols-2 gap-3 mb-4">
//         <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
//           <Scaling size={16} className="text-emerald-500" />
//           <div>
//             <p className="text-[9px] font-bold text-slate-400 uppercase">Area</p>
//             <p className="text-[13px] font-bold text-slate-700">{contract.cropDetails?.contractedArea || "—"}</p>
//           </div>
//         </div>
//         <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
//           <Calendar size={16} className="text-amber-500" />
//           <div>
//             <p className="text-[9px] font-bold text-slate-400 uppercase">Season</p>
//             <p className="text-[13px] font-bold text-slate-700">{contract.cropDetails?.season || "—"}</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer Info */}
//       <div className="px-6 mb-6">
//          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
//             <ShieldCheck size={14} className="text-blue-500" />
//             <span className="truncate">Delivery: {contract.delivery?.deliveryLocation || "No details"}</span>
//          </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-auto p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
//         {isPending ? (
//           <>
//             <button
//               onClick={() => onAccept(contract)}
//               className="flex-[2] bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-[13px] font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95"
//             >
//               <CheckCircle2 size={16} /> Accept
//             </button>
//             <button
//               onClick={() => onNegotiate(contract)}
//               className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1 active:scale-95"
//             >
//               Negotiate
//             </button>
//             <button
//               onClick={() => onReject(contract)}
//               className="h-[42px] w-[42px] shrink-0 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center active:scale-95"
//             >
//               <XCircle size={18} />
//             </button>
//           </>
//         ) : isAwaitingSignature ? (
//             <button
//               onClick={() => onSelectContract(contract)}
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 transition-all"
//             >
//               Sign Contract <ChevronRight size={18} />
//             </button>
//         ) : (
//           <div className="w-full text-center">
//              <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase border tracking-widest ${getStatusStyles(contract.status)}`}>
//                {contract.status}
//              </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================
//    CONTRACTS PAGE (MAIN VIEW)
//    ========================= */
// export default function ContractsPage() {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");
//   const [selectedContract, setSelectedContract] = useState(null);

//   const [stats, setStats] = useState({
//     totalActive: 0,
//     pendingReview: 0,
//     inNegotiation: 0,
//   });

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     let mounted = true;
//     async function loadData() {
//       try {
//         const profileRes = await api.get("/profile/me");
//         if (mounted) setProfileData(profileRes.data);
//         const contractRes = await api.get("/farmer/contracts");
//         if (mounted && contractRes.data?.contracts) {
//           setContracts(contractRes.data.contracts);
//           computeStats(contractRes.data.contracts);
//         }
//       } catch (err) {
//         console.error("Load failed:", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     loadData();
//     return () => (mounted = false);
//   }, []);

//   function computeStats(list) {
//     setStats({
//       totalActive: list.length,
//       pendingReview: list.filter((c) => c.status === "SENT").length,
//       inNegotiation: list.filter((c) => c.status === "NEGOTIATING").length,
//     });
//   }

//   function handleAccept(contract) { setSelectedContract(contract); }

//   function handleReject(contract) {
//     if (!window.confirm("Reject this contract?")) return;
//     setContracts((prev) =>
//       prev.map((c) => (c._id === contract._id ? { ...c, status: "REJECTED" } : c))
//     );
//   }

//   async function handleNegotiate(contract) {
//     try {
//       const price = prompt("Enter your counter price:");
//       if (!price) return;
//       const res = await api.post(`/negotiation/start/${contract._id}`, {
//         suggestedPrice: Number(price),
//       });
//       navigate("/farmer/negotiations", { state: { selectedNegotiationId: res.data.negotiation._id } });
//     } catch (err) {
//       alert("Failed to start negotiation");
//     }
//   }

//   const filtered = useMemo(() => {
//     if (filter === "ALL") return contracts;
//     return contracts.filter((c) => c.status === filter);
//   }, [contracts, filter]);

//   function logout() {
//     localStorage.clear();
//     window.location.href = "/login";
//   }

//   return (
//     <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
//       <Sidebar onLogout={logout} />

//       <main className="flex-1 flex flex-col relative overflow-hidden animate-in fade-in duration-500">
//         <Topbar
//           profileData={profileData}
//           onOpenProfile={() => setShowProfileModal(true)}
//           onLogout={logout}
//         />

//         <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
//           <div className="max-w-7xl mx-auto space-y-10">
            
//             {/* Page Header */}
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//               <div>
//                 <h1 className="text-4xl font-black text-[#064e3b] font-serif tracking-tight">
//                   Contract Portfolio
//                 </h1>
//                 <p className="text-slate-500 mt-2 text-lg font-medium">
//                   Review offers, negotiate prices, and secure your harvest.
//                 </p>
//               </div>
//             </div>

//             {/* Stats Section with subtle glass look */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <StatSummaryCard 
//                 label="Total Portfolio" 
//                 value={stats.totalActive} 
//                 icon={FileText} 
//                 color="blue" 
//               />
//               <StatSummaryCard 
//                 label="Action Required" 
//                 value={stats.pendingReview} 
//                 icon={AlertCircle} 
//                 color="amber" 
//               />
//               <StatSummaryCard 
//                 label="In Discussion" 
//                 value={stats.inNegotiation} 
//                 icon={TrendingUp} 
//                 color="indigo" 
//               />
//             </div>

//             {/* Filter Navigation */}
//             <div className="bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-200 inline-flex flex-wrap gap-1">
//               {[
//                 { id: "ALL", label: "All Contracts" },
//                 { id: "SENT", label: "New Offers" },
//                 { id: "NEGOTIATING", label: "Negotiating" },
//                 { id: "ACCEPTED", label: "Accepted" },
//                 { id: "REJECTED", label: "Rejected" },
//                 { id: "PENDING_SIGNATURE", label: "Pending Sign" }
//               ].map((t) => (
//                 <button
//                   key={t.id}
//                   onClick={() => setFilter(t.id)}
//                   className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
//                     filter === t.id
//                       ? "bg-[#064e3b] text-white shadow-lg shadow-emerald-100 scale-105"
//                       : "text-slate-500 hover:text-slate-800 hover:bg-white"
//                   }`}
//                 >
//                   {t.label}
//                 </button>
//               ))}
//             </div>

//             {/* Content Grid */}
//             <div className="min-h-[400px]">
//               {loading ? (
//                 <div className="flex flex-col items-center justify-center py-20">
//                   <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
//                 </div>
//               ) : filtered.length === 0 ? (
//                 <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 py-24 text-center">
//                   <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <FileText className="text-slate-300" size={40} />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-700">Empty Section</h3>
//                   <p className="text-slate-400 mt-2 max-w-xs mx-auto">No contracts match the selected status filter.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                   {filtered.map((c) => (
//                     <ContractCard
//                       key={c._id}
//                       contract={c}
//                       onAccept={handleAccept}
//                       onReject={handleReject}
//                       onNegotiate={handleNegotiate}
//                       onSelectContract={setSelectedContract}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         profileData={profileData}
//       />

//       {selectedContract && (
//         <AcceptanceReviewModal
//           contract={selectedContract}
//           onClose={() => setSelectedContract(null)}
//           onSuccess={() => {
//             setContracts((prev) => prev.filter((c) => c._id !== selectedContract._id));
//             alert("Contract secured successfully!");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// /* Sub-component for Stats to keep main cleaner */
// function StatSummaryCard({ label, value, icon: Icon, color }) {
//   const colors = {
//     blue: "bg-blue-600 text-blue-100",
//     amber: "bg-amber-500 text-amber-100",
//     indigo: "bg-indigo-600 text-indigo-100"
//   };

//   return (
//     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
//       <div>
//         <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
//         <p className="text-4xl font-black text-slate-800">{value}</p>
//       </div>
//       <div className={`h-14 w-14 rounded-2xl ${colors[color]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
//         <Icon size={28} />
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useMemo, useState } from "react";
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/profileModal.jsx";
// import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { format } from "date-fns";
// import {
//   MapPin,
//   Calendar,
//   Scaling,
//   User,
//   IndianRupee,
//   FileText,
//   TrendingUp,
//   AlertCircle,
//   ChevronRight,
//   ShieldCheck,
//   CheckCircle2,
//   XCircle
// } from "lucide-react";

// /* =========================
//    CONTRACT CARD
//    ========================= */
// function ContractCard({ contract, onAccept, onReject, onNegotiate, onSelectContract }) {
//   const isPending = contract.status === "SENT";
//   const isAwaitingSignature = contract.status === "PENDING_SIGNATURE";

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "SENT": return "bg-amber-100 text-amber-700 border-amber-200";
//       case "NEGOTIATING": return "bg-indigo-100 text-indigo-700 border-indigo-200";
//       case "ACCEPTED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
//       case "REJECTED": return "bg-rose-100 text-rose-700 border-rose-200";
//       default: return "bg-slate-100 text-slate-600 border-slate-200";
//     }
//   };

//   return (
//     <div className="group bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
//       {isPending && (
//         <div className="absolute top-0 right-0">
//           <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-tighter">New Offer</div>
//         </div>
//       )}
//       <div className="p-6 pb-4">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:bg-emerald-50 transition-colors"><User size={24} /></div>
//           <div className="overflow-hidden">
//             <h3 className="font-extrabold text-slate-800 text-[17px] leading-tight truncate">{contract.buyer?.name || "Unknown Buyer"}</h3>
//             <div className="flex items-center gap-1 mt-1 text-[12px] text-slate-400 font-medium italic"><MapPin size={12} /> {contract.buyer?.address || "Location not provided"}</div>
//           </div>
//         </div>
//         <div className="flex items-center justify-between py-3 border-y border-slate-50">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Crop</p>
//             <p className="text-lg font-black text-[#064e3b] font-serif">{contract.cropDetails?.cropName || "Unknown Crop"}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agreed Price</p>
//             <div className="text-xl font-black text-emerald-600 flex items-center justify-end"><IndianRupee size={16} strokeWidth={3} /> {contract.payment?.agreedPricePerUnit || "0"} <span className="text-[10px] font-bold text-slate-300 ml-1">/UNIT</span></div>
//           </div>
//         </div>
//       </div>
//       <div className="px-6 grid grid-cols-2 gap-3 mb-4">
//         <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
//           <Scaling size={16} className="text-emerald-500" />
//           <div><p className="text-[9px] font-bold text-slate-400 uppercase">Area</p><p className="text-[13px] font-bold text-slate-700">{contract.cropDetails?.contractedArea || "—"}</p></div>
//         </div>
//         <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
//           <Calendar size={16} className="text-amber-500" />
//           <div><p className="text-[9px] font-bold text-slate-400 uppercase">Season</p><p className="text-[13px] font-bold text-slate-700">{contract.cropDetails?.season || "—"}</p></div>
//         </div>
//       </div>
//       <div className="px-6 mb-6">
//          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium"><ShieldCheck size={14} className="text-blue-500" /><span className="truncate">Delivery: {contract.delivery?.deliveryLocation || "No details"}</span></div>
//       </div>
//       <div className="mt-auto p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
//         {isPending ? (
//           <>
//             <button onClick={() => onAccept(contract)} className="flex-[2] bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-[13px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"><CheckCircle2 size={16} /> Accept</button>
//             <button onClick={() => onNegotiate(contract)} className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95">Negotiate</button>
//             <button onClick={() => onReject(contract)} className="h-[42px] w-[42px] shrink-0 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center active:scale-95"><XCircle size={18} /></button>
//           </>
//         ) : isAwaitingSignature ? (
//             <button onClick={() => onSelectContract(contract)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all">Sign Contract <ChevronRight size={18} /></button>
//         ) : (
//           <div className="w-full text-center"><span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase border tracking-widest ${getStatusStyles(contract.status)}`}>{contract.status}</span></div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN PAGE
//    ========================= */
// export default function ContractsPage() {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");
//   const [selectedContract, setSelectedContract] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [stats, setStats] = useState({ totalActive: 0, pendingReview: 0, inNegotiation: 0 });

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const profileRes = await api.get("/profile/me");
//         setProfileData(profileRes.data);
//         const contractRes = await api.get("/farmer/contracts");
//         if (contractRes.data?.contracts) {
//           setContracts(contractRes.data.contracts);
//           setStats({
//             totalActive: contractRes.data.contracts.length,
//             pendingReview: contractRes.data.contracts.filter(c => c.status === "SENT").length,
//             inNegotiation: contractRes.data.contracts.filter(c => c.status === "NEGOTIATING").length,
//           });
//         }
//       } catch (err) { console.error(err); } finally { setLoading(false); }
//     }
//     loadData();
//   }, []);

//   const filtered = useMemo(() => filter === "ALL" ? contracts : contracts.filter(c => c.status === filter), [contracts, filter]);

//   const logout = () => { localStorage.clear(); window.location.href = "/login"; };

//   return (
//     <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
//       <Sidebar onLogout={logout} />
//       <main className="flex-1 flex flex-col relative overflow-hidden">
//         <Topbar profileData={profileData} onOpenProfile={() => setShowProfileModal(true)} onLogout={logout} />

//         <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 scroll-smooth">
//           <div className="max-w-7xl mx-auto">
            
//             {/* Reduced Top Space */}
//             <div className="mt-4">
//               <h1 className="text-2xl font-black text-[#064e3b] font-serif tracking-tight">Contract Portfolio</h1>
//               <p className="text-slate-500 mt-1 text-[14px] font-medium ">Review offers, negotiate prices, and secure your harvest.</p>
//             </div>

//             {/* Stats: Center-aligned and narrow cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-2 mx-12">
//               <StatSummaryCard label="Total Portfolio" value={stats.totalActive} icon={FileText} color="blue" />
//               <StatSummaryCard label="Action Required" value={stats.pendingReview} icon={AlertCircle} color="amber" />
//               <StatSummaryCard label="In Discussion" value={stats.inNegotiation} icon={TrendingUp} color="indigo" />
//             </div>

//             {/* Filters */}
//             <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200 inline-flex flex-wrap gap-1 mt-6">
//               {["ALL", "SENT", "NEGOTIATING", "ACCEPTED", "REJECTED", "PENDING_SIGNATURE"].map((id) => (
//                 <button key={id} onClick={() => setFilter(id)} className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${filter === id ? "bg-[#064e3b] text-white shadow-lg" : "text-slate-500 hover:text-slate-800 hover:bg-white"}`}>
//                   {id.replace("_", " ")}
//                 </button>
//               ))}
//             </div>

//             {/* Content Grid */}
//             <div className="min-h-[400px] mt-6">
//               {loading ? (
//                 <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" /></div>
//               ) : filtered.length === 0 ? (
//                 <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 py-24 text-center">
//                   <h3 className="text-xl font-bold text-slate-700">Empty Section</h3>
//                   <p className="text-slate-400 mt-2 text-[12px]">No contracts match this filter.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                   {filtered.map(c => <ContractCard key={c._id} contract={c} onAccept={setSelectedContract} onReject={() => {}} onNegotiate={() => {}} onSelectContract={setSelectedContract} />)}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} profileData={profileData} />
//     </div>
//   );
// }

// function StatSummaryCard({ label, value, icon: Icon, color }) {
//   const colors = { blue: "bg-blue-600 text-blue-100", amber: "bg-amber-500 text-amber-100", indigo: "bg-indigo-600 text-indigo-100" };
//   return (
//     <div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
//       <div><p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p><p className="text-3xl font-black text-slate-800">{value}</p></div>
//       <div className={`h-11 w-11 rounded-xl ${colors[color]} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}><Icon size={20} /></div>
//     </div>
//   );
// }




import React, { useEffect, useMemo, useState, useRef } from "react"; // Added useRef
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  MapPin,
  Calendar,
  Scaling,
  User,
  IndianRupee,
  FileText,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  ArrowUp // Added ArrowUp icon
} from "lucide-react";

/* =========================
   CONTRACT CARD
   ========================= */
function ContractCard({ contract, onAccept, onReject, onNegotiate, onSelectContract }) {
  const isPending = contract.status === "SENT";
  const isAwaitingSignature = contract.status === "PENDING_SIGNATURE";

  const getStatusStyles = (status) => {
    switch (status) {
      case "SENT": return "bg-amber-100 text-amber-700 border-amber-200";
      case "NEGOTIATING": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "ACCEPTED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "REJECTED": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="group bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      {isPending && (
        <div className="absolute top-0 right-0">
          <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-tighter">New Offer</div>
        </div>
      )}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:bg-emerald-50 transition-colors"><User size={24} /></div>
          <div className="overflow-hidden">
            <h3 className="font-extrabold text-slate-800 text-[17px] leading-tight truncate">{contract.buyer?.name || "Unknown Buyer"}</h3>
            <div className="flex items-center gap-1 mt-1 text-[12px] text-slate-400 font-medium italic"><MapPin size={12} /> {contract.buyer?.address || "Location not provided"}</div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-y border-slate-50">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Crop</p>
            <p className="text-lg font-black text-[#064e3b] font-serif">{contract.cropDetails?.cropName || "Unknown Crop"}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agreed Price</p>
            <div className="text-xl font-black text-emerald-600 flex items-center justify-end"><IndianRupee size={16} strokeWidth={3} /> {contract.payment?.agreedPricePerUnit || "0"} <span className="text-[10px] font-bold text-slate-300 ml-1">/UNIT</span></div>
          </div>
        </div>
      </div>
      <div className="px-6 grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
          <Scaling size={16} className="text-emerald-500" />
          <div><p className="text-[9px] font-bold text-slate-400 uppercase">Area</p><p className="text-[13px] font-bold text-slate-700">{contract.cropDetails?.contractedArea || "—"}</p></div>
        </div>
        <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
          <Calendar size={16} className="text-amber-500" />
          <div><p className="text-[9px] font-bold text-slate-400 uppercase">Season</p><p className="text-[13px] font-bold text-slate-700">{contract.cropDetails?.season || "—"}</p></div>
        </div>
      </div>
      <div className="px-6 mb-6">
         <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium"><ShieldCheck size={14} className="text-blue-500" /><span className="truncate">Delivery: {contract.delivery?.deliveryLocation || "No details"}</span></div>
      </div>
      <div className="mt-auto p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        {isPending ? (
          <>
            <button onClick={() => onAccept(contract)} className="flex-[2] bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-[13px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"><CheckCircle2 size={16} /> Accept</button>
            <button onClick={() => onNegotiate(contract)} className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95">Negotiate</button>
            <button onClick={() => onReject(contract)} className="h-[42px] w-[42px] shrink-0 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center active:scale-95"><XCircle size={18} /></button>
          </>
        ) : isAwaitingSignature ? (
            <button onClick={() => onSelectContract(contract)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all">Sign Contract <ChevronRight size={18} /></button>
        ) : (
          <div className="w-full text-center"><span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase border tracking-widest ${getStatusStyles(contract.status)}`}>{contract.status}</span></div>
        )}
      </div>
    </div>
  );
}

/* =========================
   MAIN PAGE
   ========================= */
export default function ContractsPage() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null); // Ref to handle scrolling
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [stats, setStats] = useState({ totalActive: 0, pendingReview: 0, inNegotiation: 0 });

  useEffect(() => {
    async function loadData() {
      try {
        const profileRes = await api.get("/profile/me");
        setProfileData(profileRes.data);
        const contractRes = await api.get("/farmer/contracts");
        if (contractRes.data?.contracts) {
          setContracts(contractRes.data.contracts);
          setStats({
            totalActive: contractRes.data.contracts.length,
            pendingReview: contractRes.data.contracts.filter(c => c.status === "SENT").length,
            inNegotiation: contractRes.data.contracts.filter(c => c.status === "NEGOTIATING").length,
          });
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  // Handle detecting scroll position for the button
  const handleScroll = (e) => {
    if (e.target.scrollTop > 300) setShowScrollTop(true);
    else setShowScrollTop(false);
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    return contracts.filter(c => {
      const matchesFilter = filter === "ALL" || c.status === filter;
      const matchesSearch = 
        (c.buyer?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.cropDetails?.cropName || "").toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [contracts, filter, searchTerm]);

  const logout = () => { localStorage.clear(); window.location.href = "/login"; };

  return (
    <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
      <Sidebar onLogout={logout} />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar profileData={profileData} onOpenProfile={() => setShowProfileModal(true)} onLogout={logout} />

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 scroll-smooth relative"
        >
          <div className="max-w-7xl mx-auto">
            
            <div className="mt-4">
              <h1 className="text-2xl font-black text-[#064e3b] font-serif tracking-tight">Contract Portfolio</h1>
              <p className="text-slate-500 mt-1 text-[12px] font-medium italic">Review offers, negotiate prices, and secure your harvest.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-2 mx-12">
              <StatSummaryCard label="Total Portfolio" value={stats.totalActive} icon={FileText} color="blue" />
              <StatSummaryCard label="Action Required" value={stats.pendingReview} icon={AlertCircle} color="amber" />
              <StatSummaryCard label="In Discussion" value={stats.inNegotiation} icon={TrendingUp} color="indigo" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
              <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200 inline-flex flex-wrap gap-1">
                {["ALL", "SENT", "NEGOTIATING", "ACCEPTED", "REJECTED", "PENDING_SIGNATURE"].map((id) => (
                  <button key={id} onClick={() => setFilter(id)} className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${filter === id ? "bg-[#064e3b] text-white shadow-lg" : "text-slate-500 hover:text-slate-800 hover:bg-white"}`}>
                    {id.replace(/_/g, " ")}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Search buyer or crop..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="min-h-[400px] mt-6">
              {loading ? (
                <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" /></div>
              ) : filtered.length === 0 ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 py-24 text-center">
                  <h3 className="text-xl font-bold text-slate-700">No Results Found</h3>
                  <p className="text-slate-400 mt-2 text-[12px]">Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filtered.map(c => <ContractCard key={c._id} contract={c} onAccept={setSelectedContract} onReject={() => {}} onNegotiate={() => {}} onSelectContract={setSelectedContract} />)}
                </div>
              )}
            </div>
          </div>

          {/* QUICK SCROLL TO TOP BUTTON */}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#064e3b] text-white shadow-2xl transition-all duration-300 transform z-50 ${showScrollTop ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}`}
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </main>
      <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} profileData={profileData} />
    </div>
  );
}

function StatSummaryCard({ label, value, icon: Icon, color }) {
  const colors = { blue: "bg-blue-600 text-blue-100", amber: "bg-amber-500 text-amber-100", indigo: "bg-indigo-600 text-indigo-100" };
  return (
    <div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
      <div><p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p><p className="text-3xl font-black text-slate-800">{value}</p></div>
      <div className={`h-11 w-11 rounded-xl ${colors[color]} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}><Icon size={20} /></div>
    </div>
  );
}