const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProposal,
  getMyProposals,
  getProposal,
  withdrawProposal,
} = require("../controllers/proposalController");

// Submit Proposal
router.post("/jobs/:jobId/proposals", authMiddleware, createProposal);

// My Proposals
router.get("/proposals/my", authMiddleware, getMyProposals);

// Single Proposal
router.get("/proposals/:id", authMiddleware, getProposal);

// Withdraw Proposal
router.patch("/proposals/:id/withdraw", authMiddleware, withdrawProposal);

module.exports = router;
