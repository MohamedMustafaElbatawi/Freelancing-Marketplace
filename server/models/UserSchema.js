const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    // =====================
    // Basic User Information
    // =====================
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      required: true,
    },

    // =====================
    // Profile Status
    // =====================
    profileCompleted: {
      type: Boolean,
      default: false,
    },

    freelancerProfileCompleted: {
      type: Boolean,
      default: false,
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
    },

    // =====================
    // Common Profile Data
    // =====================
    profilePhoto: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    // =====================
    // Client Information
    // =====================
    companyName: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    companySize: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },

    // =====================
    // Freelancer Information
    // =====================
    professionalTitle: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "expert", ""],
      default: "",
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    // =====================
    // Password Reset
    // =====================
    resetPasswordCode: {
      type: String,
      default: null,
    },

    resetPasswordCodeExpires: {
      type: Date,
      default: null,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("freelancing", formSchema);

module.exports = User;
