import React from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";

function ChatHeaderFreelancer({ selectedConversation, onBack, currentUserId }) {
  const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

  const getClient = () => {
    if (!selectedConversation?.participants?.length) return null;

    return selectedConversation.participants.find(
      (user) => String(user?._id) !== String(currentUserId),
    );
  };

  const client = getClient();

  const image = client?.profilePhoto
    ? client.profilePhoto.startsWith("http")
      ? client.profilePhoto
      : `${URL_SERVER}/${client.profilePhoto.replaceAll("\\", "/")}`
    : null;

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex min-w-0 items-center gap-3">
        {/* Back mobile */}
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 md:hidden"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          {image ? (
            <img
              src={image}
              alt={client?.fullName || "Client"}
              className="h-full w-full object-cover"
            />
          ) : (
            client?.fullName?.charAt(0)?.toUpperCase() || "C"
          )}
        </div>

        {/* Client */}
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-gray-900 dark:text-white">
            {client?.fullName || client?.userName || "Client"}
          </h2>

          <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
        </div>
      </div>

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
      >
        <MoreVertical size={20} />
      </button>
    </div>
  );
}

export default ChatHeaderFreelancer;
