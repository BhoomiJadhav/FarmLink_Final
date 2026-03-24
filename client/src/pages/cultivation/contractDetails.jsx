

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

//   const [error, setError] = useState("");
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
//   // Mocked user role, replace with actual auth context if available
//   const uploadStageProof = async (stageId, images) => {
//     const formData = new FormData();
//     images.forEach((img) => formData.append("images", img));

//     await axios.post(
//       `/contracts/${contract._id}/stages/${stageId}/upload`,
//       formData,
//     );

//     refetchContract(); // re-fetch contract to update UI
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
//   const markSeedDispatched = async (id) => {
//     try {
//       await axios.post(`/contracts/${id}/seed/dispatch`);
//       await refetchContract();
//     } catch (err) {
//       console.error("Seed dispatch failed", err);
//       alert("Failed to mark seed dispatch");
//     }
//   };
//   const openSeedUploadModal = (id) => {
//     alert("Seed upload modal will be added next.");
//   };

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

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6">
//       {/* HEADER */}
//       <ContractHeader contract={contract} />

//       {/* KPIs */}
//       <ContractKpiRow kpis={tracking.kpis} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT */}
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
//             onUpload={(stage) => setUploadStage(stage)}
//             onVerify={(stage, approved) => verifyStage(stage._id, approved)}
//             onView={(stage) => setViewStage(stage)}
//           />

//           <PaymentSchedule
//             contractId={contract._id}
//             payments={tracking.payments.schedule}
//             dispute={dispute}
//           />

//           <CultivationDeliverySection
//             contract={contract}
//             role={role}
//             refresh={refetchContract}
//           />
//         </div>

//         {/* RIGHT */}
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
//     </div>
//   );
// };

// export default ContractTracking;

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

//   const [error, setError] = useState("");

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
//   const allStagesCompleted = contract.cultivationStages.every(s => s.status === "COMPLETED");
//   const aiNotDone = !contract.aiQualityDetails || contract.aiQualityDetails.grade === "Pending";

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6">
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
//             onUpload={(stage) => setUploadStage(stage)}
//             onVerify={(stage, approved) => verifyStage(stage._id, approved)}
//             onView={(stage) => setViewStage(stage)}
//           />

//           {/* AI QUALITY GATEKEEPER: Shows only if production is done but AI isn't */}
//           {allStagesCompleted && aiNotDone && role === "FARMER" && (
//             <AiVerificationCard 
//               contractId={contract._id} 
//               onVerified={refetchContract} 
//             />
//           )}

//           <PaymentSchedule
//             contractId={contract._id}
//             payments={tracking.payments.schedule}
//             dispute={dispute}
//           />

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
//     </div>
//   );
// };

// export default ContractTracking;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

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

