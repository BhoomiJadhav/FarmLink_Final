// import {
//   CheckCircle2,
//   CircleDot,
//   CircleDashed,
//   AlertTriangle,
//   Image,
//   UploadCloud,
//   ShieldCheck,
// } from "lucide-react";

// /* =========================================================
//    MAIN TIMELINE COMPONENT (REUSABLE)
// ========================================================= */

// export default function CultivationTimeline({
//   stages = [],
//   role, // "FARMER" | "BUYER"
//   seedSupply,
//   onUpload,
//   onVerify,
//   onView,
// }) {
//   return (
//     <div className="bg-white rounded-xl p-6 border">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           Cultivation Progress
//         </h2>

//         {role === "BUYER" && (
//           <button className="text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
//             View Analysis
//           </button>
//         )}
//       </div>

//       {/* Timeline */}
//       <div className="relative pl-10">
//         {/* Vertical Line */}
//         <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-200 rounded-full" />

//         {stages.map((stage, index) => (
//           <StageItem
//             key={stage._id}
//             stage={stage}
//             role={role}
//             seedSupply={seedSupply}
//             onUpload={onUpload}
//             onVerify={onVerify}
//             onView={onView}
//             isLast={index === stages.length - 1}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    STAGE ITEM
// ========================================================= */

// function StageItem({ stage, role, seedSupply, onUpload, onVerify, onView }) {
//   const isCompleted = stage.buyerVerified === true;
//   const isCurrent = stage.status === "PENDING";
//   const isLocked = stage.status === "LOCKED";
//   const isSowingStage =
//     stage.name?.toLowerCase().includes("sowing") || stage.stageIndex === 0;

//   const seedBlocked =
//     isSowingStage &&
//     seedSupply?.provider === "BUYER" &&
//     seedSupply?.status !== "VERIFIED";

//   // 🔴 OVERDUE LOGIC (ties directly to your reminder system)
//   const isOverdue =
//     !isCompleted &&
//     stage.expectedDays !== undefined &&
//     stage.reminder?.levelSent >= 2;

//   return (
//     <div className="relative flex gap-6 mb-10 animate-fadeIn">
//       {/* Timeline Icon */}
//       <div className="absolute left-0 top-1">
//         <TimelineIcon
//           isCompleted={isCompleted}
//           isCurrent={isCurrent}
//           isLocked={isLocked}
//           isOverdue={isOverdue}
//         />
//       </div>

//       {/* Content Card */}
//       <div
//         className={`ml-6 w-full rounded-lg border p-4 transition
//           ${
//             isCompleted
//               ? "bg-green-50 border-green-200"
//               : isOverdue
//                 ? "bg-red-50 border-red-200"
//                 : isCurrent
//                   ? "bg-amber-50 border-amber-200"
//                   : "bg-white border-gray-200"
//           }
//         `}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="font-medium">{stage.name}</h3>

//             {stage.completedAt && (
//               <p className="text-xs text-gray-500">
//                 Completed on {new Date(stage.completedAt).toLocaleDateString()}
//               </p>
//             )}
//           </div>

//           <StatusBadge
//             isCompleted={isCompleted}
//             isCurrent={isCurrent}
//             isOverdue={isOverdue}
//           />
//         </div>

//         {/* Evidence Section */}
//         {stage.farmerImages?.length > 0 && (
//           <div className="mt-3">
//             <p className="text-xs text-gray-500 mb-1">
//               Evidence uploaded ({stage.farmerImages.length})
//             </p>

//             <div className="flex gap-2 flex-wrap">
//               <button
//                 onClick={() => onView?.(stage)}
//                 className="w-14 h-14 border rounded-md bg-gray-50 hover:shadow-sm transition flex items-center justify-center"
//               >
//                 <Image className="text-gray-500" size={18} />
//               </button>
//             </div>
//           </div>
//         )}
//         {role === "FARMER" && isCurrent && seedBlocked && (
//           <p className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-md">
//             Seed verification is required before sowing proof can be uploaded.
//           </p>
//         )}

//         {/* FARMER ACTION */}
//         {role === "FARMER" &&
//           isCurrent &&
//           !stage.farmerConfirmed &&
//           !stage.buyerVerified &&
//           !seedBlocked && (
//             <button
//               onClick={() => onUpload(stage)}
//               className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm
//                          border rounded-md hover:bg-gray-50 transition"
//             >
//               <UploadCloud size={16} />
//               Upload Proof
//             </button>
//           )}

