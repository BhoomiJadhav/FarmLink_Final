// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowRight,
//   Leaf,
//   Zap,
//   User,
//   ShoppingBag,
//   Hash,
//   Activity,
//   Search,
//   Truck,
//   CheckCircle2,
//   MapPin,
//   Banknote,
//   CalendarDays,
// } from "lucide-react";
// import axios from "../../api/axios";
// import Sidebar from "../../components/Sidebar"; // farmer
// import BuyerSidebar from "../../components/BuyerSidebar"; // buyer
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/profileModal.jsx";

// const ActiveContracts = () => {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");

//   // Navbar & Modal States
//   const [profileData, setProfileData] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const isFarmer = profileData?.user?.role === "farmer";
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchActiveContracts();
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("/profile/me");
//       setProfileData(res.data);
//     } catch (error) {
//       console.error("Failed to load profile for Topbar:", error);
//     }
//   };

//   const fetchActiveContracts = async () => {
//     try {
//       const res = await axios.get("/contracts/active");
//       setContracts(res.data.contracts || []);
//     } catch (error) {
//       console.error("Failed to fetch active contracts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   const getStatusConfig = (status) => {
//     const s = status?.toUpperCase() || "";
//     if (s.includes("ACTIVE"))
//       return {
//         bg: "bg-[#064e3b]",
//         text: "text-white",
//         icon: <Activity size={12} />,
//       };
//     if (s.includes("DELIVERY") || s.includes("TRANSIT"))
//       return {
//         bg: "bg-[#0369a1]",
//         text: "text-white",
//         icon: <Truck size={12} />,
//       };
//     if (s.includes("COMPLETED"))
//       return {
//         bg: "bg-[#15803d]",
//         text: "text-white",
//         icon: <CheckCircle2 size={12} />,
//       };
//     if (s.includes("SENT") || s.includes("PENDING"))
//       return {
//         bg: "bg-[#b45309]",
//         text: "text-white",
//         icon: <Zap size={12} />,
//       };
//     return {
//       bg: "bg-slate-700",
//       text: "text-white",
//       icon: <Activity size={12} />,
//     };
//   };

//   const filteredContracts = useMemo(() => {
//     return contracts.filter((c) => {
//       const cropName = (
//         c.cropDetails?.cropName ||
//         c.crop?.name ||
//         ""
//       ).toLowerCase();
//       const variety = (
//         c.cropDetails?.variety ||
//         c.crop?.variety ||
//         ""
//       ).toLowerCase();
//       const buyerName = (c.buyer?.name || "").toLowerCase();
//       const search = searchTerm.toLowerCase();
//       const matchesSearch =
//         cropName.includes(search) ||
//         variety.includes(search) ||
//         buyerName.includes(search);
//       const matchesStatus =
//         statusFilter === "ALL" ||
//         (c.contractStatus || c.status) === statusFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [contracts, searchTerm, statusFilter]);

//   if (loading)
//     return (
//       <div className="flex h-screen items-center justify-center bg-[#f4f6f8]">
//         <div className="w-12 h-12 border-4 border-[#064e3b] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   return (
//     <div className="flex h-screen bg-[#f4f6f8] font-sans text-slate-800 overflow-hidden">
//       <div className="h-full flex-shrink-0 z-40 shadow-2xl bg-white">
//         {isFarmer ? (
//           <Sidebar onLogout={logout} />
//         ) : (
//           <BuyerSidebar onLogout={logout} />
//         )}
//       </div>

//       <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#f4f6f8] flex flex-col">
//         {/* TOPBAR */}
//         <div className="flex-shrink-0 z-50">
//           <Topbar
//             profileData={profileData}
//             onOpenProfile={() => setShowProfileModal(true)}
//             onLogout={logout}
//           />
//         </div>

//         {/* SEARCH & FILTER BAR */}
//         <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-6 mt-4 relative z-30">
//           <div className="bg-white p-3 rounded-[1.2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 items-center">
//             <div className="relative flex-1 w-full">
//               <Search
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
//                 size={16}
//               />
//               <input
//                 type="text"
//                 placeholder="Search Cultivation Contracts..."
//                 className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all text-xs font-black uppercase tracking-widest text-slate-800"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-2 w-full md:w-auto">
//               <select
//                 className="w-full md:w-[160px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-800 focus:outline-none cursor-pointer hover:border-emerald-400 transition-colors"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="ALL">All Status</option>
//                 <option value="ACTIVE">Active</option>
//                 <option value="FROZEN">Frozen</option>
//                 <option value="COMPLETED">Completed</option>
//                 <option value="CANCELLED">Cancelled</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* CONTRACTS GRID - 3 Column Layout */}
//         <div className="max-w-[1600px] mx-auto w-full px-4 lg:px-6 mt-6 pb-10 relative z-20">
//           {/* ✅ CHANGED TO 3 COLUMNS: lg:grid-cols-3 */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredContracts.map((contract) => {
//               const config = getStatusConfig(
//                 contract.contractStatus || contract.status,
//               );

