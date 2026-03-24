import { useState } from "react";
import axios from "../api/axios";
import { X } from "lucide-react";

const DisputeModal = ({ open, onClose, contractId, onDisputeCreated }) => {
  const [form, setForm] = useState({
    category: "",
    description: "",
    requestedResolution: "",
  });

  const [files, setFiles] = useState([]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("requestedResolution", form.requestedResolution);

      files.forEach((file) => formData.append("evidenceFiles", file));

      const res = await axios.post(
        `/contracts/${contractId}/disputes`,
        formData,
      );

      onDisputeCreated(res.data);
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to raise dispute");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Raise Dispute</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <select
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="PAYMENT_ISSUE">Payment Issue</option>
          <option value="QUALITY_CONCERN">Quality Concern</option>
          <option value="STAGE_DISAGREEMENT">Stage Disagreement</option>
          <option value="DELIVERY_DELAY">Delivery Delay</option>
          <option value="CONTRACT_VIOLATION">Contract Violation</option>
          <option value="OTHER">Other</option>
        </select>

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Describe issue..."
          rows={3}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              requestedResolution: e.target.value,
            })
          }
        >
          <option value="">Requested Resolution</option>
          <option value="RELEASE_PAYMENT">Release Payment</option>
          <option value="REVERIFY_STAGE">Re-verify Stage</option>
          <option value="APPLY_PENALTY">Apply Penalty</option>
          <option value="EXTEND_TIMELINE">Extend Timeline</option>
          <option value="CANCEL_CONTRACT">Cancel Contract</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          Submit Dispute
        </button>
      </div>
    </div>
  );
};

export default DisputeModal;
