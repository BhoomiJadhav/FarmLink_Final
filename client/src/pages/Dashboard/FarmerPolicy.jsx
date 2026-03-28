// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";

// const sections = [
//   "intro",
//   "legal",
//   "eligibility",
//   "contract",
//   "responsibilities",
//   "buyer",
//   "payments",
//   "dispute",
//   "privacy",
//   "risk",
//   "termination",
//   "updates",
//   "contact",
// ];

// const Section = ({ id, title, children }) => (
//   <section id={id} className="scroll-mt-24 mb-10">
//     <h2 className="text-xl md:text-2xl font-semibold text-green-700 mb-3">
//       {title}
//     </h2>
//     <div className="text-gray-600 leading-relaxed space-y-2 text-[15px]">
//       {children}
//     </div>
//   </section>
// );

// const NavItem = ({ label, href, active }) => (
//   <a
//     href={href}
//     className={`block text-sm py-1 transition ${
//       {
//         true: "text-green-700 font-semibold",
//         false: "text-gray-500 hover:text-green-700",
//       }[active]
//     }`}
//   >
//     {label}
//   </a>
// );

// const FarmerPolicy = () => {
//   const [activeSection, setActiveSection] = useState("intro");

//   useEffect(() => {
//     const handleScroll = () => {
//       let current = "intro";
//       sections.forEach((id) => {
//         const el = document.getElementById(id);
//         if (el) {
//           const top = el.offsetTop - 120;
//           if (window.scrollY >= top) {
//             current = id;
//           }
//         }
//       });
//       setActiveSection(current);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-[#f6f9f7]">
//       <Sidebar />

//       <div className="flex-1 px-6 py-8 md:px-10">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Content */}
//           <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg p-8 md:p-10">
//             <div className="mb-10">
//               <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
//                 Farmer Policy & Regulations
//               </h1>
//               <p className="text-gray-400 text-sm">
//                 Transparent • Secure • Legally Aligned
//               </p>
//             </div>

//             <Section id="intro" title="1. Introduction">
//               <p>FarmLink enables secure and transparent contract farming.</p>
//             </Section>

//             <Section id="legal" title="2. Legal Framework">
//               <ul className="list-disc ml-6">
//                 <li>Indian Contract Act</li>
//                 <li>IT Act</li>
//               </ul>
//             </Section>

//             <Section id="eligibility" title="3. Farmer Eligibility">
//               <ul className="list-disc ml-6">
//                 <li>18+ age</li>
//                 <li>Valid ID</li>
//               </ul>
//             </Section>

//             <Section id="contract" title="4. Contract Creation">
//               <p>Binding after acceptance.</p>
//             </Section>

//             <Section id="responsibilities" title="5. Responsibilities">
//               <p>Follow contract rules.</p>
//             </Section>

//             <Section id="buyer" title="6. Buyer">
//               <p>Fair practices.</p>
//             </Section>

//             <Section id="payments" title="7. Payments">
//               <p>Mutual pricing.</p>
//             </Section>

//             <Section id="dispute" title="8. Dispute">
//               <p>Resolve via negotiation.</p>
//             </Section>

//             <Section id="privacy" title="9. Privacy">
//               <p>Data is secure.</p>
//             </Section>

//             <Section id="risk" title="10. Risk">
//               <p>Agriculture risks exist.</p>
//             </Section>

//             <Section id="termination" title="11. Termination">
//               <p>Policy violations lead to suspension.</p>
//             </Section>

//             <Section id="updates" title="12. Updates">
//               <p>Policies may change.</p>
//             </Section>

//             <Section id="contact" title="13. Contact">
//               <p>Email: support@farmlink.com</p>
//             </Section>
//           </div>

