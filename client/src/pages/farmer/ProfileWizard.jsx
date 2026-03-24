// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PersonalDetails from "./personalDetails";
// import FarmDetails from "./FarmDetails";
// import Preferences from "./Preference";

// const ProfileWizard = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     personal: {},
//     farm: {},
//     preferences: {},
//   });

//   const handleNext = (data) => {
//     if (step === 1) setFormData((prev) => ({ ...prev, personal: data }));
//     if (step === 2) setFormData((prev) => ({ ...prev, farm: data }));
//     if (step === 3) setFormData((prev) => ({ ...prev, preferences: data }));

//     setStep((prev) => Math.min(prev + 1, 3));
//   };

//   const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

//   const handleSubmit = async (finalData = formData) => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch("http://localhost:5000/api/profile", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(finalData),
//       });

//       if (!response.ok) {
//         throw new Error("Profile submission failed");
//       }

//       await response.json();

//       alert("Profile Completed!");

//       // Update local user state
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           ...JSON.parse(localStorage.getItem("user")),
//           isProfileComplete: true,
//         })
//       );

//       // ✅ Redirect to farmer dashboard
//       navigate("/farmer/dashboard");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to complete profile. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md mt-10">
//       <h1 className="text-2xl font-bold text-center text-green-700">
//         Welcome to AgriConnect
//       </h1>
//       <p className="text-center text-sm mb-6">
//         Please complete your profile to access the full dashboard
//       </p>
//       <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//         <div
//           className="bg-green-600 h-2.5 rounded-full"
//           style={{ width: `${(step - 1) * 43 + 0.1}%` }}
//         ></div>
//       </div>

//       {step === 1 && <PersonalDetails onNext={handleNext} />}
//       {step === 2 && (
//         <FarmDetails
//           formData={formData}
//           setFormData={setFormData}
//           onNext={handleNext}
//           onBack={handleBack}
//         />
//       )}
//       {step === 3 && (
//         <Preferences
//           onBack={handleBack}
//           onSubmit={handleSubmit}
//           setFormData={setFormData}
//           data={formData.preferences}
//         />
//       )}
//     </div>
//   );
// };

// export default ProfileWizard;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSeedling,
  FaSlidersH,
  FaCheck,
  FaChevronLeft,
  FaLeaf,
} from "react-icons/fa";

// Keep imports exactly as they are in your project
import PersonalDetails from "./personalDetails";
import FarmDetails from "./FarmDetails";
import Preferences from "./Preference";

const ProfileWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {},
    farm: {},
    preferences: {},
  });

  // --- LOGIC SECTION (UNCHANGED) ---
  const handleNext = (data) => {
    if (step === 1) setFormData((prev) => ({ ...prev, personal: data }));
    if (step === 2) setFormData((prev) => ({ ...prev, farm: data }));
    if (step === 3) setFormData((prev) => ({ ...prev, preferences: data }));

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (finalData = formData) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Profile submission failed");
      }

      await response.json();
      alert("Profile Completed!");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          isProfileComplete: true,
        }),
      );

      navigate("/farmer/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to complete profile. Please try again.");
    }
  };

  // --- UI CONSTANTS ---
  const steps = [
    { id: 1, label: "Personal", sub: "Basic Info", icon: <FaUser /> },
    { id: 2, label: "Farm Info", sub: "Land & Crop", icon: <FaSeedling /> },
    { id: 3, label: "Preferences", sub: "Settings", icon: <FaSlidersH /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-6 font-sans antialiased relative overflow-hidden">
      {/* 1. Atmospheric Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-900 via-green-800 to-slate-50"></div>
        {/* Abstract shapes for depth */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* 2. Main Glass Card */}
      {/* Increased min-h to 700px for better spacing on desktop */}
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-900/20 border border-white/50 z-10 flex flex-col lg:flex-row overflow-hidden min-h-[700px]">
        {/* 3. Sidebar / Header Section (Visual Anchor) */}
        <div className="lg:w-1/3 bg-gradient-to-br from-emerald-900 to-green-950 p-8 lg:p-12 text-white relative flex flex-col justify-between">
          {/* Decorative Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <FaLeaf className="text-green-400 text-xl" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Agri<span className="text-green-400">Connect</span>
              </h1>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Let's set up <br /> your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-100">
                Profile
              </span>
            </h2>
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              Complete these steps to unlock AI-driven crop insights and connect
              directly with buyers.
            </p>
          </div>

          {/* Vertical Stepper for Desktop, Horizontal for Mobile */}
          <div className="mt-12 relative z-10">
            <div className="space-y-0 lg:space-y-8 flex lg:block justify-between lg:justify-start">
              {steps.map((s, i) => {
                const isActive = step === s.id;
                const isCompleted = step > s.id;

                return (
                  <div
                    key={s.id}
                    className="flex flex-col lg:flex-row items-center lg:items-start group"
                  >
                    {/* Icon Circle */}
                    <div
                      className={`
                      relative z-10 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-all duration-500 border-2
                      ${
                        isActive
                          ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/40 scale-110"
                          : isCompleted
                            ? "bg-emerald-800/50 border-emerald-600 text-emerald-400"
                            : "bg-transparent border-emerald-800 text-emerald-700"
                      }
                    `}
                    >
                      {isCompleted ? <FaCheck className="text-sm" /> : s.icon}
                    </div>

                    {/* Label (Hidden on mobile mostly, styled on desktop) */}
                    <div className="ml-0 lg:ml-4 mt-2 lg:mt-1 text-center lg:text-left">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-white" : "text-emerald-600/60"}`}
                      >
                        Step 0{s.id}
                      </p>
                      <h4
                        className={`text-sm lg:text-lg font-semibold transition-colors duration-300 hidden lg:block ${isActive ? "text-white" : "text-emerald-800"}`}
                      >
                        {s.label}
                      </h4>
                    </div>

                    {/* Connecting Line (Vertical for Desktop) */}
                    {i !== steps.length - 1 && (
                      <div className="hidden lg:block absolute left-6 top-12 w-[2px] h-8 bg-emerald-900/50">
                        <div
                          className="w-full bg-green-500 transition-all duration-700 ease-in-out"
                          style={{ height: step > s.id ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer branding */}
          <div className="hidden lg:block relative z-10 opacity-50 text-[10px] uppercase tracking-widest">
            Powered by ML & Trade Engine
          </div>
        </div>

        {/* 4. Content Section */}
        {/* ADDED overflow-x-hidden here to prevent scrollbar during button animations */}
        <div className="lg:w-2/3 bg-white p-6 lg:p-12 flex flex-col relative overflow-x-hidden">
          {/* Mobile Progress Bar (Visible only on small screens) */}
          <div className="lg:hidden mb-8">
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
              <span>Progress</span>
              <span>{Math.round((step / 3) * 100)}%</span>
            </div>
          </div>

          {/* Navigation Header */}
          <div className="flex justify-between items-center mb-8 h-8">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="group flex items-center text-slate-400 hover:text-emerald-700 transition-colors text-sm font-semibold"
              >
                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center mr-2 transition-colors">
                  <FaChevronLeft className="text-xs" />
                </div>
                Back
              </button>
            ) : (
              <div></div>
            )}

            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {steps[step - 1].label}
              </span>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-grow overflow-y-auto custom-scrollbar px-1">
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
              {step === 1 && <PersonalDetails onNext={handleNext} />}

              {step === 2 && (
                <FarmDetails
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {step === 3 && (
                <Preferences
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  setFormData={setFormData}
                  data={formData.preferences}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWizard;
