// import React, { useEffect, useState } from "react";
// import { Send, Loader2 } from "lucide-react";

// import ConversationsList from "./components/ConversationsList";
// import ChatHeader from "./components/ChatHeader";
// import ChatMessages from "./components/ChatMessages";
// import MessageInput from "./components/MessageInput";

// import {
//   getConversations,
//   getMessages,
//   sendMessage,
//   getCurrentUser,
// } from "../../../services/messageService";
// import { useParams } from "react-router-dom";
// function Messages() {
//   const { conversationId } = useParams();

//   // =========================
//   // Current User
//   // =========================

//   const [currentUser, setCurrentUser] = useState(null);

//   // =========================
//   // Conversations
//   // =========================

//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);

//   // =========================
//   // Messages
//   // =========================

//   const [messages, setMessages] = useState([]);

//   // =========================
//   // UI
//   // =========================

//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [loadingMessages, setLoadingMessages] = useState(false);
//   const [sendingMessage, setSendingMessage] = useState(false);

//   // =========================
//   // Load User + Conversations
//   // =========================

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);

//         const userData = await getCurrentUser();

//         // console.log("========== CURRENT USER DEBUG ==========");
//         // console.log("USER DATA:", userData);
//         // console.log("CURRENT USER:", userData?.user);
//         // console.log("CURRENT USER ID:", userData?.user?._id);
//         // console.log("CURRENT USER ROLE:", userData?.user?.role);
//         // console.log("=========================================");

//         if (!userData?.user?._id) {
//           console.error("Current user ID not found");
//           return;
//         }

//         setCurrentUser(userData.user);
//         const conversationData = await getConversations();
//         // console.log("========== CONVERSATIONS DEBUG ==========");
//         // console.log("conversationData:", conversationData);
//         // console.log("conversations:", conversationData?.conversations);
//         // console.log(
//         //   "FIRST CONVERSATION:",
//         //   conversationData?.conversations?.[0],
//         // );
//         // console.log("success:", conversationData?.success);
//         // console.log("==========================================");
//         if (conversationData.success) {
//           const loadedConversations = conversationData.conversations || [];

//           setConversations(loadedConversations);

//           // لو دخلنا من رابط فيه conversationId
//           if (conversationId) {
//             const conversation = loadedConversations.find(
//               (item) => item._id === conversationId,
//             );

//             if (conversation) {
//               handleSelectConversation(conversation);
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Load messages data error:", error);

//         if (error.response) {
//           console.error("Server response:", error.response.data);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);
//   useEffect(() => {
//     if (!conversationId || !conversations.length) return;

//     const conversation = conversations.find(
//       (item) => item._id === conversationId,
//     );

//     if (conversation) {
//       handleSelectConversation(conversation);
//     }
//   }, [conversationId, conversations]);

//   // =========================
//   // Get Other User
//   // =========================

//   const getOtherUser = (conversation) => {
//     if (!conversation?.participants || !currentUser) {
//       return null;
//     }

//     return conversation.participants.find(
//       (participant) =>
//         participant._id?.toString() !== currentUser._id?.toString(),
//     );
//   };

//   // =========================
//   // Select Conversation
//   // =========================

//   const handleSelectConversation = async (conversation) => {
//     console.log("SELECTED CONVERSATION:", conversation);

//     setSelectedConversation(conversation);
//     setMessages([]);

//     try {
//       setLoadingMessages(true);

//       console.log("GETTING MESSAGES FOR:", conversation._id);

//       const data = await getMessages(conversation._id);

//       console.log("MESSAGES RESPONSE:", data);

//       if (data.success) {
//         setMessages(data.messages || []);
//       }
//     } catch (error) {
//       console.error("Get messages error:", error);

//       if (error.response) {
//         console.error("Server response:", error.response.data);
//       }
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   // =========================
//   // Back
//   // =========================

//   const handleBackToConversations = () => {
//     setSelectedConversation(null);
//     setMessages([]);
//   };

//   // =========================
//   // Send Message
//   // =========================

//   const handleSendMessage = async (text) => {
//     if (!text?.trim()) return;

