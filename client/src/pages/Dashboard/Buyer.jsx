// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useParams, NavLink } from "react-router-dom";
// import {
//   LogOut,
//   Users,
//   FileText,
//   DollarSign,
//   BarChart3,
//   Settings,
//   Loader2,
//   Search,
//   CheckCircle2,
//   MessageSquare,
//   TrendingUp,
//   ArrowUpRight,
//   Truck,
// } from "lucide-react";
// import FarmerList from "./FarmerList";
// import api from "../../api/axios";
// import Topbar from "../../components/topNav.jsx";
// const API_BASE =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// /* -------------------------------------------------------------------------- */
// /* ORIGINAL DEMO DATA                                                         */
// /* -------------------------------------------------------------------------- */
// const DEMO_STATS = {
//   totalContracts: 32,
//   pendingRequests: 6,
//   completedDeals: 22,
//   activeNegotiations: 4,
//   avgWheatPrice: "₹2,180/Q",
//   totalFarmers: 1240,
//   activeListings: 856,
//   monthVolume: "45,000 Q",
// };

// const DEMO_RECENT_PURCHASES = [
//   {
//     id: "p1",
//     crop: "Wheat",
//     farmer: "Ramesh Kumar",
//     price: "₹2,200/Q",
//     qtyLabel: "500 Quintals",
//     status: "delivered",
//   },
//   {
//     id: "p2",
//     crop: "Rice (Basmati)",
//     farmer: "Sunil Sharma",
//     price: "₹3,500/Q",
//     qtyLabel: "300 Quintals",
//     status: "in-transit",
//   },
//   {
//     id: "p3",
//     crop: "Cotton",
//     farmer: "Vijay Patel",
//     price: "₹6,800/Q",
//     qtyLabel: "200 Quintals",
//     status: "processing",
//   },
// ];

// const DEMO_TOP_FARMERS = [
//   { id: "f1", name: "Ramesh Kumar", state: "Punjab", rating: 4.8, deals: 24 },
//   { id: "f2", name: "Sunil Sharma", state: "Haryana", rating: 4.7, deals: 18 },
//   { id: "f3", name: "Vijay Patel", state: "Gujarat", rating: 4.9, deals: 32 },
// ];

// const DEMO_MARKET_TICKER = [
//   { name: "Cotton", price: "₹6,800", change: "+3.5%" },
//   { name: "Soybean", price: "₹4,200", change: "-0.8%" },
//   { name: "Mustard", price: "₹5,400", change: "+1.8%" },
//   { name: "Corn", price: "₹1,800", change: "+2.3%" },
//   { name: "Barley", price: "₹1,650", change: "-1.1%" },
//   { name: "Wheat", price: "₹2,200", change: "+5.2%" },
// ];

// /* -------------------------------------------------------------------------- */
// /* INTERNAL SIDEBAR                                                           */
// /* -------------------------------------------------------------------------- */

// // function AppLayout({ children, profileData }) {
// //   const [profile, setProfile] = useState(null);

// //   useEffect(() => {
// //     async function loadProfile() {
// //       try {
// //         const res = await api.get("/profile/me");
// //         setProfile(res.data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     }

// //     loadProfile();
// //   }, []);
//   return (
//     <div className="flex min-h-screen bg-[#fbf9f6]">
//       <Sidebar />
//       <main className="flex-1 p-6 overflow-y-auto">
//         <Topbar
//           profileData={profile}
//           onLogout={() => {
//             localStorage.clear();
//             window.location.href = "/login";
//           }}
//         />

//         <div className="mt-6">{children}</div>
//       </main>
//       <MarketTicker />
//     </div>
//   );
// }

// function Header() {
//   const [openNotif, setOpenNotif] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   useEffect(() => {
//     api.get("/notifications").then((res) => {
//       const unread = res.data.notifications.filter((n) => !n.read).length;
//       setUnreadCount(unread);
//     });
//   }, []);

//   return (
//     <aside className="w-64 h-full flex flex-col bg-[#0f172a] text-white border-r border-slate-800">
//       <div className="px-6 py-8 flex items-center gap-3">
//         <div className="h-10 w-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-lg">
//           <img src={farmlinkLogo} alt="logo" className="object-contain" />
//         </div>
//         <div>
//           <div className="text-lg font-bold text-white tracking-tighter leading-none">
//             Farm<span className="text-indigo-400">Link</span>
//           </div>
//           <div className="text-[9px] uppercase font-bold text-indigo-500 tracking-widest mt-1">
//             Buyer Portal
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
//         <NavLink to="/buyer/dashboard" className={linkStyle}>
//           <BarChart3 size={18} /> Dashboard
//         </NavLink>
//         <NavLink to="/buyer/farmers" className={linkStyle}>
//           <Users size={18} /> Farmer Listings
//         </NavLink>
//         <NavLink to="/buyer/contracts" className={linkStyle}>
//           <FileText size={18} /> My Contracts
//         </NavLink>
//         <NavLink to="/buyer/harvest-contract-tracking/" className={linkStyle}>
//           <Truck size={18} /> Track Contracts
//         </NavLink>
//         <NavLink to="/buyer/payments" className={linkStyle}>
//           <DollarSign size={18} /> Payments
//         </NavLink>
//         <NavLink to="/buyer/settings" className={linkStyle}>
//           <Settings size={18} /> Settings
//         </NavLink>
//       </nav>

