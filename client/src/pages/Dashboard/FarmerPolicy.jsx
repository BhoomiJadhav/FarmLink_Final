// import React, { useEffect, useState, useRef } from "react";
// import Sidebar from "../../components/Sidebar.jsx";
// import Topbar from "../../components/topNav.jsx";
// import ProfileModal from "../../components/profileModal.jsx";
// import BuyerSidebar from "../../components/BuyerSidebar";
// import api from "../../api/axios";
// import {
//   Info,
//   Scale,
//   UserCheck,
//   FileText,
//   ShieldCheck,
//   Mail,
//   CheckCircle2,
//   Handshake,
//   ShieldAlert,
//   CreditCard,
//   Gavel,
//   Lock,
// } from "lucide-react";

// export default function FarmerPolicy() {
//   const [profileData, setProfileData] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [activeSection, setActiveSection] = useState("1");
//   const scrollContainerRef = useRef(null);
//   const isFarmer = profileData?.user?.role === "farmer";
//   useEffect(() => {
//     async function loadProfile() {
//       try {
//         const res = await api.get("/profile/me");
//         setProfileData(res.data);
//       } catch (err) {
//         console.error("Profile load failed:", err);
//       }
//     }
//     loadProfile();
//   }, []);

//   const navItems = [
//     { id: "1", label: "1. Introduction" },
//     { id: "2", label: "2. Legal Framework" },
//     { id: "3", label: "3. Eligibility" },
//     { id: "4", label: "4. Contract Creation" },
//     { id: "5", label: "5. Responsibilities" },
//     { id: "6", label: "6. Buyer Ethics" },
//     { id: "7", label: "7. Payments" },
//     { id: "8", label: "8. Dispute" },
//     { id: "9", label: "9. Privacy" },
//     { id: "10", label: "10. Contact" },
//   ];

//   const scrollToSection = (id) => {
//     setActiveSection(id);
//     const element = document.getElementById(id);
//     if (element) {
//       // Adjusted scroll offset to ensure Topbar doesn't overlap section headers
//       const offset = 80;
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       scrollContainerRef.current?.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
//       {isFarmer ? (
//         <Sidebar onLogout={logout} />
//       ) : (
//         <BuyerSidebar onLogout={logout} />
//       )}

//       <main className="flex-1 flex flex-col relative overflow-hidden">
//         {/* TOPBAR - Fixed position via z-index */}
//         <div className="flex-shrink-0 z-50">
//           <Topbar
//             profileData={profileData}
//             onOpenProfile={() => setShowProfileModal(true)}
//             onLogout={logout}
//           />
//         </div>

//         {/* Scroll Container */}
//         <div
//           className="flex-1 overflow-y-auto relative scroll-smooth pt-4"
//           ref={scrollContainerRef}
//         >
//           {/* GREEN GRADIENT HERO HEADER - Match image_11.png exactly */}
//           <div className="w-full bg-gradient-to-r from-[#064e3b] to-[#047857] pt-16 pb-28 px-10 relative">
//             <div className="max-w-6xl mx-auto">
//               <h1 className="text-[44px] font-bold text-white tracking-tight leading-tight font-serif">
//                 <h1 className="text-[44px] font-bold text-white">
//                   {isFarmer
//                     ? "Farmer Policy & Regulations"
//                     : "Buyer Policy & Regulations"}
//                 </h1>
//               </h1>
//               <p className="text-emerald-50 mt-3 text-[16px] max-w-3xl">
//                 {isFarmer
//                   ? "Understand policies that protect your harvest, ensure fair pricing, and secure farmer rights."
//                   : "Understand policies governing procurement, payments, and ethical sourcing from farmers."}
//               </p>
//             </div>
//           </div>

//           {/* Content Layout - Adjusted margin to not overlap Topbar */}
//           <div className="max-w-6xl mx-auto px-10 -mt-16 pb-20 flex gap-8 relative z-20">
//             {/* LEFT SIDE: CONTENT */}
//             <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl p-12 border border-slate-100 space-y-16">
//               {/* 1. Introduction */}
//               <section id="1">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
//                     <Info size={18} />
//                   </div>
//                   <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
//                     1. Introduction
//                   </h2>
//                 </div>
//                 <p className="text-slate-600 text-[15px] leading-relaxed">
//                   FarmLink is a digital ecosystem dedicated to modernizing
//                   contract farming. We facilitate direct relationships between
//                   farmers and institutional buyers, ensuring that every
//                   transaction is grounded in transparency and mutual growth.
//                 </p>
//               </section>

