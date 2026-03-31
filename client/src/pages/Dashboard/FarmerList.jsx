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
import BuyerSidebar from "../../components/BuyerSidebar";
import Topbar from "../../components/topNav";

const API_BASE = "http://localhost:5000/api";

const FarmerMarket = () => {
  const [harvestListings, setHarvestListings] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

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

  if (loading) return <p className="p-6">Loading market…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  /* ================= UI ================= */
  return (
    <div className="flex h-screen bg-[#faf8f4]">
      {/* ✅ SIDEBAR (FIXED) */}
      <BuyerSidebar />

      {/* ✅ RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ TOPBAR */}
        <Topbar />

        {/* ✅ SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* ================= HARVEST MARKET ================= */}
          <section className="mb-14">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  🌾 Harvested Crops Available
                </h2>
                <p className="text-sm text-gray-600">
                  Fresh harvests ready for contract-based purchase
                </p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {harvestListings.length} Listings
              </span>
            </div>

            {harvestListings.length === 0 ? (
              <p className="text-gray-500">No harvested crops available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {harvestListings.map((l) => {
                  const location = l.delivery?.pickupLocation;

                  return (
                    <div
                      key={l._id}
                      className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
                    >
                      {/* HEADER */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold">
                            {l.harvest.cropName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            by {l.farmer?.name}
                          </p>
                        </div>

                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {l.qualityDetails.cropCondition.replaceAll("_", " ")}
                        </span>
                      </div>

                      {/* IMAGES */}
                      {l.qualityDetails.images?.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {l.qualityDetails.images
                            .slice(0, 3)
                            .map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="Crop"
                                className="h-24 w-full object-cover rounded-lg border"
                              />
                            ))}
                        </div>
                      )}

                      {/* BASIC INFO */}
                      <div className="grid grid-cols-2 gap-y-2 text-sm mt-4 text-gray-700">
                        <p>
                          📦 Qty: {l.harvest.quantityAvailable} {l.harvest.unit}
                        </p>
                        <p>
                          📅 Harvested: {l.harvest.harvestedMonth}{" "}
                          {l.harvest.harvestedYear}
                        </p>
                        <p>
                          💧 Moisture:{" "}
                          {l.qualityDetails.moistureLevel.replace("_", " ")}
                        </p>
                        <p>
                          🧹 Sorting:{" "}
                          {l.qualityDetails.sortingStatus.replace("_", " ")}
                        </p>
                      </div>

                      {/* PRICE */}
                      <p className="mt-2 text-sm text-gray-800">
                        💰 ₹{l.expectedPrice.minPricePerUnit} – ₹
                        {l.expectedPrice.maxPricePerUnit} / Quintal
                      </p>

                      {/* ADDRESS */}
                      {location && (
                        <p className="mt-2 text-sm text-gray-600">
                          📍 {location.addressLine}, {location.villageOrCity},{" "}
                          {location.district}, {location.state} –{" "}
                          {location.pincode}
                        </p>
                      )}

                      {/* EXPAND DETAILS */}
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === l._id ? null : l._id)
                        }
                        className="mt-3 text-sm text-green-700 underline"
                      >
                        {expandedId === l._id
                          ? "Hide details"
                          : "View full details"}
                      </button>

                      {expandedId === l._id && (
                        <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                          <p>
                            📜 Declaration Accepted:{" "}
                            {l.declarationAccepted ? "Yes" : "No"}
                          </p>
                          <p>Status: {l.status}</p>
                        </div>
                      )}

                      {/* ACTION */}
                      <div className="flex justify-end mt-5">
                        <Link
                          to={`/buyer/harvest-contract/${l._id}`}
                          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800"
                        >
                          Initiate Purchase Contract
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* ================= FARMER DIRECTORY (UNCHANGED LOGIC) ================= */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Available Farmers</h2>
              <p className="text-sm text-gray-600">
                Farmers currently open for pre-harvest contracts
              </p>
            </div>

            {farmers.length === 0 ? (
              <p className="text-gray-500">
                No farmers currently available for contracts.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {farmers.map((f) => (
                  <div
                    key={f._id}
                    className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {f.personal?.fullName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          📍 {f.farm?.farmLocation}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-700">
                      <p>🌾 Land: {f.farm?.landSize || "--"} Acres</p>
                      <p>
                        🛡️ Crop Insurance:{" "}
                        {f.farm?.insurance ? "Available" : "Not Available"}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(f.farm?.cropTypes || []).map((crop, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 mt-5">
                      <Link
                        to={`/buyer/cultivation-contract/${f.userId._id}`}
                        className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
                      >
                        Create Contract
                      </Link>

                      <Link
                        to={`/farmer/${f.userId}/profile`}
                        className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FarmerMarket;
