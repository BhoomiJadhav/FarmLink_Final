

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// const ActiveContracts = () => {
//   const [contracts, setContracts] = useState([null]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchActiveContracts();
//   }, []);

//   const fetchActiveContracts = async () => {
//     try {
//       const res = await axios.get("/contracts/active");
//       setContracts(res.data.contracts);
//     } catch (error) {
//       console.error("Failed to fetch active contracts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 text-sm text-gray-500">
//         Loading active contracts...
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Active Contracts
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           All currently active agreements
//         </p>
//       </div>

//       {/* Empty State */}
//       {contracts.length === 0 ? (
//         <div className="text-sm text-gray-500 border border-dashed rounded-lg p-6">
//           No active contracts found.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {contracts.map((contract) => (
//             <div
//               key={contract._id}
//               className="border rounded-lg p-4 bg-white hover:border-gray-300 transition"
//             >
//               {/* Contract ID */}
//               <div className="text-xs text-gray-400 mb-2">Contract ID</div>
//               <div className="text-sm font-medium text-gray-800 mb-3">
//                 {contract._id}
//               </div>

//               {/* Details */}
//               <div className="space-y-1 text-sm">
//                 <div>
//                   <span className="text-gray-500">Farmer:</span>{" "}
//                   <span className="text-gray-800">{contract.farmer?.name}</span>
//                 </div>

//                 <div>
//                   <span className="text-gray-500">Crop:</span>{" "}
//                   <span className="text-gray-800">{contract.crop?.name}</span>
//                 </div>
//               </div>

//               {/* Action */}
//               <button
//                 onClick={() => navigate(`/contracts/${contract._id}`)}
//                 className="mt-4 text-sm text-green-600 hover:underline"
//               >
//                 View Details →
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // export default ActiveContracts;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// const ActiveContracts = () => {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchActiveContracts();
//   }, []);

//   const fetchActiveContracts = async () => {
//     try {
//       const res = await axios.get("/contracts/active");
//       setContracts(res.data.contracts);
//     } catch (error) {
//       console.error("Failed to fetch active contracts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 text-sm text-gray-500">
//         Loading active contracts...
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Active Contracts
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           All currently active agreements
//         </p>
//       </div>

//       {/* Empty State */}
//       {contracts.length === 0 ? (
//         <div className="text-sm text-gray-500 border border-dashed rounded-lg p-6">
//           No active contracts found.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {contracts.map((contract) => (
//             <div
//               key={contract._id}
//               className="border rounded-lg p-4 bg-white hover:border-gray-300 transition relative overflow-hidden"
//             >
//               {/* AI Status Badge - NEW INTEGRATION */}
//               {contract.aiQualityDetails && (
//                 <div className="absolute top-0 right-0">
//                   <span className={`text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase text-white ${
//                     contract.aiQualityDetails.grade === 'Pending' 
//                       ? 'bg-amber-500' 
//                       : 'bg-green-600'
//                   }`}>
//                     {contract.aiQualityDetails.grade === 'Pending' ? 'AI Pending' : `AI: ${contract.aiQualityDetails.grade}`}
//                   </span>
//                 </div>
//               )}

//               {/* Contract ID */}
//               <div className="text-xs text-gray-400 mb-2">Contract ID</div>
//               <div className="text-sm font-medium text-gray-800 mb-3">
//                 {contract._id}
//               </div>

//               {/* Details */}
//               <div className="space-y-1 text-sm">
//                 <div>
//                   <span className="text-gray-500">Farmer:</span>{" "}
//                   <span className="text-gray-800">{contract.farmer?.name}</span>
//                 </div>

//                 <div>
//                   <span className="text-gray-500">Crop:</span>{" "}
//                   <span className="text-gray-800">{contract.crop?.name}</span>
//                 </div>

//                 {/* Show Confidence score if verified */}
//                 {contract.aiQualityDetails?.grade !== 'Pending' && (
//                   <div className="text-[11px] text-green-700 mt-2 font-medium">
//                     Verified with {contract.aiQualityDetails?.confidence?.toFixed(1)}% confidence
//                   </div>
//                 )}
//               </div>

//               {/* Action */}
//               <button
//                 onClick={() => navigate(`/contracts/${contract._id}`)}
//                 className="mt-4 text-sm text-green-600 hover:underline flex items-center gap-1"
//               >
//                 View Details →
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActiveContracts;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Leaf, 
  Zap 
} from "lucide-react"; 
import axios from "../../api/axios";

const ActiveContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveContracts();
    // Optional: Auto-refresh every 60 seconds to catch AI grading updates seamlessly
    // const interval = setInterval(fetchActiveContracts, 60000);
    // return () => clearInterval(interval);
  }, []);

  const fetchActiveContracts = async () => {
    try {
      const res = await axios.get("/contracts/active");
      setContracts(res.data.contracts || []);
    } catch (error) {
      console.error("Failed to fetch active contracts", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin shadow-md"></div>
          <p className="text-sm text-emerald-600 font-bold tracking-widest uppercase animate-pulse">
            Syncing Agri-Data...
          </p>
        </div>
      </div>
    );
  }

  // Calculate quick stats for the header
  const totalLive = contracts.length;
  const verifiedCount = contracts.filter(c => c.aiQualityDetails?.grade && c.aiQualityDetails.grade !== 'Pending').length;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-slate-50 min-h-screen rounded-3xl">
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Leaf className="text-emerald-600" size={36} />
            Active Contracts
          </h1>
          <p className="text-md text-gray-500 mt-2 font-medium">
            Monitor your ongoing agreements and AI quality verification status.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-3 text-xs font-black text-emerald-700 bg-white px-5 py-3 rounded-2xl border border-emerald-100 shadow-sm">
            <Activity size={16} className="animate-pulse text-emerald-500" />
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Active</div>
              {totalLive} AGREEMENTS
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-black text-blue-700 bg-white px-5 py-3 rounded-2xl border border-blue-100 shadow-sm">
            <Zap size={16} className="text-blue-500" />
            <div>
              <div className="text-[10px] text-gray-400 uppercase">AI Verified</div>
              {verifiedCount} HARVESTS
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {contracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-24 border-4 border-dashed border-gray-200 rounded-[3rem] bg-white text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-6">
            <Clock className="w-12 h-12 text-gray-300" />
          </div>
          <p className="text-2xl font-bold text-gray-800">No active contracts found.</p>
          <p className="text-sm text-gray-400 mt-2 font-medium max-w-xs">
            New contracts will appear here once signed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contracts.map((contract) => {
            const isAiVerified = contract.aiQualityDetails?.grade && contract.aiQualityDetails.grade !== 'Pending';
            
            return (
              <div
                key={contract._id}
                className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-200 transition-all duration-500 ease-out"
              >
                {/* AI Status Badge */}
                {contract.aiQualityDetails && (
                  <div className="absolute top-0 right-0">
                    <span className={`flex items-center gap-2 text-[11px] font-black px-6 py-3 rounded-bl-[1.8rem] uppercase text-white shadow-lg transition-colors ${
                      !isAiVerified ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}>
                      {!isAiVerified ? (
                        <><Clock size={14} strokeWidth={3} className="animate-spin-slow" /> AI PENDING</>
                      ) : (
                        <><ShieldCheck size={14} strokeWidth={3} /> AI: {contract.aiQualityDetails.grade}</>
                      )}
                    </span>
                  </div>
                )}

                {/* ID Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-black mb-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Contract ID
                  </div>
                  <div className="text-sm font-mono font-bold text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 inline-block">
                    #{contract._id.slice(-8).toUpperCase()}
                  </div>
                </div>

                {/* Card Info Section */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center bg-slate-50/80 p-4 rounded-3xl border border-transparent group-hover:border-slate-100 transition-colors">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Farmer</span>
                    <span className="text-sm font-black text-gray-800">{contract.farmer?.name || 'N/A'}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50/80 p-4 rounded-3xl border border-transparent group-hover:border-slate-100 transition-colors">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Crop Type</span>
                    <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                      <Leaf size={14} />
                      {contract.crop?.name || 'Rice'}
                    </span>
                  </div>
                </div>

                {/* AI Detail Footer (Only if verified) */}
                {isAiVerified && (
                  <div className="mb-8 p-5 bg-emerald-50/40 border border-emerald-100 rounded-[2rem] animate-in fade-in duration-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">Analysis Confidence</span>
                      <span className="text-xs font-black text-emerald-600">
                        {contract.aiQualityDetails?.confidence?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden mb-3">
                      <div 
                        className="bg-emerald-500 h-full rounded-full" 
                        style={{ width: `${contract.aiQualityDetails?.confidence}%` }}
                      ></div>
                    </div>
                    <div className="text-[9px] text-emerald-600/60 font-bold leading-tight flex items-center gap-1.5">
                      <Zap size={10} />
                      Verified via AI Model
                    </div>
                  </div>
                )}

                {/* Navigation Button */}
                <button
                  onClick={() => navigate(`/contracts/${contract._id}`)}
                  className="w-full mt-2 flex items-center justify-center gap-3 py-5 px-6 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-200 transition-all duration-300 active:scale-[0.97] group"
                >
                  Track Progress
                  <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActiveContracts;