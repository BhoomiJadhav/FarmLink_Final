// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// export default function AdminAnalytics() {
//   const [data, setData] = useState({});
//   const [range, setRange] = useState("7d");

//   useEffect(() => {
//     fetchData();
//   }, [range]);

//   const fetchData = async () => {
//     const res = await api.get(`/admin/analytics?range=${range}`);
//     setData(res.data);
//   };

//   const Stat = ({ title, value, growth }) => (
//     <div className="bg-white p-5 rounded-xl shadow border">
//       <p className="text-xs text-gray-500">{title}</p>
//       <h2 className="text-2xl font-bold text-[#064e3b]">{value}</h2>
//       <p
//         className={`text-xs ${growth > 0 ? "text-green-500" : "text-red-500"}`}
//       >
//         {growth > 0 ? "↑" : "↓"} {growth}%
//       </p>
//     </div>
//   );

//   return (
//     <div className="flex">
//       <AdminSidebar />

//       <div className="flex-1 p-8 bg-gray-50 min-h-screen space-y-6">
//         <h1 className="text-3xl font-bold text-[#064e3b]">
//           Analytics Overview
//         </h1>

//         {/* FILTER */}
//         <div className="flex gap-3">
//           {["7d", "30d"].map((r) => (
//             <button
//               key={r}
//               onClick={() => setRange(r)}
//               className={`px-4 py-2 rounded ${
//                 range === r ? "bg-emerald-600 text-white" : "bg-white border"
//               }`}
//             >
//               {r}
//             </button>
//           ))}
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-4 gap-4">
//           <Stat
//             title="Revenue"
//             value={`₹${data.totalRevenue || 0}`}
//             growth={data.revenueGrowth || 0}
//           />
//           <Stat
//             title="Contracts"
//             value={data.totalContracts || 0}
//             growth={data.contractGrowth || 0}
//           />
//           <Stat
//             title="Approval Rate"
//             value={`${data.approvalRate || 0}%`}
//             growth={0}
//           />
//         </div>

//         {/* INSIGHTS */}
//         <div className="bg-gradient-to-r from-[#064e3b] to-[#047857] text-white p-6 rounded-xl">
//           <h2 className="font-bold mb-2">AI Insights</h2>
//           {data.insights?.map((i, idx) => (
//             <p key={idx} className="text-sm">
//               • {i}
//             </p>
//           ))}
//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="font-bold mb-3">Revenue Trend</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={data.revenueData}>
//                 <XAxis dataKey="date" />
//                 <Tooltip />
//                 <Line dataKey="revenue" stroke="#10b981" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="font-bold mb-3">Farmer Growth</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={data.farmerData}>
//                 <XAxis dataKey="date" />
//                 <Tooltip />
//                 <Line dataKey="count" stroke="#6366f1" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow col-span-2">
//             <h3 className="font-bold mb-3">Policy Status</h3>
//             <PieChart width={400} height={250}>
//               <Pie
//                 data={data.policyStats || []}
//                 dataKey="value"
//                 outerRadius={100}
//               >
//                 {["#10b981", "#ef4444", "#f59e0b"].map((c, i) => (
//                   <Cell key={i} fill={c} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   BarChart,
//   Bar
// } from "recharts";
// import { 
//   BarChart3, 
//   TrendingUp, 
//   DollarSign, 
//   FileText, 
//   CheckCircle2, 
//   Lightbulb, 
//   Calendar 
// } from "lucide-react";

// const COLORS = ["#4f46e5", "#ef4444", "#f59e0b", "#10b981"];

// export default function AdminAnalytics() {
//   const [data, setData] = useState({});
//   const [range, setRange] = useState("7d");

//   // --- LOGIC PRESERVED ---
//   useEffect(() => {
//     fetchData();
//   }, [range]);

//   const fetchData = async () => {
//     try {
//       const res = await api.get(`/admin/analytics?range=${range}`);
//       setData(res.data);
//     } catch (err) {
//       console.error("Failed to fetch analytics", err);
//     }
//   };
//   // -----------------------