//         {/* BUYER ACTION */}
//         {role === "BUYER" && stage.farmerConfirmed && !stage.buyerVerified && (
//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={() => onVerify(stage, true)}
//               className="inline-flex items-center gap-2 px-4 py-2 text-sm
//                          bg-green-600 text-white rounded-md hover:bg-green-700"
//             >
//               <ShieldCheck size={16} />
//               Verify Stage
//             </button>

//             <button
//               onClick={() => onVerify(stage, false)}
//               className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
//             >
//               Request Re-upload
//             </button>
//           </div>
//         )}

//         {/* Reminder / Escalation Info */}
//         {stage.reminder?.levelSent > 0 && !isCompleted && (
//           <p
//             className={`mt-3 text-xs ${
//               isOverdue ? "text-red-700" : "text-amber-700"
//             }`}
//           >
//             Reminder sent (Level {stage.reminder.levelSent})
//           </p>
//         )}

//         {/* Guidance */}
//         {isCurrent && (
//           <p className="mt-3 text-sm text-gray-600 bg-white/60 p-3 rounded-md">
//             Farmer must upload proof for this stage. Buyer verification is
//             required to proceed.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    TIMELINE ICON
// ========================================================= */

// function TimelineIcon({ isCompleted, isCurrent, isOverdue }) {
//   if (isCompleted)
//     return (
//       <CheckCircle2
//         size={22}
//         className="text-green-600 bg-white rounded-full"
//       />
//     );

//   if (isOverdue)
//     return (
//       <AlertTriangle size={22} className="text-red-600 bg-white rounded-full" />
//     );

//   if (isCurrent)
//     return (
//       <CircleDot size={22} className="text-amber-500 bg-white rounded-full" />
//     );

//   return (
//     <CircleDashed size={22} className="text-gray-400 bg-white rounded-full" />
//   );
// }

// /* =========================================================
//    STATUS BADGE
// ========================================================= */

// function StatusBadge({ isCompleted, isCurrent, isOverdue }) {
//   if (isCompleted) return <Badge label="Completed" color="green" />;
//   if (isOverdue) return <Badge label="Overdue" color="red" />;
//   if (isCurrent) return <Badge label="Current" color="amber" />;
//   return <Badge label="Upcoming" color="gray" />;
// }

// function Badge({ label, color }) {
//   const colors = {
//     green: "bg-green-50 text-green-700 border border-green-200",
//     amber: "bg-amber-50 text-amber-700 border border-amber-200",
//     red: "bg-red-50 text-red-700 border border-red-200",
//     gray: "bg-gray-50 text-gray-500 border border-gray-200",
//   };

//   return (
//     <span className={`text-xs px-2 py-1 rounded-full ${colors[color]}`}>
//       {label}
//     </span>
//   );
// }

// import {
//   CheckCircle2,
//   CircleDot,
//   CircleDashed,
//   AlertTriangle,
//   Image,
//   UploadCloud,
//   ShieldCheck,
//   Cpu,
// } from "lucide-react";

// /* =========================================================
//    MAIN TIMELINE COMPONENT
// ========================================================= */

// export default function CultivationTimeline({
//   stages = [],
//   role, // "FARMER" | "BUYER"
//   seedSupply,
//   aiQualityDetails, // NEW: Pass the contract.aiQualityDetails here
//   onUpload,
//   onVerify,
//   onView,
//   onAiAction, // NEW: Optional callback to trigger AI modal
// }) {
//   // Check if all physical cultivation stages are finished
//   const allStagesFinished = stages.length > 0 && stages.every((s) => s.buyerVerified === true);
  
//   // AI Status Logic
//   const aiCompleted = aiQualityDetails && aiQualityDetails.grade !== "Pending";
//   const aiCurrent = allStagesFinished && !aiCompleted;

//   return (
//     <div className="bg-white rounded-xl p-6 border">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           Cultivation Progress
//         </h2>

//         {role === "BUYER" && (
//           <button className="text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
//             View Analysis
//           </button>
//         )}
//       </div>

//       {/* Timeline */}
//       <div className="relative pl-10">
//         {/* Vertical Line */}
//         <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-200 rounded-full" />

//         {/* 1-6: Cultivation Stages */}
//         {stages.map((stage, index) => (
//           <StageItem
//             key={stage._id}
//             stage={stage}
//             role={role}
//             seedSupply={seedSupply}
//             onUpload={onUpload}
//             onVerify={onVerify}
//             onView={onView}
//           />
//         ))}

//         {/* 7: AI QUALITY VERIFICATION STAGE (Virtual Stage) */}
//         {allStagesFinished && (
//           <AiStageItem 
//             aiDetails={aiQualityDetails}
//             isCurrent={aiCurrent}
//             isCompleted={aiCompleted}
//             role={role}
//             onAiAction={onAiAction}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    NEW: AI STAGE ITEM
// ========================================================= */