//     if (!selectedConversation?._id) {
//       console.error("No conversation selected");
//       return;
//     }

//     try {
//       setSendingMessage(true);

//       const data = await sendMessage(selectedConversation._id, text.trim());

//       if (data.success && data.message) {
//         // Add message immediately
//         setMessages((prev) => [...prev, data.message]);

//         // Update conversation preview
//         setConversations((prev) =>
//           prev.map((conversation) =>
//             conversation._id === selectedConversation._id
//               ? {
//                   ...conversation,
//                   lastMessage: data.message.text,
//                   lastMessageAt: data.message.createdAt,
//                 }
//               : conversation,
//           ),
//         );

//         // Update selected conversation
//         setSelectedConversation((prev) => ({
//           ...prev,
//           lastMessage: data.message.text,
//           lastMessageAt: data.message.createdAt,
//         }));
//       }
//     } catch (error) {
//       console.error("Send message error:", error);

//       if (error.response) {
//         console.error("Server response:", error.response.data);
//       }
//     } finally {
//       setSendingMessage(false);
//     }
//   };

//   // =========================
//   // Search
//   // =========================

//   const filteredConversations = conversations.filter((conversation) => {
//     const user = getOtherUser(conversation);

//     const searchText = search.toLowerCase();

//     const name = user?.fullName?.toLowerCase() || "";

//     const username = user?.username?.toLowerCase() || "";

//     return name.includes(searchText) || username.includes(searchText);
//   });

//   // =========================
//   // Loading
//   // =========================

//   if (loading) {
//     return (
//       <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gray-50">
//         <div className="flex items-center gap-2 text-gray-500">
//           <Loader2 size={20} className="animate-spin" />

//           <span>Loading messages...</span>
//         </div>
//       </div>
//     );
//   }

//   // =========================
//   // UI
//   // =========================

//   return (
//     <div className="h-[calc(100vh-80px)] min-h-0 bg-gray-50 p-0 md:p-6">
//       <div className="flex h-full min-h-0 overflow-hidden bg-white md:rounded-2xl md:border md:border-gray-200 md:shadow-sm">
//         {/* Conversations */}
//         <div
//           className={`h-full w-full md:flex md:w-[340px] ${
//             selectedConversation ? "hidden" : "flex"
//           }`}
//         >
//           <ConversationsList
//             filteredConversations={filteredConversations}
//             search={search}
//             setSearch={setSearch}
//             setSelectedConversation={handleSelectConversation}
//             selectedConversation={selectedConversation}
//             currentUserId={currentUser?._id}
//           />
//         </div>

//         {/* Chat */}
//         <div
//           className={`h-full min-w-0 flex-1 flex-col ${
//             selectedConversation ? "flex" : "hidden"
//           } md:flex`}
//         >
//           {selectedConversation ? (
//             <>
//               <ChatHeader
//                 selectedConversation={selectedConversation}
//                 onBack={handleBackToConversations}
//                 currentUserId={currentUser?._id}
//               />

//               {loadingMessages ? (
//                 <div className="flex flex-1 items-center justify-center bg-gray-50">
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <Loader2 size={20} className="animate-spin" />

//                     <span>Loading messages...</span>
//                   </div>
//                 </div>
//               ) : (
//                 <ChatMessages
//                   messages={messages}
//                   currentUserId={currentUser?._id}
//                 />
//               )}

//               <MessageInput
//                 onSendMessage={handleSendMessage}
//                 disabled={sendingMessage}
//               />
//             </>
//           ) : (
//             <div className="hidden flex-1 items-center justify-center bg-gray-50 md:flex">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
//                   <Send size={24} />
//                 </div>

//                 <h2 className="font-semibold text-gray-900">
//                   Select a conversation
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Choose a conversation to start chatting.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Messages;
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Send, Loader2 } from "lucide-react";
// import { useLocation, useParams } from "react-router-dom";

// import ConversationsList from "./components/ConversationsList";
// import ChatHeader from "./components/ChatHeader";
// import ChatMessages from "./components/ChatMessages";
// import MessageInput from "./components/MessageInput";