// --- NEW AI COMPONENT IMPORT ---
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

  const [error, setError] = useState("");

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
        setError("Failed to load contract data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [contractId]);

  let role = "VIEWER";

  if (contract && user) {
    const userId = user._id;

    if (String(contract?.buyer?.buyerId) === String(userId)) {
      role = "BUYER";
    } else if (String(contract?.farmer?.farmerId) === String(userId)) {
      role = "FARMER";
    }
  }

  useEffect(() => {
    if (!contract || !contract._id || role === "VIEWER") return;

    const fetchUnread = async () => {
      const res = await axios.get(`/contracts/${contract._id}/messages`);
      setUnreadCount(res.data.unread?.[role] || 0);
    };

    fetchUnread();
  }, [contract, role]);

  useEffect(() => {
    if (!contract?._id) return;

    const fetchDispute = async () => {
      try {
        const res = await axios.get(`/contracts/${contract._id}/disputes`);
        setDispute(res.data);
      } catch (err) {
        console.error("Fetch dispute error", err);
      }
    };

    fetchDispute();
  }, [contract?._id]);

  if (loading || authLoading) {
    return <div className="p-6 text-sm">Loading...</div>;
  }

  if (!contract || !tracking || !user) {
    return <div className="p-6 text-sm">No data found</div>;
  }

  const uploadStageProof = async (stageId, images) => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    await axios.post(
      `/contracts/${contract._id}/stages/${stageId}/upload`,
      formData,
    );

    refetchContract();
  };

  const verifyStage = async (stageId, approved) => {
    await axios.post(`/contracts/${contract._id}/stages/${stageId}/verify`, {
      approved,
    });

    refetchContract();
  };

  const handleStageRequest = async () => {
    try {
      await axios.post(`/contracts/${contract._id}/request-stage-update`);

      refetchContract();
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      }
    }
  };

  const currentStage = contract?.cultivationStages?.find(
    (stage) => stage.status === "PENDING" && !stage.farmerConfirmed,
  );

  const isRequestAlreadySent =
    currentStage?.request?.stageUpdateRequested === true;

  const refetchContract = async () => {
    try {
      const [contractRes, trackingRes] = await Promise.all([
        axios.get(`/contracts/${contractId}`),
        axios.get(`/contracts/${contractId}/tracking`),
      ]);

      setContract(contractRes.data.contract);
      setTracking(trackingRes.data);
    } catch (err) {
      console.error("Refetch failed", err);
    }
  };

  // --- GATEKEEPER LOGIC ---
  const allStagesCompleted = contract.cultivationStages?.length > 0 && contract.cultivationStages.every(s => s.status === "COMPLETED");

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <ContractHeader contract={contract} />

      <ContractKpiRow kpis={tracking.kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SeedStage
            contract={contract}
            role={role}
            refreshContract={refetchContract}
          />

          <CultivationTimeline
            stages={contract.cultivationStages || []}
            role={role}
            seedSupply={contract.seedSupply}
            // ✅ FIX 1: Passing the AI details so Timeline Stage 7 marks as "Completed"
            aiQualityDetails={contract.aiQualityDetails} 
            onUpload={(stage) => setUploadStage(stage)}
            onVerify={(stage, approved) => verifyStage(stage._id, approved)}
            onView={(stage) => setViewStage(stage)}
          />

          {/* AI QUALITY GATEKEEPER */}
          {/* ✅ FIX 2: Removed "aiNotDone" so the image and verified result STAY visible on the screen */}
          {allStagesCompleted && role === "FARMER" && (
            <div className="animate-in fade-in duration-500">
              <AiVerificationCard 
                contractId={contract._id} 
                initialResult={contract.aiQualityDetails}
                onVerified={refetchContract} 
              />
            </div>
          )}

          <PaymentSchedule
            contractId={contract._id}
            payments={tracking.payments.schedule}
            dispute={dispute}
          />

          {/* Delivery Section will automatically unlock based on the Backend Status update */}
          <CultivationDeliverySection
            contract={contract}
            role={role}
            refresh={refetchContract}
          />
        </div>

        <div className="space-y-6">
          <FarmerInfoCard farmer={tracking.farmer} />
          <ContractDetailsCard contract={contract} />
          {dispute && <DisputeInfoCard dispute={dispute} />}
          {contract && (
            <QuickActions
              contractId={contract._id}
              onOpenChat={() => setChatOpen(true)}
              unreadCount={unreadCount}
              onRequestStage={handleStageRequest}
              isRequestAlreadySent={isRequestAlreadySent}
              onRaiseDispute={() => setDisputeModalOpen(true)}
              dispute={dispute}
            />
          )}
        </div>
      </div>

      <UploadProofModal
        open={!!uploadStage}
        stage={uploadStage}
        onClose={() => setUploadStage(null)}
        onSubmit={uploadStageProof}
      />
      <StageImageViewer
        open={!!viewStage}
        stage={viewStage}
        role={role}
        onClose={() => setViewStage(null)}
        onVerify={(stage, approved) => verifyStage(stage._id, approved)}
      />
      {contract && (
        <SecureChatWidget
          contractId={contract._id}
          role={role}
          open={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
      <DisputeModal
        open={disputeModalOpen}
        onClose={() => setDisputeModalOpen(false)}
        contractId={contract._id}
        onDisputeCreated={(newDispute) => setDispute(newDispute)}
      />
    </div>
  );
};

export default ContractTracking;