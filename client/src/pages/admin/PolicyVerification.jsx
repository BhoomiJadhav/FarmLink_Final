// pages/admin/PolicyVerification.jsx
import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

export default function PolicyVerification() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    const res = await api.get("/admin/users");
    setFarmers(res.data.farmers);
  };

  const verify = async (id, status) => {
    await api.patch(`/admin/farmers/${id}/verify-policy`, {
      status,
      remarks: "Checked by admin",
    });

    fetchFarmers();
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Policy Verification</h2>

        {farmers.map((f) => (
          <div key={f.user._id} className="bg-white p-4 mb-3 rounded shadow">
            <p>{f.user.name}</p>

            <button
              onClick={() => verify(f.user._id, "APPROVED")}
              className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => verify(f.user._id, "REJECTED")}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