//               {/* 2. Legal Framework */}
//               <section id="2">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
//                     <Scale size={18} />
//                   </div>
//                   <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
//                     2. Legal Framework
//                   </h2>
//                 </div>
//                 <p className="text-slate-600 text-[15px] mb-6">
//                   Our platform operates in strict compliance with current
//                   agricultural laws:
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
//                     <CheckCircle2 size={16} className="text-emerald-500" />
//                     <span className="text-[14px] font-medium text-slate-700">
//                       Indian Contract Act, 1872
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
//                     <CheckCircle2 size={16} className="text-emerald-500" />
//                     <span className="text-[14px] font-medium text-slate-700">
//                       Information Technology Act, 2000
//                     </span>
//                   </div>
//                 </div>
//               </section>

//               {/* 3. Farmer Eligibility */}
//               <section id="3">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-1.5 bg-emerald-50 text-[#059669] border border-emerald-100 rounded-md">
//                     <UserCheck size={18} />
//                   </div>
//                   <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
//                     <h2>
//                       {isFarmer
//                         ? "3. Farmer Eligibility"
//                         : "3. Buyer Eligibility"}
//                     </h2>
//                   </h2>
//                 </div>
//                 <div className="bg-[#f0fdfa] border border-emerald-100 p-8 rounded-2xl">
//                   <h4 className="text-[#065f46] font-bold text-[13px] uppercase tracking-wider mb-4 font-serif">
//                     REQUIRED CREDENTIALS:
//                   </h4>
//                   <ul className="space-y-3">
//                     {(isFarmer
//                       ? [
//                           "Minimum age of 18 years",
//                           "Valid ID proof",
//                           "Land ownership proof",
//                         ]
//                       : [
//                           "Registered business entity",
//                           "Valid GST / PAN",
//                           "Verified payment credentials",
//                         ]
//                     ).map((text, i) => (
//                       <li key={i}>{text}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </section>

//               {/* 4. Contract Creation */}
//               <section id="4">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
//                     <FileText size={18} />
//                   </div>
//                   <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
//                     4. Contract Creation
//                   </h2>
//                 </div>
//                 <p className="text-slate-600 text-[15px] leading-relaxed">
//                   All contracts generated on FarmLink are legally binding
//                   documents. Once a farmer accepts a buyer's offer or
//                   vice-versa, the terms regarding quantity, quality, and price
//                   become irrevocable unless mutually amended.
//                 </p>
//               </section>

//               {/* Placeholder sections for scrolling demo */}
//               {[
//                 { id: "5", label: "Responsibilities", icon: Handshake },
//                 { id: "6", label: "Buyer Ethics", icon: ShieldAlert },
//                 { id: "7", label: "Payments", icon: CreditCard },
//                 { id: "8", label: "Dispute", icon: Gavel },
//                 { id: "9", label: "Privacy", icon: Lock },
//               ].map((sec) => (
//                 <section key={sec.id} id={sec.id}>
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
//                       <sec.icon size={18} />
//                     </div>
//                     <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
//                       {sec.id}. {sec.label}
//                     </h2>
//                   </div>
//                   <p className="text-slate-600 text-[15px] leading-relaxed">
//                     Detailed policy content for {sec.label} will be placed here.
//                   </p>
//                 </section>
//               ))}

//               {/* 10. Contact Support Card */}
//               <section id="10" className="pt-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-1.5 bg-emerald-50 text-[#059669] border border-emerald-100 rounded-md">
//                     <Mail size={18} />
//                   </div>
//                   <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
//                     10. Contact Support
//                   </h2>
//                 </div>
//                 <div className="bg-[#064e3b] p-8 rounded-2xl flex items-center justify-between shadow-lg">
//                   <div>
//                     <h3 className="text-white text-lg font-bold">
//                       Need legal clarification?
//                     </h3>
//                     <p className="text-emerald-100 text-[13px] mt-1">
//                       Our legal team is available for assistance.
//                     </p>
//                   </div>
//                   <button className="bg-white text-[#064e3b] px-6 py-2.5 rounded-lg font-bold text-[12px] uppercase tracking-wider hover:bg-emerald-50 transition-colors">
//                     Email Support
//                   </button>
//                 </div>
//               </section>
//             </div>