//           {/* Right Nav */}
//           <div className="hidden lg:block">
//             <div className="sticky top-24 bg-white rounded-2xl shadow p-5 max-h-[80vh] overflow-y-auto">
//               <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                 On this page
//               </h3>
//               <nav className="space-y-1">
//                 <NavItem
//                   label="Introduction"
//                   href="#intro"
//                   active={activeSection === "intro"}
//                 />
//                 <NavItem
//                   label="Legal"
//                   href="#legal"
//                   active={activeSection === "legal"}
//                 />
//                 <NavItem
//                   label="Eligibility"
//                   href="#eligibility"
//                   active={activeSection === "eligibility"}
//                 />
//                 <NavItem
//                   label="Contract"
//                   href="#contract"
//                   active={activeSection === "contract"}
//                 />
//                 <NavItem
//                   label="Responsibilities"
//                   href="#responsibilities"
//                   active={activeSection === "responsibilities"}
//                 />
//                 <NavItem
//                   label="Buyer"
//                   href="#buyer"
//                   active={activeSection === "buyer"}
//                 />
//                 <NavItem
//                   label="Payments"
//                   href="#payments"
//                   active={activeSection === "payments"}
//                 />
//                 <NavItem
//                   label="Dispute"
//                   href="#dispute"
//                   active={activeSection === "dispute"}
//                 />
//                 <NavItem
//                   label="Privacy"
//                   href="#privacy"
//                   active={activeSection === "privacy"}
//                 />
//                 <NavItem
//                   label="Risk"
//                   href="#risk"
//                   active={activeSection === "risk"}
//                 />
//                 <NavItem
//                   label="Termination"
//                   href="#termination"
//                   active={activeSection === "termination"}
//                 />
//                 <NavItem
//                   label="Updates"
//                   href="#updates"
//                   active={activeSection === "updates"}
//                 />
//                 <NavItem
//                   label="Contact"
//                   href="#contact"
//                   active={activeSection === "contact"}
//                 />
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerPolicy;

import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import api from "../../api/axios";
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
  Lock
} from "lucide-react";

