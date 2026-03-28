// import React, { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";
// import { Link } from "react-router-dom";
// import {
//   Leaf,
//   Truck,
//   CheckCircle2,
//   IndianRupee,
//   MapPin,
//   User,
// } from "lucide-react";

// export default function HarvestContractTracking() {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   /* ================= FETCH USER ================= */
//   useEffect(() => {
//     api.get("/auth/me").then((res) => setCurrentUser(res.data.user));
//   }, []);

//   /* ================= FETCH CONTRACTS ================= */
//   useEffect(() => {
//     if (!currentUser) return;

//     const endpoint =
//       currentUser.role === "farmer"
//         ? "/harvest-contracts/farmer"
//         : "/harvest-contracts/buyer";

//     api
//       .get(endpoint)
//       .then((res) => {
//         const all = res.data.contracts || [];

//         // ✅ FIX: include PAYMENT_PENDING

//         setContracts(all);
//       })
//       .finally(() => setLoading(false));
//   }, [currentUser]);

//   /* ================= STATS ================= */
//   const stats = useMemo(() => {
//     const activeContracts = contracts.filter((c) =>
//       ["ACTIVE", "PAYMENT_PENDING", "IN_TRANSIT"].includes(c.status)
//     );

//     const completedContracts = contracts.filter(
//       (c) => c.status === "COMPLETED"
//     );

//     const activeValue = activeContracts.reduce(
//       (sum, c) => sum + (c.payment?.amount || 0),
//       0
//     );

//     const completedValue = completedContracts.reduce(
//       (sum, c) => sum + (c.payment?.amount || 0),
//       0
//     );

//     return {
//       activeCount: activeContracts.length,
//       inTransitCount: contracts.filter((c) => c.status === "IN_TRANSIT").length,
//       completedCount: completedContracts.length,

//       activeValue,
//       completedValue,
//       totalValue: activeValue + completedValue,
//     };
//   }, [contracts]);

//   if (loading) return <div className="p-10">Loading…</div>;

