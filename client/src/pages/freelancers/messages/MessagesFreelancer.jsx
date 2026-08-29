import React, { useCallback, useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import {
  getConversations,
  getMessages,
  sendMessage,
  getCurrentUser,
} from "../../../services/messageService";

import ConversationsList from "./components/ConversationsListFreelancer";
import ChatHeader from "./components/ChatHeaderFreelancer";
import ChatMessages from "./components/ChatMessagesFreelancer";
import MessageInput from "./components/MessageInputFreelancer";
import ChatMessagesFreelancer from "./components/ChatMessagesFreelancer";

function MessagesFreelancer() {
  const { conversationId } = useParams();

  // =====================================================
  // Current Freelancer
  // =====================================================

  const [currentUser, setCurrentUser] = useState(null);

  // =====================================================
  // Conversations
  // =====================================================

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // =====================================================
  // Messages
  // =====================================================

  const [messages, setMessages] = useState([]);

  // =====================================================
  // UI
  // =====================================================

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // =====================================================
  // Refs
  // =====================================================

  const currentUserRef = useRef(null);
  const selectedConversationRef = useRef(null);
  const pollingRef = useRef(null);

  // =====================================================
  // Keep Refs Updated
  // =====================================================

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // =====================================================
  // Get Current Freelancer
  // =====================================================

  const loadCurrentUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();

      // console.log("========== FREELANCER USER ==========");
      // console.log("Response:", response);
      // console.log("User:", response?.user);
      // console.log("======================================");

      if (!response?.user?._id) {
        throw new Error("Current freelancer not found");
      }

      const user = response.user;

      // console.log("========== FREELANCER ==========");
      // console.log("Freelancer ID:", user._id);
      // console.log("Freelancer Name:", user.fullName);
      // console.log("Freelancer Role:", user.role);
      // console.log("================================");

      setCurrentUser(user);
      currentUserRef.current = user;

      return user;
    } catch (error) {
      console.error("GET CURRENT FREELANCER ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("SERVER RESPONSE:", error.response.data);
      }

      return null;
    }
  }, []);

  // =====================================================
  // Load Freelancer Conversations
  // =====================================================

  const loadConversations = useCallback(async () => {
    try {
      const response = await getConversations();

      // console.log("========== FREELANCER CONVERSATIONS ==========");
      // console.log("Response:", response);
      // console.log("Conversations:", response?.conversations);
      // console.log("================================================");

      if (!response?.success) {
        return [];
      }

      const loadedConversations = response.conversations || [];

      console.log("LOADED CONVERSATIONS:", loadedConversations);
      console.log("PARTICIPANTS:", loadedConversations[0]?.participants);
      setConversations(loadedConversations);

      return loadedConversations;
    } catch (error) {
      console.error("GET FREELANCER CONVERSATIONS ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("SERVER RESPONSE:", error.response.data);
      }

      return [];
    }
  }, []);

  // =====================================================
  // Initialize Freelancer Chat
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        setLoading(true);

        const user = await loadCurrentUser();

        if (!user || !mounted) {
          return;
        }

        // نتأكد إن المستخدم Freelancer
        if (user.role !== "freelancer") {
          console.error("This page is only for freelancers.", user.role);

          return;
        }

        await loadConversations();
      } catch (error) {
        console.error("INITIALIZE FREELANCER CHAT ERROR:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [loadCurrentUser, loadConversations]);

  // =====================================================
  // Get Client From Conversation
  // =====================================================

  const getOtherUser = useCallback((conversation) => {
    if (!conversation?.participants?.length) {
      return null;
    }

    const freelancer = currentUserRef.current;

    if (!freelancer?._id) {
      return null;
    }

    const freelancerId = String(freelancer._id);

    const client = conversation.participants.find(
      (participant) =>
        participant?._id && String(participant._id) !== freelancerId,
    );

    return client || null;
  }, []);

  // =====================================================
  // Load Messages
  // =====================================================

  const loadMessages = useCallback(async (id, showLoader = true) => {
    if (!id) {
      return [];
    }

    try {
      if (showLoader) {
        setLoadingMessages(true);
      }

      const response = await getMessages(id);

      // console.log("========== FREELANCER GET MESSAGES ==========");
      // console.log("Conversation ID:", id);
      // console.log("Response:", response);
      // console.log("Messages:", response?.messages);
      // console.log("==============================================");

      if (!response?.success) {
        return [];
      }

      const newMessages = response.messages || [];

      setMessages(newMessages);

      return newMessages;
    } catch (error) {
      console.error("GET FREELANCER MESSAGES ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);

        console.error("SERVER RESPONSE:", error.response.data);
      }

      return [];
    } finally {
      if (showLoader) {
        setLoadingMessages(false);
      }
    }
  }, []);

  // =====================================================
  // Select Conversation
  // =====================================================

  const handleSelectConversation = useCallback(
    async (conversation) => {
      if (!conversation?._id) {
        console.error("Conversation ID not found");
        return;
      }

      // console.log("========== FREELANCER SELECT CHAT ==========");

      // console.log("Conversation ID:", conversation._id);

      // console.log("Freelancer ID:", currentUserRef.current?._id);

      // console.log("Participants:", conversation.participants);

      // console.log("Client:", getOtherUser(conversation));

      // console.log("============================================");

      setSelectedConversation(conversation);

      selectedConversationRef.current = conversation;

      setMessages([]);

      await loadMessages(conversation._id, true);
    },
    [loadMessages, getOtherUser],
  );

  // =====================================================
  // Open Conversation From URL
  // =====================================================

  useEffect(() => {
    if (!conversationId || !conversations.length) {
      return;
    }

    const conversation = conversations.find(
      (item) => String(item._id) === String(conversationId),
    );

    if (!conversation) {
      console.error("Freelancer conversation not found:", conversationId);

      return;
    }

    if (
      String(selectedConversationRef.current?._id) === String(conversation._id)
    ) {
      return;
    }

    handleSelectConversation(conversation);
  }, [conversationId, conversations, handleSelectConversation]);

  // =====================================================
  // Poll Messages
  // =====================================================

  useEffect(() => {
    const id = selectedConversation?._id;

    if (!id) {
      return;
    }

    // console.log("========== START FREELANCER POLLING ==========");

    // console.log("Conversation:", id);

    // console.log("===============================================");

    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    pollingRef.current = setInterval(async () => {
      const conversation = selectedConversationRef.current;

      if (!conversation?._id) {
        return;
      }

      try {
        const response = await getMessages(conversation._id);

        if (!response?.success) {
          return;
        }

        const newMessages = response.messages || [];

        setMessages((previousMessages) => {
          if (previousMessages.length !== newMessages.length) {
            console.log("FREELANCER NEW MESSAGES:", newMessages.length);

            return newMessages;
          }

          const previousLast = previousMessages[previousMessages.length - 1];

          const newLast = newMessages[newMessages.length - 1];

          if (
            previousLast?._id !== newLast?._id ||
            previousLast?.text !== newLast?.text
          ) {
            return newMessages;
          }

          return previousMessages;
        });

        // =================================================
        // Update Conversation Preview
        // =================================================

        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage) {
          setConversations((previous) =>
            previous.map((item) =>
              String(item._id) === String(conversation._id)
                ? {
                    ...item,
                    lastMessage: lastMessage.text,
                    lastMessageAt: lastMessage.createdAt,
                  }
                : item,
            ),
          );

          setSelectedConversation((previous) => {
            if (!previous) {
              return previous;
            }

            return {
              ...previous,
              lastMessage: lastMessage.text,
              lastMessageAt: lastMessage.createdAt,
            };
          });
        }
      } catch (error) {
        console.error("FREELANCER AUTO RECEIVE ERROR:", error);
      }
    }, 2000);

    return () => {
      console.log("STOP FREELANCER POLLING:", id);

      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [selectedConversation?._id]);

  // =====================================================
  // Send Message As Freelancer
  // =====================================================

  const handleSendMessage = async (text) => {
    const cleanText = text?.trim();

    if (!cleanText) {
      return;
    }

    const conversation = selectedConversationRef.current;

    if (!conversation?._id) {
      console.error("No freelancer conversation selected");

      return;
    }

    try {
      setSendingMessage(true);

      console.log("========== FREELANCER SEND MESSAGE ==========");

      console.log("Conversation ID:", conversation._id);

      console.log("Text:", cleanText);

      console.log("Freelancer:", currentUserRef.current);

      console.log("=============================================");

      const response = await sendMessage(conversation._id, cleanText);

      console.log("========== FREELANCER MESSAGE SENT ==========");

      console.log("Response:", response);
      console.log("Message:", response?.message);

      console.log("==============================================");

      if (!response?.success || !response?.message) {
        return;
      }

      const sentMessage = response.message;

      console.log("========== SENDER DEBUG ==========");
      console.log("Sender:", sentMessage.sender);
      console.log("Sender ID:", sentMessage.sender?._id);
      console.log("Freelancer ID:", currentUserRef.current?._id);
      console.log(
        "Is Mine:",
        String(sentMessage.sender?._id) === String(currentUserRef.current?._id),
      );
      console.log("==================================");
      // =================================================
      // Add Message Immediately
      // =================================================

      setMessages((previousMessages) => {
        const exists = previousMessages.some(
          (message) => String(message._id) === String(sentMessage._id),
        );

        if (exists) {
          return previousMessages;
        }

        return [...previousMessages, sentMessage];
      });

      // =================================================
      // Update Conversation Preview
      // =================================================

      setConversations((previous) =>
        previous.map((item) =>
          String(item._id) === String(conversation._id)
            ? {
                ...item,
                lastMessage: sentMessage.text,
                lastMessageAt: sentMessage.createdAt,
              }
            : item,
        ),
      );

      // =================================================
      // Update Selected Conversation
      // =================================================

      setSelectedConversation((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          lastMessage: sentMessage.text,
          lastMessageAt: sentMessage.createdAt,
        };
      });
    } catch (error) {
      console.error("FREELANCER SEND MESSAGE ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);

        console.error("SERVER RESPONSE:", error.response.data);
      }
    } finally {
      setSendingMessage(false);
    }
  };

  // =====================================================
  // Back
  // =====================================================

  const handleBackToConversations = () => {
    setSelectedConversation(null);

    selectedConversationRef.current = null;

    setMessages([]);

    if (pollingRef.current) {
      clearInterval(pollingRef.current);

      pollingRef.current = null;
    }
  };

  // =====================================================
  // Search Clients
  // =====================================================

  const filteredConversations = conversations.filter((conversation) => {
    const client = getOtherUser(conversation);

    const searchText = search.toLowerCase().trim();

    const name = client?.fullName?.toLowerCase() || "";

    const username =
      client?.userName?.toLowerCase() || client?.username?.toLowerCase() || "";

    return name.includes(searchText) || username.includes(searchText);
  });

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Loader2 size={20} className="animate-spin" />

          <span>Loading messages...</span>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="h-[calc(100vh-80px)] min-h-0 bg-gray-50 p-0 dark:bg-slate-950 md:p-6">
      <div className="flex h-full min-h-0 overflow-hidden bg-white dark:bg-slate-900 md:rounded-2xl md:border md:border-gray-200 md:shadow-sm md:dark:border-slate-800">
        {/* =================================================
            Conversations
        ================================================= */}

        <div
          className={`h-full w-full md:flex md:w-[340px] ${
            selectedConversation ? "hidden" : "flex"
          }`}
        >
          <ConversationsList
            filteredConversations={filteredConversations}
            search={search}
            setSearch={setSearch}
            setSelectedConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            currentUserId={currentUser?._id}
          />
        </div>

        {/* =================================================
            Chat
        ================================================= */}

        <div
          className={`h-full min-w-0 flex-1 flex-col ${
            selectedConversation ? "flex" : "hidden"
          } md:flex`}
        >
          {selectedConversation ? (
            <>
              {/* Header */}

              <ChatHeader
                selectedConversation={selectedConversation}
                onBack={handleBackToConversations}
                currentUserId={currentUser?._id}
              />

              {/* Messages */}

              {loadingMessages ? (
                <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-slate-950">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Loader2 size={20} className="animate-spin" />

                    <span>Loading messages...</span>
                  </div>
                </div>
              ) : (
                <ChatMessagesFreelancer
                  messages={messages}
                  currentUserId={currentUser?._id}
                />
              )}

              {/* Input */}

              <MessageInput
                onSendMessage={handleSendMessage}
                disabled={sendingMessage}
              />
            </>
          ) : (
            <div className="hidden flex-1 items-center justify-center bg-gray-50 dark:bg-slate-950 md:flex">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Send size={24} />
                </div>

                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Select a conversation
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Choose a conversation to start chatting with a client.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesFreelancer;
