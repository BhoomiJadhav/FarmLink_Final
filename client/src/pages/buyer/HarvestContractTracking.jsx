// import React, { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";
// import { Link } from "react-router-dom";
// import {
//   Leaf,
//   Truck,
//   CheckCircle2,
//   IndianRupee,
//   MapPin,
//   User,
// } from "lucide-react";

// export default function HarvestContractTracking() {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   /* ================= FETCH USER ================= */
//   useEffect(() => {
//     api.get("/auth/me").then((res) => setCurrentUser(res.data.user));
//   }, []);

//   /* ================= FETCH CONTRACTS ================= */
//   useEffect(() => {
//     if (!currentUser) return;

//     const endpoint =
//       currentUser.role === "farmer"
//         ? "/harvest-contracts/farmer"
//         : "/harvest-contracts/buyer";

//     api
//       .get(endpoint)
//       .then((res) => {
//         const all = res.data.contracts || [];

//         // ✅ FIX: include PAYMENT_PENDING

//         setContracts(all);
//       })
//       .finally(() => setLoading(false));
//   }, [currentUser]);

//   /* ================= STATS ================= */
//   const stats = useMemo(() => {
//     const activeContracts = contracts.filter((c) =>
//       ["ACTIVE", "PAYMENT_PENDING", "IN_TRANSIT"].includes(c.status)
//     );

//     const completedContracts = contracts.filter(
//       (c) => c.status === "COMPLETED"
//     );

//     const activeValue = activeContracts.reduce(
//       (sum, c) => sum + (c.payment?.amount || 0),
//       0
//     );

//     const completedValue = completedContracts.reduce(
//       (sum, c) => sum + (c.payment?.amount || 0),
//       0
//     );

//     return {
//       activeCount: activeContracts.length,
//       inTransitCount: contracts.filter((c) => c.status === "IN_TRANSIT").length,
//       completedCount: completedContracts.length,

//       activeValue,
//       completedValue,
//       totalValue: activeValue + completedValue,
//     };
//   }, [contracts]);

//   if (loading) return <div className="p-10">Loading…</div>;

