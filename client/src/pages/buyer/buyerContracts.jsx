import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerSignatureModal from "../../components/contracts/BuyerSignatureModel.jsx";
import { getBuyerContracts, getContractById } from "../../api/contractApi";
import BuyerSidebar from "../../components/BuyerSidebar";
import Topbar from "../../components/topNav";
import ProfileModal from "../../components/ProfileModal";

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
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getContractById;
      } catch (err) {
        console.error(err);
      }

      try {
        const res = await fetch("/api/profile/me");
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

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
    <div className="flex h-screen bg-[#f4f6f8] overflow-hidden">
      {/* SIDEBAR */}
      <BuyerSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOPBAR */}
        <Topbar
          profileData={profileData}
          onOpenProfile={() => setShowProfileModal(true)}
          onLogout={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        />

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#064e3b]">My Contracts</h1>
            <p className="text-slate-500 text-sm">
              Manage your cultivation agreements and signatures
            </p>
          </div>

          {/* TABS */}
          <div className="flex gap-3 mb-6">
            {["ONGOING", "ACCEPTED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-white border border-slate-200 text-slate-500"
                }`}
              >
                {tab === "ONGOING"
                  ? "Ongoing / Draft"
                  : "Accepted (Sign Required)"}
              </button>
            ))}
          </div>

          {/* CONTRACT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(activeTab === "ONGOING"
              ? ongoingContracts
              : signRequiredContracts
            ).map((contract) => (
              <div
                key={contract._id}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition group flex flex-col"
              >
                {/* STATUS BADGE */}
                <span className="self-start text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 mb-3">
                  {STATUS_LABEL[contract.status]}
                </span>

                {/* TITLE */}
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {contract.cropDetails?.cropName || "Contract"}
                </h3>

                <p className="text-sm text-slate-500 mb-3">
                  Farmer: {contract.farmer?.name}
                </p>

                {/* ACTIONS */}
                <div className="mt-auto flex gap-2">
                  {activeTab === "ONGOING" && (
                    <>
                      <button
                        onClick={() => handleEdit(contract)}
                        className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition"
                      >
                        Edit
                      </button>

                      {contract.status === "NEGOTIATING" && (
                        <button
                          onClick={() => navigate("/buyer/negotiations")}
                          className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
                        >
                          Negotiate
                        </button>
                      )}
                    </>
                  )}

                  {activeTab === "ACCEPTED" && (
                    <button
                      onClick={() => setSelectedContract(contract)}
                      className="w-full py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                    >
                      Sign Contract
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROFILE MODAL */}
      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />
      {selectedContract && (
        <BuyerSignatureModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
          onSuccess={async (contractId) => {
            // remove from list
            setContracts((prev) => prev.filter((c) => c._id !== contractId));

            // close modal
            setSelectedContract(null);

            // navigate to tracking
            const updated = await getContractById(contractId);

            navigate(`/contracts/${contractId}`, {
              state: { contract: updated.contract },
            });
          }}
        />
      )}
    </div>
  );
}
