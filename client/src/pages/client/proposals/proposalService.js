import axios from "axios";
const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

const API_URL = `${URL_SERVER}/api/client`;

// =====================================================
// Get All Client Proposals
// =====================================================

export const getClientProposals = async () => {
  const response = await axios.get(`${API_URL}/proposals`, {
    withCredentials: true,
  });

  return response.data;
};

// =====================================================
// Get Proposals For Specific Job
// =====================================================

export const getJobProposals = async (jobId) => {
  const response = await axios.get(`${API_URL}/jobs/${jobId}/proposals`, {
    withCredentials: true,
  });

  return response.data;
};

// =====================================================
// Get Single Proposal
// =====================================================

export const getClientProposal = async (proposalId) => {
  const response = await axios.get(`${API_URL}/proposals/${proposalId}`, {
    withCredentials: true,
  });

  return response.data;
};

// =====================================================
// Accept Proposal
// =====================================================

export const acceptProposal = async (proposalId) => {
  const response = await axios.patch(
    `${API_URL}/proposals/${proposalId}/accept`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};

// =====================================================
// Reject Proposal
// =====================================================

export const rejectProposal = async (proposalId) => {
  const response = await axios.patch(
    `${API_URL}/proposals/${proposalId}/reject`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};