// function AiStageItem({ aiDetails, isCurrent, isCompleted, role, onAiAction }) {
//   return (
//     <div className="relative flex gap-6 mb-4 animate-fadeIn">
//       <div className="absolute left-0 top-1">
//         {isCompleted ? (
//           <CheckCircle2 size={22} className="text-green-600 bg-white rounded-full" />
//         ) : (
//           <CircleDot size={22} className={`${isCurrent ? "text-emerald-500 animate-pulse" : "text-gray-400"} bg-white rounded-full`} />
//         )}
//       </div>

//       <div className={`ml-6 w-full rounded-lg border p-4 transition ${
//         isCompleted ? "bg-green-50 border-green-200" : "bg-emerald-50 border-emerald-200 shadow-sm"
//       }`}>
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <Cpu size={18} className={isCompleted ? "text-green-600" : "text-emerald-600"} />
//             <h3 className="font-bold">AI Quality Grading</h3>
//           </div>
//           <span className={`text-xs px-2 py-1 rounded-full border ${
//             isCompleted ? "bg-green-100 text-green-700 border-green-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"
//           }`}>
//             {isCompleted ? "Verified" : "Current Step"}
//           </span>
//         </div>

//         {isCompleted ? (
//           <div className="mt-2 text-sm text-green-800">
//             <p>Grade: <span className="font-bold uppercase">{aiDetails.grade}</span></p>
//             <p className="text-xs opacity-80">Confidence Score: {aiDetails.confidence?.toFixed(1)}%</p>
//           </div>
//         ) : (
//           <div className="mt-3">
//             <p className="text-sm text-emerald-800 mb-3">
//               Production is complete. Please upload harvest photos for AI grain analysis to unlock dispatch.
//             </p>
//             {role === "FARMER" && (
//               <p className="text-xs text-emerald-600 italic">
//                 Scroll down to the AI Verification card to upload your images.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    EXISTING STAGE ITEM
// ========================================================= */

// function StageItem({ stage, role, seedSupply, onUpload, onVerify, onView }) {
//   const isCompleted = stage.buyerVerified === true;
//   const isCurrent = stage.status === "PENDING";
//   const isLocked = stage.status === "LOCKED";
//   const isSowingStage =
//     stage.name?.toLowerCase().includes("sowing") || stage.stageIndex === 0;

//   const seedBlocked =
//     isSowingStage &&
//     seedSupply?.provider === "BUYER" &&
//     seedSupply?.status !== "VERIFIED";

//   const isOverdue =
//     !isCompleted &&
//     stage.expectedDays !== undefined &&
//     stage.reminder?.levelSent >= 2;

//   return (
//     <div className="relative flex gap-6 mb-10 animate-fadeIn">
//       {/* Timeline Icon */}
//       <div className="absolute left-0 top-1">
//         <TimelineIcon
//           isCompleted={isCompleted}
//           isCurrent={isCurrent}
//           isLocked={isLocked}
//           isOverdue={isOverdue}
//         />
//       </div>

//       {/* Content Card */}
//       <div
//         className={`ml-6 w-full rounded-lg border p-4 transition
//           ${
//             isCompleted
//               ? "bg-green-50 border-green-200"
//               : isOverdue
//                 ? "bg-red-50 border-red-200"
//                 : isCurrent
//                   ? "bg-amber-50 border-amber-200"
//                   : "bg-white border-gray-200"
//           }
//         `}
//       >
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="font-medium">{stage.name}</h3>
//             {stage.completedAt && (
//               <p className="text-xs text-gray-500">
//                 Completed on {new Date(stage.completedAt).toLocaleDateString()}
//               </p>
//             )}
//           </div>

//           <StatusBadge
//             isCompleted={isCompleted}
//             isCurrent={isCurrent}
//             isOverdue={isOverdue}
//           />
//         </div>

//         {stage.farmerImages?.length > 0 && (
//           <div className="mt-3">
//             <p className="text-xs text-gray-500 mb-1">
//               Evidence uploaded ({stage.farmerImages.length})
//             </p>
//             <div className="flex gap-2 flex-wrap">
//               <button
//                 onClick={() => onView?.(stage)}
//                 className="w-14 h-14 border rounded-md bg-gray-50 hover:shadow-sm transition flex items-center justify-center"
//               >
//                 <Image className="text-gray-500" size={18} />
//               </button>
//             </div>
//           </div>
//         )}

