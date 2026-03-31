// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../../api/axios";
// import NegotiationChat from "../../components/NegotiationChat";

// export default function NegotiationsHub({ userRole }) {
//   const location = useLocation();
//   const initialSelectedId = location.state?.selectedNegotiationId;
//   const [negotiations, setNegotiations] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetchNegotiations();
//   }, []);

//   const fetchNegotiations = async () => {
//     const res = await axios.get("/negotiation/my");
//     setNegotiations(res.data.negotiations);
//   };

//   useEffect(() => {
//     if (initialSelectedId && negotiations.length > 0) {
//       const found = negotiations.find((n) => n._id === initialSelectedId);
//       if (found) setSelected(found);
//     }
//   }, [negotiations]);
//   return (
//     <div className="h-screen flex bg-gray-50">
//       {/* LEFT LIST */}
//       <div className="w-1/3 border-r bg-white overflow-y-auto">
//         <h2 className="p-4 font-semibold text-lg border-b">Negotiations</h2>

//         {negotiations.map((n) => (
//           <div
//             key={n._id}
//             onClick={() => setSelected(n)}
//             className={`p-4 cursor-pointer hover:bg-gray-100 ${
//               selected?._id === n._id ? "bg-gray-100" : ""
//             }`}
//           >
//             <p className="font-medium">{n.contractId.cropDetails?.cropName}</p>
//             <p className="text-xs text-gray-500">
//               {n.contractId.pricing?.agreedPricePerUnit} / unit
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT CHAT */}
//       <div className="flex-1">
//         {selected ? (
//           <NegotiationChat negotiationId={selected._id} userRole={userRole} />
//         ) : (
//           <div className="h-full flex items-center justify-center text-gray-400">
//             Select a negotiation
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import NegotiationChat from "../../components/NegotiationChat";

// export default function NegotiationsHub({ userRole }) {
//   const [negotiations, setNegotiations] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [activeTab, setActiveTab] = useState("ongoing");

//   useEffect(() => {
//     fetchNegotiations();
//   }, []);

//   const fetchNegotiations = async () => {
//     const res = await axios.get("/negotiation/my");
//     setNegotiations(res.data.negotiations);
//     console.log(res.data.negotiations);
//   };
//   const ongoing = negotiations.filter(
//     (n) => n.status?.toUpperCase() === "ACTIVE",
//   );

//   const history = negotiations.filter(
//     (n) =>
//       n.status?.toUpperCase() === "AGREED" ||
//       n.status?.toUpperCase() === "REJECTED",
//   );
//   const displayed = activeTab === "ongoing" ? ongoing : history;

//   return (
//     <div className="h-screen flex bg-gray-100">
//       {/* LEFT PANEL */}
//       <div className="w-1/3 bg-white border-r flex flex-col">
//         {/* Tabs */}
//         <div className="flex border-b">
//           <button
//             onClick={() => setActiveTab("ongoing")}
//             className={`flex-1 py-3 font-semibold ${
//               activeTab === "ongoing"
//                 ? "border-b-2 border-emerald-500 text-emerald-600"
//                 : "text-gray-400"
//             }`}
//           >
//             Ongoing
//           </button>

//           <button
//             onClick={() => setActiveTab("history")}
//             className={`flex-1 py-3 font-semibold ${
//               activeTab === "history"
//                 ? "border-b-2 border-emerald-500 text-emerald-600"
//                 : "text-gray-400"
//             }`}
//           >
//             History
//           </button>
//         </div>

//         {/* LIST */}
//         <div className="flex-1 overflow-y-auto">
//           {displayed.map((n) => {
//             const lastMsg = n.messages[n.messages.length - 1];

//             return (
//               <div
//                 key={n._id}
//                 onClick={() => setSelected(n)}
//                 className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
//                   selected?._id === n._id ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-sm">
//                     {n.contractId.cropDetails?.cropName}
//                   </p>

//                   <span className="text-[10px] text-gray-400">
//                     {new Date(lastMsg?.timestamp).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>
//                 </div>

//                 <p className="text-xs text-gray-500 truncate mt-1">
//                   {lastMsg?.message || "No messages"}
//                 </p>

//                 <div className="flex justify-between mt-2">
//                   <span className="text-xs text-gray-400">
//                     ₹ {n.finalAgreedPrice || lastMsg?.offeredPrice || "--"}
//                   </span>

//                   <span
//                     className={`text-[10px] px-2 py-1 rounded ${
//                       n.status === "ACTIVE"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : n.status === "AGREED"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {n.status}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* RIGHT CHAT */}
//       <div className="flex-1">
//         {selected ? (
//           <NegotiationChat negotiationId={selected._id} userRole={userRole} />
//         ) : (
//           <div className="h-full flex items-center justify-center text-gray-400">
//             Select a negotiation
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";
import NegotiationChat from "../../components/NegotiationChat";
import Sidebar from "../../components/Sidebar.jsx"; // farmer
import BuyerSidebar from "../../components/BuyerSidebar"; // buyer
import Topbar from "../../components/topNav.jsx";
import ProfileModal from "../../components/profileModal.jsx";
import {
  MessageSquare,
  Search,
  Archive,
  Layers,
  ArchiveRestore,
} from "lucide-react";

