import React from "react";

const NegotiationChatBubble = ({ message, currentUserRole }) => {
  const isCurrentUser = message.sender === currentUserRole;
  const isPlatform = message.sender === "PLATFORM";

  const baseStyle = "max-w-md px-4 py-3 rounded-xl shadow-sm text-sm";

  const alignment = isCurrentUser ? "ml-auto" : "mr-auto";

  const colorStyle = isPlatform
    ? "bg-gray-100 text-gray-700 border border-gray-300"
    : isCurrentUser
      ? "bg-green-600 text-white"
      : "bg-white border border-gray-200 text-gray-800";

  return (
    <div className={`flex ${alignment} my-2`}>
      <div className={`${baseStyle} ${colorStyle}`}>
        <p className="font-medium">₹ {message.offeredPrice}</p>
        <p className="text-xs opacity-80 mt-1">{message.message}</p>
        <p className="text-[10px] opacity-60 mt-1">
          {new Date(message.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NegotiationChatBubble;