//   const StatCard = ({ title, value, growth, icon: Icon }) => (
//     <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{title}</p>
//           <h2 className="text-2xl font-black text-slate-800 mt-1">{value}</h2>
//         </div>
//         <div className="p-3 bg-slate-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-inner">
//           <Icon size={20} strokeWidth={2.5} />
//         </div>
//       </div>
//       <div className="mt-4 flex items-center gap-2">
//         <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${growth >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
//           {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}%
//         </span>
//         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">vs last period</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
//               <BarChart3 className="text-indigo-600" size={32} /> Analytics Overview
//             </h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Strategic Performance Intelligence</p>
//           </div>

//           <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
//             {["7d", "30d"].map((r) => (
//               <button
//                 key={r}
//                 onClick={() => setRange(r)}
//                 className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
//                   range === r 
//                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
//                     : "text-slate-400 hover:text-slate-600"
//                 }`}
//               >
//                 {r.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* TOP KPI STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <StatCard title="Revenue" value={`₹${data.totalRevenue || 0}`} growth={data.revenueGrowth || 0} icon={DollarSign} />
//           <StatCard title="Total Contracts" value={data.totalContracts || 0} growth={data.contractGrowth || 0} icon={FileText} />
//           <StatCard title="Approval Rate" value={`${data.approvalRate || 0}%`} growth={0} icon={CheckCircle2} />
//         </div>

//         {/* AI INSIGHTS BLOCK (Navy Anchor UI) */}
//         <div className="bg-[#0f172a] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-8">
//           <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
//              <Lightbulb size={200} />
//           </div>
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
//             <Lightbulb className="text-indigo-400" size={24} /> AI Intelligence Report
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
//             {data.insights && data.insights.length > 0 ? data.insights.map((i, idx) => (
//               <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-start gap-3 hover:bg-white/10 transition-all">
//                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
//                 <p className="text-sm text-slate-200 font-medium leading-relaxed">{i}</p>
//               </div>
//             )) : (
//               <p className="text-slate-400 italic">Processing platform data for insights...</p>
//             )}
//           </div>
//         </div>

//         {/* CHARTS GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* Revenue Trend Chart */}
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp size={18}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Revenue Growth Trend</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={280}>
//               <LineChart data={data.revenueData || []}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
//                 <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
//                 <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Farmer Onboarding Chart */}
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
//              <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={18}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Farmer Onboarding</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={data.farmerData || []}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
//                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
//                 <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={30} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Policy Status Pie Chart */}
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 lg:col-span-2">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><CheckCircle2 size={18}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Compliance Status Breakdown</h3>
//             </div>
//             <div className="flex flex-col md:flex-row items-center justify-around gap-8">
//               <div className="w-full max-w-[400px]">
//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie 
//                       data={data.policyStats || []} 
//                       dataKey="value" 
//                       nameKey="name" 
//                       cx="50%" cy="50%" 
//                       innerRadius={70} 
//                       outerRadius={100} 
//                       paddingAngle={8}
//                     >
//                       {(data.policyStats || []).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
//                 {data.policyStats?.map((entry, idx) => (
//                   <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center min-w-[120px]">
//                     <div className="w-3 h-3 rounded-full mb-2" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
//                     <span className="text-[10px] font-black text-slate-400 uppercase mb-1">{entry.name}</span>
//                     <span className="text-xl font-black text-slate-800">{entry.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   BarChart,
//   Bar,
//   Legend
// } from "recharts";
// import { 
//   TrendingUp, 
//   DollarSign, 
//   FileText, 
//   CheckCircle2, 
//   Lightbulb, 
//   Users,
//   ShieldCheck,
//   Filter
// } from "lucide-react";

// const COLORS = ["#4f46e5", "#ef4444", "#f59e0b", "#10b981"];

// export default function AdminAnalytics() {
//   const [data, setData] = useState({});
//   const [range, setRange] = useState("7d");

//   const timeRanges = [
//     { label: "Prev 1 Week", value: "7d" },
//     { label: "Prev 2 Weeks", value: "14d" },
//     { label: "Prev 1 Month", value: "30d" },
//     { label: "Prev 3 Months", value: "90d" },
//     { label: "Prev 6 Months", value: "180d" },
//     { label: "Prev 1 Year", value: "1y" },
//     { label: "All Time", value: "all" },
//   ];

