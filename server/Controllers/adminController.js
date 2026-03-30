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
exports.getAllDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate("contractId")
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

    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    // ✅ Update dispute
    dispute.status = status;
    dispute.adminResponse = response;
    dispute.handledBy = req.user._id;
    dispute.resolvedAt = new Date();

    await dispute.save();

    // ✅ FIX: Find contract from BOTH types
    let contract =
      (await CultivationContract.findById(dispute.contractId)) ||
      (await HarvestContract.findById(dispute.contractId));

    if (!contract) {
      return res.json({
        success: true,
        message: "Dispute resolved (contract not found)",
      });
    }

    // 🔔 Notifications

    const notifications = [];

    if (contract?.farmer?.farmerId) {
      notifications.push({
        userId: contract.farmer.farmerId,
        title: "Dispute Update",
        message: `Your dispute has been ${status}: ${response}`,
        type: "DISPUTE",
        relatedContractId: contract._id,
      });
    }

    if (contract?.buyer?.buyerId) {
      notifications.push({
        userId: contract.buyer.buyerId,
        title: "Dispute Update",
        message: `A dispute has been ${status}: ${response}`,
        type: "DISPUTE",
        relatedContractId: contract._id,
      });
    }

    if (notifications.length > 0) {
      await Notification.create(notifications);
    }

    res.json({ success: true, message: "Dispute resolved successfully" });
  } catch (err) {
    console.error("RESOLVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["farmer", "buyer"] } });

    const farmers = await Promise.all(
      users
        .filter((u) => u.role === "farmer")
        .map(async (user) => {
          const profile = await Profile.findOne({ userId: user._id });

          const cultivationCount = await CultivationContract.countDocuments({
            "farmer.farmerId": user._id,
          });

          return {
            user,
            profile,
            contracts: cultivationCount,
          };
        }),
    );

    const buyers = await Promise.all(
      users
        .filter((u) => u.role === "buyer")
        .map(async (user) => {
          const profile = await BuyerProfile.findOne({ user: user._id });

          const harvestCount = await HarvestContract.countDocuments({
            "buyer.buyerId": user._id,
          });

          return {
            user,
            profile,
            contracts: harvestCount,
          };
        }),
    );

    res.json({ farmers, buyers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.verifyFarmerPolicy = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const contract = await CultivationContract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // 🔥 FIX 1: ensure insurance exists
    if (!contract.insurance) {
      contract.insurance = {};
    }

    // 🔥 FIX 2: set policyVerification safely
    contract.policyVerification = {
      status,
      remarks,
      verifiedBy: req.user._id,
      verifiedAt: new Date(),
    };

    console.log("UPDATED POLICY:", contract.insurance.policyVerification);

    await contract.save();

    const Notification = require("../Models/Notification");

    await Notification.create({
      userId: contract.farmer.farmerId,
      title:
        status === "VERIFIED" ? "Policy Approved ✅" : "Policy Rejected ❌",
      message:
        status === "VERIFIED"
          ? "Your insurance policy has been verified successfully."
          : `Your policy was rejected. Reason: ${remarks}`,
      type: "SYSTEM",
      contractId: contract._id,
      role: "FARMER",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.status = "blocked";

    await user.save();

    res.json({ success: true, message: "User blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.status = "active";

    await user.save();

    res.json({ success: true, message: "User unblocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.freezeContract = async (req, res) => {
//   try {
//     const contract = await Contract.findById(req.params.id);

//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     contract.contractStatus = "FROZEN";
//     contract.adminOverride = {
//       isFrozen: true,
//       frozenBy: req.user._id,
//       reason: req.body.reason,
//       actionAt: new Date(),
//     };

//     await contract.save();

//     res.json({ success: true, message: "Contract frozen" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.freezeContract = async (req, res) => {
  try {
    const contractId = req.params.id;

    console.log("🔥 FREEZE REQUEST ID:", contractId);

    // ✅ Step 1: Find contract using BASE model
    const contract = await Contract.findById(contractId);

    if (!contract) {
      console.log("❌ Contract NOT FOUND");
      return res.status(404).json({ message: "Contract not found" });
    }

    console.log("✅ Contract FOUND:", contract._id);

    // ✅ Step 2: Freeze contract
    contract.contractStatus = "FROZEN";
    contract.adminOverride = {
      isFrozen: true,
      frozenBy: req.user._id,
      reason: req.body.reason || "Admin freeze",
      actionAt: new Date(),
    };

    await contract.save();

    console.log("✅ Contract UPDATED:", contract.contractStatus);

    // ✅ Step 3: Find dispute
    const dispute = await Dispute.findOne({
      contractId: new mongoose.Types.ObjectId(contractId),
    });

    console.log("🔍 Dispute FOUND:", dispute);

    // ✅ Step 4: Update dispute
    if (dispute && dispute.status === "OPEN") {
      dispute.status = "UNDER_REVIEW";
      await dispute.save();
      console.log("✅ Dispute UPDATED to UNDER_REVIEW");
    }

    res.json({
      success: true,
      message: "Contract frozen & dispute updated",
    });
  } catch (err) {
    console.error("❌ FREEZE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    /* ================= USERS ================= */
    const farmers = await User.countDocuments({ role: "farmer" });
    const buyers = await User.countDocuments({ role: "buyer" });

    const newFarmers = await User.countDocuments({
      role: "farmer",
      createdAt: { $gte: lastWeek },
    });

    /* ================= CONTRACTS ================= */
    const cultivationContracts = await CultivationContract.find();
    const harvestContracts = await HarvestContract.find();

    const allContracts = [...cultivationContracts, ...harvestContracts];

    const totalContracts = allContracts.length;

    const active = allContracts.filter(
      (c) => c.contractStatus === "ACTIVE",
    ).length;

    const completed = allContracts.filter(
      (c) => c.contractStatus === "COMPLETED",
    ).length;

    const cancelled = allContracts.filter(
      (c) => c.contractStatus === "CANCELLED",
    ).length;

    const newContracts = allContracts.filter(
      (c) => new Date(c.createdAt) >= lastWeek,
    ).length;

    /* ================= DISPUTES ================= */
    const disputes = await Dispute.countDocuments({ status: "OPEN" });

    /* ================= SUPPORT ================= */
    let supportCount = 0;
    let highPriority = 0;

    try {
      const Support = require("../Models/Support");

      supportCount = await Support.countDocuments({
        status: { $ne: "RESOLVED" },
      });

      highPriority = await Support.countDocuments({
        priority: "HIGH",
        status: { $ne: "RESOLVED" },
      });
    } catch (err) {
      // ignore if model not present
    }

    /* ================= ALERTS ================= */
    const alerts = [];

    if (disputes > 0) {
      alerts.push({
        message: `${disputes} disputes need attention`,
        time: "now",
      });
    }

    if (highPriority > 0) {
      alerts.push({
        message: `${highPriority} high priority support tickets`,
        time: "now",
      });
    }

    if (active < 5) {
      alerts.push({
        message: "Low active contracts",
        time: "now",
      });
    }

    /* ================= ACTIVITY ================= */
    const activities = [];

    // latest users
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3);

    recentUsers.forEach((u) => {
      activities.push({
        message: `${u.name} joined as ${u.role}`,
        time: formatTime(u.createdAt),
      });
    });

    // latest contracts
    const recentContracts = allContracts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    recentContracts.forEach((c) => {
      activities.push({
        message: `Contract created (${c.cropDetails?.cropName || "Crop"})`,
        time: formatTime(c.createdAt),
      });
    });

    /* ================= GROWTH ================= */
    const growth = {
      newFarmers,
      newContracts,
      engagement: Math.min(
        100,
        Math.round((active / (totalContracts || 1)) * 100),
      ),
    };

    /* ================= RESPONSE ================= */
    res.json({
      success: true,
      stats: {
        farmers,
        buyers,
        disputes,
        contracts: totalContracts,
        active,
        completed,
        cancelled,
        support: supportCount,
      },
      alerts,
      activities,
      growth,
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= HELPER ================= */
function formatTime(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 60000);

  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

exports.getAllPolicies = async (req, res) => {
  try {
    const contracts = await CultivationContract.find({
      "insurance.policyNumber": { $ne: "" },
    })
      .lean() // 🔥 VERY IMPORTANT
      .sort({ createdAt: -1 });
    const grouped = {};

    for (const c of contracts) {
      const farmerId = c.farmer.farmerId.toString();

      const profile = await Profile.findOne({ userId: farmerId });

      if (!grouped[farmerId]) {
        grouped[farmerId] = {
          user: {
            id: farmerId,
            name: profile?.personal?.fullName || c.farmer.name,
            email: profile?.personal?.email || "N/A",
            phone: profile?.personal?.phone || "N/A",
          },
          policies: [],
        };
      }

      // grouped[farmerId].policies.push({
      //   contractId: c._id,
      //   insurance: {
      //     ...c.insurance,

      //     // 🔥 FIX: ensure correct data comes
      //     policyVerification: c.policyVerification || {
      //       status: "PENDING",
      //     },
      //   },
      // });
      grouped[farmerId].policies.push({
        contractId: c._id,
        insurance: c.insurance,
        policyVerification: c.policyVerification || { status: "PENDING" },
      });
      console.log("FROM DB:", c.policyVerification);
    }

    res.json({ success: true, policies: Object.values(grouped) });
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
exports.createSupportTicket = async (req, res) => {
  try {
    const ticket = await Support.create({
      userId: req.user._id,
      subject: req.body.subject,
      problem: req.body.problem,
      fileUrl: req.file ? req.file.path : null,
    });

    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Support.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateTicket = async (req, res) => {
  try {
    const { status, note, reply } = req.body;

    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Not found" });
    }

    if (status) ticket.status = status;

    if (note) {
      ticket.adminNotes.push({ text: note });
    }

    if (reply) {
      ticket.replies.push({
        message: reply,
        from: "ADMIN",
      });

      // 🔔 OPTIONAL: create notification
      const Notification = require("../Models/Notification");

      await Notification.create({
        userId: ticket.userId,
        title: "Admin Response 📩",
        message: reply,
        type: "SUPPORT",
      });
    }

    await ticket.save();

    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAdminAnalytics = async (req, res) => {
  try {
    const { range = "7d" } = req.query;

    const now = new Date();
    const start = new Date();
    const prevStart = new Date();

    if (range === "7d") {
      start.setDate(now.getDate() - 7);
      prevStart.setDate(now.getDate() - 14);
    } else if (range === "30d") {
      start.setDate(now.getDate() - 30);
      prevStart.setDate(now.getDate() - 60);
    }

    /* ================= CURRENT ================= */
    const contracts = await CultivationContract.find({
      createdAt: { $gte: start },
    });

    /* ================= PREVIOUS ================= */
    const prevContracts = await CultivationContract.find({
      createdAt: { $gte: prevStart, $lt: start },
    });

    /* ================= REVENUE ================= */
    const calcRevenue = (list) => {
      let total = 0;

      list.forEach((c) => {
        let value = 0;

        if (c.pricing?.estimatedValue) {
          value = c.pricing.estimatedValue;
        } else if (
          c.pricing?.agreedPricePerUnit &&
          c.cropDetails?.expectedYield
        ) {
          value =
            c.pricing.agreedPricePerUnit * Number(c.cropDetails.expectedYield);
        }

        total += Number(value || 0);
      });

      return total;
    };

    const totalRevenue = calcRevenue(contracts);
    const prevRevenue = calcRevenue(prevContracts);

    const revenueGrowth =
      prevRevenue > 0
        ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100)
        : 0;

    /* ================= CONTRACTS ================= */
    const totalContracts = contracts.length;
    const prevCount = prevContracts.length;

    const contractGrowth =
      prevCount > 0
        ? Math.round(((totalContracts - prevCount) / prevCount) * 100)
        : 0;

    /* ================= POLICY ================= */
    let verified = 0,
      rejected = 0,
      pending = 0;

    contracts.forEach((c) => {
      const s = c.policyVerification?.status || "PENDING";
      if (s === "VERIFIED") verified++;
      else if (s === "REJECTED") rejected++;
      else pending++;
    });

    const approvalRate = totalContracts
      ? Math.round((verified / totalContracts) * 100)
      : 0;

    /* ================= MONTHLY REVENUE ================= */
    const revenueChart = await CultivationContract.aggregate([
      {
        $match: { createdAt: { $gte: start } },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
          revenue: { $sum: "$pricing.estimatedValue" },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    const revenueData =
      revenueChart.length > 0
        ? revenueChart.map((r) => ({
            date: r._id.date,
            revenue: r.revenue,
          }))
        : [{ date: "No Data", revenue: 0 }];

    /* ================= FARMER GROWTH ================= */
    const farmerGrowth = await User.aggregate([
      {
        $match: {
          role: "farmer",
          createdAt: { $gte: start },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    const farmerData =
      farmerGrowth.length > 0
        ? farmerGrowth.map((d) => ({
            date: d._id.date,
            count: d.count,
          }))
        : [{ date: "No Data", count: 0 }];

    /* ================= AI INSIGHTS ================= */
    let insights = [];

    if (revenueGrowth > 0)
      insights.push(`📈 Revenue increased by ${revenueGrowth}%`);

    if (approvalRate < 50) insights.push("⚠️ Policy approval rate is low");

    if (totalContracts === 1)
      insights.push("⚠️ Only 1 contract — platform underutilized");

    if (rejected > verified)
      insights.push("🚨 More policies rejected than approved");

    if (totalRevenue === 0)
      insights.push("💰 No revenue — check pricing setup");

    /* ================= RESPONSE ================= */
    res.json({
      totalRevenue,
      revenueGrowth,
      totalContracts,
      contractGrowth,
      approvalRate,
      policyStats: [
        { name: "Verified", value: verified },
        { name: "Rejected", value: rejected },
        { name: "Pending", value: pending },
      ],
      revenueData,
      farmerData,
      insights,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
