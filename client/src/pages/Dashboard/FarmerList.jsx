// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const API_BASE = "http://localhost:5000/api";

// const FarmerMarket = () => {
//   const [harvestListings, setHarvestListings] = useState([]);
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* ================= FETCH DATA ================= */

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchHarvestListings = async () => {
//       const res = await fetch(`${API_BASE}/harvest-listings/market`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setHarvestListings(data.listings || []);
//     };

//     const fetchFarmers = async () => {
//       // ✅ IMPORTANT: fetch ONLY AVAILABLE farmers
//       const res = await fetch(`${API_BASE}/farmer/farmers`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setFarmers(Array.isArray(data) ? data : []);
//     };

//     Promise.all([fetchHarvestListings(), fetchFarmers()])
//       .catch(() => setError("Failed to load market data"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p className="p-6">Loading market...</p>;
//   if (error) return <p className="p-6 text-red-600">{error}</p>;

//   /* ================= UI ================= */

//   return (
//     <div className="p-6 bg-[#faf8f4] min-h-screen">
//       {/* ================= HARVEST MARKET ================= */}
//       <section className="mb-14">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h2 className="text-2xl font-semibold">
//               🌾 Harvested Crops Available
//             </h2>
//             <p className="text-sm text-gray-600">
//               Fresh harvests ready for contract-based purchase
//             </p>
//           </div>
//           <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
//             {harvestListings.length} Listings
//           </span>
//         </div>

//         {harvestListings.length === 0 ? (
//           <p className="text-gray-500">No harvested crops available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {harvestListings.map((l) => (
//               <div
//                 key={l._id}
//                 className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="text-lg font-bold">{l.harvest.cropName}</h3>
//                     <p className="text-sm text-gray-500">by {l.farmer?.name}</p>
//                   </div>

//                   <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
//                     Grade {l.harvest.qualityGrade}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-y-2 text-sm mt-4 text-gray-700">
//                   <p>
//                     📦 Qty: {l.harvest.quantityAvailable} {l.harvest.unit}
//                   </p>
//                   <p>📍 {l.delivery?.pickupLocation || "N/A"}</p>
//                   <p>
//                     📅 Harvested: {l.harvest.harvestedMonth}{" "}
//                     {l.harvest.harvestedYear}
//                   </p>
//                   <p>
//                     💰 ₹{l.expectedPrice.minPricePerUnit} – ₹
//                     {l.expectedPrice.maxPricePerUnit}
//                   </p>
//                 </div>

//                 <div className="flex justify-end mt-5">
//                   <Link
//                     to={`/buyer/harvest-contract/${l._id}`}
//                     className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800"
//                   >
//                     Initiate Purchase Contract
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ================= FARMER DIRECTORY ================= */}
//       <section>
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold">Available Farmers</h2>
//           <p className="text-sm text-gray-600">
//             Farmers currently open for pre-harvest contracts
//           </p>
//         </div>

//         {farmers.length === 0 ? (
//           <p className="text-gray-500">
//             No farmers currently available for contracts.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {farmers.map((f) => (
//               <div
//                 key={f._id}
//                 className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold">{f.personal?.fullName}</h3>
//                     <p className="text-xs text-gray-500">
//                       📍 {f.farm?.farmLocation}
//                     </p>
//                   </div>
//                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                     Available
//                   </span>
//                 </div>

//                 <div className="mt-3 text-sm text-gray-700">
//                   <p>🌾 Land: {f.farm?.landSize || "--"} Acres</p>
//                   <p>
//                     🛡️ Crop Insurance:{" "}
//                     {f.farm?.insurance ? "Available" : "Not Available"}
//                   </p>
//                 </div>

//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {(f.farm?.cropTypes || []).map((crop, idx) => (
//                     <span
//                       key={idx}
//                       className="text-xs bg-gray-100 px-2 py-1 rounded-full"
//                     >
//                       {crop}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex justify-end gap-3 mt-5">
//                   <Link
//                     to={`/buyer/cultivation-contract/${f.userId._id}`}
//                     className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
//                   >
//                     Create Contract
//                   </Link>

//                   <Link
//                     to={`/farmer/${f.userId}/profile`}
//                     className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default FarmerMarket;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const API_BASE = "http://localhost:5000/api";