//       <div className="px-4 py-6 border-t border-slate-800">
//         <div className="flex items-center gap-3 px-2">
//           <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[11px] font-black shadow-lg">
//             {getInitials(profileData?.name)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="text-sm font-bold text-white truncate leading-tight">
//               {profileData?.name || "Arjun Mehta"}
//             </div>
//             <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
//               Buyer
//             </div>
//           </div>
//           <button
//             onClick={onLogout}
//             title="Logout"
//             className="p-2 rounded-lg text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all flex items-center justify-center shrink-0"
//           >
//             <LogOut size={18} />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* LAYOUT WRAPPER                                                             */
// /* -------------------------------------------------------------------------- */

// function AppLayout({ children, profileData, onOpenProfile, onLogout }) {
//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
//       {" "}
//       {/* Background set to light slate for contrast */}
//       <div className="h-full flex-shrink-0 z-40">
//         <Sidebar onLogout={onLogout} profileData={profileData} />
//       </div>
//       <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
//         <div className="flex-shrink-0 z-50">
//           <Topbar
//             profileData={profileData}
//             onOpenProfile={onOpenProfile}
//             onLogout={onLogout}
//           />
//         </div>

//         <div className="flex-1 overflow-y-auto pt-4 pb-6 pl-6 pr-12 scroll-smooth">
//           <div className="max-w-[1400px]">{children}</div>
//         </div>
//         <MarketTicker />
//       </main>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* DASHBOARD PAGE CONTENT                                                     */
// /* -------------------------------------------------------------------------- */

// function DashboardPageStatic() {
//   const stats = DEMO_STATS;

//   return (
//     <div className="space-y-4">
//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//         <LargeStatCard
//           label="Total Contracts"
//           value={stats.totalContracts}
//           trend="+15%"
//           iconBadge="📄"
//         />
//         <LargeStatCard
//           label="Pending Requests"
//           value={stats.pendingRequests}
//           trend="3%"
//           negative
//           iconBadge="⏳"
//         />
//         <LargeStatCard
//           label="Completed Deals"
//           value={stats.completedDeals}
//           trend="+25%"
//           positive
//           iconBadge="✅"
//         />
//         <LargeStatCard
//           label="Active Negotiations"
//           value={stats.activeNegotiations}
//           trend=""
//           iconBadge="💬"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
//         {/* RECENT PURCHASES */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-bold text-lg text-slate-800">
//               Recent Purchases
//             </h3>
//             <button className="text-xs text-indigo-600 font-bold hover:underline">
//               View All
//             </button>
//           </div>
//           <div className="space-y-2.5">
//             {DEMO_RECENT_PURCHASES.map((r) => (
//               <div
//                 key={r.id}
//                 className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 text-indigo-700 flex items-center justify-center font-black text-lg shadow-sm shrink-0">
//                     {r.crop[0]}
//                   </div>
//                   <div>
//                     <div className="font-bold text-sm text-slate-800 leading-tight">
//                       {r.crop}
//                     </div>
//                     <div className="text-[11px] text-slate-500 font-medium">
//                       {r.farmer}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-black text-sm text-slate-800 leading-tight">
//                     {r.price}
//                   </div>
//                   <div className="text-[10px] text-slate-400 font-bold uppercase">
//                     {r.qtyLabel}
//                   </div>
//                 </div>
//                 <StatusBadge status={r.status} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TOP FARMERS */}
//         <aside className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-bold text-lg text-slate-800">Top Farmers</h3>
//             <button className="text-xs text-indigo-600 font-bold hover:underline">
//               View All
//             </button>
//           </div>
//           <div className="space-y-2.5">
//             {DEMO_TOP_FARMERS.map((f) => (
//               <div
//                 key={f.id}
//                 className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
//                     {f.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .slice(0, 2)
//                       .join("")}
//                   </div>
//                   <div>
//                     <div className="font-bold text-sm text-slate-800 leading-tight">
//                       {f.name}
//                     </div>
//                     <div className="text-[11px] text-slate-500 font-bold uppercase">
//                       {f.state}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm text-indigo-700 font-black leading-tight">
//                     {f.rating}{" "}
//                     <span className="text-[10px] text-slate-400 font-normal">
//                       ↗
//                     </span>
//                   </div>
//                   <div className="text-[10px] text-slate-400 font-bold">
//                     {f.deals} deals
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>

//       {/* INSIGHTS */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-2">
//         <InsightCard
//           title="Avg. Wheat Price"
//           value={stats.avgWheatPrice}
//           trend="+2.5%"
//         />
//         <InsightCard
//           title="Total Farmers"
//           value={stats.totalFarmers}
//           trend="+12%"
//         />
//         <InsightCard
//           title="Active Listings"
//           value={stats.activeListings}
//           trend="+8%"
//         />
//         <InsightCard
//           title="Month Volume"
//           value={stats.monthVolume}
//           trend="+18%"
//         />
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* UI COMPONENTS                                                              */
// /* -------------------------------------------------------------------------- */

