// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import Sidebar from "../../components/admin/AdminSidebar";

// /* =========================
//    MAIN PAGE
// ========================= */
// export default function AdminSupport() {
//   const [tickets, setTickets] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");

//   useEffect(() => {
//     loadTickets();
//   }, []);

//   const loadTickets = async () => {
//     try {
//       const res = await api.get("/admin/tickets");
//       setTickets(res.data.tickets);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredTickets =
//     filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />

//       <main className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-2xl font-black text-[#064e3b] mb-4">
//           Support Requests
//         </h1>

//         {/* FILTER */}
//         <div className="mb-4">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="ALL">All</option>
//             <option value="OPEN">Open</option>
//             <option value="IN_PROGRESS">In Progress</option>
//             <option value="NEEDS_INFO">Needs Info</option>
//             <option value="RESOLVED">Resolved</option>
//           </select>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
//           </div>
//         ) : filteredTickets.length === 0 ? (
//           <p className="text-gray-500">No support requests found</p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-4">
//             {filteredTickets.map((t) => (
//               <div
//                 key={t._id}
//                 className={`p-4 rounded-xl shadow border transition ${
//                   t.priority === "HIGH"
//                     ? "bg-red-50 border-red-300"
//                     : "bg-white"
//                 }`}
//               >
//                 {/* SUBJECT */}
//                 <h3 className="font-bold text-lg">{t.subject}</h3>

//                 {/* USER */}
//                 <p className="text-xs text-gray-400">
//                   {t.userId?.name} • {t.userId?.email}
//                 </p>

//                 {/* PROBLEM */}
//                 <p className="text-sm text-gray-600 mt-1">{t.problem}</p>

//                 {/* STATUS */}
//                 <div className="mt-2 flex items-center gap-2">
//                   <span
//                     className={`px-2 py-1 text-xs rounded font-bold ${
//                       t.status === "OPEN"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : t.status === "IN_PROGRESS"
//                           ? "bg-blue-100 text-blue-700"
//                           : t.status === "RESOLVED"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {t.status}
//                   </span>

//                   {/* PRIORITY */}
//                   <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
//                     {t.priority}
//                   </span>
//                 </div>

//                 {/* ACTION */}
//                 <button
//                   onClick={() => setSelected(t)}
//                   className="mt-3 text-sm text-emerald-600 font-semibold"
//                 >
//                   View Details →
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* MODAL */}
//         {selected && (
//           <TicketModal
//             ticket={selected}
//             onClose={() => setSelected(null)}
//             refresh={loadTickets}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// /* =========================
//    MODAL
// ========================= */
// function TicketModal({ ticket, onClose, refresh }) {
//   const [note, setNote] = useState("");
//   const [reply, setReply] = useState("");
//   const [status, setStatus] = useState(ticket.status);
//   const [updating, setUpdating] = useState(false);

//   const update = async () => {
//     try {
//       setUpdating(true);

//       await api.patch(`/admin/ticket/${ticket._id}`, {
//         status,
//         note,
//         reply,
//       });

//       refresh();
//       onClose();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//       <div className="bg-white w-[650px] p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
//         {/* HEADER */}
//         <h2 className="font-bold text-lg mb-2">{ticket.subject}</h2>
//         <p className="text-sm text-gray-600">{ticket.problem}</p>

//         {/* FILE */}
//         {ticket.fileUrl && (
//           <img
//             src={`http://localhost:5000/${ticket.fileUrl}`}
//             className="mt-3 rounded-lg"
//           />
//         )}

//         {/* STATUS */}
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="mt-4 border p-2 w-full rounded"
//         >
//           <option>OPEN</option>
//           <option>IN_PROGRESS</option>
//           <option>NEEDS_INFO</option>
//           <option>RESOLVED</option>
//         </select>

//         {/* NOTES HISTORY */}
//         {ticket.adminNotes?.length > 0 && (
//           <div className="mt-4">
//             <h4 className="font-semibold text-sm">Admin Notes</h4>
//             {ticket.adminNotes.map((n, i) => (
//               <p key={i} className="text-xs text-gray-500">
//                 • {n.text}
//               </p>
//             ))}
//           </div>
//         )}

//         {/* CHAT HISTORY */}
//         {ticket.replies?.length > 0 && (
//           <div className="mt-4">
//             <h4 className="font-semibold text-sm">Conversation</h4>
//             {ticket.replies.map((r, i) => (
//               <p key={i} className="text-xs">
//                 <b>{r.from}:</b> {r.message}
//               </p>
//             ))}
//           </div>
//         )}

