// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// const ActiveContracts = () => {
//   const [contracts, setContracts] = useState([null]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchActiveContracts();
//   }, []);

//   const fetchActiveContracts = async () => {
//     try {
//       const res = await axios.get("/contracts/active");
//       setContracts(res.data.contracts);
//     } catch (error) {
//       console.error("Failed to fetch active contracts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 text-sm text-gray-500">
//         Loading active contracts...
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Active Contracts
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           All currently active agreements
//         </p>
//       </div>

//       {/* Empty State */}
//       {contracts.length === 0 ? (
//         <div className="text-sm text-gray-500 border border-dashed rounded-lg p-6">
//           No active contracts found.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {contracts.map((contract) => (
//             <div
//               key={contract._id}
//               className="border rounded-lg p-4 bg-white hover:border-gray-300 transition"
//             >
//               {/* Contract ID */}
//               <div className="text-xs text-gray-400 mb-2">Contract ID</div>
//               <div className="text-sm font-medium text-gray-800 mb-3">
//                 {contract._id}
//               </div>

//               {/* Details */}
//               <div className="space-y-1 text-sm">
//                 <div>
//                   <span className="text-gray-500">Farmer:</span>{" "}
//                   <span className="text-gray-800">{contract.farmer?.name}</span>
//                 </div>

//                 <div>
//                   <span className="text-gray-500">Crop:</span>{" "}
//                   <span className="text-gray-800">{contract.crop?.name}</span>
//                 </div>
//               </div>

//               {/* Action */}
//               <button
//                 onClick={() => navigate(`/contracts/${contract._id}`)}
//                 className="mt-4 text-sm text-green-600 hover:underline"
//               >
//                 View Details →
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // export default ActiveContracts;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// const ActiveContracts = () => {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchActiveContracts();
//   }, []);

//   const fetchActiveContracts = async () => {
//     try {
//       const res = await axios.get("/contracts/active");
//       setContracts(res.data.contracts);
//     } catch (error) {
//       console.error("Failed to fetch active contracts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 text-sm text-gray-500">
//         Loading active contracts...
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Active Contracts
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           All currently active agreements
//         </p>
//       </div>

//       {/* Empty State */}
//       {contracts.length === 0 ? (
//         <div className="text-sm text-gray-500 border border-dashed rounded-lg p-6">
//           No active contracts found.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {contracts.map((contract) => (
//             <div
//               key={contract._id}
//               className="border rounded-lg p-4 bg-white hover:border-gray-300 transition relative overflow-hidden"
//             >
//               {/* AI Status Badge - NEW INTEGRATION */}
//               {contract.aiQualityDetails && (
//                 <div className="absolute top-0 right-0">
//                   <span className={`text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase text-white ${
//                     contract.aiQualityDetails.grade === 'Pending'
//                       ? 'bg-amber-500'
//                       : 'bg-green-600'
//                   }`}>
//                     {contract.aiQualityDetails.grade === 'Pending' ? 'AI Pending' : `AI: ${contract.aiQualityDetails.grade}`}
//                   </span>
//                 </div>
//               )}

//               {/* Contract ID */}
//               <div className="text-xs text-gray-400 mb-2">Contract ID</div>
//               <div className="text-sm font-medium text-gray-800 mb-3">
//                 {contract._id}
//               </div>

//               {/* Details */}
//               <div className="space-y-1 text-sm">
//                 <div>
//                   <span className="text-gray-500">Farmer:</span>{" "}
//                   <span className="text-gray-800">{contract.farmer?.name}</span>
//                 </div>

//                 <div>
//                   <span className="text-gray-500">Crop:</span>{" "}
//                   <span className="text-gray-800">{contract.crop?.name}</span>
//                 </div>

//                 {/* Show Confidence score if verified */}
//                 {contract.aiQualityDetails?.grade !== 'Pending' && (
//                   <div className="text-[11px] text-green-700 mt-2 font-medium">
//                     Verified with {contract.aiQualityDetails?.confidence?.toFixed(1)}% confidence
//                   </div>
//                 )}
//               </div>

