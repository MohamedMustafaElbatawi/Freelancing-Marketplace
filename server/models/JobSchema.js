const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
    },

    description: {
      type: String,
    },

    skills: [{ type: String }],

    paymentType: {
      type: String,
      enum: ["Fixed Price", "Hourly Rate"],
      default: "Fixed Price",
    },

    currency: {
      type: String,
      default: "USD",
    },

    budget: {
      type: String,
    },

    duration: {
      type: String,
    },

    commitment: {
      type: String,
    },
    proposals: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    deadline: {
      type: Date,
    },

    experienceLevel: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
    },

    projectType: {
      type: String,
      enum: ["one-time", "ongoing"],
      default: "one-time",
    },

    attachments: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      default: "Published",
    },

    // صاحب الوظيفة
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancing",
      //   required: false,
    },
    // status: {
    //   type: String,
    //   enum: ["active", "closed", "completed"],
    //   default: "active",
    // },
  },
  {
    timestamps: true,
  },
);

const JOB = mongoose.model("Job", jobSchema);

module.exports = JOB;
