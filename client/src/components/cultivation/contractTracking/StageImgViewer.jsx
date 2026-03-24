const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function StageImageViewer({
  open,
  stage,
  role,
  onClose,
  onVerify,
}) {
  if (!open || !stage) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[720px] p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Stage Proof – {stage.name}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {stage.farmerImages?.map((file, idx) => (
            <img
              key={idx}
              src={`${API_BASE}/uploads/stages/${file}`}
              alt={`proof-${idx}`}
              className="w-full h-40 object-cover rounded border"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/placeholder.png";
              }}
            />
          ))}
        </div>

        {role === "BUYER" && !stage.buyerVerified && (
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => onVerify(stage, false)}
              className="px-4 py-2 border rounded"
            >
              Request Re-upload
            </button>

            <button
              onClick={() => onVerify(stage, true)}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Verify Stage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
