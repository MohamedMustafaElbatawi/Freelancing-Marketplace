const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const upload = require("./middleware/uploadMiddleware");
const authRoutes = require("./routes/authRoutes.js");
const jobRoutes = require("./routes/jobRoutes");
const clientProposalRoutes = require("./routes/clientProposalRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const projectRoutes = require("./routes/projectRoutes");
const User = require("./models/UserSchema");
const JOB = require("./models/JobSchema");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const Conversation = require("./models/Conversation.js");
const Message = require("./models/Message.js");
require("dotenv").config();
// const notificationRoutes = require("./routes/notificationRoutes");
// هنربطها لما نخلص  المشروع
// app.use("/api/notifications", notificationRoutes);

// علشان يشتغل السيرفر مع الصور عبر طريق المسار uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// أنت ناقص عندك CORS في السيرفر قبل ما توصل الفرونت
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);

// app.post(
//   "/api/job",
//   authMiddleware,
//   upload.array("attachments"),
//   async (req, res) => {
//     // app.post("/api/job", upload.array("attachments"), async (req, res) => {
//     try {
//       const {
//         jobTitle,
//         category,
//         description,
//         paymentType,
//         currency,
//         budget,
//         duration,
//         commitment,
//         deadline,
//         experienceLevel,
//         projectType,
//       } = req.body;

//       const skills = JSON.parse(req.body.skills);

//       const newJob = new JOB({
//         jobTitle,
//         category,
//         description,

//         skills,

//         paymentType,
//         currency,

//         budget,
//         duration,
//         commitment,

//         deadline,
//         experienceLevel,
//         projectType,

//         attachments: req.files.map((file) => file.path),
//         status: "Published",
//         client: req.user.id,
//       });

//       const savedJob = await newJob.save();

//       res.status(201).json(savedJob);
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   },
// );

// app.get("/api/myJobs", authMiddleware, async (req, res) => {
//   // app.get("/api/myJobs", async (req, res) => {
//   try {
//     const jobs = await JOB.find({
//       client: req.user.id,
//     }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json({
//       jobs,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// app.get("/api/job/:id", authMiddleware, async (req, res) => {
//   try {
//     const job = await JOB.findById({
//       _id: req.params.id,
//       client: req.user.id,
//     });

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//       });
//     }

//     res.status(200).json({
//       job,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// app.delete("/api/job/:id", authMiddleware, async (req, res) => {
//   try {

//     const job = await JOB.findByIdAndDelete({
//       _id: req.params.id,
//       client: req.user.id,
//     });

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//       });
//     }

//     res.status(200).json({
//       job,
//       message: "Job deleted successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// app.delete("/api/job/:id", authMiddleware, async (req, res) => {
//   try {
//     const job = await JOB.findOne({
//       _id: req.params.id,
//       client: req.user.id,
//     });

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//       });
//     }

//     await JOB.findOneAndDelete(job._id);

//     res.status(200).json({
//       job,
//       message: "Job deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// app.patch("/api/job/:id/close", authMiddleware, async (req, res) => {
//   try {
//     const job = await JOB.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         client: req.user.id,
//       },
//       {
//         status: "Closed",
//       },
//       {
//         //رجعلي النسخة الجديدة بعد التعديل
//         new: true,
//       },
//     );

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//       });
//     }

//     res.status(200).json({
//       message: "Job closed successfully",
//       job,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// app.patch("/api/job/:id/reopen", authMiddleware, async (req, res) => {
//   try {
//     const job = await JOB.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         client: req.user.id,
//       },
//       {
//         status: "Published",
//       },
//       {
//         new: true,
//       },
//     );

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//       });
//     }

//     res.status(200).json({
//       message: "Job reopened successfully",
//       job,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// app.put(
//   "/api/job/:id",
//   authMiddleware,
//   upload.array("attachments"),
//   async (req, res) => {
//     try {
//       const {
//         jobTitle,
//         category,
//         description,
//         paymentType,
//         currency,
//         budget,
//         duration,
//         commitment,
//         deadline,
//         experienceLevel,
//         projectType,
//         status,
//       } = req.body;

//       const skills = JSON.parse(req.body.skills);

//       const job = await JOB.findOne({
//         _id: req.params.id,
//         client: req.user.id,
//       });

//       if (!job) {
//         return res.status(404).json({
//           message: "Job not found",
//         });
//       }

//       job.jobTitle = jobTitle;
//       job.category = category;
//       job.description = description;

//       job.skills = skills;

//       job.paymentType = paymentType;
//       job.currency = currency;
//       job.budget = budget;
//       job.duration = duration;
//       job.commitment = commitment;

//       job.deadline = deadline ? deadline : null;
//       job.experienceLevel = experienceLevel;
//       job.projectType = projectType;

//       if (status) {
//         job.status = status;
//       }

//       // لو رفع ملفات جديدة
//       if (req.files && req.files.length > 0) {
//         job.attachments = req.files.map((file) => file.path);
//       }

//       const updatedJob = await job.save();

//       res.status(200).json({
//         message: "Job updated successfully",
//         job: updatedJob,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   },
// );

