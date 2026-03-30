import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Activity,
  CheckCircle,
} from "lucide-react";

/* =========================
   STAT CARD
========================= */
function StatCard({ title, value, icon: IconComponent }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow border flex justify-between items-center hover:shadow-md transition">
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase">{title}</p>
        <h2 className="text-2xl font-black text-[#064e3b]">{value}</h2>
      </div>
      <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
        <IconComponent size={22} />
      </div>
    </div>
  );
}

/* =========================
   MAIN
========================= */
export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState([]);
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
      setActivities(res.data.activities || []);
      setGrowth(res.data.growth || {});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f7f9]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-black text-[#064e3b] mb-6">
          Admin Dashboard
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Govt Update
        </button>

        {/* ================= KPI ================= */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatCard title="Farmers" value={stats.farmers || 0} icon={Users} />
          <StatCard title="Buyers" value={stats.buyers || 0} icon={Users} />
          <StatCard
            title="Active Contracts"
            value={stats.contracts || 0}
            icon={FileText}
          />
          <StatCard
            title="Open Disputes"
            value={stats.disputes || 0}
            icon={AlertTriangle}
          />
        </div>

        {/* ================= ALERTS ================= */}
        <div className="bg-white p-6 rounded-2xl shadow border mb-6">
          <h2 className="text-lg font-bold mb-3 text-red-600 flex items-center gap-2">
            <AlertTriangle size={18} /> Action Required
          </h2>

          {alerts.length === 0 ? (
            <p className="text-gray-400 text-sm">No urgent issues</p>
          ) : (
            <ul className="space-y-2">
              {alerts.map((a, i) => (
                <li
                  key={i}
                  className="text-sm bg-red-50 p-3 rounded-lg flex justify-between"
                >
                  <span>{a.message}</span>
                  <span className="text-xs text-gray-500">{a.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-3 gap-6">
          {/* 📈 GROWTH */}
          <div className="bg-white p-5 rounded-2xl shadow border">
            <h2 className="font-bold text-[#064e3b] mb-3 flex items-center gap-2">
              <TrendingUp size={16} /> Growth Snapshot
            </h2>

            <div className="space-y-2 text-sm">
              <p>👨‍🌾 +{growth.newFarmers || 0} Farmers this week</p>
              <p>📄 +{growth.newContracts || 0} Contracts</p>
              <p>📈 {growth.engagement || 0}% Engagement</p>
            </div>
          </div>

          {/* 📊 CONTRACT STATUS */}
          <div className="bg-white p-5 rounded-2xl shadow border">
            <h2 className="font-bold text-[#064e3b] mb-3">
              Contract Distribution
            </h2>

            <div className="space-y-2 text-sm">
              <p>Active: {stats.active || 0}</p>
              <p>Completed: {stats.completed || 0}</p>
              <p>Cancelled: {stats.cancelled || 0}</p>
            </div>

            {/* simple bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded overflow-hidden flex">
              <div
                className="bg-green-500"
                style={{ width: `${stats.active || 0}%` }}
              />
              <div
                className="bg-blue-500"
                style={{ width: `${stats.completed || 0}%` }}
              />
              <div
                className="bg-red-500"
                style={{ width: `${stats.cancelled || 0}%` }}
              />
            </div>
          </div>

          {/* ⚡ QUICK ACTIONS */}
          <div className="bg-white p-5 rounded-2xl shadow border">
            <h2 className="font-bold text-[#064e3b] mb-3">Quick Actions</h2>

            <div className="space-y-2">
              <button className="w-full bg-emerald-50 hover:bg-emerald-100 p-2 rounded text-sm">
                Verify Policies
              </button>
              <button className="w-full bg-blue-50 hover:bg-blue-100 p-2 rounded text-sm">
                View Support Tickets
              </button>
              <button className="w-full bg-yellow-50 hover:bg-yellow-100 p-2 rounded text-sm">
                Manage Users
              </button>
            </div>
          </div>
        </div>

        {/* ================= ACTIVITY ================= */}
        <div className="bg-white p-6 rounded-2xl shadow border mt-6">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-[#064e3b]">
            <Activity size={18} /> Recent Activity
          </h2>

          {activities.length === 0 ? (
            <p className="text-gray-400 text-sm">No recent activity</p>
          ) : (
            <ul className="space-y-2">
              {activities.map((a, i) => (
                <li
                  key={i}
                  className="text-sm flex justify-between border-b pb-2"
                >
                  <span>{a.message}</span>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-red-500"
              >
                ✕
              </button>

              <AddGovtUpdate />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function AddGovtUpdate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "SCHEME",
    link: "",
  });

  const submit = async () => {
    try {
      if (!form.title || !form.description) {
        alert("Title and Description are required");
        return;
      }

      console.log("SENDING:", form);

      await api.post("/admin/govt-update", form);

      alert("Update posted!");

      window.location.reload(); // refresh dashboard
    } catch (err) {
      console.error("ERROR:", err);
      alert(err.response?.data?.message || "Failed to post update");
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow w-[400px]">
      <h2 className="font-bold mb-3">Post Govt Update</h2>

      <input
        placeholder="Title"
        className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full border p-2 mb-2"
      >
        <option value="SCHEME">Scheme</option>
        <option value="ALERT">Alert</option>
        <option value="DEADLINE">Deadline</option>
      </select>

      <input
        placeholder="Optional Link"
        className="w-full border p-2 mb-3"
        onChange={(e) => setForm({ ...form, link: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        Publish
      </button>
    </div>
  );
}
