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
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import NegotiationChat from "../../components/NegotiationChat";

export default function NegotiationsHub({ userRole }) {
  const [negotiations, setNegotiations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("ongoing");

  useEffect(() => {
    fetchNegotiations();
  }, []);

  const fetchNegotiations = async () => {
    const res = await axios.get("/negotiation/my");
    setNegotiations(res.data.negotiations);
    console.log(res.data.negotiations);
  };
  const ongoing = negotiations.filter(
    (n) => n.status?.toUpperCase() === "ACTIVE",
  );

  const history = negotiations.filter(
    (n) =>
      n.status?.toUpperCase() === "AGREED" ||
      n.status?.toUpperCase() === "REJECTED",
  );
  const displayed = activeTab === "ongoing" ? ongoing : history;

  return (
    <div className="h-screen flex bg-gray-100">
      {/* LEFT PANEL */}
      <div className="w-1/3 bg-white border-r flex flex-col">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`flex-1 py-3 font-semibold ${
              activeTab === "ongoing"
                ? "border-b-2 border-emerald-500 text-emerald-600"
                : "text-gray-400"
            }`}
          >
            Ongoing
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 font-semibold ${
              activeTab === "history"
                ? "border-b-2 border-emerald-500 text-emerald-600"
                : "text-gray-400"
            }`}
          >
            History
          </button>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto">
          {displayed.map((n) => {
            const lastMsg = n.messages[n.messages.length - 1];

            return (
              <div
                key={n._id}
                onClick={() => setSelected(n)}
                className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                  selected?._id === n._id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">
                    {n.contractId.cropDetails?.cropName}
                  </p>

                  <span className="text-[10px] text-gray-400">
                    {new Date(lastMsg?.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="text-xs text-gray-500 truncate mt-1">
                  {lastMsg?.message || "No messages"}
                </p>

                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    ₹ {n.finalAgreedPrice || lastMsg?.offeredPrice || "--"}
                  </span>

                  <span
                    className={`text-[10px] px-2 py-1 rounded ${
                      n.status === "ACTIVE"
                        ? "bg-yellow-100 text-yellow-600"
                        : n.status === "AGREED"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {n.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT CHAT */}
      <div className="flex-1">
        {selected ? (
          <NegotiationChat negotiationId={selected._id} userRole={userRole} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a negotiation
          </div>
        )}
      </div>
    </div>
  );
}
