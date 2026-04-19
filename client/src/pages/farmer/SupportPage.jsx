// import { useEffect, useState, useRef } from "react";
// import api from "../../api/axios";

// /* ─────────────────────────────────────────
//    STATUS BADGE
// ───────────────────────────────────────── */
// const StatusBadge = ({ status }) => {
//   const map = {
//     OPEN: "bg-emerald-100 text-emerald-700 border-emerald-200",
//     CLOSED: "bg-gray-100 text-gray-500 border-gray-200",
//     PENDING: "bg-amber-100 text-amber-700 border-amber-200",
//     RESOLVED: "bg-blue-100 text-blue-700 border-blue-200",
//   };
//   return (
//     <span
//       className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
//         map[status] || map.OPEN
//       }`}
//     >
//       {status}
//     </span>
//   );
// };

// /* ─────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────── */
// export default function SupportPage() {
//   const [tickets, setTickets] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const fetchTickets = async () => {
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

//   const handleSelect = (t) => {
//     setSelected(t);
//   };

//   return (
//     <div className="flex h-screen bg-[#faf8f4] font-sans">
//       {/* ── LEFT PANEL ── */}
//       <div className="w-[320px] shrink-0 flex flex-col bg-white border-r border-gray-100 shadow-sm">
//         {/* Panel header */}
//         <div className="bg-gradient-to-r from-[#1a3c2e] to-[#2d6a4f] px-5 py-4">
//           <h2 className="text-white font-bold text-base">Support Tickets</h2>
//           <p className="text-emerald-200 text-xs mt-0.5">Your help requests</p>
//         </div>

//         {/* Ticket list */}
//         <div className="flex-1 overflow-y-auto">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//               <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
//               <p className="text-sm">Loading tickets…</p>
//             </div>
//           ) : tickets.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//               <span className="text-4xl mb-3">🎫</span>
//               <p className="text-sm">No tickets yet</p>
//             </div>
//           ) : (
//             tickets.map((t) => {
//               const unread = (t.replies || []).filter(
//                 (r) => !r.seen && r.from === "ADMIN",
//               ).length;
//               const isActive = selected?._id === t._id;

//               return (
//                 <div
//                   key={t._id}
//                   onClick={() => handleSelect(t)}
//                   className={`relative px-4 py-3.5 border-b border-gray-50 cursor-pointer transition-all ${
//                     isActive
//                       ? "bg-emerald-50 border-l-4 border-l-[#1a3c2e]"
//                       : "hover:bg-gray-50 border-l-4 border-l-transparent"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start gap-2">
//                     <h3
//                       className={`text-[13px] font-semibold leading-tight line-clamp-1 ${
//                         isActive ? "text-[#1a3c2e]" : "text-slate-800"
//                       }`}
//                     >
//                       {t.subject}
//                     </h3>
//                     {unread > 0 && (
//                       <span className="shrink-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                         {unread}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 mt-1.5">
//                     <StatusBadge status={t.status} />
//                   </div>

//                   <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-1">
//                     {t.problem}
//                   </p>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {/* ── RIGHT PANEL ── */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {selected ? (
//           <TicketChat ticket={selected} refresh={fetchTickets} />
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
//             <span className="text-5xl">💬</span>
//             <p className="text-sm font-medium">
//               Select a ticket to view the conversation
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    CHAT COMPONENT
// ───────────────────────────────────────── */
// function TicketChat({ ticket, refresh }) {
//   const [reply, setReply] = useState("");
//   const [sending, setSending] = useState(false);
//   const bottomRef = useRef(null);

//   // Mark seen
//   useEffect(() => {
//     if (ticket?._id) {
//       api.patch(`/admin/ticket/mark-seen/${ticket._id}`);
//     }
//   }, [ticket]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [ticket?.replies]);

//   const sendReply = async () => {
//     if (!reply.trim()) return;
//     try {
//       setSending(true);
//       await api.post(`/admin/ticket/user-reply/${ticket._id}`, {
//         message: reply,
//       });
//       setReply("");
//       await refresh();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send");
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendReply();
//     }
//   };

//   const waitingOnUser = ticket.waitingOn === "USER";

