// import { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";

// export default function DisputesPage() {
//   const [disputes, setDisputes] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetchDisputes();
//   }, []);

//   const fetchDisputes = async () => {
//     try {
//       const res = await api.get("/admin/disputes");
//       setDisputes(res.data.disputes);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔍 Resolve / Reject with message
//   const resolveDispute = async (id, status) => {
//     let message = "";

//     if (status === "REJECTED") {
//       message = prompt("Enter rejection reason:");
//       if (!message) return;
//     }

//     if (status === "RESOLVED") {
//       message = prompt("Enter resolution note:");
//       if (!message) return;
//     }

//     try {
//       await api.patch(`/admin/disputes/${id}/resolve`, {
//         status,
//         response: message,
//       });

//       fetchDisputes();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ❄️ Freeze contract
//   const freezeContract = async (contractId) => {
//     const reason = prompt("Enter reason to freeze contract:");
//     if (!reason) return;

//     try {
//       await api.patch(`/admin/contracts/${contractId}/freeze`, {
//         reason,
//       });

//       alert("Contract frozen successfully");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex">
//       <AdminSidebar />

//       <div className="flex-1 p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Dispute Management</h1>

//         <div className="space-y-5">
//           {disputes.map((d) => {
//             const isClosed = d.status === "RESOLVED" || d.status === "REJECTED";

//             return (
//               <div
//                 key={d._id}
//                 className="bg-white rounded-xl shadow p-5 space-y-3 hover:shadow-lg transition"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-center">
//                   <h2 className="font-bold text-lg">{d.category}</h2>

//                   <span
//                     className={`text-xs px-3 py-1 rounded ${
//                       d.status === "OPEN"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : d.status === "RESOLVED"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {d.status}
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-600 text-sm">{d.description}</p>

//                 {/* Requested Resolution */}
//                 <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
//                   {d.requestedResolution}
//                 </span>

//                 {/* Contract Info */}
//                 <div className="bg-gray-50 p-3 rounded text-xs space-y-1">
//                   <p>
//                     <b>Farmer:</b> {d.contractId?.farmer?.name || "N/A"}
//                   </p>
//                   <p>
//                     <b>Buyer:</b> {d.contractId?.buyer?.name || "N/A"}
//                   </p>
//                   <p>
//                     <b>Contract Status:</b>{" "}
//                     {d.contractId?.contractStatus || "N/A"}
//                   </p>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   <button
//                     onClick={() => setSelected(d)}
//                     className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//                   >
//                     View
//                   </button>

//                   <button
//                     disabled={isClosed}
//                     onClick={() => resolveDispute(d._id, "RESOLVED")}
//                     className={`px-3 py-1 rounded text-white ${
//                       isClosed
//                         ? "bg-gray-300 cursor-not-allowed"
//                         : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     Resolve
//                   </button>

//                   <button
//                     disabled={isClosed}
//                     onClick={() => resolveDispute(d._id, "REJECTED")}
//                     className={`px-3 py-1 rounded text-white ${
//                       isClosed
//                         ? "bg-gray-300 cursor-not-allowed"
//                         : "bg-red-500 hover:bg-red-600"
//                     }`}
//                   >
//                     Reject
//                   </button>

//                   <button
//                     onClick={() => freezeContract(d.contractId._id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                   >
//                     Freeze
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* 🔍 Modal */}
//         {selected && (
//           <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-xl w-[450px] shadow-xl">
//               <h2 className="text-xl font-bold mb-4">Dispute Details</h2>

//               <p>
//                 <b>Category:</b> {selected.category}
//               </p>
//               <p>
//                 <b>Description:</b> {selected.description}
//               </p>
//               <p>
//                 <b>Requested:</b> {selected.requestedResolution}
//               </p>

//               <p className="mt-2">
//                 <b>Status:</b> {selected.status}
//               </p>

//               <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
//                 <p>
//                   <b>Farmer:</b> {selected.contractId?.farmer?.name}
//                 </p>
//                 <p>
//                   <b>Buyer:</b> {selected.contractId?.buyer?.name}
//                 </p>
//               </div>

