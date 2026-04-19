// const mongoose = require("mongoose");
// const User = require("../Models/User");
// const Profile = require("../Models/Profile");
// const BuyerProfile = require("../Models/buyer");
// const CultivationContract = require("../Models/CultivationContract");
// const HarvestContract = require("../Models/HarvestSaleContract");
// const Dispute = require("../Models/Dispute");
// const Contract = require("../Models/BaseContract");
// const Notification = require("../Models/Notification");
// const Support = require("../Models/Support");
// exports.getAllDisputes = async (req, res) => {
//   try {
//     const disputes = await Dispute.find()
//       .populate("contractId")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, disputes });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.resolveDispute = async (req, res) => {
//   try {
//     const { status, response } = req.body;

//     const dispute = await Dispute.findById(req.params.id);

//     if (!dispute) {
//       return res.status(404).json({ message: "Dispute not found" });
//     }

//     // ✅ Update dispute
//     dispute.status = status;
//     dispute.adminResponse = response;
//     dispute.handledBy = req.user._id;
//     dispute.resolvedAt = new Date();

//     await dispute.save();

//     // ✅ FIX: Find contract from BOTH types
//     let contract =
//       (await CultivationContract.findById(dispute.contractId)) ||
//       (await HarvestContract.findById(dispute.contractId));

//     if (!contract) {
//       return res.json({
//         success: true,
//         message: "Dispute resolved (contract not found)",
//       });
//     }

//     // 🔔 Notifications

//     const notifications = [];

//     if (contract?.farmer?.farmerId) {
//       notifications.push({
//         userId: contract.farmer.farmerId,
//         title: "Dispute Update",
//         message: `Your dispute has been ${status}: ${response}`,
//         type: "DISPUTE",
//         relatedContractId: contract._id,
//       });
//     }

//     if (contract?.buyer?.buyerId) {
//       notifications.push({
//         userId: contract.buyer.buyerId,
//         title: "Dispute Update",
//         message: `A dispute has been ${status}: ${response}`,
//         type: "DISPUTE",
//         relatedContractId: contract._id,
//       });
//     }

//     if (notifications.length > 0) {
//       await Notification.create(notifications);
//     }

//     res.json({ success: true, message: "Dispute resolved successfully" });
//   } catch (err) {
//     console.error("RESOLVE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({ role: { $in: ["farmer", "buyer"] } });

//     const farmers = await Promise.all(
//       users
//         .filter((u) => u.role === "farmer")
//         .map(async (user) => {
//           const profile = await Profile.findOne({ userId: user._id });

//           const cultivationCount = await CultivationContract.countDocuments({
//             "farmer.farmerId": user._id,
//           });

//           return {
//             user,
//             profile,
//             contracts: cultivationCount,
//           };
//         }),
//     );

//     const buyers = await Promise.all(
//       users
//         .filter((u) => u.role === "buyer")
//         .map(async (user) => {
//           const profile = await BuyerProfile.findOne({ user: user._id });

//           const harvestCount = await HarvestContract.countDocuments({
//             "buyer.buyerId": user._id,
//           });

//           return {
//             user,
//             profile,
//             contracts: harvestCount,
//           };
//         }),
//     );

//     res.json({ farmers, buyers });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.verifyFarmerPolicy = async (req, res) => {
//   try {
//     const { status, remarks } = req.body;

//     const contract = await CultivationContract.findById(req.params.id);

//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     // 🔥 FIX 1: ensure insurance exists
//     if (!contract.insurance) {
//       contract.insurance = {};
//     }

//     // 🔥 FIX 2: set policyVerification safely
//     contract.policyVerification = {
//       status,
//       remarks,
//       verifiedBy: req.user._id,
//       verifiedAt: new Date(),
//     };

//     console.log("UPDATED POLICY:", contract.insurance.policyVerification);

//     await contract.save();

//     const Notification = require("../Models/Notification");

//     await Notification.create({
//       userId: contract.farmer.farmerId,
//       title:
//         status === "VERIFIED" ? "Policy Approved ✅" : "Policy Rejected ❌",
//       message:
//         status === "VERIFIED"
//           ? "Your insurance policy has been verified successfully."
//           : `Your policy was rejected. Reason: ${remarks}`,
//       type: "SYSTEM",
//       contractId: contract._id,
//       role: "FARMER",
//     });

//     res.json({ success: true });
//   } catch (err) {
//     console.error("VERIFY ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.blockUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     user.status = "blocked";

//     await user.save();

//     res.json({ success: true, message: "User blocked" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.unblockUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     user.status = "active";

//     await user.save();

//     res.json({ success: true, message: "User unblocked" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // exports.freezeContract = async (req, res) => {
// //   try {
// //     const contract = await Contract.findById(req.params.id);

// //     if (!contract) {
// //       return res.status(404).json({ message: "Contract not found" });
// //     }

// //     contract.contractStatus = "FROZEN";
// //     contract.adminOverride = {
// //       isFrozen: true,
// //       frozenBy: req.user._id,
// //       reason: req.body.reason,
// //       actionAt: new Date(),
// //     };

// //     await contract.save();

// //     res.json({ success: true, message: "Contract frozen" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// exports.freezeContract = async (req, res) => {
//   try {
//     const contractId = req.params.id;

//     console.log("🔥 FREEZE REQUEST ID:", contractId);

//     // ✅ Step 1: Find contract using BASE model
//     const contract = await Contract.findById(contractId);

//     if (!contract) {
//       console.log("❌ Contract NOT FOUND");
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     console.log("✅ Contract FOUND:", contract._id);

//     // ✅ Step 2: Freeze contract
//     contract.contractStatus = "FROZEN";
//     contract.adminOverride = {
//       isFrozen: true,
//       frozenBy: req.user._id,
//       reason: req.body.reason || "Admin freeze",
//       actionAt: new Date(),
//     };

//     await contract.save();

//     console.log("✅ Contract UPDATED:", contract.contractStatus);

//     // ✅ Step 3: Find dispute
//     const dispute = await Dispute.findOne({
//       contractId: new mongoose.Types.ObjectId(contractId),
//     });

//     console.log("🔍 Dispute FOUND:", dispute);

//     // ✅ Step 4: Update dispute
//     if (dispute && dispute.status === "OPEN") {
//       dispute.status = "UNDER_REVIEW";
//       await dispute.save();
//       console.log("✅ Dispute UPDATED to UNDER_REVIEW");
//     }

//     res.json({
//       success: true,
//       message: "Contract frozen & dispute updated",
//     });
//   } catch (err) {
//     console.error("❌ FREEZE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getDashboardStats = async (req, res) => {
//   try {
//     const now = new Date();
//     const lastWeek = new Date();
//     lastWeek.setDate(now.getDate() - 7);

//     /* ================= USERS ================= */
//     const farmers = await User.countDocuments({ role: "farmer" });
//     const buyers = await User.countDocuments({ role: "buyer" });

//     const newFarmers = await User.countDocuments({
//       role: "farmer",
//       createdAt: { $gte: lastWeek },
//     });

//     /* ================= CONTRACTS ================= */
//     const cultivationContracts = await CultivationContract.find();
//     const harvestContracts = await HarvestContract.find();

//     const allContracts = [...cultivationContracts, ...harvestContracts];

//     const totalContracts = allContracts.length;

//     const active = allContracts.filter(
//       (c) => c.contractStatus === "ACTIVE",
//     ).length;

//     const completed = allContracts.filter(
//       (c) => c.contractStatus === "COMPLETED",
//     ).length;

//     const cancelled = allContracts.filter(
//       (c) => c.contractStatus === "CANCELLED",
//     ).length;

//     const newContracts = allContracts.filter(
//       (c) => new Date(c.createdAt) >= lastWeek,
//     ).length;

//     /* ================= DISPUTES ================= */
//     const disputes = await Dispute.countDocuments({ status: "OPEN" });

