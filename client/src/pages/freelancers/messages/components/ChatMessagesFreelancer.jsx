// import React, { useEffect, useRef } from "react";

// function ChatMessagesFreelancer({ messages = [], currentUserId }) {
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   const getSenderId = (message) => {
//     if (!message?.sender) return null;

//     if (typeof message.sender === "object") {
//       return message.sender._id;
//     }

//     return message.sender;
//   };

//   const formatTime = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
//       {messages.length === 0 ? (
//         <div className="flex h-full items-center justify-center">
//           <div className="text-center">
//             <p className="font-medium text-gray-700 dark:text-gray-300">
//               No messages yet
//             </p>

//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
//               Start the conversation with your client.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {messages.map((message) => {
//             const senderId = getSenderId(message);

//             const isMine = String(senderId) === String(currentUserId);

//             return (
//               <div
//                 key={message._id}
//                 className={`flex ${isMine ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[80%] md:max-w-[65%] ${
//                     isMine ? "items-end" : "items-start"
//                   } flex flex-col`}
//                 >
//                   <div
//                     className={`rounded-2xl px-4 py-2.5 text-sm ${
//                       isMine
//                         ? "rounded-br-md bg-blue-600 text-white"
//                         : "rounded-bl-md bg-white text-gray-900 shadow-sm dark:bg-slate-800 dark:text-white"
//                     }`}
//                   >
//                     {message.text}
//                   </div>

//                   <span className="mt-1 px-1 text-[11px] text-gray-400">
//                     {formatTime(message.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}

//           <div ref={bottomRef} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatMessagesFreelancer;

import React, { useEffect, useRef } from "react";

function ChatMessagesFreelancer({ messages = [], currentUserId }) {
  const bottomRef = useRef(null);

  // ==========================================
  // Auto Scroll
  // ==========================================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ==========================================
  // Get Sender ID
  // ==========================================
  const getSenderId = (message) => {
    if (!message?.sender) {
      return null;
    }

    // sender = populated user object
    if (typeof message.sender === "object") {
      return message.sender?._id || null;
    }

    // sender = ObjectId string
    return message.sender;
  };

  // ==========================================
  // Check My Message
  // ==========================================
  const isMyMessage = (message) => {
    const senderId = getSenderId(message);

    if (!senderId || !currentUserId) {
      return false;
    }

    return String(senderId) === String(currentUserId);
  };

  // ==========================================
  // Format Time
  // ==========================================
  const formatTime = (date) => {
    if (!date) return "";

    const messageDate = new Date(date);

    if (Number.isNaN(messageDate.getTime())) {
      return "";
    }

    return messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==========================================
  // Empty
  // ==========================================
  if (!messages.length) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            No messages yet
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start the conversation with your client.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Messages
  // ==========================================
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
      <div className="flex flex-col gap-3">
        {messages.map((message) => {
          // const mine = isMyMessage(message);
          const mine =
            String(message.sender?._id || message.sender) ===
            String(currentUserId);
          return (
            <div
              key={message._id}
              className={`flex w-full ${
                mine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[80%] flex-col md:max-w-[65%] ${
                  mine ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`break-words rounded-2xl px-4 py-2.5 text-sm ${
                    mine
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md bg-white text-gray-900 shadow-sm dark:bg-slate-800 dark:text-white"
                  }`}
                >
                  {message.text}
                </div>

                <span className="mt-1 px-1 text-[11px] text-gray-400">
                  {formatTime(message.createdAt)}
                </span>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default ChatMessagesFreelancer;