//         {role === "FARMER" && isCurrent && seedBlocked && (
//           <p className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-md">
//             Seed verification is required before sowing proof can be uploaded.
//           </p>
//         )}

//         {role === "FARMER" &&
//           isCurrent &&
//           !stage.farmerConfirmed &&
//           !stage.buyerVerified &&
//           !seedBlocked && (
//             <button
//               onClick={() => onUpload(stage)}
//               className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-50 transition"
//             >
//               <UploadCloud size={16} />
//               Upload Proof
//             </button>
//           )}

//         {role === "BUYER" && stage.farmerConfirmed && !stage.buyerVerified && (
//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={() => onVerify(stage, true)}
//               className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
//             >
//               <ShieldCheck size={16} />
//               Verify Stage
//             </button>
//             <button
//               onClick={() => onVerify(stage, false)}
//               className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
//             >
//               Request Re-upload
//             </button>
//           </div>
//         )}

//         {stage.reminder?.levelSent > 0 && !isCompleted && (
//           <p className={`mt-3 text-xs ${isOverdue ? "text-red-700" : "text-amber-700"}`}>
//             Reminder sent (Level {stage.reminder.levelSent})
//           </p>
//         )}

//         {isCurrent && (
//           <p className="mt-3 text-sm text-gray-600 bg-white/60 p-3 rounded-md">
//             Farmer must upload proof for this stage. Buyer verification is required to proceed.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    ICONS & BADGES
// ========================================================= */

// function TimelineIcon({ isCompleted, isCurrent, isOverdue }) {
//   if (isCompleted) return <CheckCircle2 size={22} className="text-green-600 bg-white rounded-full" />;
//   if (isOverdue) return <AlertTriangle size={22} className="text-red-600 bg-white rounded-full" />;
//   if (isCurrent) return <CircleDot size={22} className="text-amber-500 bg-white rounded-full" />;
//   return <CircleDashed size={22} className="text-gray-400 bg-white rounded-full" />;
// }

// function StatusBadge({ isCompleted, isCurrent, isOverdue }) {
//   if (isCompleted) return <Badge label="Completed" color="green" />;
//   if (isOverdue) return <Badge label="Overdue" color="red" />;
//   if (isCurrent) return <Badge label="Current" color="amber" />;
//   return <Badge label="Upcoming" color="gray" />;
// }

// function Badge({ label, color }) {
//   const colors = {
//     green: "bg-green-50 text-green-700 border border-green-200",
//     amber: "bg-amber-50 text-amber-700 border border-amber-200",
//     red: "bg-red-50 text-red-700 border border-red-200",
//     gray: "bg-gray-50 text-gray-500 border border-gray-200",
//   };
//   return <span className={`text-xs px-2 py-1 rounded-full ${colors[color]}`}>{label}</span>;
// }


// import {
//   CheckCircle2,
//   CircleDot,
//   CircleDashed,
//   AlertTriangle,
//   Image as ImageIcon,
//   UploadCloud,
//   ShieldCheck,
//   Cpu,
// } from "lucide-react";

// /* =========================================================
//    MAIN TIMELINE COMPONENT
// ========================================================= */

// export default function CultivationTimeline({
//   stages = [],
//   role, // "FARMER" | "BUYER"
//   seedSupply,
//   aiQualityDetails, // Passed from contract.aiQualityDetails
//   onUpload,
//   onVerify,
//   onView,
//   onAiAction,
// }) {
//   // Logic to determine if physical production phase is finished
//   const allStagesFinished = stages.length > 0 && stages.every((s) => s.buyerVerified === true);
  
//   // AI Status Logic: Only completed if grade exists and isn't "Pending"
//   const aiCompleted = aiQualityDetails && 
//                       aiQualityDetails.grade && 
//                       aiQualityDetails.grade !== "Pending";

//   const aiCurrent = allStagesFinished && !aiCompleted;

//   return (
//     <div className="bg-white rounded-xl p-6 border shadow-sm">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//           Cultivation Progress
//         </h2>

//         {role === "BUYER" && aiCompleted && (
//           <button 
//             onClick={onAiAction}
//             className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm"
//           >
//             <Cpu size={14} /> View AI Report
//           </button>
//         )}
//       </div>

//       {/* Timeline Container */}
//       <div className="relative pl-10">
//         {/* Continuous Vertical Line */}
//         <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-200 rounded-full" />

//         {/* 1-6: Cultivation Stages */}
//         {stages.map((stage, index) => (
//           <StageItem
//             key={stage._id}
//             stage={stage}
//             role={role}
//             seedSupply={seedSupply}
//             onUpload={onUpload}
//             onVerify={onVerify}
//             onView={onView}
//           />
//         ))}

