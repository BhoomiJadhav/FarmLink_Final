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
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { format } from "date-fns";
import {
  MapPin,
  Calendar,
  Scaling,
  User,
  IndianRupee,
  Clock,
  Filter,
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

/* =========================
   CONTRACT CARD
   ========================= */
function ContractCard({
  contract,
  onAccept,
  onReject,
  onNegotiate,
  onSelectContract,
}) {
  const postedText = contract.createdAt
    ? format(new Date(contract.createdAt), "MMM d, yyyy")
    : "Unknown";

  const isPending = contract.status === "SENT";
  const isAwaitingSignature = contract.status === "PENDING_SIGNATURE";

  // Helper for dynamic status styles
  const getStatusBadge = (status) => {
    switch (status) {
      case "SENT":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "NEGOTIATING":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-start gap-4">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-tight">
              {contract.buyer?.name || "Unknown Buyer"}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3" />
              {contract.buyer?.address || "No address provided"}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusBadge(contract.status)}`}
          >
            {contract.status === "SENT" ? "New Offer" : contract.status}
          </div>
          <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-slate-400">
            <Clock className="h-3 w-3" /> {postedText}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Crop
            </span>
            <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {contract.cropDetails?.cropName || "Crop"}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Offer Price
            </span>
            <div className="text-xl font-bold text-emerald-600 flex items-center justify-end">
              <IndianRupee className="h-4 w-4 stroke-[2.5]" />
              {contract.payment?.agreedPricePerUnit || "—"}
              <span className="text-sm font-medium text-slate-400 ml-1">
                /unit
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600">
              <Scaling className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Area</p>
              <p className="text-sm font-semibold text-slate-700">
                {contract.cropDetails?.contractedArea || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-600">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Season</p>
              <p className="text-sm font-semibold text-slate-700">
                {contract.cropDetails?.season || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500 flex items-center gap-1.5 px-1">
          <span className="font-medium text-slate-400">Delivery Location:</span>
          <span className="text-slate-700 font-medium truncate">
            {contract.delivery?.deliveryLocation || "—"}
          </span>
        </div>
      </div>

      {/* Actions */}
      {isPending && (
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
          <button
            onClick={() => onAccept(contract)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-bold shadow-sm shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <CheckCircle2 className="h-4 w-4" /> Accept
          </button>

          <button
            onClick={() => onNegotiate(contract)}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm font-bold shadow-sm shadow-amber-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <MessageSquare className="h-4 w-4" /> Negotiate
          </button>

          <button
            onClick={() => onReject(contract)}
            className="h-[36px] w-[36px] flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all active:scale-95"
            title="Reject"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {!isPending && (
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <span className="text-xs font-medium text-slate-500">
            Status:{" "}
            <span className="text-slate-700 font-bold">{contract.status}</span>
          </span>
        </div>
      )}
      {isAwaitingSignature && (
        <button
          onClick={() => onSelectContract(contract)}
          className="flex-1 bg-emerald-600 text-white py-2 rounded-lg"
        >
          Sign Contract
        </button>
      )}
    </div>
  );
}

/* =========================
   CONTRACTS PAGE
   ========================= */
export default function ContractsPage() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [selectedContract, setSelectedContract] = useState(null);

  const [stats, setStats] = useState({
    totalActive: 0,
    pendingReview: 0,
    inNegotiation: 0,
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  /* =========================
     LOAD PROFILE + CONTRACTS
     ========================= */
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const profileRes = await api.get("/profile/me");
        if (mounted) setProfileData(profileRes.data);

        const contractRes = await api.get("/farmer/contracts");

        if (mounted && contractRes.data?.contracts) {
          setContracts(contractRes.data.contracts);
          computeStats(contractRes.data.contracts);
        }
      } catch (err) {
        console.error(
          "Failed to load contracts:",
          err?.response?.data || err.message,
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  /* =========================
     STATS
     ========================= */
  function computeStats(list) {
    setStats({
      totalActive: list.length,
      pendingReview: list.filter((c) => c.status === "SENT").length,
      inNegotiation: list.filter((c) => c.status === "NEGOTIATING").length,
    });
  }

  /* =========================
     CONTRACT STATUS ACTIONS
     ========================= */

  function handleAccept(contract) {
    setSelectedContract(contract);
  }

  function handleReject(contract) {
    if (!window.confirm("Reject this contract?")) return;

    setContracts((prev) =>
      prev.map((c) =>
        c._id === contract._id ? { ...c, status: "REJECTED" } : c,
      ),
    );
  }

  async function handleNegotiate(contract) {
    try {
      const price = prompt("Enter your counter price:");

      if (!price) return;

      const res = await api.post(`/negotiation/start/${contract._id}`, {
        suggestedPrice: Number(price),
      });

      const negotiationId = res.data.negotiation._id;

      // Redirect to negotiation page
      navigate("/farmer/negotiations", {
        state: { selectedNegotiationId: negotiationId },
      });
    } catch (err) {
      console.error(
        "Failed to start negotiation:",
        err?.response?.data || err.message,
      );
      alert("Failed to start negotiation");
    }
  }

  /* =========================
     FILTERED CONTRACTS
     ========================= */
  const filtered = useMemo(() => {
    if (filter === "ALL") return contracts;
    return contracts.filter((c) => c.status === filter);
  }, [contracts, filter]);

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  /* =========================
     RENDER
     ========================= */
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      <Sidebar onLogout={logout} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar
          profileData={profileData}
          onOpenProfile={() => setShowProfileModal(true)}
          onLogout={logout}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  My Contracts
                </h1>
                <p className="text-slate-500 mt-2 text-base">
                  Manage your farming agreements and negotiations in one place.
                </p>
              </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 bg-blue-50 rounded-full -mr-6 -mt-6 z-0"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">
                    Total Contracts
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {stats.totalActive}
                  </p>
                </div>
                <div className="relative z-10 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 bg-amber-50 rounded-full -mr-6 -mt-6 z-0"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">
                    Pending Review
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {stats.pendingReview}
                  </p>
                </div>
                <div className="relative z-10 h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 bg-indigo-50 rounded-full -mr-6 -mt-6 z-0"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">
                    Negotiating
                  </p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {stats.inNegotiation}
                  </p>
                </div>
                <div className="relative z-10 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* FILTERS */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
                <div className="flex items-center gap-2 pr-2 border-r border-slate-200 mr-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-600">
                    Filter:
                  </span>
                </div>
                {[
                  "ALL",
                  "SENT",
                  "NEGOTIATING",
                  "ACCEPTED",
                  "REJECTED",
                  "PENDING_SIGNATURE",
                  "AWAITING_BUYER_SIGNATURE",
                ].map((t) => {
                  const isActive = filter === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setFilter(t)}
                      className={`
                           px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200
                           ${
                             isActive
                               ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                               : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700"
                           }
                        `}
                    >
                      {t === "SENT"
                        ? "New Offers"
                        : t.charAt(0) + t.slice(1).toLowerCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONTRACT LIST */}
            <div className="min-h-[300px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  <p className="mt-4 text-slate-500 font-medium">
                    Loading your contracts...
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700">
                    No contracts found
                  </h3>
                  <p className="text-slate-500">
                    {filter === "ALL"
                      ? "You don't have any contracts yet."
                      : `No contracts with status "${filter}".`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((c) => (
                    <ContractCard
                      key={c._id}
                      contract={c}
                      onAccept={handleAccept}
                      onReject={handleReject}
                      onNegotiate={handleNegotiate}
                      onSelectContract={setSelectedContract}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setEditing(false);
        }}
        profileData={profileData}
        editing={editing}
        saving={saving}
      />
      {selectedContract && (
        <AcceptanceReviewModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
          onSuccess={() => {
            // 1. Remove contract from list (recommended UX)
            setContracts((prev) =>
              prev.filter((c) => c._id !== selectedContract._id),
            );

            // 2. Success feedback
            alert("Contract accepted and signed successfully");

            // 3. Close modal handled already
          }}
        />
      )}
    </div>
  );
}