// function LargeStatCard({ label, value, trend, negative, iconBadge }) {
//   return (
//     <div className="bg-white p-4 rounded-2xl mr-6 ml-6 shadow-sm border border-slate-200 flex items-center justify-between group hover:border-indigo-400 transition-all">
//       <div className="flex flex-col justify-center">
//         <p className="text-[12px] text-slate-500 font-bold uppercase tracking-wider leading-none">
//           {label}
//         </p>
//         <p className="text-2xl font-black mt-2 text-slate-800 leading-none">
//           {value}
//         </p>
//         {trend && (
//           <p
//             className={`text-[12px] mt-2 font-black leading-none ${negative ? "text-rose-600" : "text-emerald-600"}`}
//           >
//             {trend}
//           </p>
//         )}
//       </div>
//       <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg shadow-inner group-hover:bg-indigo-100 transition-colors">
//         <span className="opacity-90">{iconBadge}</span>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     delivered: "bg-emerald-100 text-emerald-700",
//     "in-transit": "bg-amber-100 text-amber-700",
//     processing: "bg-slate-200 text-slate-700",
//   };
//   return (
//     <div
//       className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${map[status] || "bg-gray-100"}`}
//     >
//       {status}
//     </div>
//   );
// }

// function InsightCard({ title, value, trend }) {
//   return (
//     <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
//       <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest leading-none">
//         {title}
//       </p>
//       <p className="text-xl font-black mt-1.5 text-slate-800 leading-none">
//         {value}
//       </p>
//       {trend && (
//         <p className="text-[12px] text-emerald-600 font-bold mt-1.5">{trend}</p>
//       )}
//     </div>
//   );
// }

// function MarketTicker() {
//   return (
//     <div className="h-10 bg-[#0f172a] text-white py-2 px-6 flex items-center gap-8 overflow-x-auto no-scrollbar fixed bottom-0 left-64 right-0 z-50 border-t border-slate-800">
//       <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border-r border-slate-700 pr-4">
//         Market Live
//       </div>
//       <div className="flex gap-8">
//         {DEMO_MARKET_TICKER.map((t) => (
//           <div
//             key={t.name}
//             className="flex items-center gap-3 whitespace-nowrap text-[11px]"
//           >
//             <span className="font-bold text-slate-400">{t.name}</span>
//             <span className="font-mono text-white">{t.price}</span>
//             <span
//               className={
//                 t.change.startsWith("+")
//                   ? "text-emerald-400 font-bold"
//                   : "text-rose-400 font-bold"
//               }
//             >
//               {t.change}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function BuyerDashboard() {
//   const [profileData, setProfileData] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   useEffect(() => {
//     async function loadBuyerProfile() {
//       try {
//         const res = await api.get("/profile/me");
//         setProfileData(res.data);
//       } catch (err) {
//         console.error("Profile load failed", err);
//       }
//     }
//     loadBuyerProfile();
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <>
//       <Routes>
//         <Route
//           path="dashboard"
//           element={
//             <AppLayout
//               profileData={profileData}
//               onOpenProfile={() => setShowProfileModal(true)}
//               onLogout={logout}
//             >
//               <DashboardPageStatic />
//             </AppLayout>
//           }
//         />
//         <Route
//           path="farmers"
//           element={
//             <AppLayout
//               profileData={profileData}
//               onOpenProfile={() => setShowProfileModal(true)}
//               onLogout={logout}
//             >
//               <FarmerList />
//             </AppLayout>
//           }
//         />
//       </Routes>
//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         profileData={profileData}
//       />
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import Sidebar from "../../components/BuyerSidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import { useNavigate } from "react-router-dom";
// import { FileText, MessageSquare, CheckCircle2, Timer } from "lucide-react";

// /* ---------- STAT CARD ---------- */
// function StatCard({ title, value, icon: Icon }) {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
//       <div>
//         <p className="text-[11px] font-bold text-slate-400 uppercase">
//           {title}
//         </p>
//         <h2 className="text-2xl font-black text-[#064e3b]">{value}</h2>
//       </div>
//       <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
//         <Icon size={20} />
//       </div>
//     </div>
//   );
// }

// /* ---------- MAIN DASHBOARD ---------- */
// export default function BuyerDashboard() {
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState(null);
//   const [contracts, setContracts] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     active: 0,
//     negotiating: 0,
//   });

//   /* ---------- LOAD PROFILE ---------- */
//   useEffect(() => {
//     async function loadProfile() {
//       try {
//         const res = await api.get("/profile/me");
//         setProfileData(res.data);

//         const allContracts = res.data?.contracts || [];

//         setContracts(allContracts);

//         setStats({
//           total: allContracts.length,
//           pending: allContracts.filter((c) => c.status === "PENDING").length,
//           active: allContracts.filter((c) =>
//             ["ACTIVE", "ACCEPTED"].includes(c.status),
//           ).length,
//           negotiating: allContracts.filter((c) => c.status === "NEGOTIATING")
//             .length,
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     loadProfile();
//   }, []);