//   const isFarmer = currentUser?.role === "farmer";

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-[#1F2933]">
//           {isFarmer
//             ? "Harvest Contracts (Farmer)"
//             : "Harvest Contracts (Buyer)"}
//         </h1>
//         <p className="text-sm text-[#6B7280]">
//           Track payments and deliveries for harvested crops
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatCard title="Active" value={stats.activeCount} icon={<Leaf />} />
//         <StatCard
//           title="In Transit"
//           value={stats.inTransitCount}
//           icon={<Truck />}
//         />
//         <StatCard
//           title="Completed"
//           value={stats.completedCount}
//           icon={<CheckCircle2 />}
//         />
//         <StatCard
//           title="Total Value"
//           value={`₹${stats.totalValue.toLocaleString()}`}
//           icon={<IndianRupee />}
//         />
//       </div>

//       {/* Contracts */}
//       <div className="space-y-5">
//         {contracts.map((c) => {
//           const crop = c.harvestDetails || {};
//           const farmer = c.farmer || {};
//           const buyer = c.buyer || {};
//           const delivery = c.delivery || {};

//           const counterPartyName = isFarmer ? buyer.name : farmer.name;

//           return (
//             <div
//               key={c._id}
//               className="bg-white border border-[#E5E7EB] rounded-2xl p-6"
//             >
//               {/* Top row */}
//               <div className="flex justify-between items-start gap-6">
//                 <div className="flex items-start gap-4">
//                   <div className="h-11 w-11 rounded-xl bg-[#E6F4EA] flex items-center justify-center">
//                     <Leaf className="h-5 w-5 text-[#15803D]" />
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-[#1F2933]">
//                       {crop.cropName}
//                       {crop.variety && (
//                         <span className="text-sm text-[#6B7280]">
//                           {" "}
//                           – {crop.variety}
//                         </span>
//                       )}
//                     </h3>

//                     <p className="text-sm text-[#6B7280]">
//                       {c.contractId} • {crop.quantity} {crop.unit}
//                     </p>

//                     <div className="mt-2 flex items-center gap-4 text-sm text-[#374151]">
//                       <span className="flex items-center gap-1">
//                         <User className="h-4 w-4" />
//                         {counterPartyName}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4" />
//                         {delivery.deliveryLocation || "—"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-xs text-[#6B7280]">Total Value</div>
//                   <div className="text-lg font-semibold text-[#1F2933]">
//                     ₹{c.payment?.amount?.toLocaleString()}
//                   </div>

//                   <StatusBadge status={c.status} />
//                 </div>
//               </div>

//               {/* Info row */}
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <InfoBox
//                   label="Payment"
//                   value={
//                     c.payment?.status === "VERIFIED"
//                       ? "Verified"
//                       : ["MARKED", "PAID"].includes(c.payment?.status)
//                       ? "Pending Verification"
//                       : "Pending"
//                   }
//                   highlight={c.payment?.status === "VERIFIED"}
//                 />

//                 <InfoBox
//                   label="Payment Mode"
//                   value={
//                     c.payment?.mode === "BEFORE_DELIVERY"
//                       ? "Before Delivery"
//                       : "On Delivery"
//                   }
//                 />

//                 <InfoBox
//                   label="Expected Delivery"
//                   value={
//                     delivery.expectedDeliveryDate
//                       ? new Date(delivery.expectedDeliveryDate).toDateString()
//                       : "—"
//                   }
//                 />
//               </div>

//               {/* CTA */}
//               <div className="mt-5 flex justify-end">
//                 <Link
//                   to={`/${isFarmer ? "farmer" : "buyer"}/harvest-contracts/${
//                     c._id
//                   }`}
//                   className="px-5 py-2.5 rounded-lg bg-[#1F6F43] text-white text-sm font-semibold hover:bg-[#185C38]"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ---------------- UI helpers ---------------- */

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between">
//       <div>
//         <p className="text-xs text-[#6B7280]">{title}</p>
//         <p className="text-xl font-semibold mt-1">{value}</p>
//       </div>
//       <div className="h-9 w-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#374151]">
//         {icon}
//       </div>
//     </div>
//   );
// }

// function InfoBox({ label, value, highlight }) {
//   return (
//     <div
//       className={`rounded-xl px-4 py-3 border ${
//         highlight
//           ? "bg-[#ECFDF5] border-[#A7F3D0]"
//           : "bg-[#FAFAFA] border-[#E5E7EB]"
//       }`}
//     >
//       <p className="text-xs text-[#6B7280]">{label}</p>
//       <p className="text-sm font-semibold text-[#1F2933] mt-1">{value}</p>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     ACTIVE: "bg-[#FEF3C7] text-[#92400E]",
//     PAYMENT_PENDING: "bg-[#FFF7ED] text-[#9A3412]",
//     IN_TRANSIT: "bg-[#E0F2FE] text-[#0369A1]",
//     DELIVERED: "bg-[#DCFCE7] text-[#15803D]",
//     COMPLETED: "bg-[#DCFCE7] text-[#15803D]",
//   };

//   return (
//     <span
//       className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
//         map[status] || "bg-gray-100 text-gray-600"
//       }`}
//     >
//       {status.replace("_", " ")}
//     </span>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import {
  Leaf,
  Truck,
  CheckCircle2,
  IndianRupee,
  MapPin,
  User,
} from "lucide-react";

export default function HarvestContractTracking() {
  const [contracts, setContracts] = useState([]);
  const [stats, setStats] = useState({
    activeValue: 0,
    inTransitValue: 0,
    completedValue: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        // 🔥 allow page to continue even if user fetch fails
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ================= FETCH CONTRACTS + STATS ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractsRes, statsRes] = await Promise.all([
          api.get("/harvest-contracts"),
          api.get("/harvest-contracts/dashboard"),
        ]);

        console.log("📦 CONTRACTS RESPONSE:", contractsRes.data);

        setContracts(contractsRes.data.contracts || []);
        setStats(statsRes.data.stats);
      } catch (err) {
        console.error("Failed to load harvest data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-10">Loading…</div>;

  const isFarmer = currentUser?.role === "farmer";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2933]">
          {isFarmer
            ? "Harvest Contracts (Farmer)"
            : "Harvest Contracts (Buyer)"}
        </h1>
        <p className="text-sm text-[#6B7280]">
          Track payments and deliveries for harvested crops
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Value"
          value={`₹${stats.activeValue.toLocaleString()}`}
          icon={<Leaf />}
        />
        <StatCard
          title="In Transit Value"
          value={`₹${stats.inTransitValue.toLocaleString()}`}
          icon={<Truck />}
        />
        <StatCard
          title="Completed Value"
          value={`₹${stats.completedValue.toLocaleString()}`}
          icon={<CheckCircle2 />}
        />
        <StatCard
          title="Total Value"
          value={`₹${stats.totalValue.toLocaleString()}`}
          icon={<IndianRupee />}
        />
      </div>

      {/* Contracts */}
      <div className="space-y-5">
        {contracts.length === 0 ? (
          <p className="text-gray-500">No harvest contracts found.</p>
        ) : (
          contracts.map((c) => {
            const crop = c.harvestDetails || {};
            const delivery = c.delivery || {};
            const counterPartyName = isFarmer ? c.buyer?.name : c.farmer?.name;

            return (
              <div
                key={c._id}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6"
              >
                {/* Top row */}
                <div className="flex justify-between items-start gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-[#E6F4EA] flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-[#15803D]" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#1F2933]">
                        {crop.cropName}
                        {crop.variety && (
                          <span className="text-sm text-[#6B7280]">
                            {" "}
                            – {crop.variety}
                          </span>
                        )}
                      </h3>

                      <p className="text-sm text-[#6B7280]">
                        {c.contractId} • {crop.quantity} {crop.unit}
                      </p>

                      <div className="mt-2 flex items-center gap-4 text-sm text-[#374151]">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {counterPartyName}
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {delivery.deliveryLocation || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-[#6B7280]">Contract Value</div>
                    <div className="text-lg font-semibold text-[#1F2933]">
                      ₹{c.payment?.totalAmount?.toLocaleString()}
                    </div>

                    <StatusBadge status={c.status} />
                  </div>
                </div>

                {/* Info row */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoBox
                    label="Payment"
                    value={
                      c.payment?.status === "VERIFIED"
                        ? "Verified"
                        : ["MARKED", "PAID"].includes(c.payment?.status)
                        ? "Pending Verification"
                        : "Pending"
                    }
                    highlight={c.payment?.status === "VERIFIED"}
                  />

                  <InfoBox
                    label="Payment Mode"
                    value={
                      c.payment?.mode === "BEFORE_DELIVERY"
                        ? "Before Delivery"
                        : "On Delivery"
                    }
                  />

                  <InfoBox
                    label="Expected Delivery"
                    value={
                      delivery.expectedDeliveryDate
                        ? new Date(delivery.expectedDeliveryDate).toDateString()
                        : "—"
                    }
                  />
                </div>

                {/* CTA */}
                <div className="mt-5 flex justify-end">
                  <Link
                    to={`/${isFarmer ? "farmer" : "buyer"}/harvest-contracts/${
                      c._id
                    }`}
                    className="px-5 py-2.5 rounded-lg bg-[#1F6F43] text-white text-sm font-semibold hover:bg-[#185C38]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ---------------- UI helpers ---------------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-[#6B7280]">{title}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
      <div className="h-9 w-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#374151]">
        {icon}
      </div>
    </div>
  );
}

function InfoBox({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl px-4 py-3 border ${
        highlight
          ? "bg-[#ECFDF5] border-[#A7F3D0]"
          : "bg-[#FAFAFA] border-[#E5E7EB]"
      }`}
    >
      <p className="text-xs text-[#6B7280]">{label}</p>
      <p className="text-sm font-semibold text-[#1F2933] mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const safeStatus = status || "UNKNOWN";

  const map = {
    SENT: "bg-[#EEF2FF] text-[#3730A3]",
    ACCEPTED: "bg-[#FEF3C7] text-[#92400E]",
    ACTIVE: "bg-[#FEF3C7] text-[#92400E]",
    PAYMENT_PENDING: "bg-[#FFF7ED] text-[#9A3412]",
    IN_TRANSIT: "bg-[#E0F2FE] text-[#0369A1]",
    COMPLETED: "bg-[#DCFCE7] text-[#15803D]",
    UNKNOWN: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
        map[safeStatus] || map.UNKNOWN
      }`}
    >
      {safeStatus.replace(/_/g, " ")}
    </span>
  );
}
