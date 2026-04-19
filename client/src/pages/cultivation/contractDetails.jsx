// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";

// import ContractHeader from "../../components/cultivation/contractTracking/ContractHeader";
// import ContractKpiRow from "../../components/cultivation/contractTracking/ContractKpiRow";
// import SeedStage from "../../components/cultivation/contractTracking/SeedStage";
// import CultivationTimeline from "../../components/cultivation/contractTracking/CultivationTimeline";
// import PaymentSchedule from "../../components/cultivation/contractTracking/PaymentSchedule";

// import FarmerInfoCard from "../../components/cultivation/contractTracking/FarmerInfoCard";
// import ContractDetailsCard from "../../components/cultivation/contractTracking/ContractDetailsCard";
// import QuickActions from "../../components/cultivation/contractTracking/QuickActions";
// import UploadProofModal from "../../components/cultivation/contractTracking/UploadProofModal";
// import StageImageViewer from "../../components/cultivation/contractTracking/StageImgViewer";
// import DisputeModal from "../../components/DisputeModal";
// import DisputeInfoCard from "../../components/DisputeInfoCard";
// import SecureChatWidget from "../../components/SecureChatWidget";
// import CultivationDeliverySection from "../../components/cultivation/contractTracking/CultivationDeliverySection";
// import FeedbackModal from "../../components/FeedbackModal";
// // --- NEW AI COMPONENT IMPORT ---
// import AiVerificationCard from "../../components/contracts/AiVerificationCard";

// const ContractTracking = () => {
//   const { contractId } = useParams();

//   const [contract, setContract] = useState(null);
//   const { user, loading: authLoading } = useAuth();

//   const [tracking, setTracking] = useState(null);
//   const [uploadStage, setUploadStage] = useState(null);
//   const [viewStage, setViewStage] = useState(null);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [dispute, setDispute] = useState(null);
//   const [disputeModalOpen, setDisputeModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   const [hasReviewed, setHasReviewed] = useState(true);
//   const [error, setError] = useState("");
//   const isFrozen =
//     contract?.contractStatus === "FROZEN" || contract?.adminOverride?.isFrozen;

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         setLoading(true);

//         const [contractRes, trackingRes] = await Promise.all([
//           axios.get(`/contracts/${contractId}`),
//           axios.get(`/contracts/${contractId}/tracking`),
//         ]);

//         setContract(contractRes.data.contract);
//         setTracking(trackingRes.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load contract data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [contractId]);

//   let role = "VIEWER";
//   const checkReviewStatus = async () => {
//     try {
//       if (!contract?._id) return; // ✅ ADD THIS

//       const res = await axios.get(`/reviews/${contract._id}/status`);

//       setHasReviewed(res.data.hasReviewed);

//       if (!res.data.hasReviewed) {
//         setShowFeedbackModal(true);
//       }
//     } catch (err) {
//       console.error("Review check failed", err);
//     }
//   };
//   useEffect(() => {
//     if (
//       contract?.contractStatus === "COMPLETED" ||
//       contract?.status === "COMPLETED"
//     ) {
//       checkReviewStatus();
//     }
//   }, [contract?.contractStatus, contract?.status]);
//   if (contract && user) {
//     const userId = user._id;

//     if (String(contract?.buyer?.buyerId) === String(userId)) {
//       role = "BUYER";
//     } else if (String(contract?.farmer?.farmerId) === String(userId)) {
//       role = "FARMER";
//     }
//   }

//   useEffect(() => {
//     if (!contract || !contract._id || role === "VIEWER") return;

//     const fetchUnread = async () => {
//       const res = await axios.get(`/contracts/${contract._id}/messages`);
//       setUnreadCount(res.data.unread?.[role] || 0);
//     };

//     fetchUnread();
//   }, [contract, role]);

//   useEffect(() => {
//     if (!contract?._id) return;

//     const fetchDispute = async () => {
//       try {
//         const res = await axios.get(`/contracts/${contract._id}/disputes`);
//         setDispute(res.data);
//       } catch (err) {
//         console.error("Fetch dispute error", err);
//       }
//     };

//     fetchDispute();
//   }, [contract?._id]);

//   if (loading || authLoading) {
//     return <div className="p-6 text-sm">Loading...</div>;
//   }