//               {selected.adminResponse && (
//                 <div className="mt-3 bg-green-50 p-2 rounded text-sm">
//                   <b>Admin Note:</b> {selected.adminResponse}
//                 </div>
//               )}

//               <button
//                 onClick={() => setSelected(null)}
//                 className="mt-5 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }
// import { useEffect, useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import api from "../../api/axios";
// import { 
//   Gavel, 
//   AlertCircle, 
//   User, 
//   FileText, 
//   CheckCircle2, 
//   XCircle, 
//   Eye, 
//   ShieldAlert,
//   Snowflake,
//   ChevronRight,
//   Clock
// } from "lucide-react";

// export default function DisputesPage() {
//   const [disputes, setDisputes] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- LOGIC PRESERVED ---
//   useEffect(() => {
//     fetchDisputes();
//   }, []);

//   const fetchDisputes = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/disputes");
//       setDisputes(res.data.disputes || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resolveDispute = async (id, status) => {
//     let message = "";
//     if (status === "REJECTED") {
//       message = prompt("Enter rejection reason:");
//       if (!message) return;
//     }
//     if (status === "RESOLVED") {
//       message = prompt("Enter resolution note:");
//       if (!message) return;
//     }

//     try {
//       await api.patch(`/admin/disputes/${id}/resolve`, {
//         status,
//         response: message,
//       });
//       fetchDisputes();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const freezeContract = async (contractId) => {
//     const reason = prompt("Enter reason to freeze contract:");
//     if (!reason) return;

//     try {
//       await api.patch(`/admin/contracts/${contractId}/freeze`, {
//         reason,
//       });
//       alert("Contract frozen successfully");
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   // -----------------------

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
//               <Gavel className="text-indigo-600" size={32} /> Dispute Management
//             </h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Legal Compliance & Resolution Center</p>
//           </div>
//           <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
//             <ShieldAlert size={16} className="text-rose-500" />
//             <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">
//               {disputes.filter(d => d.status === 'OPEN').length} Active Cases
//             </span>
//           </div>
//         </div>

//         {/* CONTENT AREA */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
//              <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
//              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Legal Vault...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 pb-20">
//             {disputes.map((d) => {
//               const isClosed = d.status === "RESOLVED" || d.status === "REJECTED";
//               return (
//                 <div
//                   key={d._id}
//                   className={`bg-white rounded-[2rem] border transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-xl ${
//                     d.status === "OPEN" ? "border-amber-200" : "border-slate-100"
//                   }`}
//                 >
//                   {/* Left: Status Column */}
//                   <div className="flex flex-col items-center justify-center md:w-28 shrink-0 border-r border-slate-50 pr-6">
//                     <div className={`p-4 rounded-2xl mb-3 ${
//                       d.status === 'OPEN' ? 'bg-amber-50 text-amber-600' : 
//                       d.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
//                     }`}>
//                       <AlertCircle size={28} />
//                     </div>
//                     <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border ${
//                       d.status === 'OPEN' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
//                       d.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'
//                     }`}>
//                       {d.status}
//                     </span>
//                   </div>

//                   {/* Middle: Info Column */}
//                   <div className="flex-1 space-y-4">
//                     <div>
//                       <h2 className="text-xl font-black text-slate-800 tracking-tight">{d.category}</h2>
//                       <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed line-clamp-2">
//                         {d.description}
//                       </p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
//                         <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Parties Involved</p>
//                         <p className="text-[10px] font-bold text-slate-700 flex flex-col">
//                           <span>Farmer: {d.contractId?.farmer?.name || "N/A"}</span>
//                           <span>Buyer: {d.contractId?.buyer?.name || "N/A"}</span>
//                         </p>
//                       </div>
//                       <div className="p-3 bg-indigo-50/30 rounded-xl border border-indigo-100">
//                         <p className="text-[8px] font-black text-indigo-400 uppercase mb-1">Requested Outcome</p>
//                         <p className="text-[10px] font-bold text-indigo-700">{d.requestedResolution}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right: Actions Column */}
//                   <div className="flex flex-col justify-center gap-2 md:w-48 border-l border-slate-50 pl-6">
//                     <button
//                       onClick={() => setSelected(d)}
//                       className="w-full bg-slate-100 text-slate-600 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
//                     >
//                       <Eye size={14} /> Full File
//                     </button>
                    
