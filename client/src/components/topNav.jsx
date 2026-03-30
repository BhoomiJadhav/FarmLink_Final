// // src/components/Topbar.jsx
// import React, { useState, useEffect } from "react";

// import { Bell, ChevronDown, User } from "lucide-react";
// import NotificationPopup from "./NotificationPopup";

// export default function Topbar({
//   profileData = null,
//   notifications = [],
//   onSearch = null,
//   onLogout = null,
//   onOpenProfile = null,
// }) {
//   const [search, setSearch] = useState("");

//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [openNotif, setOpenNotif] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   useEffect(() => {
//     if (!notifications) return;
//     const unread = notifications.filter((n) => !n.read).length;
//     setUnreadCount(unread);
//   }, [notifications]);

//   function handleSearchChange(e) {
//     const v = e.target.value;
//     setSearch(v);
//     if (typeof onSearch === "function") onSearch(v);
//   }

//   function toggleProfileMenu() {
//     setShowProfileMenu((v) => !v);
//     // close notifications when opening profile menu
//     if (!showProfileMenu) setOpenNotif(false);
//   }

//   const displayName = profileData?.user?.name || "Unknown";
//   const displayRole = profileData?.user?.role || "";

//   return (
//     <header className="h-20 flex items-center px-10 border-b border-[#E1E4D9] bg-[#F5F7F2] relative z-10">
//       <div className="flex-1 flex justify-center">
//         <div className="w-full max-w-xl">
//           <div className="relative">
//             <input
//               value={search}
//               onChange={handleSearchChange}
//               className="w-full rounded-full bg-[#E5EDE4] border border-transparent pl-10 pr-5 py-2.5 text-sm placeholder:text-[#94A38A] focus:outline-none focus:ring-2 focus:ring-[#B5D184]"
//               placeholder="Search contracts, crops..."
//             />
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A38A] text-sm">
//               🔍
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-6">
//         <div className="relative">
//           <div className="relative">
//             <button
//               onClick={() => setOpenNotif((o) => !o)}
//               className="relative p-2 rounded-full hover:bg-gray-100"
//             >
//               <Bell size={18} />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                   {unreadCount}
//                 </span>
//               )}
//             </button>

//             <NotificationPopup
//               open={openNotif}
//               onClose={() => setOpenNotif(false)}
//             />
//           </div>
//         </div>

//         <div className="relative">
//           <button
//             onClick={toggleProfileMenu}
//             className="flex items-center gap-3 rounded-full px-2 py-1 hover:bg-[#E5EFE0] transition-colors"
//             aria-label="Profile menu"
//           >
//             <div className="h-9 w-9 rounded-full bg-emerald-300 overflow-hidden flex items-center justify-center text-sm font-semibold">
//               {profileData?.user?.name
//                 ? profileData.user.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                 : "?"}
//             </div>
//             <div className="text-right">
//               <div className="text-sm font-semibold text-[#314028]">
//                 {displayName}
//               </div>
//               <div className="text-xs text-[#86947B]">{displayRole}</div>
//             </div>
//             <ChevronDown className="h-3.5 w-3.5 text-[#86947B]" />
//           </button>

//           {showProfileMenu && (
//             <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border border-[#E2E8D8] z-30">
//               <div className="px-4 py-3 border-b border-[#E2E8D8]">
//                 <div className="flex items-center gap-3">
//                   <div className="h-9 w-9 rounded-full bg-emerald-300 flex items-center justify-center text-sm font-semibold">
//                     {profileData?.user?.name
//                       ? profileData.user.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")
//                       : "?"}
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-[#314028]">
//                       {displayName}
//                     </p>
//                     <p className="text-xs text-[#86947B]">
//                       {profileData?.user?.email || ""}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-3 text-xs text-[#6B7280]">
//                   <div>
//                     Phone: {profileData?.profile?.personal?.phone || "-"}
//                   </div>
//                   <div>
//                     Location: {profileData?.profile?.farm?.farmLocation || "-"}
//                   </div>
//                   <div>
//                     Insurance:{" "}
//                     {profileData?.profile?.insurance?.provider
//                       ? `${profileData.profile.insurance.provider} (${profileData.profile.insurance.policyNumber})`
//                       : "Not set"}
//                   </div>
//                 </div>
//               </div>

//               <div className="py-2">
//                 <button
//                   onClick={() => {
//                     setShowProfileMenu(false);
//                     if (typeof onOpenProfile === "function") onOpenProfile();
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#374532] hover:bg-[#F7FAF3]"
//                 >
//                   <User className="h-4 w-4" /> View Profile
//                 </button>

//                 <button
//                   onClick={() => {
//                     setShowProfileMenu(false);
//                     if (typeof onLogout === "function") onLogout();
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#374532] hover:bg-[#F7FAF3]"
//                 >
//                   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
//                     {/* placeholder icon if lucide not desired */}
//                   </svg>
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
// src/components/Topbar.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  ChevronDown,
  User,
  Search,
  LogOut,
  MapPin,
  Phone,
  ShieldCheck,
  Settings,
  CalendarDays,
} from "lucide-react";
import NotificationPopup from "./NotificationPopup";