//   useEffect(() => {
//     fetchData();
//   }, [range]);

//   const fetchData = async () => {
//     try {
//       const res = await api.get(`/admin/analytics?range=${range}`);
//       setData(res.data);
//     } catch (err) {
//       console.error("Failed to fetch analytics", err);
//     }
//   };

//   const KpiCard = ({ title, value, growth, icon: Icon, color }) => (
//     <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{title}</p>
//           <h2 className="text-2xl font-black text-slate-800 mt-1">{value}</h2>
//         </div>
//         <div className={`p-3 bg-${color}-50 text-${color}-600 rounded-2xl group-hover:bg-${color}-600 group-hover:text-white transition-all shadow-inner`}>
//           <Icon size={20} strokeWidth={2.5} />
//         </div>
//       </div>
//       <div className="mt-4 flex items-center gap-2">
//         <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${growth >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
//           {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}%
//         </span>
//         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">vs last period</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
//               <TrendingUp className="text-indigo-600" size={32} /> Intelligence Ledger
//             </h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Temporal Performance Analytics</p>
//           </div>

//           <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
//             <Filter size={14} className="text-indigo-500" />
//             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Range:</span>
//             <select 
//               value={range} 
//               onChange={(e) => setRange(e.target.value)}
//               className="bg-transparent outline-none text-xs font-black text-slate-700 uppercase cursor-pointer"
//             >
//               {timeRanges.map((r) => (
//                 <option key={r.value} value={r.value}>{r.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* TOP KPI STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <KpiCard title="Total Revenue" value={`₹${data.summary?.totalRevenue?.toLocaleString() || 0}`} growth={data.revenueGrowth || 0} icon={DollarSign} color="indigo" />
//           <KpiCard title="Platform Operations" value={data.summary?.totalContracts || 0} growth={data.contractGrowth || 0} icon={FileText} color="emerald" />
//           <KpiCard title="Compliance Health" value={`${data.summary?.approvalRate || 0}%`} growth={0} icon={CheckCircle2} color="amber" />
//         </div>

//         {/* AI INSIGHTS BLOCK */}
//         <div className="bg-[#0f172a] text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden mb-10">
//           <div className="absolute -right-10 -top-10 opacity-5 rotate-12">
//              <Lightbulb size={250} />
//           </div>
//           <h2 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
//             <Lightbulb className="text-indigo-400" size={24} /> AI Strategic Insights
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
//             {data.insights && data.insights.length > 0 ? data.insights.map((i, idx) => (
//               <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-[1.5rem] backdrop-blur-md flex items-start gap-4 hover:bg-white/10 transition-all border-l-4 border-l-indigo-500">
//                 <p className="text-sm text-slate-200 font-medium leading-relaxed">{i}</p>
//               </div>
//             )) : (
//               <p className="text-slate-400 italic py-4">Generating temporal patterns and forecasting data...</p>
//             )}
//           </div>
//         </div>

//         {/* CHARTS GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
//           {/* Revenue Velocity Area Chart */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><TrendingUp size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Capital Velocity Trend</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={320}>
//               <AreaChart data={data.revenueData || []}>
//                 <defs>
//                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
//                 <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
//                 <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* User Trend Bar Chart */}
//           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//              <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Marketplace Balance</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={320}>
//               <BarChart data={data.userTrend || []}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="_id.date" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: '#94a3b8'}} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
//                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
//                 <Legend iconType="circle" />
//                 <Bar dataKey="count" name="Daily Adoption" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={20} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Compliance Distribution Pie Chart */}
//           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200 lg:col-span-3">
//             <div className="flex items-center gap-3 mb-10">
//               <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><ShieldCheck size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Compliance Distribution</h3>
//             </div>
//             <div className="flex flex-col md:flex-row items-center justify-around gap-12">
//               <div className="w-full max-w-[350px]">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie 
//                       data={data.policyStats || []} 
//                       dataKey="value" 
//                       nameKey="name" 
//                       cx="50%" cy="50%" 
//                       innerRadius={80} 
//                       outerRadius={120} 
//                       paddingAngle={10}
//                       stroke="none"
//                     >
//                       {(data.policyStats || []).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
//                 {data.policyStats?.map((entry, idx) => (
//                   <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center min-w-[160px] hover:shadow-md transition-all">
//                     <div className="w-4 h-4 rounded-full mb-3" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
//                     <span className="text-[11px] font-black text-slate-400 uppercase mb-1 tracking-widest">{entry.name}</span>
//                     <span className="text-3xl font-black text-slate-800">{entry.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   BarChart,
//   Bar,
//   Legend
// } from "recharts";
// import { 
//   TrendingUp, 
//   DollarSign, 
//   FileText, 
//   CheckCircle2, 
//   Lightbulb, 
//   Users,
//   ShieldCheck,
//   Filter,
//   BarChart3
// } from "lucide-react";

