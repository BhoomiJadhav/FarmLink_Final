// pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCard from "../../components/admin/StatCard";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    farmers: 0,
    buyers: 0,
    disputes: 0,
    contracts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard-stats");

      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-4 gap-6">
          <StatCard title="Total Farmers" value={stats.farmers} />
          <StatCard title="Total Buyers" value={stats.buyers} />
          <StatCard title="Active Contracts" value={stats.contracts} />
          <StatCard title="Open Disputes" value={stats.disputes} />
        </div>
      </div>
    </div>
  );
}