//   /* ---------- LOGOUT ---------- */
//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="flex h-screen bg-[#f4f6f8] overflow-hidden">
//       {/* SIDEBAR */}
//       <Sidebar onLogout={logout} />

//       {/* MAIN */}
//       <main className="flex-1 flex flex-col overflow-hidden">
//         {/* ✅ TOPBAR (FIXED) */}
//         <Topbar profileData={profileData} onLogout={logout} />

//         {/* CONTENT */}
//         <div className="p-6 space-y-6 overflow-y-auto">
//           {/* HEADER */}
//           <div>
//             <h1 className="text-2xl font-bold text-[#064e3b]">
//               Welcome back, {profileData?.user?.name || "Buyer"}
//             </h1>
//             <p className="text-sm text-slate-500">
//               Manage your contracts and track deals easily.
//             </p>
//           </div>

//           {/* STATS */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <StatCard
//               title="Total Contracts"
//               value={stats.total}
//               icon={FileText}
//             />
//             <StatCard title="Pending" value={stats.pending} icon={Timer} />
//             <StatCard
//               title="Active Deals"
//               value={stats.active}
//               icon={CheckCircle2}
//             />
//             <StatCard
//               title="Negotiations"
//               value={stats.negotiating}
//               icon={MessageSquare}
//             />
//           </div>

//           {/* QUICK ACTIONS */}
//           <div className="bg-white p-5 rounded-xl shadow-sm border">
//             <h2 className="font-bold text-lg mb-4 text-[#064e3b]">
//               Quick Actions
//             </h2>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <button
//                 onClick={() => navigate("/buyer/contracts")}
//                 className="p-4 border rounded-lg hover:shadow"
//               >
//                 📄 Contracts
//               </button>

//               <button
//                 onClick={() => navigate("/buyer/negotiations")}
//                 className="p-4 border rounded-lg hover:shadow"
//               >
//                 💬 Negotiate
//               </button>

//               <button
//                 onClick={() => navigate("/buyer/payments")}
//                 className="p-4 border rounded-lg hover:shadow"
//               >
//                 💰 Payments
//               </button>

//               <button
//                 onClick={() => navigate("/buyer/analytics")}
//                 className="p-4 border rounded-lg hover:shadow"
//               >
//                 📊 Analytics
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




// .................................... Final functional code before UI changed ......................................



// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useParams } from "react-router-dom";
// import { FileText, Loader2 } from "lucide-react";
// import FarmerList from "./FarmerList";
// import api from "../../api/axios";

// import BuyerSidebar from "../../components/BuyerSidebar";
// import Topbar from "../../components/topNav";
// import ProfileModal from "../../components/ProfileModal";

// /* -------------------------------------------------------------------------- */
// /*  Static demo data (replace with API results later)                         */
// /* -------------------------------------------------------------------------- */
// const DEMO_STATS = {
//   totalContracts: 32,
//   pendingRequests: 6,
//   completedDeals: 22,
//   activeNegotiations: 4,
//   avgWheatPrice: "₹2,180/Q",
//   totalFarmers: 1240,
//   activeListings: 856,
//   monthVolume: "45,000 Q",
// };

// const DEMO_RECENT_PURCHASES = [
//   {
//     id: "p1",
//     crop: "Wheat",
//     farmer: "Ramesh Kumar",
//     price: "₹2,200/Q",
//     qtyLabel: "500 Quintals",
//     status: "delivered",
//   },
//   {
//     id: "p2",
//     crop: "Rice (Basmati)",
//     farmer: "Sunil Sharma",
//     price: "₹3,500/Q",
//     qtyLabel: "300 Quintals",
//     status: "in-transit",
//   },
//   {
//     id: "p3",
//     crop: "Cotton",
//     farmer: "Vijay Patel",
//     price: "₹6,800/Q",
//     qtyLabel: "200 Quintals",
//     status: "processing",
//   },
//   {
//     id: "p4",
//     crop: "Sugarcane",
//     farmer: "Mohan Das",
//     price: "₹350/Q",
//     qtyLabel: "1000 Quintals",
//     status: "delivered",
//   },
// ];

// const DEMO_TOP_FARMERS = [
//   { id: "f1", name: "Ramesh Kumar", state: "Punjab", rating: 4.8, deals: 24 },
//   { id: "f2", name: "Sunil Sharma", state: "Haryana", rating: 4.7, deals: 18 },
//   { id: "f3", name: "Vijay Patel", state: "Gujarat", rating: 4.9, deals: 32 },
//   { id: "f4", name: "Mohan Das", state: "Maharashtra", rating: 4.6, deals: 15 },
// ];

// /* -------------------------------------------------------------------------- */
// /*  Layout & small presentational components                                  */
// /* -------------------------------------------------------------------------- */

