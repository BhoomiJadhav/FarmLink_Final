import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

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

  // 🔍 Filter + Search Logic
  const filterUsers = (users) => {
    return users.filter((u) => {
      const matchesSearch =
        u.user.name.toLowerCase().includes(search.toLowerCase()) ||
        u.user.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "all" || u.user.status === filter;

      return matchesSearch && matchesFilter;
    });
  };

  // 🔄 Block / Unblock
  const toggleBlock = async (user) => {
    try {
      const action = user.status === "blocked" ? "unblock" : "block";

      await api.patch(`/admin/users/${user._id}/${action}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // 👤 Render User Cards
  const renderUsers = (users) =>
    filterUsers(users).map((u) => (
      <div
        key={u.user._id}
        className="bg-white rounded-xl shadow p-5 flex justify-between items-center hover:shadow-lg transition"
      >
        <div>
          <p className="font-semibold text-lg">{u.user.name}</p>
          <p className="text-gray-500 text-sm">{u.user.email}</p>

          <div className="flex gap-3 mt-2 text-xs">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
              Contracts: {u.contracts || 0}
            </span>

            <span
              className={`px-2 py-1 rounded ${
                u.user.status === "blocked"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {u.user.status || "active"}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedUser(u)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            View
          </button>

          <button
            onClick={() => toggleBlock(u.user)}
            className={`px-3 py-1 rounded text-white ${
              u.user.status === "blocked"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {u.user.status === "blocked" ? "Unblock" : "Block"}
          </button>
        </div>
      </div>
    ));

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 w-full rounded border"
        />

        {/* 🎯 Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-6 p-2 rounded border"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("farmers")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "farmers" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            Farmers ({farmers.length})
          </button>

          <button
            onClick={() => setActiveTab("buyers")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "buyers" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            Buyers ({buyers.length})
          </button>
        </div>

        {/* User List */}
        <div className="space-y-4">
          {activeTab === "farmers" ? renderUsers(farmers) : renderUsers(buyers)}
        </div>

        {/* 👁️ User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">
              <h2 className="text-xl font-bold mb-4">User Details</h2>

              <p>
                <b>Name:</b> {selectedUser.user.name}
              </p>
              <p>
                <b>Email:</b> {selectedUser.user.email}
              </p>
              <p>
                <b>Status:</b> {selectedUser.user.status}
              </p>
              <p>
                <b>Contracts:</b> {selectedUser.contracts || 0}
              </p>

              {selectedUser.profile && (
                <>
                  <p className="mt-3 font-semibold">Profile Info:</p>

                  <p>
                    Location:{" "}
                    {selectedUser.profile?.farm?.farmLocation ||
                      selectedUser.profile?.address ||
                      "N/A"}
                  </p>

                  <p>
                    Phone:{" "}
                    {selectedUser.profile?.personal?.phone ||
                      selectedUser.profile?.phone ||
                      "N/A"}
                  </p>
                </>
              )}

              <button
                onClick={() => setSelectedUser(null)}
                className="mt-5 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
