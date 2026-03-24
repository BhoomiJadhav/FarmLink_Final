import React, { useState } from "react";
import api from "../../api/axios";

export default function BuyerSignatureModal({ contract, onClose, onSuccess }) {
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitSignature() {
    if (!signature) return alert("Signature is required");

    try {
      setLoading(true);

      await api.post(`/contracts/sign/buyer/${contract._id}`, {
        signatureType: "TYPED",
        signatureValue: signature,
        consent: true,
      });

      alert("Contract signed successfully");
      onSuccess(contract._id);
      onClose();
    } catch (err) {
      alert("Failed to sign contract");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-2">Sign Contract</h2>
        <p className="text-sm text-gray-500 mb-4">
          Please type your full name as your signature
        </p>

        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          placeholder="Type full name"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={submitSignature}
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            {loading ? "Submitting..." : "Sign Contract"}
          </button>
        </div>
      </div>
    </div>
  );
}
