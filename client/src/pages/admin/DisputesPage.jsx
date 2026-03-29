import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

export default function DisputesPage() {
  const [disputes, setDisputes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
      const res = await api.get("/admin/disputes");
      setDisputes(res.data.disputes);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Resolve / Reject with message
  const resolveDispute = async (id, status) => {
    let message = "";

    if (status === "REJECTED") {
      message = prompt("Enter rejection reason:");
      if (!message) return;
    }

    if (status === "RESOLVED") {
      message = prompt("Enter resolution note:");
      if (!message) return;
    }

    try {
      await api.patch(`/admin/disputes/${id}/resolve`, {
        status,
        response: message,
      });

      fetchDisputes();
    } catch (err) {
      console.error(err);
    }
  };

  // ❄️ Freeze contract
  const freezeContract = async (contractId) => {
    const reason = prompt("Enter reason to freeze contract:");
    if (!reason) return;

    try {
      await api.patch(`/admin/contracts/${contractId}/freeze`, {
        reason,
      });

      alert("Contract frozen successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dispute Management</h1>

        <div className="space-y-5">
          {disputes.map((d) => {
            const isClosed = d.status === "RESOLVED" || d.status === "REJECTED";

            return (
              <div
                key={d._id}
                className="bg-white rounded-xl shadow p-5 space-y-3 hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">{d.category}</h2>

                  <span
                    className={`text-xs px-3 py-1 rounded ${
                      d.status === "OPEN"
                        ? "bg-yellow-100 text-yellow-700"
                        : d.status === "RESOLVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm">{d.description}</p>

                {/* Requested Resolution */}
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {d.requestedResolution}
                </span>

                {/* Contract Info */}
                <div className="bg-gray-50 p-3 rounded text-xs space-y-1">
                  <p>
                    <b>Farmer:</b> {d.contractId?.farmer?.name || "N/A"}
                  </p>
                  <p>
                    <b>Buyer:</b> {d.contractId?.buyer?.name || "N/A"}
                  </p>
                  <p>
                    <b>Contract Status:</b>{" "}
                    {d.contractId?.contractStatus || "N/A"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => setSelected(d)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    View
                  </button>

                  <button
                    disabled={isClosed}
                    onClick={() => resolveDispute(d._id, "RESOLVED")}
                    className={`px-3 py-1 rounded text-white ${
                      isClosed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Resolve
                  </button>

                  <button
                    disabled={isClosed}
                    onClick={() => resolveDispute(d._id, "REJECTED")}
                    className={`px-3 py-1 rounded text-white ${
                      isClosed
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => freezeContract(d.contractId._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Freeze
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🔍 Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[450px] shadow-xl">
              <h2 className="text-xl font-bold mb-4">Dispute Details</h2>

              <p>
                <b>Category:</b> {selected.category}
              </p>
              <p>
                <b>Description:</b> {selected.description}
              </p>
              <p>
                <b>Requested:</b> {selected.requestedResolution}
              </p>

              <p className="mt-2">
                <b>Status:</b> {selected.status}
              </p>

              <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
                <p>
                  <b>Farmer:</b> {selected.contractId?.farmer?.name}
                </p>
                <p>
                  <b>Buyer:</b> {selected.contractId?.buyer?.name}
                </p>
              </div>

              {selected.adminResponse && (
                <div className="mt-3 bg-green-50 p-2 rounded text-sm">
                  <b>Admin Note:</b> {selected.adminResponse}
                </div>
              )}

              <button
                onClick={() => setSelected(null)}
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