//               {/* Action */}
//               <button
//                 onClick={() => navigate(`/contracts/${contract._id}`)}
//                 className="mt-4 text-sm text-green-600 hover:underline flex items-center gap-1"
//               >
//                 View Details →
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActiveContracts;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   CheckCircle,
//   Clock,
//   ArrowRight,
//   Activity,
//   ShieldCheck,
//   Leaf,
//   Zap
// } from "lucide-react";
// import axios from "../../api/axios";

// const ActiveContracts = () => {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchActiveContracts();
//     // Optional: Auto-refresh every 60 seconds to catch AI grading updates seamlessly
//     // const interval = setInterval(fetchActiveContracts, 60000);
//     // return () => clearInterval(interval);
//   }, []);

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

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin shadow-md"></div>
//           <p className="text-sm text-emerald-600 font-bold tracking-widest uppercase animate-pulse">
//             Syncing Agri-Data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Calculate quick stats for the header
//   const totalLive = contracts.length;
//   const verifiedCount = contracts.filter(c => c.aiQualityDetails?.grade && c.aiQualityDetails.grade !== 'Pending').length;

//   return (
//     <div className="p-8 max-w-7xl mx-auto bg-slate-50 min-h-screen rounded-3xl">
//       {/* Page Header */}
//       <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
//             <Leaf className="text-emerald-600" size={36} />
//             Active Contracts
//           </h1>
//           <p className="text-md text-gray-500 mt-2 font-medium">
//             Monitor your ongoing agreements and AI quality verification status.
//           </p>
//         </div>

//         <div className="flex gap-4">
//           <div className="flex items-center gap-3 text-xs font-black text-emerald-700 bg-white px-5 py-3 rounded-2xl border border-emerald-100 shadow-sm">
//             <Activity size={16} className="animate-pulse text-emerald-500" />
//             <div>
//               <div className="text-[10px] text-gray-400 uppercase">Active</div>
//               {totalLive} AGREEMENTS
//             </div>
//           </div>
//           <div className="flex items-center gap-3 text-xs font-black text-blue-700 bg-white px-5 py-3 rounded-2xl border border-blue-100 shadow-sm">
//             <Zap size={16} className="text-blue-500" />
//             <div>
//               <div className="text-[10px] text-gray-400 uppercase">AI Verified</div>
//               {verifiedCount} HARVESTS
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Empty State */}
//       {contracts.length === 0 ? (
//         <div className="flex flex-col items-center justify-center p-24 border-4 border-dashed border-gray-200 rounded-[3rem] bg-white text-center">
//           <div className="bg-gray-50 p-6 rounded-full mb-6">
//             <Clock className="w-12 h-12 text-gray-300" />
//           </div>
//           <p className="text-2xl font-bold text-gray-800">No active contracts found.</p>
//           <p className="text-sm text-gray-400 mt-2 font-medium max-w-xs">
//             New contracts will appear here once signed.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {contracts.map((contract) => {
//             const isAiVerified = contract.aiQualityDetails?.grade && contract.aiQualityDetails.grade !== 'Pending';

//             return (
//               <div
//                 key={contract._id}
//                 className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-200 transition-all duration-500 ease-out"
//               >
//                 {/* AI Status Badge */}
//                 {contract.aiQualityDetails && (
//                   <div className="absolute top-0 right-0">
//                     <span className={`flex items-center gap-2 text-[11px] font-black px-6 py-3 rounded-bl-[1.8rem] uppercase text-white shadow-lg transition-colors ${
//                       !isAiVerified ? 'bg-amber-500' : 'bg-emerald-600'
//                     }`}>
//                       {!isAiVerified ? (
//                         <><Clock size={14} strokeWidth={3} className="animate-spin-slow" /> AI PENDING</>
//                       ) : (
//                         <><ShieldCheck size={14} strokeWidth={3} /> AI: {contract.aiQualityDetails.grade}</>
//                       )}
//                     </span>
//                   </div>
//                 )}

//                 {/* ID Header */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-black mb-3">
//                     <span className="flex h-2 w-2 relative">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//                     </span>
//                     Contract ID
//                   </div>
//                   <div className="text-sm font-mono font-bold text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 inline-block">
//                     #{contract._id.slice(-8).toUpperCase()}
//                   </div>
//                 </div>

//                 {/* Card Info Section */}
//                 <div className="space-y-4 mb-8">
//                   <div className="flex justify-between items-center bg-slate-50/80 p-4 rounded-3xl border border-transparent group-hover:border-slate-100 transition-colors">
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Farmer</span>
//                     <span className="text-sm font-black text-gray-800">{contract.farmer?.name || 'N/A'}</span>
//                   </div>

//                   <div className="flex justify-between items-center bg-slate-50/80 p-4 rounded-3xl border border-transparent group-hover:border-slate-100 transition-colors">
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Crop Type</span>
//                     <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
//                       <Leaf size={14} />
//                       {contract.crop?.name || 'Rice'}
//                     </span>
//                   </div>
//                 </div>

//                 {/* AI Detail Footer (Only if verified) */}
//                 {isAiVerified && (
//                   <div className="mb-8 p-5 bg-emerald-50/40 border border-emerald-100 rounded-[2rem] animate-in fade-in duration-700">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">Analysis Confidence</span>
//                       <span className="text-xs font-black text-emerald-600">
//                         {contract.aiQualityDetails?.confidence?.toFixed(1)}%
//                       </span>
//                     </div>
//                     <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden mb-3">
//                       <div
//                         className="bg-emerald-500 h-full rounded-full"
//                         style={{ width: `${contract.aiQualityDetails?.confidence}%` }}
//                       ></div>
//                     </div>
//                     <div className="text-[9px] text-emerald-600/60 font-bold leading-tight flex items-center gap-1.5">
//                       <Zap size={10} />
//                       Verified via AI Model
//                     </div>
//                   </div>
//                 )}

//                 {/* Navigation Button */}
//                 <button
//                   onClick={() => navigate(`/contracts/${contract._id}`)}
//                   className="w-full mt-2 flex items-center justify-center gap-3 py-5 px-6 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-200 transition-all duration-300 active:scale-[0.97] group"
//                 >
//                   Track Progress
//                   <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActiveContracts;

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
//         icon: <Activity size={10} />,
//       };
//     if (s.includes("DELIVERY") || s.includes("TRANSIT"))
//       return {
//         bg: "bg-[#0369a1]",
//         text: "text-white",
//         icon: <Truck size={10} />,
//       };
//     if (s.includes("COMPLETED"))
//       return {
//         bg: "bg-[#15803d]",
//         text: "text-white",
//         icon: <CheckCircle2 size={10} />,
//       };
//     if (s.includes("SENT") || s.includes("PENDING"))
//       return {
//         bg: "bg-[#b45309]",
//         text: "text-white",
//         icon: <Zap size={10} />,
//       };
//     return {
//       bg: "bg-slate-600",
//       text: "text-white",
//       icon: <Activity size={10} />,
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
//       const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
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
//         {/* TOPBAR - Flush to top, Functional */}
//         <div className="flex-shrink-0 z-50">
//           <Topbar
//             profileData={profileData}
//             onOpenProfile={() => setShowProfileModal(true)}
//             onLogout={logout}
//           />
//         </div>

//         {/* SEARCH & FILTER BAR */}
//         <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-6 mt-2 relative z-30">
//           <div className="bg-white p-2 rounded-[1.2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center">
//             <div className="relative flex-1 w-full">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={14}
//               />
//               <input
//                 type="text"
//                 placeholder="Search contracts..."
//                 className="w-full pl-9 pr-4 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]/5 focus:border-[#064e3b] transition-all text-xs"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-2 w-full md:w-auto">
//               <select
//                 className="w-full md:w-[140px] bg-[#f8fafc] border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-700 focus:outline-none cursor-pointer"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="ALL">All Status</option>
//                 <option value="ACTIVE">Active</option>
//                 <option value="DELIVERY_IN_PROGRESS">Delivery</option>
//                 <option value="COMPLETED">Completed</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* CONTRACTS GRID - 4 Column Layout */}
//         <div className="max-w-[1600px] mx-auto w-full px-4 lg:px-6 mt-6 pb-10 relative z-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {filteredContracts.map((contract) => {
//               const confidence = contract.aiQualityDetails?.confidence || 0;
//               const config = getStatusConfig(contract.status);

