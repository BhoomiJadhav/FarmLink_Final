import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import {
  FileText,
  Loader2,
  ShoppingBag,
  Clock,
  CheckCircle2,
  MessageSquare,
  Users,
  Wheat,
  TrendingUp,
  BarChart3,
  ChevronRight,
  User,
  Phone,
  Mail,
} from "lucide-react";
import FarmerList from "./FarmerList";
import api from "../../api/axios";

import BuyerSidebar from "../../components/BuyerSidebar";
import Topbar from "../../components/topNav";
import ProfileModal from "../../components/ProfileModal";

/* -------------------------------------------------------------------------- */
/* AppLayout: High-Contrast Branding                                          */
/* -------------------------------------------------------------------------- */

function AppLayout({ children }) {
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/profile/me");
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      <BuyerSidebar
        onLogout={handleLogout}
        onSupportClick={() => setShowSupport(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          profileData={profileData}
          notifications={[]}
          onSearch={() => {}}
          onOpenProfile={() => setShowProfileModal(true)}
          onLogout={handleLogout}
        />

        <div className="p-8 overflow-y-auto no-scrollbar">{children}</div>
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />
      {showSupport && (
        <BuyerSupportModal onClose={() => setShowSupport(false)} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard View: Bold & Readable                                           */
/* -------------------------------------------------------------------------- */

function DashboardPage() {
  const [stats, setStats] = useState({
    totalContracts: 0,
    pendingRequests: 0,
    completedDeals: 0,
    activeNegotiations: 0,
    avgWheatPrice: "₹0/Q",
    totalFarmers: 0,
    activeListings: 0,
    monthVolume: "0 Q",
  });
  const [recent, setRecent] = useState([]);
  const [topFarmers, setTopFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [statsRes, recentRes, farmersRes] = await Promise.all([
          api.get("/buyer/dashboard-stats"),
          api.get("/buyer/contracts/recent"),
          api.get("/buyer/top-farmers"),
        ]);

        setStats(statsRes.data.stats || statsRes.data);
        setRecent(recentRes.data.contracts || recentRes.data || []);
        setTopFarmers(farmersRes.data.farmers || farmersRes.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
        <p className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
          Syncing Intelligence...
        </p>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Buyer Dashboard
        </h1>
        <p className="text-slate-600 font-bold text-sm uppercase tracking-widest mt-1">
          Procurement & Market Snapshot
        </p>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LargeStatCard
          label="Total Contracts"
          value={stats.totalContracts}
          trend="+15%"
          icon={<FileText size={22} />}
          color="blue"
        />
        <LargeStatCard
          label="Pending Requests"
          value={stats.pendingRequests}
          trend="Action Required"
          negative
          icon={<Clock size={22} />}
          color="amber"
        />
        <LargeStatCard
          label="Completed Deals"
          value={stats.completedDeals}
          trend="+25%"
          positive
          icon={<CheckCircle2 size={22} />}
          color="emerald"
        />
        <LargeStatCard
          label="Active Chats"
          value={stats.activeNegotiations}
          trend="Live"
          icon={<MessageSquare size={22} />}
          color="indigo"
        />
      </div>

      {/* MAIN DATA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: RECENT PURCHASES */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm flex items-center gap-2">
              <ShoppingBag size={18} className="text-emerald-600" /> Recent
              Purchases
            </h3>
            <button className="text-xs font-black uppercase text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all border border-emerald-100">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recent.length > 0 ? (
              recent.map((r) => (
                <div
                  key={r._id || r.id}
                  className="flex items-center justify-between bg-slate-50/50 p-6 rounded-2xl border border-transparent hover:border-emerald-300 hover:bg-white transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 font-black text-xl shadow-sm">
                      {(r.cropDetails?.cropName || r.crop || "C")[0]}
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-lg">
                        {r.cropDetails?.cropName || r.crop}
                      </div>
                      <div className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mt-1">
                        <User size={12} className="text-slate-400" />{" "}
                        {r.farmer?.name || r.farmer}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block text-right px-6">
                    <div className="font-black text-slate-900 text-lg">
                      ₹{r.pricing?.totalPrice || r.price || 0}
                    </div>
                    <div className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">
                      {r.cropDetails?.quantity || r.qtyLabel} Units
                    </div>
                  </div>

                  <StatusBadge status={r.contractStatus || r.status} />
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-[2rem]">
                <p className="text-slate-500 text-sm font-black uppercase tracking-widest">
                  No Recent Procurement Data
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: TOP FARMERS */}
        <aside className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
              Top Farmers
            </h3>
            <button className="text-xs font-black uppercase text-emerald-600 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-5">
            {topFarmers.length > 0 ? (
              topFarmers.map((f) => (
                <div
                  key={f._id || f.id}
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-emerald-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                      {(f.name || "F")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">
                        {f.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                        {f.state || "India"}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-600">
                      {f.rating || "4.5"} ★
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-black">
                      {f.deals || f.contractsCount || 0} deals
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-slate-400 text-xs font-black uppercase italic tracking-widest">
                Refreshing Network...
              </p>
            )}
          </div>
        </aside>
      </div>

      {/* MARKET INSIGHTS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10">
        <InsightCard
          title="Avg. Wheat"
          value={stats.avgWheatPrice}
          trend="+2.5%"
          icon={<TrendingUp size={20} />}
        />
        <InsightCard
          title="Total Farmers"
          value={stats.totalFarmers}
          trend="+12%"
          icon={<Users size={20} />}
        />
        <InsightCard
          title="Listings"
          value={stats.activeListings}
          trend="+8%"
          icon={<Wheat size={20} />}
        />
        <InsightCard
          title="Volume"
          value={stats.monthVolume}
          trend="+18%"
          icon={<BarChart3 size={20} />}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponents: Visual Refinements                                          */
/* -------------------------------------------------------------------------- */

function LargeStatCard({ label, value, trend, negative, icon, color }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
      <div>
        <p className="text-xs font-black text-slate-600 uppercase tracking-[0.15em] mb-2">
          {label}
        </p>
        <p className="text-4xl font-black text-slate-900 leading-none">
          {value}
        </p>
        {trend && (
          <p
            className={`text-[11px] font-black mt-4 px-3 py-1 rounded-lg w-fit shadow-sm ${negative ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}
          >
            {trend}
          </p>
        )}
      </div>
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${colors[color] || "bg-slate-100 text-slate-600"}`}
      >
        {icon}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    "in-transit": "bg-blue-100 text-blue-700 border-blue-200",
    ACTIVE: "bg-blue-100 text-blue-700 border-blue-200",
    processing: "bg-amber-100 text-amber-700 border-amber-200",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  };
  return (
    <div
      className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border shadow-sm ${map[status] || "bg-slate-100 border-slate-200 text-slate-600"}`}
    >
      {status || "UNKNOWN"}
    </div>
  );
}

function InsightCard({ title, value, trend, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-emerald-400 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-emerald-600 bg-emerald-50 p-2 rounded-lg">
          {icon}
        </div>
        <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
          {title}
        </p>
      </div>
      <p className="text-2xl font-black text-slate-900 leading-tight">
        {value}
      </p>
      <p className="text-[11px] font-black text-emerald-600 mt-2 uppercase flex items-center gap-1">
        <TrendingUp size={12} /> {trend}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Support Modal & Contracts View                                            */
/* -------------------------------------------------------------------------- */

function BuyerSupportModal({ onClose }) {
  const [form, setForm] = useState({ subject: "", problem: "", file: null });

  const submitTicket = async () => {
    try {
      const formData = new FormData();
      formData.append("subject", form.subject);
      formData.append("problem", form.problem);
      if (form.file) formData.append("file", form.file);
      await api.post("/buyer/support", formData);
      alert("Request submitted ✅");
      onClose();
    } catch (err) {
      alert("Failed to submit request ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[999] p-4">
      <div className="bg-white w-full max-w-[500px] rounded-[2.5rem] p-12 shadow-2xl animate-in zoom-in duration-200">
        <h2 className="text-3xl font-black text-slate-900 mb-2">
          Platform Support
        </h2>
        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-10 border-b border-slate-100 pb-4">
          Direct line to procurement assistance
        </p>

        <div className="space-y-4">
          <input
            placeholder="Inquiry Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full border-2 border-slate-100 p-5 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all bg-slate-50/50"
          />
          <textarea
            placeholder="Explain the technical or trade issue..."
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
            className="w-full border-2 border-slate-100 p-5 rounded-2xl text-sm font-bold h-36 outline-none focus:border-emerald-500 transition-all bg-slate-50/50 resize-none"
          />
          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
            />
            <label
              htmlFor="file"
              className="text-xs font-black uppercase text-emerald-600 cursor-pointer hover:underline"
            >
              Attach Procurement Documents
            </label>
            {form.file && (
              <p className="text-[10px] font-bold text-slate-500 mt-2 italic">
                {form.file.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-black uppercase text-slate-500 hover:text-slate-900"
          >
            Discard
          </button>
          <button
            onClick={submitTicket}
            className="px-10 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
          >
            Submit Case
          </button>
        </div>
      </div>
    </div>
  );
}

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get("/buyer/contracts");
        setContracts(res.data.contracts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-40">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Active Contracts
        </h2>
        <Link
          to="/buyer/contract"
          className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-emerald-600 transition-all"
        >
          <FileText size={16} /> Draft Agreement
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
          <FileText size={64} className="mx-auto text-slate-200 mb-6" />
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">
            No active trade contracts
          </h3>
          <Link
            to="/buyer/contract"
            className="text-xs font-black text-emerald-600 mt-6 inline-block hover:underline uppercase tracking-[0.2em]"
          >
            Initialize your first contract
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contracts.map((c) => (
            <div
              key={c._id}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase border border-emerald-100">
                  {c.contractStatus || c.status}
                </span>
                <p className="text-xs font-bold text-slate-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                {c.contractTitle || "Supply Agreement"}
              </h3>
              <div className="flex items-center gap-6 text-sm font-black text-slate-700 bg-slate-50 p-5 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Wheat size={16} className="text-emerald-600" />{" "}
                  {c.cropDetails?.cropName}
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div>{c.cropDetails?.quantity} Quintals</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BuyerDashboard() {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="farmers"
        element={
          <AppLayout>
            <FarmerList />
          </AppLayout>
        }
      />
      <Route
        path="contracts"
        element={
          <AppLayout>
            <ContractsPage />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default BuyerDashboard;