// const COLORS = ["#6366f1", "#f43f5e", "#f59e0b", "#10b981"];

// export default function AdminAnalytics() {
//   const [data, setData] = useState({});
//   const [range, setRange] = useState("30d");

//   const timeRanges = [
//     { label: "Past 7 Days", value: "7d" },
//     { label: "Past 14 Days", value: "14d" },
//     { label: "Past 1 Month", value: "30d" },
//     { label: "Past 3 Months", value: "90d" },
//     { label: "Past 6 Months", value: "180d" },
//     { label: "Past 1 Year", value: "1y" },
//     { label: "System All-Time", value: "all" },
//   ];

//   useEffect(() => {
//     fetchData();
//   }, [range]);

//   const fetchData = async () => {
//     try {
//       const res = await api.get(`/admin/analytics?range=${range}`);
//       setData(res.data);
//     } catch (err) {
//       console.error("Analytics Fetch Error:", err);
//     }
//   };

//   const KpiCard = ({ title, value, growth, icon: Icon, color }) => (
//     <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{title}</p>
//           <h2 className="text-2xl font-black text-slate-800 mt-1">{value}</h2>
//         </div>
//         <div className={`p-3 bg-${color}-50 text-${color}-600 rounded-2xl group-hover:bg-${color}-600 group-hover:text-white transition-all shadow-inner`}>
//           <Icon size={20} strokeWidth={2.5} />
//         </div>
//       </div>
//       <div className="mt-4 flex items-center gap-2">
//         <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${growth >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
//           {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}%
//         </span>
//         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">vs last period</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
//               <BarChart3 className="text-indigo-600" size={32} /> Intelligence Ledger
//             </h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Strategic Performance Intelligence</p>
//           </div>

//           <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
//             <Filter size={14} className="text-indigo-500" />
//             <select 
//               value={range} 
//               onChange={(e) => setRange(e.target.value)}
//               className="bg-transparent outline-none text-xs font-black text-slate-700 uppercase cursor-pointer px-2"
//             >
//               {timeRanges.map((r) => (
//                 <option key={r.value} value={r.value}>{r.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* TOP KPI CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <KpiCard title="Total Revenue" value={`₹${data.summary?.totalRevenue?.toLocaleString() || 0}`} growth={data.revenueGrowth || 0} icon={DollarSign} color="indigo" />
//           <KpiCard title="Platform Operations" value={data.summary?.totalContracts || 0} growth={data.contractGrowth || 0} icon={FileText} color="emerald" />
//           <KpiCard title="Compliance Health" value={`${data.summary?.approvalRate || 0}%`} growth={0} icon={CheckCircle2} color="amber" />
//         </div>

//         {/* AI STRATEGIC INSIGHTS */}
//         <div className="bg-[#0f172a] text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden mb-10">
//           <div className="absolute -right-10 -top-10 opacity-5 rotate-12">
//              <Lightbulb size={250} />
//           </div>
//           <h2 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
//             <Lightbulb className="text-indigo-400" size={24} /> AI Strategic Insights
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
//             {data.insights && data.insights.length > 0 ? data.insights.map((i, idx) => (
//               <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-[1.5rem] backdrop-blur-md flex items-start gap-4 hover:bg-white/10 transition-all border-l-4 border-l-indigo-500">
//                 <p className="text-sm text-slate-200 font-medium leading-relaxed">{i}</p>
//               </div>
//             )) : (
//               <p className="text-slate-400 italic py-4">Processing platform datasets for trend detection...</p>
//             )}
//           </div>
//         </div>

