// // import { Search } from "lucide-react";
// // import React from "react";
// // function ConversationsList({
// //   filteredConversations,
// //   search,
// //   setSearch,
// //   setSelectedConversation,
// //   selectedConversation,
// // }) {
// //   return (
// //     <div className="w-full border-r border-gray-200 md:w-[340px]">
// //       {/* Header */}
// //       <div className="border-b border-gray-200 p-5">
// //         <h1 className="text-2xl font-bold text-gray-900">Messages</h1>

// //         <p className="mt-1 text-sm text-gray-500">
// //           Chat with clients and freelancers
// //         </p>

// //         {/* Search */}
// //         <div className="relative mt-4">
// //           <Search
// //             size={18}
// //             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
// //           />

// //           <input
// //             type="text"
// //             placeholder="Search conversations..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //           />
// //         </div>
// //       </div>

// //       {/* Conversations */}
// //       <div className="h-[calc(100%-145px)] overflow-y-auto">
// //         {filteredConversations.map((conversation) => (
// //           <button
// //             key={conversation.id}
// //             onClick={() => setSelectedConversation(conversation)}
// //             className={`flex w-full items-center gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 ${
// //               selectedConversation.id === conversation.id ? "bg-blue-50" : ""
// //             }`}
// //           >
// //             {/* Avatar */}
// //             <div className="relative shrink-0">
// //               <img
// //                 src={conversation.avatar}
// //                 alt={conversation.name}
// //                 className="h-12 w-12 rounded-full object-cover"
// //               />

// //               {conversation.online && (
// //                 <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
// //               )}
// //             </div>

// //             {/* Conversation info */}
// //             <div className="min-w-0 flex-1">
// //               <div className="flex items-center justify-between gap-2">
// //                 <h3 className="truncate font-semibold text-gray-900">
// //                   {conversation.name}
// //                 </h3>

// //                 <span className="shrink-0 text-xs text-gray-400">
// //                   {conversation.time}
// //                 </span>
// //               </div>

// //               <p className="mt-1 truncate text-xs text-gray-500">
// //                 {conversation.role}
// //               </p>

// //               <div className="mt-1 flex items-center justify-between gap-2">
// //                 <p className="truncate text-sm text-gray-500">
// //                   {conversation.lastMessage}
// //                 </p>

// //                 {conversation.unread > 0 && (
// //                   <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
// //                     {conversation.unread}
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //           </button>
// //         ))}

// //         {filteredConversations.length === 0 && (
// //           <div className="p-6 text-center text-sm text-gray-500">
// //             No conversations found.
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ConversationsList;

// import React from "react";
// import { Search } from "lucide-react";
// import ConversationItem from "./ConversationItem";

// function ConversationsList({
//   filteredConversations,
//   search,
//   setSearch,
//   setSelectedConversation,
//   selectedConversation,
// }) {
//   return (
//     <div className="flex h-full w-full flex-col border-r border-gray-200 md:w-[340px]">
//       {/* Header */}{" "}
//       <div className="shrink-0 border-b border-gray-200 p-5">
//         {" "}
//         <h1 className="text-2xl font-bold text-gray-900">Messages </h1>
//         <p className="mt-1 text-sm text-gray-500">
//           Chat with clients and freelancers
//         </p>
//         {/* Search */}
//         <div className="relative mt-4">
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search conversations..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>
//       </div>
//       {/* Conversations */}
//       <div className="min-h-0 flex-1 overflow-y-auto">
//         {filteredConversations.map((conversation) => (
//           <ConversationItem
//             key={conversation.id}
//             conversation={conversation}
//             selectedConversation={selectedConversation}
//             onSelect={setSelectedConversation}
//           />
//         ))}

//         {filteredConversations.length === 0 && (
//           <div className="p-6 text-center text-sm text-gray-500">
//             No conversations found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ConversationsList;

import React from "react";
import { Search, MessageCircle } from "lucide-react";

function ConversationsList({
  filteredConversations,
  search,
  setSearch,
  setSelectedConversation,
  selectedConversation,
  currentUserId,
}) {
  const getOtherUser = (conversation) => {
    return conversation.participants?.find(
      (participant) =>
        participant._id?.toString() !== currentUserId?.toString(),
    );
  };

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
    <div className="flex h-full w-full flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle size={22} className="text-blue-600" />

          <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <MessageCircle size={24} className="text-gray-400" />
            </div>

            <h3 className="font-medium text-gray-900">No conversations</h3>

            <p className="mt-1 text-sm text-gray-500">
              Your conversations will appear here.
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const user = getOtherUser(conversation);

            const isSelected = selectedConversation?._id === conversation._id;

            return (
              <button
                key={conversation._id}
                type="button"
                onClick={() => setSelectedConversation(conversation)}
                className={`flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition ${
                  isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={
                      user?.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.fullName || user?.userName || "User",
                      )}`
                    }
                    alt={user?.fullName || user?.userName || "User"}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {user?.fullName || user?.userName || "Unknown User"}
                    </h3>

                    <span className="shrink-0 text-[11px] text-gray-400">
                      {formatTime(conversation.lastMessageAt)}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {conversation.lastMessage || "Start a conversation"}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ConversationsList;
