const statusColorMap = {
  OPEN: "bg-yellow-100 text-yellow-800 border-yellow-300",
  UNDER_REVIEW: "bg-blue-100 text-blue-800 border-blue-300",
  RESOLVED: "bg-green-100 text-green-800 border-green-300",
  REJECTED: "bg-red-100 text-red-800 border-red-300",
};
const DisputeInfoCard = ({ dispute }) => {
  if (!dispute) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2">
      <h3 className="text-red-600 font-semibold">⚠ Active Dispute</h3>

      <div className="text-sm">
        <div>Category: {dispute.category}</div>
        <div
          className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${statusColorMap[dispute.status]}`}
        >
          {dispute.status.replace("_", " ")}
        </div>
        <div>Requested: {dispute.requestedResolution}</div>
      </div>
    </div>
  );
};

export default DisputeInfoCard;
