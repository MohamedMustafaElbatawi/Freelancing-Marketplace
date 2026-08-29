const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // الشخص الذي سيستلم الإشعار
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // الشخص الذي تسبب في الإشعار
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // نوع الإشعار
    type: {
      type: String,
      enum: [
        "proposal",
        "message",
        "payment",
        "project",
        "application",
        "milestone",
        "system",
      ],
      required: true,
    },

    // عنوان الإشعار
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // محتوى الإشعار
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // لو الإشعار متعلق بـ Job
    relatedJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null,
    },

    // لو الإشعار متعلق بـ Proposal
    relatedProposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      default: null,
    },

    // هل المستخدم قرأ الإشعار؟
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