// function AppLayout({ children }) {
//   const [profileData, setProfileData] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showSupport, setShowSupport] = useState(false);
//   useEffect(() => {
//     async function loadProfile() {
//       try {
//         const res = await api.get("/profile/me");
//         setProfileData(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     loadProfile();
//   }, []);

//   function handleLogout() {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#fbf9f6]">
//       {/* ✅ NEW SIDEBAR */}
//       <BuyerSidebar
//         onClick={() => {
//           console.log("clicked");
//         }}
//         onLogout={handleLogout}
//         onSupportClick={() => setShowSupport(true)}
//       />

//       <main className="flex-1 flex flex-col overflow-hidden">
//         {/* ✅ NEW TOPBAR */}
//         <Topbar
//           profileData={profileData}
//           notifications={[]}
//           onSearch={() => {}}
//           onOpenProfile={() => setShowProfileModal(true)}
//           onLogout={handleLogout}
//         />

//         <div className="p-6 overflow-y-auto">{children}</div>
//       </main>

//       {/* ✅ PROFILE MODAL */}
//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         profileData={profileData}
//       />
//       {showSupport && (
//         <BuyerSupportModal onClose={() => setShowSupport(false)} />
//       )}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Dashboard main view (matches screenshot structure)                        */
// /* -------------------------------------------------------------------------- */

// function DashboardPageStatic() {
//   // for static version we use DEMO_* variables above
//   // Later: replace these local state values with fetches to your backend endpoints
//   const stats = DEMO_STATS;
//   const recent = DEMO_RECENT_PURCHASES;
//   const topFarmers = DEMO_TOP_FARMERS;

//   return (
//     <div className="space-y-6">
//       {/* Top stat cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <LargeStatCard
//           label="Total Contracts"
//           value={stats.totalContracts}
//           trend="+15% from last month"
//           iconBadge="📄"
//         />
//         <LargeStatCard
//           label="Pending Requests"
//           value={stats.pendingRequests}
//           trend="3% from last month"
//           negative
//           iconBadge="⏳"
//         />
//         <LargeStatCard
//           label="Completed Deals"
//           value={stats.completedDeals}
//           trend="+25% from last month"
//           positive
//           iconBadge="✅"
//         />
//         <LargeStatCard
//           label="Active Negotiations"
//           value={stats.activeNegotiations}
//           trend=""
//           iconBadge="💬"
//         />
//       </div>

//       {/* Main columns: recent purchases + right sidebar */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left: Recent purchases (wide) */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold text-lg">Recent Purchases</h3>
//             <button className="text-sm text-amber-500">View All</button>
//           </div>

//           <div className="mt-4 space-y-3">
//             {recent.map((r) => (
//               <div
//                 key={r.id}
//                 className="flex items-center justify-between bg-[#fbfbfb] p-4 rounded-lg"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
//                     {r.crop[0]}
//                   </div>
//                   <div>
//                     <div className="font-medium">{r.crop}</div>
//                     <div className="text-sm text-gray-500">{r.farmer}</div>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="font-semibold">{r.price}</div>
//                   <div className="text-sm text-gray-400">{r.qtyLabel}</div>
//                 </div>

//                 <div>
//                   <StatusBadge status={r.status} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right: Top Farmers */}
//         <aside className="bg-white rounded-2xl p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold">Top Farmers</h3>
//             <button className="text-sm text-amber-500">View All</button>
//           </div>

//           <div className="mt-4 space-y-3">
//             {topFarmers.map((f) => (
//               <div
//                 key={f.id}
//                 className="flex items-center justify-between bg-[#fbfbfb] p-3 rounded-lg"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold">
//                     {f.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .slice(0, 2)
//                       .join("")}
//                   </div>
//                   <div>
//                     <div className="font-medium">{f.name}</div>
//                     <div className="text-sm text-gray-500">{f.state}</div>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-sm text-emerald-700 font-medium">
//                     {f.rating} <span className="text-xs text-gray-400">↗</span>
//                   </div>
//                   <div className="text-xs text-gray-400">{f.deals} deals</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>

//       {/* Market insights row */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <InsightCard
//           title="Avg. Wheat Price"
//           value={stats.avgWheatPrice}
//           trend="+2.5%"
//         />
//         <InsightCard
//           title="Total Farmers"
//           value={stats.totalFarmers}
//           trend="+12%"
//         />
//         <InsightCard
//           title="Active Listings"
//           value={stats.activeListings}
//           trend="+8%"
//         />
//         <InsightCard
//           title="This Month Volume"
//           value={stats.monthVolume}
//           trend="+18%"
//         />
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Small presentational subcomponents                                        */
// /* -------------------------------------------------------------------------- */

// function LargeStatCard({ label, value, trend, positive, negative, iconBadge }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start justify-between">
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="text-2xl font-bold mt-1">{value}</p>
//         {trend && (
//           <p
//             className={`text-sm mt-2 ${
//               negative ? "text-red-500" : "text-emerald-600"
//             }`}
//           >
//             {trend}
//           </p>
//         )}
//       </div>

