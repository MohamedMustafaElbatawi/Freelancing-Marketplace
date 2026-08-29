const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  me,
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  profileComplete,
  completeFreelancer,
  updateFreelancerPhoto,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.patch(
  "/profile/complete",
  authMiddleware,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "companyLogo", maxCount: 1 },
  ]),
  profileComplete,
);
router.patch(
  "/profile/complete-freelancer",
  authMiddleware,
  upload.single("profilePhoto"),
  completeFreelancer,
);
router.patch(
  "/profile/freelancer-photo",
  authMiddleware,
  upload.single("profilePhoto"),
  updateFreelancerPhoto,
);

router.get("/me", authMiddleware, me);

module.exports = router;
