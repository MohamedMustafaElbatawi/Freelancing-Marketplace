// import React, { useState } from "react";
// import { Paperclip, Send, Smile } from "lucide-react";

// function MessageInput({ onSendMessage }) {
//   const [message, setMessage] = useState("");

//   const handleSend = () => {
//     if (!message.trim()) return;

//     ```
// onSendMessage(message);
// setMessage("");
// ```;
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="shrink-0 border-t border-gray-200 bg-white p-3 md:p-4">
//       {" "}
//       <div className="flex items-end gap-2">
//         {/* Attachment */}{" "}
//         <button
//           className="shrink-0 rounded-xl p-2.5 text-gray-500 transition hover:bg-gray-100"
//           aria-label="Attach file"
//         >
//           {" "}
//           <Paperclip size={20} />{" "}
//         </button>
//         {/* Input */}
//         <div className="relative min-w-0 flex-1">
//           <textarea
//             rows="1"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Write a message..."
//             className="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />

//           {/* Emoji */}
//           <button
//             className="absolute bottom-2.5 right-3 text-gray-400 transition hover:text-gray-600"
//             aria-label="Add emoji"
//           >
//             <Smile size={19} />
//           </button>
//         </div>
//         {/* Send */}
//         <button
//           onClick={handleSend}
//           disabled={!message.trim()}
//           className="shrink-0 rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//           aria-label="Send message"
//         >
//           <Send size={19} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MessageInput;
import React, { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

function MessageInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const text = message.trim();

    if (!text || disabled) {
      return;
    }

    onSendMessage(text);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end gap-2">
        {/* Attachment */}
        <button
          type="button"
          disabled={disabled}
          className="rounded-xl p-2.5 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Paperclip size={20} />
        </button>

        {/* Input */}
        <div className="relative flex-1">
          <textarea
            rows="1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Write a message..."
            className="max-h-32 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          />

          {/* Emoji */}
          <button
            type="button"
            disabled={disabled}
            className="absolute bottom-2.5 right-3 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            <Smile size={19} />
          </button>
        </div>

        {/* Send */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={19} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
