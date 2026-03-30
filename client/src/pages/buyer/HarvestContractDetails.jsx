// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../../api/axios";
// import { ArrowLeft, Phone, MapPin, CheckCircle } from "lucide-react";
// import LiveDeliveryMap from "./LiveDeliveryMap";

// /* ================= DELIVERY STEPS ================= */
// const DELIVERY_STEPS = [
//   { key: "PENDING", label: "Pending" },
//   { key: "DISPATCHED", label: "Dispatched" },
//   { key: "IN_TRANSIT", label: "In Transit" },
//   { key: "DELIVERED", label: "Delivered" },
// ];

// export default function HarvestContractDetail() {
//   const { id } = useParams();

//   const [contract, setContract] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ================= DELIVERY MODAL STATE ================= */
//   const [showDeliveryModal, setShowDeliveryModal] = useState(false);
//   /* ================= PAYMENT STATE ================= */
//   const [transactionRef, setTransactionRef] = useState("");
//   const [paymentProof, setPaymentProof] = useState(null);
//   const [paymentSubmitting, setPaymentSubmitting] = useState(false);

//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [driverContact, setDriverContact] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   /* ================= FETCH CURRENT USER ================= */
//   useEffect(() => {
//     api
//       .get("/auth/me")
//       .then((res) => setCurrentUser(res.data.user))
//       .catch(() => setCurrentUser(null));
//   }, []);

//   /* ================= FETCH CONTRACT (POLLING) ================= */
//   useEffect(() => {
//     const fetchContract = async () => {
//       const res = await api.get(`/harvest-contracts/${id}`);
//       setContract(res.data.contract);
//       setLoading(false);
//     };

//     fetchContract();
//     const interval = setInterval(fetchContract, 5000);
//     return () => clearInterval(interval);
//   }, [id]);

//   if (loading) return <div className="p-8">Loading contract…</div>;
//   if (!contract) return <div className="p-8">Contract not found</div>;

//   /* ================= SAFE EXTRACTION ================= */
//   const {
//     harvestDetails = {},
//     farmer = {},
//     buyer = {},
//     delivery = {},
//     status: contractStatus,
//   } = contract;

//   const payment = {
//     mode: contract.payment?.mode ?? "BEFORE_DELIVERY",
//     status: contract.payment?.status ?? "PENDING",
//     amount: contract.payment?.amount ?? 0,
//     transactionRef: contract.payment?.transactionRef,
//     proofUrl: contract.payment?.proofUrl,
//   };

//   const totalValue =
//     payment.amount ??
//     (harvestDetails.quantity && payment.pricePerUnit
//       ? harvestDetails.quantity * payment.pricePerUnit
//       : 0);

//   /* ================= DELIVERY ENFORCEMENT ================= */
//   const deliveryRequiredButMissing =
//     contractStatus === "ACTIVE" &&
//     delivery.status === "PENDING" &&
//     !delivery.vehicleNumber;

//   /* ================= DELIVERY PERMISSION ================= */
//   const canAddDeliveryDetails =
//     currentUser &&
//     delivery.status === "PENDING" &&
//     (payment.mode === "ON_DELIVERY" ||
//       (payment.mode === "BEFORE_DELIVERY" && payment.status === "VERIFIED")) &&
//     ((delivery.transportationByBuyer && currentUser.role === "buyer") ||
//       (!delivery.transportationByBuyer && currentUser.role === "farmer"));

//   /* ================= OTP VISIBILITY ================= */
//   const showOtpToFarmer =
//     currentUser?.role === "farmer" &&
//     delivery.status === "IN_TRANSIT" &&
//     delivery.deliveryOtp &&
//     (payment.mode !== "ON_DELIVERY" || payment.status === "VERIFIED");

//   const lastLocationUpdated = delivery?.liveLocation?.updatedAt;

//   function timeAgo(date) {
//     if (!date) return "—";

//     const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
//     if (seconds < 5) return "Just now";
//     if (seconds < 60) return `${seconds} sec ago`;

//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes} min ago`;

//     const hours = Math.floor(minutes / 60);
//     return `${hours} hr ago`;
//   }

//   return (
//     <div className="p-8 bg-[#FBFAF7] min-h-screen space-y-6">
//       {/* ================= HEADER ================= */}
//       <div className="flex items-center gap-3">
//         <Link to="/buyer/harvest-contract-tracking">
//           <ArrowLeft className="w-5 h-5" />
//         </Link>

//         <div>
//           <h1 className="text-2xl font-semibold text-[#1F2933]">
//             {harvestDetails.cropName || "Harvest Contract"}
//             {harvestDetails.variety && ` • ${harvestDetails.variety}`}
//           </h1>
//           <p className="text-sm text-gray-500">
//             {harvestDetails.quantity} {harvestDetails.unit} • ₹{totalValue}
//           </p>
//         </div>

//         <span className="ml-auto px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
//           {delivery.status}
//         </span>
//       </div>

//       {/* ================= METRICS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         <Metric title="Total Value" value={`₹${totalValue}`} />
//         <Metric title="Payment Status" value={payment.status} />
//         <Metric title="Payment Mode" value={payment.mode} />
//         <Metric
//           title="Expected Delivery"
//           value={
//             delivery.expectedDeliveryDate
//               ? new Date(delivery.expectedDeliveryDate).toDateString()
//               : "—"
//           }
//         />
//         <Metric
//           title="Delivery Location"
//           value={delivery.deliveryLocation || "—"}
//         />
//       </div>

//       {/* ================= DELIVERY PROGRESS ================= */}
//       <DeliveryProgress status={delivery.status} />
//       {payment.mode === "ON_DELIVERY" &&
//         ["PENDING", "MARKED"].includes(payment.status) &&
//         currentUser?.role === "buyer" && (
//           <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-sm text-yellow-800">
//             Vehicle has been dispatched.
//             <br />
//             <b>Complete payment to proceed with delivery.</b>
//           </div>
//         )}

//       {/* ================= DELIVERY WARNING ================= */}
//       {deliveryRequiredButMissing && (
//         <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
//           {delivery.transportationByBuyer ? (
//             <>
//               Buyer must add vehicle and driver details to proceed with
//               delivery.
//             </>
//           ) : payment.mode === "BEFORE_DELIVERY" &&
//             payment.status !== "VERIFIED" ? (
//             <>
//               Buyer payment must be verified before the farmer can dispatch the️
//               delivery.
//             </>
//           ) : (
//             <>
//               Farmer must add vehicle and driver details to proceed with
//               delivery.
//             </>
//           )}
//         </div>
//       )}

//       {/* ================= DELIVERY CTA ================= */}
//       {canAddDeliveryDetails && (
//         <button
//           className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700"
//           onClick={() => setShowDeliveryModal(true)}
//         >
//           Add Vehicle & Driver Details
//         </button>
//       )}

//       {/* ================= MAIN GRID ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* MAP */}
//         <div className="lg:col-span-2 bg-white rounded-xl border p-4 space-y-2">
//           <div className="flex justify-between items-center">
//             <h4 className="font-semibold text-[#1F2933]">
//               Live Delivery Tracking
//             </h4>
//             <span className="text-xs text-gray-500">
//               Last updated: {timeAgo(lastLocationUpdated)}
//             </span>
//           </div>

//           <LiveDeliveryMap
//             lat={delivery.liveLocation?.lat}
//             lng={delivery.liveLocation?.lng}
//           />
//         </div>

//         {/* DETAILS */}
//         <div className="space-y-4">
//           <InfoCard title="Delivery Details">
//             <Row
//               label="Transport Managed By"
//               value={delivery.transportationByBuyer ? "Buyer" : "Farmer"}
//             />
//             <Row
//               label="Vehicle Number"
//               value={delivery.vehicleNumber || "Not Assigned"}
//             />
//             <Row
//               label="Driver Contact"
//               value={delivery.driverContact || "Not Assigned"}
//             />
//             <Row label="Delivery Status" value={delivery.status} />
//           </InfoCard>

//           {delivery.trackingToken && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
//               <p className="font-medium text-blue-900">Driver Tracking Link</p>
//               <p className="text-blue-700 break-all mt-1">
//                 {`${window.location.origin}/delivery/track/${contract._id}?token=${delivery.trackingToken}`}
//               </p>
//             </div>
//           )}

//           {showOtpToFarmer && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//               <p className="text-sm text-yellow-800 font-medium">
//                 Share this OTP with the driver
//               </p>
//               <p className="text-xl font-bold tracking-widest mt-1">
//                 {delivery.deliveryOtp}
//               </p>
//             </div>
//           )}
//           {/* ================= PAYMENT SECTION ================= */}
//           <InfoCard title="Payment Details">
//             <Row label="Payment Mode" value={payment.mode} />
//             <Row label="Amount" value={`₹${payment.amount || 0}`} />
//             <Row label="Status" value={payment.status} />

//             {/* BUYER: MARK PAYMENT */}
//             {currentUser?.role === "buyer" &&
//               payment.mode === "BEFORE_DELIVERY" &&
//               ["PENDING", "REJECTED"].includes(payment.status) && (
//                 <div className="space-y-2 pt-3">
//                   <input
//                     type="text"
//                     placeholder="Transaction ID / UPI Ref"
//                     value={transactionRef}
//                     onChange={(e) => setTransactionRef(e.target.value)}
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                   />

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setPaymentProof(e.target.files[0])}
//                     className="w-full text-sm"
//                   />

//                   <button
//                     disabled={paymentSubmitting}
//                     className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold"
//                     onClick={async () => {
//                       if (!transactionRef) {
//                         alert("Transaction reference is required");
//                         return;
//                       }

//                       try {
//                         setPaymentSubmitting(true);

//                         const formData = new FormData();
//                         formData.append("transactionRef", transactionRef);
//                         if (paymentProof)
//                           formData.append("proof", paymentProof);

//                         await api.post(
//                           `/harvest-contracts/payment/${contract._id}`,
//                           formData,
//                           { headers: { "Content-Type": "multipart/form-data" } }
//                         );

//                         alert("Payment marked. Awaiting farmer verification.");
//                       } catch {
//                         alert("Failed to mark payment");
//                       } finally {
//                         setPaymentSubmitting(false);
//                       }
//                     }}
//                   >
//                     Mark Payment Done
//                   </button>
//                 </div>
//               )}

//             {/* FARMER: VERIFY PAYMENT */}
//             {currentUser?.role === "farmer" &&
//               ["MARKED", "PAID"].includes(payment.status) && (
//                 <div className="space-y-3 pt-3">
//                   <p className="text-sm text-gray-600">
//                     Transaction Ref: <b>{payment.transactionRef}</b>
//                   </p>

//                   {payment.proofUrl && (
//                     <a
//                       href={payment.proofUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-sm text-blue-600 underline"
//                     >
//                       View Payment Proof
//                     </a>
//                   )}

//                   <label className="flex items-center gap-2 text-sm">
//                     <input type="checkbox" />I confirm payment has been received
//                   </label>

//                   <button
//                     className="w-full bg-emerald-700 text-white py-2 rounded-lg text-sm font-semibold"
//                     onClick={async () => {
//                       try {
//                         await api.post(
//                           `/harvest-contracts/payment/verify/${contract._id}`
//                         );
//                         alert("Payment verified successfully");
//                       } catch {
//                         alert("Failed to verify payment");
//                       }
//                     }}
//                   >
//                     Verify Payment
//                   </button>
//                 </div>
//               )}

