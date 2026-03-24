// import { CheckCircle, Clock, Lock, Camera } from "lucide-react";

// export default function SeedStage({
//   seedDispatch,
//   seedProvider = "BUYER", // BUYER | FARMER
//   role, // BUYER | FARMER
//   onDispatch,
//   onConfirm,
// }) {
//   const buyerDispatched = seedDispatch?.buyerConfirmed;
//   const farmerReceived = seedDispatch?.farmerConfirmed;

//   return (
//     <div className="bg-white rounded-xl p-6 border">
//       <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//         🌾 Seed Supply & Confirmation
//       </h2>

//       {/* INFO */}
//       <div className="text-sm text-gray-600 mb-4">
//         Seed Provider:{" "}
//         <span className="font-medium text-gray-800">{seedProvider}</span>
//       </div>

//       {/* CASE 1: BUYER PROVIDES SEEDS */}
//       {seedProvider === "BUYER" && (
//         <>
//           {/* Buyer Dispatch */}
//           <StageRow
//             title="Buyer dispatched seeds"
//             status={buyerDispatched ? "COMPLETED" : "PENDING"}
//             action={
//               role === "BUYER" && !buyerDispatched ? (
//                 <button
//                   onClick={onDispatch}
//                   className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm"
//                 >
//                   Mark Dispatched
//                 </button>
//               ) : null
//             }
//           />

//           {/* Farmer Confirm */}
//           <StageRow
//             title="Farmer confirmed seed receipt"
//             status={
//               farmerReceived
//                 ? "COMPLETED"
//                 : buyerDispatched
//                   ? "PENDING"
//                   : "LOCKED"
//             }
//             action={
//               role === "FARMER" && buyerDispatched && !farmerReceived ? (
//                 <button
//                   onClick={onConfirm}
//                   className="px-3 py-1.5 border rounded-md text-sm flex items-center gap-2"
//                 >
//                   <Camera size={16} /> Upload Proof
//                 </button>
//               ) : null
//             }
//           />
//         </>
//       )}

//       {/* CASE 2: FARMER PROVIDES SEEDS */}
//       {seedProvider === "FARMER" && (
//         <StageRow
//           title="Farmer confirmed seed usage"
//           status={farmerReceived ? "COMPLETED" : "PENDING"}
//           action={
//             role === "FARMER" && !farmerReceived ? (
//               <button
//                 onClick={onConfirm}
//                 className="px-3 py-1.5 border rounded-md text-sm flex items-center gap-2"
//               >
//                 <Camera size={16} /> Upload Proof
//               </button>
//             ) : null
//           }
//         />
//       )}

//       {/* LOCK MESSAGE */}
//       {!farmerReceived && (
//         <div className="mt-4 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md">
//           Cultivation timeline will start only after seed confirmation.
//         </div>
//       )}
//     </div>
//   );
// }

// /* -------- SUB COMPONENT -------- */

// function StageRow({ title, status, action }) {
//   const icons = {
//     COMPLETED: <CheckCircle className="text-green-600" />,
//     PENDING: <Clock className="text-yellow-500" />,
//     LOCKED: <Lock className="text-gray-400" />,
//   };

//   return (
//     <div className="flex justify-between items-center py-3 border-b last:border-none">
//       <div className="flex items-center gap-3">
//         {icons[status]}
//         <span className="text-sm">{title}</span>
//       </div>
//       {action}
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "../../../api/axios";

