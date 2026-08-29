import React, { useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  MessageCircle,
  FileText,
  BriefcaseBusiness,
  DollarSign,
  X,
  Check,
  Trash2,
  Settings,
} from "lucide-react";

function NotificationsFreelancer() {
  // =====================================================
  // Demo Notifications
  // =====================================================

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "proposal",
      title: "Proposal Submitted",
      message:
        "Your proposal for React Frontend Developer has been submitted successfully.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "You received a new message from Mohamed Hassan.",
      time: "25 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "job",
      title: "New Job Match",
      message: "A new job matching your React and Node.js skills is available.",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "success",
      title: "Proposal Accepted",
      message: "Your proposal has been accepted by the client.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "payment",
      title: "Payment Update",
      message: "Your project payment has been added to your pending balance.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("all");

  // =====================================================
  // Filter
  // =====================================================

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((notification) => !notification.read);
    }

    if (filter === "read") {
      return notifications.filter((notification) => notification.read);
    }

    return notifications;
  }, [notifications, filter]);

  // =====================================================
  // Unread Count
  // =====================================================

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  // =====================================================
  // Icon
  // =====================================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageCircle size={20} />;

      case "proposal":
        return <FileText size={20} />;

      case "job":
        return <BriefcaseBusiness size={20} />;

      case "success":
        return <CheckCircle2 size={20} />;

      case "payment":
        return <DollarSign size={20} />;

      default:
        return <Bell size={20} />;
    }
  };

  // =====================================================
  // Mark One As Read
  // =====================================================

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  };

  // =====================================================
  // Mark All As Read
  // =====================================================

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  // =====================================================
  // Delete One
  // =====================================================

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id),
    );
  };

  // =====================================================
  // Clear All
  // =====================================================

  const clearAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?",
    );

    if (!confirmed) {
      return;
    }

    setNotifications([]);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4 dark:bg-slate-950 md:p-6">
      <div className="mx-auto max-w-5xl">
        {/* =================================================
            Header
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Bell size={24} />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Notifications
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Stay updated with your freelancer activity.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                <Check size={16} />
                Mark all as read
              </button>
            )}

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <Trash2 size={16} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* =================================================
            Filters
        ================================================= */}

        <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setFilter("read")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              filter === "read"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            }`}
          >
            Read
          </button>
        </div>

        {/* =================================================
            Notifications
        ================================================= */}

        {filteredNotifications.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500">
              <Bell size={30} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              No notifications
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              You're all caught up.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`relative flex gap-4 p-5 transition hover:bg-gray-50 dark:hover:bg-slate-800/50 ${
                  index !== filteredNotifications.length - 1
                    ? "border-b border-gray-100 dark:border-slate-800"
                    : ""
                } ${
                  !notification.read
                    ? "bg-blue-50/40 dark:bg-blue-500/[0.03]"
                    : ""
                }`}
              >
                {/* Unread indicator */}

                {!notification.read && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
                )}

                {/* Icon */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3
                      className={`font-semibold ${
                        notification.read
                          ? "text-gray-800 dark:text-gray-200"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {notification.title}
                    </h3>

                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>

                  {/* Actions */}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {!notification.read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                      >
                        <Check size={14} />
                        Mark as read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteNotification(notification.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    >
                      <X size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            Notification Settings
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                <Settings size={19} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Notification Preferences
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage how you receive updates about your work.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
            >
              Manage Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsFreelancer;