//         {/* 7: AI QUALITY VERIFICATION (Virtual Stage) */}
//         {/* This stage only renders once Harvest (Stage 6) is verified */}
//         {allStagesFinished && (
//           <AiStageItem 
//             aiDetails={aiQualityDetails}
//             isCurrent={aiCurrent}
//             isCompleted={aiCompleted}
//             role={role}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    AI STAGE ITEM (STAGE 7)
// ========================================================= */

// function AiStageItem({ aiDetails, isCurrent, isCompleted, role }) {
//   return (
//     <div className="relative flex gap-6 mb-4 animate-in fade-in slide-in-from-left-4 duration-500">
//       {/* Icon Wrapper */}
//       <div className="absolute left-0 top-1 z-10">
//         {isCompleted ? (
//           <CheckCircle2 size={22} className="text-green-600 bg-white rounded-full shadow-sm" />
//         ) : (
//           <div className="relative">
//             <CircleDot size={22} className={`${isCurrent ? "text-emerald-500 animate-pulse" : "text-gray-400"} bg-white rounded-full`} />
//             {isCurrent && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25"></span>}
//           </div>
//         )}
//       </div>

//       {/* Card Content */}
//       <div className={`ml-6 w-full rounded-lg border p-4 transition-all duration-300 ${
//         isCompleted ? "bg-green-50 border-green-200" : "bg-emerald-50 border-emerald-200 shadow-sm"
//       }`}>
//         <div className="flex justify-between items-center mb-2">
//           <div className="flex items-center gap-2">
//             <Cpu size={18} className={isCompleted ? "text-green-600" : "text-emerald-600"} />
//             <h3 className={`font-bold ${isCompleted ? "text-green-900" : "text-emerald-900"}`}>
//               Stage 7: AI Quality Grading
//             </h3>
//           </div>
//           <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
//             isCompleted ? "bg-green-100 text-green-700 border-green-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"
//           }`}>
//             {isCompleted ? "Verified" : "Current Step"}
//           </span>
//         </div>

//         {isCompleted ? (
//           <div className="mt-3 bg-white p-4 rounded-xl border border-green-100 shadow-sm flex items-center justify-between">
//             <div>
//               <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mb-1">
//                 AI Verified Grade
//               </p>
//               <h4 className="text-2xl font-black text-green-900 uppercase">
//                 {aiDetails.grade}
//               </h4>
//               <p className="text-xs text-green-600 font-medium mt-1">
//                 Precision: {aiDetails.confidence?.toFixed(1)}% Score
//               </p>
//             </div>
            
//             {/* If backend saves an image URL, it will display here. Otherwise, a success badge. */}
//             {aiDetails.evidenceUrl ? (
//               <img 
//                 src={aiDetails.evidenceUrl} 
//                 alt="Verified Crop" 
//                 className="w-16 h-16 object-cover rounded-lg border-2 border-green-100 shadow-sm" 
//               />
//             ) : (
//               <div className="w-16 h-16 bg-green-50 rounded-lg border-2 border-green-100 flex items-center justify-center">
//                 <CheckCircle2 className="text-green-400" size={24} />
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="mt-2">
//             <p className="text-sm text-emerald-800 leading-relaxed font-medium">
//               Harvest is verified. Please upload grains photos in the section below for AI grading to authorize dispatch.
//             </p>
//             {role === "FARMER" && (
//               <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-600 bg-white/50 w-fit px-2 py-1 rounded border border-emerald-100 italic">
//                 <UploadCloud size={12} />
//                 Upload area is now active below
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    STANDARD STAGE ITEM (STAGES 1-6)
// ========================================================= */

// function StageItem({ stage, role, seedSupply, onUpload, onVerify, onView }) {
//   const isCompleted = stage.buyerVerified === true;
//   const isCurrent = stage.status === "PENDING";
//   const isSowingStage = stage.name?.toLowerCase().includes("sowing") || stage.stageIndex === 0;

//   const seedBlocked =
//     isSowingStage &&
//     seedSupply?.provider === "BUYER" &&
//     seedSupply?.status !== "VERIFIED";

//   const isOverdue = !isCompleted && stage.expectedDays !== undefined && stage.reminder?.levelSent >= 2;

//   return (
//     <div className="relative flex gap-6 mb-10 animate-in fade-in duration-300">
//       <div className="absolute left-0 top-1 z-10">
//         <TimelineIcon
//           isCompleted={isCompleted}
//           isCurrent={isCurrent}
//           isOverdue={isOverdue}
//         />
//       </div>