//               return (
//                 <div
//                   key={contract._id}
//                   className="group relative bg-white border border-slate-100 rounded-2xl py-7 px-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
//                 >
//                   <div className="absolute top-0 right-0">
//                     <span
//                       className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-tr-2xl rounded-bl-lg uppercase ${config.bg} ${config.text} tracking-wider`}
//                     >
//                       {config.icon}
//                       {contract.status?.replace(/_/g, " ")}
//                     </span>
//                   </div>

//                   <div className="mb-4 mt-1 flex items-center gap-1.5">
//                     <Hash size={10} className="text-[#92400e]" />
//                     <span className="text-[9px] font-mono font-bold text-[#92400e] bg-[#fef3c7] px-1.5 py-0.5 rounded border border-[#fde68a]">
//                       {contract._id.slice(-8).toUpperCase()}
//                     </span>
//                   </div>

//                   <div className="mb-4">
//                     <h3 className="text-base font-black text-slate-800 flex items-center gap-1.5 truncate">
//                       <Leaf className="text-emerald-500 shrink-0" size={12} />
//                       <span className="truncate">
//                         {contract.cropDetails?.cropName || "Crop"}
//                         {contract.cropDetails?.variety
//                           ? ` - ${contract.cropDetails.variety}`
//                           : ""}
//                       </span>
//                     </h3>
//                   </div>

//                   <div className="flex flex-col gap-1.5 mb-5 flex-1">
//                     <PartyBox
//                       icon={<User size={14} />}
//                       label="Farmer"
//                       name={contract.farmer?.name}
//                       color="bg-emerald-50 text-emerald-700"
//                     />
//                     <PartyBox
//                       icon={<ShoppingBag size={14} />}
//                       label="Buyer"
//                       name={contract.buyer?.name}
//                       color="bg-blue-50 text-blue-700"
//                     />
//                   </div>

//                   <div className="mb-5 p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl">
//                     <div className="flex justify-between items-center mb-1.5 px-1">
//                       <div className="flex items-center gap-1">
//                         <Zap size={10} className="text-emerald-600" />
//                         <span className="text-[8px] font-black text-emerald-800 uppercase tracking-tighter">
//                           Grading
//                         </span>
//                       </div>
//                       <span className="text-[9px] font-black text-emerald-600">
//                         {confidence > 0 ? `${confidence.toFixed(0)}%` : "--"}
//                       </span>
//                     </div>
//                     <div className="h-1 w-full bg-white rounded-full overflow-hidden">
//                       <div
//                         className="bg-[#10b981] h-full rounded-full transition-all duration-1000"
//                         style={{ width: `${confidence}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => navigate(`/contracts/${contract._id}`)}
//                     className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#047857] text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-[#064e3b] transition-all group"
//                   >
//                     Track Details
//                     <ArrowRight
//                       size={12}
//                       className="group-hover:translate-x-1 transition-transform"
//                     />
//                   </button>
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

// const PartyBox = ({ icon, label, name, color }) => (
//   <div className="flex items-center gap-2 p-1.5 bg-[#f8fafc] rounded-lg border border-slate-50">
//     <div
//       className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${color}`}
//     >
//       {icon}
//     </div>
//     <div className="min-w-0">
//       <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-0.5">
//         {label}
//       </p>
//       {/* Name size 14px as requested */}
//       <p className="text-[14px] font-bold text-slate-700 leading-none truncate">
//         {name || "Verified"}
//       </p>
//     </div>
//   </div>
// );

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
  CalendarDays
} from "lucide-react";
import axios from "../../api/axios";
import Sidebar from "../../components/Sidebar"; // farmer
import BuyerSidebar from "../../components/BuyerSidebar"; // buyer
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";

