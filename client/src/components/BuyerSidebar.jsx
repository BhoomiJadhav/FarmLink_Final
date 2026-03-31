import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  BookOpen,
  Headphones,
  LogOut,
} from "lucide-react";
import farmlinkLogo from "../assets/Farmlink_Logo-bg.png";

export default function BuyerSidebar({ onLogout, onSupportClick }) {
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
            Buyer Portal
          </div>
        </div>
      </div>

      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent" />

      {/* NAV */}
      <nav className="mt-6 flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {/* Dashboard */}
        <NavLink to="/buyer/dashboard" className={linkClasses}>
          <LayoutDashboard className="h-5 w-5 text-emerald-400" />
          Dashboard
        </NavLink>

        {/* Farmer Listings */}
        <NavLink to="/buyer/farmers" className={linkClasses}>
          <Users className="h-5 w-5 text-emerald-400" />
          Farmer Listings
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
              <NavLink
                to="/buyer/harvest-contract-tracking"
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
              <NavLink to="/buyer/contracts" className={linkClasses}>
                Pending Sign and Draft Contracts
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
        <NavLink to="/buyer/negotiations" className={linkClasses}>
          <MessageSquare className="h-5 w-5 text-emerald-400" />
          Negotiation
        </NavLink>

        {/* Policy */}
        <NavLink to="/buyer/policy" className={linkClasses}>
          <BookOpen className="h-5 w-5 text-emerald-400" />
          Policy & Regulations
        </NavLink>

        {/* Admin Contact */}
        <button
          onClick={onSupportClick}
          className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 w-full"
        >
          <Headphones className="h-5 w-5 text-emerald-400" />
          Admin Contact
        </button>
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
