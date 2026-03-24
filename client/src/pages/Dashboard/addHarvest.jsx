// import React, { useState } from "react";

// const API_BASE = "http://localhost:5000/api";

// const AddHarvestListing = () => {
//   const [form, setForm] = useState({
//     cropName: "",
//     variety: "",
//     quantityAvailable: "",
//     harvestedMonth: "",
//     harvestedYear: "",

//     cropCondition: "",
//     sortingStatus: "",
//     moistureLevel: "NOT_TESTED",

//     minPrice: "",
//     maxPrice: "",

//     addressLine: "",
//     villageOrCity: "",
//     district: "",
//     state: "",
//     pincode: "",

//     declarationAccepted: false,
//   });

//   const [images, setImages] = useState([]);
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 5) {
//       alert("You can upload a maximum of 5 images");
//       return;
//     }
//     setImages(files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.declarationAccepted) {
//       alert("Please accept the declaration to continue");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Authentication required");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const formData = new FormData();

//       formData.append(
//         "harvest",
//         JSON.stringify({
//           cropName: form.cropName,
//           variety: form.variety,
//           quantityAvailable: Number(form.quantityAvailable),
//           harvestedMonth: form.harvestedMonth,
//           harvestedYear: Number(form.harvestedYear),
//         }),
//       );

//       formData.append(
//         "qualityDetails",
//         JSON.stringify({
//           cropCondition: form.cropCondition,
//           sortingStatus: form.sortingStatus,
//           moistureLevel: form.moistureLevel,
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

//       formData.append("declarationAccepted", form.declarationAccepted);

//       images.forEach((img) => {
//         formData.append("images", img);
//       });
//       console.log("TOKEN:", token);

//       const res = await fetch(`${API_BASE}/harvest-listings/create`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Harvest listing added successfully");
//       } else {
//         alert(data.message || "Failed to add listing");
//       }
//     } catch (error) {
//       alert("Server error while creating listing");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-6">Add Harvested Crop</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* ===== CROP DETAILS ===== */}
//         <input
//           name="cropName"
//           placeholder="Crop Name"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="variety"
//           placeholder="Variety (optional)"
//           onChange={handleChange}
//         />

//         <input
//           name="quantityAvailable"
//           type="number"
//           placeholder="Quantity (Quintal)"
//           onChange={handleChange}
//           required
//         />

//         <select name="harvestedMonth" onChange={handleChange} required>
//           <option value="">Harvest Month</option>
//           {[
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ].map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>

//         <input
//           name="harvestedYear"
//           type="number"
//           placeholder="Harvest Year (e.g. 2025)"
//           onChange={handleChange}
//           required
//         />

//         {/* ===== QUALITY DETAILS ===== */}
//         <select name="cropCondition" onChange={handleChange} required>
//           <option value="">Crop Condition</option>
//           <option value="FRESH">Freshly Harvested</option>
//           <option value="STORED_LT_1_MONTH">Stored (≤ 1 month)</option>
//           <option value="STORED_1_3_MONTHS">Stored (1–3 months)</option>
//           <option value="STORED_GT_3_MONTHS">Stored (&gt; 3 months)</option>
//         </select>

//         <select name="sortingStatus" onChange={handleChange} required>
//           <option value="">Sorting Status</option>
//           <option value="SORTED">Cleaned & Sorted</option>
//           <option value="PARTIALLY_SORTED">Partially Sorted</option>
//           <option value="NOT_SORTED">Not Sorted</option>
//         </select>

//         <select name="moistureLevel" onChange={handleChange}>
//           <option value="NOT_TESTED">Moisture Not Tested</option>
//           <option value="LOW">Low</option>
//           <option value="MEDIUM">Medium</option>
//           <option value="HIGH">High</option>
//         </select>

//         {/* ===== PRICE ===== */}
//         <input
//           name="minPrice"
//           type="number"
//           placeholder="Min Price / Quintal"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="maxPrice"
//           type="number"
//           placeholder="Max Price / Quintal"
//           onChange={handleChange}
//           required
//         />

//         {/* ===== PICKUP LOCATION ===== */}
//         <input
//           name="addressLine"
//           placeholder="Address / Landmark"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="villageOrCity"
//           placeholder="Village / City"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="district"
//           placeholder="District"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="state"
//           placeholder="State"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="pincode"
//           placeholder="Pincode"
//           maxLength={6}
//           onChange={handleChange}
//           required
//         />

//         {/* ===== IMAGE UPLOAD ===== */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Upload Crop Images (Max 5)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//         </div>

//         {/* ===== DECLARATION ===== */}
//         <label className="flex items-start gap-2 text-sm">
//           <input
//             type="checkbox"
//             name="declarationAccepted"
//             checked={form.declarationAccepted}
//             onChange={handleChange}
//           />
//           <span>
//             I declare that the information provided above is true. I understand
//             buyers may inspect the crop at pickup and mismatches may affect the
//             contract.
//           </span>
//         </label>