const ActiveContracts = () => {
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
      const matchesStatus = statusFilter === "ALL" || (c.contractStatus || c.status) === statusFilter;
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
                placeholder="Search Cultivation Contracts..."
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
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="FROZEN">Frozen</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* CONTRACTS GRID - 3 Column Layout */}
        <div className="max-w-[1600px] mx-auto w-full px-4 lg:px-6 mt-6 pb-10 relative z-20">
          {/* ✅ CHANGED TO 3 COLUMNS: lg:grid-cols-3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract) => {
              const config = getStatusConfig(contract.contractStatus || contract.status);

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
                      {(contract.contractStatus || contract.status)?.replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Crop Header */}
                  <div className="mb-2 pr-20">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1 truncate">
                      {contract.cropDetails?.cropName || "Crop Name"}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">
                      {contract.cropDetails?.variety || "Standard Variety"}
                    </p>
                  </div>

                  {/* ID & Expected Yield */}
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-1 text-slate-600"><Hash size={10}/> CULT-{contract._id.slice(-8).toUpperCase()}</span>
                    <span>•</span>
                    <span className="text-emerald-600 truncate">{contract.cropDetails?.expectedYield || "--"} Expected Yield</span>
                  </div>

                  {/* Counterparty Information */}
                  <div className="mb-5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      {isFarmer ? <ShoppingBag size={12}/> : <User size={12}/>}
                      {isFarmer ? "Buyer Details" : "Farmer Details"}
                    </p>
                    <p className="text-sm font-black text-slate-900 leading-tight truncate">
                      {isFarmer ? (contract.buyer?.name || "Verified Buyer") : (contract.farmer?.name || "Verified Farmer")}
                    </p>
                    <div className="flex items-start gap-1 mt-1.5 text-[10px] font-bold text-slate-500">
                      <MapPin size={12} className="text-rose-500 shrink-0 mt-0.5" />
                      <p className="leading-snug truncate whitespace-normal line-clamp-1">
                        {isFarmer 
                          ? (contract.buyer?.address || "Address details unavailable") 
                          : (contract.farmer?.address || "Address details unavailable")}
                      </p>
                    </div>
                  </div>

                  {/* Financials & Logistics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
                    {/* Contract Value */}
                    <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100/50">
                      <p className="text-[8px] font-black text-emerald-600/70 uppercase tracking-widest mb-1">Contract Value</p>
                      <p className="text-[13px] font-black text-emerald-700 flex items-center gap-1">
                        <Banknote size={14} /> ₹{(contract.pricing?.estimatedValue || contract.pricing?.agreedPricePerUnit || "--").toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Payment Verification */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Pmt Verification</p>
                      <p className={`text-[9px] font-black px-2 py-0.5 rounded w-fit uppercase tracking-widest ${
                          contract.payments && contract.payments.length > 0 && contract.payments[0].status === "VERIFIED" 
                          ? "bg-emerald-100/50 text-emerald-700" 
                          : "bg-amber-100/50 text-amber-700"
                      }`}>
                        {contract.payments && contract.payments.length > 0 ? contract.payments[0].status : "Awaiting Action"}
                      </p>
                    </div>

                    {/* Settlement Mode */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Settlement Mode</p>
                      <p className="text-[10px] font-black text-slate-800 leading-tight">
                        {contract.pricing?.advancePaymentPercent ? `${contract.pricing.advancePaymentPercent}% Advance` : "Milestone Based"}
                      </p>
                    </div>

                    {/* Est. Delivery */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Delivery Date</p>
                      <p className="text-[10px] font-black text-slate-800 leading-tight flex items-center gap-1.5">
                        <CalendarDays size={12} className="text-blue-600 shrink-0" />
                        <span className="truncate">{contract.delivery?.approxDeliveryMonth || "Not Scheduled"}</span>
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/contracts/${contract._id}`)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-slate-200 group active:scale-95"
                    >
                      Track Details
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