//       <div className={`ml-6 w-full rounded-lg border p-4 transition-all duration-200 ${
//         isCompleted ? "bg-green-50 border-green-200" : 
//         isOverdue ? "bg-red-50 border-red-200" : 
//         isCurrent ? "bg-amber-50 border-amber-200" : "bg-white border-gray-100"
//       }`}>
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="font-semibold text-gray-900">{stage.name}</h3>
//             {stage.completedAt && (
//               <p className="text-[11px] text-gray-500 mt-0.5">
//                 Completed {new Date(stage.completedAt).toLocaleDateString()}
//               </p>
//             )}
//           </div>
//           <StatusBadge isCompleted={isCompleted} isCurrent={isCurrent} isOverdue={isOverdue} />
//         </div>

//         {stage.farmerImages?.length > 0 && (
//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="text-[11px] text-gray-400 font-medium mb-2 uppercase tracking-tight">Evidence Uploaded</p>
//             <button
//               onClick={() => onView?.(stage)}
//               className="w-12 h-12 border rounded-lg bg-white hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center shadow-sm"
//             >
//               <ImageIcon className="text-gray-400" size={18} />
//             </button>
//           </div>
//         )}

//         {role === "FARMER" && isCurrent && seedBlocked && (
//           <div className="mt-3 flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 font-medium">
//             <AlertTriangle size={14} />
//             Seed verification required before uploading sowing proof.
//           </div>
//         )}

//         {role === "FARMER" && isCurrent && !stage.farmerConfirmed && !seedBlocked && (
//           <button
//             onClick={() => onUpload(stage)}
//             className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold border-2 border-amber-400 text-amber-700 bg-white rounded-lg hover:bg-amber-400 hover:text-white transition-all shadow-sm"
//           >
//             <UploadCloud size={14} />
//             Upload Evidence
//           </button>
//         )}

//         {role === "BUYER" && stage.farmerConfirmed && !stage.buyerVerified && (
//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={() => onVerify(stage, true)}
//               className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition"
//             >
//               <ShieldCheck size={14} /> Verify
//             </button>
//             <button
//               onClick={() => onVerify(stage, false)}
//               className="px-4 py-1.5 text-xs font-bold border-2 border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
//             >
//               Request Fix
//             </button>
//           </div>
//         )}

//         {isCurrent && !isCompleted && (
//           <p className="mt-3 text-[11px] text-gray-500 italic">
//             Waiting for {role === "FARMER" ? "your upload" : "farmer evidence"}...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    UI HELPERS
// ========================================================= */

// function TimelineIcon({ isCompleted, isCurrent, isOverdue }) {
//   if (isCompleted) return <CheckCircle2 size={22} className="text-green-600 bg-white rounded-full" />;
//   if (isOverdue) return <AlertTriangle size={22} className="text-red-600 bg-white rounded-full" />;
//   if (isCurrent) return <CircleDot size={22} className="text-amber-500 bg-white rounded-full" />;
//   return <CircleDashed size={22} className="text-gray-400 bg-white rounded-full" />;
// }

// function StatusBadge({ isCompleted, isCurrent, isOverdue }) {
//   if (isCompleted) return <Badge label="Completed" color="green" />;
//   if (isOverdue) return <Badge label="Overdue" color="red" />;
//   if (isCurrent) return <Badge label="Current" color="amber" />;
//   return <Badge label="Upcoming" color="gray" />;
// }

// function Badge({ label, color }) {
//   const colors = {
//     green: "bg-green-100 text-green-700 border-green-200",
//     amber: "bg-amber-100 text-amber-700 border-amber-200",
//     red: "bg-red-100 text-red-700 border-red-200",
//     gray: "bg-gray-100 text-gray-500 border-gray-200",
//   };
//   return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${colors[color]}`}>{label}</span>;
// }
import {
  CheckCircle2,
  CircleDot,
  CircleDashed,
  AlertTriangle,
  Image as ImageIcon,
  UploadCloud,
  ShieldCheck,
  Cpu,
  ChevronRight,
  Clock
} from "lucide-react";

/* =========================================================
   MAIN TIMELINE COMPONENT
========================================================= */

