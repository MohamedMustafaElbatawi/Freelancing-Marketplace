const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cloudinary = require("../config/cloudinary");

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

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
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    //استقبال البيانات من الفرونت
    const { fullName, userName, email, password, role } = req.body;

    //تأكد إن البيانات موجودة
    if (!fullName || !userName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // تأكد إن الإيميل أو اليوزر مش مستخدم قبل كده
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    //استخراج البيانات من الباسورد وحفظ
    // const newUser = await User.create({
    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    savedUser.password = undefined;

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const userResponse = user.toObject();

    delete userResponse.password;

    const isProduction = process.env.NODE_ENV === "production";

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: userResponse,
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();

    const user = await User.findOne({ email });

    console.log("EMAIL:", email);

    if (!user) {
      return res.status(200).json({
        message:
          "If an account with this email exists, a reset code has been sent.",
      });
    }

    // إنشاء كود مكون من 6 أرقام
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // حفظ الكود
    user.resetPasswordCode = resetCode;

    // الكود صالح لمدة 10 دقائق
    user.resetPasswordCodeExpires = Date.now() + 10 * 60 * 1000;

    await user.save({
      validateBeforeSave: false,
    });

    // إعداد Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // إرسال الكود
    const info = await transporter.sendMail({
      from: `"EliteLancer" <${process.env.EMAIL_USER}>`,

      to: user.email,

      subject: "EliteLancer Password Reset Code",

      html: `
        <h2>Reset Your Password</h2>

        <p>Your password reset code is:</p>

        <h1>${resetCode}</h1>

        <p>This code will expire in 10 minutes.</p>
      `,
    });

    console.log("Reset code:", resetCode);

    console.log("Email sent:", info.messageId);

    res.status(200).json({
      message:
        "If an account with this email exists, a reset code has been sent.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({
        message: "Email, code and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),

      resetPasswordCode: code,

      resetPasswordCodeExpires: {
        // Greater Than
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired code",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordCode = null;

    user.resetPasswordCodeExpires = null;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// const profileComplete = async (req, res) => {
//   try {
//     const {
//       fullName,
//       profilePhoto,
//       phone,
//       location,
//       companyName,
//       industry,
//       companySize,
//       bio,
//       website,
//       portfolio,
//       linkedin,
//       github,
//     } = req.body;

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//     user.profilePhoto = profilePhoto;
//     user.fullName = fullName;
//     user.phone = phone;
//     user.location = location;
//     user.companyName = companyName;
//     user.industry = industry;
//     user.companySize = companySize;
//     user.bio = bio;
//     user.website = website;
//     user.portfolio = portfolio;
//     user.linkedin = linkedin;

//     if (req.files?.profilePhoto) {
//       user.profilePhoto = req.files.profilePhoto[0].path;
//     }

//     if (req.files?.companyLogo) {
//       user.companyLogo = req.files.companyLogo[0].path;
//     }

//     user.profileCompleted = true;

//     await user.save();

//     const userResponse = user.toObject();

//     delete userResponse.password;

//     res.status(200).json({
//       message: "Profile completed successfully",
//       user: userResponse,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const profileComplete = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      location,
      companyName,
      industry,
      companySize,
      bio,
      website,
      portfolio,
      linkedin,
      github,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==========================================
    // Profile Photo -> Cloudinary
    // ==========================================

    if (req.files?.profilePhoto?.[0]) {
      const file = req.files.profilePhoto[0];

      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "freelancing-marketplace/profiles",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );

          stream.end(file.buffer);
        });

      const result = await uploadToCloudinary();

      user.profilePhoto = result.secure_url;
    }

    // ==========================================
    // User Data
    // ==========================================

    user.fullName = fullName;
    user.phone = phone;
    user.location = location;
    user.companyName = companyName;
    user.industry = industry;
    user.companySize = companySize;
    user.bio = bio;
    user.website = website;
    user.portfolio = portfolio;
    user.linkedin = linkedin;
    user.github = github;

    user.profileCompleted = true;

    await user.save();

    const userResponse = user.toObject();

    delete userResponse.password;

    return res.status(200).json({
      message: "Profile completed successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("PROFILE COMPLETE ERROR:", error);

    return res.status(500).json({
      message: "Failed to complete profile",
      error: error.message,
    });
  }
};
// const completeFreelancer = async (req, res) => {
//   try {
//     const {
//       fullName,
//       phone,
//       location,
//       professionalTitle,
//       experienceLevel,
//       yearsOfExperience,
//       hourlyRate,
//       bio,
//       website,
//       portfolio,
//       github,
//       linkedin,
//     } = req.body;

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const skills = JSON.parse(req.body.skills || "[]");

//     user.fullName = fullName;
//     user.phone = phone;
//     user.location = location;

//     user.professionalTitle = professionalTitle;

//     user.skills = skills;

//     user.experienceLevel = experienceLevel;

//     user.yearsOfExperience = yearsOfExperience;

//     user.yearsOfExperience = Number(yearsOfExperience);

//     user.hourlyRate = Number(hourlyRate);

//     user.bio = bio;
//     user.portfolio = portfolio;
//     user.website = website;
//     user.github = github;
//     user.linkedin = linkedin;

//     if (req.file) {
//       user.profilePhoto = req.file.path;
//     }

//     user.profileCompleted = true;

//     await user.save();

//     const userResponse = user.toObject();

//     delete userResponse.password;

//     res.status(200).json({
//       message: "Freelancer profile completed successfully",
//       user: userResponse,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const completeFreelancer = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      location,
      professionalTitle,
      experienceLevel,
      yearsOfExperience,
      hourlyRate,
      bio,
      website,
      portfolio,
      github,
      linkedin,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const skills = JSON.parse(req.body.skills || "[]");

    user.fullName = fullName;
    user.phone = phone;
    user.location = location;
    user.professionalTitle = professionalTitle;
    user.skills = skills;
    user.experienceLevel = experienceLevel;
    user.yearsOfExperience = Number(yearsOfExperience);
    user.hourlyRate = Number(hourlyRate);
    user.bio = bio;
    user.portfolio = portfolio;
    user.website = website;
    user.github = github;
    user.linkedin = linkedin;

    // ==========================================
    // Upload Freelancer Photo to Cloudinary
    // ==========================================

    if (req.file) {
      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "freelancing-marketplace/freelancers",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );

          stream.end(req.file.buffer);
        });

      const result = await uploadToCloudinary();

      user.profilePhoto = result.secure_url;
    }

    user.profileCompleted = true;

    await user.save();

    const userResponse = user.toObject();

    delete userResponse.password;

    return res.status(200).json({
      message: "Freelancer profile completed successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("COMPLETE FREELANCER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// const updateFreelancerPhoto = async (req, res) => {
//   try {
//     const { file } = req;
//     if (!file) {
//       return res.status(400).json({
//         success: false,
//         message: "Profile photo is required",
//       });
//     }

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     user.profilePhoto = file.path;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile photo updated successfully",
//       profilePhoto: user.profilePhoto,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

const updateFreelancerPhoto = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // Upload Freelancer Photo to Cloudinary
    // ==========================================

    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "freelancing-marketplace/freelancers",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        stream.end(file.buffer);
      });

    const result = await uploadToCloudinary();

    user.profilePhoto = result.secure_url;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    console.error("UPDATE FREELANCER PHOTO ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  me,
  register,
  login,
  resetPassword,
  forgotPassword,
  completeFreelancer,
  profileComplete,
  logout,
  updateFreelancerPhoto,
};
