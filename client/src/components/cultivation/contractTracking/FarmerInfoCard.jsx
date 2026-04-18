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

// // export default FarmerInfoCard;
// const FarmerInfoCard = ({ farmer }) => {
//   if (!farmer) return null;

//   const initials = farmer.name
//     ? farmer.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .slice(0, 2)
//     : "FR";

//   return (
//     <div className="bg-white border rounded-xl p-6">
//       <div className="flex items-center gap-4">
//         <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold">
//           {initials}
//         </div>

//         <div>
//           <div className="font-medium">{farmer.name}</div>
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-500 text-lg">⭐</span>
//             <span className="font-semibold">
//               {farmer.rating?.average?.toFixed(1) || "0.0"}
//             </span>
//             <span className="text-gray-500 text-sm">
//               ({farmer.rating?.count || 0} reviews)
//             </span>
//           </div>

//           {/* ⚡ Karma */}
//           <div className="text-sm text-gray-600">
//             Trust Score:{" "}
//             <span className="font-semibold text-emerald-600">
//               {farmer.karmaScore || 0}/100
//             </span>
//           </div>
//           <div className="text-sm text-gray-500">{farmer.address || "—"}</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mt-6 text-center">
//         <div className="bg-gray-50 p-3 rounded">
//           <div className="font-semibold">{farmer.totalContracts ?? "—"}</div>
//           <div className="text-xs text-gray-500">Contracts</div>
//         </div>

//         <div className="bg-gray-50 p-3 rounded">
//           <div className="font-semibold">
//             {farmer.farmSize ? `${farmer.farmSize} Acres` : "—"}
//           </div>
//           <div className="text-xs text-gray-500">Farm Size</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerInfoCard;
import React from "react";
import { User, Star, ShieldCheck, MapPin, Landmark, Ruler } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
        <User size={16} className="text-emerald-600" />
        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Producer Profile</h4>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-slate-200 shrink-0">
          {initials}
        </div>

        <div className="min-w-0">
          <h3 className="font-black text-slate-900 text-base leading-tight truncate">
            {farmer.name}
          </h3>
          
          <div className="flex items-center gap-1.5 mt-1">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-black text-slate-800">
              {farmer.rating?.average?.toFixed(1) || "0.0"}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              ({farmer.rating?.count || 0} reviews)
            </span>
          </div>

          <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
            <MapPin size={10} className="text-rose-500" />
            <span className="truncate">{farmer.address || "Location Verified"}</span>
          </div>
        </div>
      </div>

      {/* Trust Score Banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Platform Trust Score</span>
        </div>
        <span className="text-sm font-black text-emerald-700">
          {farmer.karmaScore || 0}<span className="text-[10px] opacity-60">/100</span>
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
            <Landmark size={10} /> Experience
          </p>
          <p className="text-xs font-black text-slate-900">
            {farmer.totalContracts ?? 0} <span className="text-[10px] text-slate-500">Contracts</span>
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
            <Ruler size={10} /> Capacity
          </p>
          <p className="text-xs font-black text-slate-900">
            {farmer.farmSize ? `${farmer.farmSize} Ac` : "Verified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmerInfoCard;