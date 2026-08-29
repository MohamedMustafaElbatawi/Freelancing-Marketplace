const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getJobProposals,
  getClientProposals,
  getClientProposal,
  acceptProposal,
  rejectProposal,
} = require("../controllers/clientProposalController");

// =====================================================
// Client Proposals
// =====================================================

// كل الـ proposals الخاصة بكل وظائف العميل
router.get("/proposals", authMiddleware, getClientProposals);

// كل الـ proposals الخاصة بـ Job معين
router.get("/jobs/:jobId/proposals", authMiddleware, getJobProposals);

// Proposal واحدة
router.get("/proposals/:id", authMiddleware, getClientProposal);

// Accept
router.patch("/proposals/:id/accept", authMiddleware, acceptProposal);

// Reject
router.patch("/proposals/:id/reject", authMiddleware, rejectProposal);

module.exports = router;
