import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { X } from "lucide-react";
import { BUYER_TEMPLATES } from "../constant/BUYER_TEMPLATE";

const SecureChatWidget = ({ contractId, role, open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const bottomRef = useRef();

  // Fetch messages + unread
  useEffect(() => {
    if (!open) return;

    const fetchMessages = async () => {
      const res = await axios.get(`/contracts/${contractId}/messages`);

      setMessages(res.data.messages || []);
      setUnreadCount(res.data.unread?.[role] || 0);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);

    // Mark as read when opened
    axios.post(`/contracts/${contractId}/messages/read`, {
      role,
    });

    return () => clearInterval(interval);
  }, [contractId, open, role]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendFarmerMessage = async () => {
    if (!input.trim()) return;

    await axios.post(`/contracts/${contractId}/messages`, {
      sender: role,
      message: input,
    });

    setInput("");
  };

  const sendBuyerTemplate = async (key) => {
    await axios.post(`/contracts/${contractId}/messages`, {
      sender: "BUYER",
      message: BUYER_TEMPLATES[key],
    });
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[420px] max-w-[95vw] h-[550px] bg-white shadow-2xl border rounded-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b bg-gray-50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold">Secure Contract Chat</h4>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl text-sm leading-relaxed max-w-[75%] ${
              msg.sender === role
                ? "bg-blue-100 ml-auto text-right"
                : "bg-gray-100"
            }`}
          >
            <p>{msg.message}</p>
            <p className="text-[11px] text-gray-500 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Section */}
      {role === "BUYER" ? (
        <div className="p-2 border-t">
          <select
            className="w-full border rounded-lg px-2 py-2 text-sm"
            onChange={(e) => {
              if (!e.target.value) return;
              sendBuyerTemplate(e.target.value);
              e.target.value = "";
            }}
          >
            <option value="">Select Communication Type</option>
            <option value="STAGE_UPDATE">Request Stage Update</option>
            <option value="PAYMENT_STATUS">Clarify Payment</option>
            <option value="DELIVERY_CONFIRM">Confirm Delivery Timeline</option>
            <option value="QUALITY_CONCERN">Report Quality Concern</option>
          </select>
        </div>
      ) : (
        <div className="p-2 border-t flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-2 py-1 text-sm"
            placeholder="Type response..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendFarmerMessage}
            className="bg-black text-white px-3 rounded-lg text-sm"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default SecureChatWidget;