//     /* ================= SUPPORT ================= */
//     let supportCount = 0;
//     let highPriority = 0;

//     try {
//       const Support = require("../Models/Support");

//       supportCount = await Support.countDocuments({
//         status: { $ne: "RESOLVED" },
//       });

//       highPriority = await Support.countDocuments({
//         priority: "HIGH",
//         status: { $ne: "RESOLVED" },
//       });
//     } catch (err) {
//       // ignore if model not present
//     }

//     /* ================= ALERTS ================= */
//     const alerts = [];

//     if (disputes > 0) {
//       alerts.push({
//         message: `${disputes} disputes need attention`,
//         time: "now",
//       });
//     }

//     if (highPriority > 0) {
//       alerts.push({
//         message: `${highPriority} high priority support tickets`,
//         time: "now",
//       });
//     }

//     if (active < 5) {
//       alerts.push({
//         message: "Low active contracts",
//         time: "now",
//       });
//     }

//     /* ================= ACTIVITY ================= */
//     const activities = [];

//     // latest users
//     const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3);

//     recentUsers.forEach((u) => {
//       activities.push({
//         message: `${u.name} joined as ${u.role}`,
//         time: formatTime(u.createdAt),
//       });
//     });

//     // latest contracts
//     const recentContracts = allContracts
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 3);

//     recentContracts.forEach((c) => {
//       activities.push({
//         message: `Contract created (${c.cropDetails?.cropName || "Crop"})`,
//         time: formatTime(c.createdAt),
//       });
//     });

//     /* ================= GROWTH ================= */
//     const growth = {
//       newFarmers,
//       newContracts,
//       engagement: Math.min(
//         100,
//         Math.round((active / (totalContracts || 1)) * 100),
//       ),
//     };

//     /* ================= RESPONSE ================= */
//     res.json({
//       success: true,
//       stats: {
//         farmers,
//         buyers,
//         disputes,
//         contracts: totalContracts,
//         active,
//         completed,
//         cancelled,
//         support: supportCount,
//       },
//       alerts,
//       activities,
//       growth,
//     });
//   } catch (err) {
//     console.error("DASHBOARD ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= HELPER ================= */
// function formatTime(date) {
//   const diff = Math.floor((Date.now() - new Date(date)) / 60000);

//   if (diff < 60) return `${diff}m ago`;
//   if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
//   return `${Math.floor(diff / 1440)}d ago`;
// }

// exports.getAllPolicies = async (req, res) => {
//   try {
//     const contracts = await CultivationContract.find({
//       "insurance.policyNumber": { $ne: "" },
//     })
//       .lean() // 🔥 VERY IMPORTANT
//       .sort({ createdAt: -1 });
//     const grouped = {};

//     for (const c of contracts) {
//       const farmerId = c.farmer.farmerId.toString();

//       const profile = await Profile.findOne({ userId: farmerId });

//       if (!grouped[farmerId]) {
//         grouped[farmerId] = {
//           user: {
//             id: farmerId,
//             name: profile?.personal?.fullName || c.farmer.name,
//             email: profile?.personal?.email || "N/A",
//             phone: profile?.personal?.phone || "N/A",
//           },
//           policies: [],
//         };
//       }

//       // grouped[farmerId].policies.push({
//       //   contractId: c._id,
//       //   insurance: {
//       //     ...c.insurance,

//       //     // 🔥 FIX: ensure correct data comes
//       //     policyVerification: c.policyVerification || {
//       //       status: "PENDING",
//       //     },
//       //   },
//       // });
//       grouped[farmerId].policies.push({
//         contractId: c._id,
//         insurance: c.insurance,
//         policyVerification: c.policyVerification || { status: "PENDING" },
//       });
//       console.log("FROM DB:", c.policyVerification);
//     }

//     res.json({ success: true, policies: Object.values(grouped) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.resubmitPolicy = async (req, res) => {
//   try {
//     const contract = await CultivationContract.findById(req.params.id);

//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     const { providerName, policyNumber, policyValidTill, flood, drought } =
//       req.body;

//     // 🔥 Update insurance
//     contract.insurance.providerName = providerName;
//     contract.insurance.policyNumber = policyNumber;
//     contract.insurance.policyValidTill = policyValidTill;

//     contract.insurance.riskManagement = {
//       flood,
//       drought,
//     };

//     // 🔥 Update document
//     if (req.file) {
//       contract.insurance.documentUrl = req.file.path;
//     }

//     // 🔥 RESET STATUS
//     contract.policyVerification = {
//       status: "RESUBMITTED",
//       remarks: "Resubmitted by farmer",
//       verifiedAt: null,
//       verifiedBy: null,
//     };

//     await contract.save();

//     res.json({ success: true });
//   } catch (err) {
//     console.error("RESUBMIT ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.createSupportTicket = async (req, res) => {
//   try {
//     const ticket = await Support.create({
//       userId: req.user._id,
//       subject: req.body.subject,
//       problem: req.body.problem,
//       fileUrl: req.file ? req.file.path : null,
//     });

//     res.json({ success: true, ticket });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Support.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, tickets });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.updateTicket = async (req, res) => {
//   try {
//     const { status, note, reply } = req.body;

//     const ticket = await Support.findById(req.params.id);

//     if (!ticket) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     if (status) ticket.status = status;

//     if (note) {
//       ticket.adminNotes.push({ text: note });
//     }

//     if (reply) {
//       ticket.replies.push({
//         message: reply,
//         from: "ADMIN",
//       });

//       // 🔔 OPTIONAL: create notification
//       const Notification = require("../Models/Notification");

//       await Notification.create({
//         userId: ticket.userId,
//         title: "Admin Response 📩",
//         message: reply,
//         type: "SUPPORT",
//       });
//     }

//     await ticket.save();

//     res.json({ success: true, ticket });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getAdminAnalytics = async (req, res) => {
//   try {
//     const { range = "7d" } = req.query;

//     const now = new Date();
//     const start = new Date();
//     const prevStart = new Date();

//     if (range === "7d") {
//       start.setDate(now.getDate() - 7);
//       prevStart.setDate(now.getDate() - 14);
//     } else if (range === "30d") {
//       start.setDate(now.getDate() - 30);
//       prevStart.setDate(now.getDate() - 60);
//     }

//     /* ================= CURRENT ================= */
//     const contracts = await CultivationContract.find({
//       createdAt: { $gte: start },
//     });

//     /* ================= PREVIOUS ================= */
//     const prevContracts = await CultivationContract.find({
//       createdAt: { $gte: prevStart, $lt: start },
//     });

//     /* ================= REVENUE ================= */
//     const calcRevenue = (list) => {
//       let total = 0;

//       list.forEach((c) => {
//         let value = 0;

//         if (c.pricing?.estimatedValue) {
//           value = c.pricing.estimatedValue;
//         } else if (
//           c.pricing?.agreedPricePerUnit &&
//           c.cropDetails?.expectedYield
//         ) {
//           value =
//             c.pricing.agreedPricePerUnit * Number(c.cropDetails.expectedYield);
//         }

//         total += Number(value || 0);
//       });

//       return total;
//     };

//     const totalRevenue = calcRevenue(contracts);
//     const prevRevenue = calcRevenue(prevContracts);

//     const revenueGrowth =
//       prevRevenue > 0
//         ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100)
//         : 0;

//     /* ================= CONTRACTS ================= */
//     const totalContracts = contracts.length;
//     const prevCount = prevContracts.length;

//     const contractGrowth =
//       prevCount > 0
//         ? Math.round(((totalContracts - prevCount) / prevCount) * 100)
//         : 0;

//     /* ================= POLICY ================= */
//     let verified = 0,
//       rejected = 0,
//       pending = 0;

//     contracts.forEach((c) => {
//       const s = c.policyVerification?.status || "PENDING";
//       if (s === "VERIFIED") verified++;
//       else if (s === "REJECTED") rejected++;
//       else pending++;
//     });