// const FarmerMarket = () => {
//   const [harvestListings, setHarvestListings] = useState([]);
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchHarvestListings = async () => {
//       const res = await fetch(`${API_BASE}/harvest-listings/market`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setHarvestListings(data.listings || []);
//     };

//     const fetchFarmers = async () => {
//       const res = await fetch(`${API_BASE}/farmer/farmers`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setFarmers(Array.isArray(data) ? data : []);
//     };

//     Promise.all([fetchHarvestListings(), fetchFarmers()])
//       .catch(() => setError("Failed to load market data"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p className="p-6">Loading market…</p>;
//   if (error) return <p className="p-6 text-red-600">{error}</p>;

//   /* ================= UI ================= */
//   return (
//     <div className="p-6 bg-[#faf8f4] min-h-screen">
//       {/* ================= HARVEST MARKET ================= */}
//       <section className="mb-14">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h2 className="text-2xl font-semibold">
//               🌾 Harvested Crops Available
//             </h2>
//             <p className="text-sm text-gray-600">
//               Fresh harvests ready for contract-based purchase
//             </p>
//           </div>
//           <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
//             {harvestListings.length} Listings
//           </span>
//         </div>

//         {harvestListings.length === 0 ? (
//           <p className="text-gray-500">No harvested crops available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {harvestListings.map((l) => {
//               const location = l.delivery?.pickupLocation;

//               return (
//                 <div
//                   key={l._id}
//                   className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
//                 >
//                   {/* HEADER */}
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-bold">
//                         {l.harvest.cropName}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         by {l.farmer?.name}
//                       </p>
//                     </div>

//                     <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//                       {l.qualityDetails.cropCondition.replaceAll("_", " ")}
//                     </span>
//                   </div>

//                   {/* IMAGES */}
//                   {l.qualityDetails.images?.length > 0 && (
//                     <div className="grid grid-cols-3 gap-2 mt-4">
//                       {l.qualityDetails.images.slice(0, 3).map((img, idx) => (
//                         <img
//                           key={idx}
//                           src={img}
//                           alt="Crop"
//                           className="h-24 w-full object-cover rounded-lg border"
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {/* BASIC INFO */}
//                   <div className="grid grid-cols-2 gap-y-2 text-sm mt-4 text-gray-700">
//                     <p>
//                       📦 Qty: {l.harvest.quantityAvailable} {l.harvest.unit}
//                     </p>
//                     <p>
//                       📅 Harvested: {l.harvest.harvestedMonth}{" "}
//                       {l.harvest.harvestedYear}
//                     </p>
//                     <p>
//                       💧 Moisture:{" "}
//                       {l.qualityDetails.moistureLevel.replace("_", " ")}
//                     </p>
//                     <p>
//                       🧹 Sorting:{" "}
//                       {l.qualityDetails.sortingStatus.replace("_", " ")}
//                     </p>
//                   </div>

//                   {/* PRICE */}
//                   <p className="mt-2 text-sm text-gray-800">
//                     💰 ₹{l.expectedPrice.minPricePerUnit} – ₹
//                     {l.expectedPrice.maxPricePerUnit} / Quintal
//                   </p>

//                   {/* ADDRESS */}
//                   {location && (
//                     <p className="mt-2 text-sm text-gray-600">
//                       📍 {location.addressLine}, {location.villageOrCity},{" "}
//                       {location.district}, {location.state} – {location.pincode}
//                     </p>
//                   )}

//                   {/* EXPAND DETAILS */}
//                   <button
//                     onClick={() =>
//                       setExpandedId(expandedId === l._id ? null : l._id)
//                     }
//                     className="mt-3 text-sm text-green-700 underline"
//                   >
//                     {expandedId === l._id
//                       ? "Hide details"
//                       : "View full details"}
//                   </button>

//                   {expandedId === l._id && (
//                     <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
//                       <p>
//                         📜 Declaration Accepted:{" "}
//                         {l.declarationAccepted ? "Yes" : "No"}
//                       </p>
//                       <p>Status: {l.status}</p>
//                     </div>
//                   )}

//                   {/* ACTION */}
//                   <div className="flex justify-end mt-5">
//                     <Link
//                       to={`/buyer/harvest-contract/${l._id}`}
//                       className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800"
//                     >
//                       Initiate Purchase Contract
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       {/* ================= FARMER DIRECTORY (UNCHANGED LOGIC) ================= */}
//       <section>
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold">Available Farmers</h2>
//           <p className="text-sm text-gray-600">
//             Farmers currently open for pre-harvest contracts
//           </p>
//         </div>

//         {farmers.length === 0 ? (
//           <p className="text-gray-500">
//             No farmers currently available for contracts.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {farmers.map((f) => (
//               <div
//                 key={f._id}
//                 className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold">{f.personal?.fullName}</h3>
//                     <p className="text-xs text-gray-500">
//                       📍 {f.farm?.farmLocation}
//                     </p>
//                   </div>
//                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                     Available
//                   </span>
//                 </div>

//                 <div className="mt-3 text-sm text-gray-700">
//                   <p>🌾 Land: {f.farm?.landSize || "--"} Acres</p>
//                   <p>
//                     🛡️ Crop Insurance:{" "}
//                     {f.farm?.insurance ? "Available" : "Not Available"}
//                   </p>
//                 </div>

//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {(f.farm?.cropTypes || []).map((crop, idx) => (
//                     <span
//                       key={idx}
//                       className="text-xs bg-gray-100 px-2 py-1 rounded-full"
//                     >
//                       {crop}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex justify-end gap-3 mt-5">
//                   <Link
//                     to={`/buyer/cultivation-contract/${f.userId._id}`}
//                     className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
//                   >
//                     Create Contract
//                   </Link>

//                   <Link
//                     to={`/farmer/${f.userId}/profile`}
//                     className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default FarmerMarket;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Database, 
  ShieldCheck, 
  ExternalLink, 
  PlusCircle, 
  Users, 
  Package, 
  Calendar, 
  ArrowRight,
  Search
} from "lucide-react";

