// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useParams } from "react-router-dom";
// import {
//   Bell,
//   LogOut,
//   Users,
//   FileText,
//   DollarSign,
//   BarChart3,
//   Settings,
//   Loader2,
//   Search,
// } from "lucide-react";
// import FarmerList from "./FarmerList";
// import NotificationPopup from "../../components/NotificationPopup";
// import api from "../../api/axios";
// const API_BASE =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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

// const DEMO_MARKET_TICKER = [
//   { name: "Cotton", price: "₹6,800", change: "+3.5%" },
//   { name: "Soybean", price: "₹4,200", change: "-0.8%" },
//   { name: "Mustard", price: "₹5,400", change: "+1.8%" },
//   { name: "Corn", price: "₹1,800", change: "+2.3%" },
//   { name: "Barley", price: "₹1,650", change: "-1.1%" },
//   { name: "Wheat", price: "₹2,200", change: "+5.2%" },
// ];

// /* -------------------------------------------------------------------------- */
// /*  Layout & small presentational components                                  */
// /* -------------------------------------------------------------------------- */

// function AppLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-[#fbf9f6]">
//       <Sidebar />
//       <main className="flex-1 p-6 overflow-y-auto">
//         <Header />
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
//     <div className="flex justify-between items-center">
//       <div className="flex items-center gap-4">
//         <div className="text-xl font-bold text-emerald-900">FarmLink</div>
//         <div className="relative">
//           <input
//             placeholder="Search farmers, contracts, crops..."
//             className="pl-10 pr-4 py-2 rounded-xl border border-transparent bg-white shadow-sm w-[520px]"
//           />
//           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//             <Search size={16} />
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="relative">
//           <button
//             onClick={() => setOpenNotif(!openNotif)}
//             className="relative p-2 rounded-full hover:bg-gray-200"
//           >
//             <Bell size={18} />
//             {unreadCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                 {unreadCount}
//               </span>
//             )}
//           </button>

//           <NotificationPopup
//             open={openNotif}
//             onClose={() => setOpenNotif(false)}
//           />
//         </div>

//         <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500 text-black text-sm hover:opacity-90">
//           <LogOut size={16} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// function Sidebar() {
//   const linkStyle =
//     "flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-800 transition-colors";
//   return (
//     <aside className="w-72 bg-emerald-900 text-white flex flex-col">
//       <div className="px-6 py-4 text-2xl font-bold border-b border-emerald-800 flex items-center gap-3">
//         <div className="w-10 h-10 rounded bg-amber-400 text-emerald-900 flex items-center justify-center font-semibold">
//           FL
//         </div>
//         <div>
//           <div>FarmLink</div>
//           <div className="text-xs text-amber-100">Buyer Portal</div>
//         </div>
//       </div>

//       <nav className="flex-1 px-4 py-6 space-y-2">
//         <Link to="/buyer/dashboard" className={linkStyle}>
//           <BarChart3 size={18} /> Dashboard
//         </Link>
//         <Link to="/buyer/farmers" className={linkStyle}>
//           <Users size={18} /> Farmer Listings
//         </Link>
//         <Link to="/buyer/contracts" className={linkStyle}>
//           <FileText size={18} /> My Contracts
//         </Link>
//         <Link to="/buyer/harvest-contract-tracking/" className={linkStyle}>
//           <FileText size={18} /> Harvest Track Contracts
//         </Link>

//         <Link to="/buyer/payments" className={linkStyle}>
//           <DollarSign size={18} /> Payments
//         </Link>
//         <Link to="/buyer/settings" className={linkStyle}>
//           <Settings size={18} /> Settings
//         </Link>
//       </nav>

//       <div className="px-4 py-6 border-t border-emerald-800">
//         <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-800">
//           <div className="text-sm font-medium">Amit Kumar</div>
//           <div className="ml-auto opacity-80 text-xs">Buyer</div>
//         </button>
//       </div>
//     </aside>
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

// function MarketTicker() {
//   return (
//     <div className="fixed bottom-0 left-72 right-0 bg-emerald-900 text-white py-2 px-4 flex items-center gap-6 overflow-x-auto">
//       <div className="text-sm font-semibold mr-4">LIVE MARKET</div>
//       {DEMO_MARKET_TICKER.map((t) => (
//         <div
//           key={t.name}
//           className="flex items-center gap-2 whitespace-nowrap px-3 py-1 rounded"
//         >
//           <div className="font-medium">{t.name}</div>
//           <div className="text-xs opacity-80">{t.price}</div>
//           <div
//             className={`text-xs ${
//               t.change.startsWith("+") ? "text-emerald-300" : "text-rose-300"
//             }`}
//           >
//             {t.change}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

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
//   Truck
// } from "lucide-react";
// import FarmerList from "./FarmerList";
// import api from "../../api/axios";

