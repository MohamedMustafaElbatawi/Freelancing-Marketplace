import React from "react";

function MessageBubble({ message }) {
  return (
    <div className={`flex ${message.mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[85%] flex-col md:max-w-[75%] ${
          message.mine ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`break-words rounded-2xl px-4 py-3 text-sm ${
            message.mine
              ? "rounded-br-md bg-blue-600 text-white"
              : "rounded-bl-md bg-white text-gray-800 shadow-sm"
          }`}
        >
          {message.text}{" "}
        </div>

        <span className="mt-1 px-1 text-[11px] text-gray-400">
          {message.time}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