//       <div className="w-12 h-12 rounded-lg bg-[#f6faf6] flex items-center justify-center text-xl">
//         {iconBadge}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     delivered: "bg-emerald-100 text-emerald-700",
//     "in-transit": "bg-amber-100 text-amber-700",
//     processing: "bg-slate-100 text-slate-700",
//   };
//   return (
//     <div
//       className={`px-3 py-1 rounded-full text-sm font-medium ${
//         map[status] || "bg-gray-100"
//       }`}
//     >
//       {status}
//     </div>
//   );
// }

// function InsightCard({ title, value, trend }) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-xl font-semibold mt-2">{value}</p>
//       {trend && <p className="text-sm text-emerald-600 mt-1">{trend}</p>}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Market ticker (sticky bottom)                                              */
// /* -------------------------------------------------------------------------- */

// /* -------------------------------------------------------------------------- */
// /*  Contracts Page and Farmers Directory kept simple (unchanged)              */
// /*  ContractsPage uses static placeholders; you can wire them to API later.   */
// /* -------------------------------------------------------------------------- */

// function ContractsPage() {
//   const { id = "buyer123" } = useParams(); // replace with auth
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // For static demo this is left empty.
//   // Later: fetch(`${API_BASE}/contracts/buyer/${id}`) and setContracts(...)
//   useEffect(() => {
//     // placeholder: simulate small loading behavior if desired
//   }, [id]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-40">
//         <Loader2 className="animate-spin" />
//       </div>
//     );

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-semibold">My Contracts</h2>
//         <Link
//           to="/buyer/contract"
//           className="px-4 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-2"
//         >
//           <FileText size={16} />
//           Create New Contract
//         </Link>
//       </div>

