// import { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import {
//   Users,
//   FileText,
//   AlertTriangle,
//   TrendingUp,
//   Activity,
//   CheckCircle,
// } from "lucide-react";

// /* =========================
//    STAT CARD
// ========================= */
// function StatCard({ title, value, icon: IconComponent }) {
//   return (
//     <div className="bg-white p-5 rounded-2xl shadow border flex justify-between items-center hover:shadow-md transition">
//       <div>
//         <p className="text-xs text-gray-400 font-bold uppercase">{title}</p>
//         <h2 className="text-2xl font-black text-[#064e3b]">{value}</h2>
//       </div>
//       <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
//         <IconComponent size={22} />
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN
// ========================= */
// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [alerts, setAlerts] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [growth, setGrowth] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.get("/admin/dashboard-stats");

//       setStats(res.data.stats || {});
//       setAlerts(res.data.alerts || []);
//       setActivities(res.data.activities || []);
//       setGrowth(res.data.growth || {});
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f4f7f9]">
//       <AdminSidebar />

//       <main className="flex-1 p-8 overflow-y-auto">
//         <h1 className="text-3xl font-black text-[#064e3b] mb-6">
//           Admin Dashboard
//         </h1>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
//         >
//           + Create Govt Update
//         </button>

//         {/* ================= KPI ================= */}
//         <div className="grid grid-cols-4 gap-6 mb-6">
//           <StatCard title="Farmers" value={stats.farmers || 0} icon={Users} />
//           <StatCard title="Buyers" value={stats.buyers || 0} icon={Users} />
//           <StatCard
//             title="Active Contracts"
//             value={stats.contracts || 0}
//             icon={FileText}
//           />
//           <StatCard
//             title="Open Disputes"
//             value={stats.disputes || 0}
//             icon={AlertTriangle}
//           />
//         </div>

//         {/* ================= ALERTS ================= */}
//         <div className="bg-white p-6 rounded-2xl shadow border mb-6">
//           <h2 className="text-lg font-bold mb-3 text-red-600 flex items-center gap-2">
//             <AlertTriangle size={18} /> Action Required
//           </h2>

//           {alerts.length === 0 ? (
//             <p className="text-gray-400 text-sm">No urgent issues</p>
//           ) : (
//             <ul className="space-y-2">
//               {alerts.map((a, i) => (
//                 <li
//                   key={i}
//                   className="text-sm bg-red-50 p-3 rounded-lg flex justify-between"
//                 >
//                   <span>{a.message}</span>
//                   <span className="text-xs text-gray-500">{a.time}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* ================= GRID ================= */}
//         <div className="grid grid-cols-3 gap-6">
//           {/* 📈 GROWTH */}
//           <div className="bg-white p-5 rounded-2xl shadow border">
//             <h2 className="font-bold text-[#064e3b] mb-3 flex items-center gap-2">
//               <TrendingUp size={16} /> Growth Snapshot
//             </h2>

//             <div className="space-y-2 text-sm">
//               <p>👨‍🌾 +{growth.newFarmers || 0} Farmers this week</p>
//               <p>📄 +{growth.newContracts || 0} Contracts</p>
//               <p>📈 {growth.engagement || 0}% Engagement</p>
//             </div>
//           </div>

//           {/* 📊 CONTRACT STATUS */}
//           <div className="bg-white p-5 rounded-2xl shadow border">
//             <h2 className="font-bold text-[#064e3b] mb-3">
//               Contract Distribution
//             </h2>

//             <div className="space-y-2 text-sm">
//               <p>Active: {stats.active || 0}</p>
//               <p>Completed: {stats.completed || 0}</p>
//               <p>Cancelled: {stats.cancelled || 0}</p>
//             </div>

//             {/* simple bar */}
//             <div className="mt-3 h-2 bg-gray-200 rounded overflow-hidden flex">
//               <div
//                 className="bg-green-500"
//                 style={{ width: `${stats.active || 0}%` }}
//               />
//               <div
//                 className="bg-blue-500"
//                 style={{ width: `${stats.completed || 0}%` }}
//               />
//               <div
//                 className="bg-red-500"
//                 style={{ width: `${stats.cancelled || 0}%` }}
//               />
//             </div>
//           </div>

//           {/* ⚡ QUICK ACTIONS */}
//           <div className="bg-white p-5 rounded-2xl shadow border">
//             <h2 className="font-bold text-[#064e3b] mb-3">Quick Actions</h2>

//             <div className="space-y-2">
//               <button className="w-full bg-emerald-50 hover:bg-emerald-100 p-2 rounded text-sm">
//                 Verify Policies
//               </button>
//               <button className="w-full bg-blue-50 hover:bg-blue-100 p-2 rounded text-sm">
//                 View Support Tickets
//               </button>
//               <button className="w-full bg-yellow-50 hover:bg-yellow-100 p-2 rounded text-sm">
//                 Manage Users
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ================= ACTIVITY ================= */}
//         <div className="bg-white p-6 rounded-2xl shadow border mt-6">
//           <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-[#064e3b]">
//             <Activity size={18} /> Recent Activity
//           </h2>

//           {activities.length === 0 ? (
//             <p className="text-gray-400 text-sm">No recent activity</p>
//           ) : (
//             <ul className="space-y-2">
//               {activities.map((a, i) => (
//                 <li
//                   key={i}
//                   className="text-sm flex justify-between border-b pb-2"
//                 >
//                   <span>{a.message}</span>
//                   <span className="text-xs text-gray-400">{a.time}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         {showModal && (
//           <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//             <div className="relative">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-2 right-2 text-red-500"
//               >
//                 ✕
//               </button>

//               <AddGovtUpdate />
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
// function AddGovtUpdate() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     type: "SCHEME",
//     link: "",
//   });

//   const submit = async () => {
//     try {
//       if (!form.title || !form.description) {
//         alert("Title and Description are required");
//         return;
//       }

//       console.log("SENDING:", form);

//       await api.post("/admin/govt-update", form);

//       alert("Update posted!");

