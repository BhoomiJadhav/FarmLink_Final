// import React, { useState } from "react";

// const Preferences = ({ onBack, onSubmit, setFormData, data }) => {
//   const [prefs, setPrefs] = useState({
//     interests: (data && data.interests) || [],
//     communication: (data && data.communication) || "",
//     language: (data && data.language) || "",
//     additionalInfo: (data && data.additionalInfo) || "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setPrefs((prev) => ({
//         ...prev,
//         interests: checked
//           ? [...prev.interests, value]
//           : prev.interests.filter((i) => i !== value),
//       }));
//     } else {
//       setPrefs({ ...prefs, [name]: value });
//     }
//   };

//   const handleFormSubmit = () => {
//     if (!prefs.communication || !prefs.language || !prefs.interests.length) {
//       alert("Please complete all required preference fields.");
//       return;
//     }

//     setFormData((prev) => {
//       const updated = { ...prev, preferences: prefs };
//       console.log("Updated formData with preferences:", updated);
//       onSubmit(updated); // ✅ pass updated object
//       return updated;
//     });
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>

//       <div className="grid grid-cols-2 gap-4">
//         {[
//           "Market Prices",
//           "Training",
//           "Weather Updates",
//           "Loans",
//           "Govt. Schemes",
//           "Equipment",
//         ].map((item) => (
//           <label key={item}>
//             <input
//               type="checkbox"
//               value={item}
//               checked={(prefs.interests || []).includes(item)}
//               onChange={handleChange}
//             />{" "}
//             {item}
//           </label>
//         ))}
//       </div>

//       <select
//         name="communication"
//         value={prefs.communication || ""}
//         onChange={handleChange}
//         className="input mt-4 w-full"
//       >
//         <option value="">Select communication preference</option>
//         <option value="SMS">SMS</option>
//         <option value="Email">Email</option>
//         <option value="Whatsapp">Whatsapp</option>
//       </select>

//       <select
//         name="language"
//         value={prefs.language || ""}
//         onChange={handleChange}
//         className="input mt-4 w-full"
//       >
//         <option value="">Select preferred language</option>
//         <option value="English">English</option>
//         <option value="Hindi">Hindi</option>
//         <option value="Marathi">Marathi</option>
//       </select>

//       <textarea
//         name="additionalInfo"
//         placeholder="Additional information"
//         value={prefs.additionalInfo || ""}
//         onChange={handleChange}
//         className="input mt-4 w-full"
//       />

//       <div className="flex justify-between mt-6">
//         <button className="btn-green" onClick={onBack}>
//           Back
//         </button>
//         <button className="btn-green" onClick={handleFormSubmit}>
//           Complete Profile & Go to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Preferences;
import React, { useState } from "react";
import {
  FaChartLine,
  FaChalkboardTeacher,
  FaCloudSun,
  FaMoneyBillWave,
  FaLandmark,
  FaTractor,
  FaEnvelope,
  FaGlobe,
  FaCommentDots,
  FaCheck,
  FaArrowLeft,
  FaRocket,
} from "react-icons/fa";

const Preferences = ({ onBack, onSubmit, setFormData, data }) => {
  // --- LOGIC SECTION (UNCHANGED) ---
  const [prefs, setPrefs] = useState({
    interests: (data && data.interests) || [],
    communication: (data && data.communication) || "",
    language: (data && data.language) || "",
    additionalInfo: (data && data.additionalInfo) || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setPrefs((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value),
      }));
    } else {
      setPrefs({ ...prefs, [name]: value });
    }
  };

  const handleFormSubmit = () => {
    if (!prefs.communication || !prefs.language || !prefs.interests.length) {
      alert("Please complete all required preference fields.");
      return;
    }

    setFormData((prev) => {
      const updated = { ...prev, preferences: prefs };
      console.log("Updated formData with preferences:", updated);
      onSubmit(updated);
      return updated;
    });
  };

  // --- UI HELPER: Icon Mapping ---
  const getInterestIcon = (item) => {
    switch (item) {
      case "Market Prices":
        return <FaChartLine />;
      case "Training":
        return <FaChalkboardTeacher />;
      case "Weather Updates":
        return <FaCloudSun />;
      case "Loans":
        return <FaMoneyBillWave />;
      case "Govt. Schemes":
        return <FaLandmark />;
      case "Equipment":
        return <FaTractor />;
      default:
        return <FaCheck />;
    }
  };

  return (
    // Added overflow-x-hidden and padding to ensure no layout shifts
    <div className="w-full max-w-3xl mx-auto pb-12 overflow-x-hidden px-1">
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Preferences</h2>
        <p className="text-slate-500 text-sm mt-1">
          Customize your experience and notification settings.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Interests (Grid Cards) */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            I am interested in...{" "}
            <span className="text-slate-400 font-normal normal-case">
              (Select at least one)
            </span>
          </label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Market Prices",
              "Training",
              "Weather Updates",
              "Loans",
              "Govt. Schemes",
              "Equipment",
            ].map((item) => {
              const isSelected = (prefs.interests || []).includes(item);
              return (
                <label
                  key={item}
                  className={`
                    relative cursor-pointer group flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                    ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 shadow-md transform scale-[1.02]"
                        : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-sm"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    value={item}
                    checked={isSelected}
                    onChange={handleChange}
                    className="absolute opacity-0 w-0 h-0"
                  />

                  <div
                    className={`text-2xl mb-2 transition-colors ${isSelected ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-400"}`}
                  >
                    {getInterestIcon(item)}
                  </div>

                  <span
                    className={`text-sm font-semibold text-center ${isSelected ? "text-emerald-900" : "text-slate-600"}`}
                  >
                    {item}
                  </span>

                  {/* Checkmark Badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm animate-in zoom-in duration-200">
                      <FaCheck />
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 2: Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Communication Dropdown */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Communication Channel
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaEnvelope />
              </div>
              <select
                name="communication"
                value={prefs.communication || ""}
                onChange={handleChange}
                className="appearance-none w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium cursor-pointer"
              >
                <option value="">Select Preference</option>
                <option value="SMS">SMS (Text)</option>
                <option value="Email">Email</option>
                <option value="Whatsapp">Whatsapp</option>
              </select>
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Preferred Language
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaGlobe />
              </div>
              <select
                name="language"
                value={prefs.language || ""}
                onChange={handleChange}
                className="appearance-none w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium cursor-pointer"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Text Area */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Additional Information
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <FaCommentDots />
            </div>
            <textarea
              name="additionalInfo"
              placeholder="Any specific requirements or notes?"
              value={prefs.additionalInfo || ""}
              onChange={handleChange}
              rows="3"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium resize-none"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-10 flex flex-col-reverse md:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4 md:gap-0">
        <button
          onClick={onBack}
          className="w-full md:w-auto flex items-center justify-center px-6 py-3 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-semibold transition-all duration-200"
        >
          <FaArrowLeft className="mr-2 text-sm" /> Back
        </button>

        {/* Changed hover:scale-105 to hover:-translate-y-1 to fix scrollbar issue */}
        <button
          onClick={handleFormSubmit}
          className="w-full md:w-auto flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-200 transform-gpu"
        >
          <FaRocket className="mr-2" /> Complete Profile
        </button>
      </div>
    </div>
  );
};

export default Preferences;