// // EXTERNAL COMPONENTS
// import Topbar from "../../components/topNav.jsx"; 
// import ProfileModal from "../../components/profileModal.jsx";

// // LOGO
// import farmlinkLogo from "../../assets/Farmlink_Logo-bg.png";

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
//   { id: "p1", crop: "Wheat", farmer: "Ramesh Kumar", price: "₹2,200/Q", qtyLabel: "500 Quintals", status: "delivered" },
//   { id: "p2", crop: "Rice (Basmati)", farmer: "Sunil Sharma", price: "₹3,500/Q", qtyLabel: "300 Quintals", status: "in-transit" },
//   { id: "p3", crop: "Cotton", farmer: "Vijay Patel", price: "₹6,800/Q", qtyLabel: "200 Quintals", status: "processing" },
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

// function Sidebar({ onLogout, profileData }) {
//   const linkStyle = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
//       isActive
//         ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 translate-x-1"
//         : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
//     }`;

//   const getInitials = (name) => {
//     if (!name) return "AM";
//     return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
//   };

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
//           <div className="text-[9px] uppercase font-bold text-indigo-500 tracking-widest mt-1">Buyer Portal</div>
//         </div>
//       </div>

//       <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
//         <NavLink to="/buyer/dashboard" className={linkStyle}><BarChart3 size={18} /> Dashboard</NavLink>
//         <NavLink to="/buyer/farmers" className={linkStyle}><Users size={18} /> Farmer Listings</NavLink>
//         <NavLink to="/buyer/contracts" className={linkStyle}><FileText size={18} /> My Contracts</NavLink>
//         <NavLink to="/buyer/harvest-contract-tracking/" className={linkStyle}><Truck size={18} /> Track Contracts</NavLink>
//         <NavLink to="/buyer/payments" className={linkStyle}><DollarSign size={18} /> Payments</NavLink>
//         <NavLink to="/buyer/settings" className={linkStyle}><Settings size={18} /> Settings</NavLink>
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
//             <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Buyer</div>
//           </div>
//           <button onClick={onLogout} title="Logout" className="p-2 rounded-lg text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all flex items-center justify-center shrink-0">
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
//     <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
//       <div className="h-full flex-shrink-0 z-40">
//         <Sidebar onLogout={onLogout} profileData={profileData} />
//       </div>
//       <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
//         <div className="flex-shrink-0 z-50">
//           <Topbar profileData={profileData} onOpenProfile={onOpenProfile} onLogout={onLogout} />
//         </div>
        
//         {/* Adjusted padding: Added pr-12 (Vertical line fix) to increase right margin */}
//         <div className="flex-1 overflow-y-auto pt-4 pb-6 pl-6 pr-12 scroll-smooth">
//           <div className="max-w-[1400px]">
//             {children}
//           </div>
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
//     <div className="space-y-4"> {/* Reduced horizontal line gap (Stats to Content) */}
      
//       {/* STAT CARDS - Tight vertical space */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//         <LargeStatCard label="Total Contracts" value={stats.totalContracts} trend="+15%" iconBadge="📄" />
//         <LargeStatCard label="Pending Requests" value={stats.pendingRequests} trend="3%" negative iconBadge="⏳" />
//         <LargeStatCard label="Completed Deals" value={stats.completedDeals} trend="+25%" positive iconBadge="✅" />
//         <LargeStatCard label="Active Negotiations" value={stats.activeNegotiations} trend="" iconBadge="💬" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2"> {/* Reduced horizontal line gap */}
//         {/* RECENT PURCHASES */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-bold text-lg text-slate-800">Recent Purchases</h3>
//             <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
//           </div>
//           <div className="space-y-2.5">
//             {DEMO_RECENT_PURCHASES.map((r) => (
//               <div key={r.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-transparent hover:border-indigo-100 transition-all">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 text-indigo-700 flex items-center justify-center font-black text-lg shadow-sm shrink-0">
//                     {r.crop[0]}
//                   </div>
//                   <div>
//                     <div className="font-bold text-sm text-slate-800 leading-tight">{r.crop}</div>
//                     <div className="text-[11px] text-slate-500 font-medium">{r.farmer}</div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-black text-sm text-slate-800 leading-tight">{r.price}</div>
//                   <div className="text-[10px] text-slate-400 font-bold uppercase">{r.qtyLabel}</div>
//                 </div>
//                 <StatusBadge status={r.status} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TOP FARMERS */}
//         <aside className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-bold text-lg text-slate-800">Top Farmers</h3>
//             <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
//           </div>
//           <div className="space-y-2.5">
//             {DEMO_TOP_FARMERS.map((f) => (
//               <div key={f.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-transparent hover:border-indigo-100 transition-all">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
//                     {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
//                   </div>
//                   <div>
//                     <div className="font-bold text-sm text-slate-800 leading-tight">{f.name}</div>
//                     <div className="text-[11px] text-slate-500 font-bold uppercase">{f.state}</div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm text-indigo-700 font-black leading-tight">{f.rating} <span className="text-[10px] text-slate-400 font-normal">↗</span></div>
//                   <div className="text-[10px] text-slate-400 font-bold">{f.deals} deals</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>

