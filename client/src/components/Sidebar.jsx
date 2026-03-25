// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileText,
//   MessageSquare,
//   CheckCircle2,
//   BookOpen,
//   Headphones,
//   LogOut,
// } from "lucide-react";
// import farmlinkLogo from "../assets/Farmlink_Logo-bg.png";
// // 1. Define the nav items
// const navItems = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/farmer/dashboard" },
//   { label: "Harvest crop", icon: LayoutDashboard, to: "/farmer/harvest-crop" },
//   { label: "My Contracts", icon: FileText, to: "/farmer/contracts" },
//   {
//     label: "Harvest Contracts",
//     icon: FileText,
//     to: "/farmer/harvest-contracts",
//   },
//   {
//     label: "Track Harvest Contracts",
//     icon: FileText,
//     to: "/farmer/harvest-contract-tracking/",
//   },
//   { label: "Negotiation", icon: MessageSquare, to: "/farmer/negotiations" },
//   { label: "Accepted Deals", icon: CheckCircle2, to: "/farmer/accepted" },
//   { label: "Policy & Regulations", icon: BookOpen, to: "/farmer/policy" },
//   { label: "Admin Contact", icon: Headphones, to: "/farmer/admin" },
// ];

// export default function Sidebar({ onLogout }) {
//   return (
//     <>
//       {/* 2. Style tag to hide scrollbar across browsers */}
//       <style>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;  /* Firefox */
//         }
//       `}</style>

//       <aside className="w-72 h-screen bg-gradient-to-b from-emerald-900 via-green-950 to-slate-950 text-white flex flex-col flex-shrink-0 border-r border-emerald-800/30 shadow-2xl relative z-20">
//         {/* Header / Logo Section */}
//         <div className="px-6 pt-8 pb-6 flex items-center gap-3">
//           <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white to-green-100 flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/20 border border-emerald-400/20">
//             <img
//               src={farmlinkLogo}
//               alt="Farmlink Logo"
//               className="w-12 h-12 object-contain"
//             />
//           </div>
//           <div>
//             <div className="text-2xl font-bold leading-tight tracking-tight text-white">
//               Farm<span className="text-emerald-400">Link</span>
//             </div>
//             <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80 mt-1">
//               Farmer Portal
//             </div>
//           </div>
//         </div>

//         {/* Decorative Separator */}
//         <div className="mx-6 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent" />

//         {/* Navigation Links */}
//         {/* Added 'no-scrollbar' class here */}
//         <nav className="mt-6 flex-1 space-y-2 px-4 overflow-y-auto no-scrollbar pb-4">
//           {navItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 end={item.to === "/"}
//                 className={({ isActive }) => {
//                   const baseClasses =
//                     "relative w-full block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden";

//                   // Special Gold Logic (Preserved)
//                   if (isActive && item.to === "/") {
//                     return `${baseClasses} bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 text-yellow-200 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]`;
//                   }

//                   // Standard Active State
//                   if (isActive) {
//                     return `${baseClasses} bg-gradient-to-r from-emerald-500/20 to-green-600/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] translate-x-1`;
//                   }

//                   // Inactive State
//                   return `${baseClasses} text-slate-400 hover:text-white hover:bg-white/5 hover:border-emerald-500/10 border border-transparent`;
//                 }}
//               >
//                 {({ isActive }) => (
//                   <div className="flex items-center gap-3 relative z-10">
//                     <Icon
//                       className={`h-5 w-5 transition-colors duration-300 ${isActive ? (item.to === "/" ? "text-yellow-400" : "text-emerald-400") : "text-slate-500 group-hover:text-emerald-300"}`}
//                     />

//                     <span
//                       className={`font-semibold text-base tracking-wide ${isActive ? "text-white" : ""}`}
//                     >
//                       {item.label}
//                     </span>

