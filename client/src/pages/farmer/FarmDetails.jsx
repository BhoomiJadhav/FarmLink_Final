// import React, { useState, useEffect } from "react";

// const FarmDetails = ({
//   formData = {},
//   setFormData = () => {},
//   onBack = () => {},
//   onNext = () => {},
// }) => {
//   const [data, setData] = useState({
//     farmSize: "",
//     farmLocation: "",
//     cropTypes: [],
//     irrigation: "",
//     machinery: "",
//     fertilizers: "",
//   });

//   // Pre-fill if data exists
//   useEffect(() => {
//     if (formData?.farm) {
//       setData({
//         ...formData.farm,
//         farmSize: formData.farm.farmSize || "",
//         farmLocation: formData.farm.farmLocation || "",
//         cropTypes: Array.isArray(formData.farm.cropTypes)
//           ? formData.farm.cropTypes
//           : [],
//         irrigation: formData.farm.irrigation || "",
//         machinery: formData.farm.machinery || "",
//         fertilizers: formData.farm.fertilizers || "",
//       });
//     }
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setData((prev) => ({
//         ...prev,
//         cropTypes: checked
//           ? [...prev.cropTypes, value]
//           : prev.cropTypes.filter((crop) => crop !== value),
//       }));
//     } else {
//       setData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleNext = () => {
//     const { farmSize, farmLocation, irrigation } = data;
//     if (!farmSize || !farmLocation || !data.cropTypes.length || !irrigation) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setFormData((prev) => ({ ...prev, farm: data }));
//     localStorage.setItem("farm", JSON.stringify(data));
//     onNext(data);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Farm Details</h2>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium">Farm Size (in acres)</label>
//         <input
//           type="number"
//           name="farmSize"
//           value={data.farmSize || ""}
//           onChange={handleChange}
//           className="input w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium">Farm Location</label>
//         <input
//           type="text"
//           name="farmLocation"
//           value={data.farmLocation || ""}
//           onChange={handleChange}
//           className="input w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Types of Crops</label>
//         <div className="grid grid-cols-2 gap-2">
//           {[
//             "Wheat",
//             "Rice",
//             "Sugarcane",
//             "Cotton",
//             "Soybean",
//             "Vegetables",
//           ].map((crop) => (
//             <label key={crop} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 value={crop}
//                 checked={(data.cropTypes || []).includes(crop)}
//                 onChange={handleChange}
//               />
//               <span>{crop}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium">Irrigation Type</label>
//         <select
//           name="irrigation"
//           value={data.irrigation || ""}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="">Select</option>
//           <option value="Canal">Canal</option>
//           <option value="Drip">Drip</option>
//           <option value="Sprinkler">Sprinkler</option>
//           <option value="Rainfed">Rainfed</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium">Machinery Used</label>
//         <input
//           type="text"
//           name="machinery"
//           value={data.machinery || ""}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block mb-1 font-medium">Fertilizers Used</label>
//         <input
//           type="text"
//           name="fertilizers"
//           value={data.fertilizers || ""}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div className="flex justify-between">
//         <button
//           className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
//           onClick={onBack}
//         >
//           Back
//         </button>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded"
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FarmDetails;
import React, { useState, useEffect } from "react";
import {
  FaRulerCombined,
  FaMapMarkerAlt,
  FaTractor,
  FaFlask,
  FaWater,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import {
  GiWheat,
  GiCorn,
  GiCottonFlower,
  GiSugarCane,
  GiPlantRoots,
} from "react-icons/gi";

const FarmDetails = ({
  formData = {},
  setFormData = () => {},
  onBack = () => {},
  onNext = () => {},
}) => {
  const [data, setData] = useState({
    farmSize: "",
    farmLocation: "",
    cropTypes: [],
    irrigation: "",
    machinery: "",
    fertilizers: "",
  });

  // --- LOGIC SECTION (UNCHANGED) ---
  useEffect(() => {
    if (formData?.farm) {
      setData({
        ...formData.farm,
        farmSize: formData.farm.farmSize || "",
        farmLocation: formData.farm.farmLocation || "",
        cropTypes: Array.isArray(formData.farm.cropTypes)
          ? formData.farm.cropTypes
          : [],
        irrigation: formData.farm.irrigation || "",
        machinery: formData.farm.machinery || "",
        fertilizers: formData.farm.fertilizers || "",
      });
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData((prev) => ({
        ...prev,
        cropTypes: checked
          ? [...prev.cropTypes, value]
          : prev.cropTypes.filter((crop) => crop !== value),
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    const { farmSize, farmLocation, irrigation } = data;
    if (!farmSize || !farmLocation || !data.cropTypes.length || !irrigation) {
      alert("Please fill in all required fields.");
      return;
    }

    setFormData((prev) => ({ ...prev, farm: data }));
    localStorage.setItem("farm", JSON.stringify(data));
    onNext(data);
  };

  const getCropIcon = (crop) => {
    switch (crop) {
      case "Wheat":
        return <GiWheat />;
      case "Rice":
        return <GiPlantRoots />;
      case "Sugarcane":
        return <GiSugarCane />;
      case "Cotton":
        return <GiCottonFlower />;
      case "Soybean":
        return <span className="text-xs font-bold">SOY</span>;
      default:
        return <GiCorn />;
    }
  };

  return (
    // ADDED pb-12 here: Adds padding at the bottom so the hover animation has space
    <div className="w-full max-w-3xl mx-auto pb-12">
      {/* Section Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Farm Details</h2>
        <p className="text-slate-500 text-sm mt-1">
          Tell us about your land and cultivation practices.
        </p>
      </div>

      <div className="space-y-6">
        {/* Row 1: Size & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Farm Size{" "}
              <span className="text-emerald-500 normal-case">(Acres)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaRulerCombined />
              </div>
              <input
                type="number"
                name="farmSize"
                value={data.farmSize || ""}
                onChange={handleChange}
                placeholder="e.g. 5.5"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Farm Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                name="farmLocation"
                value={data.farmLocation || ""}
                onChange={handleChange}
                placeholder="District, State"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Crop Types */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Primary Crops{" "}
            <span className="text-slate-400 font-normal normal-case">
              (Select all that apply)
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Wheat",
              "Rice",
              "Sugarcane",
              "Cotton",
              "Soybean",
              "Vegetables",
            ].map((crop) => {
              const isSelected = (data.cropTypes || []).includes(crop);
              return (
                <label
                  key={crop}
                  className={`
                    relative cursor-pointer flex items-center justify-center space-x-2 p-3 rounded-xl border transition-all duration-200 select-none
                    ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 shadow-sm"
                        : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    value={crop}
                    checked={isSelected}
                    onChange={handleChange}
                    className="absolute opacity-0 w-0 h-0"
                  />
                  <span
                    className={`text-lg ${isSelected ? "text-emerald-600" : "text-slate-400"}`}
                  >
                    {getCropIcon(crop)}
                  </span>
                  <span
                    className={`font-semibold text-sm ${isSelected ? "text-emerald-800" : "text-slate-600"}`}
                  >
                    {crop}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-emerald-500 text-[10px]">
                      <FaCheck />
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Row 3: Irrigation */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Irrigation Method
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <FaWater />
            </div>
            <select
              name="irrigation"
              value={data.irrigation || ""}
              onChange={handleChange}
              className="appearance-none w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium cursor-pointer"
            >
              <option value="" disabled>
                Select Source
              </option>
              <option value="Canal">Canal System</option>
              <option value="Drip">Drip Irrigation</option>
              <option value="Sprinkler">Sprinkler System</option>
              <option value="Rainfed">Rainfed (Natural)</option>
            </select>
          </div>
        </div>

        {/* Row 4: Machinery & Fertilizers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Machinery
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaTractor />
              </div>
              <input
                type="text"
                name="machinery"
                value={data.machinery || ""}
                onChange={handleChange}
                placeholder="e.g. Tractor, Harvester"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Fertilizers
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaFlask />
              </div>
              <input
                type="text"
                name="fertilizers"
                value={data.fertilizers || ""}
                onChange={handleChange}
                placeholder="e.g. Urea, DAP"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons - Adjusted styles to be smoother */}
      <div className="mt-10 flex justify-between items-center pt-6 border-t border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-semibold transition-all duration-200"
        >
          <FaArrowLeft className="mr-2 text-sm" /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-[#70B62D] to-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-transform duration-200 transform-gpu"
        >
          Next Step <FaArrowRight className="ml-2 text-sm" />
        </button>
      </div>
    </div>
  );
};

export default FarmDetails;
