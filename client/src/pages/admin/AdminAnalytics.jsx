import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminAnalytics() {
  const [data, setData] = useState({});
  const [range, setRange] = useState("7d");

  useEffect(() => {
    fetchData();
  }, [range]);

  const fetchData = async () => {
    const res = await api.get(`/admin/analytics?range=${range}`);
    setData(res.data);
  };

  const Stat = ({ title, value, growth }) => (
    <div className="bg-white p-5 rounded-xl shadow border">
      <p className="text-xs text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-[#064e3b]">{value}</h2>
      <p
        className={`text-xs ${growth > 0 ? "text-green-500" : "text-red-500"}`}
      >
        {growth > 0 ? "↑" : "↓"} {growth}%
      </p>
    </div>
  );

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen space-y-6">
        <h1 className="text-3xl font-bold text-[#064e3b]">
          Analytics Overview
        </h1>

        {/* FILTER */}
        <div className="flex gap-3">
          {["7d", "30d"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded ${
                range === r ? "bg-emerald-600 text-white" : "bg-white border"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4">
          <Stat
            title="Revenue"
            value={`₹${data.totalRevenue || 0}`}
            growth={data.revenueGrowth || 0}
          />
          <Stat
            title="Contracts"
            value={data.totalContracts || 0}
            growth={data.contractGrowth || 0}
          />
          <Stat
            title="Approval Rate"
            value={`${data.approvalRate || 0}%`}
            growth={0}
          />
        </div>

        {/* INSIGHTS */}
        <div className="bg-gradient-to-r from-[#064e3b] to-[#047857] text-white p-6 rounded-xl">
          <h2 className="font-bold mb-2">AI Insights</h2>
          {data.insights?.map((i, idx) => (
            <p key={idx} className="text-sm">
              • {i}
            </p>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-3">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.revenueData}>
                <XAxis dataKey="date" />
                <Tooltip />
                <Line dataKey="revenue" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-3">Farmer Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.farmerData}>
                <XAxis dataKey="date" />
                <Tooltip />
                <Line dataKey="count" stroke="#6366f1" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 rounded-xl shadow col-span-2">
            <h3 className="font-bold mb-3">Policy Status</h3>
            <PieChart width={400} height={250}>
              <Pie
                data={data.policyStats || []}
                dataKey="value"
                outerRadius={100}
              >
                {["#10b981", "#ef4444", "#f59e0b"].map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