// get client profile
// app.get("/api/client/profile", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to get profile",
//       error: error.message,
//     });
//   }
// });

// put client profile
// app.put(
//   "/api/client/update/profile",
//   authMiddleware,
//   upload.single("profilePhoto"),
//   async (req, res) => {
//     try {
//       // console.log("USER ID:", req.user._id);
//       // console.log("BODY:", req.body);
//       // console.log("FILE:", req.file);

//       const user = await User.findById(req.user._id);

//       if (!user) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }

//       user.fullName = req.body.fullName;
//       user.email = req.body.email;
//       user.companyName = req.body.companyName;
//       user.industry = req.body.industry;
//       user.website = req.body.website;
//       user.bio = req.body.bio;

//       if (req.file) {
//         user.profilePhoto = req.file.path;
//       }

//       await user.save();

//       res.status(200).json({
//         message: "Profile updated successfully",
//         user,
//       });
//     } catch (error) {
//       console.error("UPDATE PROFILE ERROR:", error);

//       res.status(500).json({
//         message: "Failed to update profile",
//         error: error.message,
//       });
//     }
//   },
// );

// app.put("/api/client/change-password", authMiddleware, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     // التأكد من وجود البيانات
//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({
//         message: "Current password and new password are required",
//       });
//     }

//     // جلب المستخدم
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // التأكد من الباسورد الحالي
//     const isPasswordCorrect = await bcrypt.compare(
//       currentPassword,
//       user.password,
//     );
//     if (!isPasswordCorrect) {
//       return res.status(400).json({
//         message: "Current password is incorrect",
//       });
//     }

//     // التأكد إن الباسورد الجديد مختلف
//     if (currentPassword === newPassword) {
//       return res.status(400).json({
//         message: "New password must be different from current password",
//       });
//     }

//     // تشفير الباسورد الجديد
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;

//     await user.save();

//     res.status(200).json({
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to change password",
//       error: error.message,
//     });
//   }
// });

// app.delete("/api/client/profile/photo", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     if (user.profilePhoto) {
//       const imagePath = path.join(__dirname, user.profilePhoto);

//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//       }
//     }

//     user.profilePhoto = "";

//     await user.save();

//     res.status(200).json({
//       message: "Profile photo removed successfully",
//     });
//   } catch (error) {
//     console.error("REMOVE PROFILE PHOTO ERROR:", error);

//     res.status(500).json({
//       message: "Failed to remove profile photo",
//       error: error.message,
//     });
//   }
// });

// app.delete("/api/client/account", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//     await User.findByIdAndDelete(req.user._id);

//     res.status(200).json({
//       message: "Account deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });
app.use("/api", jobRoutes);
app.use("/api", proposalRoutes);
app.use("/api/freelancer/projects", projectRoutes);
app.use("/api/client", clientProposalRoutes);

// 1. Create Conversation
app.post("/api/conversations", authMiddleware, async (req, res) => {
  try {
    // console.log("========== CONVERSATION DEBUG ==========");
    // console.log("LOGGED USER:", req.user._id.toString());
    // console.log("TARGET USER:", req.body.userId);
    // console.log("========================================");
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot create a conversation with yourself",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        // $all: بتقول لـ MongoDB:
        // الـ Array لازم تحتوي على كل القيم اللي أنا محددها.
        $all: [req.user._id, userId],
      },
    });

    if (conversation) {
      return res.status(200).json({
        success: true,
        conversation,
      });
    }
    // أنشئ Conversation جديدة وحط فيها الشخص الحالي والشخص اللي عايز يكلمه.
    conversation = await Conversation.create({
      participants: [req.user._id, userId],
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Create conversation error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// 2. Get My Conversations
app.get("/api/conversations", authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "fullName userName email profilePhoto")
      .sort({
        lastMessageAt: -1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error("Get conversations error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// 3. Send Message
app.post(
  "/api/conversations/:conversationId/messages",
  authMiddleware,
  async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { text } = req.body;

      if (!text || !text.trim()) {
        return res.status(400).json({
          success: false,
          message: "Message text is required",
        });
      }

      const conversation = await Conversation.findOne({
        _id: conversationId,
        participants: req.user._id,
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      const message = await Message.create({
        conversation: conversationId,
        sender: req.user._id,
        text: text.trim(),
      });

      conversation.lastMessage = text.trim();
      conversation.lastMessageAt = new Date();

      await conversation.save();

      const populatedMessage = await Message.findById(message._id).populate(
        "sender",
        "fullName userName email profilePhoto",
      );

      res.status(201).json({
        success: true,
        message: populatedMessage,
      });
    } catch (error) {
      console.error("Send message error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

// 4. Get Conversation Messages
app.get(
  "/api/conversations/:conversationId/messages",
  authMiddleware,
  async (req, res) => {
    try {
      const { conversationId } = req.params;

      const conversation = await Conversation.findOne({
        _id: conversationId,
        participants: req.user._id,
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      const messages = await Message.find({
        conversation: conversationId,
      })
        .populate("sender", "fullName userName email profilePhoto")
        .sort({
          createdAt: 1,
        });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      console.error("Get messages error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