const API_BASE = "http://localhost:5000/api";

const FarmerList = () => {
  const [harvestListings, setHarvestListings] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search States
  const [harvestSearch, setHarvestSearch] = useState("");
  const [farmerSearch, setFarmerSearch] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchHarvestListings = async () => {
      const res = await fetch(`${API_BASE}/harvest-listings/market`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHarvestListings(data.listings || []);
    };

    const fetchFarmers = async () => {
      const res = await fetch(`${API_BASE}/farmer/farmers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFarmers(Array.isArray(data) ? data : []);
    };

    Promise.all([fetchHarvestListings(), fetchFarmers()])
      .catch(() => setError("Failed to load market data"))
      .finally(() => setLoading(false));
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredHarvests = harvestListings.filter((l) =>
    l.harvest.cropName.toLowerCase().includes(harvestSearch.toLowerCase())
  );

  const filteredFarmers = farmers.filter((f) =>
    f.personal?.fullName?.toLowerCase().includes(farmerSearch.toLowerCase()) ||
    f.farm?.farmLocation?.toLowerCase().includes(farmerSearch.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Marketplace...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-rose-50 text-rose-600 font-bold rounded-2xl m-6 border border-rose-100">{error}</div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* ================= SECTION 1: HARVESTED CROPS ================= */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Package className="text-indigo-600" size={24} /> Harvested Crops Available
            </h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1">
              Fresh harvests ready for contract-based purchase
            </p>
          </div>
          
          {/* HARVEST FILTER */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Filter by crop..."
                value={harvestSearch}
                onChange={(e) => setHarvestSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-[11px] font-bold border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none w-48 transition-all"
              />
            </div>
            <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg uppercase">
              {filteredHarvests.length} Listings
            </span>
          </div>
        </div>

        {filteredHarvests.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
            No matching harvested crops.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredHarvests.map((l) => (
              <div key={l._id} className="group bg-white rounded-[2rem] border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xl border border-indigo-100">
                    {l.harvest.cropName[0]}
                  </div>
                  <span className="text-[8px] font-black bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100 uppercase">
                    {l.qualityDetails.cropCondition.replace("_", " ")}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-black text-slate-800 text-sm truncate">{l.harvest.cropName}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">by {l.farmer?.name}</p>
                </div>

                <div className="space-y-1.5 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-600 flex items-center gap-2">
                    <Database size={12} className="text-indigo-500" /> {l.harvest.quantityAvailable} {l.harvest.unit}
                  </p>
                  <p className="text-[10px] font-bold text-slate-600 flex items-center gap-2">
                    <Calendar size={12} className="text-indigo-500" /> {l.harvest.harvestedMonth} {l.harvest.harvestedYear}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Price Start</p>
                  <p className="text-lg font-black text-slate-900 leading-none">₹{l.expectedPrice.minPricePerUnit} <span className="text-[10px] text-slate-400">/Q</span></p>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Link to={`/buyer/harvest-contract/${l._id}`} className="w-full bg-[#0f172a] text-white py-2 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all">
                    Initiate Purchase <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= SECTION 2: FARMER DIRECTORY ================= */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="text-indigo-600" size={24} /> Available Farmers
            </h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1">
              Farmers currently open for pre-harvest contracts
            </p>
          </div>

          {/* FARMER FILTER */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search name or location..."
                value={farmerSearch}
                onChange={(e) => setFarmerSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-[11px] font-bold border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none w-48 transition-all"
              />
            </div>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-indigo-100 uppercase">
              {filteredFarmers.length} TOTAL
            </span>
          </div>
        </div>

        {filteredFarmers.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
            No matching farmers found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFarmers.map((f) => (
              <div key={f._id} className="group bg-white rounded-[2rem] border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center font-black text-lg group-hover:bg-indigo-600 transition-colors shadow-lg shrink-0">
                      {f.personal?.fullName?.charAt(0) || "F"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-800 text-sm leading-tight truncate">
                        {f.personal?.fullName}
                      </h3>
                      <p className="text-[10px] font-bold text-indigo-500 flex items-center gap-1 mt-1 uppercase truncate">
                        <MapPin size={10} className="text-rose-500" /> {f.farm?.farmLocation || "N/A"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[8px] font-black bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg border border-indigo-100 uppercase shrink-0">
                    Available
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">Land</p>
                    <p className="text-[11px] font-black text-slate-700">{f.farm?.landSize || "--"} Ac</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">Insurance</p>
                    <p className={`text-[11px] font-black ${f.farm?.insurance ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {f.farm?.insurance ? "YES" : "NO"}
                    </p>
                  </div>
                </div>

                <div className="mt-auto space-y-2">
                  <Link to={`/buyer/cultivation-contract/${f.userId?._id}`} className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md">
                    <PlusCircle size={12} /> Create Contract
                  </Link>
                  <Link to={`/farmer/${f.userId?._id}/profile`} className="w-full bg-white border border-slate-200 text-slate-600 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FarmerList;