export default function Topbar({
  profileData = null,
  notifications = [],
  onSearch = null,
  onLogout = null,
  onOpenProfile = null,
}) {
  const [prevCount, setPrevCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [latestNotif, setLatestNotif] = useState(null);

  // 🔊 Audio object
  // const notificationSound = new Audio("../assets/sounds/notification.mp3");
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // State to hold user data retrieved from localStorage if props fail
  const [backupProfile, setBackupProfile] = useState(null);

  // Frontend-only date for display utility
  const [currentDate, setCurrentDate] = useState(new Date());
  const audioRef = useRef(null);
  // --- FIX: Auto-fetch user from LocalStorage if profileData is missing ---
  useEffect(() => {
    audioRef.current = new Audio("/sounds/notification.mp3");
  }, []);
  useEffect(() => {
    if (!profileData || !profileData.user) {
      try {
        const storedUser =
          localStorage.getItem("user") || localStorage.getItem("userInfo");
        const storedProfile =
          localStorage.getItem("profile") ||
          localStorage.getItem("userProfile");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const parsedProfile = storedProfile ? JSON.parse(storedProfile) : {};

          if (parsedUser.user || parsedUser.role) {
            setBackupProfile(
              parsedUser.user
                ? parsedUser
                : { user: parsedUser, profile: parsedProfile },
            );
          } else {
            setBackupProfile({
              user: parsedUser,
              profile: parsedProfile,
            });
          }
        }
      } catch (error) {
        console.warn(
          "Topbar: Could not restore user session from storage.",
          error,
        );
      }
    }
  }, [profileData]);

  // Determine which data source to use
  const activeData = profileData?.user ? profileData : backupProfile;
  console.log("TOPBAR FINAL DATA:", activeData);
  useEffect(() => {
    if (!notifications) return;

    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);

    // 🔥 Detect new notification
    if (notifications.length > prevCount) {
      const newNotif = notifications[0];

      setLatestNotif(newNotif);
      setShowToast(true);

      // 🔊 PLAY SOUND
      audioRef.current?.play().catch(() => {});
      setTimeout(() => setShowToast(false), 4000);
    }

    setPrevCount(notifications.length);
  }, [notifications]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  function handleSearchChange(e) {
    const v = e.target.value;
    setSearch(v);
    if (typeof onSearch === "function") onSearch(v);
  }

  function toggleProfileMenu() {
    setShowProfileMenu((v) => !v);
    if (!showProfileMenu) setOpenNotif(false);
  }

  // --- HELPER: Capitalize First Letter of Each Word ---
  const formatName = (name) => {
    if (!name) return "Guest User";
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "U";
  };

  // Extract and Format Data
  const rawName = activeData?.user?.name || activeData?.name || "Guest User";
  const displayName = formatName(rawName); // Applies the capitalization
  const userInitials = getInitials(displayName);

  const displayRole = activeData?.user?.role || activeData?.role || "Visitor";
  const displayEmail =
    activeData?.user?.email || activeData?.email || "No Email";

  const displayPhone =
    activeData?.profile?.personal?.phone || activeData?.phone || "No Phone";
  const displayLocation =
    activeData?.profile?.personal?.address ||
    activeData?.user?.address ||
    "No Location";
  const displayInsurance =
    activeData?.profile?.insurance?.provider || "No Insurance";
  const ratingAvg = activeData?.user?.rating?.average ?? 0;
  const ratingCount = activeData?.user?.rating?.count ?? 0;

  const karma = activeData?.user?.karmaScore ?? 0;
  console.log("RATING DEBUG:", activeData?.user?.rating);

  const dateOptions = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", dateOptions);

  return (
    <header className="sticky top-0 z-40 h-20 px-6 sm:px-8 flex items-center justify-between bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.05)] transition-all duration-300">
      <style>{`
        @keyframes menu-spring {
          0% { opacity: 0; transform: scale(0.95) translateY(-10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-menu-spring {
          animation: menu-spring 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* --- LEFT: Search Bar --- */}
      <div className="flex-1 max-w-2xl mr-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors duration-300 pointer-events-none">
            <Search size={18} strokeWidth={2.5} />
          </div>
          <input
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-11 pr-12 py-2.5 bg-slate-50/80 border border-slate-200/60 rounded-2xl text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all duration-300 ease-out shadow-sm group-hover:bg-white group-hover:shadow-md group-hover:shadow-slate-200/40"
            placeholder="Search contracts, crops, prices..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 pointer-events-none">
            <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-slate-200 bg-slate-100 px-2 font-sans text-[10px] font-bold text-slate-500 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)]">
              <span className="text-xs">⌘</span> K
            </kbd>
          </div>
        </div>
      </div>

      {/* --- RIGHT: Actions & Profile --- */}
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden lg:flex items-center gap-2 text-slate-500 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/50">
          <CalendarDays size={14} className="text-emerald-600" />
          <span className="text-xs font-semibold tracking-wide uppercase">
            {formattedDate}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenNotif((o) => !o)}
            className={`relative p-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
              openNotif
                ? "bg-emerald-100 text-emerald-700 shadow-inner"
                : "text-slate-500 hover:bg-white hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-100/50"
            }`}
          >
            <Bell size={20} strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full font-bold shadow">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <div className="absolute top-full right-0 mt-3 z-50">
            <NotificationPopup
              open={openNotif}
              onClose={() => setOpenNotif(false)}
            />
          </div>
        </div>

        <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent mx-1"></div>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300 border border-transparent hover:border-slate-100 group active:scale-[0.98]"
          >
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-emerald-200 shadow-lg ring-2 ring-white group-hover:ring-emerald-100 transition-all">
                {userInitials}
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>

            <div className="hidden md:block text-right">
              <div className="text-sm font-bold text-slate-700 leading-tight group-hover:text-emerald-700 transition-colors">
                {displayName}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {displayRole}
              </div>
            </div>

            <ChevronDown
              size={16}
              strokeWidth={2.5}
              className={`text-slate-400 transition-transform duration-300 ${showProfileMenu ? "rotate-180 text-emerald-600" : ""}`}
            />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-30 cursor-default"
                onClick={() => setShowProfileMenu(false)}
              />

              <div className="absolute right-0 mt-4 w-80 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-300/40 border border-white/60 z-40 overflow-hidden transform origin-top-right animate-menu-spring ring-1 ring-black/5">
                <div className="bg-gradient-to-br from-slate-50 via-slate-50 to-emerald-50/30 px-6 py-6 border-b border-slate-100 relative overflow-hidden group">
                  <div className="absolute -top-6 -right-6 p-4 text-emerald-500/5 transform group-hover:rotate-12 transition-transform duration-700">
                    <User size={100} />
                  </div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-emerald-600 font-bold text-xl shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
                      {userInitials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                        {displayName}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium truncate max-w-[160px]">
                        {displayEmail}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-100/50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                        {displayRole}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 space-y-4 bg-white/50">
                  <div className="flex items-center gap-3 text-sm text-slate-600 group hover:text-emerald-700 transition-colors cursor-default">
                    {/* ⭐ Rating */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="p-1.5 rounded-lg bg-yellow-100 text-yellow-600">
                        ⭐
                      </div>

                      <span className="font-medium">
                        {ratingAvg ? ratingAvg.toFixed(1) : "0.0"}
                        <span className="text-xs text-gray-400 ml-1">
                          ({ratingCount} reviews)
                        </span>
                      </span>
                    </div>

                    {/* ⚡ Karma */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                        ⚡
                      </div>

                      <span className="font-medium">
                        Trust Score: {karma}/100
                      </span>
                    </div>
                    {karma > 80 && (
                      <div className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full w-fit">
                        Trusted User
                      </div>
                    )}

                    {karma < 40 && karma > 0 && (
                      <div className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full w-fit">
                        Low Trust
                      </div>
                    )}
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-emerald-100 text-slate-500 group-hover:text-emerald-600 transition-colors">
                      <Phone size={14} />
                    </div>
                    <span className="font-medium">{displayPhone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 group hover:text-emerald-700 transition-colors cursor-default">
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-emerald-100 text-slate-500 group-hover:text-emerald-600 transition-colors">
                      <MapPin size={14} />
                    </div>
                    <span className="line-clamp-1 font-medium">
                      {displayLocation}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 group hover:text-emerald-700 transition-colors cursor-default">
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-emerald-100 text-slate-500 group-hover:text-emerald-600 transition-colors">
                      <ShieldCheck size={14} />
                    </div>
                    <span className="line-clamp-1 font-medium">
                      {displayInsurance}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-100 mx-6"></div>

                <div className="p-3">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onOpenProfile) onOpenProfile();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700 rounded-2xl transition-all active:scale-[0.98]"
                  >
                    <Settings size={18} strokeWidth={2} /> View Profile &
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-2xl transition-all mt-1 active:scale-[0.98]"
                  >
                    <LogOut size={18} strokeWidth={2} /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showToast && latestNotif && (
        <div className="fixed top-6 right-6 z-50 bg-white shadow-xl rounded-xl p-4 w-80 border border-gray-200 animate-slide-in">
          <p className="font-semibold text-sm">🔔 {latestNotif.title}</p>

          <p className="text-xs text-gray-600 mt-1">{latestNotif.message}</p>
        </div>
      )}
    </header>
  );
}