//     const approvalRate = totalContracts
//       ? Math.round((verified / totalContracts) * 100)
//       : 0;

//     /* ================= MONTHLY REVENUE ================= */
//     const revenueChart = await CultivationContract.aggregate([
//       {
//         $match: { createdAt: { $gte: start } },
//       },
//       {
//         $group: {
//           _id: {
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//             },
//           },
//           revenue: { $sum: "$pricing.estimatedValue" },
//         },
//       },
//       { $sort: { "_id.date": 1 } },
//     ]);

//     const revenueData =
//       revenueChart.length > 0
//         ? revenueChart.map((r) => ({
//             date: r._id.date,
//             revenue: r.revenue,
//           }))
//         : [{ date: "No Data", revenue: 0 }];

//     /* ================= FARMER GROWTH ================= */
//     const farmerGrowth = await User.aggregate([
//       {
//         $match: {
//           role: "farmer",
//           createdAt: { $gte: start },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//             },
//           },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id.date": 1 } },
//     ]);

//     const farmerData =
//       farmerGrowth.length > 0
//         ? farmerGrowth.map((d) => ({
//             date: d._id.date,
//             count: d.count,
//           }))
//         : [{ date: "No Data", count: 0 }];

//     /* ================= AI INSIGHTS ================= */
//     let insights = [];

//     if (revenueGrowth > 0)
//       insights.push(`📈 Revenue increased by ${revenueGrowth}%`);

//     if (approvalRate < 50) insights.push("⚠️ Policy approval rate is low");

//     if (totalContracts === 1)
//       insights.push("⚠️ Only 1 contract — platform underutilized");

//     if (rejected > verified)
//       insights.push("🚨 More policies rejected than approved");

//     if (totalRevenue === 0)
//       insights.push("💰 No revenue — check pricing setup");

//     /* ================= RESPONSE ================= */
//     res.json({
//       totalRevenue,
//       revenueGrowth,
//       totalContracts,
//       contractGrowth,
//       approvalRate,
//       policyStats: [
//         { name: "Verified", value: verified },
//         { name: "Rejected", value: rejected },
//         { name: "Pending", value: pending },
//       ],
//       revenueData,
//       farmerData,
//       insights,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// const mongoose = require("mongoose");
// const User = require("../Models/User");
// const Profile = require("../Models/Profile");
// const BuyerProfile = require("../Models/buyer");
// const CultivationContract = require("../Models/CultivationContract");
// const HarvestContract = require("../Models/HarvestSaleContract");
// const Dispute = require("../Models/Dispute");
// const Contract = require("../Models/BaseContract");
// const Notification = require("../Models/Notification");
// const Support = require("../Models/Support");

// exports.getAllDisputes = async (req, res) => {
//   try {
//     const disputes = await Dispute.find()
//       .populate("contractId")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, disputes });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.resolveDispute = async (req, res) => {
//   try {
//     const { status, response } = req.body;

//     const dispute = await Dispute.findById(req.params.id);

//     if (!dispute) {
//       return res.status(404).json({ message: "Dispute not found" });
//     }

//     dispute.status = status;
//     dispute.adminResponse = response;
//     dispute.handledBy = req.user._id;
//     dispute.resolvedAt = new Date();

//     await dispute.save();

//     let contract =
//       (await CultivationContract.findById(dispute.contractId)) ||
//       (await HarvestContract.findById(dispute.contractId));

//     if (!contract) {
//       return res.json({
//         success: true,
//         message: "Dispute resolved (contract not found)",
//       });
//     }

//     const notifications = [];

//     if (contract?.farmer?.farmerId) {
//       notifications.push({
//         userId: contract.farmer.farmerId,
//         title: "Dispute Update",
//         message: `Your dispute has been ${status}: ${response}`,
//         type: "DISPUTE",
//         relatedContractId: contract._id,
//       });
//     }

//     if (contract?.buyer?.buyerId) {
//       notifications.push({
//         userId: contract.buyer.buyerId,
//         title: "Dispute Update",
//         message: `A dispute has been ${status}: ${response}`,
//         type: "DISPUTE",
//         relatedContractId: contract._id,
//       });
//     }

//     if (notifications.length > 0) {
//       await Notification.create(notifications);
//     }

//     res.json({ success: true, message: "Dispute resolved successfully" });
//   } catch (err) {
//     console.error("RESOLVE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ============================================================
//    FEATURE 1: UPDATED WITH SECURITY RISK SCORING
//    ============================================================ */
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({ role: { $in: ["farmer", "buyer"] } });

//     const farmers = await Promise.all(
//       users
//         .filter((u) => u.role === "farmer")
//         .map(async (user) => {
//           const profile = await Profile.findOne({ userId: user._id });

//           const cultivationCount = await CultivationContract.countDocuments({
//             "farmer.farmerId": user._id,
//           });

//           // Logic-Safe Addition: Security Risk Calculation
//           const openDisputeCount = await Dispute.countDocuments({
//             contractId: { $in: await CultivationContract.find({"farmer.farmerId": user._id}).distinct('_id') },
//             status: "OPEN"
//           });

//           let riskLevel = "Low";
//           if (user.status === "blocked" || openDisputeCount > 2) riskLevel = "High";
//           else if (openDisputeCount > 0) riskLevel = "Medium";

//           return {
//             user,
//             profile,
//             contracts: cultivationCount,
//             riskLevel, // Feature 1: Passed to UI
//           };
//         }),
//     );

//     const buyers = await Promise.all(
//       users
//         .filter((u) => u.role === "buyer")
//         .map(async (user) => {
//           const profile = await BuyerProfile.findOne({ user: user._id });

//           const harvestCount = await HarvestContract.countDocuments({
//             "buyer.buyerId": user._id,
//           });

//           // Logic-Safe Addition: Security Risk Calculation
//           const openDisputeCount = await Dispute.countDocuments({
//             contractId: { $in: await HarvestContract.find({"buyer.buyerId": user._id}).distinct('_id') },
//             status: "OPEN"
//           });

//           let riskLevel = "Low";
//           if (user.status === "blocked" || openDisputeCount > 1) riskLevel = "High";
//           else if (openDisputeCount > 0) riskLevel = "Medium";

//           return {
//             user,
//             profile,
//             contracts: harvestCount,
//             riskLevel, // Feature 1: Passed to UI
//           };
//         }),
//     );

//     res.json({ farmers, buyers });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.verifyFarmerPolicy = async (req, res) => {
//   try {
//     const { status, remarks } = req.body;

//     const contract = await CultivationContract.findById(req.params.id);

//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     if (!contract.insurance) {
//       contract.insurance = {};
//     }

//     contract.policyVerification = {
//       status,
//       remarks,
//       verifiedBy: req.user._id,
//       verifiedAt: new Date(),
//     };

//     await contract.save();

//     const Notification = require("../Models/Notification");

//     await Notification.create({
//       userId: contract.farmer.farmerId,
//       title: status === "VERIFIED" ? "Policy Approved ✅" : "Policy Rejected ❌",
//       message: status === "VERIFIED"
//           ? "Your insurance policy has been verified successfully."
//           : `Your policy was rejected. Reason: ${remarks}`,
//       type: "SYSTEM",
//       contractId: contract._id,
//       role: "FARMER",
//     });

//     res.json({ success: true });
//   } catch (err) {
//     console.error("VERIFY ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.blockUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.status = "blocked";
//     await user.save();
//     res.json({ success: true, message: "User blocked" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.unblockUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.status = "active";
//     await user.save();
//     res.json({ success: true, message: "User unblocked" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.freezeContract = async (req, res) => {
//   try {
//     const contractId = req.params.id;
//     const contract = await Contract.findById(contractId);

//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     contract.contractStatus = "FROZEN";
//     contract.adminOverride = {
//       isFrozen: true,
//       frozenBy: req.user._id,
//       reason: req.body.reason || "Admin freeze",
//       actionAt: new Date(),
//     };