export default function FarmerPolicy() {
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeSection, setActiveSection] = useState("1");
  const scrollContainerRef = useRef(null);

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
    { id: "1", label: "1. Introduction" },
    { id: "2", label: "2. Legal Framework" },
    { id: "3", label: "3. Eligibility" },
    { id: "4", label: "4. Contract Creation" },
    { id: "5", label: "5. Responsibilities" },
    { id: "6", label: "6. Buyer Ethics" },
    { id: "7", label: "7. Payments" },
    { id: "8", label: "8. Dispute" },
    { id: "9", label: "9. Privacy" },
    { id: "10", label: "10. Contact" },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Adjusted scroll offset to ensure Topbar doesn't overlap section headers
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      scrollContainerRef.current?.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-[#F4F7F9] overflow-hidden font-sans text-slate-900">
      <Sidebar onLogout={logout} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* TOPBAR - Fixed position via z-index */}
        <div className="flex-shrink-0 z-50">
          <Topbar profileData={profileData} onOpenProfile={() => setShowProfileModal(true)} onLogout={logout} />
        </div>

        {/* Scroll Container */}
        <div className="flex-1 overflow-y-auto relative scroll-smooth pt-4" ref={scrollContainerRef}>
          {/* GREEN GRADIENT HERO HEADER - Match image_11.png exactly */}
          <div className="w-full bg-gradient-to-r from-[#064e3b] to-[#047857] pt-16 pb-28 px-10 relative">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-[44px] font-bold text-white tracking-tight leading-tight font-serif">
                Policy & Regulations
              </h1>
              <p className="text-emerald-50 mt-3 text-[16px] max-w-3xl leading-relaxed font-medium">
                Understand our legal framework designed to protect your harvest, ensure fair payments, and build trusted agricultural partnerships.
              </p>
            </div>
          </div>

          {/* Content Layout - Adjusted margin to not overlap Topbar */}
          <div className="max-w-6xl mx-auto px-10 -mt-16 pb-20 flex gap-8 relative z-20">
            {/* LEFT SIDE: CONTENT */}
            <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl p-12 border border-slate-100 space-y-16">
              
              {/* 1. Introduction */}
              <section id="1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md"><Info size={18} /></div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">1. Introduction</h2>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  FarmLink is a digital ecosystem dedicated to modernizing contract farming. We facilitate direct relationships between farmers and institutional buyers, ensuring that every transaction is grounded in transparency and mutual growth.
                </p>
              </section>

              {/* 2. Legal Framework */}
              <section id="2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md"><Scale size={18} /></div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">2. Legal Framework</h2>
                </div>
                <p className="text-slate-600 text-[15px] mb-6">Our platform operates in strict compliance with current agricultural laws:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[14px] font-medium text-slate-700">Indian Contract Act, 1872</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[14px] font-medium text-slate-700">Information Technology Act, 2000</span>
                  </div>
                </div>
              </section>

              {/* 3. Farmer Eligibility */}
              <section id="3">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 text-[#059669] border border-emerald-100 rounded-md"><UserCheck size={18} /></div>
                  <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">3. Farmer Eligibility</h2>
                </div>
                <div className="bg-[#f0fdfa] border border-emerald-100 p-8 rounded-2xl">
                  <h4 className="text-[#065f46] font-bold text-[13px] uppercase tracking-wider mb-4 font-serif">REQUIRED CREDENTIALS:</h4>
                  <ul className="space-y-3">
                    {["Minimum age of 18 years.", "Valid government-issued identification (Aadhaar/PAN).", "Verified land ownership or legal cultivation rights."].map((text, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-[14px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" /> {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 4. Contract Creation */}
              <section id="4">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md"><FileText size={18} /></div>
                   <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">4. Contract Creation</h2>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  All contracts generated on FarmLink are legally binding documents. Once a farmer accepts a buyer's offer or vice-versa, the terms regarding quantity, quality, and price become irrevocable unless mutually amended.
                </p>
              </section>

              {/* Placeholder sections for scrolling demo */}
              {[
                {id: "5", label: "Responsibilities", icon: Handshake},
                {id: "6", label: "Buyer Ethics", icon: ShieldAlert},
                {id: "7", label: "Payments", icon: CreditCard},
                {id: "8", label: "Dispute", icon: Gavel},
                {id: "9", label: "Privacy", icon: Lock},
              ].map(sec => (
                <section key={sec.id} id={sec.id}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-1.5 bg-[#10b981]/10 text-[#059669] rounded-md"><sec.icon size={18} /></div>
                        <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">{sec.id}. {sec.label}</h2>
                    </div>
                    <p className="text-slate-600 text-[15px] leading-relaxed">Detailed policy content for {sec.label} will be placed here.</p>
                </section>
              ))}

              {/* 10. Contact Support Card */}
              <section id="10" className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-1.5 bg-emerald-50 text-[#059669] border border-emerald-100 rounded-md"><Mail size={18} /></div>
                   <h2 className="text-[24px] font-bold text-[#1a2e1f] font-serif">10. Contact Support</h2>
                </div>
                <div className="bg-[#064e3b] p-8 rounded-2xl flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-white text-lg font-bold">Need legal clarification?</h3>
                    <p className="text-emerald-100 text-[13px] mt-1">Our legal team is available for assistance.</p>
                  </div>
                  <button className="bg-white text-[#064e3b] px-6 py-2.5 rounded-lg font-bold text-[12px] uppercase tracking-wider hover:bg-emerald-50 transition-colors">
                    Email Support
                  </button>
                </div>
              </section>

            </div>

            {/* RIGHT SIDE: ON THIS PAGE */}
            <div className="w-[280px]">
              <div className="sticky top-10 bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">On This Page</h3>
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
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                   <p className="text-[9px] text-slate-400 font-bold uppercase">Last Updated:</p>
                   <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase">March 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} profileData={profileData} />
    </div>
  );
}