//   return (
//     <>
//       {/* Chat header */}
//       <div className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="font-bold text-slate-900 text-[15px]">
//               {ticket.subject}
//             </h2>
//             <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2">
//               <StatusBadge status={ticket.status} />
//               <span>
//                 {waitingOnUser
//                   ? "⏳ Waiting for your reply"
//                   : "⏳ Waiting for admin"}
//               </span>
//             </p>
//           </div>
//           {/* Ticket ID */}
//           <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-lg font-mono">
//             #{ticket._id?.slice(-6).toUpperCase()}
//           </span>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3 bg-[#faf8f4]">
//         {/* Original problem */}
//         {ticket.problem && (
//           <div className="flex justify-end">
//             <div className="max-w-sm">
//               <p className="text-[10px] text-gray-400 mb-1 text-right">
//                 You • Original message
//               </p>
//               <div className="bg-[#1a3c2e] text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
//                 {ticket.problem}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Replies */}
//         {ticket.replies?.length > 0 ? (
//           ticket.replies.map((r, i) => {
//             const isUser = r.from === "USER";
//             return (
//               <div
//                 key={i}
//                 className={`flex ${isUser ? "justify-end" : "justify-start"}`}
//               >
//                 <div className="max-w-sm">
//                   {!isUser && (
//                     <div className="flex items-center gap-1.5 mb-1">
//                       <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-[9px] font-bold">
//                         A
//                       </div>
//                       <span className="text-[10px] text-gray-400">Admin</span>
//                     </div>
//                   )}

//                   <div
//                     className={`text-sm px-4 py-3 rounded-2xl shadow-sm ${
//                       isUser
//                         ? "bg-[#1a3c2e] text-white rounded-tr-sm"
//                         : "bg-white border border-gray-100 text-slate-800 rounded-tl-sm"
//                     }`}
//                   >
//                     {r.message}
//                     <div
//                       className={`text-[9px] mt-1.5 flex items-center gap-1 ${
//                         isUser
//                           ? "text-emerald-200 justify-end"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {r.seen ? "✓✓ Seen" : "✓ Delivered"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="flex flex-col items-center justify-center py-12 text-gray-400">
//             <span className="text-3xl mb-2">💬</span>
//             <p className="text-sm">No replies yet</p>
//           </div>
//         )}

//         <div ref={bottomRef} />
//       </div>

//       {/* Attachments */}
//       {ticket.files?.length > 0 && (
//         <div className="px-5 py-2.5 border-t border-gray-100 bg-white flex flex-wrap gap-2">
//           {ticket.files.map((f, i) => (
//             <a
//               key={i}
//               href={`http://localhost:5000/${f.replace(/\\/g, "/")}`}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
//             >
//               📎 Attachment {i + 1}
//             </a>
//           ))}
//         </div>
//       )}

//       {/* Input */}
//       <div className="px-5 py-4 border-t border-gray-100 bg-white">
//         <div className="flex items-center gap-3">
//           <input
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your reply… (Enter to send)"
//             className="flex-1 bg-[#faf8f4] border border-gray-200 text-sm text-slate-800 placeholder-gray-400 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
//           />
//           <button
//             onClick={sendReply}
//             disabled={sending || !reply.trim()}
//             className="bg-[#1a3c2e] hover:bg-[#14301f] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
//           >
//             {sending ? (
//               <>
//                 <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Sending
//               </>
//             ) : (
//               <>Send ➤</>
//             )}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState, useRef } from "react";
import { Plus, X, Paperclip, Send, ChevronRight } from "lucide-react";
import api from "../../api/axios";
import Topbar from "../../components/topNav";
import Sidebar from "../../components/Sidebar";
import SupportModal from "../../components/SupportModel";
/* ─────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    OPEN: "bg-emerald-100 text-emerald-700 border-emerald-200",
    CLOSED: "bg-gray-100 text-gray-500 border-gray-200",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    RESOLVED: "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span
      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
        map[status] || map.OPEN
      }`}
    >
      {status}
    </span>
  );
};

/* ─────────────────────────────────────────
   CONTACT ADMIN MODAL
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   TICKET CHAT
───────────────────────────────────────── */
function TicketChat({ ticket, refresh }) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (ticket?._id) api.patch(`/admin/ticket/mark-seen/${ticket._id}`);
  }, [ticket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.replies]);

  const sendReply = async () => {
    if (!reply.trim()) return;
    try {
      setSending(true);
      await api.post(`/admin/ticket/user-reply/${ticket._id}`, {
        message: reply,
      });
      setReply("");
      await refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to send");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-900 text-[15px]">
              {ticket.subject}
            </h2>
            <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
              <StatusBadge status={ticket.status} />
              {ticket.category && (
                <span className="text-gray-400">{ticket.category}</span>
              )}
              <span>
                {ticket.waitingOn === "ADMIN"
                  ? "⏳ Waiting for admin"
                  : "⏳ Waiting for your reply"}
              </span>
            </p>
          </div>
          <span className="shrink-0 text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-lg font-mono">
            #{ticket._id?.slice(-6).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3 bg-[#faf8f4]">
        {/* Original problem bubble */}
        {ticket.problem && (
          <div className="flex justify-end">
            <div className="max-w-sm">
              <p className="text-[10px] text-gray-400 mb-1 text-right">
                You • Original message
              </p>
              <div className="bg-[#1a3c2e] text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
                {ticket.problem}
              </div>
            </div>
          </div>
        )}

        {ticket.replies?.length > 0 ? (
          ticket.replies.map((r, i) => {
            const isUser = r.from === "USER";
            return (
              <div
                key={i}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-sm">
                  {!isUser && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-[9px] font-bold">
                        A
                      </div>
                      <span className="text-[10px] text-gray-400">Admin</span>
                    </div>
                  )}
                  <div
                    className={`text-sm px-4 py-3 rounded-2xl shadow-sm ${
                      isUser
                        ? "bg-[#1a3c2e] text-white rounded-tr-sm"
                        : "bg-white border border-gray-100 text-slate-800 rounded-tl-sm"
                    }`}
                  >
                    {r.message}
                    <div
                      className={`text-[9px] mt-1.5 ${
                        isUser ? "text-emerald-200 text-right" : "text-gray-400"
                      }`}
                    >
                      {r.seen ? "✓✓ Seen" : "✓ Delivered"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <span className="text-3xl mb-2">💬</span>
            <p className="text-sm">No replies yet. Admin will respond soon.</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* File attachments */}
      {ticket.files?.length > 0 && (
        <div className="px-5 py-2.5 border-t border-gray-100 bg-white flex flex-wrap gap-2">
          {ticket.files.map((f, i) => (
            <a
              key={i}
              href={`http://localhost:5000/${f.replace(/\\/g, "/")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Paperclip size={12} /> Attachment {i + 1}
            </a>
          ))}
        </div>
      )}

      {/* Reply input */}
      <div className="px-5 py-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your reply… (Enter to send)"
            className="flex-1 bg-[#faf8f4] border border-gray-200 text-sm text-slate-800 placeholder-gray-400 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
          />
          <button
            onClick={sendReply}
            disabled={sending || !reply.trim()}
            className="bg-[#1a3c2e] hover:bg-[#14301f] disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
          >
            {sending ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={14} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/ticket/my");
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#faf8f4]">
      {/* Sidebar — pass onSupportClick as no-op since we're already on support page */}
      <Sidebar onSupportClick={() => {}} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Body: ticket list + chat */}
        <div className="flex-1 flex overflow-hidden">
          {/* ── LEFT: Ticket list ── */}
          <div className="w-[290px] shrink-0 flex flex-col bg-white border-r border-gray-100 shadow-sm">
            {/* Panel header */}
            <div className="bg-gradient-to-r from-[#1a3c2e] to-[#2d6a4f] px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-sm">My Tickets</h2>
                <p className="text-emerald-200 text-[10px] mt-0.5">
                  {tickets.length} request{tickets.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* + Contact Admin button */}
              <button
                onClick={() => setShowModal(true)}
                title="Contact Admin"
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/30 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20 transition-colors"
              >
                <Plus size={13} /> New
              </button>
            </div>

            {/* Ticket items */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <div className="w-7 h-7 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-xs">Loading…</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400 px-6 text-center">
                  <span className="text-4xl mb-3">🎫</span>
                  <p className="text-sm font-medium text-gray-600">
                    No tickets yet
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Tap <strong>+ New</strong> above to reach admin
                  </p>
                </div>
              ) : (
                tickets.map((t) => {
                  const unread = (t.replies || []).filter(
                    (r) => !r.seen && r.from === "ADMIN",
                  ).length;
                  const isActive = selected?._id === t._id;

                  return (
                    <div
                      key={t._id}
                      onClick={() => setSelected(t)}
                      className={`relative px-4 py-3.5 border-b border-gray-50 cursor-pointer transition-all ${
                        isActive
                          ? "bg-emerald-50 border-l-4 border-l-[#1a3c2e]"
                          : "hover:bg-gray-50 border-l-4 border-l-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h3
                          className={`text-[13px] font-semibold leading-tight line-clamp-1 ${
                            isActive ? "text-[#1a3c2e]" : "text-slate-800"
                          }`}
                        >
                          {t.subject}
                        </h3>
                        {unread > 0 && (
                          <span className="shrink-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {unread}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1.5">
                        <StatusBadge status={t.status} />
                        {t.category && (
                          <span className="text-[10px] text-gray-400 truncate">
                            {t.category}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-1">
                        {t.problem}
                      </p>

                      {isActive && (
                        <ChevronRight
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── RIGHT: Chat ── */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {selected ? (
              <TicketChat ticket={selected} refresh={fetchTickets} />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl">
                  💬
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-600">
                    Select a ticket to view the conversation
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    or{" "}
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-emerald-600 font-semibold hover:underline"
                    >
                      create a new ticket
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Admin Modal */}
      {showModal && <SupportModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