//     await contract.save();

//     const dispute = await Dispute.findOne({
//       contractId: new mongoose.Types.ObjectId(contractId),
//     });

//     if (dispute && dispute.status === "OPEN") {
//       dispute.status = "UNDER_REVIEW";
//       await dispute.save();
//     }

//     res.json({
//       success: true,
//       message: "Contract frozen & dispute updated",
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ============================================================
//    FEATURE 4: UPDATED DASHBOARD STATS WITH COMPLIANCE TRACKER
//    ============================================================ */
// exports.getDashboardStats = async (req, res) => {
//   try {
//     const now = new Date();
//     const lastWeek = new Date();
//     lastWeek.setDate(now.getDate() - 7);
//     const thirtyDaysFromNow = new Date();
//     thirtyDaysFromNow.setDate(now.getDate() + 30);

//     const farmers = await User.countDocuments({ role: "farmer" });
//     const buyers = await User.countDocuments({ role: "buyer" });

//     const newFarmers = await User.countDocuments({
//       role: "farmer",
//       createdAt: { $gte: lastWeek },
//     });

//     const cultivationContracts = await CultivationContract.find();
//     const harvestContracts = await HarvestContract.find();

//     const allContracts = [...cultivationContracts, ...harvestContracts];

//     // Feature 4 Logic: Insurance Expiry Tracking
//     const complianceAlerts = cultivationContracts
//       .filter(c => c.contractStatus === "ACTIVE" && c.insurance?.policyValidTill)
//       .map(c => {
//         const expiryDate = new Date(c.insurance.policyValidTill);
//         const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

//         if (daysRemaining <= 30) {
//           return {
//             farmerName: c.farmer.name,
//             daysRemaining,
//             severity: daysRemaining < 0 ? "CRITICAL" : daysRemaining <= 15 ? "URGENT" : "WARNING"
//           };
//         }
//         return null;
//       })
//       .filter(Boolean);

//     const totalContracts = allContracts.length;
//     const active = allContracts.filter((c) => c.contractStatus === "ACTIVE").length;
//     const completed = allContracts.filter((c) => c.contractStatus === "COMPLETED").length;
//     const cancelled = allContracts.filter((c) => c.contractStatus === "CANCELLED").length;
//     const newContracts = allContracts.filter((c) => new Date(c.createdAt) >= lastWeek).length;

//     const disputes = await Dispute.countDocuments({ status: "OPEN" });

//     let supportCount = 0;
//     let highPriority = 0;

//     try {
//       const Support = require("../Models/Support");
//       supportCount = await Support.countDocuments({
//         status: { $ne: "RESOLVED" },
//       });
//       highPriority = await Support.countDocuments({
//         priority: "HIGH",
//         status: { $ne: "RESOLVED" },
//       });
//     } catch (err) {}

//     const alerts = [];
//     if (disputes > 0) {
//       alerts.push({ message: `${disputes} disputes need attention`, time: "now" });
//     }
//     if (highPriority > 0) {
//       alerts.push({ message: `${highPriority} high priority support tickets`, time: "now" });
//     }
//     if (active < 5) {
//       alerts.push({ message: "Low active contracts", time: "now" });
//     }

//     const activities = [];
//     const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3);
//     recentUsers.forEach((u) => {
//       activities.push({
//         message: `${u.name} joined as ${u.role}`,
//         time: formatTime(u.createdAt),
//       });
//     });

//     const recentContracts = allContracts
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 3);

//     recentContracts.forEach((c) => {
//       activities.push({
//         message: `Contract created (${c.cropDetails?.cropName || "Crop"})`,
//         time: formatTime(c.createdAt),
//       });
//     });

//     const growth = {
//       newFarmers,
//       newContracts,
//       engagement: Math.min(
//         100,
//         Math.round((active / (totalContracts || 1)) * 100),
//       ),
//     };

//     res.json({
//       success: true,
//       stats: {
//         farmers,
//         buyers,
//         disputes,
//         contracts: totalContracts,
//         active,
//         completed,
//         cancelled,
//         support: supportCount,
//       },
//       alerts,
//       complianceAlerts, // Feature 4: Passed to Dashboard UI
//       activities,
//       growth,
//     });
//   } catch (err) {
//     console.error("DASHBOARD ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// function formatTime(date) {
//   const diff = Math.floor((Date.now() - new Date(date)) / 60000);
//   if (diff < 60) return `${diff}m ago`;
//   if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
//   return `${Math.floor(diff / 1440)}d ago`;
// }

// exports.getAllPolicies = async (req, res) => {
//   try {
//     const contracts = await CultivationContract.find({
//       "insurance.policyNumber": { $ne: "" },
//     })
//       .lean()
//       .sort({ createdAt: -1 });
//     const grouped = {};

//     for (const c of contracts) {
//       const farmerId = c.farmer.farmerId.toString();
//       const profile = await Profile.findOne({ userId: farmerId });

//       if (!grouped[farmerId]) {
//         grouped[farmerId] = {
//           user: {
//             id: farmerId,
//             name: profile?.personal?.fullName || c.farmer.name,
//             email: profile?.personal?.email || "N/A",
//             phone: profile?.personal?.phone || "N/A",
//           },
//           policies: [],
//         };
//       }

//       grouped[farmerId].policies.push({
//         contractId: c._id,
//         insurance: c.insurance,
//         policyVerification: c.policyVerification || { status: "PENDING" },
//       });
//     }

//     res.json({ success: true, policies: Object.values(grouped) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.resubmitPolicy = async (req, res) => {
//   try {
//     const contract = await CultivationContract.findById(req.params.id);

//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     const { providerName, policyNumber, policyValidTill, flood, drought } =
//       req.body;

//     contract.insurance.providerName = providerName;
//     contract.insurance.policyNumber = policyNumber;
//     contract.insurance.policyValidTill = policyValidTill;

//     contract.insurance.riskManagement = {
//       flood,
//       drought,
//     };

//     if (req.file) {
//       contract.insurance.documentUrl = req.file.path;
//     }

//     contract.policyVerification = {
//       status: "RESUBMITTED",
//       remarks: "Resubmitted by farmer",
//       verifiedAt: null,
//       verifiedBy: null,
//     };

//     await contract.save();

//     res.json({ success: true });
//   } catch (err) {
//     console.error("RESUBMIT ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createSupportTicket = async (req, res) => {
//   try {
//     const ticket = await Support.create({
//       userId: req.user._id,
//       subject: req.body.subject,
//       problem: req.body.problem,
//       fileUrl: req.file ? req.file.path : null,
//     });

//     res.json({ success: true, ticket });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Support.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, tickets });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateTicket = async (req, res) => {
//   try {
//     const { status, note, reply } = req.body;

//     const ticket = await Support.findById(req.params.id);

//     if (!ticket) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     if (status) ticket.status = status;

//     if (note) {
//       ticket.adminNotes.push({ text: note });
//     }

//     if (reply) {
//       ticket.replies.push({
//         message: reply,
//         from: "ADMIN",
//       });

//       const Notification = require("../Models/Notification");

//       await Notification.create({
//         userId: ticket.userId,
//         title: "Admin Response 📩",
//         message: reply,
//         type: "SUPPORT",
//       });
//     }

//     await ticket.save();

//     res.json({ success: true, ticket });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAdminAnalytics = async (req, res) => {
//   try {
//     const { range = "7d" } = req.query;

//     const now = new Date();
//     const start = new Date();
//     const prevStart = new Date();

//     if (range === "7d") {
//       start.setDate(now.getDate() - 7);
//       prevStart.setDate(now.getDate() - 14);
//     } else if (range === "30d") {
//       start.setDate(now.getDate() - 30);
//       prevStart.setDate(now.getDate() - 60);
//     }

//     const contracts = await CultivationContract.find({
//       createdAt: { $gte: start },
//     });

