import { useState } from "react";
import {
  Mail,
  Bell,
  BriefcaseBusiness,
  MessageSquare,
  FileText,
  Megaphone,
} from "lucide-react";

const notificationItems = [
  {
    id: "emailNotifications",
    title: "Email Notifications",
    description: "Receive important updates and daily activity summaries.",
    icon: Mail,
  },
  {
    id: "pushNotifications",
    title: "Push Notifications",
    description: "Get instant alerts directly on your device.",
    icon: Bell,
  },
  {
    id: "jobApplications",
    title: "Job Applications",
    description: "Notify me when a freelancer applies to my job.",
    icon: BriefcaseBusiness,
  },
  {
    id: "messages",
    title: "Messages",
    description: "Get notified when you receive a new message.",
    icon: MessageSquare,
  },
  {
    id: "proposalUpdates",
    title: "Proposal Updates",
    description: "Receive updates about proposals and their status.",
    icon: FileText,
  },
  {
    id: "marketingEmails",
    title: "Marketing Emails",
    description: "Receive tips, product updates, and special offers.",
    icon: Megaphone,
  },
];

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    jobApplications: true,
    messages: true,
    proposalUpdates: true,
    marketingEmails: false,
  });

  const toggleNotification = (id) => {
    setNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    console.log("Notification Settings:", notifications);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>

        <p className="mt-1 text-sm text-gray-500">
          Control how and when you receive notifications from EliteLancer.
        </p>
      </div>

      <div className="p-6">
        {/* Notification List */}
        <div className="divide-y divide-gray-200">
          {notificationItems.map((item) => {
            const Icon = item.icon;
            const enabled = notifications[item.id];

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0"
              >
                {/* Left Side */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      enabled
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-1 max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  onClick={() => toggleNotification(item.id)}
                  className={`relative w-12 h-6 rounded-full shrink-0 transition-colors ${
                    enabled ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      enabled ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
          <div className="flex items-start gap-3">
            <Bell size={18} className="text-blue-600 mt-0.5 shrink-0" />

            <div>
              <p className="text-sm font-bold text-blue-900">
                Notification preferences
              </p>

              <p className="text-sm text-blue-700 mt-1">
                You will always receive essential security and account
                notifications even if other notifications are disabled.
              </p>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSave}
            className="px-7 cursor-pointer  py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </section>
  );
}
