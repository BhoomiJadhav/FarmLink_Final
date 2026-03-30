import { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/admin/AdminSidebar";

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
      const res = await api.get("/admin/tickets");
      setTickets(res.data.tickets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets =
    filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-black text-[#064e3b] mb-4">
          Support Requests
        </h1>

        {/* FILTER */}
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="ALL">All</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="NEEDS_INFO">Needs Info</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <p className="text-gray-500">No support requests found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTickets.map((t) => (
              <div
                key={t._id}
                className={`p-4 rounded-xl shadow border transition ${
                  t.priority === "HIGH"
                    ? "bg-red-50 border-red-300"
                    : "bg-white"
                }`}
              >
                {/* SUBJECT */}
                <h3 className="font-bold text-lg">{t.subject}</h3>

                {/* USER */}
                <p className="text-xs text-gray-400">
                  {t.userId?.name} • {t.userId?.email}
                </p>

                {/* PROBLEM */}
                <p className="text-sm text-gray-600 mt-1">{t.problem}</p>

                {/* STATUS */}
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded font-bold ${
                      t.status === "OPEN"
                        ? "bg-yellow-100 text-yellow-700"
                        : t.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-700"
                          : t.status === "RESOLVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.status}
                  </span>

                  {/* PRIORITY */}
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {t.priority}
                  </span>
                </div>

                {/* ACTION */}
                <button
                  onClick={() => setSelected(t)}
                  className="mt-3 text-sm text-emerald-600 font-semibold"
                >
                  View Details →
                </button>
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
   MODAL
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
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white w-[650px] p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <h2 className="font-bold text-lg mb-2">{ticket.subject}</h2>
        <p className="text-sm text-gray-600">{ticket.problem}</p>

        {/* FILE */}
        {ticket.fileUrl && (
          <img
            src={`http://localhost:5000/${ticket.fileUrl}`}
            className="mt-3 rounded-lg"
          />
        )}

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-4 border p-2 w-full rounded"
        >
          <option>OPEN</option>
          <option>IN_PROGRESS</option>
          <option>NEEDS_INFO</option>
          <option>RESOLVED</option>
        </select>

        {/* NOTES HISTORY */}
        {ticket.adminNotes?.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm">Admin Notes</h4>
            {ticket.adminNotes.map((n, i) => (
              <p key={i} className="text-xs text-gray-500">
                • {n.text}
              </p>
            ))}
          </div>
        )}

        {/* CHAT HISTORY */}
        {ticket.replies?.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm">Conversation</h4>
            {ticket.replies.map((r, i) => (
              <p key={i} className="text-xs">
                <b>{r.from}:</b> {r.message}
              </p>
            ))}
          </div>
        )}

        {/* NEW NOTE */}
        <textarea
          placeholder="Add internal note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-4 w-full border p-2 rounded"
        />

        {/* REPLY */}
        <textarea
          placeholder="Reply to farmer..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="mt-3 w-full border p-2 rounded"
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={update}
            disabled={updating}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