//     const prevContracts = await CultivationContract.find({
//       createdAt: { $gte: prevStart, $lt: start },
//     });

//     const calcRevenue = (list) => {
//       let total = 0;
//       list.forEach((c) => {
//         let value = 0;
//         if (c.pricing?.estimatedValue) {
//           value = c.pricing.estimatedValue;
//         } else if (
//           c.pricing?.agreedPricePerUnit &&
//           c.cropDetails?.expectedYield
//         ) {
//           value =
//             c.pricing.agreedPricePerUnit * Number(c.cropDetails.expectedYield);
//         }
//         total += Number(value || 0);
//       });
//       return total;
//     };

//     const totalRevenue = calcRevenue(contracts);
//     const prevRevenue = calcRevenue(prevContracts);

//     const revenueGrowth =
//       prevRevenue > 0
//         ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100)
//         : 0;

//     const totalContracts = contracts.length;
//     const prevCount = prevContracts.length;

//     const contractGrowth =
//       prevCount > 0
//         ? Math.round(((totalContracts - prevCount) / prevCount) * 100)
//         : 0;

//     let verified = 0,
//       rejected = 0,
//       pending = 0;

//     contracts.forEach((c) => {
//       const s = c.policyVerification?.status || "PENDING";
//       if (s === "VERIFIED") verified++;
//       else if (s === "REJECTED") rejected++;
//       else pending++;
//     });

//     const approvalRate = totalContracts
//       ? Math.round((verified / totalContracts) * 100)
//       : 0;

//     const revenueChart = await CultivationContract.aggregate([
//       {
//         $match: { createdAt: { $gte: start } },
//       },
//       {
//         $group: {
//           _id: {
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//             },
//           },
//           revenue: { $sum: "$pricing.estimatedValue" },
//         },
//       },
//       { $sort: { "_id.date": 1 } },
//     ]);

//     const revenueData =
//       revenueChart.length > 0
//         ? revenueChart.map((r) => ({
//             date: r._id.date,
//             revenue: r.revenue,
//           }))
//         : [{ date: "No Data", revenue: 0 }];

//     const farmerGrowth = await User.aggregate([
//       {
//         $match: {
//           role: "farmer",
//           createdAt: { $gte: start },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//             },
//           },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id.date": 1 } },
//     ]);

//     const farmerData =
//       farmerGrowth.length > 0
//         ? farmerGrowth.map((d) => ({
//             date: d._id.date,
//             count: d.count,
//           }))
//         : [{ date: "No Data", count: 0 }];

//     let insights = [];
//     if (revenueGrowth > 0)
//       insights.push(`📈 Revenue increased by ${revenueGrowth}%`);

//     if (approvalRate < 50) insights.push("⚠️ Policy approval rate is low");

//     if (totalContracts === 1)
//       insights.push("⚠️ Only 1 contract — platform underutilized");

//     if (rejected > verified)
//       insights.push("🚨 More policies rejected than approved");

//     if (totalRevenue === 0)
//       insights.push("💰 No revenue — check pricing setup");

//     res.json({
//       totalRevenue,
//       revenueGrowth,
//       totalContracts,
//       contractGrowth,
//       approvalRate,
//       policyStats: [
//         { name: "Verified", value: verified },
//         { name: "Rejected", value: rejected },
//         { name: "Pending", value: pending },
//       ],
//       revenueData,
//       farmerData,
//       insights,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// const mongoose = require("mongoose");
// const User = require("../Models/User");
// const Profile = require("../Models/Profile");
// const BuyerProfile = require("../Models/buyer");
// const CultivationContract = require("../Models/CultivationContract");
// const HarvestContract = require("../Models/HarvestSaleContract");
// const Dispute = require("../Models/Dispute");
// const Contract = require("../Models/BaseContract");
// const Notification = require("../Models/Notification");
// const Support = require("../Models/Support");

// exports.getAllDisputes = async (req, res) => {
//   try {
//     const disputes = await Dispute.find()
//       .populate("contractId")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, disputes });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.resolveDispute = async (req, res) => {
//   try {
//     const { status, response } = req.body;
//     const dispute = await Dispute.findById(req.params.id);

//     if (!dispute) {
//       return res.status(404).json({ message: "Dispute not found" });
//     }

//     dispute.status = status;
//     dispute.adminResponse = response;
//     dispute.handledBy = req.user._id;
//     dispute.resolvedAt = new Date();

//     await dispute.save();

//     let contract =
//       (await CultivationContract.findById(dispute.contractId)) ||
//       (await HarvestContract.findById(dispute.contractId));

//     if (!contract) {
//       return res.json({
//         success: true,
//         message: "Dispute resolved (contract not found)",
//       });
//     }

//     const notifications = [];

//     if (contract?.farmer?.farmerId) {
//       notifications.push({
//         userId: contract.farmer.farmerId,
//         title: "Dispute Update",
//         message: `Your dispute has been ${status}: ${response}`,
//         type: "DISPUTE",
//         relatedContractId: contract._id,
//       });
//     }

//     if (contract?.buyer?.buyerId) {
//       notifications.push({
//         userId: contract.buyer.buyerId,
//         title: "Dispute Update",
//         message: `A dispute has been ${status}: ${response}`,
//         type: "DISPUTE",
//         relatedContractId: contract._id,
//       });
//     }

//     if (notifications.length > 0) {
//       await Notification.create(notifications);
//     }

//     res.json({ success: true, message: "Dispute resolved successfully" });
//   } catch (err) {
//     console.error("RESOLVE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({ role: { $in: ["farmer", "buyer"] } });

//     const farmers = await Promise.all(
//       users
//         .filter((u) => u.role === "farmer")
//         .map(async (user) => {
//           const profile = await Profile.findOne({ userId: user._id });
//           const cultivationCount = await CultivationContract.countDocuments({
//             "farmer.farmerId": user._id,
//           });
//           const openDisputeCount = await Dispute.countDocuments({
//             contractId: { $in: await CultivationContract.find({"farmer.farmerId": user._id}).distinct('_id') },
//             status: "OPEN"
//           });
//           let riskLevel = "Low";
//           if (user.status === "blocked" || openDisputeCount > 2) riskLevel = "High";
//           else if (openDisputeCount > 0) riskLevel = "Medium";

//           return { user, profile, contracts: cultivationCount, riskLevel };
//         }),
//     );

//     const buyers = await Promise.all(
//       users
//         .filter((u) => u.role === "buyer")
//         .map(async (user) => {
//           const profile = await BuyerProfile.findOne({ user: user._id });
//           const harvestCount = await HarvestContract.countDocuments({
//             "buyer.buyerId": user._id,
//           });
//           const openDisputeCount = await Dispute.countDocuments({
//             contractId: { $in: await HarvestContract.find({"buyer.buyerId": user._id}).distinct('_id') },
//             status: "OPEN"
//           });
//           let riskLevel = "Low";
//           if (user.status === "blocked" || openDisputeCount > 1) riskLevel = "High";
//           else if (openDisputeCount > 0) riskLevel = "Medium";

//           return { user, profile, contracts: harvestCount, riskLevel };
//         }),
//     );

