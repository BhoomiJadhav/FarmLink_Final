import { ArrowLeft, FileText, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  active: "bg-green-100 text-green-700",
  completed: "bg-gray-200 text-gray-700",
  disputed: "bg-red-100 text-red-700",
};

export default function ContractHeader({ contract }) {
  const navigate = useNavigate();
  if (!contract) return null;

  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="flex items-start justify-between">
        {/* LEFT */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="mt-1 text-gray-500 hover:text-black"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">
                Contract #{contract.contractId}
              </h1>

              <span
                className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                  STATUS_STYLES[contract.status || "active"]
                }`}
              >
                {(contract.status || "active").toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {contract.contractName ||
                `${contract.crop?.name} Cultivation Contract`}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/contracts/${contract._id}/document`)}
            className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
          >
            <FileText size={16} />
            View Contract
          </button>

          <button
            disabled
            className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
