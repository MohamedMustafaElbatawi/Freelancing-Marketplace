const Notification = require("../models/Notification");

const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  relatedJob = null,
  relatedProposal = null,
}) => {
  try {
    const notification = await Notification.create({
      recipient,
      sender,
      type,
      title,
      message,
      relatedJob,
      relatedProposal,
    });

    return notification;
  } catch (error) {
    console.error("Create notification error:", error);

    return null;
  }
};

module.exports = createNotification;
