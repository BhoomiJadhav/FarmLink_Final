import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";

import NegotiationChatBubble from "./NegotiationChatBubble";
import NegotiationInput from "./NegotiationInput";
import NegotiationHeader from "./NegotiationHeader";

const NegotiationChat = ({ negotiationId, userRole }) => {
  const [negotiation, setNegotiation] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUserRole = userRole?.toUpperCase();

  useEffect(() => {
    if (negotiationId) {
      fetchNegotiation();
    }
  }, [negotiationId]);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [negotiation]);
  const fetchNegotiation = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/negotiation/${negotiationId}`);
      const negotiationData = res.data.negotiation;
      setNegotiation(negotiationData);

      const contractRes = await axios.get(
        `/contracts/${negotiationData.contractId}`,
      );
      setContract(contractRes.data.contract);
    } catch (err) {
      console.error("Failed to load negotiation:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOffer = async (price) => {
    try {
      await axios.post(`/negotiation/counter/${negotiationId}`, {
        offeredPrice: price,
        userRole: currentUserRole,
      });

      fetchNegotiation();
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  const handleAccept = async () => {
    try {
      await axios.post(`/negotiation/accept/${negotiationId}`);
      fetchNegotiation();
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`/negotiation/reject/${negotiationId}`);
      fetchNegotiation();
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  if (!negotiationId)
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a negotiation
      </div>
    );

  if (loading)
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Loading negotiation...
      </div>
    );

  if (!negotiation || !contract)
    return (
      <div className="h-full flex items-center justify-center text-red-400">
        Failed to load negotiation
      </div>
    );

  const lastMessage = negotiation.messages[negotiation.messages.length - 1];

  const isMidpoint = lastMessage?.sender === "PLATFORM";

  const canRespond =
    negotiation.status === "ACTIVE" &&
    ((isMidpoint &&
      !(
        (currentUserRole === "BUYER" && negotiation.buyerAcceptedMidpoint) ||
        (currentUserRole === "FARMER" && negotiation.farmerAcceptedMidpoint)
      )) ||
      (!isMidpoint && negotiation.currentTurn === currentUserRole));

  return (
    <div
      className="flex flex-col h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]
bg-gray-100 "
    >
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <NegotiationHeader contract={contract} />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {[...negotiation.messages]
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((msg, index) => (
            <NegotiationChatBubble
              key={index}
              message={msg}
              currentUserRole={currentUserRole}
            />
          ))}
      </div>

      {/* Actions */}
      {negotiation.status === "ACTIVE" && canRespond && (
        <div className="p-4 border-t bg-white space-y-3">
          <NegotiationInput onSend={handleSendOffer} disabled={!canRespond} />

          <div className="flex gap-4">
            <button
              onClick={handleAccept}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Accept Offer
            </button>

            <button
              onClick={handleReject}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {negotiation.status === "AGREED" && (
        <div className="p-4 bg-green-100 text-green-700 text-center font-medium">
          Price Agreed: ₹ {negotiation.finalAgreedPrice}
        </div>
      )}

      {negotiation.status === "REJECTED" && (
        <div className="p-4 bg-red-100 text-red-700 text-center font-medium">
          Negotiation Rejected
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default NegotiationChat;