//         {/* NEW NOTE */}
//         <textarea
//           placeholder="Add internal note..."
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//           className="mt-4 w-full border p-2 rounded"
//         />

//         {/* REPLY */}
//         <textarea
//           placeholder="Reply to farmer..."
//           value={reply}
//           onChange={(e) => setReply(e.target.value)}
//           className="mt-3 w-full border p-2 rounded"
//         />

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 mt-4">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
//             Cancel
//           </button>

//           <button
//             onClick={update}
//             disabled={updating}
//             className="px-4 py-2 bg-emerald-600 text-white rounded"
//           >
//             {updating ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import { 
//   MessageSquare, 
//   User, 
//   Clock, 
//   ChevronRight, 
//   Filter, 
//   Info, 
//   Image as ImageIcon,
//   CheckCircle2,
//   AlertCircle
// } from "lucide-react";

// /* =========================
//    MAIN PAGE
// ========================= */
// export default function AdminSupport() {
//   const [tickets, setTickets] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");

//   // --- LOGIC PRESERVED ---
//   useEffect(() => {
//     loadTickets();
//   }, []);

//   const loadTickets = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/tickets");
//       setTickets(res.data.tickets || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredTickets =
//     filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);
//   // -----------------------

//   const getStatusBadge = (status) => {
//     const styles = {
//       OPEN: "bg-amber-50 text-amber-600 border-amber-100",
//       IN_PROGRESS: "bg-indigo-50 text-indigo-600 border-indigo-100",
//       RESOLVED: "bg-emerald-50 text-emerald-600 border-emerald-100",
//       NEEDS_INFO: "bg-purple-50 text-purple-600 border-purple-100",
//     };
//     return styles[status] || "bg-slate-50 text-slate-600 border-slate-100";
//   };

//   return (
//     <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
//       <AdminSidebar />

//       <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
//               <MessageSquare className="text-indigo-600" size={32} /> Support Requests
//             </h1>
//             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Farmer & Buyer Assistance Hub</p>
//           </div>

//           <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
//             <Filter size={16} className="text-slate-400 ml-2" />
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="bg-transparent text-[10px] font-black text-slate-700 outline-none pr-4 uppercase tracking-widest cursor-pointer"
//             >
//               <option value="ALL">All Tickets</option>
//               <option value="OPEN">Open</option>
//               <option value="IN_PROGRESS">In Progress</option>
//               <option value="NEEDS_INFO">Needs Info</option>
//               <option value="RESOLVED">Resolved</option>
//             </select>
//           </div>
//         </div>

//         {/* CONTENT AREA */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
//              <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
//              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Support Desk...</p>
//           </div>
//         ) : filteredTickets.length === 0 ? (
//           <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
//             <p className="text-slate-400 font-bold uppercase text-xs tracking-widest italic">No support requests found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
//             {filteredTickets.map((t) => (
//               <div
//                 key={t._id}
//                 className={`group bg-white rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl ${
//                   t.priority === "HIGH" ? "border-rose-200 bg-rose-50/20 shadow-sm" : "border-slate-100 shadow-sm"
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                    <div className="flex items-center gap-3">
//                      <div className={`p-3 rounded-2xl ${t.priority === 'HIGH' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
//                         {t.priority === 'HIGH' ? <AlertCircle size={20} /> : <Info size={20} />}
//                      </div>
//                      <div>
//                        <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{t.subject}</h3>
//                        <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mt-1">
//                           <User size={10} /> {t.userId?.name}
//                        </p>
//                      </div>
//                    </div>
//                    <div className="flex flex-col items-end gap-2">
//                     <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest ${getStatusBadge(t.status)}`}>
//                       {t.status}
//                     </span>
//                     {t.priority === "HIGH" && <span className="text-[8px] font-black text-rose-500 uppercase tracking-tighter">Emergency</span>}
//                    </div>
//                 </div>

//                 <p className="text-sm text-slate-600 font-medium line-clamp-2 mb-6 h-10 leading-relaxed italic">
//                   "{t.problem}"
//                 </p>

