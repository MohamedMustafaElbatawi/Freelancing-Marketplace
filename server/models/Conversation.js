const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        // أنا بقول لـ Mongoose إن قيمة الحقل ده لازم تكون MongoDB ObjectId.
        type: mongoose.Schema.Types.ObjectId,
        // دي مجموعة أنواع بيانات Mongoose بتوفرها لنا.
        // mongoose.Schema.Types.String  او ممكن نكتب String
        // mongoose.Schema.Types.Number   او ممكن نكتب Number
        ref: "freelancing",
        required: true,
      },
    ],

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Conversation", conversationSchema);
