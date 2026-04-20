// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/topNav";
// import api from "../../api/axios";
// import { format } from "date-fns";

// /* =========================
//    EDIT MODAL
// ========================= */
// function EditListingModal({ listing, onClose, onSave }) {
//   const [newImages, setNewImages] = useState([]);
//   const [form, setForm] = useState({
//     cropName: listing.harvest.cropName || "",
//     variety: listing.harvest.variety || "",
//     quantityAvailable: listing.harvest.quantityAvailable || "",
//     unit: listing.harvest.unit || "Quintal",
//     harvestedMonth: listing.harvest.harvestedMonth || "",
//     harvestedYear: listing.harvest.harvestedYear || "",

//     minPrice: listing.expectedPrice.minPricePerUnit || "",
//     maxPrice: listing.expectedPrice.maxPricePerUnit || "",

//     addressLine: listing.delivery?.pickupLocation?.addressLine || "",
//     villageOrCity: listing.delivery?.pickupLocation?.villageOrCity || "",
//     district: listing.delivery?.pickupLocation?.district || "",
//     state: listing.delivery?.pickupLocation?.state || "",
//     pincode: listing.delivery?.pickupLocation?.pincode || "",

//     cropCondition: listing.qualityDetails?.cropCondition || "FRESH",
//     moistureLevel: listing.qualityDetails?.moistureLevel || "NOT_TESTED",
//     sortingStatus: listing.qualityDetails?.sortingStatus || "SORTED",

//     images: listing.qualityDetails?.images || [],
//   });
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     onSave({ ...form, newImages });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto px-4 py-6">
//       <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl animate-fadeIn">
//         <div className="space-y-6">
//           {/* 🌾 HARVEST */}
//           <div>
//             <h3 className="font-semibold mb-2">Harvest Details</h3>

//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label>Crop Name</label>
//                 <input
//                   name="cropName"
//                   value={form.cropName}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label>Variety</label>
//                 <input
//                   name="variety"
//                   value={form.variety}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label>Quantity</label>
//                 <input
//                   name="quantityAvailable"
//                   value={form.quantityAvailable}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label>Unit</label>
//                 <input
//                   name="unit"
//                   value={form.unit}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label>Month</label>
//                 <select
//                   name="harvestedMonth"
//                   value={form.harvestedMonth}
//                   onChange={handleChange}
//                   className="input"
//                 >
//                   {[
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                     "July",
//                     "August",
//                     "September",
//                     "October",
//                     "November",
//                     "December",
//                   ].map((m) => (
//                     <option key={m}>{m}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>Year</label>
//                 <input
//                   name="harvestedYear"
//                   value={form.harvestedYear}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 💰 PRICE */}
//           <div>
//             <h3 className="font-semibold mb-2">Pricing</h3>

//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label>Min Price</label>
//                 <input
//                   name="minPrice"
//                   value={form.minPrice}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label>Max Price</label>
//                 <input
//                   name="maxPrice"
//                   value={form.maxPrice}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 📍 LOCATION */}
//           <div>
//             <h3 className="font-semibold mb-2">Pickup Location</h3>

//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 name="addressLine"
//                 placeholder="Address"
//                 value={form.addressLine}
//                 onChange={handleChange}
//                 className="input"
//               />
//               <input
//                 name="villageOrCity"
//                 placeholder="Village/City"
//                 value={form.villageOrCity}
//                 onChange={handleChange}
//                 className="input"
//               />
//               <input
//                 name="district"
//                 placeholder="District"
//                 value={form.district}
//                 onChange={handleChange}
//                 className="input"
//               />
//               <input
//                 name="state"
//                 placeholder="State"
//                 value={form.state}
//                 onChange={handleChange}
//                 className="input"
//               />
//               <input
//                 name="pincode"
//                 placeholder="Pincode"
//                 value={form.pincode}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* 🌿 QUALITY */}
//           <div>
//             <h3 className="font-semibold mb-2">Quality</h3>

//             <div className="grid grid-cols-3 gap-3">
//               <select
//                 name="cropCondition"
//                 value={form.cropCondition}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="FRESH">Fresh</option>
//                 <option value="STORED_LT_1_MONTH">Stored &lt;1 month</option>
//                 <option value="STORED_1_3_MONTHS">Stored 1-3 months</option>
//                 <option value="STORED_GT_3_MONTHS">Stored &gt;3 months</option>
//               </select>

