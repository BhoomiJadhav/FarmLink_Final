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
  Send,
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

  const filteredTickets =
    filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);

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
              <MessageSquare className="text-indigo-600" size={32} /> Helpdesk
              Control
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">
              Platform Support & Triage
            </p>
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
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
              Syncing Helpdesk Channels...
            </p>
          </div>
        ) : sortedTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 border-dashed">
            <CheckCircle2 size={48} className="text-emerald-300 mb-4" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Inbox Zero. No active support requests.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24">
            {sortedTickets.map((t) => (
              <div
                key={t._id}
                className={`group bg-white rounded-[2.5rem] p-6 md:p-8 border transition-all duration-300 hover:shadow-xl flex flex-col ${
                  t.priority === "HIGH"
                    ? "border-rose-200 bg-rose-50/20 shadow-md hover:border-rose-400"
                    : "border-slate-100 shadow-sm hover:border-indigo-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-4 rounded-2xl shadow-inner ${t.priority === "HIGH" ? "bg-rose-100 text-rose-600" : "bg-indigo-50 text-indigo-600"}`}
                    >
                      {t.priority === "HIGH" ? (
                        <AlertCircle size={24} />
                      ) : (
                        <MessageSquare size={24} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                        {t.subject}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 mt-1.5 bg-slate-100 w-fit px-2 py-1 rounded-md">
                        <User size={10} className="text-slate-400" />{" "}
                        {t.userId?.name || "Unknown User"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-[9px] font-black px-3 py-1.5 rounded-xl border uppercase tracking-widest ${getStatusBadge(t.status)}`}
                    >
                      {t.status.replace("_", " ")}
                    </span>
                    {t.priority === "HIGH" && (
                      <span className="text-[8px] font-black text-white bg-rose-500 px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm animate-pulse">
                        Emergency
                      </span>
                    )}
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
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner">
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                {ticket.subject}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 opacity-90">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Ref: {ticket._id.slice(-8).toUpperCase()}
                </p>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <p className="text-[10px] font-black uppercase tracking-widest">
                  User: {ticket.userId?.name || "Unknown"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-all font-black"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: CONTEXT & LOGS */}
            <div className="lg:col-span-1 space-y-6">
              {/* Status Manager */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  Status Control
                </h4>
                <div className="flex flex-col gap-2">
                  {["OPEN", "IN_PROGRESS", "NEEDS_INFO", "RESOLVED"].map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 flex items-center justify-center ${
                          status === s
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                            : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50"
                        }`}
                      >
                        {s.replace("_", " ")}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Original Problem */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <AlertCircle size={12} /> Original Complaint
                </h4>
                <p className="text-sm text-slate-700 font-medium leading-relaxed italic border-l-2 border-indigo-200 pl-3">
                  "{ticket.problem}"
                </p>
                {ticket.fileUrl && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <a
                      href={`http://localhost:5000/${ticket.fileUrl.replace(/\\/g, "/")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 p-3 rounded-xl justify-center border border-indigo-100"
                    >
                      <ImageIcon size={14} /> View Attached Evidence
                    </a>
                  </div>
                )}
              </div>

              {/* Internal Admin Logs */}
              {ticket.adminNotes?.length > 0 && (
                <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-100 shadow-inner">
                  <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Lock size={12} /> Internal Admin Logs
                  </h4>
                  <div className="space-y-4 max-h-48 overflow-y-auto no-scrollbar pr-2">
                    {ticket.adminNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] font-bold text-slate-700 leading-relaxed"
                      >
                        <span className="block text-[9px] text-amber-500 uppercase tracking-widest mb-0.5">
                          {new Date(note.addedAt).toLocaleString()}
                        </span>
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
                    <div
                      key={i}
                      className={`flex flex-col ${r.from === "ADMIN" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`p-4 rounded-2xl max-w-[85%] border ${
                          r.from === "ADMIN"
                            ? "bg-indigo-600 text-white border-indigo-700 rounded-br-sm shadow-md"
                            : "bg-white text-slate-800 border-slate-200 rounded-bl-sm shadow-sm"
                        }`}
                      >
                        <p className="text-sm font-medium leading-relaxed">
                          {r.message}
                        </p>
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1 mx-1">
                        {r.from === "ADMIN" ? (
                          <CheckCircle2 size={10} />
                        ) : (
                          <User size={10} />
                        )}
                        {r.from} • {new Date(r.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-50">
                    <MessageCircle size={40} className="text-slate-300 mb-3" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      No replies yet
                    </p>
                  </div>
                )}
              </div>

              {/* Action Form */}
              <div className="p-6 bg-white border-t border-slate-100">
                <div className="space-y-4">
                  {/* Internal Note Input */}
                  <div>
                    <label className="text-[9px] font-black text-amber-600 uppercase ml-2 tracking-widest flex items-center gap-1.5 mb-1.5">
                      <Lock size={10} /> Add Private Admin Note (Hidden from
                      user)
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
          <button
            onClick={onClose}
            className="px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all"
          >
            Discard
          </button>
          <button
            onClick={update}
            disabled={updating || (!note && !reply && status === ticket.status)}
            className="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {updating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {updating ? "Committing..." : "Finalize & Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