//   if (!contract || !tracking || !user) {
//     return <div className="p-6 text-sm">No data found</div>;
//   }

//   const uploadStageProof = async (stageId, images) => {
//     const formData = new FormData();
//     images.forEach((img) => formData.append("images", img));

//     await axios.post(
//       `/contracts/${contract._id}/stages/${stageId}/upload`,
//       formData,
//     );

//     refetchContract();
//   };

//   const verifyStage = async (stageId, approved) => {
//     await axios.post(`/contracts/${contract._id}/stages/${stageId}/verify`, {
//       approved,
//     });

//     refetchContract();
//   };

//   const handleStageRequest = async () => {
//     try {
//       await axios.post(`/contracts/${contract._id}/request-stage-update`);

//       refetchContract();
//     } catch (err) {
//       if (err.response?.data?.error) {
//         alert(err.response.data.error);
//       }
//     }
//   };

//   const currentStage = contract?.cultivationStages?.find(
//     (stage) => stage.status === "PENDING" && !stage.farmerConfirmed,
//   );

//   const isRequestAlreadySent =
//     currentStage?.request?.stageUpdateRequested === true;

//   const refetchContract = async () => {
//     try {
//       const [contractRes, trackingRes] = await Promise.all([
//         axios.get(`/contracts/${contractId}`),
//         axios.get(`/contracts/${contractId}/tracking`),
//       ]);

//       setContract(contractRes.data.contract);
//       setTracking(trackingRes.data);
//     } catch (err) {
//       console.error("Refetch failed", err);
//     }
//   };

//   // --- GATEKEEPER LOGIC ---
//   const allStagesCompleted =
//     contract.cultivationStages?.length > 0 &&
//     contract.cultivationStages.every((s) => s.status === "COMPLETED");

//   return (
//     <div className="relative max-w-7xl mx-auto p-6 space-y-6">
//       <ContractHeader contract={contract} />

//       <ContractKpiRow kpis={tracking.kpis} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <SeedStage
//             contract={contract}
//             role={role}
//             refreshContract={refetchContract}
//           />

//           <CultivationTimeline
//             stages={contract.cultivationStages || []}
//             role={role}
//             seedSupply={contract.seedSupply}
//             // ✅ FIX 1: Passing the AI details so Timeline Stage 7 marks as "Completed"
//             aiQualityDetails={contract.aiQualityDetails}
//             onUpload={(stage) => setUploadStage(stage)}
//             onVerify={(stage, approved) => verifyStage(stage._id, approved)}
//             onView={(stage) => setViewStage(stage)}
//           />

//           {/* AI QUALITY GATEKEEPER */}
//           {/* ✅ FIX 2: Removed "aiNotDone" so the image and verified result STAY visible on the screen */}
//           {allStagesCompleted && role === "FARMER" && (
//             <div className="animate-in fade-in duration-500">
//               <AiVerificationCard
//                 contractId={contract._id}
//                 initialResult={contract.aiQualityDetails}
//                 onVerified={refetchContract}
//               />
//             </div>
//           )}

//           <PaymentSchedule
//             contractId={contract._id}
//             payments={tracking.payments.schedule}
//             dispute={dispute}
//           />

//           {/* Delivery Section will automatically unlock based on the Backend Status update */}
//           <CultivationDeliverySection
//             contract={contract}
//             role={role}
//             refresh={refetchContract}
//           />
//         </div>

//         <div className="space-y-6">
//           <FarmerInfoCard farmer={tracking.farmer} />
//           <ContractDetailsCard contract={contract} />
//           {dispute && <DisputeInfoCard dispute={dispute} />}
//           {contract && (
//             <QuickActions
//               contractId={contract._id}
//               onOpenChat={() => setChatOpen(true)}
//               unreadCount={unreadCount}
//               onRequestStage={handleStageRequest}
//               isRequestAlreadySent={isRequestAlreadySent}
//               onRaiseDispute={() => setDisputeModalOpen(true)}
//               dispute={dispute}
//             />
//           )}
//         </div>
//       </div>