// import {
//   getConversations,
//   getMessages,
//   sendMessage,
//   getCurrentUser,
// } from "../../../services/messageService";

// function Messages() {
//   const location = useLocation();
//   const { conversationId } = useParams();

//   const isFreelancer = location.pathname.startsWith("/freelancer");
//   const isClient = location.pathname.startsWith("/client");

//   // =====================================================
//   // Current User
//   // =====================================================

//   const [currentUser, setCurrentUser] = useState(null);

//   // =====================================================
//   // Conversations
//   // =====================================================

//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);

//   // =====================================================
//   // Messages
//   // =====================================================

//   const [messages, setMessages] = useState([]);

//   // =====================================================
//   // UI
//   // =====================================================

//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [loadingMessages, setLoadingMessages] = useState(false);
//   const [sendingMessage, setSendingMessage] = useState(false);

//   // =====================================================
//   // Refs
//   // =====================================================

//   const selectedConversationRef = useRef(null);
//   const currentUserRef = useRef(null);
//   const pollingRef = useRef(null);

//   // =====================================================
//   // Keep Refs Updated
//   // =====================================================

//   useEffect(() => {
//     selectedConversationRef.current = selectedConversation;
//   }, [selectedConversation]);

//   useEffect(() => {
//     currentUserRef.current = currentUser;
//   }, [currentUser]);

//   // =====================================================
//   // Get Current User
//   // =====================================================

//   const loadCurrentUser = useCallback(async () => {
//     try {
//       const response = await getCurrentUser();

//       console.log("========== CURRENT USER RESPONSE ==========");
//       console.log("Response:", response);
//       console.log("User:", response?.user);
//       console.log("===========================================");

//       // مهم:
//       // نتأكد من user قبل استخدام user._id
//       if (!response?.user?._id) {
//         throw new Error("Current user not found");
//       }

//       const user = response.user;

//       console.log("========== CHAT USER ==========");
//       console.log("Current User ID:", user._id);
//       console.log("Current User Role:", user.role);
//       console.log("Current User:", user);
//       console.log("===============================");

//       setCurrentUser(user);
//       currentUserRef.current = user;

//       return user;
//     } catch (error) {
//       console.error("GET CURRENT USER ERROR:", error);

//       if (error.response) {
//         console.error("STATUS:", error.response.status);
//         console.error("SERVER RESPONSE:", error.response.data);
//       }

//       return null;
//     }
//   }, []);

//   // =====================================================
//   // Load Conversations
//   // =====================================================

//   const loadConversations = useCallback(async () => {
//     try {
//       const response = await getConversations();

//       console.log("========== CONVERSATIONS ==========");
//       console.log("CONVERSATIONS RESPONSE:", response);
//       console.log("CONVERSATIONS:", response?.conversations);
//       console.log("===================================");

//       if (!response?.success) {
//         return [];
//       }

//       const loadedConversations = response.conversations || [];

//       console.log("========== PARTICIPANTS DEBUG ==========");

//       loadedConversations.forEach((conversation) => {
//         console.log("Conversation:", conversation._id);

//         console.log(
//           "Participants:",
//           conversation.participants?.map((user) => ({
//             id: user?._id,
//             name: user?.fullName,
//             username: user?.userName,
//             role: user?.role,
//           })),
//         );
//       });

//       console.log("=========================================");

//       // Debug participants
//       loadedConversations.forEach((conversation, index) => {
//         console.log(`Conversation ${index + 1}:`, {
//           id: conversation._id,
//           participants: conversation.participants,
//           participantsCount: conversation.participants?.length || 0,
//           lastMessage: conversation.lastMessage,
//         });
//       });

//       setConversations(loadedConversations);

//       return loadedConversations;
//     } catch (error) {
//       console.error("GET CONVERSATIONS ERROR:", error);

//       if (error.response) {
//         console.error("STATUS:", error.response.status);
//         console.error("SERVER RESPONSE:", error.response.data);
//       }

//       return [];
//     }
//   }, []);

//   // =====================================================
//   // Initialize
//   // =====================================================

//   useEffect(() => {
//     let mounted = true;

//     const initialize = async () => {
//       try {
//         setLoading(true);

//         const user = await loadCurrentUser();

//         if (!user || !mounted) {
//           return;
//         }

//         await loadConversations();
//       } catch (error) {
//         console.error("INITIALIZE CHAT ERROR:", error);
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     initialize();

//     return () => {
//       mounted = false;
//     };
//   }, [loadCurrentUser, loadConversations]);

//   // =====================================================
//   // Get Other User
//   // =====================================================

//   const getOtherUser = useCallback((conversation) => {
//     if (!conversation?.participants?.length) {
//       return null;
//     }

//     const user = currentUserRef.current;

//     if (!user?._id) {
//       return null;
//     }

//     const currentUserId = String(user._id);

//     // الحالة الطبيعية:
//     // participants = [currentUser, otherUser]
//     const otherUser = conversation.participants.find(
//       (participant) =>
//         participant?._id && String(participant._id) !== currentUserId,
//     );

//     if (otherUser) {
//       return otherUser;
//     }

//     // لو الـ conversation فيها participant واحد فقط
//     // وكان هو المستخدم الحالي، مفيش other user نقدر نعرضه.
//     const onlyParticipant = conversation.participants[0];

//     if (onlyParticipant?._id && String(onlyParticipant._id) === currentUserId) {
//       return null;
//     }

//     return onlyParticipant || null;
//   }, []);

//   // =====================================================
//   // Load Messages
//   // =====================================================

//   const loadMessages = useCallback(async (id, showLoader = true) => {
//     if (!id) {
//       return [];
//     }

//     try {
//       if (showLoader) {
//         setLoadingMessages(true);
//       }

//       const response = await getMessages(id);

//       console.log("========== GET MESSAGES ==========");
//       console.log("Conversation ID:", id);
//       console.log("Response:", response);
//       console.log("Messages:", response?.messages);
//       console.log("==================================");

//       if (!response?.success) {
//         return [];
//       }

//       const newMessages = response.messages || [];

//       setMessages(newMessages);

//       return newMessages;
//     } catch (error) {
//       console.error("GET MESSAGES ERROR:", error);

//       if (error.response) {
//         console.error("STATUS:", error.response.status);
//         console.error("SERVER RESPONSE:", error.response.data);
//       }

//       return [];
//     } finally {
//       if (showLoader) {
//         setLoadingMessages(false);
//       }
//     }
//   }, []);

//   // =====================================================
//   // Select Conversation
//   // =====================================================

//   const handleSelectConversation = useCallback(
//     async (conversation) => {
//       if (!conversation?._id) {
//         console.error("Conversation ID not found");
//         return;
//       }

//       console.log("========== SELECT CONVERSATION ==========");
//       console.log("Conversation ID:", conversation._id);
//       console.log("Current User ID:", currentUserRef.current?._id);
//       console.log("Participants:", conversation.participants);
//       console.log(
//         "Participants Count:",
//         conversation.participants?.length || 0,
//       );
//       console.log("Other User:", getOtherUser(conversation));
//       console.log("=========================================");

//       setSelectedConversation(conversation);
//       selectedConversationRef.current = conversation;

//       setMessages([]);

//       await loadMessages(conversation._id, true);
//     },
//     [loadMessages, getOtherUser],
//   );

//   // =====================================================
//   // Open Conversation From URL
//   // =====================================================

//   useEffect(() => {
//     if (!conversationId || !conversations.length) {
//       return;
//     }

//     const conversation = conversations.find(
//       (item) => String(item._id) === String(conversationId),
//     );

//     if (!conversation) {
//       console.error("Conversation not found:", conversationId);

//       return;
//     }

//     if (
//       String(selectedConversationRef.current?._id) === String(conversation._id)
//     ) {
//       return;
//     }

//     handleSelectConversation(conversation);
//   }, [conversationId, conversations, handleSelectConversation]);

//   // =====================================================
//   // Poll Messages
//   // =====================================================

//   useEffect(() => {
//     const id = selectedConversation?._id;

//     if (!id) {
//       return;
//     }

