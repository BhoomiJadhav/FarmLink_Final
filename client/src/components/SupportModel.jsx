import { useState, useRef } from "react";
import { X, Paperclip, Send } from "lucide-react";
import api from "../api/axios";

/**
 * SupportModal — works for both FARMER and BUYER roles.
 *
 * Props:
 *   onClose  — fn to close the modal
 *   role     — "FARMER" | "BUYER"  (reads from localStorage if omitted)
 */
export default function SupportModal({ onClose, role }) {
  // Auto-detect role from localStorage if not passed as prop
  const resolvedRole = (() => {
    if (role) return role.toUpperCase();
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return (u?.role || u?.user?.role || "FARMER").toUpperCase();
    } catch {
      return "FARMER";
    }
  })();

  const isBuyer = resolvedRole === "BUYER";
  const endpoint = isBuyer ? "/buyer/support" : "/farmer/support";

  const [form, setForm] = useState({ subject: "", problem: "", file: null });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();

  const faqs = isBuyer
    ? [
        "How do I initiate a purchase contract?",
        "Payment not processed for a harvest?",
        "How to raise a contract dispute?",
        "Delivery not scheduled — what to do?",
      ]
    : [
        "Why was my policy rejected?",
        "How do I resubmit a policy?",
        "Payment not received for a contract?",
        "How to update harvest listing details?",
      ];

  const handleSubmit = async () => {
    if (!form.subject.trim() || !form.problem.trim()) {
      setError("Subject and description are required.");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      const fd = new FormData();
      fd.append("subject", form.subject);
      fd.append("problem", form.problem);
      if (form.file) fd.append("file", form.file);
      await api.post(endpoint, fd);
      setSuccess(true);
      setTimeout(onClose, 1800);
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-[480px] rounded-3xl shadow-2xl overflow-hidden">
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-[#1a3c2e] to-[#2d6a4f] px-6 py-5 flex items-start justify-between">
          <div>
            <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-1">
              {isBuyer ? "Buyer Portal" : "Farmer Portal"} · Support
            </p>
            <h2 className="text-white text-xl font-bold leading-tight">
              Contact Admin
            </h2>
            <p className="text-emerald-200 text-xs mt-1">
              {isBuyer
                ? "Direct line to procurement assistance"
                : "We'll get back to you within 24 hours"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors mt-0.5"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-6 space-y-4">
          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                ✅
              </div>
              <p className="text-sm font-bold text-slate-700">
                Request submitted!
              </p>
              <p className="text-xs text-gray-400">Closing…</p>
            </div>
          ) : (
            <>
              {/* Subject */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder={
                    isBuyer
                      ? "e.g. Payment not processed for contract #123"
                      : "e.g. Policy rejected — need clarification"
                  }
                  className="w-full bg-[#faf8f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.problem}
                  onChange={(e) =>
                    setForm({ ...form, problem: e.target.value })
                  }
                  placeholder={
                    isBuyer
                      ? "Explain the trade or technical issue in detail…"
                      : "Describe your issue in detail…"
                  }
                  rows={4}
                  className="w-full bg-[#faf8f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                />
              </div>

              {/* File attach */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                  Attachment{" "}
                  <span className="text-gray-400 font-normal normal-case">
                    (optional)
                  </span>
                </label>
                <div
                  onClick={() => fileRef.current.click()}
                  className="flex items-center gap-3 bg-[#faf8f4] border border-dashed border-gray-300 hover:border-emerald-400 rounded-xl px-4 py-3 cursor-pointer transition-colors group"
                >
                  <Paperclip
                    size={15}
                    className="text-gray-400 group-hover:text-emerald-600 transition-colors"
                  />
                  {form.file ? (
                    <span className="text-[12px] font-semibold text-emerald-700 truncate">
                      {form.file.name}
                    </span>
                  ) : (
                    <span className="text-[12px] text-gray-400 group-hover:text-emerald-700 font-medium transition-colors">
                      {isBuyer
                        ? "Attach procurement documents"
                        : "Attach a file"}
                    </span>
                  )}
                  {form.file && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm({ ...form, file: null });
                      }}
                      className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setForm({ ...form, file: e.target.files[0] })
                  }
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs font-medium">{error}</p>
              )}

              {/* Contact info */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-6 text-[12px] text-gray-500">
                <span>📧 support@farmlink.com</span>
                <span>📞 +91 98765 43210</span>
              </div>

              {/* FAQs */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Common Questions
                </p>
                <ul className="space-y-1.5">
                  {faqs.map((q, i) => (
                    <li
                      key={i}
                      onClick={() => setForm((f) => ({ ...f, subject: q }))}
                      className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-emerald-700 cursor-pointer transition-colors group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        {!success && (
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-[#1a3c2e] hover:bg-[#14301f] disabled:opacity-50 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send size={14} /> Submit Request
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
