// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import api from "../../api/axios";
// import { format } from "date-fns";

// /* =========================
//    HARVEST CONTRACT CARD
//    ========================= */
// function HarvestContractCard({ contract, onAccept, onReject }) {
//   const postedOn = contract.createdAt
//     ? format(new Date(contract.createdAt), "dd MMM yyyy")
//     : "—";

//   return (
//     <div className="bg-white rounded-2xl border border-[#E1E6D8] p-6 shadow-sm">
//       <div className="flex justify-between gap-6">
//         {/* LEFT */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#1F2933]">
//             {contract.harvestDetails?.cropName}
//           </h3>

//           <p className="text-sm text-gray-600 mt-1">
//             Buyer: <b>{contract.buyer?.name}</b>
//           </p>

//           <p className="text-xs text-gray-500 mt-1">
//             Buyer Address: {contract.buyerLocation || "—"}
//           </p>

//           <div className="mt-3 flex flex-wrap gap-3 text-sm">
//             <span className="bg-[#ECFDF5] text-[#065F46] px-3 py-1 rounded-full">
//               Qty: {contract.harvestDetails?.quantity}{" "}
//               {contract.harvestDetails?.unit}
//             </span>

//             <span className="bg-[#FFF7ED] text-[#92400E] px-3 py-1 rounded-full">
//               Grade: {contract.harvestDetails?.qualityGrade}
//             </span>

//             <span className="bg-[#EFF6FF] text-[#1E40AF] px-3 py-1 rounded-full">
//               ₹{contract.payment?.pricePerUnit} /{" "}
//               {contract.harvestDetails?.unit}
//             </span>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="text-right min-w-[180px]">
//           <div className="text-xs text-gray-500">Delivery</div>
//           <div className="text-sm font-medium">
//             {contract.delivery?.expectedDeliveryDate
//               ? format(
//                   new Date(contract.delivery.expectedDeliveryDate),
//                   "dd MMM yyyy",
//                 )
//               : "—"}
//           </div>

//           <div className="text-xs text-gray-500 mt-2">Location</div>
//           <div className="text-sm">
//             {contract.delivery?.deliveryLocation || "—"}
//           </div>

//           <div className="mt-3 text-xs text-gray-400">Posted on {postedOn}</div>
//         </div>
//       </div>

//       {/* ACTIONS */}
//       {contract.status === "SENT" && (
//         <div className="mt-5 flex gap-3">
//           <button
//             onClick={() => onAccept(contract._id)}
//             className="flex-1 rounded-lg bg-emerald-600 text-white py-2 text-sm font-semibold hover:bg-emerald-700"
//           >
//             Accept Offer
//           </button>

//           <button
//             onClick={() => onReject(contract._id)}
//             className="flex-1 rounded-lg border border-red-300 text-red-600 py-2 text-sm font-semibold hover:bg-red-50"
//           >
//             Reject
//           </button>
//         </div>
//       )}

//       {contract.status !== "SENT" && (
//         <div className="mt-4 text-sm text-gray-500">
//           Status:{" "}
//           <span className="font-semibold text-gray-700">{contract.status}</span>
//         </div>
//       )}
//     </div>
//   );
// }

// /* =========================
//    FARMER HARVEST CONTRACTS PAGE
//    ========================= */
// export default function HarvestContractsPage() {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* =========================
//      FETCH CONTRACTS
//      ========================= */
//   useEffect(() => {
//     let mounted = true;

//     api
//       .get("/harvest-contracts/farmer")
//       .then((res) => {
//         if (mounted) {
//           setContracts(res.data.contracts || []);
//         }
//       })
//       .catch((err) => {
//         console.error(
//           "Failed to load harvest contracts:",
//           err?.response?.data || err.message,
//         );
//       })
//       .finally(() => {
//         if (mounted) setLoading(false);
//       });

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =========================
//      ACTIONS
//      ========================= */
//   const acceptContract = async (id) => {
//     if (!window.confirm("Accept this harvest offer?")) return;

//     await api.post(`/harvest-contracts/accept/${id}`);

//     setContracts((prev) =>
//       prev.map((c) =>
//         c._id === id
//           ? { ...c, status: "ACTIVE" }
//           : { ...c, status: "REJECTED" },
//       ),
//     );
//   };

//   const rejectContract = async (id) => {
//     if (!window.confirm("Reject this harvest offer?")) return;

//     await api.post(`/harvest-contracts/reject/${id}`);

//     setContracts((prev) =>
//       prev.map((c) => (c._id === id ? { ...c, status: "REJECTED" } : c)),
//     );
//   };

//   /* =========================
//      RENDER
//      ========================= */
//   return (
//     <div className="flex min-h-screen bg-[#F5F7F2]">
//       <Sidebar />

//       <main className="flex-1 overflow-y-auto">
//         <Topbar />

//         <section className="px-10 py-6">
//           <h1 className="text-2xl font-semibold text-[#25341F]">
//             Harvest Sale Contracts
//           </h1>
//           <p className="text-sm text-[#7A8A6D] mt-1">
//             Review and respond to buyer offers for harvested crops
//           </p>

