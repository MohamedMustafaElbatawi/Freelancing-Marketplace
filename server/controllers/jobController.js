const path = require("path");
const JOB = require("../models/JobSchema");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const fs = require("fs");

// exports.createJob = async (req, res) => {
//   // app.post("/api/job", upload.array("attachments"), async (req, res) => {
//   try {
//     const {
//       jobTitle,
//       category,
//       description,
//       paymentType,
//       currency,
//       budget,
//       duration,
//       commitment,
//       deadline,
//       experienceLevel,
//       projectType,
//     } = req.body;

//     const skills = JSON.parse(req.body.skills);

//     const newJob = new JOB({
//       jobTitle,
//       category,
//       description,

//       skills,

//       paymentType,
//       currency,

//       budget,
//       duration,
//       commitment,

//       deadline,
//       experienceLevel,
//       projectType,

//       attachments: req.files.map((file) => file.path),
//       status: "Published",
//       client: req.user.id,
//     });

//     const savedJob = await newJob.save();

//     res.status(201).json(savedJob);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.createJob = async (req, res) => {
  try {
    console.log("========== CREATE JOB DEBUG ==========");
    console.log("REQ.USER:", req.user);
    console.log("REQ.USER _ID:", req.user?._id);
    console.log("======================================");

    const {
      jobTitle,
      category,
      description,
      paymentType, 
      currency,
      budget,
      duration,
      commitment,
      deadline,
      experienceLevel,
      projectType,
    } = req.body;

    const skills = JSON.parse(req.body.skills);

    const newJob = new JOB({
      jobTitle,
      category,
      description,
      skills,
      paymentType,
      currency,
      budget,
      duration,
      commitment,
      deadline,
      experienceLevel,
      projectType,
      attachments: req.files?.map((file) => file.path) || [],
      status: "Published",

      client: req.user._id,
    });

    console.log("JOB BEFORE SAVE:", newJob);

    const savedJob = await newJob.save();

    console.log("JOB AFTER SAVE:", savedJob);

    res.status(201).json(savedJob);
  } catch (error) {
    console.log("CREATE JOB ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyJobs = async (req, res) => {
  // app.get("/api/myJobs", async (req, res) => {
  try {
    const jobs = await JOB.find({
      client: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getJob = async (req, res) => {
  try {
    const job = await JOB.findById({
      _id: req.params.id,
      client: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    const job = await JOB.findOne({
      _id: req.params.id,
      client: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    await JOB.findOneAndDelete(job._id);

    res.status(200).json({
      job,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.closeJob = async (req, res) => {
  try {
    const job = await JOB.findOneAndUpdate(
      {
        _id: req.params.id,
        client: req.user._id,
      },
      {
        status: "Closed",
      },
      {
        //رجعلي النسخة الجديدة بعد التعديل
        new: true,
      },
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job closed successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.reopenJob = async (req, res) => {
  try {
    const job = await JOB.findOneAndUpdate(
      {
        _id: req.params.id,
        client: req.user._id,
      },
      {
        status: "Published",
      },
      {
        new: true,
      },
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job reopened successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const {
      jobTitle,
      category,
      description,
      paymentType,
      currency,
      budget,
      duration,
      commitment,
      deadline,
      experienceLevel,
      projectType,
      status,
    } = req.body;

    const skills = JSON.parse(req.body.skills);

    const job = await JOB.findOne({
      _id: req.params.id,
      client: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    job.jobTitle = jobTitle;
    job.category = category;
    job.description = description;

    job.skills = skills;

    job.paymentType = paymentType;
    job.currency = currency;
    job.budget = budget;
    job.duration = duration;
    job.commitment = commitment;

    job.deadline = deadline ? deadline : null;
    job.experienceLevel = experienceLevel;
    job.projectType = projectType;

    if (status) {
      job.status = status;
    }

    // لو رفع ملفات جديدة
    if (req.files && req.files.length > 0) {
      job.attachments = req.files.map((file) => file.path);
    }

    const updatedJob = await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get profile",
      error: error.message,
    });
  }
};

exports.putProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.companyName = req.body.companyName;
    user.industry = req.body.industry;
    user.website = req.body.website;
    user.bio = req.body.bio;

    if (req.file) {
      user.profilePhoto = req.file.path;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

exports.changePasswordInProfile = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // التأكد من وجود البيانات
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    // جلب المستخدم
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // التأكد من الباسورد الحالي
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // التأكد إن الباسورد الجديد مختلف
    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    // تشفير الباسورد الجديد
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to change password",
      error: error.message,
    });
  }
};

exports.deleteProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.profilePhoto) {
      const imagePath = path.join(__dirname, user.profilePhoto);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    user.profilePhoto = "";

    await user.save();

    res.status(200).json({
      message: "Profile photo removed successfully",
    });
  } catch (error) {
    console.error("REMOVE PROFILE PHOTO ERROR:", error);

    res.status(500).json({
      message: "Failed to remove profile photo",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getAllJobs = async (req, res) => {
  try {
    const {
      search = "",
      category,
      experienceLevel,
      projectType,
      paymentType,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    const filter = {
      status: "Published",
    };

    // Search
    if (search.trim()) {
      filter.$or = [
        {
          jobTitle: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          skills: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Experience
    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    // Project Type
    if (projectType) {
      filter.projectType = projectType;
    }

    // Payment Type
    if (paymentType) {
      filter.paymentType = paymentType;
    }

    const currentPage = Math.max(Number(page), 1);
    const itemsPerPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * itemsPerPage;

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    if (sort === "mostProposals") {
      sortOption = {
        proposals: -1,
      };
    }

    if (sort === "mostViews") {
      sortOption = {
        views: -1,
      };
    }

    const jobs = await JOB.find(filter)
      .populate("client", "fullName userName email profilePhoto companyName")
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage)
      .lean();

    const totalJobs = await JOB.countDocuments(filter);

    const totalPages = Math.ceil(totalJobs / itemsPerPage);

    res.status(200).json({
      success: true,
      jobs,
      pagination: {
        currentPage,
        itemsPerPage,
        totalJobs,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("Get all jobs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get jobs",
      error: error.message,
    });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const job = await JOB.findOne({
      _id: req.params.id,
      status: "Published",
    }).populate(
      "client",
      "fullName userName profilePhoto location companyName industry",
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // زيادة عدد المشاهدات
    job.views = (job.views || 0) + 1;
    await job.save();

    res.status(200).json({
      job,
    });
  } catch (error) {
    console.error("GET JOB DETAILS ERROR:", error);

    res.status(500).json({
      message: "Failed to get job details",
      error: error.message,
    });
  }
};
