import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import {
  FileText,
  MessageSquare,
  CheckCircle2,
  Timer,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Landmark,
} from "lucide-react";

import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import { useNavigate } from "react-router-dom";

/* ---------- COMPACT STAT CARD ---------- */
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group overflow-hidden relative transition-all duration-300 hover:shadow-md">
      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-20 bg-emerald-50 rounded-full opacity-40 blur-xl pointer-events-none group-hover:scale-125 transition-transform"></div>
      <div className="relative z-10">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
          {title}
        </p>
        <h2 className="text-2xl font-black text-[#064e3b]">{value}</h2>
      </div>
      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
        <Icon size={20} strokeWidth={2.5} />
      </div>
    </div>
  );
}

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [stats, setStats] = useState({
    totalContracts: 0,
    pendingRequests: 0,
    acceptedDeals: 0,
    activeNegotiations: 0,
  });
  const [marketTrends, setMarketTrends] = useState([]);
  const [showSupport, setShowSupport] = useState(false);
  const [resubmitData, setResubmitData] = useState(null);
  const [govtUpdates, setGovtUpdates] = useState([]);
  const getPolicyStatus = (c) => {
    return (
      c.policyVerification?.status ||
      c.insurance?.policyVerification?.status ||
      "PENDING"
    );
  };
  // Repetition for a smoother infinite loop
  const tickerData = useMemo(() => {
    if (!Array.isArray(marketTrends) || marketTrends.length === 0) return [];
    return [...marketTrends, ...marketTrends, ...marketTrends, ...marketTrends];
  }, [marketTrends]);

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
  useEffect(() => {
    async function loadUpdates() {
      const res = await api.get("/farmer/govt-updates");
      setGovtUpdates(res.data.updates);
    }

    loadUpdates();
  }, []);
  const submitResubmission = async (form) => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key] ?? "");
      });

      await api.patch(
        `/farmer/resubmit-policy/${resubmitData.contractId}`,
        formData,
      );

      setResubmitData(null);

      // reload data
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    async function loadMarket() {
      try {
        const res = await api.get("/market");
        const data = res.data?.prices || res.data?.data || res.data || [];
        if (Array.isArray(data) && data.length) {
          setMarketTrends(data);
        } else {
          throw new Error("No data");
        }
      } catch (err) {
        const fallback = [
          { name: "Wheat", price: "₹2200", changePercent: 2.1 },
          { name: "Rice", price: "₹3500", changePercent: -1.2 },
          { name: "Cotton", price: "₹6800", changePercent: 3.5 },
        ];
        setMarketTrends(fallback);
      }
    }
    loadMarket();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-[#f4f6f8] font-sans text-slate-800 overflow-hidden">
      <div className="h-full flex-shrink-0 z-30 shadow-2xl bg-white">
        <Sidebar
          onLogout={logout}
          onSupportClick={() => setShowSupport(true)}
        />
      </div>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="space-y-4 max-w-7xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
          {/* TOPBAR - FLUSH (No margin) */}
          <div className="flex-shrink-0 w-full">
            <Topbar
              profileData={profileData}
              onOpenProfile={() => setShowProfileModal(true)}
              onLogout={logout}
            />
          </div>

          <div className="px-4 md:px-6 space-y-4 overflow-hidden flex flex-col flex-1">
            {/* HEADER */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl mt-4 font-bold text-[#064e3b] font-serif tracking-tight leading-none">
                Welcome back, {profileData?.user?.name || "Farmer"}
              </h1>
              <p className="text-[14px] text-slate-500 mt-2 font-medium">
                Here is an overview of your contracts and farm operations today.
                🌱
              </p>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-10 mr-8 ml-8 flex-shrink-0">
              <StatCard
                title="Total Contracts"
                value={stats.totalContracts}
                icon={FileText}
              />
              <StatCard
                title="Pending"
                value={stats.pendingRequests}
                icon={Timer}
              />
              <StatCard
                title="Active Deals"
                value={stats.acceptedDeals}
                icon={CheckCircle2}
              />
              <StatCard
                title="Negotiations"
                value={stats.activeNegotiations}
                icon={MessageSquare}
              />
            </div>
            {contracts.some((c) => getPolicyStatus(c) === "REJECTED") && (
              <div className="mx-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-red-700 font-bold text-sm">
                    ⚠️ Policy Rejected
                  </h3>
                  <p className="text-xs text-red-600">
                    Your insurance policy was rejected. Please re-submit.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const rejected = contracts.find(
                      (c) => getPolicyStatus(c) === "REJECTED",
                    );
                    setResubmitData(rejected);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Re-submit Policy
                </button>
              </div>
            )}

            {/* MAIN 3-COLUMN GRID - TIGHTENED HEIGHT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-shrink-0 min-h-0 pb-2">
              <div className="bg-white py-4 px-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                <h2 className="text-xl font-bold text-[#064e3b] mb-3 font-serif flex items-center gap-2">
                  <div className="p-1 bg-blue-50 text-blue-600 rounded">
                    <Landmark size={14} />
                  </div>
                  Govt. Schemes
                </h2>
                <div className="space-y-2 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                  {govtUpdates.map((u) => (
                    <div
                      key={u._id}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white transition-all cursor-pointer"
                    >
                      <h3 className="text-sm font-bold text-slate-800">
                        {u.title}
                      </h3>

                      <p className="text-xs text-slate-500">{u.description}</p>

                      <span
                        className={`text-[10px] font-bold ${
                          u.type === "ALERT"
                            ? "text-red-500"
                            : u.type === "DEADLINE"
                              ? "text-orange-500"
                              : "text-emerald-600"
                        }`}
                      >
                        {u.type}
                      </span>

                      {u.link && (
                        <a
                          href={u.link}
                          target="_blank"
                          className="block text-xs text-blue-500 mt-1"
                        >
                          View Details →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                {/* <button className="w-full mt-2 py-1.5 text-[10px] font-bold text-[#064e3b] hover:bg-emerald-50 rounded-lg transition-colors border border-slate-100 flex items-center justify-center gap-1.5">
                  Browse All <ArrowRight size={10} />
                </button> */}
              </div>

              <div className="bg-white py-4 px-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                <h2 className="text-xl font-bold text-[#064e3b] mb-3 flex items-center gap-2 font-serif">
                  <div className="p-1 bg-yellow-100 rounded text-yellow-600">
                    <Sparkles size={14} />
                  </div>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <ActionBtn
                    onClick={() => navigate("/farmer/harvest-crop")}
                    icon="🌾"
                    label="Harvest"
                    col="emerald"
                  />
                  <ActionBtn
                    onClick={() => navigate("/farmer/contracts")}
                    icon="📄"
                    label="Contracts"
                    col="blue"
                  />
                  <ActionBtn
                    onClick={() => navigate("/farmer/harvest-contracts")}
                    icon="📍"
                    label="Track"
                    col="amber"
                  />
                  <ActionBtn
                    onClick={() => navigate("/farmer/negotiations")}
                    icon="💬"
                    label="Negotiate"
                    col="purple"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#064e3b] to-[#047857] py-4 px-5 rounded-2xl shadow-lg text-white relative overflow-hidden flex flex-col justify-center border border-white/10">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
                <h2 className="font-bold text-lg mb-3 font-serif flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg text-sm">📈</div>{" "}
                  Insights
                </h2>
                <ul className="text-sm text-emerald-50 space-y-3 font-medium relative z-10">
                  <InsightItem
                    text={`${stats.acceptedDeals} active contracts operating.`}
                  />
                  <InsightItem
                    text={`${stats.pendingRequests} requests awaiting response.`}
                  />
                  <InsightItem
                    text={`Primary crop: ${contracts[0]?.cropName || "N/A"}`}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* MARKET TICKER - SLOWED DOWN */}
        <div className="h-10 bg-[#064e3b] border-t border-[#047857] flex items-center flex-shrink-0 z-40 overflow-hidden">
          <div className="px-3 h-full flex items-center bg-[#022c22] border-r border-[#047857] z-20">
            <span className="text-[10px] font-black text-white tracking-widest uppercase">
              Market
            </span>
          </div>
          <div className="flex-1 relative h-full flex items-center overflow-hidden">
            <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pl-4">
              {tickerData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-[11px]"
                >
                  <span className="font-bold text-white">
                    {item.crop || item.name}
                  </span>
                  <span className="font-mono text-emerald-100">
                    {item.price}
                  </span>
                  <span
                    className={`px-1 rounded font-bold ${item.changePercent > 0 ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}
                  >
                    {item.changePercent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {resubmitData && (
          <ResubmitModal
            data={resubmitData}
            onClose={() => setResubmitData(null)}
            onSubmit={submitResubmission}
          />
        )}
        {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 180s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
}

/* ---------- HELPERS ---------- */
function ActionBtn({ onClick, icon, label, col }) {
  const themes = {
    emerald: "border-emerald-100 bg-emerald-50/30 text-emerald-900",
    blue: "border-blue-100 bg-blue-50/30 text-blue-900",
    amber: "border-amber-100 bg-amber-50/30 text-amber-900",
    purple: "border-purple-100 bg-purple-50/30 text-purple-900",
  };
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center border ${themes[col]} rounded-xl hover:shadow-md transition-all duration-200 group p-4`}
    >
      <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span className="text-[13px] font-bold uppercase tracking-tight">
        {label}
      </span>
    </button>
  );
}

const SchemeItem = ({ title, desc }) => (
  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white transition-all cursor-pointer">
    <h3 className="text-[13px] pb-1 font-bold text-slate-800">{title}</h3>
    <p className="text-[12px] text-slate-500 leading-tight">{desc}</p>
  </div>
);

const InsightItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <span className="w-2 h-2 rounded-full bg-emerald-300 mt-1.5 shrink-0"></span>
    {text}
  </li>
);
function ResubmitModal({ data, onClose, onSubmit }) {
  const [form, setForm] = useState({
    providerName: data?.insurance?.providerName || "",
    policyNumber: data?.insurance?.policyNumber || "",
    policyValidTill: data?.insurance?.policyValidTill
      ? new Date(data.insurance.policyValidTill).toISOString().slice(0, 10)
      : "",
    flood: data?.insurance?.riskManagement?.flood || "",
    drought: data?.insurance?.riskManagement?.drought || "",
    file: null,
  });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-[#064e3b]">
          Re-submit Policy
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Provider Name"
            value={form.providerName}
            onChange={(e) => setForm({ ...form, providerName: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Policy Number"
            value={form.policyNumber}
            onChange={(e) => setForm({ ...form, policyNumber: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            value={form.policyValidTill}
            onChange={(e) =>
              setForm({ ...form, policyValidTill: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
function SupportModal({ onClose }) {
  const [form, setForm] = useState({
    subject: "",
    problem: "",
    file: null,
  });

  const submitTicket = async () => {
    try {
      const formData = new FormData();

      formData.append("subject", form.subject);
      formData.append("problem", form.problem);
      if (form.file) formData.append("file", form.file);

      await api.post("/farmer/support", formData);

      alert("Request submitted ✅");
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-[#064e3b] mb-4">Contact Admin</h2>

        {/* FORM */}
        <div className="space-y-3">
          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Describe your issue..."
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
            className="w-full border p-2 rounded h-24"
          />

          <input
            type="file"
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          />
        </div>

        {/* CONTACT INFO */}
        <div className="mt-4 text-sm text-gray-600 border-t pt-3">
          <p>📧 support@farmlink.com</p>
          <p>📞 +91 9876543210</p>
        </div>

        {/* FAQ */}
        <div className="mt-4">
          <h3 className="font-semibold text-sm mb-2">Common Questions</h3>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Why was my policy rejected?</li>
            <li>• How to resubmit policy?</li>
            <li>• Payment not received?</li>
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={submitTicket}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
