const Proposal = require("../models/ProposalSchema");
const JOB = require("../models/JobSchema");

// =====================================================
// Get Proposals For Client Job
// GET /api/client/jobs/:jobId/proposals
// =====================================================

exports.getJobProposals = async (req, res) => {
  try {
    const clientId = req.user._id || req.user.id;
    const { jobId } = req.params;

    console.log("========== GET CLIENT JOB PROPOSALS ==========");
    console.log("Client ID:", clientId);
    console.log("Job ID:", jobId);

    // -----------------------------------------
    // Check Job
    // -----------------------------------------

    const job = await JOB.findOne({
      _id: jobId,
      client: clientId,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not the owner of this job",
      });
    }

    // -----------------------------------------
    // Get Proposals
    // -----------------------------------------

    const proposals = await Proposal.find({
      job: jobId,
    })
      .populate({
        path: "freelancer",
        select:
          "fullName userName email profilePhoto professionalTitle skills experienceLevel yearsOfExperience hourlyRate bio location portfolio github linkedin",
      })
      .populate({
        path: "job",
        select:
          "jobTitle category description skills paymentType currency budget duration deadline status proposals",
      })
      .sort({ createdAt: -1 });

    console.log("Proposals Count:", proposals.length);
    console.log("==============================================");

    return res.status(200).json({
      success: true,
      job,
      proposals,
      count: proposals.length,
    });
  } catch (error) {
    console.error("GET CLIENT JOB PROPOSALS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get job proposals",
      error: error.message,
    });
  }
};

// =====================================================
// Get All Proposals For Client
// GET /api/client/proposals
// =====================================================

exports.getClientProposals = async (req, res) => {
  try {
    const clientId = req.user._id || req.user.id;

    console.log("========== GET CLIENT PROPOSALS ==========");
    console.log("Client ID:", clientId);

    // -----------------------------------------
    // Get Client Jobs
    // -----------------------------------------

    const jobs = await JOB.find({
      client: clientId,
    }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    // -----------------------------------------
    // Get Proposals
    // -----------------------------------------

    const proposals = await Proposal.find({
      job: { $in: jobIds },
    })
      .populate({
        path: "freelancer",
        select:
          "fullName userName email profilePhoto professionalTitle skills experienceLevel yearsOfExperience hourlyRate bio location portfolio github linkedin",
      })
      .populate({
        path: "job",
        select:
          "jobTitle category description paymentType currency budget duration deadline status proposals client",
      })
      .sort({ createdAt: -1 });

    console.log("Jobs Count:", jobIds.length);
    console.log("Proposals Count:", proposals.length);
    console.log("==========================================");

    return res.status(200).json({
      success: true,
      proposals,
      count: proposals.length,
    });
  } catch (error) {
    console.error("GET CLIENT PROPOSALS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get client proposals",
      error: error.message,
    });
  }
};

// =====================================================
// Get Single Proposal For Client
// GET /api/client/proposals/:id
// =====================================================

exports.getClientProposal = async (req, res) => {
  try {
    const clientId = req.user._id || req.user.id;
    const { id } = req.params;

    console.log("========== GET CLIENT PROPOSAL ==========");
    console.log("Client ID:", clientId);
    console.log("Proposal ID:", id);

    // -----------------------------------------
    // Find Proposal
    // -----------------------------------------

    const proposal = await Proposal.findById(id)
      .populate({
        path: "freelancer",
        select:
          "fullName userName email profilePhoto professionalTitle skills experienceLevel yearsOfExperience hourlyRate bio location portfolio github linkedin",
      })
      .populate({
        path: "job",
        populate: {
          path: "client",
          select: "fullName userName email profilePhoto location",
        },
      });

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    // -----------------------------------------
    // Security Check
    // -----------------------------------------

    if (
      !proposal.job?.client ||
      String(proposal.job.client._id) !== String(clientId)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this proposal",
      });
    }

    console.log("Proposal Freelancer:", proposal.freelancer);
    console.log("=========================================");

    return res.status(200).json({
      success: true,
      proposal,
    });
  } catch (error) {
    console.error("GET CLIENT PROPOSAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get proposal",
      error: error.message,
    });
  }
};