//   const isFarmer = currentUser?.role === "farmer";

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-[#1F2933]">
//           {isFarmer
//             ? "Harvest Contracts (Farmer)"
//             : "Harvest Contracts (Buyer)"}
//         </h1>
//         <p className="text-sm text-[#6B7280]">
//           Track payments and deliveries for harvested crops
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatCard title="Active" value={stats.activeCount} icon={<Leaf />} />
//         <StatCard
//           title="In Transit"
//           value={stats.inTransitCount}
//           icon={<Truck />}
//         />
//         <StatCard
//           title="Completed"
//           value={stats.completedCount}
//           icon={<CheckCircle2 />}
//         />
//         <StatCard
//           title="Total Value"
//           value={`₹${stats.totalValue.toLocaleString()}`}
//           icon={<IndianRupee />}
//         />
//       </div>

//       {/* Contracts */}
//       <div className="space-y-5">
//         {contracts.map((c) => {
//           const crop = c.harvestDetails || {};
//           const farmer = c.farmer || {};
//           const buyer = c.buyer || {};
//           const delivery = c.delivery || {};

//           const counterPartyName = isFarmer ? buyer.name : farmer.name;

//           return (
//             <div
//               key={c._id}
//               className="bg-white border border-[#E5E7EB] rounded-2xl p-6"
//             >
//               {/* Top row */}
//               <div className="flex justify-between items-start gap-6">
//                 <div className="flex items-start gap-4">
//                   <div className="h-11 w-11 rounded-xl bg-[#E6F4EA] flex items-center justify-center">
//                     <Leaf className="h-5 w-5 text-[#15803D]" />
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-[#1F2933]">
//                       {crop.cropName}
//                       {crop.variety && (
//                         <span className="text-sm text-[#6B7280]">
//                           {" "}
//                           – {crop.variety}
//                         </span>
//                       )}
//                     </h3>

//                     <p className="text-sm text-[#6B7280]">
//                       {c.contractId} • {crop.quantity} {crop.unit}
//                     </p>

//                     <div className="mt-2 flex items-center gap-4 text-sm text-[#374151]">
//                       <span className="flex items-center gap-1">
//                         <User className="h-4 w-4" />
//                         {counterPartyName}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4" />
//                         {delivery.deliveryLocation || "—"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-xs text-[#6B7280]">Total Value</div>
//                   <div className="text-lg font-semibold text-[#1F2933]">
//                     ₹{c.payment?.amount?.toLocaleString()}
//                   </div>

//                   <StatusBadge status={c.status} />
//                 </div>
//               </div>

//               {/* Info row */}
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <InfoBox
//                   label="Payment"
//                   value={
//                     c.payment?.status === "VERIFIED"
//                       ? "Verified"
//                       : ["MARKED", "PAID"].includes(c.payment?.status)
//                       ? "Pending Verification"
//                       : "Pending"
//                   }
//                   highlight={c.payment?.status === "VERIFIED"}
//                 />

//                 <InfoBox
//                   label="Payment Mode"
//                   value={
//                     c.payment?.mode === "BEFORE_DELIVERY"
//                       ? "Before Delivery"
//                       : "On Delivery"
//                   }
//                 />

//                 <InfoBox
//                   label="Expected Delivery"
//                   value={
//                     delivery.expectedDeliveryDate
//                       ? new Date(delivery.expectedDeliveryDate).toDateString()
//                       : "—"
//                   }
//                 />
//               </div>

//               {/* CTA */}
//               <div className="mt-5 flex justify-end">
//                 <Link
//                   to={`/${isFarmer ? "farmer" : "buyer"}/harvest-contracts/${
//                     c._id
//                   }`}
//                   className="px-5 py-2.5 rounded-lg bg-[#1F6F43] text-white text-sm font-semibold hover:bg-[#185C38]"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ---------------- UI helpers ---------------- */

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between">
//       <div>
//         <p className="text-xs text-[#6B7280]">{title}</p>
//         <p className="text-xl font-semibold mt-1">{value}</p>
//       </div>
//       <div className="h-9 w-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#374151]">
//         {icon}
//       </div>
//     </div>
//   );
// }

// function InfoBox({ label, value, highlight }) {
//   return (
//     <div
//       className={`rounded-xl px-4 py-3 border ${
//         highlight
//           ? "bg-[#ECFDF5] border-[#A7F3D0]"
//           : "bg-[#FAFAFA] border-[#E5E7EB]"
//       }`}
//     >
//       <p className="text-xs text-[#6B7280]">{label}</p>
//       <p className="text-sm font-semibold text-[#1F2933] mt-1">{value}</p>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     ACTIVE: "bg-[#FEF3C7] text-[#92400E]",
//     PAYMENT_PENDING: "bg-[#FFF7ED] text-[#9A3412]",
//     IN_TRANSIT: "bg-[#E0F2FE] text-[#0369A1]",
//     DELIVERED: "bg-[#DCFCE7] text-[#15803D]",
//     COMPLETED: "bg-[#DCFCE7] text-[#15803D]",
//   };

//   return (
//     <span
//       className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
//         map[status] || "bg-gray-100 text-gray-600"
//       }`}
//     >
//       {status.replace("_", " ")}
//     </span>
//   );
// }




// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { Link } from "react-router-dom";
// import {
//   Leaf,
//   Truck,
//   CheckCircle2,
//   IndianRupee,
//   MapPin,
//   User,
// } from "lucide-react";

// export default function HarvestContractTracking() {
//   const [contracts, setContracts] = useState([]);
//   const [stats, setStats] = useState({
//     activeValue: 0,
//     inTransitValue: 0,
//     completedValue: 0,
//     totalValue: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   /* ================= FETCH USER ================= */
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/auth/me");
//         setCurrentUser(res.data.user);
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       } finally {
//         // 🔥 allow page to continue even if user fetch fails
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   /* ================= FETCH CONTRACTS + STATS ================= */

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [contractsRes, statsRes] = await Promise.all([
//           api.get("/harvest-contracts"),
//           api.get("/harvest-contracts/dashboard"),
//         ]);

//         console.log("📦 CONTRACTS RESPONSE:", contractsRes.data);

//         setContracts(contractsRes.data.contracts || []);
//         setStats(statsRes.data.stats);
//       } catch (err) {
//         console.error("Failed to load harvest data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="p-10">Loading…</div>;

//   const isFarmer = currentUser?.role === "farmer";

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-[#1F2933]">
//           {isFarmer
//             ? "Harvest Contracts (Farmer)"
//             : "Harvest Contracts (Buyer)"}
//         </h1>
//         <p className="text-sm text-[#6B7280]">
//           Track payments and deliveries for harvested crops
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatCard
//           title="Active Value"
//           value={`₹${stats.activeValue.toLocaleString()}`}
//           icon={<Leaf />}
//         />
//         <StatCard
//           title="In Transit Value"
//           value={`₹${stats.inTransitValue.toLocaleString()}`}
//           icon={<Truck />}
//         />
//         <StatCard
//           title="Completed Value"
//           value={`₹${stats.completedValue.toLocaleString()}`}
//           icon={<CheckCircle2 />}
//         />
//         <StatCard
//           title="Total Value"
//           value={`₹${stats.totalValue.toLocaleString()}`}
//           icon={<IndianRupee />}
//         />
//       </div>

//       {/* Contracts */}
//       <div className="space-y-5">
//         {contracts.length === 0 ? (
//           <p className="text-gray-500">No harvest contracts found.</p>
//         ) : (
//           contracts.map((c) => {
//             const crop = c.harvestDetails || {};
//             const delivery = c.delivery || {};
//             const counterPartyName = isFarmer ? c.buyer?.name : c.farmer?.name;

//             return (
//               <div
//                 key={c._id}
//                 className="bg-white border border-[#E5E7EB] rounded-2xl p-6"
//               >
//                 {/* Top row */}
//                 <div className="flex justify-between items-start gap-6">
//                   <div className="flex items-start gap-4">
//                     <div className="h-11 w-11 rounded-xl bg-[#E6F4EA] flex items-center justify-center">
//                       <Leaf className="h-5 w-5 text-[#15803D]" />
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold text-[#1F2933]">
//                         {crop.cropName}
//                         {crop.variety && (
//                           <span className="text-sm text-[#6B7280]">
//                             {" "}
//                             – {crop.variety}
//                           </span>
//                         )}
//                       </h3>

//                       <p className="text-sm text-[#6B7280]">
//                         {c.contractId} • {crop.quantity} {crop.unit}
//                       </p>

//                       <div className="mt-2 flex items-center gap-4 text-sm text-[#374151]">
//                         <span className="flex items-center gap-1">
//                           <User className="h-4 w-4" />
//                           {counterPartyName}
//                         </span>

//                         <span className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           {delivery.deliveryLocation || "—"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-right">
//                     <div className="text-xs text-[#6B7280]">Contract Value</div>
//                     <div className="text-lg font-semibold text-[#1F2933]">
//                       ₹{c.payment?.totalAmount?.toLocaleString()}
//                     </div>

//                     <StatusBadge status={c.status} />
//                   </div>
//                 </div>

//                 {/* Info row */}
//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <InfoBox
//                     label="Payment"
//                     value={
//                       c.payment?.status === "VERIFIED"
//                         ? "Verified"
//                         : ["MARKED", "PAID"].includes(c.payment?.status)
//                         ? "Pending Verification"
//                         : "Pending"
//                     }
//                     highlight={c.payment?.status === "VERIFIED"}
//                   />

//                   <InfoBox
//                     label="Payment Mode"
//                     value={
//                       c.payment?.mode === "BEFORE_DELIVERY"
//                         ? "Before Delivery"
//                         : "On Delivery"
//                     }
//                   />

//                   <InfoBox
//                     label="Expected Delivery"
//                     value={
//                       delivery.expectedDeliveryDate
//                         ? new Date(delivery.expectedDeliveryDate).toDateString()
//                         : "—"
//                     }
//                   />
//                 </div>

//                 {/* CTA */}
//                 <div className="mt-5 flex justify-end">
//                   <Link
//                     to={`/${isFarmer ? "farmer" : "buyer"}/harvest-contracts/${
//                       c._id
//                     }`}
//                     className="px-5 py-2.5 rounded-lg bg-[#1F6F43] text-white text-sm font-semibold hover:bg-[#185C38]"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// /* ---------------- UI helpers ---------------- */

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between">
//       <div>
//         <p className="text-xs text-[#6B7280]">{title}</p>
//         <p className="text-xl font-semibold mt-1">{value}</p>
//       </div>
//       <div className="h-9 w-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#374151]">
//         {icon}
//       </div>
//     </div>
//   );
// }

// function InfoBox({ label, value, highlight }) {
//   return (
//     <div
//       className={`rounded-xl px-4 py-3 border ${
//         highlight
//           ? "bg-[#ECFDF5] border-[#A7F3D0]"
//           : "bg-[#FAFAFA] border-[#E5E7EB]"
//       }`}
//     >
//       <p className="text-xs text-[#6B7280]">{label}</p>
//       <p className="text-sm font-semibold text-[#1F2933] mt-1">{value}</p>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const safeStatus = status || "UNKNOWN";

//   const map = {
//     SENT: "bg-[#EEF2FF] text-[#3730A3]",
//     ACCEPTED: "bg-[#FEF3C7] text-[#92400E]",
//     ACTIVE: "bg-[#FEF3C7] text-[#92400E]",
//     PAYMENT_PENDING: "bg-[#FFF7ED] text-[#9A3412]",
//     IN_TRANSIT: "bg-[#E0F2FE] text-[#0369A1]",
//     COMPLETED: "bg-[#DCFCE7] text-[#15803D]",
//     UNKNOWN: "bg-gray-100 text-gray-600",
//   };

//   return (
//     <span
//       className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
//         map[safeStatus] || map.UNKNOWN
//       }`}
//     >
//       {safeStatus.replace(/_/g, " ")}
//     </span>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import {
  Leaf,
  Truck,
  CheckCircle2,
  IndianRupee,
  MapPin,
  User,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

export default function HarvestContractTracking() {
  const [contracts, setContracts] = useState([]);
  const [stats, setStats] = useState({
    activeValue: 0,
    inTransitValue: 0,
    completedValue: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  /* ================= FETCH CONTRACTS + STATS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractsRes, statsRes] = await Promise.all([
          api.get("/harvest-contracts"),
          api.get("/harvest-contracts/dashboard"),
        ]);
        setContracts(contractsRes.data.contracts || []);
        setStats(statsRes.data.stats);
      } catch (err) {
        console.error("Failed to load harvest data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f4f6f8]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const isFarmer = currentUser?.role === "farmer";

  return (
    <div className="flex h-screen bg-[#f4f6f8] font-sans text-slate-800 overflow-hidden">
      {/* SIDEBAR INTEGRATION */}
      <div className="h-full flex-shrink-0 z-30 shadow-2xl bg-white">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col h-full overflow-y-auto relative scroll-smooth">
        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <Topbar profileData={currentUser} />

          {/* Header */}
          <div className="mt-2">
            <h1 className="text-3xl md:text-[38px] font-bold text-[#064e3b] font-serif tracking-tight">
              {isFarmer ? "Harvest Tracking (Farmer)" : "Harvest Tracking (Buyer)"}
            </h1>
            <p className="text-[15px] text-slate-500 mt-2 font-medium italic">
              Real-time monitoring of crop deliveries, transit status, and financial settlements. 🌱
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Active Value"
              value={`₹${stats.activeValue.toLocaleString()}`}
              icon={<Leaf size={24} />}
              color="emerald"
            />
            <StatCard
              title="In Transit"
              value={`₹${stats.inTransitValue.toLocaleString()}`}
              icon={<Truck size={24} />}
              color="blue"
            />
            <StatCard
              title="Completed"
              value={`₹${stats.completedValue.toLocaleString()}`}
              icon={<CheckCircle2 size={24} />}
              color="emerald"
            />
            <StatCard
              title="Total Assets"
              value={`₹${stats.totalValue.toLocaleString()}`}
              icon={<IndianRupee size={24} />}
              color="amber"
            />
          </div>

          {/* Contracts List */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-1">
               <ClipboardList className="text-emerald-600" size={20} />
               <h2 className="text-xl font-bold text-slate-800 font-serif">Monitoring Agreements</h2>
            </div>

            {contracts.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 border-2 border-dashed border-slate-200 text-center">
                <p className="text-slate-400 font-medium text-lg">No active harvest contracts found.</p>
              </div>
            ) : (
              contracts.map((c) => {
                const crop = c.harvestDetails || {};
                const delivery = c.delivery || {};
                const counterPartyName = isFarmer ? c.buyer?.name : c.farmer?.name;

                return (
                  <div
                    key={c._id}
                    className="group bg-white border border-slate-100 rounded-[2rem] p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Visual separation logic */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      <div className="flex items-start gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center shadow-inner">
                          <Leaf className="h-7 w-7 text-[#15803D]" />
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-black text-slate-800 font-serif">
                              {crop.cropName}
                            </h3>
                            {crop.variety && (
                              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-widest">
                                {crop.variety}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-500 font-bold mt-1 tracking-tight">
                            ID: {c.contractId} • {crop.quantity} {crop.unit}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-6 text-[13px] text-slate-600">
                            <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 font-medium">
                              <User size={16} className="text-emerald-600" />
                              <span className="text-slate-400 mr-1">{isFarmer ? "Buyer:" : "Farmer:"}</span> {counterPartyName}
                            </span>

                            <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 font-medium">
                              <MapPin size={16} className="text-rose-500" />
                              {delivery.deliveryLocation || "Location Pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-auto flex lg:flex-col items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0">
                        <div className="text-right">
                          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Contract Value</div>
                          <div className="text-2xl font-black text-[#064e3b] flex items-center justify-end">
                            <IndianRupee size={20} strokeWidth={3} className="mr-0.5" />
                            {c.payment?.totalAmount?.toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-3">
                          <StatusBadge status={c.status} />
                        </div>
                      </div>
                    </div>

                    {/* Lower Info Grid */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-50 pt-6">
                      <InfoBox
                        label="Payment Verification"
                        value={
                          c.payment?.status === "VERIFIED"
                            ? "Verified Secure"
                            : ["MARKED", "PAID"].includes(c.payment?.status)
                            ? "Pending Review"
                            : "Awaiting Action"
                        }
                        highlight={c.payment?.status === "VERIFIED"}
                      />

                      <InfoBox
                        label="Settlement Mode"
                        value={
                          c.payment?.mode === "BEFORE_DELIVERY"
                            ? "Advance Payment"
                            : "Pay on Delivery"
                        }
                      />

                      <InfoBox
                        label="Est. Delivery Date"
                        value={
                          delivery.expectedDeliveryDate
                            ? new Date(delivery.expectedDeliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric'})
                            : "To be scheduled"
                        }
                      />
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-6 flex justify-end">
                      <Link
                        to={`/${isFarmer ? "farmer" : "buyer"}/harvest-contracts/${c._id}`}
                        className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl bg-[#064e3b] text-white text-sm font-black hover:bg-[#059669] transition-all shadow-lg shadow-emerald-100 active:scale-95"
                      >
                        Detailed Tracker <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- UPGRADED UI HELPERS ---------------- */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
          <p className="text-2xl font-black text-slate-800">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-[#f8fafc] text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 border transition-all ${
        highlight
          ? "bg-emerald-50/50 border-emerald-100 shadow-sm"
          : "bg-slate-50/50 border-slate-100"
      }`}
    >
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className={`text-sm font-bold mt-1.5 ${highlight ? "text-emerald-700" : "text-slate-700"}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const safeStatus = status || "UNKNOWN";

  const map = {
    SENT: "bg-indigo-100 text-indigo-700 border-indigo-200",
    ACCEPTED: "bg-amber-100 text-amber-700 border-amber-200",
    ACTIVE: "bg-amber-100 text-amber-700 border-amber-200",
    PAYMENT_PENDING: "bg-orange-100 text-orange-700 border-orange-200",
    IN_TRANSIT: "bg-sky-100 text-sky-700 border-sky-200",
    COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    UNKNOWN: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
        map[safeStatus] || map.UNKNOWN
      }`}
    >
      {safeStatus.replace(/_/g, " ")}
    </span>
  );
}