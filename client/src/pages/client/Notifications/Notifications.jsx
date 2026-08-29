import React, { useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  Settings,
  Mail,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  MessageCircle,
  FileText,
  MoreVertical,
  X,
} from "lucide-react";

/* =========================================================
   Notifications Data
========================================================= */

const initialNotifications = [
  {
    id: 1,
    title: "Sarah Jenkins sent a new proposal",
    description:
      "I've updated the project scope based on our last meeting. Let me know if the new timeline works for your team.",
    time: "2 min ago",
    group: "Today",
    type: "proposal",
    unread: true,
    icon: Mail,
  },

  {
    id: 2,
    title: "Payment Verified",
    description:
      "The escrow payment for Mobile App Redesign has been successfully verified and released to the contractor.",
    time: "4 hours ago",
    group: "Today",
    type: "success",
    unread: true,
    icon: CheckCircle2,
  },

  {
    id: 3,
    title: "Project Milestone Delayed",
    description:
      "Alex Rivera requested a 48-hour extension on the Wireframe Delivery milestone due to technical constraints.",
    time: "6 hours ago",
    group: "Today",
    type: "warning",
    unread: false,
    icon: AlertTriangle,
  },

  {
    id: 4,
    title: "New Applicant for SEO Specialist",
    description:
      "Marcus Thorne just applied to your open job post. He has 8+ years of experience in your niche.",
    time: "Yesterday, 2:45 PM",
    group: "Yesterday",
    type: "applicant",
    unread: false,
    icon: UserPlus,
  },

  {
    id: 5,
    title: "New Message",
    description:
      "You have a new message from the Branding Agency team regarding the final asset review.",
    time: "Yesterday, 10:00 AM",
    group: "Yesterday",
    type: "message",
    unread: false,
    icon: MessageCircle,
  },

  {
    id: 6,
    title: "Weekly Report Available",
    description:
      "Your weekly spend and project progress report is now available for download.",
    time: "Oct 12, 2023",
    group: "Earlier",
    type: "report",
    unread: false,
    icon: FileText,
  },
];

/* =========================================================
   Notification Style
========================================================= */

const notificationStyles = {
  proposal: {
    iconWrapper: "bg-primary/10",
    iconColor: "text-primary",
  },

  success: {
    iconWrapper: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },

  warning: {
    iconWrapper: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },

  applicant: {
    iconWrapper: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },

  message: {
    iconWrapper: "bg-sky-500/10",
    iconColor: "text-sky-600",
  },

  report: {
    iconWrapper: "bg-slate-500/10",
    iconColor: "text-slate-600",
  },
};

/* =========================================================
   Notification Item
========================================================= */

function NotificationItem({ notification, onRead, onDismiss }) {
  const Icon = notification.icon;
  const style = notificationStyles[notification.type];

  return (
    <div
      onClick={() => onRead(notification.id)}
      className={`
        relative flex gap-4 p-5 sm:p-6
        cursor-pointer
        transition-all duration-200
        hover:bg-surface-container-low
        ${
          notification.unread
            ? "bg-primary/[0.025]"
            : "bg-surface-container-lowest"
        }
      `}
    >
      {/* Unread Indicator */}
      {notification.unread && (
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
      )}

      {/* Icon */}
      <div
        className={`
          w-11 h-11 sm:w-12 sm:h-12
          rounded-xl
          flex items-center justify-center
          shrink-0
          ${style.iconWrapper}
        `}
      >
        <Icon size={20} strokeWidth={2} className={style.iconColor} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4
              className={`
                text-sm sm:text-[15px]
                leading-5
                truncate
                ${
                  notification.unread
                    ? "font-semibold text-on-surface"
                    : "font-medium text-on-surface"
                }
              `}
            >
              {notification.title}
            </h4>

            <p className="mt-1.5 text-sm leading-6 text-on-surface-variant max-w-3xl">
              {notification.description}
            </p>
          </div>

          {/* Dismiss */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDismiss(notification.id);
            }}
            className="
              p-1.5
              rounded-lg
              text-on-surface-variant
              hover:text-on-surface
              hover:bg-surface-container-high
              transition-colors
              shrink-0
            "
            aria-label="Dismiss notification"
          >
            <X size={17} />
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="text-xs text-on-surface-variant">
            {notification.time}
          </span>

          {notification.unread && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Unread
            </span>
          )}

          {notification.type === "proposal" && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                console.log("View proposal:", notification.id);
              }}
              className="
                text-xs
                font-semibold
                text-primary
                hover:underline
              "
            >
              View proposal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Notification Group
========================================================= */

