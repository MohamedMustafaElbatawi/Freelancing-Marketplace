const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

// Get all notifications
router.get("/", authMiddleware, getNotifications);

// Mark all notifications as read
router.patch("/read-all", authMiddleware, markAllAsRead);

// Mark one notification as read
router.patch("/:id/read", authMiddleware, markAsRead);

// Delete one notification
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;