//     res.json({ farmers, buyers });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.verifyFarmerPolicy = async (req, res) => {
//   try {
//     const { status, remarks } = req.body;
//     const contract = await CultivationContract.findById(req.params.id);
//     if (!contract) return res.status(404).json({ message: "Contract not found" });
//     if (!contract.insurance) contract.insurance = {};
//     contract.policyVerification = { status, remarks, verifiedBy: req.user._id, verifiedAt: new Date() };
//     await contract.save();
//     const Notification = require("../Models/Notification");
//     await Notification.create({
//       userId: contract.farmer.farmerId,
//       title: status === "VERIFIED" ? "Policy Approved ✅" : "Policy Rejected ❌",
//       message: status === "VERIFIED" ? "Policy verified successfully." : `Your policy was rejected. Reason: ${remarks}`,
//       type: "SYSTEM",
//       contractId: contract._id,
//       role: "FARMER",
//     });
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.blockUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.status = "blocked";
//     await user.save();
//     res.json({ success: true, message: "User blocked" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.unblockUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.status = "active";
//     await user.save();
//     res.json({ success: true, message: "User unblocked" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.freezeContract = async (req, res) => {
//   try {
//     const contractId = req.params.id;
//     const contract = await Contract.findById(contractId);
//     if (!contract) return res.status(404).json({ message: "Contract not found" });
//     contract.contractStatus = "FROZEN";
//     contract.adminOverride = { isFrozen: true, frozenBy: req.user._id, reason: req.body.reason || "Admin freeze", actionAt: new Date() };
//     await contract.save();
//     const dispute = await Dispute.findOne({ contractId: new mongoose.Types.ObjectId(contractId) });
//     if (dispute && dispute.status === "OPEN") {
//       dispute.status = "UNDER_REVIEW";
//       await dispute.save();
//     }
//     res.json({ success: true, message: "Contract frozen & dispute updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getDashboardStats = async (req, res) => {
//   try {
//     const now = new Date();
//     const lastWeek = new Date();
//     lastWeek.setDate(now.getDate() - 7);

//     const totalFarmers = await User.countDocuments({ role: "farmer" });
//     const totalBuyers = await User.countDocuments({ role: "buyer" });
//     const newFarmers = await User.countDocuments({ role: "farmer", createdAt: { $gte: lastWeek } });
//     const newBuyers = await User.countDocuments({ role: "buyer", createdAt: { $gte: lastWeek } });

//     const cultivationContracts = await CultivationContract.find();
//     const harvestContracts = await HarvestContract.find();
//     const allContracts = [...cultivationContracts, ...harvestContracts];
//     const totalContractsCount = allContracts.length || 1;

//     const statusCounts = {
//       active: allContracts.filter(c => c.contractStatus === "ACTIVE").length,
//       completed: allContracts.filter(c => c.contractStatus === "COMPLETED").length,
//       pending: allContracts.filter(c => c.contractStatus === "PENDING").length,
//       cancelled: allContracts.filter(c => ["CANCELLED", "TERMINATED", "FROZEN"].includes(c.contractStatus)).length
//     };

//     const engagement = Math.min(100, Math.round((statusCounts.active / (totalFarmers + totalBuyers || 1)) * 100));

//     const activities = [];
//     const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3);
//     recentUsers.forEach((u) => activities.push({ message: `${u.name} joined as ${u.role}`, time: formatTime(u.createdAt) }));

//     const recentContracts = allContracts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2);
//     recentContracts.forEach((c) => activities.push({ message: `Contract created (${c.cropDetails?.cropName || "Crop"})`, time: formatTime(c.createdAt) }));

//     const disputes = await Dispute.countDocuments({ status: "OPEN" });
//     const alerts = [];
//     if (disputes > 0) alerts.push({ message: `${disputes} active disputes`, time: "now" });

//     res.json({
//       success: true,
//       stats: {
//         farmers: totalFarmers,
//         buyers: totalBuyers,
//         active: statusCounts.active,
//         disputes,
//         breakdown: {
//           active: Math.round((statusCounts.active / totalContractsCount) * 100),
//           completed: Math.round((statusCounts.completed / totalContractsCount) * 100),
//           pending: Math.round((statusCounts.pending / totalContractsCount) * 100),
//           cancelled: Math.round((statusCounts.cancelled / totalContractsCount) * 100)
//         }
//       },
//       growth: { newFarmers, newBuyers, engagement },
//       alerts,
//       activities
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// function formatTime(date) {
//   const diff = Math.floor((Date.now() - new Date(date)) / 60000);
//   if (diff < 60) return `${diff}m ago`;
//   if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
//   return `${Math.floor(diff / 1440)}d ago`;
// }

// exports.getAllPolicies = async (req, res) => {
//   try {
//     const contracts = await CultivationContract.find({ "insurance.policyNumber": { $ne: "" } }).lean().sort({ createdAt: -1 });
//     const grouped = {};
//     for (const c of contracts) {
//       const farmerId = c.farmer.farmerId.toString();
//       const profile = await Profile.findOne({ userId: farmerId });
//       if (!grouped[farmerId]) {
//         grouped[farmerId] = { user: { id: farmerId, name: profile?.personal?.fullName || c.farmer.name, email: profile?.personal?.email || "N/A" }, policies: [] };
//       }
//       grouped[farmerId].policies.push({ contractId: c._id, insurance: c.insurance, policyVerification: c.policyVerification || { status: "PENDING" } });
//     }
//     res.json({ success: true, policies: Object.values(grouped) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.resubmitPolicy = async (req, res) => {
//   try {
//     const contract = await CultivationContract.findById(req.params.id);
//     if (!contract) return res.status(404).json({ message: "Contract not found" });
//     const { providerName, policyNumber, policyValidTill, flood, drought } = req.body;
//     contract.insurance.providerName = providerName; contract.insurance.policyNumber = policyNumber; contract.insurance.policyValidTill = policyValidTill;
//     contract.insurance.riskManagement = { flood, drought };
//     if (req.file) contract.insurance.documentUrl = req.file.path;
//     contract.policyVerification = { status: "RESUBMITTED", remarks: "Resubmitted by farmer" };
//     await contract.save();
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Support.find().populate("userId", "name email").sort({ createdAt: -1 });
//     res.json({ success: true, tickets });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateTicket = async (req, res) => {
//   try {
//     const { status, note, reply } = req.body;
//     const ticket = await Support.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ message: "Not found" });
//     if (status) ticket.status = status; if (note) ticket.adminNotes.push({ text: note });
//     if (reply) {
//       ticket.replies.push({ message: reply, from: "ADMIN" });
//       const Notification = require("../Models/Notification");
//       await Notification.create({ userId: ticket.userId, title: "Admin Response 📩", message: reply, type: "SUPPORT" });
//     }
//     await ticket.save();
//     res.json({ success: true, ticket });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ============================================================
//    NEW REFINED ANALYTICS: DYNAMIC DURATION LOGIC
//    ============================================================ */
// exports.getAdminAnalytics = async (req, res) => {
//   try {
//     const { range = "7d" } = req.query;
//     const now = new Date();
//     let start = new Date();
//     let groupingFormat = "%Y-%m-%d"; // Default: Group by day

//     // 🔥 Dynamic Range Logic
//     switch (range) {
//       case "7d": start.setDate(now.getDate() - 7); break;
//       case "14d": start.setDate(now.getDate() - 14); break;
//       case "30d": start.setDate(now.getDate() - 30); break;
//       case "90d":
//         start.setDate(now.getDate() - 90);
//         groupingFormat = "%Y-W%U"; // Group by Week
//         break;
//       case "180d":
//         start.setDate(now.getDate() - 180);
//         groupingFormat = "%Y-%m"; // Group by Month
//         break;
//       case "1y":
//         start.setFullYear(now.getFullYear() - 1);
//         groupingFormat = "%Y-%m";
//         break;
//       case "all":
//         start = new Date(2023, 0, 1); // System Genesis
//         groupingFormat = "%Y-%m";
//         break;
//       default: start.setDate(now.getDate() - 7);
//     }

//     // 1. Revenue Aggregation
//     const revenueTrend = await CultivationContract.aggregate([
//       { $match: { createdAt: { $gte: start } } },
//       { $group: {
//           _id: { $dateToString: { format: groupingFormat, date: "$createdAt" } },
//           revenue: { $sum: "$pricing.estimatedValue" }
//       }},
//       { $sort: { "_id": 1 } }
//     ]);