//       window.location.reload(); // refresh dashboard
//     } catch (err) {
//       console.error("ERROR:", err);
//       alert(err.response?.data?.message || "Failed to post update");
//     }
//   };
//   return (
//     <div className="bg-white p-6 rounded-xl shadow w-[400px]">
//       <h2 className="font-bold mb-3">Post Govt Update</h2>

//       <input
//         placeholder="Title"
//         className="w-full border p-2 mb-2"
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />

//       <textarea
//         placeholder="Description"
//         className="w-full border p-2 mb-2"
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />

//       <select
//         onChange={(e) => setForm({ ...form, type: e.target.value })}
//         className="w-full border p-2 mb-2"
//       >
//         <option value="SCHEME">Scheme</option>
//         <option value="ALERT">Alert</option>
//         <option value="DEADLINE">Deadline</option>
//       </select>

//       <input
//         placeholder="Optional Link"
//         className="w-full border p-2 mb-3"
//         onChange={(e) => setForm({ ...form, link: e.target.value })}
//       />

//       <button
//         onClick={submit}
//         className="bg-emerald-600 text-white px-4 py-2 rounded"
//       >
//         Publish
//       </button>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import {
//   Users,
//   FileText,
//   AlertTriangle,
//   TrendingUp,
//   Activity,
//   Plus,
//   ArrowRight,
//   ShieldCheck,
//   Briefcase
// } from "lucide-react";

// /* =========================
//    PREMIUM STAT CARD
// ========================= */
// function StatCard({ title, value, icon: IconComponent }) {
//   return (
//     <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex justify-between items-center group hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//       <div>
//         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{title}</p>
//         <h2 className="text-3xl font-black text-slate-800 leading-none">{value}</h2>
//       </div>
//       <div className="bg-slate-50 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-inner">
//         <IconComponent size={24} strokeWidth={2.5} />
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN DASHBOARD
// ========================= */
// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [alerts, setAlerts] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [growth, setGrowth] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.get("/admin/dashboard-stats");
//       setStats(res.data.stats || {});
//       setAlerts(res.data.alerts || []);
//       setActivities(res.data.activities || []);
//       setGrowth(res.data.growth || {});
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
//         {/* TOP BAR / HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Admin Dashboard</h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Operations Overview</p>
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
//           >
//             <Plus size={18} strokeWidth={3} /> Create Govt Update
//           </button>
//         </div>

//         {/* ================= KPI SECTION ================= */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard title="Farmers" value={stats.farmers || 0} icon={Users} />
//           <StatCard title="Buyers" value={stats.buyers || 0} icon={Users} />
//           <StatCard title="Active Contracts" value={stats.contracts || 0} icon={FileText} />
//           <StatCard title="Open Disputes" value={stats.disputes || 0} icon={AlertTriangle} />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* ================= ALERTS PANEL (Left) ================= */}
//           <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
//             <div className="flex items-center justify-between mb-6">
//                <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
//                 <AlertTriangle className="text-rose-500" size={24} /> Action Required
//               </h2>
//               <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Priority</span>
//             </div>

//             <div className="space-y-3">
//               {alerts.length === 0 ? (
//                 <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
//                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No urgent system issues</p>
//                 </div>
//               ) : (
//                 alerts.map((a, i) => (
//                   <div key={i} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all cursor-default">
//                     <div className="flex items-center gap-4">
//                       <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
//                       <span className="text-sm font-bold text-slate-700">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{a.time}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ================= GROWTH SNAPSHOT (Right) ================= */}
//           <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
//             <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
//               <TrendingUp size={180} />
//             </div>
            
//             <div>
//               <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
//                 <TrendingUp className="text-indigo-400" size={20} /> Growth Snapshot
//               </h2>

//               <div className="space-y-6 relative z-10">
//                 <GrowthItem label="New Farmers" value={`+${growth.newFarmers || 0}`} />
//                 <GrowthItem label="New Contracts" value={`+${growth.newContracts || 0}`} />
//                 <GrowthItem label="Engagement" value={`${growth.engagement || 0}%`} />
//               </div>
//             </div>

//             <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
//               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">
//                 Platform performance is <span className="text-emerald-400">stable</span> based on weekly onboarding.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ================= LOWER GRID ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          
//           {/* RECENT ACTIVITY */}
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
//             <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
//               <Activity size={24} className="text-indigo-600" /> Recent Activity
//             </h2>

//             <div className="space-y-4">
//               {activities.length === 0 ? (
//                 <p className="text-slate-400 text-sm italic">Syncing activity stream...</p>
//               ) : (
//                 activities.map((a, i) => (
//                   <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 transition-all">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
//                         <ArrowRight size={14} className="text-indigo-500" />
//                       </div>
//                       <span className="text-sm font-bold text-slate-600">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">{a.time}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* DISTRIBUTION & QUICK ACTIONS */}
//           <div className="space-y-8">
//             {/* CONTRACT STATUS DISTRIBUTION */}
//             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
//                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Contract Status Distribution</h2>
               
//                <div className="space-y-4 mb-6">
//                   <ProgressRow label="Active" value={stats.active || 0} color="bg-emerald-500" />
//                   <ProgressRow label="Completed" value={stats.completed || 0} color="bg-indigo-500" />
//                   <ProgressRow label="Cancelled" value={stats.cancelled || 0} color="bg-rose-500" />
//                </div>

//                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
//                   <div className="bg-emerald-500" style={{ width: `${stats.active || 0}%` }} />
//                   <div className="bg-indigo-500" style={{ width: `${stats.completed || 0}%` }} />
//                   <div className="bg-rose-500" style={{ width: `${stats.cancelled || 0}%` }} />
//                </div>
//             </div>

//             {/* QUICK ACTIONS */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <QuickActionBtn label="Verify Policies" icon={ShieldCheck} col="bg-indigo-50 text-indigo-600 hover:bg-indigo-600" />
//                 <QuickActionBtn label="Support" icon={Activity} col="bg-slate-900 text-white hover:bg-indigo-600" />
//                 <QuickActionBtn label="Users" icon={Users} col="bg-indigo-50 text-indigo-600 hover:bg-indigo-600" />
//             </div>
//           </div>
//         </div>