// =====================================================
// Accept Proposal
// PATCH /api/client/proposals/:id/accept
// =====================================================

exports.acceptProposal = async (req, res) => {
  try {
    const clientId = req.user._id || req.user.id;
    const { id } = req.params;

    console.log("========== ACCEPT PROPOSAL ==========");
    console.log("Client ID:", clientId);
    console.log("Proposal ID:", id);

    // -----------------------------------------
    // Get Proposal + Job
    // -----------------------------------------

    const proposal = await Proposal.findById(id).populate("job");

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    // -----------------------------------------
    // Check Job Ownership
    // -----------------------------------------

    if (
      !proposal.job?.client ||
      String(proposal.job.client) !== String(clientId)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to manage this proposal",
      });
    }

    // -----------------------------------------
    // Check Proposal Status
    // -----------------------------------------

    if (proposal.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `This proposal is already ${proposal.status}`,
      });
    }

    // -----------------------------------------
    // Reject Other Proposals
    // -----------------------------------------

    await Proposal.updateMany(
      {
        job: proposal.job._id,
        _id: { $ne: proposal._id },
        status: "Pending",
      },
      {
        $set: {
          status: "Rejected",
        },
      },
    );

    // -----------------------------------------
    // Accept Selected Proposal
    // -----------------------------------------

    proposal.status = "Accepted";

    await proposal.save();

    // -----------------------------------------
    // Close Job
    // -----------------------------------------

    proposal.job.status = "Closed";

    await proposal.job.save();

    // -----------------------------------------
    // Get Updated Proposal
    // -----------------------------------------

    const updatedProposal = await Proposal.findById(proposal._id)
      .populate({
        path: "freelancer",
        select:
          "fullName userName email profilePhoto professionalTitle skills experienceLevel yearsOfExperience hourlyRate bio location portfolio github linkedin",
      })
      .populate({
        path: "job",
        select:
          "jobTitle category description paymentType currency budget duration deadline status proposals client",
      });

    console.log("Proposal Accepted Successfully");
    console.log("====================================");

    return res.status(200).json({
      success: true,
      message: "Proposal accepted successfully",
      proposal: updatedProposal,
    });
  } catch (error) {
    console.error("ACCEPT PROPOSAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept proposal",
      error: error.message,
    });
  }
};

// =====================================================
// Reject Proposal
// PATCH /api/client/proposals/:id/reject
// =====================================================

exports.rejectProposal = async (req, res) => {
  try {
    const clientId = req.user._id || req.user.id;
    const { id } = req.params;

    console.log("========== REJECT PROPOSAL ==========");
    console.log("Client ID:", clientId);
    console.log("Proposal ID:", id);

    // -----------------------------------------
    // Get Proposal + Job
    // -----------------------------------------

    const proposal = await Proposal.findById(id).populate("job");

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    // -----------------------------------------
    // Check Job Ownership
    // -----------------------------------------

    if (
      !proposal.job?.client ||
      String(proposal.job.client) !== String(clientId)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to manage this proposal",
      });
    }

    // -----------------------------------------
    // Check Status
    // -----------------------------------------

    if (proposal.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `This proposal is already ${proposal.status}`,
      });
    }

    // -----------------------------------------
    // Reject
    // -----------------------------------------

    proposal.status = "Rejected";

    await proposal.save();

    // -----------------------------------------
    // Get Updated Proposal
    // -----------------------------------------

    const updatedProposal = await Proposal.findById(proposal._id)
      .populate({
        path: "freelancer",
        select: "fullName userName email profilePhoto professionalTitle",
      })
      .populate({
        path: "job",
        select:
          "jobTitle category description paymentType currency budget duration deadline status proposals client",
      });

    console.log("Proposal Rejected Successfully");
    console.log("===================================");

    return res.status(200).json({
      success: true,
      message: "Proposal rejected successfully",
      proposal: updatedProposal,
    });
  } catch (error) {
    console.error("REJECT PROPOSAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject proposal",
      error: error.message,
    });
  }
};