export default function CultivationTimeline({
  stages = [],
  role, 
  seedSupply,
  aiQualityDetails,
  onUpload,
  onVerify,
  onView,
  onAiAction,
}) {
  const allStagesFinished = stages.length > 0 && stages.every((s) => s.buyerVerified === true);
  
  const aiCompleted = aiQualityDetails && 
                      aiQualityDetails.grade && 
                      aiQualityDetails.grade !== "Pending";

  const aiCurrent = allStagesFinished && !aiCompleted;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
            <Clock size={16} className="text-emerald-600" /> Cultivation Lifecycle
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">Milestone Tracking & Evidence Verification</p>
        </div>

        {role === "BUYER" && aiCompleted && (
          <button 
            onClick={onAiAction}
            className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
          >
            <Cpu size={14} /> Full AI Analysis Report
          </button>
        )}
      </div>

      {/* Timeline Container */}
      <div className="relative pl-12">
        {/* Continuous Vertical Line - More Prominent */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[3px] bg-slate-100 rounded-full" />

        {/* 1-6: Cultivation Stages */}
        {stages.map((stage, index) => (
          <StageItem
            key={stage._id}
            stage={stage}
            role={role}
            seedSupply={seedSupply}
            onUpload={onUpload}
            onVerify={onVerify}
            onView={onView}
          />
        ))}

        {/* 7: AI QUALITY VERIFICATION */}
        {allStagesFinished && (
          <AiStageItem 
            aiDetails={aiQualityDetails}
            isCurrent={aiCurrent}
            isCompleted={aiCompleted}
            role={role}
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   AI STAGE ITEM (STAGE 7)
========================================================= */

function AiStageItem({ aiDetails, isCurrent, isCompleted, role }) {
  return (
    <div className="relative flex gap-6 mb-4 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="absolute left-[-48px] top-1 z-10 flex items-center justify-center w-10 h-10">
        {isCompleted ? (
          <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100">
            <ShieldCheck size={20} className="text-white" />
          </div>
        ) : (
          <div className="relative">
            <Cpu size={24} className={`${isCurrent ? "text-emerald-500 animate-pulse" : "text-slate-300"} bg-white rounded-full`} />
            {isCurrent && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25"></span>}
          </div>
        )}
      </div>

      <div className={`w-full rounded-2xl border-2 transition-all duration-300 p-6 ${
        isCompleted ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50 border-slate-200 border-dashed"
      }`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-white text-slate-400 border border-slate-200"}`}>
              <Cpu size={18} />
            </div>
            <div>
              <h3 className={`text-sm font-black uppercase tracking-widest ${isCompleted ? "text-emerald-900" : "text-slate-500"}`}>
                Phase 07: AI Quality Protocol
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Automated Crop Grading & Purity Check</p>
            </div>
          </div>
          <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-lg border ${
            isCompleted ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white text-slate-400 border-slate-200"
          }`}>
            {isCompleted ? "Protocol Verified" : "Awaiting Input"}
          </span>
        </div>

        {isCompleted ? (
          <div className="mt-4 bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between group hover:border-emerald-300 transition-colors">
            <div>
              <p className="text-[9px] text-emerald-600 font-black uppercase tracking-[0.2em] mb-2">
                Digital Grade Certificate
              </p>
              <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                {aiDetails.grade}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500" style={{width: `${aiDetails.confidence}%`}}></div>
                </div>
                <span className="text-[10px] text-slate-500 font-black">CONFIDENCE: {aiDetails.confidence?.toFixed(1)}%</span>
              </div>
            </div>
            
            {aiDetails.evidenceUrl ? (
              <div className="relative group">
                <img 
                  src={aiDetails.evidenceUrl} 
                  alt="Verified Crop" 
                  className="w-20 h-20 object-cover rounded-xl border-4 border-slate-50 shadow-md transform group-hover:scale-105 transition-transform" 
                />
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-sm">
                   <ShieldCheck size={12}/>
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 bg-slate-50 rounded-xl border-2 border-slate-100 flex items-center justify-center">
                <CheckCircle2 className="text-emerald-500 opacity-30" size={32} />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase tracking-tight">
              Physical production phase finished. Farmer must provide high-resolution harvest images in the specialized upload section below to trigger AI analysis.
            </p>
            {role === "FARMER" && (
              <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-white border border-emerald-100 w-fit px-3 py-1.5 rounded-lg shadow-sm">
                <UploadCloud size={14} className="animate-bounce" />
                Upload portal active below
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   STANDARD STAGE ITEM (STAGES 1-6)
========================================================= */

function StageItem({ stage, role, seedSupply, onUpload, onVerify, onView }) {
  const isCompleted = stage.buyerVerified === true;
  const isCurrent = stage.status === "PENDING";
  const isSowingStage = stage.name?.toLowerCase().includes("sowing") || stage.stageIndex === 0;

  const seedBlocked =
    isSowingStage &&
    seedSupply?.provider === "BUYER" &&
    seedSupply?.status !== "VERIFIED";

  const isOverdue = !isCompleted && stage.expectedDays !== undefined && stage.reminder?.levelSent >= 2;

  return (
    <div className="relative flex gap-8 mb-12 group">
      <div className="absolute left-[-42px] top-1 z-10">
        <TimelineIcon
          isCompleted={isCompleted}
          isCurrent={isCurrent}
          isOverdue={isOverdue}
        />
      </div>

      <div className={`w-full rounded-2xl border transition-all duration-300 p-5 ${
        isCompleted ? "bg-white border-slate-200" : 
        isOverdue ? "bg-rose-50/50 border-rose-200 shadow-lg shadow-rose-100/50" : 
        isCurrent ? "bg-white border-blue-200 shadow-xl shadow-blue-50" : "bg-slate-50/50 border-slate-100 grayscale opacity-60"
      }`}>
        <div className="flex justify-between items-start">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phase 0{stage.stageIndex + 1}</span>
              {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>}
            </div>
            <h3 className={`text-base font-black tracking-tight ${isCompleted ? "text-slate-900" : isOverdue ? "text-rose-900" : "text-slate-800"}`}>
              {stage.name}
            </h3>
            {stage.completedAt && (
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tight flex items-center gap-1">
                <CheckCircle2 size={10} className="text-emerald-500"/> Finalized on {new Date(stage.completedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </p>
            )}
          </div>
          <StatusBadge isCompleted={isCompleted} isCurrent={isCurrent} isOverdue={isOverdue} />
        </div>

        {stage.farmerImages?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex -space-x-2">
                 {stage.farmerImages.slice(0, 3).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-slate-200 border-2 border-white flex items-center justify-center">
                       <ImageIcon size={12} className="text-slate-500"/>
                    </div>
                 ))}
               </div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Evidence Logged</span>
            </div>
            <button
              onClick={() => onView?.(stage)}
              className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
            >
              Inspect File
            </button>
          </div>
        )}

        {role === "FARMER" && isCurrent && seedBlocked && (
          <div className="mt-4 flex items-start gap-2 text-[10px] font-black uppercase tracking-tight text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
            <AlertTriangle size={14} className="shrink-0" />
            <span>Dependency Error: Seed verification required before phase activation.</span>
          </div>
        )}

        {role === "FARMER" && isCurrent && !stage.farmerConfirmed && !seedBlocked && (
          <button
            onClick={() => onUpload(stage)}
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
          >
            <UploadCloud size={14} /> Submit Phase Evidence
          </button>
        )}

        {role === "BUYER" && stage.farmerConfirmed && !stage.buyerVerified && (
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => onVerify(stage, true)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-widest bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-md transition-all active:scale-[0.98]"
            >
              <ShieldCheck size={14} /> Verify Phase
            </button>
            <button
              onClick={() => onVerify(stage, false)}
              className="flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all"
            >
              Request Fix
            </button>
          </div>
        )}

        {isCurrent && !isCompleted && !stage.farmerConfirmed && (
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-tighter italic">
            <Clock size={10}/> Pending {role === "FARMER" ? "your submission" : "farmer logs"}...
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   UI HELPERS
========================================================= */

function TimelineIcon({ isCompleted, isCurrent, isOverdue }) {
  if (isCompleted) return (
    <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-100 border-4 border-white transition-all">
       <CheckCircle2 size={18} className="text-white" />
    </div>
  );
  if (isOverdue) return (
    <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-100 border-4 border-white transition-all animate-pulse">
       <AlertTriangle size={18} className="text-white" />
    </div>
  );
  if (isCurrent) return (
    <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100 border-4 border-white transition-all">
       <CircleDot size={18} className="text-white" />
    </div>
  );
  return (
    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center border-4 border-white">
       <CircleDashed size={18} className="text-slate-300" />
    </div>
  );
}

function StatusBadge({ isCompleted, isCurrent, isOverdue }) {
  if (isCompleted) return <Badge label="Verified" color="green" icon={<ShieldCheck size={10}/>} />;
  if (isOverdue) return <Badge label="Overdue" color="red" icon={<AlertCircle size={10}/>} />;
  if (isCurrent) return <Badge label="Active" color="blue" icon={<Activity size={10}/>} />;
  return <Badge label="Queued" color="gray" />;
}

function Badge({ label, color, icon }) {
  const colors = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
    gray: "bg-slate-50 text-slate-400 border-slate-200",
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border flex items-center gap-1 shadow-sm ${colors[color]}`}>
      {icon} {label}
    </span>
  );
}

function Activity({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  );
}

function AlertCircle({ size }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    );
}