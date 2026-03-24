import {
  MessageSquare,
  FileText,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = ({
  contractId,
  onOpenChat,
  unreadCount,
  onRequestStage,
  isRequestAlreadySent,
  onRaiseDispute,
  dispute,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
      <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>

      {/* Communication Section */}
      <div className="space-y-3">
        <p className="text-xs uppercase text-gray-400 tracking-wide">
          Communication
        </p>

        <button
          onClick={onOpenChat}
          className="relative w-full flex items-center gap-3 border p-3 rounded-lg hover:bg-gray-50 transition"
        >
          <MessageSquare size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Open Secure Chat
          </span>

          {unreadCount > 0 && (
            <span className="absolute right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={onRequestStage}
          disabled={isRequestAlreadySent}
          className={`w-full flex items-center gap-3 border p-3 rounded-lg transition
    ${
      isRequestAlreadySent
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-50"
    }
  `}
        >
          <ShieldCheck size={18} />
          <span className="text-sm font-medium">
            {isRequestAlreadySent
              ? "Stage Update Requested"
              : "Request Stage Update"}
          </span>
        </button>
      </div>

      {/* Documents Section */}
      <div className="space-y-3">
        <p className="text-xs uppercase text-gray-400 tracking-wide">
          Documents
        </p>

        <button
          onClick={() => navigate(`/contracts/${contractId}/document`)}
          className="w-full flex items-center gap-3 border p-3 rounded-lg hover:bg-gray-50 transition"
        >
          <FileText size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Download Contract Agreement
          </span>
        </button>
      </div>

      {/* Resolution Section */}
      <div className="space-y-3">
        <p className="text-xs uppercase text-gray-400 tracking-wide">
          Resolution
        </p>

        {/* <button
          className="w-full flex items-center gap-3 border p-3 rounded-lg text-red-600 border-red-200 hover:bg-red-50 transition"
          onClick={() => {
            console.log("Raise dispute for contract:", contractId);
          }}
        >
          <AlertTriangle size={18} />
          <span className="text-sm font-semibold">Raise Dispute</span>
        </button> */}
        {!dispute && (
          <button
            onClick={onRaiseDispute}
            className="w-full flex items-center gap-3 border p-3 rounded-lg text-red-600 border-red-200 hover:bg-red-50 transition"
          >
            <AlertTriangle size={18} />
            <span className="text-sm font-semibold">Raise Dispute</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
