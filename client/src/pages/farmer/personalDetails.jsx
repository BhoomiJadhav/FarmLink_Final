// import React, { useState, useEffect } from "react";

// const PersonalDetails = ({ onNext }) => {
//   const [data, setData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     dob: "",
//     governmentId: "",
//     address: "",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setData((prev) => ({
//         ...prev,
//         fullName: storedUser.name || "",
//         email: storedUser.email || "",
//       }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleNextClick = () => {
//     const { fullName, phone, email, dob, governmentId, address } = data;
//     if (!fullName || !phone || !email || !dob || !governmentId || !address) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     localStorage.setItem("personal", JSON.stringify(data));
//     onNext(data);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           name="fullName"
//           value={data.fullName}
//           readOnly
//           className="input border p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
//         />
//         <input
//           name="phone"
//           placeholder="Phone Number"
//           className="input border p-2"
//           onChange={handleChange}
//           value={data.phone}
//         />
//         <input
//           name="email"
//           value={data.email}
//           readOnly
//           className="input border p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
//         />
//         <input
//           name="dob"
//           type="date"
//           className="input border p-2"
//           onChange={handleChange}
//           value={data.dob}
//         />
//         <input
//           name="governmentId"
//           placeholder="Govt ID Number"
//           className="input col-span-2 border p-2"
//           onChange={handleChange}
//           value={data.governmentId}
//         />
//         <textarea
//           name="address"
//           placeholder="Address"
//           className="input col-span-2 border p-2"
//           onChange={handleChange}
//           value={data.address}
//         />
//       </div>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       <button
//         className="bg-green-600 text-white px-4 py-2 rounded mt-4 float-right"
//         onClick={handleNextClick}
//       >
//         Next: Farm Details
//       </button>
//     </div>
//   );
// };

// export default PersonalDetails;
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
  FaMapMarkerAlt,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";

const PersonalDetails = ({ onNext }) => {
  // --- LOGIC SECTION (UNCHANGED) ---
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    governmentId: "",
    address: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setData((prev) => ({
        ...prev,
        fullName: storedUser.name || "",
        email: storedUser.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNextClick = () => {
    const { fullName, phone, email, dob, governmentId, address } = data;
    if (!fullName || !phone || !email || !dob || !governmentId || !address) {
      setError("Please fill in all fields.");
      return;
    }

    localStorage.setItem("personal", JSON.stringify(data));
    onNext(data);
  };
  // --- END LOGIC SECTION ---

  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      {/* Section Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Personal Information
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Please provide your basic details for identity verification.
        </p>
      </div>

      <div className="space-y-6">
        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name (Read Only) */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaUser />
              </div>
              <input
                name="fullName"
                value={data.fullName}
                readOnly
                className="w-full pl-10 pr-10 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <FaLock className="text-xs" />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaPhone />
              </div>
              <input
                name="phone"
                placeholder="Enter 10-digit number"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium placeholder:text-slate-400"
                onChange={handleChange}
                value={data.phone}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Email & DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email (Read Only) */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaEnvelope />
              </div>
              <input
                name="email"
                value={data.email}
                readOnly
                className="w-full pl-10 pr-10 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <FaLock className="text-xs" />
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <FaCalendarAlt />
              </div>
              <input
                name="dob"
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium placeholder:text-slate-400"
                onChange={handleChange}
                value={data.dob}
              />
            </div>
          </div>
        </div>

        {/* Row 3: Government ID */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Government ID Number (Aadhar/PAN)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <FaIdCard />
            </div>
            <input
              name="governmentId"
              placeholder="e.g., XXXX-XXXX-XXXX"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium placeholder:text-slate-400"
              onChange={handleChange}
              value={data.governmentId}
            />
          </div>
        </div>

        {/* Row 4: Address */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Permanent Address
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <FaMapMarkerAlt />
            </div>
            <textarea
              name="address"
              placeholder="Full street address, City, State, Zip Code"
              rows="3"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 font-medium placeholder:text-slate-400 resize-none"
              onChange={handleChange}
              value={data.address}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm animate-pulse">
          ⚠️ {error}
        </div>
      )}

      {/* Action Button */}
      <div className="mt-10 flex justify-end border-t border-slate-100 pt-6">
        <button
          onClick={handleNextClick}
          className="group relative flex items-center justify-center py-3 px-8 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          Next: Farm Details
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
