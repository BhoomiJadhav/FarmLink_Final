// import React, { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";
// import { io } from "socket.io-client";
// import {
//   FileText,
//   MessageSquare,
//   CheckCircle2,
//   TrendingUp,
//   TrendingDown,
//   Timer,
//   Leaf,
//   Sprout,
//   ArrowUpRight,
//   ArrowRight,
//   Activity,
//   Wheat,
// } from "lucide-react";
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/ProfileModal.jsx";

// /* --- Modernized Components --- */

// function StatCard({
//   title,
//   value,
//   icon: Icon,
//   colorClass,
//   bgClass,
//   borderClass,
// }) {
//   return (
//     <div
//       className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border ${borderClass} group hover:shadow-md transition-all duration-300`}
//     >
//       <div
//         className={`absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full ${bgClass} opacity-20 group-hover:scale-110 transition-transform duration-500`}
//       />

//       <div className="relative flex justify-between items-start">
//         <div>
//           <p className="text-sm font-medium text-slate-500">{title}</p>
//           <h3 className="mt-2 text-3xl font-bold text-slate-800 tracking-tight">
//             {value}
//           </h3>
//         </div>
//         <div
//           className={`p-3 rounded-xl ${bgClass} text-${colorClass} shadow-inner`}
//         >
//           <Icon className={`h-6 w-6 text-${colorClass}-600`} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function UpdateRow({ pill, title, date }) {
//   return (
//     <div className="group flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
//       <div className="flex-shrink-0 mt-1">
//         <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 group-hover:bg-emerald-600 transition-colors" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-100">
//             {pill}
//           </span>
//           <span className="text-xs text-slate-400">{date}</span>
//         </div>
//         <p className="text-sm font-medium text-slate-700 line-clamp-2 leading-relaxed group-hover:text-emerald-800 transition-colors">
//           {title}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function FarmerDashboard() {
//   // --- STATE & LOGIC (UNCHANGED) ---
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [profileData, setProfileData] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [form, setForm] = useState({
//     personal: {
//       fullName: "",
//       phone: "",
//       email: "",
//       governmentId: "",
//       address: "",
//     },
//     farm: {
//       farmLocation: "",
//       farmSize: "",
//       cropTypes: [],
//       irrigation: "",
//       machinery: "",
//     },
//     insurance: { provider: "", policyNumber: "" },
//     preferences: { additionalInfo: "" },
//   });

//   const [stats, setStats] = useState({
//     totalContracts: 0,
//     pendingRequests: 0,
//     acceptedDeals: 0,
//     activeNegotiations: 0,
//   });
//   const [crops, setCrops] = useState([]);
//   const [marketTrends, setMarketTrends] = useState([]);
//   const [marketSourceLabel, setMarketSourceLabel] = useState("Live");
//   const [govUpdates, setGovUpdates] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const t = setTimeout(() => setShowWelcome(false), 1200);
//     return () => clearTimeout(t);
//   }, []);

//   // Fetch Profile Logic
//   useEffect(() => {

//     let mounted = true;
//     async function loadProfile() {
//       setLoadingProfile(true);
//       try {
//         const res = await api.get("/profile/me");
//         const payload = res?.data || {};
//         const user =
//           payload.user ||
//           payload.data?.user ||
//           (payload.name ? { name: payload.name, email: payload.email } : null);
//         const profile =
//           payload.profile ||
//           payload.data?.profile ||
//           payload.profileData ||
//           payload ||
//           null;

//         let collected = [];
//         if (Array.isArray(payload.crops) && payload.crops.length)
//           collected = payload.crops;
//         else if (
//           profile &&
//           Array.isArray(profile.crops) &&
//           profile.crops.length
//         )
//           collected = profile.crops;
//         else if (
//           profile &&
//           Array.isArray(profile.listings) &&
//           profile.listings.length
//         )
//           collected = profile.listings;
//         else if (Array.isArray(payload.contracts) && payload.contracts.length)
//           collected = payload.contracts;
//         else if (
//           Array.isArray(payload.data?.contracts) &&
//           payload.data.contracts.length
//         )
//           collected = payload.data.contracts;
//         else if (
//           profile &&
//           Array.isArray(profile.farm?.cropTypes) &&
//           profile.farm.cropTypes.length
//         ) {
//           collected = profile.farm.cropTypes.map((name, idx) => ({
//             _id: `crop-from-profile-${idx}`,
//             name,
//             qty: "-",
//             price: "₹—",
//             status: "active",
//             fromProfile: true,
//           }));
//         }

//         const mappedCrops = (collected || []).map((c) => {
//           if (typeof c === "string")
//             return {
//               id: null,
//               name: c,
//               qty: "-",
//               price: "₹—",
//               status: "active",
//             };
//           return {
//             id: c.id || c._id || null,
//             name:
//               c.name ||
//               c.crop ||
//               c.cropName ||
//               c.cropDetails?.cropName ||
//               "Unknown",
//             qty:
//               c.qty ||
//               c.quantity ||
//               c.availableQty ||
//               c.cropDetails?.quantity ||
//               "-",
//             price: c.price || c.pricePerUnit || c.pricing?.pricePerUnit || "₹—",
//             status: c.status || (c.isActive ? "active" : "pending") || "active",
//           };
//         });

//         const normalized = {
//           user: user || {
//             name: payload.name || null,
//             email: payload.email || null,
//             role: payload.role || "Farmer",
//           },
//           profile: profile && typeof profile === "object" ? profile : null,
//           crops: mappedCrops,
//           contracts: payload.contracts || payload.data?.contracts || [],
//           contractsCount:
//             (payload.contracts && payload.contracts.length) ||
//             payload.contractsCount ||
//             0,
//         };

//         if (!mounted) return;
//         setProfileData(normalized);
//         setCrops(mappedCrops);
//         setNotifications(payload.notifications || []);

//         const contracts = normalized.contracts || [];
//         setStats({
//           totalContracts: contracts.length,
//           pendingRequests: contracts.filter(
//             (c) => (c.status || "").toLowerCase() === "pending",
//           ).length,
//           acceptedDeals: contracts.filter(
//             (c) => (c.status || "").toLowerCase() === "accepted",
//           ).length,
//           activeNegotiations: contracts.filter(
//             (c) => (c.status || "").toLowerCase() === "negotiating",
//           ).length,
//         });

//         // Populate Form
//         const p = normalized.profile || {};
//         setForm({
//           personal: {
//             fullName: p.personal?.fullName || normalized.user?.name || "",
//             phone: p.personal?.phone || "",
//             email: p.personal?.email || normalized.user?.email || "",
//             governmentId: p.personal?.governmentId || "",
//             address: p.personal?.address || "",
//           },
//           farm: {
//             farmLocation: p.farm?.farmLocation || "",
//             farmSize: p.farm?.farmSize || "",
//             cropTypes: p.farm?.cropTypes || [],
//             irrigation: p.farm?.irrigation || "",
//             machinery: p.farm?.machinery || "",
//           },
//           insurance: {
//             provider: p.insurance?.provider || "",
//             policyNumber: p.insurance?.policyNumber || "",
//           },
//           preferences: { additionalInfo: p.preferences?.additionalInfo || "" },
//         });
//       } catch (err) {
//         console.error(
//           "Error loading profile/me:",
//           err?.response?.data || err.message,
//         );
//       } finally {
//         if (mounted) setLoadingProfile(false);
//       }
//     }
//     loadProfile();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Market & Updates Logic
//   useEffect(() => {
//     let mounted = true;
//     async function loadMarketAndUpdates() {
//       try {
//         const [mRes, uRes, nRes] = await Promise.allSettled([
//           api.get("/market"),
//           api.get("/updates"),
//           api.get("/notifications/me"),
//         ]);

//         if (uRes.status === "fulfilled")
//           setGovUpdates(uRes.value.data.updates || uRes.value.data || []);
//         if (nRes.status === "fulfilled")
//           setNotifications(
//             nRes.value.data.notifications || nRes.value.data || [],
//           );

//         if (mRes.status === "fulfilled") {
//           const prices = mRes.value.data.prices || mRes.value.data || [];
//           if (Array.isArray(prices) && prices.length) {
//             if (!mounted) return;
//             setMarketTrends(prices);
//             setMarketSourceLabel("Live");
//             return;
//           }
//         }

//         try {
//           const fb = await api.get("/market/fallback");
//           const fbPrices = fb?.data?.prices || fb?.data || [];
//           if (!mounted) return;
//           if (Array.isArray(fbPrices) && fbPrices.length) {
//             setMarketTrends(fbPrices);
//             setMarketSourceLabel("Live (fallback)");
//           } else {
//             const cached = [
//               { name: "Wheat", price: "₹2,200", changePercent: 2.1 },
//               { name: "Rice", price: "₹3,500", changePercent: -1.2 },
//               { name: "Cotton", price: "₹6,800", changePercent: 3.5 },
//             ];
//             setMarketTrends(cached);
//             setMarketSourceLabel("Cached");
//           }
//         } catch (err) {
//           const cached = [
//             { name: "Wheat", price: "₹2,200", changePercent: 2.1 },
//             { name: "Rice", price: "₹3,500", changePercent: -1.2 },
//             { name: "Cotton", price: "₹6,800", changePercent: 3.5 },
//           ];
//           if (!mounted) return;
//           setMarketTrends(cached);
//           setMarketSourceLabel("Cached");
//         }
//       } catch (err) {
//         console.error("Market/updates fetch error:", err);
//       }
//     }
//     loadMarketAndUpdates();
//     const id = setInterval(loadMarketAndUpdates, 30_000);
//     return () => {
//       mounted = false;
//       clearInterval(id);
//     };
//   }, []);

//   // Socket Logic
//   useEffect(() => {
//     const SOCKET_URL =
//       import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
//     let socket;
//     try {
//       socket = io(SOCKET_URL, {
//         path: "/socket.io",
//         transports: ["websocket"],
//       });
//       socket.on("market:update", (p) => {
//         if (p?.prices) setMarketTrends(p.prices);
//       });
//       socket.on("gov:update", (u) => {
//         if (u) setGovUpdates((prev) => [u, ...prev].slice(0, 40));
//       });
//       socket.on("notification", (n) => {
//         if (n) setNotifications((prev) => [n, ...prev].slice(0, 40));
//       });
//     } catch (e) {}
//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, []);

//   const tickerData = useMemo(
//     () => (marketTrends.length ? [...marketTrends, ...marketTrends] : []),
//     [marketTrends],
//   );

//   function handleFormChange(section, key, value) {
//     setForm((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [key]: value },
//     }));
//   }

//   async function saveProfile() {
//     setSaving(true);
//     try {
//       const payload = {
//         profile: {
//           ...(profileData?.profile || {}),
//           personal: {
//             ...(profileData?.profile?.personal || {}),
//             ...(form.personal || {}),
//           },
//           farm: { ...(profileData?.profile?.farm || {}), ...(form.farm || {}) },
//           insurance: {
//             ...(profileData?.profile?.insurance || {}),
//             ...(form.insurance || {}),
//           },
//           preferences: {
//             ...(profileData?.profile?.preferences || {}),
//             ...(form.preferences || {}),
//           },
//         },
//       };
//       const res = await api.put("/profile/me", payload);
//       const updated = res?.data?.profile || res?.data || null;
//       if (updated) {
//         setProfileData((prev) => ({
//           ...prev,
//           profile: typeof updated === "object" ? updated : prev.profile,
//         }));
//       }
//       setEditing(false);
//       setShowProfileModal(false);
//     } catch (err) {
//       console.error("Save profile failed:", err);
//       alert("Failed to save profile.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     window.location.href = "/login";
//   }

//   // --- RENDER ---
//   return (
//     <div className="h-screen flex bg-slate-50 text-slate-900 overflow-hidden font-sans">
//       <Sidebar onLogout={logout} />

//       <main className="flex-1 flex flex-col overflow-hidden relative">
//         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

//         <Topbar
//           profileData={profileData}
//           notifications={notifications}
//           onSearch={() => {}}
//           onOpenProfile={() => {
//             setShowProfileModal(true);
//             setEditing(false);
//           }}
//           onLogout={logout}
//         />

//         {showWelcome ? (
//           <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-700">
//             <div className="relative mb-8">
//               <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-20 animate-pulse" />
//               <div className="relative h-32 w-32 bg-gradient-to-br from-emerald-100 to-white rounded-full flex items-center justify-center shadow-xl border-4 border-white">
//                 <Leaf className="h-16 w-16 text-emerald-600 drop-shadow-md" />
//               </div>
//             </div>

//             <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
//               Welcome back,{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
//                 {profileData?.user?.name?.split(" ")[0] || "Farmer"}
//               </span>
//             </h1>
//             <p className="mt-4 text-lg text-slate-500 max-w-md">
//               Gathering your latest farm insights and market trends...
//             </p>

//             <div className="mt-8 flex gap-2">
//               <span
//                 className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
//                 style={{ animationDelay: "0ms" }}
//               />
//               <span
//                 className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
//                 style={{ animationDelay: "150ms" }}
//               />
//               <span
//                 className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
//                 style={{ animationDelay: "300ms" }}
//               />
//             </div>
//           </div>
//         ) : (
//           <>
//             <section className="flex-1 px-8 py-8 overflow-y-auto space-y-8 no-scrollbar">
//               {/* Header */}
//               <div className="flex justify-between items-end">
//                 <div>
//                   <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
//                     Dashboard Overview
//                   </h1>
//                   <p className="text-slate-500 mt-1">
//                     Real-time insights into your agricultural activities.
//                   </p>
//                 </div>
//                 <div className="text-sm font-medium text-slate-400 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
//                   {new Date().toLocaleDateString("en-US", {
//                     weekday: "long",
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//                 <StatCard
//                   title="Total Contracts"
//                   value={stats.totalContracts}
//                   icon={FileText}
//                   colorClass="emerald"
//                   bgClass="bg-emerald-50"
//                   borderClass="border-emerald-100"
//                 />
//                 <StatCard
//                   title="Pending Requests"
//                   value={stats.pendingRequests}
//                   icon={Timer}
//                   colorClass="amber"
//                   bgClass="bg-amber-50"
//                   borderClass="border-amber-100"
//                 />
//                 <StatCard
//                   title="Accepted Deals"
//                   value={stats.acceptedDeals}
//                   icon={CheckCircle2}
//                   colorClass="blue"
//                   bgClass="bg-blue-50"
//                   borderClass="border-blue-100"
//                 />
//                 <StatCard
//                   title="Negotiations"
//                   value={stats.activeNegotiations}
//                   icon={MessageSquare}
//                   colorClass="indigo"
//                   bgClass="bg-indigo-50"
//                   borderClass="border-indigo-100"
//                 />
//               </div>

//               {/* Main Content Split */}
//               <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-20">
//                 {/* Government Updates */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
//                   <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-red-100 rounded-lg">
//                         <Activity className="h-5 w-5 text-red-600" />
//                       </div>
//                       <h2 className="text-lg font-bold text-slate-800">
//                         Gov & Agri Updates
//                       </h2>
//                     </div>
//                     <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
//                       View All <ArrowRight className="h-3 w-3" />
//                     </button>
//                   </div>

//                   <div className="flex-1 overflow-y-auto custom-scrollbar">
//                     {Array.isArray(govUpdates) && govUpdates.length > 0 ? (
//                       govUpdates
//                         .slice(0, 10)
//                         .map((u, idx) => (
//                           <UpdateRow
//                             key={u._id || idx}
//                             pill={u.tag || u.source || "News"}
//                             title={u.title || u.message}
//                             date={
//                               u.date
//                                 ? new Date(u.date).toLocaleDateString()
//                                 : ""
//                             }
//                           />
//                         ))
//                     ) : (
//                       <div className="flex flex-col items-center justify-center h-full text-slate-400">
//                         <MessageSquare className="h-10 w-10 mb-2 opacity-20" />
//                         <p className="text-sm">No recent updates found</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* My Crops */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
//                   <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-emerald-100 rounded-lg">
//                         <Sprout className="h-5 w-5 text-emerald-600" />
//                       </div>
//                       <h2 className="text-lg font-bold text-slate-800">
//                         My Listings
//                       </h2>
//                     </div>
//                     <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
//                       Manage <ArrowRight className="h-3 w-3" />
//                     </button>
//                   </div>

//                   <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
//                     {!crops || crops.length === 0 ? (
//                       <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
//                         <Wheat className="h-12 w-12 text-slate-300 mb-3" />
//                         <p className="text-slate-500 font-medium">
//                           No crops listed yet.
//                         </p>
//                         <button className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
//                           Add First Crop
//                         </button>
//                       </div>
//                     ) : (
//                       crops.map((crop, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
//                         >
//                           <div className="flex items-center gap-4">
//                             <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-emerald-200 shadow-lg">
//                               {(crop.name && crop.name[0]) || "C"}
//                             </div>
//                             <div>
//                               <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
//                                 {crop.name}
//                               </h4>
//                               <p className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1">
//                                 Qty: {crop.qty}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-lg font-bold text-slate-800">
//                               {crop.price}
//                             </p>
//                             <span
//                               className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
//                                 crop.status === "active"
//                                   ? "bg-emerald-100 text-emerald-700"
//                                   : "bg-amber-100 text-amber-700"
//                               }`}
//                             >
//                               <span
//                                 className={`h-1.5 w-1.5 rounded-full ${crop.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}
//                               />
//                               {crop.status}
//                             </span>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Financial Market Ticker - Fixed Bottom */}
//             <div className="h-14 bg-slate-900 border-t border-slate-800 flex items-center shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-30">
//               <div className="px-6 h-full flex items-center bg-slate-800 border-r border-slate-700 z-10">
//                 <div className="flex items-center gap-2">
//                   <div className="relative">
//                     <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
//                     <div className="h-2 w-2 rounded-full bg-emerald-500 relative" />
//                   </div>
//                   <span className="text-xs font-bold text-white tracking-widest uppercase">
//                     Market
//                   </span>
//                 </div>
//                 <span className="ml-2 text-[10px] text-slate-400 border border-slate-600 px-1.5 rounded bg-slate-900/50">
//                   {marketSourceLabel}
//                 </span>
//               </div>

//               <div className="flex-1 overflow-hidden relative">
//                 <div className="ticker-track flex items-center gap-12 whitespace-nowrap px-4">
//                   {tickerData.map((item, index) => {
//                     const positive =
//                       String(
//                         item.change ?? item.changePercent ?? "",
//                       ).startsWith("+") || item.changePercent > 0;
//                     const Icon = positive ? TrendingUp : TrendingDown;
//                     return (
//                       <div
//                         key={`${item.name}-${index}`}
//                         className="flex items-center gap-3"
//                       >
//                         <span className="text-sm font-bold text-slate-200">
//                           {item.crop || item.name}
//                         </span>
//                         <span className="text-sm font-mono text-slate-400">
//                           {item.price ??
//                             (typeof item.price === "number"
//                               ? `₹${item.price}`
//                               : "")}
//                         </span>
//                         <span
//                           className={`flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded ${
//                             positive
//                               ? "text-emerald-400 bg-emerald-400/10"
//                               : "text-red-400 bg-red-400/10"
//                           }`}
//                         >
//                           <Icon className="h-3 w-3" />
//                           {item.change ??
//                             (item.changePercent !== undefined
//                               ? `${item.changePercent > 0 ? "+" : ""}${item.changePercent}%`
//                               : "")}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 {/* Gradient Masks for Ticker */}
//                 <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
//                 <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => {
//           setShowProfileModal(false);
//           setEditing(false);
//         }}
//         profileData={profileData}
//         form={form}
//         editing={editing}
//         setEditing={setEditing}
//         saving={saving}
//         saveProfile={saveProfile}
//         handleFormChange={handleFormChange}
//       />
//     </div>
//   );
// }


// import React, { useEffect, useState, useMemo } from "react";
// import api from "../../api/axios";
// import {
//   FileText,
//   MessageSquare,
//   CheckCircle2,
//   Timer,
//   TrendingUp,
//   TrendingDown,
//   ArrowRight,
//   Sparkles,
// } from "lucide-react";

// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import { useNavigate } from "react-router-dom";

// /* ---------- STAT CARD ---------- */
// function StatCard({ title, value, icon: Icon }) {
//   return (
//     <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition">
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-sm text-slate-500">{title}</p>
//           <h2 className="text-2xl font-bold text-slate-800">{value}</h2>
//         </div>
//         <div className="p-3 bg-green-50 rounded-xl">
//           <Icon className="text-green-600" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function FarmerDashboard() {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState(null);
//   const [contracts, setContracts] = useState([]);

//   const [stats, setStats] = useState({
//     totalContracts: 0,
//     pendingRequests: 0,
//     acceptedDeals: 0,
//     activeNegotiations: 0,
//   });
//   const [marketTrends, setMarketTrends] = useState([]);
//   const [marketSourceLabel, setMarketSourceLabel] = useState("Live");

//   const tickerData = useMemo(() => {
//     if (!Array.isArray(marketTrends)) return [];
//     return [...marketTrends, ...marketTrends];
//   }, [marketTrends]);

//   /* ---------- LOAD PROFILE ---------- */
//   useEffect(() => {
//     async function loadProfile() {
//       try {
//         const res = await api.get("/profile/me");
//         const payload = res.data;

//         const dashboard = payload.dashboard || {};

//         const cultivation = dashboard.cultivationContracts || [];
//         const harvest = dashboard.harvestContracts || [];

//         const allContracts = [
//           ...cultivation.map((c) => ({ ...c, type: "CULTIVATION" })),
//           ...harvest.map((c) => ({ ...c, type: "HARVEST" })),
//         ];

//         setContracts(allContracts);
//         setProfileData(payload);

//         setStats({
//           totalContracts: dashboard.totalContracts || allContracts.length,
//           pendingRequests: allContracts.filter((c) => c.status === "PENDING")
//             .length,
//           acceptedDeals: allContracts.filter((c) =>
//             ["ACTIVE", "ACCEPTED"].includes(c.status),
//           ).length,
//           activeNegotiations: allContracts.filter(
//             (c) => c.status === "NEGOTIATING",
//           ).length,
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     loadProfile();
//   }, []);

//   /* ---------- MARKET ---------- */
//   useEffect(() => {
//     async function loadMarket() {
//       try {
//         const res = await api.get("/market");

//         console.log("MARKET:", res.data);

//         const data = res.data?.prices || res.data?.data || res.data || [];

//         if (Array.isArray(data) && data.length) {
//           setMarketTrends(data);
//           setMarketSourceLabel("Live");
//         } else {
//           throw new Error("No data");
//         }
//       } catch (err) {
//         console.log("Using fallback market data");

//         const fallback = [
//           { name: "Wheat", price: "₹2200", changePercent: 2.1 },
//           { name: "Rice", price: "₹3500", changePercent: -1.2 },
//           { name: "Cotton", price: "₹6800", changePercent: 3.5 },
//         ];

//         setMarketTrends(fallback);
//         setMarketSourceLabel("Cached");
//       }
//     }

//     loadMarket();
//   }, []);

//   /* ---------- NEXT ACTION ---------- */
//   function getNextAction(c) {
//     if (c.payments?.some((p) => p.status === "DUE")) {
//       return { label: "Complete Payment", priority: "high" };
//     }

//     if (c.cultivationStages?.some((s) => s.status === "PENDING")) {
//       return { label: "Update Stage", priority: "medium" };
//     }

//     if (c.status === "PENDING") {
//       return { label: "Respond to Request", priority: "high" };
//     }

//     return { label: "On Track", priority: "low" };
//   }

//   return (
//     <div className="flex h-screen bg-slate-50">
//       <Sidebar />

//       <main className="flex-1 overflow-y-auto p-6 space-y-6">
//         <Topbar profileData={profileData} />

//         {/* HEADER */}
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">
//             Welcome, {profileData?.user?.name}
//           </h1>
//           <p className="text-slate-500 mt-1">
//             Manage your contracts and farm operations efficiently 🌱
//           </p>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
//           <StatCard
//             title="Total Contracts"
//             value={stats.totalContracts}
//             icon={FileText}
//           />
//           <StatCard
//             title="Pending"
//             value={stats.pendingRequests}
//             icon={Timer}
//           />
//           <StatCard
//             title="Active Deals"
//             value={stats.acceptedDeals}
//             icon={CheckCircle2}
//           />
//           <StatCard
//             title="Negotiations"
//             value={stats.activeNegotiations}
//             icon={MessageSquare}
//           />
//         </div>

//         {/* QUICK ACTIONS */}
//         <div className="bg-white p-6 rounded-2xl border shadow-sm">
//           <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
//             <Sparkles size={18} /> Quick Actions
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <button
//               onClick={() => navigate("/farmer/harvest-crop")}
//               className="p-4 rounded-xl bg-green-50 hover:bg-green-100 transition text-left"
//             >
//               🌾
//               <p className="font-semibold mt-2">Create Harvest</p>
//             </button>

//             <button
//               onClick={() => navigate("/farmer/contracts")} // ✅ FIXED
//               className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition text-left"
//             >
//               📄
//               <p className="font-semibold mt-2">All Contracts</p>
//             </button>

//             <button
//               onClick={() => navigate("/farmer/harvest-contracts")} // optional
//               className="p-4 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition text-left"
//             >
//               📍
//               <p className="font-semibold mt-2">Harvest Contracts</p>
//             </button>

//             <button
//               onClick={() => navigate("/farmer/negotiations")} // ✅ FIXED
//               className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition text-left"
//             >
//               💬
//               <p className="font-semibold mt-2">Negotiations</p>
//             </button>
//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           {/* ACTIVE CONTRACTS */}
//           <div className="bg-white p-5 rounded-2xl border shadow-sm">
//             <h2 className="font-bold text-lg mb-4">Active Contracts</h2>

//             {contracts.length === 0 ? (
//               <p className="text-slate-400">No contracts yet</p>
//             ) : (
//               contracts.map((c, i) => {
//                 const cropName = c.cropName || c.harvestDetails?.cropName;

//                 return (
//                   <div
//                     key={c.contractId || i}
//                     className="p-4 mb-3 rounded-xl border hover:shadow-md transition"
//                   >
//                     {/* TOP */}
//                     <div className="flex justify-between items-center">
//                       <h4 className="font-bold text-slate-800">{cropName}</h4>
//                       <span className="text-xs bg-slate-100 px-2 py-1 rounded">
//                         {c.type}
//                       </span>
//                     </div>

//                     {/* STATUS */}
//                     <p className="text-sm text-slate-500 mt-1">
//                       Status: <span className="font-semibold">{c.status}</span>
//                     </p>

//                     {/* DETAILS */}
//                     <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-3">
//                       {c.type === "CULTIVATION" ? (
//                         <>
//                           <p>🌾 Area: {c.area || "-"}</p>
//                           <p>📦 Yield: {c.expectedYield || "-"}</p>
//                         </>
//                       ) : c.type === "HARVEST" ? (
//                         <>
//                           <p>📦 Qty: {c.harvestDetails?.quantity || "-"}</p>
//                           <p>💰 Price: ₹{c.pricePerUnit || "-"}</p>
//                         </>
//                       ) : null}
//                     </div>

//                     {/* PROGRESS */}
//                     {c.tracking && (
//                       <>
//                         <div className="mt-3">
//                           <div className="h-2 bg-gray-200 rounded">
//                             <div
//                               className="h-2 bg-green-500 rounded"
//                               style={{
//                                 width: `${c.tracking.progressPercent || 0}%`,
//                               }}
//                             />
//                           </div>
//                         </div>

//                         <div className="flex justify-between text-xs mt-1 text-gray-500">
//                           <span>
//                             {c.tracking.currentStage || "Not started"}
//                           </span>
//                           <span>{c.tracking.progressPercent || 0}%</span>
//                         </div>
//                       </>
//                     )}

//                     {/* BUTTON */}
//                     <button
//                       onClick={() =>
//                         navigate(
//                           c.type === "CULTIVATION"
//                             ? `/cultivation/contract-tracking/${c.contractId}`
//                             : `/farmer/harvest-contract-tracking/${c.contractId}`,
//                         )
//                       }
//                       className="mt-3 text-sm text-green-600 font-semibold flex items-center gap-1"
//                     >
//                       View Details <ArrowRight size={14} />
//                     </button>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* NEXT ACTIONS */}
//           <div className="bg-white p-5 rounded-2xl border shadow-sm">
//             <h2 className="font-bold text-lg mb-4">Next Actions</h2>

//             {contracts.length === 0 ? (
//               <p className="text-slate-400">No actions required</p>
//             ) : (
//               contracts.map((c, i) => {
//                 const cropName = c.cropName || c.harvestDetails?.cropName;
//                 const action = getNextAction(c);

//                 const priorityColor =
//                   action.priority === "high"
//                     ? "text-red-600 bg-red-50"
//                     : action.priority === "medium"
//                       ? "text-amber-600 bg-amber-50"
//                       : "text-emerald-600 bg-emerald-50";

//                 return (
//                   <div
//                     key={c.contractId || i}
//                     className="flex items-center justify-between p-3 rounded-xl border mb-2 hover:shadow-sm transition"
//                   >
//                     {/* LEFT */}
//                     <div>
//                       <p className="font-semibold text-slate-800 text-sm">
//                         {cropName}
//                       </p>

//                       <p className="text-xs text-slate-500">
//                         {c.type} • {c.status}
//                       </p>
//                     </div>

//                     {/* RIGHT */}
//                     <div className="flex items-center gap-2">
//                       {/* PRIORITY DOT */}
//                       <span
//                         className={`px-2 py-1 rounded text-xs font-bold ${priorityColor}`}
//                       >
//                         {action.priority.toUpperCase()}
//                       </span>

//                       {/* ACTION BUTTON */}
//                       <button
//                         onClick={() =>
//                           navigate(
//                             c.type === "CULTIVATION"
//                               ? `/cultivation/contract-tracking/${c.contractId}`
//                               : `/farmer/harvest-contract-tracking/${c.contractId}`,
//                           )
//                         }
//                         className="text-xs font-semibold text-green-600 hover:underline"
//                       >
//                         {action.label}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* INSIGHTS */}
//         <div className="bg-white p-5 rounded-2xl border shadow-sm">
//           <h2 className="font-bold text-lg mb-3">Insights</h2>

//           <ul className="text-sm text-slate-600 space-y-2">
//             <li>📈 You have {stats.acceptedDeals} active contracts</li>
//             <li>⚠️ {stats.pendingRequests} pending requests</li>
//             <li>🌾 Primary crop: {contracts[0]?.cropName || "N/A"}</li>
//           </ul>
//         </div>

//         {/* MARKET */}
//         {/* Financial Market Ticker - Fixed Bottom */}
//         <div className="h-14 bg-slate-900 border-t border-slate-800 flex items-center shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-30">
//           <div className="px-6 h-full flex items-center bg-slate-800 border-r border-slate-700 z-10">
//             <div className="flex items-center gap-2">
//               <div className="relative">
//                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
//                 <div className="h-2 w-2 rounded-full bg-emerald-500 relative" />
//               </div>
//               <span className="text-xs font-bold text-white tracking-widest uppercase">
//                 Market
//               </span>
//             </div>

//             <span className="ml-2 text-[10px] text-slate-400 border border-slate-600 px-1.5 rounded bg-slate-900/50">
//               {marketSourceLabel}
//             </span>
//           </div>

//           <div className="flex-1 overflow-hidden relative">
//             <div className="ticker-track flex items-center gap-12 whitespace-nowrap px-4">
//               {(Array.isArray(tickerData) ? tickerData : []).map(
//                 (item, index) => {
//                   const positive =
//                     String(item.change ?? item.changePercent ?? "").startsWith(
//                       "+",
//                     ) || item.changePercent > 0;

//                   const Icon = positive ? TrendingUp : TrendingDown;

//                   return (
//                     <div
//                       key={`${item.name}-${index}`}
//                       className="flex items-center gap-3"
//                     >
//                       <span className="text-sm font-bold text-slate-200">
//                         {item.crop || item.name}
//                       </span>

//                       <span className="text-sm font-mono text-slate-400">
//                         {item.price}
//                       </span>

//                       <span
//                         className={`flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded ${
//                           positive
//                             ? "text-emerald-400 bg-emerald-400/10"
//                             : "text-red-400 bg-red-400/10"
//                         }`}
//                       >
//                         <Icon className="h-3 w-3" />
//                         {item.change ??
//                           (item.changePercent !== undefined
//                             ? `${item.changePercent > 0 ? "+" : ""}${item.changePercent}%`
//                             : "")}
//                       </span>
//                     </div>
//                   );
//                 },
//               )}
//             </div>

//             {/* Gradient edges */}
//             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
//             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }





import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import {
  FileText,
  MessageSquare,
  CheckCircle2,
  Timer,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Landmark,
  ExternalLink
} from "lucide-react";

import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import { useNavigate } from "react-router-dom";

/* ---------- STAT CARD (UPGRADED UI) ---------- */
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 blur-2xl pointer-events-none transition-transform group-hover:scale-110"></div>
      
      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <h2 className="text-3xl font-extrabold text-[#064e3b]">{value}</h2>
        </div>
        <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-sm">
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [contracts, setContracts] = useState([]);

  const [stats, setStats] = useState({
    totalContracts: 0,
    pendingRequests: 0,
    acceptedDeals: 0,
    activeNegotiations: 0,
  });
  const [marketTrends, setMarketTrends] = useState([]);
  const [marketSourceLabel, setMarketSourceLabel] = useState("Live");

  const tickerData = useMemo(() => {
    if (!Array.isArray(marketTrends)) return [];
    return [...marketTrends, ...marketTrends];
  }, [marketTrends]);

  /* ---------- LOAD PROFILE ---------- */
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/profile/me");
        const payload = res.data;

        const dashboard = payload.dashboard || {};

        const cultivation = dashboard.cultivationContracts || [];
        const harvest = dashboard.harvestContracts || [];

        const allContracts = [
          ...cultivation.map((c) => ({ ...c, type: "CULTIVATION" })),
          ...harvest.map((c) => ({ ...c, type: "HARVEST" })),
        ];

        setContracts(allContracts);
        setProfileData(payload);

        setStats({
          totalContracts: dashboard.totalContracts || allContracts.length,
          pendingRequests: allContracts.filter((c) => c.status === "PENDING")
            .length,
          acceptedDeals: allContracts.filter((c) =>
            ["ACTIVE", "ACCEPTED"].includes(c.status),
          ).length,
          activeNegotiations: allContracts.filter(
            (c) => c.status === "NEGOTIATING",
          ).length,
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, []);

  /* ---------- MARKET ---------- */
  useEffect(() => {
    async function loadMarket() {
      try {
        const res = await api.get("/market");

        console.log("MARKET:", res.data);

        const data = res.data?.prices || res.data?.data || res.data || [];

        if (Array.isArray(data) && data.length) {
          setMarketTrends(data);
          setMarketSourceLabel("Live");
        } else {
          throw new Error("No data");
        }
      } catch (err) {
        console.log("Using fallback market data");

        const fallback = [
          { name: "Wheat", price: "₹2200", changePercent: 2.1 },
          { name: "Rice", price: "₹3500", changePercent: -1.2 },
          { name: "Cotton", price: "₹6800", changePercent: 3.5 },
        ];

        setMarketTrends(fallback);
        setMarketSourceLabel("Cached");
      }
    }

    loadMarket();
  }, []);

  /* ---------- NEXT ACTION LOGIC ---------- */
  function getNextAction(c) {
    if (c.payments?.some((p) => p.status === "DUE")) {
      return { label: "Complete Payment", priority: "high" };
    }

    if (c.cultivationStages?.some((s) => s.status === "PENDING")) {
      return { label: "Update Stage", priority: "medium" };
    }

    if (c.status === "PENDING") {
      return { label: "Respond to Request", priority: "high" };
    }

    return { label: "On Track", priority: "low" };
  }

  return (
    <div className="flex h-screen bg-[#f4f6f8] font-sans text-slate-800 overflow-hidden">
      <div className="h-full flex-shrink-0 z-30 shadow-2xl bg-white">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col h-full overflow-y-auto relative scroll-smooth">
        
        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full flex-1">
          <Topbar profileData={profileData} />

          {/* HEADER */}
          <div className="mt-2">
            <h1 className="text-3xl md:text-[38px] font-bold text-[#064e3b] font-serif tracking-tight">
              Welcome back, {profileData?.user?.name || "Farmer"}
            </h1>
            <p className="text-[15px] text-slate-500 mt-2 font-medium">
              Here is an overview of your contracts and farm operations today. 🌱
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard title="Total Contracts" value={stats.totalContracts} icon={FileText} />
            <StatCard title="Pending" value={stats.pendingRequests} icon={Timer} />
            <StatCard title="Active Deals" value={stats.acceptedDeals} icon={CheckCircle2} />
            <StatCard title="Negotiations" value={stats.activeNegotiations} icon={MessageSquare} />
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-[18px] font-bold text-[#064e3b] mb-5 flex items-center gap-2 font-serif">
              <div className="p-1.5 bg-yellow-100 rounded-lg text-yellow-600">
                <Sparkles size={18} />
              </div>
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <button
                onClick={() => navigate("/farmer/harvest-crop")}
                className="group p-5 rounded-xl border border-emerald-100 bg-[#fcfdfc] hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">🌾</div>
                <p className="font-bold text-emerald-900">Create Harvest</p>
              </button>

              <button
                onClick={() => navigate("/farmer/contracts")}
                className="group p-5 rounded-xl border border-blue-100 bg-[#fcfdff] hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">📄</div>
                <p className="font-bold text-blue-900">All Contracts</p>
              </button>

              <button
                onClick={() => navigate("/farmer/harvest-contracts")}
                className="group p-5 rounded-xl border border-amber-100 bg-[#fffcf8] hover:bg-amber-50 hover:border-amber-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">📍</div>
                <p className="font-bold text-amber-900">Harvest Contracts</p>
              </button>

              <button
                onClick={() => navigate("/farmer/negotiations")}
                className="group p-5 rounded-xl border border-purple-100 bg-[#fdfcff] hover:bg-purple-50 hover:border-purple-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">💬</div>
                <p className="font-bold text-purple-900">Negotiations</p>
              </button>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* ACTIVE CONTRACTS */}
            <div className="bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
              <h2 className="text-[20px] font-bold text-[#064e3b] mb-6 font-serif">Active Contracts</h2>

              {contracts.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-slate-400 font-medium">No contracts yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contracts.map((c, i) => {
                    const cropName = c.cropName || c.harvestDetails?.cropName;

                    return (
                      <div
                        key={c.contractId || i}
                        className="p-5 rounded-xl border border-slate-100 bg-[#fbfcfb] hover:border-emerald-400 hover:shadow-[0_4px_15px_rgb(0,0,0,0.0)] transition-all"
                      >
                        {/* TOP */}
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-[16px] font-bold text-slate-800">{cropName}</h4>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md tracking-wider">
                            {c.type}
                          </span>
                        </div>

                        {/* STATUS */}
                        <p className="text-[13px] text-slate-500 mb-3">
                          Status: <span className="font-semibold text-slate-700">{c.status}</span>
                        </p>

                        {/* DETAILS */}
                        <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-slate-50 text-[13px] text-slate-600 mb-3 shadow-sm">
                          {c.type === "CULTIVATION" ? (
                            <>
                              <p className="font-medium">🌾 Area: <span className="text-slate-800">{c.area || "-"}</span></p>
                              <p className="font-medium">📦 Yield: <span className="text-slate-800">{c.expectedYield || "-"}</span></p>
                            </>
                          ) : c.type === "HARVEST" ? (
                            <>
                              <p className="font-medium">📦 Qty: <span className="text-slate-800">{c.harvestDetails?.quantity || "-"}</span></p>
                              <p className="font-medium">💰 Price: <span className="text-slate-800">₹{c.pricePerUnit || "-"}</span></p>
                            </>
                          ) : null}
                        </div>

                        {/* PROGRESS */}
                        {c.tracking && (
                          <div className="mb-4">
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#10b981] rounded-full transition-all duration-500"
                                style={{ width: `${c.tracking.progressPercent || 0}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[12px] mt-1.5 text-slate-500 font-medium">
                              <span>{c.tracking.currentStage || "Not started"}</span>
                              <span className="text-emerald-600 font-bold">{c.tracking.progressPercent || 0}%</span>
                            </div>
                          </div>
                        )}

                        {/* BUTTON */}
                        <button
                          onClick={() =>
                            navigate(
                              c.type === "CULTIVATION"
                                ? `/cultivation/contract-tracking/${c.contractId}`
                                : `/farmer/harvest-contract-tracking/${c.contractId}`,
                            )
                          }
                          className="w-full mt-1 py-2.5 bg-white border border-slate-200 text-[13px] text-slate-700 font-bold rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                        >
                          View Details <ArrowRight size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: GOVT SCHEMES & INSIGHTS */}
            <div className="flex flex-col gap-8">
              
              {/* GOVT SCHEMES & RELIEF (Replaced Action Required) */}
              <div className="bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
                <h2 className="text-[20px] font-bold text-[#064e3b] mb-5 font-serif flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Landmark size={18} />
                  </div>
                  Govt. Schemes & Relief
                </h2>

                <div className="space-y-3">
                  {/* Scheme 1 */}
                  <div className="group p-4 rounded-xl border border-slate-100 bg-[#f8fafc] hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-blue-800 transition-colors">PM Fasal Bima Yojana (PMFBY)</h4>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-600" />
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                      Comprehensive crop insurance against unpreventable natural risks like droughts, floods, and pests.
                    </p>
                  </div>

                  {/* Scheme 2 */}
                  <div className="group p-4 rounded-xl border border-slate-100 bg-[#f8fafc] hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">PM-KISAN Samman Nidhi</h4>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-emerald-600" />
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                      Direct income support of ₹6,000 per year for all landholding farmer families.
                    </p>
                  </div>

                  {/* Scheme 3 */}
                  <div className="group p-4 rounded-xl border border-slate-100 bg-[#f8fafc] hover:bg-amber-50 hover:border-amber-200 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-amber-800 transition-colors">Disaster Relief Fund (NDRF)</h4>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-amber-600" />
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                      Immediate financial assistance during severe natural calamities like cyclones or extreme rainfall.
                    </p>
                  </div>
                </div>

                <button className="w-full mt-4 py-2.5 text-[13px] font-bold text-[#064e3b] hover:bg-emerald-50 rounded-lg transition-colors border border-slate-100 hover:border-emerald-200 flex items-center justify-center gap-1.5">
                  Browse All Schemes <ArrowRight size={14} />
                </button>
              </div>

              {/* INSIGHTS */}
              <div className="bg-gradient-to-br from-[#064e3b] to-[#047857] p-7 rounded-2xl shadow-lg text-white relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
                <div className="absolute top-10 -right-5 w-16 h-16 bg-white opacity-10 rounded-full"></div>
                
                <h2 className="font-bold text-[20px] mb-4 font-serif flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">📈</div> Insights
                </h2>
                <ul className="text-[14px] text-emerald-50 space-y-3 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                    You have {stats.acceptedDeals} active contracts operating smoothly.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
                    {stats.pendingRequests} pending requests awaiting your response.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                    Primary focus crop: {contracts[0]?.cropName || "N/A"}.
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* MARKET TICKER - Sticky Bottom */}
        <div className="sticky bottom-0 mt-auto h-14 bg-[#064e3b] border-t border-[#047857] flex items-center shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 overflow-hidden">
          
          {/* Label Section */}
          <div className="px-6 h-full flex items-center bg-[#022c22] border-r border-[#047857] z-20 relative shadow-[4px_0_15px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-[#10b981] animate-ping absolute inset-0 opacity-75" />
                <div className="h-2 w-2 rounded-full bg-[#10b981] relative" />
              </div>
              <span className="text-[13px] font-extrabold text-white tracking-widest uppercase">
                Market
              </span>
            </div>
            <span className="ml-3 text-[10px] text-emerald-200 border border-emerald-800 px-1.5 py-0.5 rounded bg-black/20 font-bold">
              {marketSourceLabel}
            </span>
          </div>

          {/* Scrolling Ticker Section */}
          <div className="flex-1 relative h-full flex items-center">
            {/* CSS defined animation class */}
            <div className="animate-marquee flex items-center gap-12 whitespace-nowrap pl-6">
              {(Array.isArray(tickerData) ? tickerData : []).map(
                (item, index) => {
                  const positive =
                    String(item.change ?? item.changePercent ?? "").startsWith(
                      "+",
                    ) || item.changePercent > 0;

                  const Icon = positive ? TrendingUp : TrendingDown;

                  return (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[14px] font-bold text-white">
                        {item.crop || item.name}
                      </span>

                      <span className="text-[14px] font-mono font-medium text-emerald-100">
                        {item.price}
                      </span>

                      <span
                        className={`flex items-center gap-1 text-[11px] font-extrabold px-1.5 py-0.5 rounded ${
                          positive
                            ? "text-[#10b981] bg-[#10b981]/20"
                            : "text-red-400 bg-red-400/20"
                        }`}
                      >
                        <Icon className="h-3 w-3" strokeWidth={3} />
                        {item.change ??
                          (item.changePercent !== undefined
                            ? `${item.changePercent > 0 ? "+" : ""}${item.changePercent}%`
                            : "")}
                      </span>
                    </div>
                  );
                },
              )}
            </div>

            {/* Gradient Fade Edges for smooth scroll appearance */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#064e3b] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#064e3b] to-transparent pointer-events-none z-10" />
          </div>
        </div>

      </main>

      {/* Global styles for the continuous marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