//               return (
//                 <div
//                   key={contract._id}
//                   className="group relative bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
//                 >
//                   {/* Status Badge */}
//                   <div className="absolute top-0 right-0">
//                     <span
//                       className={`flex items-center gap-1.5 text-[9px] font-black px-3 py-1.5 rounded-tr-[1.5rem] rounded-bl-xl uppercase ${config.bg} ${config.text} tracking-widest shadow-sm`}
//                     >
//                       {config.icon}
//                       {(contract.contractStatus || contract.status)?.replace(
//                         /_/g,
//                         " ",
//                       )}
//                     </span>
//                   </div>

//                   {/* Crop Header */}
//                   <div className="mb-2 pr-20">
//                     <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1 truncate">
//                       {contract.cropDetails?.cropName || "Crop Name"}
//                     </h3>
//                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">
//                       {contract.cropDetails?.variety || "Standard Variety"}
//                     </p>
//                   </div>

//                   {/* ID & Expected Yield */}
//                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">
//                     <span className="flex items-center gap-1 text-slate-600">
//                       <Hash size={10} /> CULT-
//                       {contract._id.slice(-8).toUpperCase()}
//                     </span>
//                     <span>•</span>
//                     <span className="text-emerald-600 truncate">
//                       {contract.cropDetails?.expectedYield || "--"} Expected
//                       Yield
//                     </span>
//                   </div>

//                   {/* Counterparty Information */}
//                   <div className="mb-5">
//                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
//                       {isFarmer ? (
//                         <ShoppingBag size={12} />
//                       ) : (
//                         <User size={12} />
//                       )}
//                       {isFarmer ? "Buyer Details" : "Farmer Details"}
//                     </p>
//                     <p className="text-sm font-black text-slate-900 leading-tight truncate">
//                       {isFarmer
//                         ? contract.buyer?.name || "Verified Buyer"
//                         : contract.farmer?.name || "Verified Farmer"}
//                     </p>
//                     <div className="flex items-start gap-1 mt-1.5 text-[10px] font-bold text-slate-500">
//                       <MapPin
//                         size={12}
//                         className="text-rose-500 shrink-0 mt-0.5"
//                       />
//                       <p className="leading-snug truncate whitespace-normal line-clamp-1">
//                         {isFarmer
//                           ? contract.buyer?.address ||
//                             "Address details unavailable"
//                           : contract.farmer?.address ||
//                             "Address details unavailable"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Financials & Logistics Grid */}
//                   <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
//                     {/* Contract Value */}
//                     <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100/50">
//                       <p className="text-[8px] font-black text-emerald-600/70 uppercase tracking-widest mb-1">
//                         Contract Value
//                       </p>
//                       <p className="text-[13px] font-black text-emerald-700 flex items-center gap-1">
//                         <Banknote size={14} /> ₹
//                         {(
//                           contract.pricing?.estimatedValue ||
//                           contract.pricing?.agreedPricePerUnit ||
//                           "--"
//                         ).toLocaleString()}
//                       </p>
//                     </div>

//                     {/* Payment Verification */}
//                     <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
//                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
//                         Pmt Verification
//                       </p>
//                       <p
//                         className={`text-[9px] font-black px-2 py-0.5 rounded w-fit uppercase tracking-widest ${
//                           contract.payments &&
//                           contract.payments.length > 0 &&
//                           contract.payments[0].status === "VERIFIED"
//                             ? "bg-emerald-100/50 text-emerald-700"
//                             : "bg-amber-100/50 text-amber-700"
//                         }`}
//                       >
//                         {contract.payments && contract.payments.length > 0
//                           ? contract.payments[0].status
//                           : "Awaiting Action"}
//                       </p>
//                     </div>

//                     {/* Settlement Mode */}
//                     <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
//                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
//                         Settlement Mode
//                       </p>
//                       <p className="text-[10px] font-black text-slate-800 leading-tight">
//                         {contract.pricing?.advancePaymentPercent
//                           ? `${contract.pricing.advancePaymentPercent}% Advance`
//                           : "Milestone Based"}
//                       </p>
//                     </div>

//                     {/* Est. Delivery */}
//                     <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
//                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
//                         Est. Delivery Date
//                       </p>
//                       <p className="text-[10px] font-black text-slate-800 leading-tight flex items-center gap-1.5">
//                         <CalendarDays
//                           size={12}
//                           className="text-blue-600 shrink-0"
//                         />
//                         <span className="truncate">
//                           {contract.delivery?.approxDeliveryMonth ||
//                             "Not Scheduled"}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   <div className="mt-auto">
//                     <button
//                       onClick={() => navigate(`/contracts/${contract._id}`)}
//                       className="w-full flex items-center justify-center gap-2 py-3 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-slate-200 group active:scale-95"
//                     >
//                       Track Details
//                       <ArrowRight
//                         size={14}
//                         className="group-hover:translate-x-1 transition-transform"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </main>