//     // 2. User Adoption (Farmer vs Buyer Trend)
//     const userTrend = await User.aggregate([
//       { $match: { createdAt: { $gte: start }, role: { $in: ["farmer", "buyer"] } } },
//       { $group: {
//           _id: {
//             date: { $dateToString: { format: groupingFormat, date: "$createdAt" } },
//             role: "$role"
//           },
//           count: { $sum: 1 }
//       }},
//       { $sort: { "_id.date": 1 } }
//     ]);

//     // 3. Compliance Stats (Verified/Rejected/Pending)
//     const allContractsInRange = await CultivationContract.find({ createdAt: { $gte: start } });
//     const verified = allContractsInRange.filter(c => c.policyVerification?.status === "VERIFIED").length;
//     const rejected = allContractsInRange.filter(c => c.policyVerification?.status === "REJECTED").length;
//     const pending = allContractsInRange.length - (verified + rejected);

//     res.json({
//       success: true,
//       revenueData: revenueTrend.map(r => ({ label: r._id, value: r.revenue })),
//       userTrend: userTrend,
//       policyStats: [
//         { name: "Verified", value: verified },
//         { name: "Rejected", value: rejected },
//         { name: "Pending", value: pending }
//       ],
//       summary: {
//         totalRevenue: revenueTrend.reduce((acc, curr) => acc + curr.revenue, 0),
//         totalContracts: allContractsInRange.length,
//         approvalRate: allContractsInRange.length ? Math.round((verified / allContractsInRange.length) * 100) : 0
//       }
//     });
//   } catch (err) {
//     console.error("ANALYTICS ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
const mongoose = require("mongoose");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const BuyerProfile = require("../Models/buyer");
const CultivationContract = require("../Models/CultivationContract");
const HarvestContract = require("../Models/HarvestSaleContract");
const Dispute = require("../Models/Dispute");
const Contract = require("../Models/BaseContract");
const Notification = require("../Models/Notification");
const Support = require("../Models/Support");
const HarvestListing = require("../Models/HarvestListing");
const Market = require("../Models/Market");

/* ============================================================
   HELPERS
   ============================================================ */
const getDateRange = (range) => {
  const now = new Date();
  let currentStart = new Date();
  let prevStart = new Date();

  switch (range) {
    case "7d":
      currentStart.setDate(now.getDate() - 7);
      prevStart.setDate(now.getDate() - 14);
      break;
    case "30d":
      currentStart.setDate(now.getDate() - 30);
      prevStart.setDate(now.getDate() - 60);
      break;
    case "90d":
      currentStart.setDate(now.getDate() - 90);
      prevStart.setDate(now.getDate() - 180);
      break;
    case "1y":
      currentStart.setFullYear(now.getFullYear() - 1);
      prevStart.setFullYear(now.getFullYear() - 2);
      break;
    default:
      currentStart.setDate(now.getDate() - 30);
      prevStart.setDate(now.getDate() - 60);
  }
  return { currentStart, prevStart, now };
};

/* ============================================================
   EXECUTIVE ANALYTICS (POWER BI ENGINE - DEV FRIENDLY)
   ============================================================ */
