const Review = require("../Models/Review");
const Contract = require("../Models/BaseContract");
const User = require("../Models/User");

// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { rating, comment, tags } = req.body;
    const userId = req.user._id;

    // ✅ Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const contract = await Contract.findById(contractId);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    // ✅ Only completed contracts allowed
    if (contract.contractStatus !== "COMPLETED") {
      return res.status(400).json({
        message: "Review allowed only after contract completion",
      });
    }

    // ✅ Identify roles
    const isBuyer = contract.buyer?.buyerId?.toString() === userId.toString();

    const isFarmer =
      contract.farmer?.farmerId?.toString() === userId.toString();

    if (!isBuyer && !isFarmer) {
      return res.status(403).json({ message: "Not part of this contract" });
    }

    const reviewerRole = isBuyer ? "buyer" : "farmer";

    const revieweeId = isBuyer
      ? contract.farmer.farmerId
      : contract.buyer.buyerId;

    const revieweeRole = isBuyer ? "farmer" : "buyer";

    // ✅ Create review
    const review = await Review.create({
      contractId,
      contractType: contract.__t,
      reviewer: {
        userId,
        role: reviewerRole,
      },
      reviewee: {
        userId: revieweeId,
        role: revieweeRole,
      },
      rating,
      comment,
      tags,
    });

    // ✅ Update stats safely
    await updateUserStats(revieweeId, rating);

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (err) {
    console.error("Review Error:", err);

    // ✅ Handle duplicate review
    if (err.code === 11000) {
      return res.status(400).json({
        message: "You have already reviewed this contract",
      });
    }

    res.status(500).json({ message: err.message });
  }
};
exports.updateUserStats = async (userId, newRating) => {
  const user = await User.findById(userId);

  if (!user) return;

  // ✅ SAFE INITIALIZATION
  if (!user.rating) {
    user.rating = { average: 0, count: 0 };
  }

  if (!user.stats) {
    user.stats = {
      totalContracts: 0,
      completedContracts: 0,
      disputes: 0,
      onTimeDeliveries: 0,
    };
  }

  // ✅ Update rating
  const total = user.rating.count + 1;
  const avg = (user.rating.average * user.rating.count + newRating) / total;

  user.rating.average = avg;
  user.rating.count = total;

  // ✅ Simple karma (safe version)
  user.karmaScore = Math.min(100, avg * 20 + user.rating.count * 2);

  await user.save();
};
exports.checkReviewStatus = async (req, res) => {
  try {
    const { contractId } = req.params;
    const userId = req.user._id;

    const existing = await Review.findOne({
      contractId,
      "reviewer.userId": userId,
    });

    res.json({
      hasReviewed: !!existing,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