//       <UploadProofModal
//         open={!!uploadStage}
//         stage={uploadStage}
//         onClose={() => setUploadStage(null)}
//         onSubmit={uploadStageProof}
//       />
//       <StageImageViewer
//         open={!!viewStage}
//         stage={viewStage}
//         role={role}
//         onClose={() => setViewStage(null)}
//         onVerify={(stage, approved) => verifyStage(stage._id, approved)}
//       />
//       {contract && (
//         <SecureChatWidget
//           contractId={contract._id}
//           role={role}
//           open={chatOpen}
//           onClose={() => setChatOpen(false)}
//         />
//       )}
//       <DisputeModal
//         open={disputeModalOpen}
//         onClose={() => setDisputeModalOpen(false)}
//         contractId={contract._id}
//         onDisputeCreated={(newDispute) => setDispute(newDispute)}
//       />
//       {isFrozen && (
//         <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[9999] flex items-center justify-center animate-fade">
//           <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-xl border">
//             <h2 className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
//               🚫 Contract Frozen
//             </h2>

//             <p className="text-gray-600 mt-3 text-sm">
//               This contract has been frozen by admin due to a dispute.
//             </p>

//             {contract?.adminOverride?.reason && (
//               <p className="mt-3 text-xs text-gray-500 italic">
//                 Reason: {contract.adminOverride.reason}
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//       {showFeedbackModal && !hasReviewed && (
//         <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
//           <FeedbackModal
//             contractId={contract._id}
//             onSuccess={() => {
//               setShowFeedbackModal(false);
//               setHasReviewed(true);
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContractTracking;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";

// // Components
// import ContractHeader from "../../components/cultivation/contractTracking/ContractHeader";
// import ContractKpiRow from "../../components/cultivation/contractTracking/ContractKpiRow";
// import SeedStage from "../../components/cultivation/contractTracking/SeedStage";
// import CultivationTimeline from "../../components/cultivation/contractTracking/CultivationTimeline";
// import PaymentSchedule from "../../components/cultivation/contractTracking/PaymentSchedule";
// import FarmerInfoCard from "../../components/cultivation/contractTracking/FarmerInfoCard";
// import ContractDetailsCard from "../../components/cultivation/contractTracking/ContractDetailsCard";
// import QuickActions from "../../components/cultivation/contractTracking/QuickActions";
// import UploadProofModal from "../../components/cultivation/contractTracking/UploadProofModal";
// import StageImageViewer from "../../components/cultivation/contractTracking/StageImgViewer";
// import DisputeModal from "../../components/DisputeModal";
// import DisputeInfoCard from "../../components/DisputeInfoCard";
// import SecureChatWidget from "../../components/SecureChatWidget";
// import CultivationDeliverySection from "../../components/cultivation/contractTracking/CultivationDeliverySection";
// import FeedbackModal from "../../components/FeedbackModal";
// import AiVerificationCard from "../../components/contracts/AiVerificationCard";

// const ContractTracking = () => {
//   const { contractId } = useParams();
//   const [contract, setContract] = useState(null);
//   const { user, loading: authLoading } = useAuth();

//   const [tracking, setTracking] = useState(null);
//   const [uploadStage, setUploadStage] = useState(null);
//   const [viewStage, setViewStage] = useState(null);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [dispute, setDispute] = useState(null);
//   const [disputeModalOpen, setDisputeModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   const [hasReviewed, setHasReviewed] = useState(true);
//   const [error, setError] = useState("");

//   const isFrozen = contract?.contractStatus === "FROZEN" || contract?.adminOverride?.isFrozen;

//   // --- DATA FETCHING ---
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         setLoading(true);
//         const [contractRes, trackingRes] = await Promise.all([
//           axios.get(`/contracts/${contractId}`),
//           axios.get(`/contracts/${contractId}/tracking`),
//         ]);
//         setContract(contractRes.data.contract);
//         setTracking(trackingRes.data);
//       } catch (err) {
//         console.error(err);
//         setError("Sync Error: System unable to fetch ledger data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, [contractId]);

//   // --- PERMISSION & ROLE LOGIC ---
//   let role = "VIEWER";
//   if (contract && user) {
//     const userId = user._id;
//     if (String(contract?.buyer?.buyerId) === String(userId)) role = "BUYER";
//     else if (String(contract?.farmer?.farmerId) === String(userId)) role = "FARMER";
//   }

//   // --- REFRESH LOGIC ---
//   const refetchContract = async () => {
//     try {
//       const [contractRes, trackingRes] = await Promise.all([
//         axios.get(`/contracts/${contractId}`),
//         axios.get(`/contracts/${contractId}/tracking`),
//       ]);
//       setContract(contractRes.data.contract);
//       setTracking(trackingRes.data);
//     } catch (err) {
//       console.error("Refresh sequence failed.", err);
//     }
//   };

//   // --- ACTION HANDLERS ---
//   const uploadStageProof = async (stageId, images) => {
//     const formData = new FormData();
//     images.forEach((img) => formData.append("images", img));
//     await axios.post(`/contracts/${contract._id}/stages/${stageId}/upload`, formData);
//     refetchContract();
//   };

//   const verifyStage = async (stageId, approved) => {
//     await axios.post(`/contracts/${contract._id}/stages/${stageId}/verify`, { approved });
//     refetchContract();
//   };

//   const handleStageRequest = async () => {
//     try {
//       await axios.post(`/contracts/${contract._id}/request-stage-update`);
//       refetchContract();
//     } catch (err) {
//       if (err.response?.data?.error) alert(err.response.data.error);
//     }
//   };

//   const allStagesCompleted = contract?.cultivationStages?.length > 0 && 
//                          contract.cultivationStages.every((s) => s.status === "COMPLETED");

//   if (loading || authLoading) return (
//     <div className="flex flex-col h-screen items-center justify-center bg-[#f8fafc]">
//       <div className="w-10 h-10 border-[3px] border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
//       <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Loading Terminal...</span>
//     </div>
//   );

//   return (
//     <div className="bg-[#f1f5f9] min-h-screen">
//       {/* 1. STICKY COMMAND HEADER */}
//       <div className="sticky top-0 z-[50] w-full shadow-lg shadow-slate-200/50">
//         <ContractHeader contract={contract} />
//       </div>

//       <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
//         {/* 2. KPI HUD */}
//         <div className="px-1">
//           <ContractKpiRow kpis={tracking.kpis} />
//         </div>

//         {/* ✅ UPDATED GRID: lg:grid-cols-[5.6fr,4.4fr] for increased horizontal spacing in the sidebar */}
//         <div className="grid grid-cols-1 lg:grid-cols-[5.6fr,4.4fr] gap-6 items-start">
          
//           {/* 3. OPERATIONS SECTOR (LEFT) */}
//           <div className="space-y-6">
            
//             {/* 3a. SEED SUPPLY PHASE - (Redesigned with bigger fonts/darker shades) */}
//             <div className="bg-white rounded-[1.8rem] border border-slate-200/60 shadow-xl shadow-slate-200/40">
//                <SeedStage
//                  contract={contract}
//                  role={role}
//                  refreshContract={refetchContract}
//                />
//             </div>

//             {/* 3b. CULTIVATION LIFECYCLE TIMELINE */}
//             <div className="group transition-all duration-300">
//               <CultivationTimeline
//                 stages={contract.cultivationStages || []}
//                 role={role}
//                 seedSupply={contract.seedSupply}
//                 aiQualityDetails={contract.aiQualityDetails}
//                 onUpload={(stage) => setUploadStage(stage)}
//                 onVerify={(stage, approved) => verifyStage(stage._id, approved)}
//                 onView={(stage) => setViewStage(stage)}
//               />
//             </div>

//             {/* 3c. AI INTELLIGENCE GATEKEEPER */}
//             {allStagesCompleted && role === "FARMER" && (
//               <div className="animate-in zoom-in duration-500">
//                 <AiVerificationCard
//                   contractId={contract._id}
//                   initialResult={contract.aiQualityDetails}
//                   onVerified={refetchContract}
//                 />
//               </div>
//             )}

//             {/* 3d. LOGISTICS & FULFILLMENT */}
//             <div className="bg-white rounded-[1.8rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
//                <CultivationDeliverySection
//                  contract={contract}
//                  role={role}
//                  refresh={refetchContract}
//                />
//             </div>
//           </div>

//           {/* 4. STRATEGIC MONITOR (RIGHT) */}
//           <div className="space-y-6 lg:sticky lg:top-24">
            
//             {/* 4a. COMMAND CENTER (Quick Actions) */}
//             <QuickActions
//               contractId={contract._id}
//               onOpenChat={() => setChatOpen(true)}
//               unreadCount={unreadCount}
//               onRequestStage={handleStageRequest}
//               onRaiseDispute={() => setDisputeModalOpen(true)}
//               dispute={dispute}
//             />

//             {/* 4b. SETTLEMENT LEDGER - (Redesigned with bigger fonts/darker shades) */}
//             <div className="bg-white rounded-[1.8rem] border border-slate-200/60 shadow-xl shadow-slate-200/40">
//                <PaymentSchedule
//                  contractId={contract._id}
//                  payments={tracking.payments.schedule}
//                  dispute={dispute}
//                />
//             </div>

//             {/* 4c. REFERENCE DATA - (Redesigned with bigger fonts/darker shades) */}
//             <div className="space-y-5">
//                <ContractDetailsCard contract={contract} />
//                {dispute && <DisputeInfoCard dispute={dispute} />}
//                <FarmerInfoCard farmer={tracking.farmer} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- OVERLAYS & MODALS --- */}
//       {/* ... Unchanged Modals ... */}
//     </div>
//   );
// };

// export default ContractTracking;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

// Components
import ContractHeader from "../../components/cultivation/contractTracking/ContractHeader";
import ContractKpiRow from "../../components/cultivation/contractTracking/ContractKpiRow";
import SeedStage from "../../components/cultivation/contractTracking/SeedStage";
import CultivationTimeline from "../../components/cultivation/contractTracking/CultivationTimeline";
import PaymentSchedule from "../../components/cultivation/contractTracking/PaymentSchedule";
import FarmerInfoCard from "../../components/cultivation/contractTracking/FarmerInfoCard";
import ContractDetailsCard from "../../components/cultivation/contractTracking/ContractDetailsCard";
import QuickActions from "../../components/cultivation/contractTracking/QuickActions";
import UploadProofModal from "../../components/cultivation/contractTracking/UploadProofModal";
import StageImageViewer from "../../components/cultivation/contractTracking/StageImgViewer";
import DisputeModal from "../../components/DisputeModal";
import DisputeInfoCard from "../../components/DisputeInfoCard";
import SecureChatWidget from "../../components/SecureChatWidget";
import CultivationDeliverySection from "../../components/cultivation/contractTracking/CultivationDeliverySection";
import FeedbackModal from "../../components/FeedbackModal";
import AiVerificationCard from "../../components/contracts/AiVerificationCard";

