import React from "react";

function ConversationItem({ conversation, selectedConversation, onSelect }) {
  const isSelected = selectedConversation?.id === conversation.id;

  return (
    <button
      onClick={() => onSelect(conversation)}
      className={`flex w-full items-center gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      {/* Avatar */}{" "}
      <div className="relative shrink-0">
        {" "}
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
        )}
      </div>
      {/* Conversation Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold text-gray-900">
            {conversation.name}
          </h3>

          <span className="shrink-0 text-xs text-gray-400">
            {conversation.time}
          </span>
        </div>

        <p className="mt-1 truncate text-xs text-gray-500">
          {conversation.role}
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-gray-500">
            {conversation.lastMessage}
          </p>

          {conversation.unread > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default ConversationItem;
