// import React from "react";
// import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";

// function ChatHeader({ selectedConversation, onBack }) {
//   return (
//     <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-4 md:px-6">
//       {/* User Info */}{" "}
//       <div className="flex min-w-0 items-center gap-3">
//         {/* Back Button - Mobile */}{" "}
//         <button
//           onClick={onBack}
//           className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 md:hidden"
//           aria-label="Back to conversations"
//         >
//           {" "}
//           <ArrowLeft size={20} />{" "}
//         </button>
//         {/* Avatar */}
//         <div className="relative shrink-0">
//           <img
//             src={selectedConversation.avatar}
//             alt={selectedConversation.name}
//             className="h-11 w-11 rounded-full object-cover"
//           />

//           {selectedConversation.online && (
//             <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
//           )}
//         </div>
//         {/* Name */}
//         <div className="min-w-0">
//           <h2 className="truncate font-semibold text-gray-900">
//             {selectedConversation.name}
//           </h2>

//           <p className="text-xs text-gray-500">
//             {selectedConversation.online ? "Online" : "Offline"}
//           </p>
//         </div>
//       </div>
//       {/* Actions */}
//       <div className="flex shrink-0 items-center gap-1">
//         <button
//           className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
//           aria-label="Call"
//         >
//           <Phone size={19} />
//         </button>

//         <button
//           className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
//           aria-label="Video call"
//         >
//           <Video size={19} />
//         </button>

//         <button
//           className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
//           aria-label="More options"
//         >
//           <MoreVertical size={19} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatHeader;
import React from "react";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";

function ChatHeader({ selectedConversation, onBack, currentUserId }) {
  if (!selectedConversation) {
    return null;
  }

  const user = selectedConversation.participants?.find(
    (participant) => participant._id?.toString() !== currentUserId?.toString(),
  );

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:px-6">
      {/* User */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 md:hidden"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="relative shrink-0">
          <img
            src={
              user?.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullName || user?.username || "User",
              )}`
            }
            alt={user?.fullName || user?.username || "User"}
            className="h-11 w-11 rounded-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h2 className="truncate font-semibold text-gray-900">
            {user?.fullName || user?.username || "Unknown User"}
          </h2>

          <p className="text-xs text-gray-500">Offline</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <Phone size={19} />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <Video size={19} />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <MoreVertical size={19} />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