//       {contracts.length === 0 ? (
//         <div className="text-center py-12">
//           <FileText size={48} className="mx-auto text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No contracts yet
//           </h3>
//           <p className="text-gray-500 mb-4">
//             Create your first contract to get started
//           </p>
//           <Link
//             to="/buyer/contract"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors"
//           >
//             <FileText size={16} />
//             Create Contract
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {contracts.map((c) => (
//             <div key={c._id} className="bg-white p-4 rounded-xl shadow-md">
//               <h3 className="font-bold">{c.contractTitle}</h3>
//               <p>
//                 Status: <span className="font-medium">{c.status}</span>
//               </p>
//               <p>
//                 Crop: {c.cropDetails?.cropName} ({c.cropDetails?.quantity}{" "}
//                 tonnes)
//               </p>
//               <p>Farmer: {c.farmer?.name}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// function BuyerSupportModal({ onClose }) {
//   const [form, setForm] = useState({
//     subject: "",
//     problem: "",
//     file: null,
//   });

//   const submitTicket = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("subject", form.subject);
//       formData.append("problem", form.problem);
//       if (form.file) formData.append("file", form.file);

//       // ✅ IMPORTANT CHANGE
//       await api.post("/buyer/support", formData);

//       alert("Request submitted ✅");
//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit request ❌");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
//       <div className="bg-white w-[500px] rounded-2xl p-6 shadow-xl">
//         <h2 className="text-lg font-bold text-[#064e3b] mb-4">Contact Admin</h2>

//         {/* FORM */}
//         <div className="space-y-3">
//           <input
//             placeholder="Subject"
//             value={form.subject}
//             onChange={(e) => setForm({ ...form, subject: e.target.value })}
//             className="w-full border p-2 rounded"
//           />

//           <textarea
//             placeholder="Describe your issue..."
//             value={form.problem}
//             onChange={(e) => setForm({ ...form, problem: e.target.value })}
//             className="w-full border p-2 rounded h-24"
//           />

//           <input
//             type="file"
//             onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
//           />
//         </div>

//         {/* CONTACT INFO */}
//         <div className="mt-4 text-sm text-gray-600 border-t pt-3">
//           <p>📧 support@farmlink.com</p>
//           <p>📞 +91 9876543210</p>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 mt-5">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
//             Cancel
//           </button>

//           <button
//             onClick={submitTicket}
//             className="px-4 py-2 bg-emerald-600 text-white rounded"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  BuyerDashboard wrapper with routes                                        */
// /* -------------------------------------------------------------------------- */

// function BuyerDashboard() {
//   return (
//     <Routes>
//       <Route
//         path="dashboard"
//         element={
//           <AppLayout>
//             <DashboardPageStatic />
//           </AppLayout>
//         }
//       />
//       <Route
//         path="farmers"
//         element={
//           <AppLayout>
//             <FarmerList />
//           </AppLayout>
//         }
//       />
//       <Route
//         path="contracts"
//         element={
//           <AppLayout>
//             <ContractsPage />
//           </AppLayout>
//         }
//       />
//     </Routes>
//   );
// }

// export default BuyerDashboard;


import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { 
  FileText, 
  Loader2, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Users, 
  Wheat, 
  TrendingUp, 
  BarChart3,
  ChevronRight,
  User,
  Phone,
  Mail
} from "lucide-react";
import FarmerList from "./FarmerList";
import api from "../../api/axios";

import BuyerSidebar from "../../components/BuyerSidebar";
import Topbar from "../../components/topNav";
import ProfileModal from "../../components/ProfileModal";

/* -------------------------------------------------------------------------- */
/* AppLayout: High-Contrast Branding                                          */
/* -------------------------------------------------------------------------- */

function AppLayout({ children }) {
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/profile/me");
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      <BuyerSidebar
        onLogout={handleLogout}
        onSupportClick={() => setShowSupport(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          profileData={profileData}
          notifications={[]}
          onSearch={() => {}}
          onOpenProfile={() => setShowProfileModal(true)}
          onLogout={handleLogout}
        />

        <div className="p-8 overflow-y-auto no-scrollbar">{children}</div>
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />
      {showSupport && (
        <BuyerSupportModal onClose={() => setShowSupport(false)} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard View: Bold & Readable                                           */
/* -------------------------------------------------------------------------- */

function DashboardPage() {
  const [stats, setStats] = useState({
    totalContracts: 0,
    pendingRequests: 0,
    completedDeals: 0,
    activeNegotiations: 0,
    avgWheatPrice: "₹0/Q",
    totalFarmers: 0,
    activeListings: 0,
    monthVolume: "0 Q",
  });
  const [recent, setRecent] = useState([]);
  const [topFarmers, setTopFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [statsRes, recentRes, farmersRes] = await Promise.all([
          api.get("/buyer/dashboard-stats"),
          api.get("/buyer/contracts/recent"),
          api.get("/buyer/top-farmers")
        ]);

        setStats(statsRes.data.stats || statsRes.data);
        setRecent(recentRes.data.contracts || recentRes.data || []);
        setTopFarmers(farmersRes.data.farmers || farmersRes.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
      <p className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Syncing Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Buyer Dashboard</h1>
        <p className="text-slate-600 font-bold text-sm uppercase tracking-widest mt-1">Procurement & Market Snapshot</p>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LargeStatCard label="Total Contracts" value={stats.totalContracts} trend="+15%" icon={<FileText size={22}/>} color="blue" />
        <LargeStatCard label="Pending Requests" value={stats.pendingRequests} trend="Action Required" negative icon={<Clock size={22}/>} color="amber" />
        <LargeStatCard label="Completed Deals" value={stats.completedDeals} trend="+25%" positive icon={<CheckCircle2 size={22}/>} color="emerald" />
        <LargeStatCard label="Active Chats" value={stats.activeNegotiations} trend="Live" icon={<MessageSquare size={22}/>} color="indigo" />
      </div>

      {/* MAIN DATA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: RECENT PURCHASES */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm flex items-center gap-2">
              <ShoppingBag size={18} className="text-emerald-600" /> Recent Purchases
            </h3>
            <button className="text-xs font-black uppercase text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all border border-emerald-100">View All</button>
          </div>

          <div className="space-y-4">
            {recent.length > 0 ? recent.map((r) => (
              <div key={r._id || r.id} className="flex items-center justify-between bg-slate-50/50 p-6 rounded-2xl border border-transparent hover:border-emerald-300 hover:bg-white transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 font-black text-xl shadow-sm">
                    {(r.cropDetails?.cropName || r.crop || "C")[0]}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">{r.cropDetails?.cropName || r.crop}</div>
                    <div className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mt-1">
                       <User size={12} className="text-slate-400" /> {r.farmer?.name || r.farmer}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block text-right px-6">
                  <div className="font-black text-slate-900 text-lg">₹{r.pricing?.totalPrice || r.price || 0}</div>
                  <div className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">{r.cropDetails?.quantity || r.qtyLabel} Units</div>
                </div>

                <StatusBadge status={r.contractStatus || r.status} />
              </div>
            )) : (
                <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-[2rem]">
                   <p className="text-slate-500 text-sm font-black uppercase tracking-widest">No Recent Procurement Data</p>
                </div>
            )}
          </div>
        </div>

        {/* RIGHT: TOP FARMERS */}
        <aside className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Top Farmers</h3>
            <button className="text-xs font-black uppercase text-emerald-600 hover:underline">View All</button>
          </div>

          <div className="space-y-5">
            {topFarmers.length > 0 ? topFarmers.map((f) => (
              <div key={f._id || f.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                    {(f.name || "F").split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">{f.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{f.state || "India"}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-emerald-600">{f.rating || "4.5"} ★</div>
                  <div className="text-[10px] text-slate-500 uppercase font-black">{f.deals || f.contractsCount || 0} deals</div>
                </div>
              </div>
            )) : (
                <p className="text-center py-10 text-slate-400 text-xs font-black uppercase italic tracking-widest">Refreshing Network...</p>
            )}
          </div>
        </aside>
      </div>

      {/* MARKET INSIGHTS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10">
        <InsightCard title="Avg. Wheat" value={stats.avgWheatPrice} trend="+2.5%" icon={<TrendingUp size={20}/>} />
        <InsightCard title="Total Farmers" value={stats.totalFarmers} trend="+12%" icon={<Users size={20}/>} />
        <InsightCard title="Listings" value={stats.activeListings} trend="+8%" icon={<Wheat size={20}/>} />
        <InsightCard title="Volume" value={stats.monthVolume} trend="+18%" icon={<BarChart3 size={20}/>} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponents: Visual Refinements                                          */
/* -------------------------------------------------------------------------- */

function LargeStatCard({ label, value, trend, negative, icon, color }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    indigo: "bg-indigo-50 text-indigo-600"
  };

  return (
    <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
      <div>
        <p className="text-xs font-black text-slate-600 uppercase tracking-[0.15em] mb-2">{label}</p>
        <p className="text-4xl font-black text-slate-900 leading-none">{value}</p>
        {trend && (
          <p className={`text-[11px] font-black mt-4 px-3 py-1 rounded-lg w-fit shadow-sm ${negative ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
            {trend}
          </p>
        )}
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${colors[color] || "bg-slate-100 text-slate-600"}`}>
        {icon}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    "in-transit": "bg-blue-100 text-blue-700 border-blue-200",
    ACTIVE: "bg-blue-100 text-blue-700 border-blue-200",
    processing: "bg-amber-100 text-amber-700 border-amber-200",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  };
  return (
    <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border shadow-sm ${map[status] || "bg-slate-100 border-slate-200 text-slate-600"}`}>
      {status || "UNKNOWN"}
    </div>
  );
}

function InsightCard({ title, value, trend, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-emerald-400 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-emerald-600 bg-emerald-50 p-2 rounded-lg">{icon}</div>
        <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{title}</p>
      </div>
      <p className="text-2xl font-black text-slate-900 leading-tight">{value}</p>
      <p className="text-[11px] font-black text-emerald-600 mt-2 uppercase flex items-center gap-1">
        <TrendingUp size={12}/> {trend}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Support Modal & Contracts View                                            */
/* -------------------------------------------------------------------------- */

function BuyerSupportModal({ onClose }) {
  const [form, setForm] = useState({ subject: "", problem: "", file: null });

  const submitTicket = async () => {
    try {
      const formData = new FormData();
      formData.append("subject", form.subject);
      formData.append("problem", form.problem);
      if (form.file) formData.append("file", form.file);
      await api.post("/buyer/support", formData);
      alert("Request submitted ✅");
      onClose();
    } catch (err) {
      alert("Failed to submit request ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[999] p-4">
      <div className="bg-white w-full max-w-[500px] rounded-[2.5rem] p-12 shadow-2xl animate-in zoom-in duration-200">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Platform Support</h2>
        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-10 border-b border-slate-100 pb-4">Direct line to procurement assistance</p>

        <div className="space-y-4">
          <input
            placeholder="Inquiry Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full border-2 border-slate-100 p-5 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all bg-slate-50/50"
          />
          <textarea
            placeholder="Explain the technical or trade issue..."
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
            className="w-full border-2 border-slate-100 p-5 rounded-2xl text-sm font-bold h-36 outline-none focus:border-emerald-500 transition-all bg-slate-50/50 resize-none"
          />
          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
             <input type="file" id="file" className="hidden" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
             <label htmlFor="file" className="text-xs font-black uppercase text-emerald-600 cursor-pointer hover:underline">Attach Procurement Documents</label>
             {form.file && <p className="text-[10px] font-bold text-slate-500 mt-2 italic">{form.file.name}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-slate-100">
          <button onClick={onClose} className="px-6 py-3 text-xs font-black uppercase text-slate-500 hover:text-slate-900">Discard</button>
          <button onClick={submitTicket} className="px-10 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">Submit Case</button>
        </div>
      </div>
    </div>
  );
}

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get("/buyer/contracts");
        setContracts(res.data.contracts || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) return <div className="flex justify-center p-40"><Loader2 className="animate-spin text-emerald-600" size={48} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Contracts</h2>
        <Link to="/buyer/contract" className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-emerald-600 transition-all">
          <FileText size={16} /> Draft Agreement
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
          <FileText size={64} className="mx-auto text-slate-200 mb-6" />
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">No active trade contracts</h3>
          <Link to="/buyer/contract" className="text-xs font-black text-emerald-600 mt-6 inline-block hover:underline uppercase tracking-[0.2em]">Initialize your first contract</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contracts.map((c) => (
            <div key={c._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                 <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase border border-emerald-100">{c.contractStatus || c.status}</span>
                 <p className="text-xs font-bold text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</p>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{c.contractTitle || "Supply Agreement"}</h3>
              <div className="flex items-center gap-6 text-sm font-black text-slate-700 bg-slate-50 p-5 rounded-2xl">
                 <div className="flex items-center gap-2"><Wheat size={16} className="text-emerald-600" /> {c.cropDetails?.cropName}</div>
                 <div className="h-6 w-px bg-slate-200"></div>
                 <div>{c.cropDetails?.quantity} Quintals</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BuyerDashboard() {
  return (
    <Routes>
      <Route path="dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
      <Route path="farmers" element={<AppLayout><FarmerList /></AppLayout>} />
      <Route path="contracts" element={<AppLayout><ContractsPage /></AppLayout>} />
    </Routes>
  );
}

export default BuyerDashboard;