import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";
import {
  Users,
  Search,
  UserCheck,
  UserX,
  FileText,
  Eye,
  ShieldAlert,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
  ChevronRight,
  BadgeCheck,
  Award,
  AlertOctagon,
  Fingerprint,
} from "lucide-react";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("farmers");
  const [farmers, setFarmers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setFarmers(res.data.farmers);
      setBuyers(res.data.buyers);
    } catch (err) {
      console.error(err);
    }
  };

  const filterUsers = (users) => {
    return users.filter((u) => {
      const matchesSearch =
        u.user.name.toLowerCase().includes(search.toLowerCase()) ||
        u.user.email.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || u.user.status === filter;
      return matchesSearch && matchesFilter;
    });
  };

  const toggleBlock = async (user) => {
    try {
      const action = user.status === "blocked" ? "unblock" : "block";
      await api.patch(`/admin/users/${user._id}/${action}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const renderUsers = (users) => {
    const list = filterUsers(users);
    return list.map((u) => (
      <div
        key={u.user._id}
        className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col md:flex-row justify-between items-center hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group"
      >
        {/* USER IDENTIFICATION & RISK */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div
            className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg ${u.user.status === "blocked" ? "bg-slate-100 text-slate-400" : "bg-indigo-600 text-white"}`}
          >
            {u.user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
              {u.user.name}
            </p>
            <p className="text-slate-400 font-bold text-[11px] uppercase truncate">
              {u.user.email}
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  u.riskLevel === "High"
                    ? "bg-rose-500 animate-pulse"
                    : u.riskLevel === "Medium"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                Security Risk:{" "}
                <span
                  className={
                    u.riskLevel === "High"
                      ? "text-rose-600"
                      : u.riskLevel === "Medium"
                        ? "text-amber-600"
                        : "text-emerald-600"
                  }
                >
                  {u.riskLevel || "Low"}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* METRICS & BADGES (NEW REAL DATA) */}
        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0 w-full md:w-auto justify-start md:justify-end">
          {/* Contracts Counter */}
          <span className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hidden lg:flex">
            <FileText size={12} /> {u.contracts || 0} Contracts
          </span>

          {/* Karma / Trust Badge */}
          <span
            className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
              u.karma >= 80
                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                : u.karma >= 40
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            <Award size={12} /> Karma: {u.karma || 50}
          </span>

          {/* KYC Verification Badge */}
          <span
            className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
              u.verification === "verified"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : u.verification === "partial"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-slate-50 text-slate-500 border-slate-200"
            }`}
          >
            {u.verification === "verified" ? (
              <BadgeCheck size={12} />
            ) : (
              <Fingerprint size={12} />
            )}
            {u.verification || "Unverified"}
          </span>

          {/* Account Status */}
          <span
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${u.user.status === "blocked" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}
          >
            {u.user.status === "blocked" ? (
              <ShieldAlert size={12} />
            ) : (
              <UserCheck size={12} />
            )}
            {u.user.status || "active"}
          </span>

          {/* ACTIONS */}
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => setSelectedUser(u)}
              className="bg-slate-100 text-slate-600 p-2.5 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all"
              title="View Profile"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => toggleBlock(u.user)}
              className={`p-2.5 rounded-xl text-white shadow-md transition-all ${u.user.status === "blocked" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-500 hover:bg-rose-600"}`}
              title={
                u.user.status === "blocked" ? "Unblock User" : "Block User"
              }
            >
              {u.user.status === "blocked" ? (
                <UserCheck size={16} />
              ) : (
                <UserX size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">
              User Management
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest italic">
              Directory of Platform Entities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 w-full sm:w-64 transition-all shadow-sm"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-[1.5rem] w-fit">
          <button
            onClick={() => setActiveTab("farmers")}
            className={`px-8 py-3 rounded-[1.2rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === "farmers" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-500 hover:text-slate-700"}`}
          >
            Farmers ({farmers.length})
          </button>
          <button
            onClick={() => setActiveTab("buyers")}
            className={`px-8 py-3 rounded-[1.2rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === "buyers" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-500 hover:text-slate-700"}`}
          >
            Buyers ({buyers.length})
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4 pb-24">
          {activeTab === "farmers" ? renderUsers(farmers) : renderUsers(buyers)}
          {activeTab === "farmers" && farmers.length === 0 && (
            <p className="text-center text-slate-400 italic py-10">
              No farmers found.
            </p>
          )}
          {activeTab === "buyers" && buyers.length === 0 && (
            <p className="text-center text-slate-400 italic py-10">
              No buyers found.
            </p>
          )}
        </div>

        {/* MODAL DOSSIER */}
        {selectedUser && (
          <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-8 bg-indigo-600 text-white flex flex-col items-center relative">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-6 left-6 hover:bg-white/20 p-2 rounded-full transition-all"
                >
                  ✕
                </button>

                <div
                  className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-inner ${
                    selectedUser.riskLevel === "High"
                      ? "bg-rose-500/80 border-rose-400 text-white"
                      : selectedUser.riskLevel === "Medium"
                        ? "bg-amber-500/80 border-amber-400 text-white"
                        : "bg-emerald-500/80 border-emerald-400 text-white"
                  }`}
                >
                  {selectedUser.riskLevel || "Low"} Risk
                </div>

                <div className="h-20 w-20 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black mb-4 mt-2 shadow-lg">
                  {selectedUser.user.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-black tracking-tight">
                  {selectedUser.user.name}
                </h2>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
                    {activeTab.slice(0, -1)}
                  </span>
                  <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Award size={12} /> Karma: {selectedUser.karma || 50}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <ModalItem
                    icon={Mail}
                    label="Email Address"
                    value={selectedUser.user.email}
                  />
                  <ModalItem
                    icon={ShieldAlert}
                    label="Account Status"
                    value={selectedUser.user.status || "Active"}
                  />
                  <ModalItem
                    icon={Fingerprint}
                    label="KYC Verification"
                    value={(
                      selectedUser.verification || "Unverified"
                    ).toUpperCase()}
                  />
                  <ModalItem
                    icon={FileText}
                    label="Total Contracts Executed"
                    value={selectedUser.contracts || 0}
                  />

                  {selectedUser.profile && (
                    <>
                      <div className="h-px bg-slate-100 my-4"></div>
                      <ModalItem
                        icon={MapPin}
                        label="Registered Location"
                        value={
                          selectedUser.profile?.farm?.farmLocation ||
                          selectedUser.profile?.address ||
                          "Location pending verification"
                        }
                      />
                      <ModalItem
                        icon={Phone}
                        label="Contact Number"
                        value={
                          selectedUser.profile?.personal?.phone ||
                          selectedUser.profile?.phone ||
                          "Number pending"
                        }
                      />
                    </>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => toggleBlock(selectedUser.user)}
                    className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-md ${selectedUser.user.status === "blocked" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-rose-100 text-rose-700 hover:bg-rose-200"}`}
                  >
                    {selectedUser.user.status === "blocked"
                      ? "Restore Access"
                      : "Revoke Access"}
                  </button>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ModalItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-slate-50 text-indigo-500 rounded-xl group-hover:bg-indigo-50 transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