//       {/* INSIGHTS - Reduced gap from main content */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-2">
//         <InsightCard title="Avg. Wheat Price" value={stats.avgWheatPrice} trend="+2.5%" />
//         <InsightCard title="Total Farmers" value={stats.totalFarmers} trend="+12%" />
//         <InsightCard title="Active Listings" value={stats.activeListings} trend="+8%" />
//         <InsightCard title="Month Volume" value={stats.monthVolume} trend="+18%" />
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* UI COMPONENTS                                                              */
// /* -------------------------------------------------------------------------- */

// function LargeStatCard({ label, value, trend, negative, iconBadge }) {
//   return (
//     <div className="bg-white p-4 rounded-2xl mr-6 ml-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-300 transition-all">
//       <div className="flex flex-col justify-center">
//         <p className="text-[12px] text-slate-500 font-bold uppercase tracking-wider leading-none">{label}</p>
//         <p className="text-2xl font-black mt-2 text-slate-800 leading-none">{value}</p>
//         {trend && (
//           <p className={`text-[12px] mt-2 font-black leading-none ${negative ? "text-red-600" : "text-emerald-600"}`}>
//             {trend}
//           </p>
//         )}
//       </div>
//       <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shadow-inner group-hover:bg-indigo-50 transition-colors">
//         <span className="opacity-90">{iconBadge}</span>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = { delivered: "bg-emerald-100 text-emerald-700", "in-transit": "bg-indigo-100 text-indigo-700", processing: "bg-slate-200 text-slate-700" };
//   return <div className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${map[status] || "bg-gray-100"}`}>{status}</div>;
// }

// function InsightCard({ title, value, trend }) {
//   return (
//     <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
//       <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest leading-none">{title}</p>
//       <p className="text-xl font-black mt-1.5 text-slate-800 leading-none">{value}</p>
//       {trend && <p className="text-[12px] text-emerald-600 font-bold mt-1.5">{trend}</p>}
//     </div>
//   );
// }

// function MarketTicker() {
//   return (
//     <div className="h-10 bg-[#0f172a] text-white py-2 px-6 flex items-center gap-8 overflow-x-auto no-scrollbar fixed bottom-0 left-64 right-0 z-50 border-t border-slate-800">
//       <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border-r border-slate-700 pr-4">Market Live</div>
//       <div className="flex gap-8">
//         {DEMO_MARKET_TICKER.map((t) => (
//           <div key={t.name} className="flex items-center gap-3 whitespace-nowrap text-[11px]">
//             <span className="font-bold text-slate-400">{t.name}</span>
//             <span className="font-mono text-white">{t.price}</span>
//             <span className={t.change.startsWith("+") ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{t.change}</span>
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
//       } catch (err) { console.error("Profile load failed", err); }
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
//         <Route path="dashboard" element={
//           <AppLayout profileData={profileData} onOpenProfile={() => setShowProfileModal(true)} onLogout={logout}>
//             <DashboardPageStatic />
//           </AppLayout>
//         } />
//         <Route path="farmers" element={
//           <AppLayout profileData={profileData} onOpenProfile={() => setShowProfileModal(true)} onLogout={logout}>
//             <FarmerList />
//           </AppLayout>
//         } />
//       </Routes>
//       <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} profileData={profileData} />
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams, NavLink } from "react-router-dom";
import {
  LogOut,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  Loader2,
  Search,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Truck
} from "lucide-react";
import FarmerList from "./FarmerList";
import api from "../../api/axios";

// EXTERNAL COMPONENTS
import Topbar from "../../components/topNav.jsx"; 
import ProfileModal from "../../components/profileModal.jsx";

// LOGO
import farmlinkLogo from "../../assets/Farmlink_Logo-bg.png";