//             {/* VERIFIED STATE */}
//             {payment.status === "VERIFIED" && (
//               <p className="text-sm text-green-700 font-medium pt-3">
//                 Payment verified successfully
//               </p>
//             )}
//           </InfoCard>

//           <InfoCard title="Farmer Details">
//             <p className="font-medium">{farmer.name}</p>
//             <p className="text-sm text-gray-500 flex gap-1">
//               <MapPin size={14} /> {farmer.address}
//             </p>
//             <p className="text-sm text-gray-500 flex gap-1">
//               <Phone size={14} /> {farmer.mobile}
//             </p>
//             <p className="text-sm text-green-600 flex gap-1">
//               <CheckCircle size={14} /> Verified
//             </p>
//           </InfoCard>

//           <InfoCard title="Buyer Details">
//             <p className="font-medium">{buyer.name}</p>
//             <p className="text-sm text-gray-500 flex gap-1">
//               <MapPin size={14} /> {buyer.address}
//             </p>
//             <p className="text-sm text-gray-500 flex gap-1">
//               <Phone size={14} /> {buyer.mobile}
//             </p>
//           </InfoCard>
//         </div>
//       </div>

//       {/* ================= DELIVERY MODAL ================= */}
//       {showDeliveryModal && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
//             <h3 className="text-lg font-semibold">Add Delivery Details</h3>

//             <input
//               type="text"
//               placeholder="Vehicle Number"
//               value={vehicleNumber}
//               onChange={(e) => setVehicleNumber(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2"
//             />

//             <input
//               type="text"
//               placeholder="Driver Contact"
//               value={driverContact}
//               onChange={(e) => setDriverContact(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2"
//             />

//             <div className="flex justify-end gap-2 pt-2">
//               <button
//                 className="px-4 py-2 text-sm"
//                 onClick={() => setShowDeliveryModal(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 disabled={submitting}
//                 className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
//                 onClick={async () => {
//                   try {
//                     setSubmitting(true);
//                     const res = await api.post(
//                       `/harvest-contracts/delivery/dispatch/${contract._id}`,
//                       { vehicleNumber, driverContact }
//                     );

//                     alert(
//                       `Send this link to driver:\n\n${window.location.origin}/delivery/track/${contract._id}?token=${res.data.trackingToken}`
//                     );

//                     setShowDeliveryModal(false);
//                   } catch {
//                     alert("Failed to update delivery details");
//                   } finally {
//                     setSubmitting(false);
//                   }
//                 }}
//               >
//                 Save & Dispatch
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ================= UI HELPERS ================= */

// function DeliveryProgress({ status }) {
//   const currentIndex = DELIVERY_STEPS.findIndex((s) => s.key === status);

//   return (
//     <div className="bg-white rounded-xl border p-4">
//       <h4 className="font-semibold text-[#1F2933] mb-4">Delivery Progress</h4>

//       <div className="flex items-center justify-between">
//         {DELIVERY_STEPS.map((step, idx) => {
//           const isCompleted = idx <= currentIndex;

//           return (
//             <div key={step.key} className="flex-1 flex items-center">
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
//                     isCompleted
//                       ? "bg-emerald-600 text-white"
//                       : "bg-gray-200 text-gray-500"
//                   }`}
//                 >
//                   {idx + 1}
//                 </div>
//                 <span className="text-xs mt-1 text-gray-600">{step.label}</span>
//               </div>

//               {idx < DELIVERY_STEPS.length - 1 && (
//                 <div
//                   className={`flex-1 h-1 mx-2 rounded ${
//                     idx < currentIndex ? "bg-emerald-600" : "bg-gray-200"
//                   }`}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function Metric({ title, value }) {
//   return (
//     <div className="bg-white rounded-xl border p-4">
//       <p className="text-xs text-gray-500">{title}</p>
//       <p className="text-lg font-semibold mt-1 text-[#1F2933]">{value}</p>
//     </div>
//   );
// }