//         <button
//           type="submit"
//           disabled={submitting}
//           className="bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-60"
//         >
//           {submitting ? "Publishing..." : "Publish Listing"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddHarvestListing;
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const API_BASE = "http://localhost:5000/api";

const AddHarvestListing = () => {
  const [form, setForm] = useState({
    cropName: "",
    variety: "",
    quantityAvailable: "",
    harvestedMonth: "",
    harvestedYear: "",
    cropCondition: "",
    sortingStatus: "",
    moistureLevel: "NOT_TESTED",
    minPrice: "",
    maxPrice: "",
    addressLine: "",
    villageOrCity: "",
    district: "",
    state: "",
    pincode: "",
    declarationAccepted: false,
  });

  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) return alert("Max 5 images");
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.declarationAccepted) return alert("Please accept declaration");

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append(
        "harvest",
        JSON.stringify({
          cropName: form.cropName,
          variety: form.variety,
          quantityAvailable: Number(form.quantityAvailable),
          harvestedMonth: form.harvestedMonth,
          harvestedYear: Number(form.harvestedYear),
        }),
      );

      formData.append(
        "qualityDetails",
        JSON.stringify({
          cropCondition: form.cropCondition,
          sortingStatus: form.sortingStatus,
          moistureLevel: form.moistureLevel,
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

      images.forEach((img) => formData.append("images", img));

      const res = await fetch(`${API_BASE}/harvest-listings/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      alert(data.success ? "Success ✅" : data.message);
    } catch {
      alert("Error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition";

  return (
    <div className="flex bg-[#f6f5f2] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-800">
            Add Harvest Listing
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            List your harvested crops and connect with buyers faster
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1️⃣ Crop Details */}
          <Section title="Crop Details" step="1">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="cropName"
                placeholder="Crop Name"
                className={inputStyle}
                onChange={handleChange}
                required
              />
              <input
                name="variety"
                placeholder="Variety"
                className={inputStyle}
                onChange={handleChange}
              />
              <input
                name="quantityAvailable"
                type="number"
                placeholder="Quantity (kg)"
                className={inputStyle}
                onChange={handleChange}
                required
              />

              <select
                name="harvestedMonth"
                className={inputStyle}
                onChange={handleChange}
                required
              >
                <option value="">Harvest Month</option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <input
                name="harvestedYear"
                placeholder="Year"
                className={inputStyle}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* 2️⃣ Quality */}
          <Section title="Quality Details" step="2">
            <div className="grid md:grid-cols-3 gap-4">
              <select
                name="cropCondition"
                className={inputStyle}
                onChange={handleChange}
              >
                <option value="">Condition</option>
                <option value="FRESH">Fresh</option>
                <option value="STORED">Stored</option>
              </select>

              <select
                name="sortingStatus"
                className={inputStyle}
                onChange={handleChange}
              >
                <option value="">Sorting</option>
                <option>SORTED</option>
                <option>PARTIAL</option>
                <option>NOT_SORTED</option>
              </select>

              <select
                name="moistureLevel"
                className={inputStyle}
                onChange={handleChange}
              >
                <option>NOT_TESTED</option>
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>
          </Section>

          {/* 3️⃣ Pricing */}
          <Section title="Pricing" step="3">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="minPrice"
                type="number"
                placeholder="Min Price ₹"
                className={inputStyle}
                onChange={handleChange}
              />
              <input
                name="maxPrice"
                type="number"
                placeholder="Max Price ₹"
                className={inputStyle}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* 4️⃣ Location */}
          <Section title="Pickup Location" step="4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="addressLine"
                placeholder="Address"
                className={inputStyle}
                onChange={handleChange}
              />
              <input
                name="villageOrCity"
                placeholder="City"
                className={inputStyle}
                onChange={handleChange}
              />
              <input
                name="district"
                placeholder="District"
                className={inputStyle}
                onChange={handleChange}
              />
              <input
                name="state"
                placeholder="State"
                className={inputStyle}
                onChange={handleChange}
              />
              <input
                name="pincode"
                placeholder="Pincode"
                className={inputStyle}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* 5️⃣ Images */}
          <Section title="Images" step="5">
            <div className="border-2 border-dashed rounded-xl p-6 text-center bg-slate-50">
              <input type="file" multiple onChange={handleImageChange} />
              <p className="text-sm text-slate-500 mt-2">
                Upload up to 5 images
              </p>
            </div>
          </Section>

          {/* Declaration */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm">
            <label className="flex gap-2">
              <input
                type="checkbox"
                name="declarationAccepted"
                onChange={handleChange}
              />
              I confirm the information is correct.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.01] transition"
          >
            {submitting ? "Publishing..." : "Publish Listing"}
          </button>
        </form>
      </main>
    </div>
  );
};

/* SECTION COMPONENT */
function Section({ title, step, children }) {
  return (
    <div className="relative pl-10">
      {/* LEFT TIMELINE */}
      <div className="absolute left-0 top-2 flex flex-col items-center">
        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-semibold">
          {step}
        </div>
        <div className="w-[2px] h-full bg-slate-200 mt-2"></div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-base font-semibold text-slate-800 mb-4">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default AddHarvestListing;
