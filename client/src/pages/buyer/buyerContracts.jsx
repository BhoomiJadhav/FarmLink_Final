import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerSignatureModal from "../../components/contracts/BuyerSignatureModel.jsx";
import { getBuyerContracts, getContractById } from "../../api/contractApi";

const STATUS_LABEL = {
  DRAFT: "Draft",
  SENT: "Sent to Farmer",
  NEGOTIATING: "Negotiating",
  PENDING_SIGNATURE: "Awaiting Farmer Signature",
  AWAITING_BUYER_SIGNATURE: "Awaiting Your Signature",
  ACTIVE: "Active",
  REJECTED: "Rejected",
};

export default function BuyerContracts() {
  const [activeTab, setActiveTab] = useState("ONGOING");
  const [selectedContract, setSelectedContract] = useState(null);

  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const res = await getBuyerContracts();
        setContracts(res);
      } catch (err) {
        console.error(err);
        alert("Failed to load contracts");
      } finally {
        setLoading(false);
      }
    };
    loadContracts();
  }, []);
  const handleEdit = (contract) => {
    if (contract.contractType === "CULTIVATION") {
      navigate(
        `/buyer/cultivation-contract/${contract.farmer.farmerId}?contractId=${contract._id}`,
      );
    }

    if (contract.contractType === "HARVEST") {
      navigate(`/buyer/harvest-contracts/${contract._id}`);
    }
  };

  const ongoingContracts = contracts.filter((c) =>
    ["DRAFT", "SENT", "NEGOTIATING"].includes(c.status),
  );
  const signRequiredContracts = contracts.filter((c) =>
    ["PENDING_SIGNATURE", "AWAITING_BUYER_SIGNATURE"].includes(c.status),
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading buyer contracts...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Contracts</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("ONGOING")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeTab === "ONGOING"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Ongoing / Draft
        </button>

        <button
          onClick={() => setActiveTab("ACCEPTED")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeTab === "ACCEPTED"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Accepted (Sign Required)
        </button>
      </div>

      {activeTab === "ONGOING" && (
        <>
          {ongoingContracts.length === 0 ? (
            <p className="text-gray-500">No draft or ongoing contracts.</p>
          ) : (
            <div className="grid gap-4">
              {ongoingContracts.map((contract) => (
                <div
                  key={contract._id}
                  className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {contract.cropDetails?.cropName || "Contract"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Farmer: {contract.farmer?.name}
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span className="font-medium">
                        {STATUS_LABEL[contract.status]}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(contract)}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>

                    {contract.status !== "DRAFT" &&
                      contract.status === "NEGOTIATING" && (
                        <button
                          onClick={() => navigate("/buyer/negotiations")}
                          className="px-4 py-2 bg-indigo-600 text-white rounded"
                        >
                          Open Negotiation
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "ACCEPTED" && (
        <>
          {signRequiredContracts.length === 0 ? (
            <p className="text-gray-500">
              No accepted contracts pending signature.
            </p>
          ) : (
            <div className="grid gap-4">
              {signRequiredContracts.map((contract) => (
                <div
                  key={contract._id}
                  className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {contract.cropDetails?.cropName || "Contract"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Farmer: {contract.farmer?.name}
                    </p>
                    <p className="text-sm font-medium text-emerald-600">
                      Accepted by Farmer
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedContract(contract)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded"
                  >
                    Sign Contract
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {selectedContract && (
        <BuyerSignatureModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
          onSuccess={async (contractId) => {
            // 1️⃣ Remove signed contract from My Contracts list
            setContracts((prev) => prev.filter((c) => c._id !== contractId));

            // 2️⃣ Close modal
            setSelectedContract(null);

            // fetch updated contract BEFORE navigating
            const updated = await getContractById(contractId);

            navigate(`/cultivation/contract-tracking/${contractId}`, {
              state: { contract: updated.contract },
            });
          }}
        />
      )}
    </div>
  );
}