/* -------------------------------------------------------------------------- */
/* ORIGINAL DEMO DATA                                                         */
/* -------------------------------------------------------------------------- */
const DEMO_STATS = {
  totalContracts: 32,
  pendingRequests: 6,
  completedDeals: 22,
  activeNegotiations: 4,
  avgWheatPrice: "₹2,180/Q",
  totalFarmers: 1240,
  activeListings: 856,
  monthVolume: "45,000 Q",
};

const DEMO_RECENT_PURCHASES = [
  { id: "p1", crop: "Wheat", farmer: "Ramesh Kumar", price: "₹2,200/Q", qtyLabel: "500 Quintals", status: "delivered" },
  { id: "p2", crop: "Rice (Basmati)", farmer: "Sunil Sharma", price: "₹3,500/Q", qtyLabel: "300 Quintals", status: "in-transit" },
  { id: "p3", crop: "Cotton", farmer: "Vijay Patel", price: "₹6,800/Q", qtyLabel: "200 Quintals", status: "processing" },
];

const DEMO_TOP_FARMERS = [
  { id: "f1", name: "Ramesh Kumar", state: "Punjab", rating: 4.8, deals: 24 },
  { id: "f2", name: "Sunil Sharma", state: "Haryana", rating: 4.7, deals: 18 },
  { id: "f3", name: "Vijay Patel", state: "Gujarat", rating: 4.9, deals: 32 },
];

const DEMO_MARKET_TICKER = [
  { name: "Cotton", price: "₹6,800", change: "+3.5%" },
  { name: "Soybean", price: "₹4,200", change: "-0.8%" },
  { name: "Mustard", price: "₹5,400", change: "+1.8%" },
  { name: "Corn", price: "₹1,800", change: "+2.3%" },
  { name: "Barley", price: "₹1,650", change: "-1.1%" },
  { name: "Wheat", price: "₹2,200", change: "+5.2%" },
];

/* -------------------------------------------------------------------------- */
/* INTERNAL SIDEBAR                                                           */
/* -------------------------------------------------------------------------- */

