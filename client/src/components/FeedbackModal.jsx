import React, { useState } from "react";
import api from "../../api/axios";

export default function FeedbackModal({ contractId, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!rating) {
      alert("Please select rating");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/reviews/${contractId}`, {
        rating,
        comment,
      });

      onSuccess(); // 🔥 close modal
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[99999]">
      <div className="bg-white p-6 rounded-2xl w-[420px] shadow-xl">
        <h2 className="text-xl font-semibold mb-4">⭐ Mandatory Feedback</h2>

        <p className="text-sm text-gray-500 mb-3">
          Please rate your experience to complete this contract
        </p>

        {/* Stars */}
        <div className="flex gap-2 mb-4 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full border p-2 rounded mb-4"
          placeholder="Optional feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
          onClick={submitReview}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
}