//     console.log("========== START MESSAGE POLLING ==========");
//     console.log("Conversation:", id);
//     console.log("===========================================");

//     // منع إنشاء أكثر من interval
//     if (pollingRef.current) {
//       clearInterval(pollingRef.current);
//     }

//     pollingRef.current = setInterval(async () => {
//       const conversation = selectedConversationRef.current;

//       if (!conversation?._id) {
//         return;
//       }

//       try {
//         const response = await getMessages(conversation._id);

//         if (!response?.success) {
//           return;
//         }

//         const newMessages = response.messages || [];

//         setMessages((previousMessages) => {
//           // لو العدد مختلف
//           if (previousMessages.length !== newMessages.length) {
//             console.log("NEW MESSAGES RECEIVED:", newMessages.length);

//             return newMessages;
//           }

//           // لو نفس العدد لكن message تغيرت
//           const previousLast = previousMessages[previousMessages.length - 1];

//           const newLast = newMessages[newMessages.length - 1];

//           if (
//             previousLast?._id !== newLast?._id ||
//             previousLast?.text !== newLast?.text
//           ) {
//             return newMessages;
//           }

//           return previousMessages;
//         });

//         // تحديث آخر رسالة في conversations
//         const lastMessage = newMessages[newMessages.length - 1];

//         if (lastMessage) {
//           setConversations((previous) =>
//             previous.map((item) =>
//               String(item._id) === String(conversation._id)
//                 ? {
//                     ...item,
//                     lastMessage: lastMessage.text,
//                     lastMessageAt: lastMessage.createdAt,
//                   }
//                 : item,
//             ),
//           );

//           setSelectedConversation((previous) => {
//             if (!previous) {
//               return previous;
//             }

//             return {
//               ...previous,
//               lastMessage: lastMessage.text,
//               lastMessageAt: lastMessage.createdAt,
//             };
//           });
//         }
//       } catch (error) {
//         console.error("AUTO RECEIVE MESSAGES ERROR:", error);
//       }
//     }, 2000);

//     return () => {
//       console.log("STOP MESSAGE POLLING:", id);

//       if (pollingRef.current) {
//         clearInterval(pollingRef.current);
//         pollingRef.current = null;
//       }
//     };
//   }, [selectedConversation?._id]);

//   // =====================================================
//   // Send Message
//   // =====================================================

//   const handleSendMessage = async (text) => {
//     const cleanText = text?.trim();

//     if (!cleanText) {
//       return;
//     }

//     const conversation = selectedConversationRef.current;

//     if (!conversation?._id) {
//       console.error("No conversation selected");
//       return;
//     }

//     try {
//       setSendingMessage(true);

//       console.log("========== SENDING MESSAGE ==========");
//       console.log("Conversation ID:", conversation._id);
//       console.log("Text:", cleanText);
//       console.log("Current User:", currentUserRef.current);
//       console.log("=====================================");

//       const response = await sendMessage(conversation._id, cleanText);

//       console.log("========== SENT MESSAGE ==========");
//       console.log("Response:", response);
//       console.log("Message:", response?.message);
//       console.log("==================================");

//       if (!response?.success || !response?.message) {
//         return;
//       }

//       const sentMessage = response.message;

//       // إضافة الرسالة مباشرة
//       setMessages((previousMessages) => {
//         const exists = previousMessages.some(
//           (message) => String(message._id) === String(sentMessage._id),
//         );

//         if (exists) {
//           return previousMessages;
//         }

//         return [...previousMessages, sentMessage];
//       });

//       // تحديث Preview
//       setConversations((previous) =>
//         previous.map((item) =>
//           String(item._id) === String(conversation._id)
//             ? {
//                 ...item,
//                 lastMessage: sentMessage.text,
//                 lastMessageAt: sentMessage.createdAt,
//               }
//             : item,
//         ),
//       );

//       // تحديث Selected Conversation
//       setSelectedConversation((previous) => {
//         if (!previous) {
//           return previous;
//         }

//         return {
//           ...previous,
//           lastMessage: sentMessage.text,
//           lastMessageAt: sentMessage.createdAt,
//         };
//       });
//     } catch (error) {
//       console.error("SEND MESSAGE ERROR:", error);