function Sidebar({ onLogout, profileData }) {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 translate-x-1"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  const getInitials = (name) => {
    if (!name) return "AM";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <aside className="w-64 h-full flex flex-col bg-[#0f172a] text-white border-r border-slate-800">
      <div className="px-6 py-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-lg">
          <img src={farmlinkLogo} alt="logo" className="object-contain" />
        </div>
        <div>
          <div className="text-lg font-bold text-white tracking-tighter leading-none">
            Farm<span className="text-indigo-400">Link</span>
          </div>
          <div className="text-[9px] uppercase font-bold text-indigo-500 tracking-widest mt-1">Buyer Portal</div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        <NavLink to="/buyer/dashboard" className={linkStyle}><BarChart3 size={18} /> Dashboard</NavLink>
        <NavLink to="/buyer/farmers" className={linkStyle}><Users size={18} /> Farmer Listings</NavLink>
        <NavLink to="/buyer/contracts" className={linkStyle}><FileText size={18} /> My Contracts</NavLink>
        <NavLink to="/buyer/harvest-contract-tracking/" className={linkStyle}><Truck size={18} /> Track Contracts</NavLink>
        <NavLink to="/buyer/payments" className={linkStyle}><DollarSign size={18} /> Payments</NavLink>
        <NavLink to="/buyer/settings" className={linkStyle}><Settings size={18} /> Settings</NavLink>
      </nav>

      <div className="px-4 py-6 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[11px] font-black shadow-lg">
            {getInitials(profileData?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate leading-tight">
              {profileData?.name || "Arjun Mehta"}
            </div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Buyer</div>
          </div>
          <button onClick={onLogout} title="Logout" className="p-2 rounded-lg text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all flex items-center justify-center shrink-0">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* LAYOUT WRAPPER                                                             */
/* -------------------------------------------------------------------------- */

function AppLayout({ children, profileData, onOpenProfile, onLogout }) {
  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden"> {/* Background set to light slate for contrast */}
      <div className="h-full flex-shrink-0 z-40">
        <Sidebar onLogout={onLogout} profileData={profileData} />
      </div>
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <div className="flex-shrink-0 z-50">
          <Topbar profileData={profileData} onOpenProfile={onOpenProfile} onLogout={onLogout} />
        </div>
        
        <div className="flex-1 overflow-y-auto pt-4 pb-6 pl-6 pr-12 scroll-smooth">
          <div className="max-w-[1400px]">
            {children}
          </div>
        </div>
        <MarketTicker />
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DASHBOARD PAGE CONTENT                                                     */
/* -------------------------------------------------------------------------- */

function DashboardPageStatic() {
  const stats = DEMO_STATS;

  return (
    <div className="space-y-4">
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <LargeStatCard label="Total Contracts" value={stats.totalContracts} trend="+15%" iconBadge="📄" />
        <LargeStatCard label="Pending Requests" value={stats.pendingRequests} trend="3%" negative iconBadge="⏳" />
        <LargeStatCard label="Completed Deals" value={stats.completedDeals} trend="+25%" positive iconBadge="✅" />
        <LargeStatCard label="Active Negotiations" value={stats.activeNegotiations} trend="" iconBadge="💬" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
        {/* RECENT PURCHASES */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-800">Recent Purchases</h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-2.5">
            {DEMO_RECENT_PURCHASES.map((r) => (
              <div key={r.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 text-indigo-700 flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                    {r.crop[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800 leading-tight">{r.crop}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{r.farmer}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-sm text-slate-800 leading-tight">{r.price}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{r.qtyLabel}</div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        {/* TOP FARMERS */}
        <aside className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-800">Top Farmers</h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-2.5">
            {DEMO_TOP_FARMERS.map((f) => (
              <div key={f.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                    {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800 leading-tight">{f.name}</div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase">{f.state}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-indigo-700 font-black leading-tight">{f.rating} <span className="text-[10px] text-slate-400 font-normal">↗</span></div>
                  <div className="text-[10px] text-slate-400 font-bold">{f.deals} deals</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-2">
        <InsightCard title="Avg. Wheat Price" value={stats.avgWheatPrice} trend="+2.5%" />
        <InsightCard title="Total Farmers" value={stats.totalFarmers} trend="+12%" />
        <InsightCard title="Active Listings" value={stats.activeListings} trend="+8%" />
        <InsightCard title="Month Volume" value={stats.monthVolume} trend="+18%" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function LargeStatCard({ label, value, trend, negative, iconBadge }) {
  return (
    <div className="bg-white p-4 rounded-2xl mr-6 ml-6 shadow-sm border border-slate-200 flex items-center justify-between group hover:border-indigo-400 transition-all">
      <div className="flex flex-col justify-center">
        <p className="text-[12px] text-slate-500 font-bold uppercase tracking-wider leading-none">{label}</p>
        <p className="text-2xl font-black mt-2 text-slate-800 leading-none">{value}</p>
        {trend && (
          <p className={`text-[12px] mt-2 font-black leading-none ${negative ? "text-rose-600" : "text-emerald-600"}`}>
            {trend}
          </p>
        )}
      </div>
      <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg shadow-inner group-hover:bg-indigo-100 transition-colors">
        <span className="opacity-90">{iconBadge}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { delivered: "bg-emerald-100 text-emerald-700", "in-transit": "bg-amber-100 text-amber-700", processing: "bg-slate-200 text-slate-700" };
  return <div className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${map[status] || "bg-gray-100"}`}>{status}</div>;
}

function InsightCard({ title, value, trend }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
      <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest leading-none">{title}</p>
      <p className="text-xl font-black mt-1.5 text-slate-800 leading-none">{value}</p>
      {trend && <p className="text-[12px] text-emerald-600 font-bold mt-1.5">{trend}</p>}
    </div>
  );
}

function MarketTicker() {
  return (
    <div className="h-10 bg-[#0f172a] text-white py-2 px-6 flex items-center gap-8 overflow-x-auto no-scrollbar fixed bottom-0 left-64 right-0 z-50 border-t border-slate-800">
      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border-r border-slate-700 pr-4">Market Live</div>
      <div className="flex gap-8">
        {DEMO_MARKET_TICKER.map((t) => (
          <div key={t.name} className="flex items-center gap-3 whitespace-nowrap text-[11px]">
            <span className="font-bold text-slate-400">{t.name}</span>
            <span className="font-mono text-white">{t.price}</span>
            <span className={t.change.startsWith("+") ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{t.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BuyerDashboard() {
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    async function loadBuyerProfile() {
      try {
        const res = await api.get("/profile/me");
        setProfileData(res.data);
      } catch (err) { console.error("Profile load failed", err); }
    }
    loadBuyerProfile();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <Routes>
        <Route path="dashboard" element={
          <AppLayout profileData={profileData} onOpenProfile={() => setShowProfileModal(true)} onLogout={logout}>
            <DashboardPageStatic />
          </AppLayout>
        } />
        <Route path="farmers" element={
          <AppLayout profileData={profileData} onOpenProfile={() => setShowProfileModal(true)} onLogout={logout}>
            <FarmerList />
          </AppLayout>
        } />
      </Routes>
      <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} profileData={profileData} />
    </>
  );
}