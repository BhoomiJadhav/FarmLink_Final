import React, { useState } from "react";

const NegotiationInput = ({ onSend, disabled }) => {
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    if (!price) return;
    onSend(Number(price));
    setPrice("");
  };

  return (
    <div className="flex gap-3 border-t pt-4">
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter your counter price"
        disabled={disabled}
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={handleSubmit}
        disabled={disabled}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Send
      </button>
    </div>
  );
};

export default NegotiationInput;