//       if (error.response) {
//         console.error("STATUS:", error.response.status);

//         console.error("SERVER RESPONSE:", error.response.data);
//       }
//     } finally {
//       setSendingMessage(false);
//     }
//   };

//   // =====================================================
//   // Back
//   // =====================================================

//   const handleBackToConversations = () => {
//     setSelectedConversation(null);
//     selectedConversationRef.current = null;

//     setMessages([]);

//     if (pollingRef.current) {
//       clearInterval(pollingRef.current);
//       pollingRef.current = null;
//     }
//   };

//   // =====================================================
//   // Search
//   // =====================================================

//   const filteredConversations = conversations.filter((conversation) => {
//     const user = getOtherUser(conversation);

//     const searchText = search.toLowerCase().trim();

//     const name = user?.fullName?.toLowerCase() || "";

//     const username =
//       user?.userName?.toLowerCase() || user?.username?.toLowerCase() || "";

//     return name.includes(searchText) || username.includes(searchText);
//   });

//   // =====================================================
//   // Loading
//   // =====================================================

//   if (loading) {
//     return (
//       <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gray-50 dark:bg-slate-950">
//         <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//           <Loader2 size={20} className="animate-spin" />

//           <span>Loading messages...</span>
//         </div>
//       </div>
//     );
//   }

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <div className="h-[calc(100vh-80px)] min-h-0 bg-gray-50 p-0 dark:bg-slate-950 md:p-6">
//       <div className="flex h-full min-h-0 overflow-hidden bg-white dark:bg-slate-900 md:rounded-2xl md:border md:border-gray-200 md:shadow-sm md:dark:border-slate-800">
//         {/* =================================================
//             Conversations
//         ================================================= */}

//         <div
//           className={`h-full w-full md:flex md:w-[340px] ${
//             selectedConversation ? "hidden" : "flex"
//           }`}
//         >
//           <ConversationsList
//             filteredConversations={filteredConversations}
//             search={search}
//             setSearch={setSearch}
//             setSelectedConversation={handleSelectConversation}
//             selectedConversation={selectedConversation}
//             currentUserId={currentUser?._id}
//           />
//         </div>

//         {/* =================================================
//             Chat
//         ================================================= */}

//         <div
//           className={`h-full min-w-0 flex-1 flex-col ${
//             selectedConversation ? "flex" : "hidden"
//           } md:flex`}
//         >
//           {selectedConversation ? (
//             <>
//               {/* Header */}

//               <ChatHeader
//                 selectedConversation={selectedConversation}
//                 onBack={handleBackToConversations}
//                 currentUserId={currentUser?._id}
//               />

//               {/* Messages */}

//               {loadingMessages ? (
//                 <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-slate-950">
//                   <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//                     <Loader2 size={20} className="animate-spin" />

//                     <span>Loading messages...</span>
//                   </div>
//                 </div>
//               ) : (
//                 <ChatMessages
//                   messages={messages}
//                   currentUserId={currentUser?._id}
//                 />
//               )}

//               {/* Input */}

//               <MessageInput
//                 onSendMessage={handleSendMessage}
//                 disabled={sendingMessage}
//               />
//             </>
//           ) : (
//             <div className="hidden flex-1 items-center justify-center bg-gray-50 dark:bg-slate-950 md:flex">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
//                   <Send size={24} />
//                 </div>

//                 <h2 className="font-semibold text-gray-900 dark:text-white">
//                   Select a conversation
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                   Choose a conversation to start chatting.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Messages;




