const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.post("/", authMiddleware, upload.single("image"), createProject);
router.get("/", authMiddleware, getProject);
router.put("/:id", authMiddleware, upload.single("image"), updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
