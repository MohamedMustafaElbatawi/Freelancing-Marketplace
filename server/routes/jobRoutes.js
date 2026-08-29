const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createJob,
  getMyJobs,
  getJob,
  deleteJob,
  closeJob,
  reopenJob,
  updateJob,
  getProfile,
  putProfile,
  changePasswordInProfile,
  deleteProfilePhoto,
  deleteAccount,
  getAllJobs,
  getJobDetails,
} = require("../controllers/jobController");

// Create Job
router.post("/job/", authMiddleware, upload.array("attachments"), createJob);

// Get My Jobs
router.get("/job/myJobs", authMiddleware, getMyJobs);

// Get all published jobs - Freelancer
router.get("/jobs", authMiddleware, getAllJobs);

// get client profile    new --------------
router.get("/client/profile", authMiddleware, getProfile);

router.put(
  "/client/update/profile",
  authMiddleware,
  upload.single("profilePhoto"),
  putProfile,
);

// Find Jobs - Freelancer
router.get("/jobs/:id", authMiddleware, getJobDetails);

// Get Single Job
router.get("/job/:id", authMiddleware, getJob);

// Delete
router.delete("/job/:id", authMiddleware, deleteJob);

// Close
router.patch("/job/:id/close", authMiddleware, closeJob);

// Reopen
router.patch("/job/:id/reopen", authMiddleware, reopenJob);

// Update
router.put("/job/:id", authMiddleware, upload.array("attachments"), updateJob);

// change-password in profile
router.put("/client/change-password", authMiddleware, changePasswordInProfile);

// Delete
router.delete("/job/:id", authMiddleware, deleteJob);

// delete/profile/photo
router.delete("/client/profile/photo", authMiddleware, deleteProfilePhoto);
// delete/client/account
router.delete("/client/account", authMiddleware, deleteAccount);

module.exports = router;
