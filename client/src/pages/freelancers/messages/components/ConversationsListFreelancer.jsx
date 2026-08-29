import React from "react";
import { Search, MessageCircle } from "lucide-react";

function ConversationsListFreelancer({
  filteredConversations = [],
  search,
  setSearch,
  setSelectedConversation,
  selectedConversation,
  currentUserId,
}) {
  const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

  const getOtherUser = (conversation) => {
    if (!conversation?.participants?.length) return null;

    return conversation.participants.find(
      (user) => String(user?._id) !== String(currentUserId),
    );
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 dark:border-slate-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Messages
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Chat with your clients
        </p>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <MessageCircle size={25} />
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white">
              No conversations
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your client conversations will appear here.
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const client = getOtherUser(conversation);

            const isSelected =
              String(selectedConversation?._id) === String(conversation._id);

            return (
              <button
                key={conversation._id}
                type="button"
                onClick={() => setSelectedConversation(conversation)}
                className={`flex w-full items-center gap-3 border-b border-gray-100 p-4 text-left transition dark:border-slate-800 ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-500/10"
                    : "hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  {client?.profilePhoto ? (
                    <img
                      src={
                        client.profilePhoto.startsWith("http")
                          ? client.profilePhoto
                          : `${URL_SERVER}/${client.profilePhoto.replaceAll(
                              "\\",
                              "/",
                            )}`
                      }
                      alt={client?.fullName || "Client"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    client?.fullName?.charAt(0)?.toUpperCase() || "C"
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                      {client?.fullName || client?.userName || "Client"}
                    </h3>

                    <span className="shrink-0 text-xs text-gray-400">
                      {formatTime(conversation.lastMessageAt)}
                    </span>
                  </div>

                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {conversation.lastMessage || "No messages yet"}
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

export default ConversationsListFreelancer;