//         {/* ================= MODAL LOGIC ================= */}
//         {showModal && (
//           <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
//             <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all font-black z-20"
//               >
//                 ✕
//               </button>
//               <div className="p-2">
//                 <AddGovtUpdate />
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ---------- HELPER COMPONENTS ---------- */

// function GrowthItem({ label, value }) {
//   return (
//     <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
//       <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{label}</span>
//       <span className="text-2xl font-black text-indigo-400">{value}</span>
//     </div>
//   );
// }

// function ProgressRow({ label, value, color }) {
//   return (
//     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
//       <span className="text-slate-500">{label}</span>
//       <div className="flex items-center gap-2">
//         <div className={`w-2 h-2 rounded-full ${color}`}></div>
//         <span className="text-slate-800">{value}%</span>
//       </div>
//     </div>
//   );
// }

// function QuickActionBtn({ label, icon: Icon, col }) {
//   return (
//     <button className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border border-transparent transition-all duration-300 group ${col}`}>
//       <Icon size={20} className="mb-2 group-hover:scale-110 transition-transform" />
//       <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
//     </button>
//   );
// }

// /* AddGovtUpdate remains as a functional sub-component inside the file as per your original structure */
// function AddGovtUpdate() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     type: "SCHEME",
//     link: "",
//   });

//   const submit = async () => {
//     try {
//       if (!form.title || !form.description) {
//         alert("Title and Description are required");
//         return;
//       }
//       await api.post("/admin/govt-update", form);
//       alert("Update posted!");
//       window.location.reload(); 
//     } catch (err) {
//       console.error("ERROR:", err);
//       alert(err.response?.data?.message || "Failed to post update");
//     }
//   };

//   return (
//     <div className="p-8">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
//           <Plus size={24} strokeWidth={3} />
//         </div>
//         <h2 className="text-xl font-black text-slate-800 tracking-tight">Post Govt Update</h2>
//       </div>

//       <div className="space-y-4">
//         <input
//           placeholder="Update Title"
//           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold"
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <textarea
//           placeholder="Broadcast Description..."
//           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 h-32 transition-all text-sm font-medium"
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <select
//             onChange={(e) => setForm({ ...form, type: e.target.value })}
//             className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 text-xs font-black uppercase tracking-widest cursor-pointer"
//           >
//             <option value="SCHEME">Scheme</option>
//             <option value="ALERT">Alert</option>
//             <option value="DEADLINE">Deadline</option>
//           </select>

//           <input
//             placeholder="Official Link (Optional)"
//             className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 text-xs font-bold"
//             onChange={(e) => setForm({ ...form, link: e.target.value })}
//           />
//         </div>