function NotificationGroup({ title, notifications, onRead, onDismiss }) {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <section>
      {/* Group Header */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
          {title}
        </h2>

        <div className="h-px flex-1 bg-outline-variant/40" />
      </div>

      {/* Group Container */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-outline-variant
          bg-surface-container-lowest
          divide-y divide-outline-variant/30
          shadow-sm
        "
      >
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRead={onRead}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   Main Component
========================================================= */

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const [activeTab, setActiveTab] = useState("all");

  /* =======================================================
     Unread Count
  ======================================================= */

  const unreadCount = useMemo(() => {
    return notifications.filter((notification) => notification.unread).length;
  }, [notifications]);

  /* =======================================================
     Filter Notifications
  ======================================================= */

  const filteredNotifications = useMemo(() => {
    if (activeTab === "unread") {
      return notifications.filter((notification) => notification.unread);
    }

    return notifications;
  }, [notifications, activeTab]);

  /* =======================================================
     Group Notifications
  ======================================================= */

  const todayNotifications = filteredNotifications.filter(
    (notification) => notification.group === "Today",
  );

  const yesterdayNotifications = filteredNotifications.filter(
    (notification) => notification.group === "Yesterday",
  );

  const earlierNotifications = filteredNotifications.filter(
    (notification) => notification.group === "Earlier",
  );

  /* =======================================================
     Mark Single Notification As Read
  ======================================================= */

  const handleRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification,
      ),
    );
  };

  /* =======================================================
     Mark All As Read
  ======================================================= */

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  /* =======================================================
     Dismiss Notification
  ======================================================= */

  const handleDismiss = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  /* =======================================================
     Settings
  ======================================================= */

  const handleSettings = () => {
    console.log("Open notification settings");
  };

  /* =======================================================
     Load More
  ======================================================= */

  const handleLoadMore = () => {
    console.log("Load more notifications");
  };

  /* =======================================================
     Render
  ======================================================= */

  return (
    <div className="w-full">
      {/* =====================================================
          Header
      ===================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        {/* Title */}
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                w-11 h-11
                rounded-xl
                bg-primary/10
                flex items-center justify-center
                shrink-0
              "
            >
              <Bell size={22} className="text-primary" strokeWidth={2} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-on-surface">
                  Notifications
                </h1>

                {unreadCount > 0 && (
                  <span
                    className="
                      min-w-6 h-6 px-2
                      rounded-full
                      bg-primary
                      text-on-primary
                      text-xs
                      font-bold
                      flex items-center justify-center
                    "
                  >
                    {unreadCount}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-on-surface-variant">
                Stay updated with your projects and team interactions.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="
                inline-flex items-center gap-2
                px-4 py-2.5
                rounded-xl
                text-sm font-semibold
                text-primary
                hover:bg-primary/10
                transition-colors
              "
            >
              <CheckCheck size={18} />
              <span>Mark all as read</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSettings}
            className="
              inline-flex items-center gap-2
              px-4 py-2.5
              rounded-xl
              border border-outline-variant
              bg-surface-container-lowest
              text-sm font-medium
              text-on-surface-variant
              hover:bg-surface-container-high
              hover:text-on-surface
              transition-colors
            "
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          Notification Content
      ===================================================== */}

      <div
        className="
          rounded-2xl
          border border-outline-variant
          bg-surface-container-low
          p-2 sm:p-3
        "
      >
        {/* ===================================================
            Tabs
        =================================================== */}

        <div className="flex items-center gap-1 p-1 mb-3">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`
              px-4 py-2
              rounded-lg
              text-sm font-semibold
              transition-all
              ${
                activeTab === "all"
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }
            `}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("unread")}
            className={`
              inline-flex items-center gap-2
              px-4 py-2
              rounded-lg
              text-sm font-semibold
              transition-all
              ${
                activeTab === "unread"
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }
            `}
          >
            Unread
            {unreadCount > 0 && (
              <span className="text-xs text-primary">{unreadCount}</span>
            )}
          </button>
        </div>

        {/* ===================================================
            Groups
        =================================================== */}

        <div className="space-y-7">
          <NotificationGroup
            title="Today"
            notifications={todayNotifications}
            onRead={handleRead}
            onDismiss={handleDismiss}
          />

          <NotificationGroup
            title="Yesterday"
            notifications={yesterdayNotifications}
            onRead={handleRead}
            onDismiss={handleDismiss}
          />

          <NotificationGroup
            title="Earlier"
            notifications={earlierNotifications}
            onRead={handleRead}
            onDismiss={handleDismiss}
          />
        </div>

        {/* ===================================================
            Empty State
        =================================================== */}

        {filteredNotifications.length === 0 && (
          <div className="py-16 px-6 text-center">
            <div
              className="
                w-14 h-14
                mx-auto
                rounded-full
                bg-primary/10
                flex items-center justify-center
              "
            >
              <Bell size={25} className="text-primary" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-on-surface">
              {activeTab === "unread"
                ? "You're all caught up"
                : "No notifications yet"}
            </h3>

            <p className="mt-1 max-w-sm mx-auto text-sm text-on-surface-variant">
              {activeTab === "unread"
                ? "There are no unread notifications right now."
                : "When something important happens, you'll see it here."}
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          Footer
      ===================================================== */}

      {filteredNotifications.length > 0 && (
        <div className="flex flex-col items-center mt-7">
          <p className="text-xs text-on-surface-variant">
            Showing notifications from the past 30 days.
          </p>

          <button
            type="button"
            onClick={handleLoadMore}
            className="
              mt-3
              px-5 py-2.5
              rounded-xl
              border border-outline-variant
              bg-surface-container-lowest
              text-sm font-semibold
              text-primary
              hover:bg-primary
              hover:text-on-primary
              transition-all
            "
          >
            Load more activity
          </button>
        </div>
      )}
    </div>
  );
}

export default Notifications;