// function InfoCard({ title, children }) {
//   return (
//     <div className="bg-white rounded-xl border p-4">
//       <h4 className="font-semibold mb-2 text-[#1F2933]">{title}</h4>
//       <div className="space-y-2">{children}</div>
//     </div>
//   );
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex justify-between text-sm">
//       <span className="text-gray-500">{label}</span>
//       <span className="font-medium">{value}</span>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import { ArrowLeft, Phone, MapPin, CheckCircle } from "lucide-react";
import LiveDeliveryMap from "./LiveDeliveryMap";

/* ================= DELIVERY STEPS ================= */
const DELIVERY_STEPS = [
  { key: "PENDING", label: "Pending" },
  { key: "DISPATCHED", label: "Dispatched" },
  { key: "IN_TRANSIT", label: "In Transit" },
  { key: "DELIVERED", label: "Delivered" },
];

export default function HarvestContractDetail() {
  const { id } = useParams();

  const [contract, setContract] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= DELIVERY MODAL STATE ================= */
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  /* ================= PAYMENT STATE ================= */
  const [transactionRef, setTransactionRef] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(true);

  /* ================= FETCH CURRENT USER ================= */
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setCurrentUser(res.data.user))
      .catch(() => setCurrentUser(null));
  }, []);

  /* ================= FETCH CONTRACT ================= */
  useEffect(() => {
    const fetchContract = async () => {
      const res = await api.get(`/harvest-contracts/${id}`);
      setContract(res.data.contract);
      setLoading(false);
    };

    fetchContract();
    const interval = setInterval(fetchContract, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <div className="p-8">Loading contract…</div>;
  if (!contract) return <div className="p-8">Contract not found</div>;
  useEffect(() => {
    if (contract?.contractStatus === "COMPLETED") {
      checkReviewStatus();
    }
  }, [contract?.contractStatus]);
  /* ================= SAFE EXTRACTION ================= */
  const {
    harvestDetails = {},
    farmer = {},
    buyer = {},
    delivery = {},
    status: contractStatus,
  } = contract;

  const payment = {
    mode: contract.payment?.mode ?? "BEFORE_DELIVERY",
    status: contract.payment?.status ?? "PENDING",
    amount: contract.payment?.amount ?? 0,
    transactionRef: contract.payment?.transactionRef,
    proofUrl: contract.payment?.proofUrl,
  };

  const totalValue = payment.amount;

  /* ================= PERMISSION LOGIC ================= */

  // Buyer can mark payment
  const canBuyerMarkPayment =
    currentUser?.role === "buyer" &&
    ["PENDING", "REJECTED"].includes(payment.status) &&
    (payment.mode === "BEFORE_DELIVERY" ||
      (payment.mode === "ON_DELIVERY" && delivery.status === "IN_TRANSIT"));

  // Delivery button visibility
  const canAddDeliveryDetails =
    currentUser &&
    delivery.status === "PENDING" &&
    (payment.mode === "ON_DELIVERY" ||
      (payment.mode === "BEFORE_DELIVERY" && payment.status === "VERIFIED")) &&
    ((delivery.transportationByBuyer && currentUser.role === "buyer") ||
      (!delivery.transportationByBuyer && currentUser.role === "farmer"));

  // OTP visibility
  const showOtpToFarmer =
    currentUser?.role === "farmer" &&
    delivery.status === "IN_TRANSIT" &&
    delivery.deliveryOtp &&
    (payment.mode === "BEFORE_DELIVERY" || payment.status === "VERIFIED");

  // Payment alert (ON_DELIVERY only)
  const showPaymentAlert =
    payment.mode === "ON_DELIVERY" &&
    delivery.status === "IN_TRANSIT" &&
    payment.status !== "VERIFIED";

  const lastLocationUpdated = delivery?.liveLocation?.updatedAt;
  const checkReviewStatus = async () => {
    try {
      if (!contract?._id) return;

      const res = await api.get(`/reviews/${contract._id}/status`);

      setHasReviewed(res.data.hasReviewed);

      if (!res.data.hasReviewed) {
        setShowFeedbackModal(true);
      }
    } catch (err) {
      console.error("Review check failed", err);
    }
  };

  function timeAgo(date) {
    if (!date) return "—";
    const sec = Math.floor((Date.now() - new Date(date)) / 1000);
    if (sec < 60) return `${sec}s ago`;
    if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
    return `${Math.floor(sec / 3600)}h ago`;
  }

  return (
    <div className="p-8 bg-[#FBFAF7] min-h-screen space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <Link to="/buyer/harvest-contract-tracking">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div>
          <h1 className="text-2xl font-semibold text-[#1F2933]">
            {harvestDetails.cropName}
            {harvestDetails.variety && ` • ${harvestDetails.variety}`}
          </h1>
          <p className="text-sm text-gray-500">
            {harvestDetails.quantity} {harvestDetails.unit} • ₹{totalValue}
          </p>
        </div>

        <span className="ml-auto px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
          {delivery.status}
        </span>
      </div>

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Metric title="Total Value" value={`₹${totalValue}`} />
        <Metric title="Payment Status" value={payment.status} />
        <Metric title="Payment Mode" value={payment.mode} />
        <Metric
          title="Expected Delivery"
          value={
            delivery.expectedDeliveryDate
              ? new Date(delivery.expectedDeliveryDate).toDateString()
              : "—"
          }
        />
        <Metric
          title="Delivery Location"
          value={delivery.deliveryLocation || "—"}
        />
      </div>

      {/* ================= DELIVERY PROGRESS ================= */}
      <DeliveryProgress status={delivery.status} />

      {/* ================= PAYMENT ALERT ================= */}
      {showPaymentAlert && currentUser?.role === "buyer" && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-sm text-yellow-800">
          <b>Payment required.</b>
          <br />
          Complete payment to allow OTP verification and delivery completion.
        </div>
      )}

      {/* ================= DELIVERY CTA ================= */}
      {canAddDeliveryDetails && (
        <button
          className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700"
          onClick={() => setShowDeliveryModal(true)}
        >
          Add Vehicle & Driver Details
        </button>
      )}

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAP */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-[#1F2933]">
              Live Delivery Tracking
            </h4>
            <span className="text-xs text-gray-500">
              Last updated: {timeAgo(lastLocationUpdated)}
            </span>
          </div>

          <LiveDeliveryMap
            lat={delivery.liveLocation?.lat}
            lng={delivery.liveLocation?.lng}
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <InfoCard title="Delivery Details">
            <Row
              label="Transport Managed By"
              value={delivery.transportationByBuyer ? "Buyer" : "Farmer"}
            />
            <Row
              label="Vehicle Number"
              value={delivery.vehicleNumber || "Not Assigned"}
            />
            <Row
              label="Driver Contact"
              value={delivery.driverContact || "Not Assigned"}
            />
            <Row label="Delivery Status" value={delivery.status} />
          </InfoCard>

          {delivery.trackingToken && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="font-medium text-blue-900">Driver Tracking Link</p>
              <p className="text-blue-700 break-all mt-1">
                {`${window.location.origin}/delivery/track/${contract._id}?token=${delivery.trackingToken}`}
              </p>
            </div>
          )}

          {showOtpToFarmer && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 font-medium">
                Share this OTP with the driver
              </p>
              <p className="text-xl font-bold tracking-widest mt-1">
                {delivery.deliveryOtp}
              </p>
            </div>
          )}

          {/* ================= PAYMENT ================= */}
          <InfoCard title="Payment Details">
            <Row label="Payment Mode" value={payment.mode} />
            <Row label="Amount" value={`₹${payment.amount}`} />
            <Row label="Status" value={payment.status} />

            {canBuyerMarkPayment && (
              <div className="space-y-2 pt-3">
                <input
                  type="text"
                  placeholder="Transaction ID / UPI Ref"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPaymentProof(e.target.files[0])}
                  className="w-full text-sm"
                />

                <button
                  disabled={paymentSubmitting}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold"
                  onClick={async () => {
                    if (!transactionRef) {
                      alert("Transaction reference is required");
                      return;
                    }

                    setPaymentSubmitting(true);
                    const fd = new FormData();
                    fd.append("transactionRef", transactionRef);
                    if (paymentProof) fd.append("proof", paymentProof);

                    await api.post(
                      `/harvest-contracts/payment/${contract._id}`,
                      fd,
                    );
                    setPaymentSubmitting(false);

                    alert("Payment marked. Awaiting farmer verification.");
                  }}
                >
                  Mark Payment Done
                </button>
              </div>
            )}
            {/* FARMER: VERIFY PAYMENT */}
            {currentUser?.role === "farmer" && payment.status === "MARKED" && (
              <div className="space-y-3 pt-3">
                <p className="text-sm text-gray-600">
                  Transaction Ref: <b>{payment.transactionRef}</b>
                </p>

                {payment.proofUrl && (
                  <a
                    href={payment.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 underline"
                  >
                    View Payment Proof
                  </a>
                )}

                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-sm">
                  Please verify the payment to continue the delivery process.
                </div>

                <button
                  className="w-full bg-emerald-700 text-white py-2 rounded-lg text-sm font-semibold"
                  onClick={async () => {
                    try {
                      await api.post(
                        `/harvest-contracts/payment/verify/${contract._id}`,
                      );
                      alert("Payment verified successfully");
                    } catch {
                      alert("Failed to verify payment");
                    }
                  }}
                >
                  Verify Payment
                </button>
              </div>
            )}

            {payment.status === "VERIFIED" && (
              <p className="text-sm text-green-700 font-medium pt-3">
                Payment verified successfully
              </p>
            )}
          </InfoCard>

          <InfoCard title="Farmer Details">
            <p className="font-medium">{farmer.name}</p>
            <p className="text-sm text-gray-500 flex gap-1">
              <Phone size={14} /> {farmer.mobile}
            </p>
          </InfoCard>

          <InfoCard title="Buyer Details">
            <p className="font-medium">{buyer.name}</p>
            <p className="text-sm text-gray-500 flex gap-1">
              <Phone size={14} /> {buyer.mobile}
            </p>
          </InfoCard>
        </div>
      </div>

      {/* ================= DELIVERY MODAL ================= */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Add Delivery Details</h3>

            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              placeholder="Driver Contact"
              value={driverContact}
              onChange={(e) => setDriverContact(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 text-sm"
                onClick={() => setShowDeliveryModal(false)}
              >
                Cancel
              </button>

              <button
                disabled={submitting}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
                onClick={async () => {
                  setSubmitting(true);
                  await api.post(
                    `/harvest-contracts/delivery/dispatch/${contract._id}`,
                    { vehicleNumber, driverContact },
                  );
                  setSubmitting(false);
                  setShowDeliveryModal(false);
                }}
              >
                Save & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= UI HELPERS ================= */

function DeliveryProgress({ status }) {
  const currentIndex = DELIVERY_STEPS.findIndex((s) => s.key === status);
  return (
    <div className="bg-white rounded-xl border p-4">
      <h4 className="font-semibold mb-4">Delivery Progress</h4>
      <div className="flex items-center justify-between">
        {DELIVERY_STEPS.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          return (
            <div key={step.key} className="flex-1 flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {idx + 1}
              </div>
              {idx < DELIVERY_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    idx < currentIndex ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
        {showFeedbackModal && !hasReviewed && (
          <FeedbackModal
            contractId={contract._id}
            onSuccess={() => {
              setShowFeedbackModal(false);
              setHasReviewed(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