//         {/* CHARTS GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
//           {/* REVENUE VELOCITY TREND */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><TrendingUp size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Revenue Velocity (Capital Flow)</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={320}>
//               <AreaChart data={data.revenueData || []}>
//                 <defs>
//                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
//                 <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
//                 <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* MARKETPLACE EQUILIBRIUM (User Adoption) */}
//           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//              <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Marketplace Balance</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={320}>
//               <BarChart data={data.userTrend || []} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
//                 <XAxis type="number" hide />
//                 <YAxis dataKey="date" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} width={80} />
//                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
//                 <Legend iconType="circle" />
//                 <Bar dataKey="count" name="Entities Joined" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={20} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* COMPLIANCE DISTRIBUTION */}
//           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200 lg:col-span-3">
//             <div className="flex items-center gap-3 mb-10">
//               <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><ShieldCheck size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Operational Compliance Distribution</h3>
//             </div>
//             <div className="flex flex-col md:flex-row items-center justify-around gap-12">
//               <div className="w-full max-w-[350px]">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie 
//                       data={data.policyStats || []} 
//                       dataKey="value" 
//                       nameKey="name" 
//                       cx="50%" cy="50%" 
//                       innerRadius={80} 
//                       outerRadius={120} 
//                       paddingAngle={10}
//                       stroke="none"
//                     >
//                       {(data.policyStats || []).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
//                 {data.policyStats?.map((entry, idx) => (
//                   <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center min-w-[160px] hover:shadow-md transition-all">
//                     <div className="w-4 h-4 rounded-full mb-3" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
//                     <span className="text-[11px] font-black text-slate-400 uppercase mb-1 tracking-widest">{entry.name}</span>
//                     <span className="text-3xl font-black text-slate-800">{entry.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { useEffect, useState, useMemo } from "react";
// import api from "../../api/axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   BarChart,
//   Bar,
//   Legend,
//   Line
// } from "recharts";
// import { 
//   TrendingUp, 
//   DollarSign, 
//   FileText, 
//   CheckCircle2, 
//   Lightbulb, 
//   Users,
//   ShieldCheck,
//   Filter,
//   BarChart3,
//   Wheat,
//   Scale
// } from "lucide-react";

// // Professional Color Palettes
// const COMPLIANCE_COLORS = ["#10b981", "#f43f5e", "#f59e0b"]; // Verified, Rejected, Pending
// const DISPUTE_COLORS = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#8b5cf6", "#64748b"];

// export default function AdminAnalytics() {
//   const [data, setData] = useState({});
//   const [range, setRange] = useState("30d");

//   const timeRanges = [
//     { label: "Past 7 Days", value: "7d" },
//     { label: "Past 14 Days", value: "14d" },
//     { label: "Past 1 Month", value: "30d" },
//     { label: "Past 3 Months", value: "90d" },
//     { label: "Past 6 Months", value: "180d" },
//     { label: "Past 1 Year", value: "1y" },
//     { label: "System All-Time", value: "all" },
//   ];

//   useEffect(() => {
//     fetchData();
//   }, [range]);

//   const fetchData = async () => {
//     try {
//       const res = await api.get(`/admin/analytics?range=${range}`);
//       setData(res.data);
//     } catch (err) {
//       console.error("Analytics Fetch Error:", err);
//     }
//   };

//   // 1. Data Formatter for User Trends
//   const formattedUserTrend = useMemo(() => {
//     if (!data.userTrend) return [];
//     const grouped = {};
//     data.userTrend.forEach(item => {
//       const date = item._id.date;
//       const role = item._id.role;
//       if(!grouped[date]) grouped[date] = { date, farmer: 0, buyer: 0 };
//       grouped[date][role] = item.count;
//     });
//     return Object.values(grouped).sort((a,b) => new Date(a.date) - new Date(b.date));
//   }, [data.userTrend]);

