import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

function MessageInputFreelancer({ onSendMessage, disabled = false }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanText = text.trim();

    if (!cleanText || disabled) return;

    await onSendMessage(cleanText);

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          placeholder="Write a message..."
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {disabled ? (
            <Loader2 size={19} className="animate-spin" />
          ) : (
            <Send size={19} />
          )}
        </button>
      </div>
    </form>
  );
}

export default MessageInputFreelancer;