//         <button
//           onClick={submit}
//           className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all mt-4"
//         >
//           Publish Update
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import {
//   Users,
//   FileText,
//   AlertTriangle,
//   TrendingUp,
//   Activity,
//   Plus,
//   ArrowRight,
//   ShieldCheck,
//   Briefcase,
//   Clock,
//   ChevronRight
// } from "lucide-react";

// /* =========================
//    PREMIUM STAT CARD
// ========================= */
// function StatCard({ title, value, icon: IconComponent }) {
//   return (
//     <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex justify-between items-center group hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//       <div>
//         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{title}</p>
//         <h2 className="text-3xl font-black text-slate-800 leading-none">{value}</h2>
//       </div>
//       <div className="bg-slate-50 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-inner">
//         <IconComponent size={24} strokeWidth={2.5} />
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN DASHBOARD
// ========================= */
// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [alerts, setAlerts] = useState([]);
//   const [complianceAlerts, setComplianceAlerts] = useState([]); // 🔥 FEATURE 4
//   const [activities, setActivities] = useState([]);
//   const [growth, setGrowth] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.get("/admin/dashboard-stats");
//       setStats(res.data.stats || {});
//       setAlerts(res.data.alerts || []);
//       setComplianceAlerts(res.data.complianceAlerts || []); // 🔥 FEATURE 4
//       setActivities(res.data.activities || []);
//       setGrowth(res.data.growth || {});
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
//         {/* TOP BAR / HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Admin Dashboard</h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Operations Overview</p>
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
//           >
//             <Plus size={18} strokeWidth={3} /> Create Broadcast
//           </button>
//         </div>

//         {/* ================= KPI SECTION ================= */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard title="Farmers" value={stats.farmers || 0} icon={Users} />
//           <StatCard title="Buyers" value={stats.buyers || 0} icon={Users} />
//           <StatCard title="Active Contracts" value={stats.active || 0} icon={FileText} />
//           <StatCard title="Open Disputes" value={stats.disputes || 0} icon={AlertTriangle} />
//         </div>

//         {/* 🔥 FEATURE 4: COMPLIANCE TRACKER WIDGET */}
//         {complianceAlerts.length > 0 && (
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 mb-8">
//             <div className="flex items-center justify-between mb-8">
//                <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
//                  <ShieldCheck className="text-emerald-600" size={26} /> Insurance Compliance Tracker
//                </h2>
//                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Risk Mitigation Scan</span>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {complianceAlerts.map((alert, i) => (
//                 <div key={i} className={`p-5 rounded-3xl border flex items-center justify-between group transition-all hover:shadow-lg ${
//                   alert.severity === 'CRITICAL' ? 'bg-rose-50 border-rose-100' : 
//                   alert.severity === 'URGENT' ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-200/50'
//                 }`}>
//                   <div className="flex items-center gap-4">
//                     <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white ${
//                       alert.severity === 'CRITICAL' ? 'bg-rose-500' : 
//                       alert.severity === 'URGENT' ? 'bg-amber-500' : 'bg-slate-400'
//                     }`}>
//                       <Clock size={20} />
//                     </div>
//                     <div>
//                       <p className="text-sm font-black text-slate-800 leading-tight">{alert.farmerName}</p>
//                       <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter italic">
//                         {alert.daysRemaining < 0 ? "Expired" : `${alert.daysRemaining} days left`}
//                       </p>
//                     </div>
//                   </div>
//                   <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* ================= ALERTS PANEL (Left) ================= */}
//           <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
//                  <AlertTriangle className="text-rose-500" size={24} /> Action Required
//               </h2>
//               <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Priority</span>
//             </div>

//             <div className="space-y-3">
//               {alerts.length === 0 ? (
//                 <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
//                     <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No urgent system issues</p>
//                 </div>
//               ) : (
//                 alerts.map((a, i) => (
//                   <div key={i} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all cursor-default">
//                     <div className="flex items-center gap-4">
//                       <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
//                       <span className="text-sm font-bold text-slate-700">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{a.time}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* ================= GROWTH SNAPSHOT (Right) ================= */}
//           <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
//             <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
//               <TrendingUp size={180} />
//             </div>
            
//             <div>
//               <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
//                 <TrendingUp className="text-indigo-400" size={20} /> Growth Snapshot
//               </h2>

//               <div className="space-y-6 relative z-10">
//                 <GrowthItem label="New Farmers" value={`+${growth.newFarmers || 0}`} />
//                 <GrowthItem label="Engagement" value={`${growth.engagement || 0}%`} />
//               </div>
//             </div>

//             <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
//               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">
//                 Platform performance is <span className="text-emerald-400">stable</span> based on weekly onboarding.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ================= LOWER GRID ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          
//           {/* RECENT ACTIVITY */}
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
//             <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
//               <Activity size={24} className="text-indigo-600" /> Recent Activity
//             </h2>

//             <div className="space-y-4">
//               {activities.length === 0 ? (
//                 <p className="text-slate-400 text-sm italic">Syncing activity stream...</p>
//               ) : (
//                 activities.map((a, i) => (
//                   <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 transition-all">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
//                         <ArrowRight size={14} className="text-indigo-500" />
//                       </div>
//                       <span className="text-sm font-bold text-slate-600">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">{a.time}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* DISTRIBUTION & QUICK ACTIONS */}
//           <div className="space-y-8">
//             {/* CONTRACT STATUS DISTRIBUTION */}
//             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
//                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Contract Status Distribution</h2>
               
//                <div className="space-y-4 mb-6">
//                   <ProgressRow label="Active" value={stats.active || 0} color="bg-emerald-500" />
//                   <ProgressRow label="Completed" value={stats.completed || 0} color="bg-indigo-500" />
//                   <ProgressRow label="Cancelled" value={stats.cancelled || 0} color="bg-rose-500" />
//                </div>

//                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
//                   <div className="bg-emerald-500" style={{ width: `${stats.active || 0}%` }} />
//                   <div className="bg-indigo-500" style={{ width: `${stats.completed || 0}%` }} />
//                   <div className="bg-rose-500" style={{ width: `${stats.cancelled || 0}%` }} />
//                </div>
//             </div>

//             {/* QUICK ACTIONS */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <QuickActionBtn label="Verify Policies" icon={ShieldCheck} col="bg-indigo-50 text-indigo-600 hover:bg-indigo-600" />
//                 <QuickActionBtn label="Support" icon={Activity} col="bg-slate-900 text-white hover:bg-indigo-600" />
//                 <QuickActionBtn label="Users" icon={Users} col="bg-indigo-50 text-indigo-600 hover:bg-indigo-600" />
//             </div>
//           </div>
//         </div>

//         {/* ================= MODAL LOGIC ================= */}
//         {showModal && (
//           <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
//             <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all font-black z-20"
//               >
//                 ✕
//               </button>
//               <div className="p-2">
//                 <AddGovtUpdate />
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ---------- HELPER COMPONENTS ---------- */

// function GrowthItem({ label, value }) {
//   return (
//     <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
//       <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{label}</span>
//       <span className="text-2xl font-black text-indigo-400">{value}</span>
//     </div>
//   );
// }

// function ProgressRow({ label, value, color }) {
//   return (
//     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
//       <span className="text-slate-500">{label}</span>
//       <div className="flex items-center gap-2">
//         <div className={`w-2 h-2 rounded-full ${color}`}></div>
//         <span className="text-slate-800">{value}%</span>
//       </div>
//     </div>
//   );
// }

// function QuickActionBtn({ label, icon: Icon, col }) {
//   return (
//     <button className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border border-transparent transition-all duration-300 group ${col}`}>
//       <Icon size={20} className="mb-2 group-hover:scale-110 transition-transform" />
//       <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
//     </button>
//   );
// }

// function AddGovtUpdate() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     type: "SCHEME",
//     link: "",
//     targetAudience: "ALL", 
//   });

//   const submit = async () => {
//     try {
//       if (!form.title || !form.description) {
//         alert("Title and Description are required");
//         return;
//       }
//       await api.post("/admin/govt-update", form);
//       alert("Update posted!");
//       window.location.reload(); 
//     } catch (err) {
//       console.error("ERROR:", err);
//       alert(err.response?.data?.message || "Failed to post update");
//     }
//   };

//   return (
//     <div className="p-8">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
//           <Plus size={24} strokeWidth={3} />
//         </div>
//         <h2 className="text-xl font-black text-slate-800 tracking-tight">Create Broadcast</h2>
//       </div>

//       <div className="space-y-4">
//         <input
//           placeholder="Update Title"
//           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold"
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <textarea
//           placeholder="Broadcast Description..."
//           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 h-32 transition-all text-sm font-medium"
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <div className="space-y-2">
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Target Audience</p>
//             <select
//                 onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
//                 className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none text-xs font-black uppercase cursor-pointer"
//             >
//                 <option value="ALL">Everyone</option>
//                 <option value="FARMER">Farmers Only</option>
//                 <option value="BUYER">Buyers Only</option>
//             </select>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <select
//             onChange={(e) => setForm({ ...form, type: e.target.value })}
//             className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 text-xs font-black uppercase tracking-widest cursor-pointer"
//           >
//             <option value="SCHEME">Scheme</option>
//             <option value="ALERT">Alert</option>
//             <option value="DEADLINE">Deadline</option>
//           </select>

//           <input
//             placeholder="Link (Optional)"
//             className="bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-indigo-500 text-xs font-bold"
//             onChange={(e) => setForm({ ...form, link: e.target.value })}
//           />
//         </div>

//         <button
//           onClick={submit}
//           className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all mt-4"
//         >
//           Publish Update
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import {
//   Users,
//   FileText,
//   AlertTriangle,
//   TrendingUp,
//   Activity,
//   Plus,
//   ArrowRight,
//   ShieldCheck,
//   Clock,
//   ChevronRight,
//   Target
// } from "lucide-react";

// /* =========================
//    STAT CARD (High Contrast)
// ========================= */
// function StatCard({ title, value, icon: IconComponent }) {
//   return (
//     <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center group hover:border-indigo-500 transition-all duration-300">
//       <div>
//         <p className="text-xs text-slate-600 font-black uppercase tracking-wider mb-1">{title}</p>
//         <h2 className="text-3xl font-black text-[#0f172a] leading-none">{value}</h2>
//       </div>
//       <div className="bg-indigo-50 p-3.5 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
//         <IconComponent size={22} strokeWidth={2.5} />
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN DASHBOARD
// ========================= */
// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [alerts, setAlerts] = useState([]);
//   const [complianceAlerts, setComplianceAlerts] = useState([]);
//   const [activities, setActivities] = useState([]); // ✅ FIXED: Ensuring state is initialized
//   const [growth, setGrowth] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.get("/admin/dashboard-stats");
//       // ✅ Mapping data from backend response
//       setStats(res.data.stats || {});
//       setAlerts(res.data.alerts || []);
//       setComplianceAlerts(res.data.complianceAlerts || []);
//       setActivities(res.data.activities || []); // ✅ Ensuring activities data is set
//       setGrowth(res.data.growth || {});
//     } catch (err) {
//       console.error("Dashboard Fetch Error:", err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
//         {/* COMPACT HEADER */}
//         <div className="flex items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Admin Dashboard</h1>
//             <p className="text-slate-500 font-bold text-xs uppercase tracking-widest italic">Operations Overview</p>
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
//           >
//             <Plus size={16} strokeWidth={3} /> Create Broadcast
//           </button>
//         </div>

//         {/* KPI SECTION */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
//           <StatCard title="Farmers" value={stats.farmers || 0} icon={Users} />
//           <StatCard title="Buyers" value={stats.buyers || 0} icon={Users} />
//           <StatCard title="Active Contracts" value={stats.active || 0} icon={FileText} />
//           <StatCard title="Open Disputes" value={stats.disputes || 0} icon={AlertTriangle} />
//         </div>

//         {/* COMPLIANCE WIDGET */}
//         {complianceAlerts && complianceAlerts.length > 0 && (
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-5 animate-in fade-in duration-500">
//             <div className="flex items-center justify-between mb-4">
//                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
//                  <ShieldCheck className="text-emerald-600" size={20} /> Compliance Alerts
//                </h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {complianceAlerts.map((alert, i) => (
//                 <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between ${
//                   alert.severity === 'CRITICAL' ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-200'
//                 }`}>
//                   <div>
//                     <p className="text-xs font-black text-slate-800 leading-none">{alert.farmerName}</p>
//                     <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase italic">{alert.daysRemaining < 0 ? "Expired" : `${alert.daysRemaining} days left`}</p>
//                   </div>
//                   <Clock size={16} className={alert.severity === 'CRITICAL' ? 'text-rose-500' : 'text-slate-400'} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
//           {/* ALERTS PANEL */}
//           <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
//             <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
//                <AlertTriangle className="text-rose-500" size={20} /> Action Required
//             </h2>
//             <div className="space-y-2">
//               {alerts.length === 0 ? (
//                 <div className="py-6 text-center border-2 border-dashed border-slate-100 rounded-2xl">
//                     <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">All systems clear</p>
//                 </div>
//               ) : (
//                 alerts.map((a, i) => (
//                   <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
//                     <div className="flex items-center gap-3">
//                       <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
//                       <span className="text-sm font-bold text-slate-700">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase">{a.time}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* GROWTH SNAPSHOT */}
//           <div className="bg-[#0f172a] rounded-[2rem] p-6 text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
//             <TrendingUp size={120} className="absolute -right-6 -top-6 opacity-5 rotate-12" />
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
//               <TrendingUp className="text-indigo-400" size={18} /> Growth
//             </h2>
//             <div className="space-y-4 relative z-10">
//               <div className="flex justify-between items-end border-b border-white/10 pb-2">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">New Farmers</span>
//                 <span className="text-xl font-black text-indigo-400">+{growth.newFarmers || 0}</span>
//               </div>
//               <div className="flex justify-between items-end">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Engagement</span>
//                 <span className="text-xl font-black text-indigo-400">{growth.engagement || 0}%</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* LOWER GRID: RECENT ACTIVITY */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
//           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
//             <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
//               <Activity size={20} className="text-indigo-600" /> Recent Activity
//             </h2>
//             <div className="space-y-2">
//               {/* ✅ FIXED: Ensuring activities exists before mapping */}
//               {activities && activities.length > 0 ? (
//                 activities.map((a, i) => (
//                   <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-lg px-2 transition-all">
//                     <div className="flex items-center gap-3">
//                       <ArrowRight size={14} className="text-indigo-500" />
//                       <span className="text-sm font-bold text-slate-600">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase">{a.time}</span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-slate-400 text-xs italic p-4 text-center">No recent activities log</p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-5">
//             <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
//                <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Contract Status</h2>
//                <div className="space-y-3 mb-4">
//                   <ProgressRow label="Active" value={stats.active || 0} color="bg-emerald-500" />
//                   <ProgressRow label="Other" value={100 - (stats.active || 0)} color="bg-indigo-500" />
//                </div>
//                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
//                   <div className="bg-emerald-500" style={{ width: `${stats.active || 0}%` }} />
//                   <div className="bg-indigo-500" style={{ width: `${100 - (stats.active || 0)}%` }} />
//                </div>
//             </div>

//             {/* QUICK ACTIONS */}
//             <div className="grid grid-cols-3 gap-3">
//                 <QuickActionBtn label="Policies" icon={ShieldCheck} col="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white" />
//                 <QuickActionBtn label="Support" icon={Activity} col="bg-[#0f172a] text-white hover:bg-indigo-600" />
//                 <QuickActionBtn label="Users" icon={Users} col="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white" />
//             </div>
//           </div>
//         </div>

//         {/* MODAL */}
//         {showModal && (
//           <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//             <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden p-6 animate-in zoom-in duration-200">
//               <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all font-black">✕</button>
//               <AddGovtUpdate />
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ---------- HELPER COMPONENTS ---------- */
// function ProgressRow({ label, value, color }) {
//   return (
//     <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
//       <span className="text-slate-600">{label}</span>
//       <div className="flex items-center gap-2">
//         <div className={`w-2 h-2 rounded-full ${color}`}></div>
//         <span className="text-slate-900">{value}%</span>
//       </div>
//     </div>
//   );
// }

// function QuickActionBtn({ label, icon: Icon, col }) {
//   return (
//     <button className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 group border border-transparent hover:shadow-lg ${col}`}>
//       <Icon size={20} className="mb-2 group-hover:scale-110 transition-transform" />
//       <span className="text-[11px] font-black uppercase tracking-wider leading-none">{label}</span>
//     </button>
//   );
// }

// function AddGovtUpdate() {
//   const [form, setForm] = useState({ title: "", description: "", type: "SCHEME", targetAudience: "ALL" });
//   const submit = async () => {
//     try {
//       if (!form.title || !form.description) return alert("All fields required");
//       await api.post("/admin/govt-update", form);
//       alert("Broadcast successful!");
//       window.location.reload(); 
//     } catch (err) { alert("Failed to post update"); }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-2 mb-2">
//         <Target className="text-indigo-600" size={20} />
//         <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Create Broadcast</h2>
//       </div>
//       <input placeholder="Update Title" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-500 text-sm font-bold" onChange={(e) => setForm({ ...form, title: e.target.value })} />
//       <textarea placeholder="Write message..." className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-500 h-28 text-sm font-medium" onChange={(e) => setForm({ ...form, description: e.target.value })} />
//       <select onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer">
//           <option value="ALL">Everyone</option>
//           <option value="FARMER">Farmers Only</option>
//           <option value="BUYER">Buyers Only</option>
//       </select>
//       <button onClick={submit} className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Publish Now</button>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // 🔥 Added for navigation
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import {
//   Users,
//   FileText,
//   AlertTriangle,
//   TrendingUp,
//   Activity,
//   Plus,
//   ArrowRight,
//   ShieldCheck,
//   Clock,
//   ChevronRight,
//   Target,
//   MessageSquare
// } from "lucide-react";

// /* =========================
//    STAT CARD 
// ========================= */
// function StatCard({ title, value, icon: IconComponent }) {
//   return (
//     <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center group hover:border-indigo-500 transition-all duration-300">
//       <div>
//         <p className="text-xs text-slate-600 font-black uppercase tracking-wider mb-1">{title}</p>
//         <h2 className="text-3xl font-black text-[#0f172a] leading-none">{value}</h2>
//       </div>
//       <div className="bg-indigo-50 p-3.5 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
//         <IconComponent size={22} strokeWidth={2.5} />
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN DASHBOARD
// ========================= */
// export default function AdminDashboard() {
//   const navigate = useNavigate(); // 🔥 Initialize Navigation
//   const [stats, setStats] = useState({});
//   const [alerts, setAlerts] = useState([]);
//   const [complianceAlerts, setComplianceAlerts] = useState([]);
//   const [activities, setActivities] = useState([]); 
//   const [growth, setGrowth] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.get("/admin/dashboard-stats");
//       setStats(res.data.stats || {});
//       setAlerts(res.data.alerts || []);
//       setComplianceAlerts(res.data.complianceAlerts || []);
//       setActivities(res.data.activities || []); // 🔥 REAL DATA FROM BACKEND
//       setGrowth(res.data.growth || {});
//     } catch (err) {
//       console.error("Dashboard Fetch Error:", err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
//         {/* HEADER */}
//         <div className="flex items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Admin Dashboard</h1>
//             <p className="text-slate-500 font-bold text-xs uppercase tracking-widest italic">Operations Overview</p>
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
//           >
//             <Plus size={16} strokeWidth={3} /> Create Broadcast
//           </button>
//         </div>

//         {/* KPI SECTION */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
//           <StatCard title="Farmers" value={stats.farmers || 0} icon={Users} />
//           <StatCard title="Buyers" value={stats.buyers || 0} icon={Users} />
//           <StatCard title="Active Contracts" value={stats.active || 0} icon={FileText} />
//           <StatCard title="Open Disputes" value={stats.disputes || 0} icon={AlertTriangle} />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
//           {/* ALERTS PANEL */}
//           <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
//             <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
//                <AlertTriangle className="text-rose-500" size={20} /> Action Required
//             </h2>
//             <div className="space-y-2">
//               {alerts.length === 0 ? (
//                 <div className="py-6 text-center border-2 border-dashed border-slate-100 rounded-2xl">
//                     <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">All systems clear</p>
//                 </div>
//               ) : (
//                 alerts.map((a, i) => (
//                   <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
//                     <div className="flex items-center gap-3">
//                       <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
//                       <span className="text-sm font-bold text-slate-700">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase">{a.time}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* GROWTH SNAPSHOT */}
//           <div className="bg-[#0f172a] rounded-[2rem] p-6 text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
//             <TrendingUp size={120} className="absolute -right-6 -top-6 opacity-5 rotate-12" />
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
//               <TrendingUp className="text-indigo-400" size={18} /> Growth (7d)
//             </h2>
//             <div className="space-y-4 relative z-10">
//               <div className="flex justify-between items-end border-b border-white/10 pb-2">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">New Farmers</span>
//                 <span className="text-xl font-black text-indigo-400">+{growth.newFarmers || 0}</span>
//               </div>
//               <div className="flex justify-between items-end border-b border-white/10 pb-2">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">New Buyers</span>
//                 <span className="text-xl font-black text-emerald-400">+{growth.newBuyers || 0}</span>
//               </div>
//               <div className="flex justify-between items-end">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">User Engagement</span>
//                 <span className="text-xl font-black text-indigo-400">{growth.engagement || 0}%</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* LOWER GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          
//           {/* 🔥 REAL RECENT ACTIVITY SECTION */}
//           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
//             <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
//               <Activity size={20} className="text-indigo-600" /> Recent Activity
//             </h2>
//             <div className="space-y-2">
//               {activities && activities.length > 0 ? (
//                 activities.map((a, i) => (
//                   <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-lg px-2 transition-all">
//                     <div className="flex items-center gap-3">
//                       <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
//                          <ArrowRight size={12} strokeWidth={3} />
//                       </div>
//                       <span className="text-sm font-bold text-slate-600">{a.message}</span>
//                     </div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{a.time}</span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-slate-400 text-xs italic p-4 text-center">Syncing platform activity...</p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-5">
//             {/* CONTRACT BREAKDOWN */}
//             <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
//                <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Contract Life-Cycle</h2>
//                <div className="space-y-3 mb-4">
//                   <ProgressRow label="Active" value={stats.breakdown?.active || 0} color="bg-emerald-500" />
//                   <ProgressRow label="Completed" value={stats.breakdown?.completed || 0} color="bg-indigo-500" />
//                   <ProgressRow label="Pending" value={stats.breakdown?.pending || 0} color="bg-amber-500" />
//                   <ProgressRow label="Cancelled" value={stats.breakdown?.cancelled || 0} color="bg-rose-500" />
//                </div>
//                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
//                   <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${stats.breakdown?.active}%` }} />
//                   <div className="bg-indigo-500 transition-all duration-500" style={{ width: `${stats.breakdown?.completed}%` }} />
//                   <div className="bg-amber-500 transition-all duration-500" style={{ width: `${stats.breakdown?.pending}%` }} />
//                   <div className="bg-rose-500 transition-all duration-500" style={{ width: `${stats.breakdown?.cancelled}%` }} />
//                </div>
//             </div>

//             {/* 🔥 FUNCTIONAL QUICK ACTIONS */}
//             <div className="grid grid-cols-3 gap-3">
//                 <QuickActionBtn 
//                     label="Policies" 
//                     icon={ShieldCheck} 
//                     col="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white" 
//                     onClick={() => navigate("/admin/policies")}
//                 />
//                 <QuickActionBtn 
//                     label="Support" 
//                     icon={MessageSquare} 
//                     col="bg-[#0f172a] text-white hover:bg-indigo-600" 
//                     onClick={() => navigate("/admin/support")}
//                 />
//                 <QuickActionBtn 
//                     label="Users" 
//                     icon={Users} 
//                     col="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white" 
//                     onClick={() => navigate("/admin/users")}
//                 />
//             </div>
//           </div>
//         </div>

//         {/* MODAL */}
//         {showModal && (
//           <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//             <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden p-6 animate-in zoom-in duration-200">
//               <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all font-black">✕</button>
//               <AddGovtUpdate />
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ---------- HELPER COMPONENTS ---------- */
// function ProgressRow({ label, value, color }) {
//   return (
//     <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
//       <span className="text-slate-600">{label}</span>
//       <div className="flex items-center gap-2">
//         <div className={`w-2 h-2 rounded-full ${color}`}></div>
//         <span className="text-slate-900 font-bold">{value}%</span>
//       </div>
//     </div>
//   );
// }

// function QuickActionBtn({ label, icon: Icon, col, onClick }) {
//   return (
//     <button 
//       onClick={onClick}
//       className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 group border border-transparent hover:shadow-lg active:scale-90 ${col}`}
//     >
//       <Icon size={20} className="mb-2 group-hover:scale-110 transition-transform" />
//       <span className="text-[11px] font-black uppercase tracking-wider leading-none">{label}</span>
//     </button>
//   );
// }

// function AddGovtUpdate() {
//   const [form, setForm] = useState({ title: "", description: "", type: "SCHEME", targetAudience: "ALL" });
//   const submit = async () => {
//     try {
//       if (!form.title || !form.description) return alert("All fields required");
//       await api.post("/admin/govt-update", form);
//       alert("Broadcast successful!");
//       window.location.reload(); 
//     } catch (err) { alert("Failed to post update"); }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-2 mb-2">
//         <Target className="text-indigo-600" size={20} />
//         <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Create Broadcast</h2>
//       </div>
//       <input placeholder="Update Title" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-500 text-sm font-bold" onChange={(e) => setForm({ ...form, title: e.target.value })} />
//       <textarea placeholder="Write message..." className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-500 h-28 text-sm font-medium" onChange={(e) => setForm({ ...form, description: e.target.value })} />
//       <select onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer">
//           <option value="ALL">Everyone</option>
//           <option value="FARMER">Farmers Only</option>
//           <option value="BUYER">Buyers Only</option>
//       </select>
//       <button onClick={submit} className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Publish Now</button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Activity,
  Plus,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronRight,
  Target,
  MessageSquare,
  CheckCircle2
} from "lucide-react";

/* =========================
   STAT CARD 
========================= */
function StatCard({ title, value, icon: IconComponent }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center group hover:border-indigo-500 transition-all duration-300">
      <div>
        <p className="text-xs text-slate-600 font-black uppercase tracking-wider mb-1">{title}</p>
        <h2 className="text-3xl font-black text-[#0f172a] leading-none">{value}</h2>
      </div>
      <div className="bg-indigo-50 p-3.5 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
        <IconComponent size={22} strokeWidth={2.5} />
      </div>
    </div>
  );
}

/* =========================
   MAIN DASHBOARD
========================= */
export default function AdminDashboard() {
  const navigate = useNavigate(); 
  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [complianceAlerts, setComplianceAlerts] = useState([]);
  const [activities, setActivities] = useState([]); 
  const [growth, setGrowth] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard-stats");
      setStats(res.data.stats || {});
      setAlerts(res.data.alerts || []);
      setComplianceAlerts(res.data.complianceAlerts || []); 
      setActivities(res.data.activities || []); 
      setGrowth(res.data.growth || {});
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest italic">Operations Overview</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> Create Broadcast
          </button>
        </div>

        {/* KPI SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <StatCard title="Farmers" value={stats.farmers || 0} icon={Users} />
          <StatCard title="Buyers" value={stats.buyers || 0} icon={Users} />
          <StatCard title="Active Contracts" value={stats.active || 0} icon={FileText} />
          <StatCard title="Open Disputes" value={stats.disputes || 0} icon={AlertTriangle} />
        </div>

        {/* FEATURE 4: COMPLIANCE ALERTS (ALWAYS VISIBLE VERSION) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-5">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
               <ShieldCheck className="text-emerald-600" size={20} /> Compliance Alerts
             </h2>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurance Audit</span>
          </div>

          {complianceAlerts && complianceAlerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {complianceAlerts.map((alert, i) => (
                <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between group transition-all hover:shadow-md ${
                  alert.severity === 'CRITICAL' ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${alert.severity === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 leading-none">{alert.farmerName}</p>
                      <p className={`text-[10px] font-bold mt-1 uppercase italic ${alert.severity === 'CRITICAL' ? 'text-rose-600' : 'text-slate-500'}`}>
                        {alert.daysRemaining < 0 ? "Expired" : `${alert.daysRemaining} days remaining`}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 px-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 animate-in fade-in duration-700">
               <CheckCircle2 className="text-emerald-600" size={18} />
               <p className="text-xs font-bold text-emerald-800 uppercase tracking-tight italic">All active insurance policies are currently compliant.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* ALERTS PANEL */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
               <AlertTriangle className="text-rose-500" size={20} /> Action Required
            </h2>
            <div className="space-y-2">
              {alerts.length === 0 ? (
                <div className="py-6 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">All systems clear</p>
                </div>
              ) : (
                alerts.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                      <span className="text-sm font-bold text-slate-700">{a.message}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">{a.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* GROWTH SNAPSHOT */}
          <div className="bg-[#0f172a] rounded-[2rem] p-6 text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
            <TrendingUp size={120} className="absolute -right-6 -top-6 opacity-5 rotate-12" />
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
              <TrendingUp className="text-indigo-400" size={18} /> Growth (7d)
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">New Farmers</span>
                <span className="text-xl font-black text-indigo-400">+{growth.newFarmers || 0}</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">New Buyers</span>
                <span className="text-xl font-black text-emerald-400">+{growth.newBuyers || 0}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Engagement Rate</span>
                <span className="text-xl font-black text-indigo-400">{growth.engagement || 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-indigo-600" /> Recent Activity
            </h2>
            <div className="space-y-2">
              {activities && activities.length > 0 ? (
                activities.map((a, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-lg px-2 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                         <ArrowRight size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{a.message}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{a.time}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-xs italic p-4 text-center">Syncing platform activity...</p>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {/* CONTRACT BREAKDOWN */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
               <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Contract Life-Cycle Breakdown</h2>
               <div className="space-y-3 mb-4">
                  <ProgressRow label="Active" value={stats.breakdown?.active || 0} color="bg-emerald-500" />
                  <ProgressRow label="Completed" value={stats.breakdown?.completed || 0} color="bg-indigo-500" />
                  <ProgressRow label="Pending" value={stats.breakdown?.pending || 0} color="bg-amber-500" />
                  <ProgressRow label="Cancelled" value={stats.breakdown?.cancelled || 0} color="bg-rose-500" />
               </div>
               <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                  <div className="bg-emerald-500 transition-all duration-700" style={{ width: `${stats.breakdown?.active}%` }} />
                  <div className="bg-indigo-500 transition-all duration-700" style={{ width: `${stats.breakdown?.completed}%` }} />
                  <div className="bg-amber-500 transition-all duration-700" style={{ width: `${stats.breakdown?.pending}%` }} />
                  <div className="bg-rose-500 transition-all duration-700" style={{ width: `${stats.breakdown?.cancelled}%` }} />
               </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <QuickActionBtn 
                    label="Policies" 
                    icon={ShieldCheck} 
                    col="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white" 
                    onClick={() => navigate("/admin/policies")}
                />
                <QuickActionBtn 
                    label="Support" 
                    icon={MessageSquare} 
                    col="bg-[#0f172a] text-white hover:bg-indigo-600" 
                    onClick={() => navigate("/admin/support")}
                />
                <QuickActionBtn 
                    label="Users" 
                    icon={Users} 
                    col="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white" 
                    onClick={() => navigate("/admin/users")}
                />
            </div>
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden p-6 animate-in zoom-in duration-200">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all font-black">✕</button>
              <AddGovtUpdate />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------- HELPER COMPONENTS ---------- */
function ProgressRow({ label, value, color }) {
  return (
    <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
      <span className="text-slate-600">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span className="text-slate-900 font-bold">{value}%</span>
      </div>
    </div>
  );
}

function QuickActionBtn({ label, icon: Icon, col, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 group border border-transparent hover:shadow-lg active:scale-90 ${col}`}
    >
      <Icon size={20} className="mb-2 group-hover:scale-110 transition-transform" />
      <span className="text-[11px] font-black uppercase tracking-wider leading-none">{label}</span>
    </button>
  );
}

function AddGovtUpdate() {
  const [form, setForm] = useState({ title: "", description: "", type: "SCHEME", targetAudience: "ALL" });
  const submit = async () => {
    try {
      if (!form.title || !form.description) return alert("All fields required");
      await api.post("/admin/govt-update", form);
      alert("Broadcast successful!");
      window.location.reload(); 
    } catch (err) { alert("Failed to post update"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Target className="text-indigo-600" size={20} />
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Create Broadcast</h2>
      </div>
      <input placeholder="Update Title" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-500 text-sm font-bold" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Write message..." className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-500 h-28 text-sm font-medium" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer">
          <option value="ALL">Everyone</option>
          <option value="FARMER">Farmers Only</option>
          <option value="BUYER">Buyers Only</option>
      </select>
      <button onClick={submit} className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Publish Now</button>
    </div>
  );
}