//   // 2. Dynamic AI Insights Generator
//   const generateInsights = () => {
//     const insights = [];
    
//     // Revenue Insight
//     if (data.summary?.totalRevenue > 0) {
//       insights.push(`Platform TVL for the selected period stands at ₹${data.summary.totalRevenue.toLocaleString()}.`);
//     }

//     // Market Dominance Insight
//     if (data.marketInventory && data.marketInventory.length > 0) {
//       const topCrop = data.marketInventory[0];
//       insights.push(`Spot Market Liquidity is currently dominated by ${topCrop.crop} with ${topCrop.tonnage.toLocaleString()} quintals available.`);
//     }

//     // Risk Insight
//     if (data.disputeCauses && data.disputeCauses.length > 0) {
//       const topIssue = data.disputeCauses[0];
//       insights.push(`Operational Risk Alert: '${topIssue.category.replace('_', ' ')}' is the leading cause of contract friction.`);
//     }

//     // Compliance Insight
//     if (data.summary?.approvalRate < 80) {
//       insights.push(`Insurance rejection rates are high. Consider reviewing PMFBY guidelines with onboarding farmers.`);
//     }

//     return insights.length > 0 ? insights : ["Gathering sufficient data points to generate strategic analysis..."];
//   };

//   const dynamicInsights = generateInsights();

//   const KpiCard = ({ title, value, growth, icon: Icon, color }) => (
//     <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col justify-between group hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{title}</p>
//           <h2 className="text-2xl font-black text-slate-800 mt-1">{value}</h2>
//         </div>
//         <div className={`p-3 bg-${color}-50 text-${color}-600 rounded-2xl group-hover:bg-${color}-600 group-hover:text-white transition-all shadow-inner`}>
//           <Icon size={20} strokeWidth={2.5} />
//         </div>
//       </div>
//       <div className="mt-4 flex items-center gap-2">
//         <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${growth >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
//           {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}%
//         </span>
//         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">vs last period</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
//               <BarChart3 className="text-indigo-600" size={32} /> Intelligence Ledger
//             </h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Strategic Performance Intelligence</p>
//           </div>

//           <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
//             <Filter size={14} className="text-indigo-500" />
//             <select 
//               value={range} 
//               onChange={(e) => setRange(e.target.value)}
//               className="bg-transparent outline-none text-xs font-black text-slate-700 uppercase cursor-pointer px-2"
//             >
//               {timeRanges.map((r) => (
//                 <option key={r.value} value={r.value}>{r.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* TOP KPI CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <KpiCard title="Total Revenue" value={`₹${data.summary?.totalRevenue?.toLocaleString() || 0}`} growth={12.4} icon={DollarSign} color="indigo" />
//           <KpiCard title="Platform Operations" value={data.summary?.totalContracts || 0} growth={5.2} icon={FileText} color="emerald" />
//           <KpiCard title="Compliance Health" value={`${data.summary?.approvalRate || 0}%`} growth={-1.5} icon={CheckCircle2} color="amber" />
//         </div>