//               <select
//                 name="moistureLevel"
//                 value={form.moistureLevel}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="LOW">Low</option>
//                 <option value="MEDIUM">Medium</option>
//                 <option value="HIGH">High</option>
//                 <option value="NOT_TESTED">Not Tested</option>
//               </select>

//               <select
//                 name="sortingStatus"
//                 value={form.sortingStatus}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="SORTED">Sorted</option>
//                 <option value="PARTIALLY_SORTED">Partially</option>
//                 <option value="NOT_SORTED">Not Sorted</option>
//               </select>
//             </div>
//           </div>

//           {/* 🖼 IMAGES */}
//           {/* 🖼 IMAGES */}
//           <div>
//             <h3 className="font-semibold mb-2">Images</h3>

//             {/* Existing Images */}
//             <div className="flex gap-3 flex-wrap">
//               {form.images.map((img, i) => (
//                 <div key={i} className="relative">
//                   <img src={img} className="w-20 h-20 rounded object-cover" />

//                   {/* DELETE BUTTON */}
//                   <button
//                     onClick={() => {
//                       const updated = form.images.filter(
//                         (_, index) => index !== i,
//                       );
//                       setForm({ ...form, images: updated });
//                     }}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* ADD IMAGE INPUT */}
//             <input
//               type="file"
//               multiple
//               onChange={(e) => {
//                 const files = Array.from(e.target.files);
//                 setNewImages(files);
//               }}
//             />
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="sticky bottom-0 bg-white pt-4 flex justify-end gap-3 mt-6">
//           <button onClick={onClose} className="px-4 py-2 border rounded-lg">
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// /* =========================
//    LISTING CARD
// ========================= */
// function ListingCard({ listing, onDelete, onEdit }) {
//   const createdOn = listing.createdAt
//     ? format(new Date(listing.createdAt), "dd MMM yyyy")
//     : "—";

//   return (
//     <div className="bg-white rounded-2xl border p-6 shadow-sm">
//       <div className="flex justify-between">
//         {/* LEFT */}
//         <div>
//           <h3 className="text-lg font-semibold">{listing.harvest.cropName}</h3>

//           <p className="text-sm text-gray-600">{listing.harvest.variety}</p>

//           <p className="text-sm mt-1">
//             Qty: {listing.harvest.quantityAvailable} {listing.harvest.unit}
//           </p>

//           <p className="text-sm mt-1">
//             ₹{listing.expectedPrice.minPricePerUnit} - ₹
//             {listing.expectedPrice.maxPricePerUnit}
//           </p>

//           <p className="text-xs text-gray-500 mt-2">
//             {listing.delivery?.pickupLocation?.district},{" "}
//             {listing.delivery?.pickupLocation?.state}
//           </p>
//         </div>

//         {/* RIGHT */}
//         <div className="text-right">
//           <p className="text-xs text-gray-400">{createdOn}</p>

//           <div className="flex gap-3 mt-3 justify-end">
//             <button
//               onClick={() => onEdit(listing)}
//               className="text-blue-600 text-sm"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => onDelete(listing._id)}
//               className="text-red-600 text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* IMAGE */}
//       {listing.qualityDetails?.images?.length > 0 && (
//         <img
//           src={listing.qualityDetails.images[0]}
//           className="mt-4 h-32 w-full object-cover rounded"
//         />
//       )}
//     </div>
//   );
// }
// /* =========================
//    MAIN PAGE
// ========================= */
// export default function FarmerHarvestListings() {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingListing, setEditingListing] = useState(null);

//   const fetchListings = () => {
//     api
//       .get("/harvest-listings/farmer/my-listings")
//       .then((res) => {
//         setListings(res.data.listings || []);
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   /* DELETE */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this listing?")) return;

//     try {
//       await api.delete(`/harvest-listings/${id}`);
//       setListings((prev) => prev.filter((l) => l._id !== id));
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   /* OPEN MODAL */
//   const handleEdit = (listing) => {
//     setEditingListing(listing);
//   };

