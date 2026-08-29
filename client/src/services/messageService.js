// import axios from "axios";

// // const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://localhost:5000/api";

// export const getConversations = async () => {
//   const response = await axios.get(`${API_URL}/conversations`, {
//     withCredentials: true,
//   });

//   return response.data;
// };

// export const createConversation = async (userId) => {
//   const response = await axios.post(
//     `${API_URL}/conversations`,
//     { userId },
//     {
//       withCredentials: true,
//     },
//   );

//   return response.data;
// };

// export const getMessages = async (conversationId) => {
//   const response = await axios.get(
//     `${SERVER_URL}/api/conversations/${conversationId}/messages`,
//     {
//       withCredentials: true,
//     },
//   );

//   return response.data;
// };

// export const sendMessage = async (conversationId, text) => {
//   const response = await axios.post(
//     `${API_URL}/conversations/${conversationId}/messages`,
//     { text },
//     {
//       withCredentials: true,
//     },
//   );

//   return response.data;
// };

// export const getCurrentUser = async () => {
//   const response = await axios.get(`${API_URL}/auth/me`, {
//     withCredentials: true,
//   });

//   return response.data;
// };

import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ==========================================
// Get Conversations
// ==========================================
export const getConversations = async () => {
  const response = await axios.get(`${API_URL}/conversations`, {
    withCredentials: true,
  });

  return response.data;
};

// ==========================================
// Create Conversation
// ==========================================
export const createConversation = async (userId) => {
  const response = await axios.post(
    `${API_URL}/conversations`,
    { userId },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

// ==========================================
// Get Messages
// ==========================================
export const getMessages = async (conversationId) => {
  const response = await axios.get(
    `${API_URL}/conversations/${conversationId}/messages`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

// ==========================================
// Send Message
// ==========================================
export const sendMessage = async (conversationId, text) => {
  const response = await axios.post(
    `${API_URL}/conversations/${conversationId}/messages`,
    { text },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

// ==========================================
// Get Current User
// ==========================================
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    withCredentials: true,
  });

  return response.data;
};