//         {/* AI STRATEGIC INSIGHTS */}
//         <div className="bg-[#0f172a] text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden mb-10">
//           <div className="absolute -right-10 -top-10 opacity-5 rotate-12">
//              <Lightbulb size={250} />
//           </div>
//           <h2 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
//             <Lightbulb className="text-indigo-400" size={24} /> AI Strategic Insights
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
//             {dynamicInsights.map((insight, idx) => (
//               <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-[1.5rem] backdrop-blur-md flex items-start gap-4 hover:bg-white/10 transition-all border-l-4 border-l-indigo-500">
//                 <p className="text-sm text-slate-200 font-medium leading-relaxed">{insight}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CHARTS GRID - ROW 1 */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
//           {/* REVENUE VELOCITY TREND */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><TrendingUp size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Revenue Velocity (Capital Flow)</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={320}>
//               <AreaChart data={data.revenueData || []}>
//                 <defs>
//                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
//                 <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
//                 <Area type="monotone" dataKey="value" name="Revenue (₹)" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* MARKETPLACE EQUILIBRIUM (User Adoption) */}
//           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//              <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Marketplace Balance</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={320}>
//               <BarChart data={formattedUserTrend} layout="horizontal">
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
//                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
//                 <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
//                 <Bar dataKey="farmer" name="Farmers" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={24} />
//                 <Bar dataKey="buyer" name="Buyers" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* CHARTS GRID - ROW 2 (NEW REAL DATA) */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
//           {/* SPOT MARKET RESERVES */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Wheat size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Spot Market Reserves (Open Liquidity)</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={data.marketInventory || []}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="crop" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800, fill: '#64748b'}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
//                 <Tooltip cursor={{fill: '#fffbeb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
//                 <Bar dataKey="tonnage" name="Total Quintals" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={40} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* DISPUTE ROOT CAUSE ANALYSIS */}
//           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><Scale size={20}/></div>
//               <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Dispute Root Cause Analysis</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={280}>
//               <PieChart>
//                 <Pie 
//                   data={data.disputeCauses || []} 
//                   dataKey="count" 
//                   nameKey="category" 
//                   cx="50%" cy="50%" 
//                   innerRadius={60} 
//                   outerRadius={90} 
//                   paddingAngle={5}
//                   stroke="none"
//                 >
//                   {(data.disputeCauses || []).map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={DISPUTE_COLORS[index % DISPUTE_COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip contentStyle={{borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: 'bold'}} />
//                 <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '20px' }} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* COMPLIANCE DISTRIBUTION */}
//         <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200 mb-10">
//           <div className="flex items-center gap-3 mb-10">
//             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ShieldCheck size={20}/></div>
//             <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Operational Compliance Distribution</h3>
//           </div>
//           <div className="flex flex-col md:flex-row items-center justify-around gap-12">
//             <div className="w-full max-w-[350px]">
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie 
//                     data={data.policyStats || []} 
//                     dataKey="value" 
//                     nameKey="name" 
//                     cx="50%" cy="50%" 
//                     innerRadius={80} 
//                     outerRadius={120} 
//                     paddingAngle={10}
//                     stroke="none"
//                   >
//                     {(data.policyStats || []).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COMPLIANCE_COLORS[index % COMPLIANCE_COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
//               {data.policyStats?.map((entry, idx) => (
//                 <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center min-w-[160px] hover:shadow-md transition-all">
//                   <div className="w-4 h-4 rounded-full mb-3" style={{backgroundColor: COMPLIANCE_COLORS[idx % COMPLIANCE_COLORS.length]}}></div>
//                   <span className="text-[11px] font-black text-slate-400 uppercase mb-1 tracking-widest">{entry.name}</span>
//                   <span className="text-3xl font-black text-slate-800">{entry.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid, BarChart, Bar, Legend,
  ComposedChart, Line
} from "recharts";
import { 
  TrendingUp, DollarSign, FileText, CheckCircle2, Lightbulb, 
  Users, ShieldCheck, Filter, BarChart3, Wheat, AlertTriangle,
  AlertCircle, ArrowUpRight, ArrowDownRight, Target, Scale, 
  Activity, Zap, Search
} from "lucide-react";

// Colors for the charts
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#ec4899"];
const DISPUTE_COLORS = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#8b5cf6"];

