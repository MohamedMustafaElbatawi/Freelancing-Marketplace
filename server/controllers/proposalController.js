const Proposal = require("../models/ProposalSchema");
const JOB = require("../models/JobSchema");

// =====================================================
// Create Proposal
// =====================================================

exports.createProposal = async (req, res) => {
  try {
    const { coverLetter, proposedBudget, estimatedDuration } = req.body;

    const jobId = req.params.jobId;

    // -----------------------------------------
    // Validation
    // -----------------------------------------

    if (!coverLetter || !proposedBudget || !estimatedDuration) {
      return res.status(400).json({
        message: "All proposal fields are required",
      });
    }

    // -----------------------------------------
    // Get Job
    // -----------------------------------------

    const job = await JOB.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // -----------------------------------------
    // Check Job Status
    // -----------------------------------------

    if (job.status === "Closed") {
      return res.status(400).json({
        message: "This job is closed and not accepting proposals",
      });
    }

    // -----------------------------------------
    // Check Freelancer
    // -----------------------------------------

    const freelancerId = req.user._id || req.user.id;

    // -----------------------------------------
    // Check Existing Proposal
    // -----------------------------------------

    const existingProposal = await Proposal.findOne({
      job: jobId,
      freelancer: freelancerId,
    });

    if (existingProposal) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    // -----------------------------------------
    // Create Proposal
    // -----------------------------------------

    const proposal = await Proposal.create({
      job: jobId,
      freelancer: freelancerId,
      coverLetter,
      proposedBudget: Number(proposedBudget),
      estimatedDuration,
    });

    // -----------------------------------------
    // Increase proposals count
    // -----------------------------------------

    job.proposals += 1;

    await job.save();

    // -----------------------------------------
    // Response
    // -----------------------------------------

    const populatedProposal = await Proposal.findById(proposal._id)
      .populate({
        path: "job",
        populate: {
          path: "client",
          select: "fullName userName email profilePhoto location",
        },
      })
      .populate(
        "freelancer",
        "fullName userName profilePhoto professionalTitle",
      );
    res.status(201).json({
      message: "Proposal submitted successfully",
      proposal: populatedProposal,
    });
  } catch (error) {
    console.error("CREATE PROPOSAL ERROR:", error);

    res.status(500).json({
      message: "Failed to submit proposal",
      error: error.message,
    });
  }
};

// =====================================================
// Get My Proposals
// =====================================================

exports.getMyProposals = async (req, res) => {
  try {
    const freelancerId = req.user._id || req.user.id;

    const proposals = await Proposal.find({
      freelancer: freelancerId,
    })
      .populate({
        path: "job",
        populate: {
          path: "client",
          select: "fullName userName email profilePhoto location",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      proposals,
    });
  } catch (error) {
    console.error("GET MY PROPOSALS ERROR:", error);

    res.status(500).json({
      message: "Failed to get proposals",
      error: error.message,
    });
  }
};

// =====================================================
// Get Single Proposal
// =====================================================

exports.getProposal = async (req, res) => {
  try {
    const freelancerId = req.user._id || req.user.id;

    const proposal = await Proposal.findOne({
      _id: req.params.id,
      freelancer: freelancerId,
    })
      .populate({
        path: "job",
        populate: {
          path: "client",
          select: "fullName userName email profilePhoto location",
        },
      })
      .populate(
        "freelancer",
        "fullName userName profilePhoto professionalTitle",
      );

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    res.status(200).json({
      proposal,
    });
  } catch (error) {
    console.error("GET PROPOSAL ERROR:", error);

    res.status(500).json({
      message: "Failed to get proposal",
      error: error.message,
    });
  }
};

// =====================================================
// Withdraw Proposal
// =====================================================

exports.withdrawProposal = async (req, res) => {
  try {
    const freelancerId = req.user._id || req.user.id;

    const proposal = await Proposal.findOne({
      _id: req.params.id,
      freelancer: freelancerId,
    });

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    if (proposal.status !== "Pending") {
      return res.status(400).json({
        message: "This proposal cannot be withdrawn",
      });
    }

    proposal.status = "Withdrawn";

    await proposal.save();

    // تقليل عدد الـ proposals
    await JOB.findByIdAndUpdate(proposal.job, {
      $inc: {
        proposals: -1,
      },
    });

    res.status(200).json({
      message: "Proposal withdrawn successfully",
      proposal,
    });
  } catch (error) {
    console.error("WITHDRAW PROPOSAL ERROR:", error);

    res.status(500).json({
      message: "Failed to withdraw proposal",
      error: error.message,
    });
  }
};