//                     {/* Subtle Arrow on Hover */}
//                     {!isActive && (
//                       <div className="absolute right-0 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-emerald-500">
//                         →
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* Footer / Logout Section */}
//         <div className="mt-auto bg-black/20 backdrop-blur-sm p-4 border-t border-emerald-800/30">
//           <button
//             onClick={onLogout}
//             className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-400 text-sm font-semibold transition-all duration-300 hover:bg-red-500/10 hover:text-red-300 hover:shadow-lg hover:shadow-red-900/20 border border-transparent hover:border-red-500/20 group"
//           >
//             <div className="p-1.5 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
//               <LogOut className="h-5 w-5" />
//             </div>
//             <span className="text-base">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sprout,
  FileText,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  BookOpen,
  Headphones,
  LogOut,
} from "lucide-react";
import farmlinkLogo from "../assets/Farmlink_Logo-bg.png";

export default function Sidebar({ onLogout }) {
  const [openMenus, setOpenMenus] = useState({
    harvestContracts: false,
    cultivationContracts: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
      isActive
        ? "bg-gradient-to-r from-emerald-500/20 to-green-600/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] translate-x-1"
        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
    }`;

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-emerald-900 via-green-950 to-slate-950 text-white flex flex-col border-r border-emerald-800/30 shadow-2xl">
      {/* LOGO */}
      <div className="px-6 pt-8 pb-6 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white to-green-100 flex items-center justify-center shadow-lg">
          <img src={farmlinkLogo} alt="logo" />
        </div>
        <div>
          <div className="text-2xl font-bold">
            Farm<span className="text-emerald-400">Link</span>
          </div>
          <div className="text-[10px] uppercase text-emerald-500">
            Farmer Portal
          </div>
        </div>
      </div>

      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent" />

      {/* NAV */}
      <nav className="mt-6 flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {/* Dashboard */}
        <NavLink to="/farmer/dashboard" className={linkClasses}>
          <LayoutDashboard className="h-5 w-5 text-emerald-400" />
          Dashboard
        </NavLink>

        {/* Harvest */}
        <NavLink to="/farmer/harvest-crop" className={linkClasses}>
          <Sprout className="h-5 w-5 text-emerald-400" />
          Add Harvest Listing
        </NavLink>

        {/* Harvest Contracts */}
        <div>
          <button
            onClick={() => toggleMenu("harvestContracts")}
            className="w-full flex items-center justify-between px-4 py-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-emerald-400" />
              Harvest Contracts
            </div>
            {openMenus.harvestContracts ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenus.harvestContracts && (
            <div className="ml-6 space-y-1">
              <NavLink to="/farmer/harvest-contracts" className={linkClasses}>
                Active Contracts
              </NavLink>

              <NavLink
                to="/farmer/harvest-contract-tracking"
                className={linkClasses}
              >
                Track Contracts
              </NavLink>
            </div>
          )}
        </div>

        {/* Cultivation Contracts */}
        <div>
          <button
            onClick={() => toggleMenu("cultivationContracts")}
            className="w-full flex items-center justify-between px-4 py-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-emerald-400" />
              Cultivation Contracts
            </div>
            {openMenus.cultivationContracts ? (
              <ChevronDown />
            ) : (
              <ChevronRight />
            )}
          </button>

          {openMenus.cultivationContracts && (
            <div className="ml-6 space-y-1">
              <NavLink to="/farmer/contracts" className={linkClasses}>
                My Contracts
              </NavLink>

              <NavLink
                to="/cultivation/contract-tracking"
                className={linkClasses}
              >
                Track Contracts
              </NavLink>
            </div>
          )}
        </div>

        {/* Negotiation */}
        <NavLink to="/farmer/negotiations" className={linkClasses}>
          <MessageSquare className="h-5 w-5 text-emerald-400" />
          Negotiation
        </NavLink>

        {/* Policy */}
        <NavLink to="/farmer/policy" className={linkClasses}>
          <BookOpen className="h-5 w-5 text-emerald-400" />
          Policy & Regulations
        </NavLink>

        {/* Admin */}
        <NavLink to="/farmer/admin" className={linkClasses}>
          <Headphones className="h-5 w-5 text-emerald-400" />
          Admin Contact
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-emerald-800/30">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
