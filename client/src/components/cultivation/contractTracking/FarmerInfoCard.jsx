// const FarmerInfoCard = () => {
//   return (
//     <div className="bg-white border rounded-xl p-6">
//       <div className="flex items-center gap-4">
//         <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold">
//           RK
//         </div>
//         <div>
//           <div className="font-medium">Ramesh Kumar</div>
//           <div className="text-sm text-gray-500">Raipur, Chhattisgarh</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mt-6 text-center">
//         <div className="bg-gray-50 p-3 rounded">
//           <div className="font-semibold">12</div>
//           <div className="text-xs text-gray-500">Contracts</div>
//         </div>
//         <div className="bg-gray-50 p-3 rounded">
//           <div className="font-semibold">25 Acres</div>
//           <div className="text-xs text-gray-500">Farm Size</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerInfoCard;
const FarmerInfoCard = ({ farmer }) => {
  if (!farmer) return null;

  const initials = farmer.name
    ? farmer.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "FR";

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold">
          {initials}
        </div>

        <div>
          <div className="font-medium">{farmer.name}</div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="font-semibold">
              {farmer.rating?.average?.toFixed(1) || "0.0"}
            </span>
            <span className="text-gray-500 text-sm">
              ({farmer.rating?.count || 0} reviews)
            </span>
          </div>

          {/* ⚡ Karma */}
          <div className="text-sm text-gray-600">
            Trust Score:{" "}
            <span className="font-semibold text-emerald-600">
              {farmer.karmaScore || 0}/100
            </span>
          </div>
          <div className="text-sm text-gray-500">{farmer.address || "—"}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
        <div className="bg-gray-50 p-3 rounded">
          <div className="font-semibold">{farmer.totalContracts ?? "—"}</div>
          <div className="text-xs text-gray-500">Contracts</div>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <div className="font-semibold">
            {farmer.farmSize ? `${farmer.farmSize} Acres` : "—"}
          </div>
          <div className="text-xs text-gray-500">Farm Size</div>
        </div>
      </div>
    </div>
  );
};

export default FarmerInfoCard;