exports.getAdminAnalytics = async (req, res) => {
  try {
    const { range = "30d" } = req.query;
    const { currentStart, prevStart } = getDateRange(range);

    let groupingFormat = "%Y-%m-%d";
    if (range === "90d") groupingFormat = "%Y-W%U";
    if (range === "1y") groupingFormat = "%Y-%m";

    // 1. REVENUE COMPARISON (Inclusive of Pending/Proposed for Testing)
    const revData = await CultivationContract.aggregate([
      {
        $facet: {
          current: [
            {
              $match: {
                createdAt: { $gte: currentStart },
                contractStatus: { $ne: "CANCELLED" },
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$pricing.estimatedValue" },
                count: { $sum: 1 },
              },
            },
          ],
          previous: [
            {
              $match: {
                createdAt: { $gte: prevStart, $lt: currentStart },
                contractStatus: { $ne: "CANCELLED" },
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$pricing.estimatedValue" },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    // 2. USER GROWTH
    const userGrowth = await User.aggregate([
      {
        $facet: {
          farmers_curr: [
            { $match: { role: "farmer", createdAt: { $gte: currentStart } } },
            { $count: "count" },
          ],
          farmers_prev: [
            {
              $match: {
                role: "farmer",
                createdAt: { $gte: prevStart, $lt: currentStart },
              },
            },
            { $count: "count" },
          ],
          buyers_curr: [
            { $match: { role: "buyer", createdAt: { $gte: currentStart } } },
            { $count: "count" },
          ],
          buyers_prev: [
            {
              $match: {
                role: "buyer",
                createdAt: { $gte: prevStart, $lt: currentStart },
              },
            },
            { $count: "count" },
          ],
        },
      },
    ]);

    // 3. SUPPLY-DEMAND GAP
    const marketGap = await HarvestListing.aggregate([
      {
        $group: {
          _id: "$harvest.cropName",
          supply: { $sum: "$harvest.quantityAvailable" },
        },
      },
      {
        $lookup: {
          from: "harvestsalecontracts",
          let: { crop: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$cropDetails.cropName", "$$crop"] } } },
            {
              $group: {
                _id: null,
                totalDemand: { $sum: "$cropDetails.quantity" },
              },
            },
          ],
          as: "demandData",
        },
      },
      {
        $project: {
          crop: "$_id",
          supply: 1,
          demand: {
            $ifNull: [{ $arrayElemAt: ["$demandData.totalDemand", 0] }, 0],
          },
        },
      },
      { $sort: { supply: -1 } },
    ]);

    // 4. LOOPHOLES (Including PENDING status)
    const loopholes = await CultivationContract.aggregate([
      {
        $group: {
          _id: null,
          avgProgress: { $avg: { $ifNull: ["$tracking.progressPercent", 0] } },
          stalledInSowing: {
            $sum: {
              $cond: [{ $eq: ["$tracking.currentStage", "SOWING"] }, 1, 0],
            },
          },
          stalledInNegotiation: {
            $sum: {
              $cond: [
                { $in: ["$contractStatus", ["PENDING", "PROPOSED"]] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    // 5. TREND DATA (Main Line Chart)
    const trendData = await CultivationContract.aggregate([
      { $match: { createdAt: { $gte: currentStart } } },
      {
        $group: {
          _id: {
            $dateToString: { format: groupingFormat, date: "$createdAt" },
          },
          value: { $sum: "$pricing.estimatedValue" },
          contracts: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      summary: {
        totalRevenue: revData[0].current[0]?.total || 0,
        prevRevenue: revData[0].previous[0]?.total || 0,
        totalContracts: revData[0].current[0]?.count || 0,
        prevContracts: revData[0].previous[0]?.count || 0,
      },
      stats: {
        farmers: userGrowth[0].farmers_curr[0]?.count || 0,
        prevFarmers: userGrowth[0].farmers_prev[0]?.count || 0,
        buyers: userGrowth[0].buyers_curr[0]?.count || 0,
        prevBuyers: userGrowth[0].buyers_prev[0]?.count || 0,
        disputes: await Dispute.countDocuments({ status: "OPEN" }),
        prevDisputes: 0,
      },
      loopholes: loopholes[0] || {
        avgProgress: 0,
        stalledInSowing: 0,
        stalledInNegotiation: 0,
      },
      revenueData: trendData.map((r) => ({
        label: r._id,
        value: r.value,
        contracts: r.contracts,
      })),
      marketGap: marketGap,
      disputeCauses: await Dispute.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]).then((res) => res.map((d) => ({ category: d._id, count: d.count }))),
    });
  } catch (err) {
    console.error("ANALYTICS ENGINE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   USER MANAGEMENT
   ============================================================ */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["farmer", "buyer"] } });
    const processUser = async (u) => {
      const isFarmer = u.role === "farmer";
      const profileModel = isFarmer ? Profile : BuyerProfile;
      const profile = await profileModel.findOne(
        isFarmer ? { userId: u._id } : { user: u._id },
      );

      const contractCount = await (
        isFarmer ? CultivationContract : HarvestContract
      ).countDocuments(
        isFarmer ? { "farmer.farmerId": u._id } : { "buyer.buyerId": u._id },
      );

      let riskLevel = "Low";
      if (u.status === "blocked" || u.karmaScore < 30) riskLevel = "High";
      else if (u.karmaScore < 60) riskLevel = "Medium";

      return {
        user: u,
        profile,
        contracts: contractCount,
        riskLevel,
        karma: u.karmaScore,
        verification: u.verificationStatus,
      };
    };

    const farmers = await Promise.all(
      users.filter((u) => u.role === "farmer").map(processUser),
    );
    const buyers = await Promise.all(
      users.filter((u) => u.role === "buyer").map(processUser),
    );
    res.json({ farmers, buyers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "blocked" });
    res.json({ success: true, message: "User blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "active" });
    res.json({ success: true, message: "User unblocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   DISPUTE & CONTRACT CONTROL
   ============================================================ */
exports.getAllDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate("contractId")
      .populate("raisedByUserId", "name email role")
      .sort({ createdAt: -1 });
    res.json({ success: true, disputes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resolveDispute = async (req, res) => {
  try {
    const { status, response } = req.body;
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) return res.status(404).json({ message: "Dispute not found" });

    dispute.status = status;
    dispute.adminResponse = response;
    dispute.handledBy = req.user._id;
    dispute.resolvedAt = new Date();
    await dispute.save();

    res.json({ success: true, message: "Dispute resolved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.freezeContract = async (req, res) => {
  try {
    await Contract.findByIdAndUpdate(req.params.id, {
      contractStatus: "FROZEN",
      "adminOverride.isFrozen": true,
      "adminOverride.reason": req.body.reason,
      "adminOverride.actionAt": new Date(),
    });
    res.json({ success: true, message: "Contract frozen" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   COMPLIANCE (POLICIES)
   ============================================================ */
exports.getAllPolicies = async (req, res) => {
  try {
    const contracts = await CultivationContract.find({
      "insurance.policyNumber": { $exists: true, $ne: "" },
    }).sort({ createdAt: -1 });
    const policies = contracts.map((c) => ({
      user: {
        id: c.farmer.farmerId,
        name: c.farmer.name,
        email: c.farmer.email,
      },
      policies: [
        {
          contractId: c._id,
          insurance: c.insurance,
          policyVerification: c.policyVerification,
        },
      ],
    }));
    res.json({ success: true, policies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyFarmerPolicy = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    await CultivationContract.findByIdAndUpdate(req.params.id, {
      "policyVerification.status": status,
      "policyVerification.remarks": remarks,
      "policyVerification.verifiedBy": req.user._id,
      "policyVerification.verifiedAt": new Date(),
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   SUPPORT TICKETS
   ============================================================ */
exports.getTickets = async (req, res) => {
  try {
    let query = {};

    // ✅ ADMIN → all tickets
    if (req.user.role === "admin") {
      query = {};
    }
    // ✅ BUYER / FARMER → only their tickets
    else {
      query = { userId: req.user._id };
    }

    const tickets = await Support.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  const { status, note, reply } = req.body;

  const ticket = await Support.findById(req.params.id);

  if (!ticket) return res.status(404).json({ msg: "Not found" });

  if (status) ticket.status = status;

  if (note) {
    ticket.adminNotes.push({
      text: note,
      addedAt: new Date(),
    });
  }

  if (reply) {
    ticket.replies.push({
      from: "ADMIN",
      message: reply,
      createdAt: new Date(),
      seen: false,
    });

    ticket.waitingOn = "USER";

    await Notification.create({
      userId: ticket.userId,
      message: "Admin replied to your ticket",
      link: `/tickets/${ticket._id}`,
    });
  }

  ticket.lastUpdatedAt = new Date();

  await ticket.save();

  res.json({ success: true });
};
// ADMIN REPLY

// MARK MESSAGES AS SEEN

/* ============================================================
   DASHBOARD KPI SUMMARY
   ============================================================ */
exports.getDashboardStats = async (req, res) => {
  try {
    const { currentStart } = getDateRange("7d");
    const stats = {
      farmers: await User.countDocuments({ role: "farmer" }),
      buyers: await User.countDocuments({ role: "buyer" }),
      activeContracts: await Contract.countDocuments({
        contractStatus: "ACTIVE",
      }),
      openDisputes: await Dispute.countDocuments({ status: "OPEN" }),
    };
    const growth = {
      newFarmers: await User.countDocuments({
        role: "farmer",
        createdAt: { $gte: currentStart },
      }),
      newBuyers: await User.countDocuments({
        role: "buyer",
        createdAt: { $gte: currentStart },
      }),
    };
    const activities = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name role createdAt");
    res.json({
      success: true,
      stats,
      growth,
      activities: activities.map((u) => ({
        message: `${u.name} (${u.role}) joined`,
        time: u.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.resubmitPolicy = async (req, res) => {
  try {
    const contract = await CultivationContract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    const { providerName, policyNumber, policyValidTill, flood, drought } =
      req.body;

    // 🔥 Update insurance
    contract.insurance.providerName = providerName;
    contract.insurance.policyNumber = policyNumber;
    contract.insurance.policyValidTill = policyValidTill;

    contract.insurance.riskManagement = {
      flood,
      drought,
    };

    // 🔥 Update document
    if (req.file) {
      contract.insurance.documentUrl = req.file.path;
    }

    // 🔥 RESET STATUS
    contract.policyVerification = {
      status: "RESUBMITTED",
      remarks: "Resubmitted by farmer",
      verifiedAt: null,
      verifiedBy: null,
    };

    await contract.save();

    res.json({ success: true });
  } catch (err) {
    console.error("RESUBMIT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// exports.createSupportTicket = async (req, res) => {
//   try {
//     const ticket = await Support.create({
//       userId: req.user._id,
//       subject: req.body.subject,
//       problem: req.body.problem,
//       fileUrl: req.file ? req.file.path : null,
//     });

//     res.json({ success: true, ticket });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.createSupportTicket = async (req, res) => {
  try {
    const urgentKeywords = ["payment", "fraud", "money", "not received"];

    let priority = "LOW";
    if (
      urgentKeywords.some((word) =>
        req.body.problem.toLowerCase().includes(word),
      )
    ) {
      priority = "HIGH";
    }

    const ticket = await Support.create({
      userId: req.user._id,
      role: req.user.role,
      subject: req.body.subject,
      problem: req.body.problem,

      files: req.files ? req.files.map((f) => f.path) : [],

      priority,
    });

    res.json({
      success: true,
      ticket,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.adminReply = async (req, res) => {
  try {
    const { message } = req.body;

    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.replies.push({
      from: "ADMIN",
      message,
      seen: false,
      createdAt: new Date(),
    });

    ticket.waitingOn = "USER";
    ticket.lastUpdatedAt = new Date();

    await ticket.save();

    // 🔔 notify user
    await Notification.create({
      userId: ticket.userId,
      message: "Admin replied to your ticket",
      link: `/tickets/${ticket._id}`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.userReply = async (req, res) => {
  try {
    const { message } = req.body;

    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.replies.push({
      from: "USER",
      message,
      seen: false,
      createdAt: new Date(),
    });

    ticket.waitingOn = "ADMIN";
    ticket.lastUpdatedAt = new Date();

    await ticket.save();

    // 🔔 notify admin (optional)
    await Notification.create({
      message: "User replied to support ticket",
      link: `/admin/tickets/${ticket._id}`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.markSeen = async (req, res) => {
  try {
    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    let updated = false;

    const currentUserType = req.user.role === "admin" ? "ADMIN" : "USER";

    ticket.replies.forEach((r) => {
      if (r.from !== currentUserType && !r.seen) {
        r.seen = true;
        updated = true;
      }
    });

    if (updated) {
      await ticket.save();
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