//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         profileData={profileData}
//       />
//     </div>
//   );
// };

// export default ActiveContracts;
import React, { useEffect, useState, useMemo } from "react";
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
} from "lucide-react";
import axios from "../../api/axios";
import Sidebar from "../../components/Sidebar"; // farmer
import BuyerSidebar from "../../components/BuyerSidebar"; // buyer
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import { useTranslation } from "react-i18next"; // <-- Added Translation Hook

const ActiveContracts = () => {
  const { t, i18n } = useTranslation(); // <-- Initialized Translator
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Navbar & Modal States
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const isFarmer = profileData?.user?.role === "farmer";
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveContracts();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/profile/me");
      setProfileData(res.data);
    } catch (error) {
      console.error("Failed to load profile for Topbar:", error);
    }
  };

  const fetchActiveContracts = async () => {
    try {
      const res = await axios.get("/contracts/active");
      setContracts(res.data.contracts || []);
    } catch (error) {
      console.error("Failed to fetch active contracts", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getStatusConfig = (status) => {
    const s = status?.toUpperCase() || "";
    if (s.includes("ACTIVE"))
      return {
        bg: "bg-[#064e3b]",
        text: "text-white",
        icon: <Activity size={12} />,
      };
    if (s.includes("DELIVERY") || s.includes("TRANSIT"))
      return {
        bg: "bg-[#0369a1]",
        text: "text-white",
        icon: <Truck size={12} />,
      };
    if (s.includes("COMPLETED"))
      return {
        bg: "bg-[#15803d]",
        text: "text-white",
        icon: <CheckCircle2 size={12} />,
      };
    if (s.includes("SENT") || s.includes("PENDING"))
      return {
        bg: "bg-[#b45309]",
        text: "text-white",
        icon: <Zap size={12} />,
      };
    return {
      bg: "bg-slate-700",
      text: "text-white",
      icon: <Activity size={12} />,
    };
  };

  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const cropName = (
        c.cropDetails?.cropName ||
        c.crop?.name ||
        ""
      ).toLowerCase();
      const variety = (
        c.cropDetails?.variety ||
        c.crop?.variety ||
        ""
      ).toLowerCase();
      const buyerName = (c.buyer?.name || "").toLowerCase();
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        cropName.includes(search) ||
        variety.includes(search) ||
        buyerName.includes(search);
      const matchesStatus =
        statusFilter === "ALL" ||
        (c.contractStatus || c.status) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contracts, searchTerm, statusFilter]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#f4f6f8]">
        <div className="w-12 h-12 border-4 border-[#064e3b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#f4f6f8] font-sans text-slate-800 overflow-hidden">
      <div className="h-full flex-shrink-0 z-40 shadow-2xl bg-white">
        {isFarmer ? (
          <Sidebar onLogout={logout} />
        ) : (
          <BuyerSidebar onLogout={logout} />
        )}
      </div>

      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#f4f6f8] flex flex-col">
        {/* TOPBAR */}
        <div className="flex-shrink-0 z-50">
          <Topbar
            profileData={profileData}
            onOpenProfile={() => setShowProfileModal(true)}
            onLogout={logout}
          />
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-6 mt-4 relative z-30">
          <div className="bg-white p-3 rounded-[1.2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                size={16}
              />
              <input
                type="text"
                placeholder={
                  t("searchCultivationContracts") ||
                  "Search Cultivation Contracts..."
                }
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all text-xs font-black uppercase tracking-widest text-slate-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                className="w-full md:w-[160px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-800 focus:outline-none cursor-pointer hover:border-emerald-400 transition-colors"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">{t("allStatus") || "All Status"}</option>
                <option value="ACTIVE">{t("active") || "Active"}</option>
                <option value="FROZEN">{t("frozen") || "Frozen"}</option>
                <option value="COMPLETED">
                  {t("completed") || "Completed"}
                </option>
                <option value="CANCELLED">
                  {t("cancelled") || "Cancelled"}
                </option>
              </select>

              {/* Language Switcher UI injected seamlessly */}
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 h-full">
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    i18n.language === "en"
                      ? "bg-[#064e3b] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage("hi")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    i18n.language === "hi"
                      ? "bg-[#064e3b] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => i18n.changeLanguage("mar")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    i18n.language === "mr"
                      ? "bg-[#064e3b] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTRACTS GRID - 3 Column Layout */}
        <div className="max-w-[1600px] mx-auto w-full px-4 lg:px-6 mt-6 pb-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract) => {
              const config = getStatusConfig(
                contract.contractStatus || contract.status,
              );
              const statusRaw =
                contract.contractStatus || contract.status || "";

              return (
                <div
                  key={contract._id}
                  className="group relative bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Status Badge */}
                  <div className="absolute top-0 right-0">
                    <span
                      className={`flex items-center gap-1.5 text-[9px] font-black px-3 py-1.5 rounded-tr-[1.5rem] rounded-bl-xl uppercase ${config.bg} ${config.text} tracking-widest shadow-sm`}
                    >
                      {config.icon}
                      {t(statusRaw.toLowerCase()) ||
                        statusRaw.replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Crop Header */}
                  <div className="mb-2 pr-20">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1 truncate">
                      {contract.cropDetails?.cropName || t("cropName")}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">
                      {contract.cropDetails?.variety ||
                        t("standardVariety") ||
                        "Standard Variety"}
                    </p>
                  </div>

                  {/* ID & Expected Yield */}
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Hash size={10} /> CULT-
                      {contract._id.slice(-8).toUpperCase()}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600 truncate">
                      {contract.cropDetails?.expectedYield || "--"}{" "}
                      {t("expectedYield")}
                    </span>
                  </div>

                  {/* Counterparty Information */}
                  <div className="mb-5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      {isFarmer ? (
                        <ShoppingBag size={12} />
                      ) : (
                        <User size={12} />
                      )}
                      {isFarmer
                        ? t("buyerDetails") || "Buyer Details"
                        : t("farmerDetails") || "Farmer Details"}
                    </p>
                    <p className="text-sm font-black text-slate-900 leading-tight truncate">
                      {isFarmer
                        ? contract.buyer?.name || t("verifiedBuyer")
                        : contract.farmer?.name || t("verifiedFarmer")}
                    </p>
                    <div className="flex items-start gap-1 mt-1.5 text-[10px] font-bold text-slate-500">
                      <MapPin
                        size={12}
                        className="text-rose-500 shrink-0 mt-0.5"
                      />
                      <p className="leading-snug truncate whitespace-normal line-clamp-1">
                        {isFarmer
                          ? contract.buyer?.address || t("addressUnavailable")
                          : contract.farmer?.address || t("addressUnavailable")}
                      </p>
                    </div>
                  </div>

                  {/* Financials & Logistics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
                    {/* Contract Value */}
                    <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100/50">
                      <p className="text-[8px] font-black text-emerald-600/70 uppercase tracking-widest mb-1">
                        {t("contractValue")}
                      </p>
                      <p className="text-[13px] font-black text-emerald-700 flex items-center gap-1">
                        <Banknote size={14} /> ₹
                        {(
                          contract.pricing?.estimatedValue ||
                          contract.pricing?.agreedPricePerUnit ||
                          "--"
                        ).toLocaleString()}
                      </p>
                    </div>

                    {/* Payment Verification */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {t("pmtVerification") || "Pmt Verification"}
                      </p>
                      <p
                        className={`text-[9px] font-black px-2 py-0.5 rounded w-fit uppercase tracking-widest ${
                          contract.payments &&
                          contract.payments.length > 0 &&
                          contract.payments[0].status === "VERIFIED"
                            ? "bg-emerald-100/50 text-emerald-700"
                            : "bg-amber-100/50 text-amber-700"
                        }`}
                      >
                        {contract.payments && contract.payments.length > 0
                          ? t(contract.payments[0].status?.toLowerCase()) ||
                            contract.payments[0].status
                          : t("awaitingAction") || "Awaiting Action"}
                      </p>
                    </div>

                    {/* Settlement Mode */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {t("settlementMode")}
                      </p>
                      <p className="text-[10px] font-black text-slate-800 leading-tight">
                        {contract.pricing?.advancePaymentPercent
                          ? `${contract.pricing.advancePaymentPercent}% ${t("advance") || "Advance"}`
                          : t("milestoneBased") || "Milestone Based"}
                      </p>
                    </div>

                    {/* Est. Delivery */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {t("estDeliveryDate")}
                      </p>
                      <p className="text-[10px] font-black text-slate-800 leading-tight flex items-center gap-1.5">
                        <CalendarDays
                          size={12}
                          className="text-blue-600 shrink-0"
                        />
                        <span className="truncate">
                          {contract.delivery?.approxDeliveryMonth
                            ? t(
                                contract.delivery?.approxDeliveryMonth.toLowerCase(),
                              ) || contract.delivery?.approxDeliveryMonth
                            : t("notScheduled") || "Not Scheduled"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/contracts/${contract._id}`)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-slate-200 group active:scale-95"
                    >
                      {t("trackDetails") || "Track Details"}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />
    </div>
  );
};

export default ActiveContracts;