export default function SeedStage({ contract, role, refreshContract }) {
  const seedSupply = contract?.seedSupply;

  const isBuyer = role === "BUYER";
  const isFarmer = role === "FARMER";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    cropName: "",
    variety: "",
    brand: "",
    quantityKg: "",
    remarks: "",
    images: [],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFiles = (e) =>
    setForm({ ...form, images: Array.from(e.target.files) });

  const submit = async (url) => {
    try {
      setLoading(true);
      setError("");

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "images") v.forEach((f) => fd.append("images", f));
        else fd.append(k, v);
      });

      await axios.post(url, fd, { withCredentials: true });
      refreshContract();
      setForm({
        cropName: "",
        variety: "",
        brand: "",
        quantityKg: "",
        remarks: "",
        images: [],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------------------
     SHARED PROOF VIEW (VISIBLE TO BOTH)
  ---------------------------------------------------- */
  const ProofGallery = ({ images, title }) =>
    images?.length ? (
      <div className="mt-3">
        <p className="font-medium text-sm">{title}</p>
        <div className="flex gap-2 mt-1">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="proof"
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-white">
      <h3 className="font-semibold text-lg">Seed Supply</h3>

      {/* ===== Seed Details ===== */}
      {seedSupply.seedDetails && (
        <div className="text-sm bg-gray-50 p-3 rounded border">
          <p>
            <b>Crop:</b> {seedSupply.seedDetails.cropName}
          </p>
          <p>
            <b>Brand:</b> {seedSupply.seedDetails.brand}
          </p>
          <p>
            <b>Variety:</b> {seedSupply.seedDetails.variety || "—"}
          </p>
          <p>
            <b>Quantity:</b> {seedSupply.seedDetails.quantityKg} kg
          </p>
        </div>
      )}

      {/* ===== Buyer Dispatch Section ===== */}
      {isBuyer &&
        seedSupply.provider === "BUYER" &&
        seedSupply.status === "PENDING" && (
          <div className="space-y-2 border-t pt-3">
            <h4 className="font-medium">Dispatch Seeds</h4>

            <input
              name="cropName"
              placeholder="Crop Name"
              onChange={handleChange}
            />
            <input
              name="variety"
              placeholder="Variety"
              onChange={handleChange}
            />
            <input
              name="brand"
              placeholder="Seed Brand"
              onChange={handleChange}
            />
            <input
              name="quantityKg"
              type="number"
              placeholder="Quantity (kg)"
              onChange={handleChange}
            />
            <textarea
              name="remarks"
              placeholder="Remarks"
              onChange={handleChange}
            />
            <input type="file" multiple onChange={handleFiles} />

            <button
              onClick={() => submit(`/contracts/${contract._id}/seed/dispatch`)}
              disabled={loading}
              className="btn-primary"
            >
              Dispatch Seeds
            </button>
          </div>
        )}

      {/* ===== Farmer Accept Section ===== */}
      {isFarmer &&
        seedSupply.provider === "BUYER" &&
        seedSupply.status === "DISPATCHED" && (
          <div className="space-y-2 border-t pt-3">
            <h4 className="font-medium">Confirm Seed Receipt</h4>

            <textarea
              name="remarks"
              placeholder="Remarks"
              onChange={handleChange}
            />
            <input type="file" multiple onChange={handleFiles} />

            <button
              onClick={() => submit(`contracts/${contract._id}/seed/confirm`)}
              disabled={loading}
              className="btn-primary"
            >
              Accept & Verify Seeds
            </button>
          </div>
        )}

      {/* ===== Farmer Provided Seed Upload ===== */}
      {isFarmer &&
        seedSupply.provider === "FARMER" &&
        seedSupply.status !== "VERIFIED" && (
          <div className="space-y-2 border-t pt-3">
            <h4 className="font-medium">Upload Seed Proof</h4>

            <input
              name="cropName"
              placeholder="Crop Name"
              onChange={handleChange}
            />
            <input
              name="variety"
              placeholder="Variety"
              onChange={handleChange}
            />
            <input
              name="brand"
              placeholder="Seed Brand"
              onChange={handleChange}
            />
            <input
              name="quantityKg"
              type="number"
              placeholder="Quantity (kg)"
              onChange={handleChange}
            />
            <textarea
              name="remarks"
              placeholder="Remarks"
              onChange={handleChange}
            />
            <input type="file" multiple onChange={handleFiles} />

            <button
              onClick={() => submit(`/contracts/${contract._id}/seed/upload`)}
              disabled={loading}
              className="btn-primary"
            >
              Upload Seed Proof
            </button>
          </div>
        )}

      {/* ===== Proofs (VISIBLE TO BOTH BUYER & FARMER) ===== */}
      {seedSupply.dispatchProof && (
        <ProofGallery
          title="Buyer Dispatch Proof"
          images={seedSupply.dispatchProof.images}
        />
      )}

      {seedSupply.receiveProof && (
        <ProofGallery
          title="Farmer Receiving Proof"
          images={seedSupply.receiveProof.images}
        />
      )}

      {/* ===== Status ===== */}
      <div className="text-sm mt-2">
        <b>Status:</b>{" "}
        <span className="capitalize">{seedSupply.status.toLowerCase()}</span>
      </div>

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
