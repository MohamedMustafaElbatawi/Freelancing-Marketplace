// import React, { useEffect, useRef } from "react";

// function ChatMessages({ messages = [], currentUserId }) {
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   const formatTime = (date) => {
//     if (!date) return "";

//     const messageDate = new Date(date);

//     if (Number.isNaN(messageDate.getTime())) {
//       return "";
//     }

//     return messageDate.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 md:p-6">
//       {messages.length === 0 ? (
//         <div className="flex h-full items-center justify-center">
//           <div className="text-center">
//             <p className="font-medium text-gray-700">No messages yet</p>

//             <p className="mt-1 text-sm text-gray-500">
//               Send a message to start the conversation.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <>
//           {messages.map((msg) => {
//             const senderId = msg.sender?._id || msg.sender;

//             const mine =
//               currentUserId &&
//               senderId?.toString() === currentUserId?.toString();

//             return (
//               <div
//                 key={msg._id}
//                 className={`flex ${mine ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`flex max-w-[75%] flex-col ${
//                     mine ? "items-end" : "items-start"
//                   }`}
//                 >
//                   <div
//                     className={`rounded-2xl px-4 py-3 text-sm ${
//                       mine
//                         ? "rounded-br-md bg-blue-600 text-white"
//                         : "rounded-bl-md bg-white text-gray-800 shadow-sm"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>

//                   <span className="mt-1 px-1 text-[11px] text-gray-400">
//                     {formatTime(msg.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}

//           <div ref={messagesEndRef} />
//         </>
//       )}
//     </div>
//   );
// }

// export default ChatMessages;



import React, { useEffect, useRef } from "react";

function ChatMessages({ messages = [], currentUserId }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const formatTime = (date) => {
    if (!date) return "";

    const messageDate = new Date(date);

    if (Number.isNaN(messageDate.getTime())) {
      return "";
    }

    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="font-medium text-gray-700">
              No messages yet
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Send a message to start the conversation.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            // sender ممكن يكون object بسبب populate
            // وممكن يكون ID فقط
            const senderId =
              typeof msg.sender === "object"
                ? msg.sender?._id
                : msg.sender;

            // المستخدم الحالي = الرسالة يمين
            const mine =
              String(senderId) === String(currentUserId);

            return (
              <div
                key={msg._id}
                className={`flex w-full ${
                  mine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[75%] flex-col ${
                    mine ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      mine
                        ? "rounded-br-md bg-blue-600 text-white"
                        : "rounded-bl-md bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="mt-1 px-1 text-[11px] text-gray-400">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default ChatMessages;