//   /* SAVE EDIT */
//   // const handleSaveEdit = async (form) => {
//   //   try {
//   //     await api.put(`/harvest-listings/${editingListing._id}`, {
//   //       harvest: {
//   //         cropName: form.cropName,
//   //         variety: form.variety,
//   //         quantityAvailable: Number(form.quantityAvailable),
//   //         unit: form.unit,
//   //         harvestedMonth: form.harvestedMonth,
//   //         harvestedYear: Number(form.harvestedYear),
//   //       },
//   //       expectedPrice: {
//   //         minPricePerUnit: Number(form.minPrice),
//   //         maxPricePerUnit: Number(form.maxPrice),
//   //       },
//   //       delivery: {
//   //         pickupLocation: {
//   //           addressLine: form.addressLine,
//   //           villageOrCity: form.villageOrCity,
//   //           district: form.district,
//   //           state: form.state,
//   //           pincode: form.pincode,
//   //         },
//   //       },
//   //       qualityDetails: {
//   //         cropCondition: form.cropCondition,
//   //         moistureLevel: form.moistureLevel,
//   //         sortingStatus: form.sortingStatus,
//   //         images: form.images,
//   //       },
//   //     });

//   //     setEditingListing(null);
//   //     fetchListings();
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Update failed");
//   //   }
//   // };
//   const handleSaveEdit = async (form) => {
//     try {
//       const formData = new FormData();

//       formData.append(
//         "harvest",
//         JSON.stringify({
//           cropName: form.cropName,
//           variety: form.variety,
//           quantityAvailable: Number(form.quantityAvailable),
//           unit: form.unit,
//           harvestedMonth: form.harvestedMonth,
//           harvestedYear: Number(form.harvestedYear),
//         }),
//       );

//       formData.append(
//         "expectedPrice",
//         JSON.stringify({
//           minPricePerUnit: Number(form.minPrice),
//           maxPricePerUnit: Number(form.maxPrice),
//         }),
//       );

//       formData.append(
//         "delivery",
//         JSON.stringify({
//           pickupLocation: {
//             addressLine: form.addressLine,
//             villageOrCity: form.villageOrCity,
//             district: form.district,
//             state: form.state,
//             pincode: form.pincode,
//           },
//         }),
//       );

//       formData.append(
//         "qualityDetails",
//         JSON.stringify({
//           cropCondition: form.cropCondition,
//           moistureLevel: form.moistureLevel,
//           sortingStatus: form.sortingStatus,
//         }),
//       );

//       // ✅ VERY IMPORTANT → existing images (after delete)
//       formData.append("existingImages", JSON.stringify(form.images));

//       // ✅ NEW IMAGES (FILES)
//       form.newImages?.forEach((file) => {
//         formData.append("images", file);
//       });

//       await api.put(`/harvest-listings/${editingListing._id}`, formData);

//       setEditingListing(null);
//       fetchListings();
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };
//   return (
//     <div className="flex min-h-screen bg-[#F5F7F2]">
//       <Sidebar />

//       <main className="flex-1 overflow-y-auto">
//         <Topbar />

//         <section className="px-10 py-6">
//           <h1 className="text-2xl font-semibold text-[#25341F]">
//             My Harvest Listings
//           </h1>

//           <p className="text-sm text-[#7A8A6D] mt-1">
//             Track your crop listings and buyer activity
//           </p>

//           <div className="mt-6">
//             {loading ? (
//               <p>Loading listings...</p>
//             ) : listings.length === 0 ? (
//               <p className="text-gray-500">No listings created yet.</p>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {listings.map((listing) => (
//                   <ListingCard
//                     key={listing._id}
//                     listing={listing}
//                     onDelete={handleDelete}
//                     onEdit={handleEdit}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       {/* EDIT MODAL */}
//       {editingListing && (
//         <EditListingModal
//           listing={editingListing}
//           onClose={() => setEditingListing(null)}
//           onSave={handleSaveEdit}
//         />
//       )}

//       {/* ANIMATION */}
//       <style>
//         {`
//           .input {
//             border: 1px solid #ddd;
//             padding: 8px;
//             border-radius: 8px;
//             width: 100%;
//           }
//         `}
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.95); }
//             to { opacity: 1; transform: scale(1); }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 0.2s ease;
//           }
//         `}
//       </style>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/topNav";
import api from "../../api/axios";
import { format } from "date-fns";
import { useTranslation } from "react-i18next"; // Added for translation