//                     <div className="grid grid-cols-2 gap-2">
//                       <button
//                         disabled={isClosed}
//                         onClick={() => resolveDispute(d._id, "RESOLVED")}
//                         className="bg-emerald-600 text-white py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-700 transition-all flex items-center justify-center disabled:opacity-30"
//                         title="Approve Resolution"
//                       >
//                         <CheckCircle2 size={16} />
//                       </button>
//                       <button
//                         disabled={isClosed}
//                         onClick={() => resolveDispute(d._id, "REJECTED")}
//                         className="bg-rose-500 text-white py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-rose-600 transition-all flex items-center justify-center disabled:opacity-30"
//                         title="Reject Claim"
//                       >
//                         <XCircle size={16} />
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => freezeContract(d.contractId._id)}
//                       className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95"
//                     >
//                       <Snowflake size={14} /> Freeze Agreement
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* MODAL */}
//         {selected && (
//           <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//             <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-[550px] shadow-2xl space-y-6 animate-in zoom-in duration-200">
//               <div className="flex justify-between items-start">
//                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dispute Dossier</h2>
//                  <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors font-black">✕</button>
//               </div>

//               <div className="space-y-4 text-sm font-medium">
//                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
//                   <p className="text-[10px] font-black text-indigo-600 uppercase mb-2 tracking-widest">Case Description</p>
//                   <p className="text-slate-700 leading-relaxed"><b className="text-slate-900">{selected.category}:</b> {selected.description}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                    <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100">
//                      <p className="text-[10px] font-black text-indigo-600 uppercase mb-2">Parties</p>
//                      <p className="text-[11px] text-slate-600 leading-relaxed font-bold">F: {selected.contractId?.farmer?.name}<br/>B: {selected.contractId?.buyer?.name}</p>
//                    </div>
//                    <div className="p-4 bg-amber-50/30 rounded-2xl border border-amber-100">
//                      <p className="text-[10px] font-black text-amber-600 uppercase mb-2">Requested</p>
//                      <p className="text-[11px] text-slate-600 font-bold">{selected.requestedResolution}</p>
//                    </div>
//                 </div>
//               </div>

