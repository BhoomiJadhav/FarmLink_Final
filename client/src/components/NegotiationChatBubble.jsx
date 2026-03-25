// import React from "react";

// const NegotiationChatBubble = ({ message, currentUserRole }) => {
//   const isCurrentUser = message.sender === currentUserRole;
//   const isPlatform = message.sender === "PLATFORM";

//   const baseStyle = "max-w-md px-4 py-3 rounded-xl shadow-sm text-sm";

//   const alignment = isCurrentUser ? "ml-auto" : "mr-auto";

//   const colorStyle = isPlatform
//     ? "bg-gray-200 text-gray-700 text-center text-xs italic"
//     : isCurrentUser
//       ? "bg-emerald-500 text-white rounded-br-none"
//       : "bg-white border rounded-bl-none";
//   return (
//     <div className={`flex ${alignment} my-2`}>
//       <div className={`${baseStyle} ${colorStyle}`}>
//         <p className="font-semibold text-sm">
//           {message.offeredPrice ? `₹ ${message.offeredPrice}` : ""}
//         </p>

//         <p className="text-xs mt-1">{message.message}</p>

//         <p className="text-[10px] opacity-60 mt-1 text-right">
//           {new Date(message.timestamp).toLocaleTimeString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NegotiationChatBubble;

import React from "react";

const NegotiationChatBubble = ({ message, currentUserRole }) => {
  const isCurrentUser = message.sender === currentUserRole;
  const isPlatform = message.sender === "PLATFORM";

  return (
    <div
      className={`flex w-full my-2 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          relative max-w-[70%] px-4 py-3 text-sm rounded-2xl shadow-sm
          transition-all duration-300
          ${
            isPlatform
              ? "bg-gray-200 text-gray-700 text-center italic"
              : isCurrentUser
                ? "bg-emerald-500 text-white rounded-br-none"
                : "bg-white border text-gray-800 rounded-bl-none"
          }
        `}
      >
        {/* Price */}
        {message.offeredPrice && (
          <p className="font-semibold text-base">₹ {message.offeredPrice}</p>
        )}

        {/* Message */}
        <p className="text-xs mt-1">{message.message}</p>

        {/* Time */}
        <p className="text-[10px] opacity-60 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {/* Tail */}
        {!isPlatform && (
          <span
            className={`absolute bottom-0 w-3 h-3 ${
              isCurrentUser
                ? "right-0 translate-x-1 bg-emerald-500 clip-path-right"
                : "left-0 -translate-x-1 bg-white border-l border-b clip-path-left"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default NegotiationChatBubble;