import React, { useCallback, useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import ConversationsList from "./components/ConversationsList";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import MessageInput from "./components/MessageInput";

import {
  getConversations,
  getMessages,
  sendMessage,
  getCurrentUser,
} from "../../../services/messageService";

function Messages() {
  const { conversationId } = useParams();

  // =====================================================
  // Current User
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

  const selectedConversationRef = useRef(null);
  const currentUserRef = useRef(null);
  const pollingRef = useRef(null);

  // =====================================================
  // Keep Current User Ref Updated
  // =====================================================

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  // =====================================================
  // Keep Selected Conversation Ref Updated
  // =====================================================

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // =====================================================
  // Get Current Client
  // =====================================================

  const loadCurrentUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();

      // console.log("========== CLIENT CHAT USER ==========");
      // console.log("Response:", response);
      // console.log("User:", response?.user);
      // console.log("======================================");

      if (!response?.user?._id) {
        throw new Error("Current client not found");
      }

      const user = response.user;

      // console.log("========== CLIENT ==========");
      // console.log("Client ID:", user._id);
      // console.log("Client Name:", user.fullName);
      // console.log("Client Role:", user.role);
      // console.log("============================");

      setCurrentUser(user);
      currentUserRef.current = user;

      return user;
    } catch (error) {
      console.error("GET CURRENT CLIENT ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("SERVER RESPONSE:", error.response.data);
      }

      return null;
    }
  }, []);

  // =====================================================
  // Load Client Conversations
  // =====================================================

  const loadConversations = useCallback(async () => {
    try {
      const response = await getConversations();

      // console.log("========== CLIENT CONVERSATIONS ==========");
      // console.log("Response:", response);
      // console.log("Conversations:", response?.conversations);
      // console.log("==========================================");

      if (!response?.success) {
        return [];
      }

      const loadedConversations = response.conversations || [];

      setConversations(loadedConversations);

      return loadedConversations;
    } catch (error) {
      console.error("GET CLIENT CONVERSATIONS ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("SERVER RESPONSE:", error.response.data);
      }

      return [];
    }
  }, []);

  // =====================================================
  // Initialize Client Chat
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

        await loadConversations();
      } catch (error) {
        console.error("INITIALIZE CLIENT CHAT ERROR:", error);
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
  // Get Freelancer From Conversation
  // =====================================================

  const getOtherUser = useCallback((conversation) => {
    if (!conversation?.participants?.length) {
      return null;
    }

    const client = currentUserRef.current;

    if (!client?._id) {
      return null;
    }

    const clientId = String(client._id);

    const freelancer = conversation.participants.find(
      (participant) =>
        participant?._id && String(participant._id) !== clientId,
    );

    return freelancer || null;
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

      console.log("========== CLIENT GET MESSAGES ==========");
      console.log("Conversation ID:", id);
      console.log("Response:", response);
      console.log("Messages:", response?.messages);
      console.log("=========================================");

      if (!response?.success) {
        return [];
      }

      const newMessages = response.messages || [];

      setMessages(newMessages);

      return newMessages;
    } catch (error) {
      console.error("GET CLIENT MESSAGES ERROR:", error);

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

      console.log("========== CLIENT SELECT CHAT ==========");
      console.log("Conversation ID:", conversation._id);
      console.log("Client ID:", currentUserRef.current?._id);
      console.log("Participants:", conversation.participants);
      console.log("Freelancer:", getOtherUser(conversation));
      console.log("=========================================");

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
      console.error(
        "Client conversation not found:",
        conversationId,
      );

      return;
    }

    if (
      String(selectedConversationRef.current?._id) ===
      String(conversation._id)
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

    console.log("========== START CLIENT POLLING ==========");
    console.log("Conversation:", id);
    console.log("==========================================");

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
            console.log(
              "CLIENT NEW MESSAGES:",
              newMessages.length,
            );

            return newMessages;
          }

          const previousLast =
            previousMessages[previousMessages.length - 1];

          const newLast =
            newMessages[newMessages.length - 1];

          if (
            previousLast?._id !== newLast?._id ||
            previousLast?.text !== newLast?.text
          ) {
            return newMessages;
          }

          return previousMessages;
        });

        // Update conversation preview
        const lastMessage =
          newMessages[newMessages.length - 1];

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
        console.error(
          "CLIENT AUTO RECEIVE MESSAGES ERROR:",
          error,
        );
      }
    }, 2000);

    return () => {
      console.log(
        "STOP CLIENT POLLING:",
        id,
      );

      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [selectedConversation?._id]);

  // =====================================================
  // Send Message As Client
  // =====================================================

  const handleSendMessage = async (text) => {
    const cleanText = text?.trim();

    if (!cleanText) {
      return;
    }

    const conversation =
      selectedConversationRef.current;

    if (!conversation?._id) {
      console.error("No client conversation selected");
      return;
    }

    try {
      setSendingMessage(true);

      console.log("========== CLIENT SEND MESSAGE ==========");
      console.log(
        "Conversation ID:",
        conversation._id,
      );
      console.log("Text:", cleanText);
      console.log(
        "Client:",
        currentUserRef.current,
      );
      console.log("=========================================");

      const response = await sendMessage(
        conversation._id,
        cleanText,
      );

      console.log("========== CLIENT MESSAGE SENT ==========");
      console.log("Response:", response);
      console.log("Message:", response?.message);
      console.log("=========================================");

      if (!response?.success || !response?.message) {
        return;
      }

      const sentMessage = response.message;

      // Add message immediately
      setMessages((previousMessages) => {
        const exists = previousMessages.some(
          (message) =>
            String(message._id) ===
            String(sentMessage._id),
        );

        if (exists) {
          return previousMessages;
        }

        return [...previousMessages, sentMessage];
      });

      // Update conversation preview
      setConversations((previous) =>
        previous.map((item) =>
          String(item._id) ===
          String(conversation._id)
            ? {
                ...item,
                lastMessage: sentMessage.text,
                lastMessageAt:
                  sentMessage.createdAt,
              }
            : item,
        ),
      );

      // Update selected conversation
      setSelectedConversation((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          lastMessage: sentMessage.text,
          lastMessageAt:
            sentMessage.createdAt,
        };
      });
    } catch (error) {
      console.error(
        "CLIENT SEND MESSAGE ERROR:",
        error,
      );

      if (error.response) {
        console.error(
          "STATUS:",
          error.response.status,
        );

        console.error(
          "SERVER RESPONSE:",
          error.response.data,
        );
      }
    } finally {
      setSendingMessage(false);
    }
  };

  // =====================================================
  // Back To Conversations
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
  // Search
  // =====================================================

  const filteredConversations =
    conversations.filter((conversation) => {
      const freelancer =
        getOtherUser(conversation);

      const searchText =
        search.toLowerCase().trim();

      const name =
        freelancer?.fullName?.toLowerCase() || "";

      const username =
        freelancer?.userName?.toLowerCase() ||
        freelancer?.username?.toLowerCase() ||
        "";

      return (
        name.includes(searchText) ||
        username.includes(searchText)
      );
    });

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Loader2
            size={20}
            className="animate-spin"
          />

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
            Client Conversations
        ================================================= */}

        <div
          className={`h-full w-full md:flex md:w-[340px] ${
            selectedConversation
              ? "hidden"
              : "flex"
          }`}
        >
          <ConversationsList
            filteredConversations={
              filteredConversations
            }
            search={search}
            setSearch={setSearch}
            setSelectedConversation={
              handleSelectConversation
            }
            selectedConversation={
              selectedConversation
            }
            currentUserId={currentUser?._id}
          />
        </div>

        {/* =================================================
            Client Chat
        ================================================= */}

        <div
          className={`h-full min-w-0 flex-1 flex-col ${
            selectedConversation
              ? "flex"
              : "hidden"
          } md:flex`}
        >
          {selectedConversation ? (
            <>
              {/* Header */}

              <ChatHeader
                selectedConversation={
                  selectedConversation
                }
                onBack={
                  handleBackToConversations
                }
                currentUserId={
                  currentUser?._id
                }
              />

              {/* Messages */}

              {loadingMessages ? (
                <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-slate-950">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    <span>
                      Loading messages...
                    </span>
                  </div>
                </div>
              ) : (
                <ChatMessages
                  messages={messages}
                  currentUserId={
                    currentUser?._id
                  }
                />
              )}

              {/* Input */}

              <MessageInput
                onSendMessage={
                  handleSendMessage
                }
                disabled={
                  sendingMessage
                }
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
                  Choose a conversation to start
                  chatting with a freelancer.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;