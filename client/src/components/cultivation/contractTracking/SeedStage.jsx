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
    <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">
          Seed Supply
        </h3>

        <span
          className={`px-4 py-1 text-[10px] font-black rounded-xl uppercase tracking-wider
        ${
          seedSupply.status === "PENDING"
            ? "bg-amber-100 text-amber-700"
            : seedSupply.status === "DISPATCHED"
              ? "bg-blue-100 text-blue-700"
              : seedSupply.status === "VERIFIED"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
        }`}
        >
          {seedSupply.status}
        </span>
      </div>

      {/* ===== SEED DETAILS ===== */}
      {seedSupply.seedDetails && (
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <p className="text-xs font-black text-slate-500 uppercase mb-2">
            Seed Details
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
            <p>
              <span className="text-slate-400">Crop:</span>{" "}
              {seedSupply.seedDetails.cropName}
            </p>
            <p>
              <span className="text-slate-400">Brand:</span>{" "}
              {seedSupply.seedDetails.brand}
            </p>
            <p>
              <span className="text-slate-400">Variety:</span>{" "}
              {seedSupply.seedDetails.variety || "—"}
            </p>
            <p>
              <span className="text-slate-400">Quantity:</span>{" "}
              {seedSupply.seedDetails.quantityKg} kg
            </p>
          </div>
        </div>
      )}

      {/* ===== FORM SECTION ===== */}
      {(isBuyer &&
        seedSupply.provider === "BUYER" &&
        seedSupply.status === "PENDING") ||
      (isFarmer &&
        seedSupply.provider === "BUYER" &&
        seedSupply.status === "DISPATCHED") ||
      (isFarmer &&
        seedSupply.provider === "FARMER" &&
        seedSupply.status !== "VERIFIED") ? (
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-5">
          <h4 className="text-sm font-black text-slate-700 uppercase">
            {isBuyer
              ? "Dispatch Seeds"
              : seedSupply.provider === "FARMER"
                ? "Upload Seed Proof"
                : "Confirm Seed Receipt"}
          </h4>

          {/* INPUT GRID */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-style">Crop Name</label>
              <input
                name="cropName"
                placeholder="e.g. Wheat"
                onChange={handleChange}
                className="input-style"
              />
            </div>

            <div>
              <label className="label-style">Variety</label>
              <input
                name="variety"
                placeholder="e.g. Basmati"
                onChange={handleChange}
                className="input-style"
              />
            </div>

            <div>
              <label className="label-style">Seed Brand</label>
              <input
                name="brand"
                placeholder="e.g. Pioneer"
                onChange={handleChange}
                className="input-style"
              />
            </div>

            <div>
              <label className="label-style">Quantity (kg)</label>
              <input
                name="quantityKg"
                type="number"
                placeholder="Enter quantity"
                onChange={handleChange}
                className="input-style"
              />
            </div>
          </div>

          {/* REMARKS */}
          <div>
            <label className="label-style">Remarks</label>
            <textarea
              name="remarks"
              placeholder="Add any notes..."
              onChange={handleChange}
              className="w-full border-2 border-slate-100 p-3 rounded-xl text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="label-style">Upload Proof Images</label>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-emerald-400 transition">
              <input
                type="file"
                multiple
                onChange={handleFiles}
                className="text-sm"
              />
              <p className="text-xs text-slate-500 mt-2">PNG, JPG up to 5MB</p>
            </div>

            {/* PREVIEW BEFORE UPLOAD */}
            {form.images.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {form.images.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
              if (isBuyer) submit(`/contracts/${contract._id}/seed/dispatch`);
              else if (seedSupply.provider === "BUYER")
                submit(`/contracts/${contract._id}/seed/confirm`);
              else submit(`/contracts/${contract._id}/seed/upload`);
            }}
            disabled={loading}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-black uppercase text-xs tracking-wider hover:bg-emerald-700 transition-all"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      ) : null}

      {/* ===== PROOF GALLERY ===== */}
      {(seedSupply.dispatchProof || seedSupply.receiveProof) && (
        <div className="space-y-4">
          {seedSupply.dispatchProof && (
            <div>
              <p className="text-xs font-black text-slate-500 uppercase mb-2">
                Buyer Dispatch Proof
              </p>
              <div className="flex gap-3 flex-wrap">
                {seedSupply.dispatchProof.images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000/${img}`}
                    className="w-24 h-24 object-cover rounded-xl border border-slate-200 hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}

          {seedSupply.receiveProof && (
            <div>
              <p className="text-xs font-black text-slate-500 uppercase mb-2">
                Farmer Receiving Proof
              </p>
              <div className="flex gap-3 flex-wrap">
                {seedSupply.receiveProof.images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000/${img}`}
                    className="w-24 h-24 object-cover rounded-xl border border-slate-200 hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-600 text-xs font-semibold">{error}</p>}
    </div>
  );
}