/* =========================
   EDIT MODAL
========================= */
function EditListingModal({ listing, onClose, onSave }) {
  const { t } = useTranslation(); // Initialize translation
  const [newImages, setNewImages] = useState([]);
  const [form, setForm] = useState({
    cropName: listing.harvest.cropName || "",
    variety: listing.harvest.variety || "",
    quantityAvailable: listing.harvest.quantityAvailable || "",
    unit: listing.harvest.unit || "Quintal",
    harvestedMonth: listing.harvest.harvestedMonth || "",
    harvestedYear: listing.harvest.harvestedYear || "",

    minPrice: listing.expectedPrice.minPricePerUnit || "",
    maxPrice: listing.expectedPrice.maxPricePerUnit || "",

    addressLine: listing.delivery?.pickupLocation?.addressLine || "",
    villageOrCity: listing.delivery?.pickupLocation?.villageOrCity || "",
    district: listing.delivery?.pickupLocation?.district || "",
    state: listing.delivery?.pickupLocation?.state || "",
    pincode: listing.delivery?.pickupLocation?.pincode || "",

    cropCondition: listing.qualityDetails?.cropCondition || "FRESH",
    moistureLevel: listing.qualityDetails?.moistureLevel || "NOT_TESTED",
    sortingStatus: listing.qualityDetails?.sortingStatus || "SORTED",

    images: listing.qualityDetails?.images || [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...form, newImages });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto px-4 py-6">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl animate-fadeIn">
        <div className="space-y-6">
          {/* 🌾 HARVEST */}
          <div>
            <h3 className="font-semibold mb-2">{t("cropDetails")}</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>{t("cropName")}</label>
                <input
                  name="cropName"
                  value={form.cropName}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label>{t("Variety")}</label>
                <input
                  name="variety"
                  value={form.variety}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label>{t("quantity")}</label>
                <input
                  name="quantityAvailable"
                  value={form.quantityAvailable}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label>{t("unit") || "Unit"}</label>
                <input
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label>{t("HarvestMonth")}</label>
                <select
                  name="harvestedMonth"
                  value={form.harvestedMonth}
                  onChange={handleChange}
                  className="input"
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((m) => (
                    <option key={m} value={m}>
                      {t(m.toLowerCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>{t("HarvestYear")}</label>
                <input
                  name="harvestedYear"
                  value={form.harvestedYear}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* 💰 PRICE */}
          <div>
            <h3 className="font-semibold mb-2">{t("expectedPricing")}</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>{t("minPrice")}</label>
                <input
                  name="minPrice"
                  value={form.minPrice}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label>{t("maxPrice")}</label>
                <input
                  name="maxPrice"
                  value={form.maxPrice}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* 📍 LOCATION */}
          <div>
            <h3 className="font-semibold mb-2">{t("PickupLocation")}</h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="addressLine"
                placeholder={t("addressLine")}
                value={form.addressLine}
                onChange={handleChange}
                className="input"
              />
              <input
                name="villageOrCity"
                placeholder={t("villageorcity")}
                value={form.villageOrCity}
                onChange={handleChange}
                className="input"
              />
              <input
                name="district"
                placeholder={t("District")}
                value={form.district}
                onChange={handleChange}
                className="input"
              />
              <input
                name="state"
                placeholder={t("State")}
                value={form.state}
                onChange={handleChange}
                className="input"
              />
              <input
                name="pincode"
                placeholder={t("pinCode")}
                value={form.pincode}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* 🌿 QUALITY */}
          <div>
            <h3 className="font-semibold mb-2">{t("QualityDetails")}</h3>

            <div className="grid grid-cols-3 gap-3">
              <select
                name="cropCondition"
                value={form.cropCondition}
                onChange={handleChange}
                className="input"
              >
                <option value="FRESH">{t("fresh")}</option>
                <option value="STORED_LT_1_MONTH">{t("stored1moth")}</option>
                <option value="STORED_1_3_MONTHS">{t("stored3moth")}</option>
                <option value="STORED_GT_3_MONTHS">{t("stored>3moth")}</option>
              </select>

              <select
                name="moistureLevel"
                value={form.moistureLevel}
                onChange={handleChange}
                className="input"
              >
                <option value="LOW">{t("low")}</option>
                <option value="MEDIUM">{t("medium")}</option>
                <option value="HIGH">{t("high")}</option>
                <option value="NOT_TESTED">{t("nottested")}</option>
              </select>

              <select
                name="sortingStatus"
                value={form.sortingStatus}
                onChange={handleChange}
                className="input"
              >
                <option value="SORTED">{t("sorted")}</option>
                <option value="PARTIALLY_SORTED">
                  {t("Partially_sorted")}
                </option>
                <option value="NOT_SORTED">{t("Not_sorted")}</option>
              </select>
            </div>
          </div>

          {/* 🖼 IMAGES */}
          <div>
            <h3 className="font-semibold mb-2">{t("cropImage")}</h3>

            {/* Existing Images */}
            <div className="flex gap-3 flex-wrap">
              {form.images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-20 h-20 rounded object-cover" />
                  <button
                    onClick={() => {
                      const updated = form.images.filter(
                        (_, index) => index !== i,
                      );
                      setForm({ ...form, images: updated });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setNewImages(files);
              }}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="sticky bottom-0 bg-white pt-4 flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            {t("cancel") || "Cancel"}
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            {t("saveChanges") || "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   LISTING CARD
========================= */
function ListingCard({ listing, onDelete, onEdit }) {
  const { t } = useTranslation();
  const createdOn = listing.createdAt
    ? format(new Date(listing.createdAt), "dd MMM yyyy")
    : "—";

  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm">
      <div className="flex justify-between">
        {/* LEFT */}
        <div>
          <h3 className="text-lg font-semibold">{listing.harvest.cropName}</h3>
          <p className="text-sm text-gray-600">{listing.harvest.variety}</p>
          <p className="text-sm mt-1">
            {t("quantity")}: {listing.harvest.quantityAvailable}{" "}
            {listing.harvest.unit}
          </p>
          <p className="text-sm mt-1">
            ₹{listing.expectedPrice.minPricePerUnit} - ₹
            {listing.expectedPrice.maxPricePerUnit}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {listing.delivery?.pickupLocation?.district},{" "}
            {listing.delivery?.pickupLocation?.state}
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-right">
          <p className="text-xs text-gray-400">{createdOn}</p>
          <div className="flex gap-3 mt-3 justify-end">
            <button
              onClick={() => onEdit(listing)}
              className="text-blue-600 text-sm"
            >
              {t("edit") || "Edit"}
            </button>
            <button
              onClick={() => onDelete(listing._id)}
              className="text-red-600 text-sm"
            >
              {t("delete") || "Delete"}
            </button>
          </div>
        </div>
      </div>

      {listing.qualityDetails?.images?.length > 0 && (
        <img
          src={listing.qualityDetails.images[0]}
          className="mt-4 h-32 w-full object-cover rounded"
        />
      )}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function FarmerHarvestListings() {
  const { t, i18n } = useTranslation();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingListing, setEditingListing] = useState(null);

  const fetchListings = () => {
    api
      .get("/harvest-listings/farmer/my-listings")
      .then((res) => {
        setListings(res.data.listings || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirmDelete") || "Delete this listing?")) return;
    try {
      await api.delete(`/harvest-listings/${id}`);
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
  };

  const handleSaveEdit = async (form) => {
    try {
      const formData = new FormData();
      formData.append(
        "harvest",
        JSON.stringify({
          cropName: form.cropName,
          variety: form.variety,
          quantityAvailable: Number(form.quantityAvailable),
          unit: form.unit,
          harvestedMonth: form.harvestedMonth,
          harvestedYear: Number(form.harvestedYear),
        }),
      );
      formData.append(
        "expectedPrice",
        JSON.stringify({
          minPricePerUnit: Number(form.minPrice),
          maxPricePerUnit: Number(form.maxPrice),
        }),
      );
      formData.append(
        "delivery",
        JSON.stringify({
          pickupLocation: {
            addressLine: form.addressLine,
            villageOrCity: form.villageOrCity,
            district: form.district,
            state: form.state,
            pincode: form.pincode,
          },
        }),
      );
      formData.append(
        "qualityDetails",
        JSON.stringify({
          cropCondition: form.cropCondition,
          moistureLevel: form.moistureLevel,
          sortingStatus: form.sortingStatus,
        }),
      );
      formData.append("existingImages", JSON.stringify(form.images));
      form.newImages?.forEach((file) => {
        formData.append("images", file);
      });

      await api.put(`/harvest-listings/${editingListing._id}`, formData);
      setEditingListing(null);
      fetchListings();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F2]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Topbar />
        <section className="px-10 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-[#25341F]">
                {t("myHarvestListings")}
              </h1>
              <p className="text-sm text-[#7A8A6D] mt-1">
                {t("trackListings") ||
                  "Track your crop listings and buyer activity"}
              </p>
            </div>

            {/* Language Switcher */}
          </div>

          <div className="mt-6">
            {loading ? (
              <p>{t("loading") || "Loading listings..."}</p>
            ) : listings.length === 0 ? (
              <p className="text-gray-500">{t("noListings")}</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {editingListing && (
        <EditListingModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onSave={handleSaveEdit}
        />
      )}

      <style>
        {`
          .input {
            border: 1px solid #ddd;
            padding: 8px;
            border-radius: 8px;
            width: 100%;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease;
          }
        `}
      </style>
    </div>
  );
}