//           <div className="mt-6">
//             {loading ? (
//               <p>Loading harvest contracts…</p>
//             ) : contracts.length === 0 ? (
//               <p className="text-gray-500">
//                 No harvest contracts received yet.
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {contracts.map((c) => (
//                   <HarvestContractCard
//                     key={c._id}
//                     contract={c}
//                     onAccept={acceptContract}
//                     onReject={rejectContract}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import api from "../../api/axios";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

/* =========================
   HARVEST CONTRACT CARD
   ========================= */
function HarvestContractCard({ contract, onAccept, onReject }) {
  const { t } = useTranslation();
  const postedOn = contract.createdAt
    ? format(new Date(contract.createdAt), "dd MMM yyyy")
    : "—";

  return (
    <div className="bg-white rounded-2xl border border-[#E1E6D8] p-6 shadow-sm">
      <div className="flex justify-between gap-6">
        {/* LEFT */}
        <div>
          <h3 className="text-lg font-semibold text-[#1F2933]">
            {contract.harvestDetails?.cropName}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {t("buyer")}: <b>{contract.buyer?.name}</b>
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {t("buyerAddress") || "Buyer Address"}:{" "}
            {contract.buyerLocation || "—"}
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <span className="bg-[#ECFDF5] text-[#065F46] px-3 py-1 rounded-full">
              {t("quantity")}: {contract.harvestDetails?.quantity}{" "}
              {contract.harvestDetails?.unit}
            </span>

            <span className="bg-[#FFF7ED] text-[#92400E] px-3 py-1 rounded-full">
              {t("grade") || "Grade"}: {contract.harvestDetails?.qualityGrade}
            </span>

            <span className="bg-[#EFF6FF] text-[#1E40AF] px-3 py-1 rounded-full">
              ₹{contract.payment?.pricePerUnit} /{" "}
              {contract.harvestDetails?.unit}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-right min-w-[180px]">
          <div className="text-xs text-gray-500">
            {t("delivery") || "Delivery"}
          </div>
          <div className="text-sm font-medium">
            {contract.delivery?.expectedDeliveryDate
              ? format(
                  new Date(contract.delivery.expectedDeliveryDate),
                  "dd MMM yyyy",
                )
              : "—"}
          </div>

          <div className="text-xs text-gray-500 mt-2">
            {t("location") || "Location"}
          </div>
          <div className="text-sm">
            {contract.delivery?.deliveryLocation || "—"}
          </div>

          <div className="mt-3 text-xs text-gray-400">
            {t("postedOn") || "Posted on"} {postedOn}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      {contract.status === "SENT" && (
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => onAccept(contract._id)}
            className="flex-1 rounded-lg bg-emerald-600 text-white py-2 text-sm font-semibold hover:bg-emerald-700"
          >
            {t("acceptOffer") || "Accept Offer"}
          </button>

          <button
            onClick={() => onReject(contract._id)}
            className="flex-1 rounded-lg border border-red-300 text-red-600 py-2 text-sm font-semibold hover:bg-red-50"
          >
            {t("reject") || "Reject"}
          </button>
        </div>
      )}

      {contract.status !== "SENT" && (
        <div className="mt-4 text-sm text-gray-500">
          {t("status")}:{" "}
          <span className="font-semibold text-gray-700">{contract.status}</span>
        </div>
      )}
    </div>
  );
}

/* =========================
   FARMER HARVEST CONTRACTS PAGE
   ========================= */
export default function HarvestContractsPage() {
  const { t, i18n } = useTranslation();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/harvest-contracts/farmer")
      .then((res) => {
        if (mounted) {
          setContracts(res.data.contracts || []);
        }
      })
      .catch((err) => {
        console.error(
          "Failed to load harvest contracts:",
          err?.response?.data || err.message,
        );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const acceptContract = async (id) => {
    if (
      !window.confirm(t("confirmAcceptOffer") || "Accept this harvest offer?")
    )
      return;
    await api.post(`/harvest-contracts/accept/${id}`);
    setContracts((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, status: "ACTIVE" }
          : { ...c, status: "REJECTED" },
      ),
    );
  };

  const rejectContract = async (id) => {
    if (
      !window.confirm(t("confirmRejectOffer") || "Reject this harvest offer?")
    )
      return;
    await api.post(`/harvest-contracts/reject/${id}`);
    setContracts((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: "REJECTED" } : c)),
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F2]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Topbar />

        <section className="px-10 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-[#25341F]">
                {t("harvestSaleContracts") || "Harvest Sale Contracts"}
              </h1>
              <p className="text-sm text-[#7A8A6D] mt-1">
                {t("harvestContractsDesc") ||
                  "Review and respond to buyer offers for harvested crops"}
              </p>
            </div>

            {/* Language Switcher */}
            <div className="flex bg-white shadow-sm p-1 rounded-xl border border-[#E1E6D8]">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                  i18n.language === "en"
                    ? "bg-[#064e3b] text-white"
                    : "text-slate-400"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage("hi")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                  i18n.language === "hi"
                    ? "bg-[#064e3b] text-white"
                    : "text-slate-400"
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => i18n.changeLanguage("mar")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                  i18n.language === "mr"
                    ? "bg-[#064e3b] text-white"
                    : "text-slate-400"
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <p>{t("loadingContracts") || "Loading harvest contracts..."}</p>
            ) : contracts.length === 0 ? (
              <p className="text-gray-500">
                {t("noContractsFound") || "No harvest contracts received yet."}
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {contracts.map((c) => (
                  <HarvestContractCard
                    key={c._id}
                    contract={c}
                    onAccept={acceptContract}
                    onReject={rejectContract}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