//             {/* RIGHT SIDE: ON THIS PAGE */}
//             <div className="w-[280px]">
//               <div className="sticky top-10 bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100">
//                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
//                   On This Page
//                 </h3>
//                 <nav className="flex flex-col gap-1">
//                   {navItems.map((item) => (
//                     <button
//                       key={item.id}
//                       onClick={() => scrollToSection(item.id)}
//                       className={`text-left px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
//                         activeSection === item.id
//                           ? "bg-[#ecfdf5] text-[#059669] font-bold"
//                           : "text-slate-500 hover:bg-slate-50"
//                       }`}
//                     >
//                       {item.label}
//                     </button>
//                   ))}
//                 </nav>
//                 <div className="mt-10 pt-8 border-t border-slate-50 text-center">
//                   <p className="text-[9px] text-slate-400 font-bold uppercase">
//                     Last Updated:
//                   </p>
//                   <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase">
//                     March 2026
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         profileData={profileData}
//       />
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import BuyerSidebar from "../../components/BuyerSidebar";
import api from "../../api/axios";
import { useTranslation } from "react-i18next"; // <-- Added Translation Hook
import {
  Info,
  Scale,
  UserCheck,
  FileText,
  ShieldCheck,
  Mail,
  CheckCircle2,
  Handshake,
  ShieldAlert,
  CreditCard,
  Gavel,
  Lock,
} from "lucide-react";