export default function NegotiationsHub({ userRole }) {
  const [negotiations, setNegotiations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("ongoing");

  // Navbar & Modal States
  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [archivedIds, setArchivedIds] = useState(() => {
    const saved = localStorage.getItem("archived_negotiations");
    return saved ? JSON.parse(saved) : [];
  });
  const isFarmer = profileData?.user?.role === "farmer";
  useEffect(() => {
    fetchNegotiations();
    fetchProfile(); // Fetch profile for Topbar functionality
  }, []);

  useEffect(() => {
    localStorage.setItem("archived_negotiations", JSON.stringify(archivedIds));
  }, [archivedIds]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/profile/me");
      setProfileData(res.data);
    } catch (error) {
      console.error("Failed to load profile for Topbar:", error);
    }
  };

  const fetchNegotiations = async () => {
    try {
      const res = await axios.get("/negotiation/my");
      setNegotiations(res.data.negotiations || []);
    } catch (err) {
      console.error("Failed to fetch negotiations:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleArchive = (id) => {
    setArchivedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const displayed = useMemo(() => {
    const list = negotiations || [];
    if (activeTab === "archive")
      return list.filter((n) => archivedIds.includes(n._id));

    const nonArchived = list.filter((n) => !archivedIds.includes(n._id));
    if (activeTab === "ongoing")
      return nonArchived.filter((n) => n.status?.toUpperCase() === "ACTIVE");
    if (activeTab === "history")
      return nonArchived.filter((n) =>
        ["AGREED", "REJECTED"].includes(n.status?.toUpperCase()),
      );
    return nonArchived;
  }, [negotiations, activeTab, archivedIds]);

  return (
    <div className="flex h-screen bg-[#f0f4f8] font-sans text-slate-800 overflow-hidden">
      <div className="h-full flex-shrink-0 z-40 bg-white border-r border-slate-200 shadow-2xl">
        {isFarmer ? (
          <Sidebar onLogout={logout} />
        ) : (
          <BuyerSidebar onLogout={logout} />
        )}
      </div>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* COMPACT TOPBAR - No margin, fully functional */}
        <div className="flex-shrink-0 z-50">
          <Topbar
            profileData={profileData}
            onOpenProfile={() => setShowProfileModal(true)}
            onLogout={logout}
          />
        </div>

        {/* MESSAGING INTERFACE */}
        <div className="flex-1 flex overflow-hidden p-3 pt-0">
          <div className="flex flex-1 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
            {/* 2nd PANEL: List */}
            <div className="w-[350px] h-full bg-[#f8fafc] border-r border-slate-200 flex flex-col">
              <div className="p-5 pb-2">
                <h2 className="text-xl font-black text-slate-800 mb-3">
                  Negotiation
                </h2>
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search deals..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                  />
                </div>
              </div>

              <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100 bg-[#f8fafc]">
                <TabButton
                  label="All"
                  active={activeTab === "all"}
                  onClick={() => setActiveTab("all")}
                />
                <TabButton
                  label="Ongoing"
                  active={activeTab === "ongoing"}
                  onClick={() => setActiveTab("ongoing")}
                />
                <TabButton
                  label="History"
                  active={activeTab === "history"}
                  onClick={() => setActiveTab("history")}
                />
                <TabButton
                  label="Archive"
                  active={activeTab === "archive"}
                  count={archivedIds.length}
                  onClick={() => setActiveTab("archive")}
                />
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {displayed.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300">
                    <Layers size={32} strokeWidth={1.5} />
                    <p className="mt-2 text-[9px] font-black uppercase tracking-widest text-center px-4">
                      No {activeTab} conversations
                    </p>
                  </div>
                ) : (
                  displayed.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => setSelected(n)}
                      className={`p-4 cursor-pointer rounded-2xl transition-all duration-200 border ${
                        selected?._id === n._id
                          ? "bg-white border-emerald-500 shadow-md translate-x-1"
                          : "bg-transparent border-transparent hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-sm text-slate-700 truncate mr-2">
                          {n.contractId?.cropDetails?.cropName || "Crop"}
                        </p>
                        <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">
                          {n.messages?.[n.messages.length - 1]?.timestamp
                            ? new Date(
                                n.messages[n.messages.length - 1].timestamp,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-1">
                        {n.messages?.[n.messages.length - 1]?.message ||
                          "No messages yet"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3rd PANEL: Chat */}
            <div className="flex-1 bg-white flex flex-col overflow-hidden">
              {selected ? (
                <div className="h-full flex flex-col overflow-hidden">
                  <div className="px-6 py-3 border-b border-slate-100 bg-[#fdfdfd] shadow-sm flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg shadow-inner">
                        {selected.contractId?.cropDetails?.cropName?.[0] || "C"}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">
                          {selected.contractId?.cropDetails?.cropName}
                        </h3>
                        <p className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 rounded w-fit uppercase">
                          ID: {selected._id.slice(-8)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleArchive(selected._id)}
                        className={`p-2 rounded-full transition-all ${
                          archivedIds.includes(selected._id)
                            ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                            : "hover:bg-slate-100 text-slate-400 hover:text-emerald-600"
                        }`}
                        title={
                          archivedIds.includes(selected._id)
                            ? "Unarchive Chat"
                            : "Archive Chat"
                        }
                      >
                        {archivedIds.includes(selected._id) ? (
                          <ArchiveRestore size={18} />
                        ) : (
                          <Archive size={18} />
                        )}
                      </button>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                        {selected.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden bg-[#f9fafb]">
                    <NegotiationChat
                      negotiationId={selected._id}
                      userRole={userRole}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50/20">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <MessageSquare className="text-slate-200" size={32} />
                  </div>
                  <h3 className="text-base font-bold text-slate-400">
                    Select a negotiation to view details
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
}

function TabButton({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] font-black uppercase tracking-tighter pb-1 border-b-2 transition-all flex items-center gap-1 ${
        active
          ? "text-emerald-600 border-emerald-500"
          : "text-slate-400 border-transparent hover:text-slate-600"
      }`}
    >
      {label}
      {count > 0 && label === "Archive" && (
        <span className="bg-emerald-100 text-emerald-600 px-1.5 rounded-full text-[8px]">
          {count}
        </span>
      )}
    </button>
  );
}