//               {selected.adminResponse && (
//                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
//                   <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-1" />
//                   <div>
//                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Resolution Note</p>
//                     <p className="text-xs text-emerald-800 font-bold leading-relaxed">{selected.adminResponse}</p>
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={() => setSelected(null)}
//                 className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
//               >
//                 Close Case File
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";
import { 
  Gavel, 
  AlertCircle, 
  User, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ShieldAlert,
  Snowflake,
  Clock,
  Paperclip,
  Calendar,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";

export default function DisputesPage() {
  const [disputes, setDisputes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("OPEN"); // Tabs: OPEN, CLOSED

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/disputes");
      setDisputes(res.data.disputes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resolveDispute = async (id, status) => {
    let message = "";
    if (status === "REJECTED") {
      message = prompt("Enter official rejection reason (visible to parties):");
      if (!message) return;
    }
    if (status === "RESOLVED") {
      message = prompt("Enter official resolution note & settlement terms:");
      if (!message) return;
    }

    try {
      await api.patch(`/admin/disputes/${id}/resolve`, {
        status,
        response: message,
      });
      fetchDisputes();
      if (selected && selected._id === id) setSelected(null); // Close modal on action
    } catch (err) {
      console.error(err);
      alert("Failed to update dispute status.");
    }
  };

  const freezeContract = async (contractId) => {
    const reason = prompt("Enter emergency reason to freeze this contract:");
    if (!reason) return;

    try {
      await api.patch(`/admin/contracts/${contractId}/freeze`, {
        reason,
      });
      alert("Emergency override successful: Contract is now FROZEN.");
      fetchDisputes();
    } catch (err) {
      console.error(err);
      alert("Failed to freeze contract.");
    }
  };

  // Helper function to format elapsed time
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " seconds ago";
  };

  // Filter queue based on active tab
  const filteredQueue = disputes.filter(d => {
    if (activeTab === "OPEN") return d.status === "OPEN" || d.status === "UNDER_REVIEW";
    return d.status === "RESOLVED" || d.status === "REJECTED";
  });

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
              <Gavel className="text-indigo-600" size={32} /> Legal & Mediation
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Dispute Resolution Command Center</p>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-1.5 bg-rose-50 text-rose-500 rounded-lg"><ShieldAlert size={16} /></div>
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">
              {disputes.filter(d => d.status === 'OPEN').length} Cases Pending
            </span>
          </div>
        </div>

        {/* QUEUE TABS */}
        <div className="flex gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-[1.5rem] w-fit">
          <button 
            onClick={() => setActiveTab("OPEN")} 
            className={`px-8 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "OPEN" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-500 hover:text-slate-700"}`}
          >
            Open Docket ({disputes.filter(d => d.status === 'OPEN' || d.status === 'UNDER_REVIEW').length})
          </button>
          <button 
            onClick={() => setActiveTab("CLOSED")} 
            className={`px-8 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "CLOSED" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-500 hover:text-slate-700"}`}
          >
            Closed Cases ({disputes.filter(d => d.status === 'RESOLVED' || d.status === 'REJECTED').length})
          </button>
        </div>

        {/* CONTENT AREA */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100">
             <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Accessing Legal Vault...</p>
          </div>
        ) : filteredQueue.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 border-dashed">
             <CheckCircle2 size={48} className="text-emerald-300 mb-4" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No cases in this docket.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 pb-24">
            {filteredQueue.map((d) => {
              const isClosed = d.status === "RESOLVED" || d.status === "REJECTED";
              const raisedByName = d.raisedByUserId?.name || "User";
              const hasEvidence = d.evidenceFiles && d.evidenceFiles.length > 0;

              return (
                <div
                  key={d._id}
                  className={`bg-white rounded-[2.5rem] border transition-all duration-300 p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-xl group ${
                    d.status === "OPEN" ? "border-amber-200 hover:border-amber-400" : "border-slate-100 hover:border-indigo-200"
                  }`}
                >
                  {/* Left: Status Column */}
                  <div className="flex flex-col items-center justify-center md:w-32 shrink-0 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
                    <div className={`p-5 rounded-[1.5rem] mb-4 shadow-inner ${
                      d.status === 'OPEN' ? 'bg-amber-50 text-amber-600' : 
                      d.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <AlertCircle size={32} strokeWidth={2.5} />
                    </div>
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border text-center w-full ${
                      d.status === 'OPEN' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                      d.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  {/* Middle: Info Column */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-lg uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> {timeAgo(d.createdAt)}
                      </span>
                      {hasEvidence && (
                        <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg uppercase tracking-widest flex items-center gap-1 border border-indigo-100">
                          <Paperclip size={10} /> Evidence Attached
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2 group-hover:text-indigo-600 transition-colors">
                      {d.category.replace(/_/g, " ")}
                    </h2>
                    
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <User size={12} className="text-slate-400" /> Raised by {d.raisedByRole}: <span className="text-slate-600">{raisedByName}</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1.5 tracking-widest flex items-center gap-1">
                          <AlertTriangle size={12} className="text-slate-400" /> Complaint Snippet
                        </p>
                        <p className="text-[11px] font-medium text-slate-600 line-clamp-2 leading-relaxed italic">"{d.description}"</p>
                      </div>
                      <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                        <p className="text-[9px] font-black text-indigo-400 uppercase mb-1.5 tracking-widest">Requested Resolution</p>
                        <p className="text-xs font-bold text-indigo-700">{d.requestedResolution.replace(/_/g, " ")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions Column */}
                  <div className="flex flex-col justify-center gap-3 md:w-48 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <button
                      onClick={() => setSelected(d)}
                      className="w-full bg-slate-900 text-white h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    >
                      <Eye size={16} strokeWidth={2.5} /> View Dossier
                    </button>
                    
                    {!isClosed && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => resolveDispute(d._id, "RESOLVED")}
                          className="bg-emerald-500 text-white h-12 rounded-2xl text-[10px] font-black uppercase hover:bg-emerald-600 transition-all flex items-center justify-center shadow-lg shadow-emerald-200 active:scale-95"
                          title="Rule in favor / Resolve"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          onClick={() => resolveDispute(d._id, "REJECTED")}
                          className="bg-rose-500 text-white h-12 rounded-2xl text-[10px] font-black uppercase hover:bg-rose-600 transition-all flex items-center justify-center shadow-lg shadow-rose-200 active:scale-95"
                          title="Dismiss / Reject Claim"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => freezeContract(d.contractId._id)}
                      className="w-full bg-slate-100 text-slate-500 h-10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-transparent transition-all flex items-center justify-center gap-1.5"
                      title="Halt all contract activities"
                    >
                      <Snowflake size={12} /> Emergency Freeze
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL DOSSIER */}
        {selected && (
          <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-[3rem] w-full max-w-[600px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="p-8 bg-indigo-600 text-white relative flex-shrink-0">
                <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors font-black">✕</button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Gavel size={24} /></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-3 py-1.5 rounded-full border border-white/20">Official Case File</span>
                </div>
                <h2 className="text-3xl font-black tracking-tight">{selected.category.replace(/_/g, " ")}</h2>
                <div className="flex gap-4 mt-4 text-[10px] font-bold uppercase tracking-widest opacity-80">
                  <span className="flex items-center gap-1"><Calendar size={12}/> Filed {new Date(selected.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User size={12}/> By {selected.raisedByRole}</span>
                </div>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-8 overflow-y-auto space-y-6 flex-1 no-scrollbar">
                
                {/* Description */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={12}/> Complainant Statement</p>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed font-medium">
                    "{selected.description}"
                  </div>
                </div>

                {/* Parties Involved */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                     <p className="text-[9px] font-black text-emerald-600 uppercase mb-1 tracking-widest">Farmer Defendant</p>
                     <p className="text-sm text-slate-800 font-bold">{selected.contractId?.farmer?.name || "Unknown"}</p>
                   </div>
                   <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                     <p className="text-[9px] font-black text-blue-600 uppercase mb-1 tracking-widest">Buyer Defendant</p>
                     <p className="text-sm text-slate-800 font-bold">{selected.contractId?.buyer?.name || "Unknown"}</p>
                   </div>
                </div>

                {/* Requested Outcome */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex justify-between items-center">
                   <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Demanded Action</p>
                   <p className="text-sm text-amber-900 font-black">{selected.requestedResolution.replace(/_/g, " ")}</p>
                </div>

                {/* Evidence Files */}
                {selected.evidenceFiles && selected.evidenceFiles.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12}/> Attached Evidence ({selected.evidenceFiles.length})</p>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {selected.evidenceFiles.map((file, idx) => (
                        <a key={idx} href={`http://localhost:5000/${file.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer" className="shrink-0 w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden hover:border-indigo-400 transition-colors group">
                           <img src={`http://localhost:5000/${file.replace(/\\/g, "/")}`} alt="Evidence" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=File'; }}/>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resolution Stamp */}
                {selected.adminResponse && (
                  <div className="p-5 bg-slate-900 rounded-2xl flex gap-4 mt-4 shadow-inner">
                    <div className={`p-2 rounded-xl h-fit ${selected.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                       <Gavel size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Official Platform Ruling</p>
                      <p className="text-sm text-white font-medium leading-relaxed">"{selected.adminResponse}"</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-3">Dictated on {new Date(selected.resolvedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer (Actions) */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 flex-shrink-0 rounded-b-[3rem]">
                 {selected.status === "OPEN" || selected.status === "UNDER_REVIEW" ? (
                   <>
                     <button onClick={() => resolveDispute(selected._id, "RESOLVED")} className="flex-1 bg-emerald-500 text-white h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95">Rule in Favor</button>
                     <button onClick={() => resolveDispute(selected._id, "REJECTED")} className="flex-1 bg-rose-500 text-white h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95">Dismiss Claim</button>
                   </>
                 ) : (
                   <button onClick={() => setSelected(null)} className="w-full bg-slate-200 text-slate-600 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-300 transition-all active:scale-95">Acknowledge</button>
                 )}
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}