export default function FarmerPolicy() {
  const { t, i18n } = useTranslation(); // <-- Initialized Translator
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeSection, setActiveSection] = useState("1");
  const scrollContainerRef = useRef(null);
  const isFarmer = profileData?.user?.role === "farmer";

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/profile/me");
        setProfileData(res.data);
      } catch (err) {
        console.error("Profile load failed:", err);
      }
    }
    loadProfile();
  }, []);

  const navItems = [
    { id: "1", labelKey: "policyNavIntro" },
    { id: "2", labelKey: "policyNavLegal" },
    { id: "3", labelKey: "policyNavEligibility" },
    { id: "4", labelKey: "policyNavCreation" },
    { id: "5", labelKey: "policyNavResponsibilities" },
    { id: "6", labelKey: "policyNavBuyerEthics" },
    { id: "7", labelKey: "policyNavPayments" },
    { id: "8", labelKey: "policyNavDispute" },
    { id: "9", labelKey: "policyNavPrivacy" },
    { id: "10", labelKey: "policyNavContact" },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      scrollContainerRef.current?.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
      {isFarmer ? (
        <Sidebar onLogout={logout} />
      ) : (
        <BuyerSidebar onLogout={logout} />
      )}

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* TOPBAR - Fixed position via z-index */}
        <div className="flex-shrink-0 z-50">
          <Topbar
            profileData={profileData}
            onOpenProfile={() => setShowProfileModal(true)}
            onLogout={logout}
          />
        </div>

        {/* Scroll Container */}
        <div
          className="flex-1 overflow-y-auto relative scroll-smooth pt-4"
          ref={scrollContainerRef}
        >
          {/* GREEN GRADIENT HERO HEADER */}
          <div className="w-full bg-gradient-to-r from-[#064e3b] to-[#047857] pt-16 pb-28 px-10 relative">
            <div className="max-w-6xl mx-auto relative">
              {/* Language Switcher */}
              <div className="absolute right-0 top-0 flex bg-black/20 p-1 rounded-xl backdrop-blur-sm border border-white/10">
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    i18n.language === "en"
                      ? "bg-white text-[#064e3b] shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage("hi")}
                  className={`px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    i18n.language === "hi"
                      ? "bg-white text-[#064e3b] shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => i18n.changeLanguage("mar")}
                  className={`px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    i18n.language === "mr"
                      ? "bg-white text-[#064e3b] shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  मराठी
                </button>
              </div>

              <h1 className="text-[44px] font-bold text-white mt-10">
                {isFarmer
                  ? t("policyHeroTitleFarmer")
                  : t("policyHeroTitleBuyer")}
              </h1>
              <p className="text-emerald-50 mt-3 text-[16px] max-w-3xl">
                {isFarmer
                  ? t("policyHeroDescFarmer")
                  : t("policyHeroDescBuyer")}
              </p>
            </div>
          </div>

          {/* Content Layout */}
          <div className="max-w-6xl mx-auto px-10 -mt-16 pb-20 flex gap-8 relative z-20">
            {/* LEFT SIDE: CONTENT */}
            <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl p-12 border border-slate-100 space-y-16">
              {/* 1. Introduction */}
              <section id="1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
                    <Info size={18} />
                  </div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
                    {t("policyNavIntro")}
                  </h2>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  {t("policySec1Desc")}
                </p>
              </section>

              {/* 2. Legal Framework */}
              <section id="2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
                    <Scale size={18} />
                  </div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
                    {t("policyNavLegal")}
                  </h2>
                </div>
                <p className="text-slate-600 text-[15px] mb-6">
                  {t("policySec2Desc")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[14px] font-medium text-slate-700">
                      {t("policySec2Law1")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[14px] font-medium text-slate-700">
                      {t("policySec2Law2")}
                    </span>
                  </div>
                </div>
              </section>

              {/* 3. Eligibility */}
              <section id="3">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 text-[#059669] border border-emerald-100 rounded-md">
                    <UserCheck size={18} />
                  </div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
                    {isFarmer
                      ? t("policySec3TitleFarmer")
                      : t("policySec3TitleBuyer")}
                  </h2>
                </div>
                <div className="bg-[#f0fdfa] border border-emerald-100 p-8 rounded-2xl">
                  <h4 className="text-[#065f46] font-bold text-[13px] uppercase tracking-wider mb-4 font-serif">
                    {t("policySec3ReqCreds")}
                  </h4>
                  <ul className="space-y-3">
                    {(isFarmer
                      ? [
                          t("policySec3F1"),
                          t("policySec3F2"),
                          t("policySec3F3"),
                        ]
                      : [
                          t("policySec3B1"),
                          t("policySec3B2"),
                          t("policySec3B3"),
                        ]
                    ).map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 4. Contract Creation */}
              <section id="4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
                    <FileText size={18} />
                  </div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
                    {t("policyNavCreation")}
                  </h2>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  {t("policySec4Desc")}
                </p>
              </section>

              {/* Placeholder sections 5-9 */}
              {[
                {
                  id: "5",
                  labelKey: "policyNavResponsibilities",
                  descKey: "policySec5Desc",
                  icon: Handshake,
                },
                {
                  id: "6",
                  labelKey: "policyNavBuyerEthics",
                  descKey: "policySec6Desc",
                  icon: ShieldAlert,
                },
                {
                  id: "7",
                  labelKey: "policyNavPayments",
                  descKey: "policySec7Desc",
                  icon: CreditCard,
                },
                {
                  id: "8",
                  labelKey: "policyNavDispute",
                  descKey: "policySec8Desc",
                  icon: Gavel,
                },
                {
                  id: "9",
                  labelKey: "policyNavPrivacy",
                  descKey: "policySec9Desc",
                  icon: Lock,
                },
              ].map((sec) => (
                <section key={sec.id} id={sec.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md">
                      <sec.icon size={18} />
                    </div>
                    <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
                      {t(sec.labelKey)}
                    </h2>
                  </div>
                  <p className="text-slate-600 text-[15px] leading-relaxed">
                    {t(sec.descKey)}
                  </p>
                </section>
              ))}

              {/* 10. Contact Support */}
              <section id="10" className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 text-[#059669] border border-emerald-100 rounded-md">
                    <Mail size={18} />
                  </div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">
                    {t("policyNavContact")}
                  </h2>
                </div>
                <div className="bg-[#064e3b] p-8 rounded-2xl flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-white text-lg font-bold">
                      {t("policySec10Help")}
                    </h3>
                    <p className="text-emerald-100 text-[13px] mt-1">
                      {t("policySec10Team")}
                    </p>
                  </div>
                  <button className="bg-white text-[#064e3b] px-6 py-2.5 rounded-lg font-bold text-[12px] uppercase tracking-wider hover:bg-emerald-50 transition-colors">
                    {t("policySec10Btn")}
                  </button>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE: ON THIS PAGE */}
            <div className="w-[280px]">
              <div className="sticky top-10 bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                  {t("policyOnThisPage")}
                </h3>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                        activeSection === item.id
                          ? "bg-[#ecfdf5] text-[#059669] font-bold"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {t(item.labelKey)}
                    </button>
                  ))}
                </nav>
                <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">
                    {t("policyLastUpdated")}
                  </p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase">
                    {t("policyMonthYear")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />
    </div>
  );
}
