// import React, { useEffect, useMemo, useState, useRef } from "react"; // Added useRef
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/profileModal.jsx";
// import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
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
//   XCircle,
//   Search,
//   ArrowUp, // Added ArrowUp icon
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
//       {isPending && (
//         <div className="absolute top-0 right-0">
//           <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-tighter">
//             New Offer
//           </div>
//         </div>
//       )}
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
//               <MapPin size={12} />{" "}
//               {contract.buyer?.address || "Location not provided"}
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-between py-3 border-y border-slate-50">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//               Crop
//             </p>
//             <p className="text-lg font-black text-[#064e3b] font-serif">
//               {contract.cropDetails?.cropName || "Unknown Crop"}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//               Agreed Price
//             </p>
//             <div className="text-xl font-black text-emerald-600 flex items-center justify-end">
//               <IndianRupee size={16} strokeWidth={3} />
//               {contract.pricing?.agreedPricePerUnit || "0"}
//               <span className="text-[10px] font-bold text-slate-300 ml-1">
//                 /kg
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="px-6 grid grid-cols-2 gap-3 mb-4">
//         <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
//           <Scaling size={16} className="text-emerald-500" />
//           <div>
//             <p className="text-[9px] font-bold text-slate-400 uppercase">
//               Area
//             </p>
//             <p className="text-[13px] font-bold text-slate-700">
//               {contract.cropDetails?.contractedArea || "—"}
//             </p>
//           </div>
//         </div>
//         <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
//           <Calendar size={16} className="text-amber-500" />
//           <div>
//             <p className="text-[9px] font-bold text-slate-400 uppercase">
//               Season
//             </p>
//             <p className="text-[13px] font-bold text-slate-700">
//               {contract.cropDetails?.season || "—"}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="px-6 mb-6">
//         <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
//           <ShieldCheck size={14} className="text-blue-500" />
//           <span className="truncate">
//             Delivery: {contract.delivery?.deliveryLocation || "No details"}
//           </span>
//         </div>
//       </div>
//       <div className="mt-auto p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
//         {isPending ? (
//           <>
//             <button
//               onClick={() => onAccept(contract)}
//               className="flex-[2] bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-[13px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
//             >
//               <CheckCircle2 size={16} /> Accept
//             </button>
//             <button
//               onClick={() => onNegotiate(contract)}
//               className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95"
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
//           <button
//             onClick={() => onSelectContract(contract)}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
//           >
//             Sign Contract <ChevronRight size={18} />
//           </button>
//         ) : (
//           <div className="w-full text-center">
//             <span
//               className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase border tracking-widest ${getStatusStyles(contract.status)}`}
//             >
//               {contract.status}
//             </span>
//           </div>
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
//   const scrollContainerRef = useRef(null); // Ref to handle scrolling
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [profileData, setProfileData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedContract, setSelectedContract] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [stats, setStats] = useState({
//     totalActive: 0,
//     pendingReview: 0,
//     inNegotiation: 0,
//   });

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
//             pendingReview: contractRes.data.contracts.filter(
//               (c) => c.status === "SENT",
//             ).length,
//             inNegotiation: contractRes.data.contracts.filter(
//               (c) => c.status === "NEGOTIATING",
//             ).length,
//           });
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   // Handle detecting scroll position for the button
//   const handleScroll = (e) => {
//     if (e.target.scrollTop > 300) setShowScrollTop(true);
//     else setShowScrollTop(false);
//   };

//   const scrollToTop = () => {
//     scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const filtered = useMemo(() => {
//     return contracts.filter((c) => {
//       const matchesFilter = filter === "ALL" || c.status === filter;
//       const matchesSearch =
//         (c.buyer?.name || "")
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         (c.cropDetails?.cropName || "")
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//       return matchesFilter && matchesSearch;
//     });
//   }, [contracts, filter, searchTerm]);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
//       <Sidebar onLogout={logout} />
//       <main className="flex-1 flex flex-col relative overflow-hidden">
//         <Topbar
//           profileData={profileData}
//           onOpenProfile={() => setShowProfileModal(true)}
//           onLogout={logout}
//         />

//         <div
//           ref={scrollContainerRef}
//           onScroll={handleScroll}
//           className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 scroll-smooth relative"
//         >
//           <div className="max-w-7xl mx-auto">
//             <div className="mt-4">
//               <h1 className="text-2xl font-black text-[#064e3b] font-serif tracking-tight">
//                 Contract Portfolio
//               </h1>
//               <p className="text-slate-500 mt-1 text-[12px] font-medium italic">
//                 Review offers, negotiate prices, and secure your harvest.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-2 mx-12">
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

//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
//               <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200 inline-flex flex-wrap gap-1">
//                 {[
//                   "ALL",
//                   "SENT",
//                   "NEGOTIATING",
//                   "ACCEPTED",
//                   "REJECTED",
//                   "PENDING_SIGNATURE",
//                 ].map((id) => (
//                   <button
//                     key={id}
//                     onClick={() => setFilter(id)}
//                     className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${filter === id ? "bg-[#064e3b] text-white shadow-lg" : "text-slate-500 hover:text-slate-800 hover:bg-white"}`}
//                   >
//                     {id.replace(/_/g, " ")}
//                   </button>
//                 ))}
//               </div>

//               <div className="relative min-w-[280px]">
//                 <Search
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                   size={16}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search buyer or crop..."
//                   className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="min-h-[400px] mt-6">
//               {loading ? (
//                 <div className="flex justify-center py-20">
//                   <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
//                 </div>
//               ) : filtered.length === 0 ? (
//                 <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 py-24 text-center">
//                   <h3 className="text-xl font-bold text-slate-700">
//                     No Results Found
//                   </h3>
//                   <p className="text-slate-400 mt-2 text-[12px]">
//                     Try adjusting your search or filters.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                   {filtered.map((c) => (
//                     <ContractCard
//                       key={c._id}
//                       contract={c}
//                       onAccept={setSelectedContract}
//                       onReject={() => {}}
//                       onNegotiate={() => {}}
//                       onSelectContract={setSelectedContract}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* QUICK SCROLL TO TOP BUTTON */}
//           <button
//             onClick={scrollToTop}
//             className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#064e3b] text-white shadow-2xl transition-all duration-300 transform z-50 ${showScrollTop ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}`}
//           >
//             <ArrowUp size={24} />
//           </button>
//         </div>
//         {selectedContract && (
//           <AcceptanceReviewModal
//             contract={selectedContract}
//             onClose={() => setSelectedContract(null)}
//             onSuccess={() => {
//               setSelectedContract(null);
//               window.location.reload(); // or refetch contracts
//             }}
//           />
//         )}
//       </main>
//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         profileData={profileData}
//       />
//     </div>
//   );
// }

// function StatSummaryCard({ label, value, icon: Icon, color }) {
//   const colors = {
//     blue: "bg-blue-600 text-blue-100",
//     amber: "bg-amber-500 text-amber-100",
//     indigo: "bg-indigo-600 text-indigo-100",
//   };
//   return (
//     <div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
//       <div>
//         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
//           {label}
//         </p>
//         <p className="text-3xl font-black text-slate-800">{value}</p>
//       </div>
//       <div
//         className={`h-11 w-11 rounded-xl ${colors[color]} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
//       >
//         <Icon size={20} />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo, useRef } from "react"; // Added useRef
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Zap,
  User,
  ShoppingBag,
  Hash,
  Activity,
  Search,
  Truck,
  CheckCircle2,
  MapPin,
  Banknote,
  CalendarDays,
  Calendar,
  Scaling,
  IndianRupee,
  FileText,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  XCircle,
  ArrowUp, // Added ArrowUp icon
} from "lucide-react";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import AcceptanceReviewModal from "../../components/contracts/acceptanceReviewModel.jsx";
import { useTranslation } from "react-i18next"; // <-- Added Translation Hook

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
  const { t } = useTranslation(); // <-- Initialized Translator
  const isPending = contract.status === "SENT";
  const isAwaitingSignature = contract.status === "PENDING_SIGNATURE";

  const getStatusStyles = (status) => {
    switch (status) {
      case "SENT":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "NEGOTIATING":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "ACCEPTED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "REJECTED":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="group bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      {isPending && (
        <div className="absolute top-0 right-0">
          <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-tighter">
            {t("newOffer") || "New Offer"}
          </div>
        </div>
      )}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:bg-emerald-50 transition-colors">
            <User size={24} />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-extrabold text-slate-800 text-[17px] leading-tight truncate">
              {contract.buyer?.name || t("unknownBuyer")}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-[12px] text-slate-400 font-medium italic">
              <MapPin size={12} />{" "}
              {contract.buyer?.address || t("locationNotProvided")}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-y border-slate-50">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t("crop")}
            </p>
            <p className="text-lg font-black text-[#064e3b] font-serif">
              {contract.cropDetails?.cropName || t("unknownCrop")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t("agreedPrice")}
            </p>
            <div className="text-xl font-black text-emerald-600 flex items-center justify-end">
              <IndianRupee size={16} strokeWidth={3} />
              {contract.pricing?.agreedPricePerUnit || "0"}
              <span className="text-[10px] font-bold text-slate-300 ml-1">
                {t("perKg") || "/kg"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
          <Scaling size={16} className="text-emerald-500" />
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase">
              {t("area")}
            </p>
            <p className="text-[13px] font-bold text-slate-700">
              {contract.cropDetails?.contractedArea || "—"}
            </p>
          </div>
        </div>
        <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-50 flex items-center gap-2.5">
          <Calendar size={16} className="text-amber-500" />
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase">
              {t("season")}
            </p>
            <p className="text-[13px] font-bold text-slate-700">
              {contract.cropDetails?.season || "—"}
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <ShieldCheck size={14} className="text-blue-500" />
          <span className="truncate">
            {t("delivery")}:{" "}
            {contract.delivery?.deliveryLocation || t("noDetails")}
          </span>
        </div>
      </div>
      <div className="mt-auto p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        {isPending ? (
          <>
            <button
              onClick={() => onAccept(contract)}
              className="flex-[2] bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-[13px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 size={16} /> {t("accept")}
            </button>
            <button
              onClick={() => onNegotiate(contract)}
              className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95"
            >
              {t("negotiate")}
            </button>
            <button
              onClick={() => onReject(contract)}
              className="h-[42px] w-[42px] shrink-0 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center active:scale-95"
            >
              <XCircle size={18} />
            </button>
          </>
        ) : isAwaitingSignature ? (
          <button
            onClick={() => onSelectContract(contract)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {t("signContract")} <ChevronRight size={18} />
          </button>
        ) : (
          <div className="w-full text-center">
            <span
              className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase border tracking-widest ${getStatusStyles(contract.status)}`}
            >
              {t(contract.status?.toLowerCase()) || contract.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   MAIN PAGE
   ========================= */
export default function ContractsPage() {
  const { t, i18n } = useTranslation(); // <-- Initialized Translator
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
  const [stats, setStats] = useState({
    totalActive: 0,
    pendingReview: 0,
    inNegotiation: 0,
  });

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
            pendingReview: contractRes.data.contracts.filter(
              (c) => c.status === "SENT",
            ).length,
            inNegotiation: contractRes.data.contracts.filter(
              (c) => c.status === "NEGOTIATING",
            ).length,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 300) setShowScrollTop(true);
    else setShowScrollTop(false);
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    return contracts.filter((c) => {
      const matchesFilter = filter === "ALL" || c.status === filter;
      const matchesSearch =
        (c.buyer?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (c.cropDetails?.cropName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [contracts, filter, searchTerm]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
      <Sidebar onLogout={logout} />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar
          profileData={profileData}
          onOpenProfile={() => setShowProfileModal(true)}
          onLogout={logout}
        />

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 scroll-smooth relative"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-black text-[#064e3b] font-serif tracking-tight">
                  {t("contractPortfolio")}
                </h1>
                <p className="text-slate-500 mt-1 text-[12px] font-medium italic">
                  {t("contractPortfolioDesc")}
                </p>
              </div>

              {/* Language Switcher UI injected seamlessly */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-4 md:mt-6 mx-0 lg:mx-12">
              <StatSummaryCard
                label={t("totalPortfolio")}
                value={stats.totalActive}
                icon={FileText}
                color="blue"
              />
              <StatSummaryCard
                label={t("actionRequired")}
                value={stats.pendingReview}
                icon={AlertCircle}
                color="amber"
              />
              <StatSummaryCard
                label={t("inDiscussion")}
                value={stats.inNegotiation}
                icon={TrendingUp}
                color="indigo"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
              <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200 inline-flex flex-wrap gap-1">
                {[
                  "ALL",
                  "SENT",
                  "NEGOTIATING",
                  "ACCEPTED",
                  "REJECTED",
                  "PENDING_SIGNATURE",
                ].map((id) => (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${filter === id ? "bg-[#064e3b] text-white shadow-lg" : "text-slate-500 hover:text-slate-800 hover:bg-white"}`}
                  >
                    {t(id.toLowerCase()) || id.replace(/_/g, " ")}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[280px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder={
                    t("searchBuyerCrop") || "Search buyer or crop..."
                  }
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="min-h-[400px] mt-6">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 py-24 text-center">
                  <h3 className="text-xl font-bold text-slate-700">
                    {t("noResultsFound")}
                  </h3>
                  <p className="text-slate-400 mt-2 text-[12px]">
                    {t("tryAdjustingSearch")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filtered.map((c) => (
                    <ContractCard
                      key={c._id}
                      contract={c}
                      onAccept={setSelectedContract}
                      onReject={() => {}}
                      onNegotiate={() => {}}
                      onSelectContract={setSelectedContract}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#064e3b] text-white shadow-2xl transition-all duration-300 transform z-50 ${showScrollTop ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}`}
          >
            <ArrowUp size={24} />
          </button>
        </div>
        {selectedContract && (
          <AcceptanceReviewModal
            contract={selectedContract}
            onClose={() => setSelectedContract(null)}
            onSuccess={() => {
              setSelectedContract(null);
              window.location.reload();
            }}
          />
        )}
      </main>
      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />
    </div>
  );
}

function StatSummaryCard({ label, value, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-600 text-blue-100",
    amber: "bg-amber-500 text-amber-100",
    indigo: "bg-indigo-600 text-indigo-100",
  };
  return (
    <div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-3xl font-black text-slate-800">{value}</p>
      </div>
      <div
        className={`h-11 w-11 rounded-xl ${colors[color]} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
      >
        <Icon size={20} />
      </div>
    </div>
  );
}