const ContractTracking = () => {
  const { contractId } = useParams();
  const [contract, setContract] = useState(null);
  const { user, loading: authLoading } = useAuth();

  const [tracking, setTracking] = useState(null);
  const [uploadStage, setUploadStage] = useState(null);
  const [viewStage, setViewStage] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dispute, setDispute] = useState(null);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(true);
  const [error, setError] = useState("");

  const isFrozen = contract?.contractStatus === "FROZEN" || contract?.adminOverride?.isFrozen;

  // --- DATA FETCHING (ORIGINAL LOGIC) ---
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [contractRes, trackingRes] = await Promise.all([
          axios.get(`/contracts/${contractId}`),
          axios.get(`/contracts/${contractId}/tracking`),
        ]);
        setContract(contractRes.data.contract);
        setTracking(trackingRes.data);
      } catch (err) {
        console.error(err);
        setError("Sync Error: System unable to fetch ledger data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [contractId]);

  // --- PERMISSION & ROLE LOGIC (ORIGINAL LOGIC) ---
  let role = "VIEWER";
  if (contract && user) {
    const userId = user._id;
    if (String(contract?.buyer?.buyerId) === String(userId)) role = "BUYER";
    else if (String(contract?.farmer?.farmerId) === String(userId)) role = "FARMER";
  }

  // --- REFRESH LOGIC (ORIGINAL LOGIC) ---
  const refetchContract = async () => {
    try {
      const [contractRes, trackingRes] = await Promise.all([
        axios.get(`/contracts/${contractId}`),
        axios.get(`/contracts/${contractId}/tracking`),
      ]);
      setContract(contractRes.data.contract);
      setTracking(trackingRes.data);
    } catch (err) {
      console.error("Refresh sequence failed.", err);
    }
  };

  // --- ACTION HANDLERS (ORIGINAL LOGIC) ---
  const uploadStageProof = async (stageId, images) => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    await axios.post(`/contracts/${contract._id}/stages/${stageId}/upload`, formData);
    refetchContract();
  };

  const verifyStage = async (stageId, approved) => {
    await axios.post(`/contracts/${contract._id}/stages/${stageId}/verify`, { approved });
    refetchContract();
  };

  const handleStageRequest = async () => {
    try {
      await axios.post(`/contracts/${contract._id}/request-stage-update`);
      refetchContract();
    } catch (err) {
      if (err.response?.data?.error) alert(err.response.data.error);
    }
  };

  const allStagesCompleted = contract?.cultivationStages?.length > 0 && 
                           contract.cultivationStages.every((s) => s.status === "COMPLETED");

  if (loading || authLoading) return (
    <div className="flex flex-col h-screen items-center justify-center bg-[#f8fafc]">
      <div className="w-10 h-10 border-[3px] border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Loading Terminal...</span>
    </div>
  );

  return (
    <div className="bg-[#f1f5f9] min-h-screen">
      <div className="sticky top-0 z-[50] w-full shadow-lg shadow-slate-200/50">
        <ContractHeader contract={contract} />
      </div>

      <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="px-1">
          <ContractKpiRow kpis={tracking.kpis} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5.6fr,4.4fr] gap-6 items-start">
          
          <div className="space-y-6">
            
            <div className="bg-white rounded-[1.8rem] border border-slate-200/60 shadow-xl shadow-slate-200/40">
               <SeedStage
                 contract={contract}
                 role={role}
                 refreshContract={refetchContract}
               />
            </div>

            <div className="group transition-all duration-300">
              <CultivationTimeline
                contract={contract} // <--- ONLY ADDED THIS PROP
                stages={contract.cultivationStages || []}
                role={role}
                seedSupply={contract.seedSupply}
                aiQualityDetails={contract.aiQualityDetails}
                onUpload={(stage) => setUploadStage(stage)}
                onVerify={(stage, approved) => verifyStage(stage._id, approved)}
                onView={(stage) => setViewStage(stage)}
              />
            </div>

            {allStagesCompleted && role === "FARMER" && (
              <div className="animate-in zoom-in duration-500 bg-white rounded-[1.8rem] border border-slate-200/60 shadow-xl shadow-slate-200/40">
                <AiVerificationCard
                  contractId={contract._id}
                  initialResult={contract.aiQualityDetails}
                  onVerified={refetchContract}
                />
              </div>
            )}

            <div className="bg-white rounded-[1.8rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
               <CultivationDeliverySection
                 contract={contract}
                 role={role}
                 refresh={refetchContract}
               />
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            
            <QuickActions
              contractId={contract._id}
              onOpenChat={() => setChatOpen(true)}
              unreadCount={unreadCount}
              onRequestStage={handleStageRequest}
              onRaiseDispute={() => setDisputeModalOpen(true)}
              dispute={dispute}
            />

            <div className="bg-white rounded-[1.8rem] border border-slate-200/60 shadow-xl shadow-slate-200/40">
               <PaymentSchedule
                 contractId={contract._id}
                 payments={tracking.payments.schedule}
                 dispute={dispute}
               />
            </div>

            <div className="space-y-5">
               <ContractDetailsCard contract={contract} />
               {dispute && <DisputeInfoCard dispute={dispute} />}
               <FarmerInfoCard farmer={tracking.farmer} />
            </div>
          </div>
        </div>
      </div>

      <UploadProofModal 
        open={!!uploadStage} 
        stage={uploadStage} 
        onClose={() => setUploadStage(null)} 
        onUpload={uploadStageProof} 
      />

      <StageImageViewer 
        open={!!viewStage} 
        stage={viewStage} 
        role={role}
        onClose={() => setViewStage(null)} 
        onVerify={verifyStage}
      />

      {chatOpen && (
        <SecureChatWidget 
          contractId={contract._id} 
          onClose={() => setChatOpen(false)} 
        />
      )}

      <DisputeModal 
        isOpen={disputeModalOpen} 
        onClose={() => setDisputeModalOpen(false)} 
        contractId={contract._id} 
      />
    </div>
  );
};

export default ContractTracking;