//                 <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                   <div className="flex items-center gap-2 text-slate-400">
//                     <Clock size={12} />
//                     <span className="text-[10px] font-bold uppercase tracking-tighter">{new Date(t.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <button
//                     onClick={() => setSelected(t)}
//                     className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
//                   >
//                     Open Ticket <ChevronRight size={14} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* MODAL */}
//         {selected && (
//           <TicketModal
//             ticket={selected}
//             onClose={() => setSelected(null)}
//             refresh={loadTickets}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// /* =========================
//    MODAL (Conversation Style)
// ========================= */
// function TicketModal({ ticket, onClose, refresh }) {
//   const [note, setNote] = useState("");
//   const [reply, setReply] = useState("");
//   const [status, setStatus] = useState(ticket.status);
//   const [updating, setUpdating] = useState(false);

//   // --- LOGIC PRESERVED ---
//   const update = async () => {
//     try {
//       setUpdating(true);
//       await api.patch(`/admin/ticket/${ticket._id}`, {
//         status,
//         note,
//         reply,
//       });
//       refresh();
//       onClose();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUpdating(false);
//     }
//   };
//   // -----------------------

//   return (
//     <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//       <div className="bg-white w-full max-w-[750px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in duration-200">
        
//         {/* MODAL HEADER */}
//         <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
//           <div>
//             <h2 className="text-2xl font-black text-slate-900 tracking-tight">{ticket.subject}</h2>
//             <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">Ticket Ref: {ticket._id.slice(-8).toUpperCase()}</p>
//           </div>
//           <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all font-black">✕</button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          
//           {/* PROBLEM OVERVIEW */}
//           <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
//              <div className="bg-indigo-600 px-6 py-2">
//                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Inquiry Details</span>
//              </div>
//              <div className="p-6">
//                <p className="text-slate-700 font-medium leading-relaxed">{ticket.problem}</p>
//                {ticket.fileUrl && (
//                  <div className="mt-6">
//                    <p className="text-[10px] font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
//                       <ImageIcon size={14} /> Attached Evidence
//                    </p>
//                    <img src={`http://localhost:5000/${ticket.fileUrl}`} className="rounded-2xl border-4 border-slate-50 shadow-lg w-full max-h-64 object-cover" alt="Ticket Evidence" />
//                  </div>
//                )}
//              </div>
//           </div>

//           {/* STATUS SELECTION */}
//           <div className="space-y-4">
//             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Set Resolution Status</h4>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                {["OPEN", "IN_PROGRESS", "NEEDS_INFO", "RESOLVED"].map((s) => (
//                  <button 
//                   key={s} 
//                   onClick={() => setStatus(s)}
//                   className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
//                     status === s 
//                     ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
//                     : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-400'
//                   }`}
//                  >
//                    {s.replace("_", " ")}
//                  </button>
//                ))}
//             </div>
//           </div>

//           {/* HISTORY SECTION (Simplified logic-safe render) */}
//           {(ticket.adminNotes?.length > 0 || ticket.replies?.length > 0) && (
//             <div className="space-y-6">
//               <div className="h-px bg-slate-100"></div>
//               {ticket.replies?.length > 0 && (
//                 <div className="space-y-4">
//                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversation Log</h4>
//                   {ticket.replies.map((r, i) => (
//                     <div key={i} className={`p-4 rounded-2xl border ${r.from === 'ADMIN' ? 'bg-indigo-50 border-indigo-100 ml-12' : 'bg-slate-50 border-slate-200 mr-12'}`}>
//                       <p className="text-[9px] font-black text-indigo-600 uppercase mb-1">{r.from}</p>
//                       <p className="text-sm font-medium text-slate-700 leading-relaxed">{r.message}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* INPUT FORMS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest flex items-center gap-2">
//                 <Info size={12} /> Internal Admin Log
//               </label>
//               <textarea
//                 placeholder="Log internal updates here..."
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 className="w-full border-2 border-slate-100 focus:border-indigo-600 p-4 rounded-[1.5rem] outline-none text-sm font-medium h-32 transition-all bg-slate-50/30"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-indigo-600 uppercase ml-2 tracking-widest flex items-center gap-2">
//                 <CheckCircle2 size={12} /> Reply to User
//               </label>
//               <textarea
//                 placeholder="Type your response to the farmer..."
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//                 className="w-full border-2 border-indigo-100 focus:border-indigo-600 p-4 rounded-[1.5rem] outline-none text-sm font-medium h-32 transition-all bg-indigo-50/10"
//               />
//             </div>
//           </div>
//         </div>

//         {/* MODAL ACTIONS */}
//         <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
//           <button onClick={onClose} className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Discard</button>
//           <button
//             onClick={update}
//             disabled={updating}
//             className="px-10 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
//           >
//             {updating ? "Committing..." : "Finalize Response"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { 
  MessageSquare, 
  User, 
  Clock, 
  ChevronRight, 
  Filter, 
  Info, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Lock,
  MessageCircle,
  Paperclip,
  Send
} from "lucide-react";

/* =========================
   MAIN PAGE
========================= */
export default function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/tickets");
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);

  // TRIAGE QUEUE: Sort High Priority first, then newest
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (a.priority === "HIGH" && b.priority !== "HIGH") return -1;
    if (a.priority !== "HIGH" && b.priority === "HIGH") return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const getStatusBadge = (status) => {
    const styles = {
      OPEN: "bg-amber-50 text-amber-600 border-amber-100",
      IN_PROGRESS: "bg-indigo-50 text-indigo-600 border-indigo-100",
      RESOLVED: "bg-emerald-50 text-emerald-600 border-emerald-100",
      NEEDS_INFO: "bg-purple-50 text-purple-600 border-purple-100",
    };
    return styles[status] || "bg-slate-50 text-slate-600 border-slate-100";
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return "Just now";
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
              <MessageSquare className="text-indigo-600" size={32} /> Helpdesk Control
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">Platform Support & Triage</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <Filter size={16} className="text-slate-400 ml-2" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-[10px] font-black text-slate-700 outline-none pr-4 uppercase tracking-widest cursor-pointer"
            >
              <option value="ALL">All Tickets</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="NEEDS_INFO">Needs Info</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>

        {/* CONTENT AREA */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
             <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Helpdesk Channels...</p>
          </div>
        ) : sortedTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 border-dashed">
             <CheckCircle2 size={48} className="text-emerald-300 mb-4" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Inbox Zero. No active support requests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24">
            {sortedTickets.map((t) => (
              <div
                key={t._id}
                className={`group bg-white rounded-[2.5rem] p-6 md:p-8 border transition-all duration-300 hover:shadow-xl flex flex-col ${
                  t.priority === "HIGH" ? "border-rose-200 bg-rose-50/20 shadow-md hover:border-rose-400" : "border-slate-100 shadow-sm hover:border-indigo-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-4">
                     <div className={`p-4 rounded-2xl shadow-inner ${t.priority === 'HIGH' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
                        {t.priority === 'HIGH' ? <AlertCircle size={24} /> : <MessageSquare size={24} />}
                     </div>
                     <div>
                       <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{t.subject}</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 mt-1.5 bg-slate-100 w-fit px-2 py-1 rounded-md">
                          <User size={10} className="text-slate-400" /> {t.userId?.name || "Unknown User"}
                       </p>
                     </div>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl border uppercase tracking-widest ${getStatusBadge(t.status)}`}>
                      {t.status.replace("_", " ")}
                    </span>
                    {t.priority === "HIGH" && <span className="text-[8px] font-black text-white bg-rose-500 px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm animate-pulse">Emergency</span>}
                   </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-600 font-medium line-clamp-2 mb-6 h-10 leading-relaxed italic border-l-2 border-slate-200 pl-3">
                    "{t.problem}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                      <Clock size={12} /> {timeAgo(t.createdAt)}
                    </span>
                    {t.fileUrl && (
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-500">
                        <Paperclip size={12} /> 1 File
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelected(t)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                  >
                    Manage Ticket <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {selected && (
          <TicketModal
            ticket={selected}
            onClose={() => setSelected(null)}
            refresh={loadTickets}
          />
        )}
      </main>
    </div>
  );
}

/* =========================
   MODAL (Conversation Style)
========================= */
function TicketModal({ ticket, onClose, refresh }) {
  const [note, setNote] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState(ticket.status);
  const [updating, setUpdating] = useState(false);

  const update = async () => {
    try {
      setUpdating(true);
      await api.patch(`/admin/ticket/${ticket._id}`, {
        status,
        note,
        reply,
      });
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
        
        {/* MODAL HEADER */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner"><MessageSquare size={24} /></div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">{ticket.subject}</h2>
              <div className="flex items-center gap-3 mt-1.5 opacity-90">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Ref: {ticket._id.slice(-8).toUpperCase()}</p>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <p className="text-[10px] font-black uppercase tracking-widest">User: {ticket.userId?.name || "Unknown"}</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-all font-black">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: CONTEXT & LOGS */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Status Manager */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Status Control</h4>
                <div className="flex flex-col gap-2">
                   {["OPEN", "IN_PROGRESS", "NEEDS_INFO", "RESOLVED"].map((s) => (
                     <button 
                      key={s} 
                      onClick={() => setStatus(s)}
                      className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 flex items-center justify-center ${
                        status === s 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                        : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50'
                      }`}
                     >
                       {s.replace("_", " ")}
                     </button>
                   ))}
                </div>
              </div>

              {/* Original Problem */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle size={12}/> Original Complaint</h4>
                 <p className="text-sm text-slate-700 font-medium leading-relaxed italic border-l-2 border-indigo-200 pl-3">"{ticket.problem}"</p>
                 {ticket.fileUrl && (
                   <div className="mt-4 pt-4 border-t border-slate-100">
                     <a href={`http://localhost:5000/${ticket.fileUrl.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 p-3 rounded-xl justify-center border border-indigo-100">
                        <ImageIcon size={14} /> View Attached Evidence
                     </a>
                   </div>
                 )}
              </div>

              {/* Internal Admin Logs */}
              {ticket.adminNotes?.length > 0 && (
                <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-100 shadow-inner">
                   <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2"><Lock size={12}/> Internal Admin Logs</h4>
                   <div className="space-y-4 max-h-48 overflow-y-auto no-scrollbar pr-2">
                     {ticket.adminNotes.map((note, idx) => (
                       <div key={idx} className="text-[11px] font-bold text-slate-700 leading-relaxed">
                         <span className="block text-[9px] text-amber-500 uppercase tracking-widest mb-0.5">{new Date(note.addedAt).toLocaleString()}</span>
                         {note.text}
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: CHAT & RESPONSES */}
            <div className="lg:col-span-2 flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Chat History */}
              <div className="flex-1 p-6 overflow-y-auto no-scrollbar bg-slate-50/30 space-y-6 min-h-[300px]">
                {ticket.replies?.length > 0 ? (
                  ticket.replies.map((r, i) => (
                    <div key={i} className={`flex flex-col ${r.from === 'ADMIN' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-4 rounded-2xl max-w-[85%] border ${
                        r.from === 'ADMIN' 
                          ? 'bg-indigo-600 text-white border-indigo-700 rounded-br-sm shadow-md' 
                          : 'bg-white text-slate-800 border-slate-200 rounded-bl-sm shadow-sm'
                      }`}>
                        <p className="text-sm font-medium leading-relaxed">{r.message}</p>
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1 mx-1">
                        {r.from === 'ADMIN' ? <CheckCircle2 size={10} /> : <User size={10} />}
                        {r.from} • {new Date(r.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-50">
                     <MessageCircle size={40} className="text-slate-300 mb-3" />
                     <p className="text-xs font-black uppercase tracking-widest text-slate-400">No replies yet</p>
                  </div>
                )}
              </div>

              {/* Action Form */}
              <div className="p-6 bg-white border-t border-slate-100">
                <div className="space-y-4">
                  {/* Internal Note Input */}
                  <div>
                    <label className="text-[9px] font-black text-amber-600 uppercase ml-2 tracking-widest flex items-center gap-1.5 mb-1.5">
                      <Lock size={10} /> Add Private Admin Note (Hidden from user)
                    </label>
                    <input
                      type="text"
                      placeholder="E.g., Waiting on finance team approval..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full border border-amber-200 bg-amber-50/30 focus:border-amber-500 focus:bg-white px-4 py-3 rounded-xl outline-none text-xs font-bold transition-all placeholder:font-medium placeholder:text-slate-400"
                    />
                  </div>

                  {/* Public Reply Input */}
                  <div>
                    <label className="text-[9px] font-black text-indigo-600 uppercase ml-2 tracking-widest flex items-center gap-1.5 mb-1.5">
                      <MessageCircle size={10} /> Reply to User
                    </label>
                    <textarea
                      placeholder="Type your official response here..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="w-full border border-indigo-100 bg-indigo-50/10 focus:border-indigo-500 focus:bg-white p-4 rounded-xl outline-none text-sm font-medium h-24 transition-all resize-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* MODAL ACTIONS */}
        <div className="p-6 bg-white border-t border-slate-100 flex justify-end gap-3 rounded-b-[3rem] shrink-0">
          <button onClick={onClose} className="px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all">Discard</button>
          <button
            onClick={update}
            disabled={updating || (!note && !reply && status === ticket.status)}
            className="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {updating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={14} />}
            {updating ? "Committing..." : "Finalize & Send"}
          </button>
        </div>
      </div>
    </div>
  );
}