export default function AdminAnalytics() {
  const [data, setData] = useState({});
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  const timeRanges = [
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 30 Days", value: "30d" },
    { label: "Last 3 Months", value: "90d" },
    { label: "Last 1 Year", value: "1y" },
  ];

  useEffect(() => {
    fetchData();
  }, [range]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/analytics?range=${range}`);
      setData(res.data);
    } catch (err) {
      console.error("Analytics Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const ExecutiveKPI = ({ title, value, prevValue, icon: Icon, color, isCurrency }) => {
    const growth = calculateGrowth(value, prevValue);
    const isPositive = growth >= 0;

    return (
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600 group-hover:bg-${color}-600 group-hover:text-white transition-colors`}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {isPositive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
            {Math.abs(growth)}%
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{title}</p>
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
          {isCurrency ? `₹${(value || 0).toLocaleString()}` : (value || 0)}
        </h2>
        <p className="text-[9px] text-slate-400 font-bold mt-2 italic border-t border-slate-50 pt-2">
          Last Period: {isCurrency ? `₹${(prevValue || 0).toLocaleString()}` : (prevValue || 0)}
        </p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-8 bg-indigo-600 rounded-full"></div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Company Dashboard</p>
            </div>
            <h1 className="text-4xl font-black text-[#0f172a] tracking-tighter">Business Overview</h1>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Review Growth and Performance Bottlenecks</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm">
            <Filter size={16} className="text-slate-400 ml-4" />
            <div className="h-6 w-px bg-slate-100"></div>
            <select 
              value={range} 
              onChange={(e) => setRange(e.target.value)}
              className="bg-transparent outline-none text-xs font-black text-indigo-600 uppercase cursor-pointer px-4 appearance-none"
            >
              {timeRanges.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Loading Report Data...</p>
          </div>
        ) : (
          <>
            {/* TOP ROW: KEY PERFORMANCE NUMBERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <ExecutiveKPI title="Total Revenue" value={data.summary?.totalRevenue} prevValue={data.summary?.prevRevenue} icon={DollarSign} color="indigo" isCurrency />
              <ExecutiveKPI title="Total Contracts" value={data.summary?.totalContracts} prevValue={data.summary?.prevContracts} icon={FileText} color="blue" />
              <ExecutiveKPI title="Farmer Count" value={data.stats?.farmers} prevValue={data.stats?.prevFarmers} icon={Users} color="emerald" />
              <ExecutiveKPI title="Active Disputes" value={data.stats?.disputes} prevValue={data.stats?.prevDisputes} icon={AlertCircle} color="rose" />
            </div>

            {/* SECOND ROW: MARKET & PROCESS ISSUES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              
              {/* CHART: SUPPLY VS DEMAND */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200 relative">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Zap size={20}/></div>
                    <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Stock vs. Buyer Demand</h3>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                     <span className="flex items-center gap-1.5 text-indigo-600">● Supply (Stock)</span>
                     <span className="flex items-center gap-1.5 text-rose-500">● Demand (Orders)</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={data.marketGap || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="crop" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                    <Legend />
                    <Bar dataKey="supply" name="Current Stock" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
                    <Line type="monotone" dataKey="demand" name="Buyer Interest" stroke="#f43f5e" strokeWidth={4} dot={{ r: 6, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* STALLED CONTRACTS PANEL */}
              <div className="bg-[#0f172a] text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                  <Target size={200} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl"><Target size={20}/></div>
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-xs">Where are we stuck?</h3>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">Farmers Stuck in Sowing</span>
                        <span className="text-sm font-black text-rose-400">{data.loopholes?.stalledInSowing || 0} Cases</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">Contracts Not Signed Yet</span>
                        <span className="text-sm font-black text-amber-400">{data.loopholes?.stalledInNegotiation || 0} Pending</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">General Progress</span>
                        <span className="text-sm font-black text-emerald-400">{Math.round(data.loopholes?.avgProgress || 0)}% Complete</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${data.loopholes?.avgProgress || 0}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-indigo-400">
                      <Lightbulb size={16} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Platform Status Alert</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">
                      "Wait times in the sowing stage are increasing. Recommend notifying farmers to upload their verification photos."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* THIRD ROW: TRENDS & DISPUTES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
              
              {/* AREA CHART: REVENUE TRENDS */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Activity size={20}/></div>
                  <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Revenue Trends over Time</h3>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={data.revenueData || []}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="value" name="Revenue Amount" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* PIE CHART: DISPUTE REASONS */}
              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><Scale size={20}/></div>
                  <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Main Dispute Reasons</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={data.disputeCauses || []} 
                      dataKey="count" 
                      nameKey="category" 
                      cx="50%" cy="50%" 
                      innerRadius={70} 
                      outerRadius={100} 
                      paddingAngle={8}
                      stroke="none"
                    >
                      {(data.disputeCauses || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DISPUTE_COLORS[index % DISPUTE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', fontWeight: 'bold'}} />
                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}