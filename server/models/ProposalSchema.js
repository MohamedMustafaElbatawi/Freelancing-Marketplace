const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancing",
      required: true,
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },

    proposedBudget: {
      type: Number,
      required: true,
      min: 0,
    },

    estimatedDuration: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Withdrawn"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

// منع الفريلانسر من التقديم على نفس الوظيفة أكثر من مرة
proposalSchema.index(
  {
    job: 1,
    freelancer: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Proposal", proposalSchema);