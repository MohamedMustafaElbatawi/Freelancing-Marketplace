import { useEffect, useState } from "react";
import {
  UserRound,
  ShieldCheck,
  Globe,
  Clock3,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

export default function AccountSettings() {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    language: "English",
    timezone: "Africa/Cairo",
  });

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Account Settings:", formData);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`${SERVER_URL}/api/client/account`, {
        withCredentials: true,
      });

      console.log(response.data);

      // بعد نجاح الحذف
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchAccountSettings = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/client/profile`, {
          withCredentials: true,
        });

        setFormData({
          fullName: response.data.user.fullName || "",
          role: response.data.user.role || "Client",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountSettings();
  }, []);

  return (
    <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 space-y-8">
        {/* Account Information */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserRound size={20} />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900">
                Account Information
              </h3>

              <p className="text-sm text-gray-500">
                Basic information about your EliteLancer account.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-900"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="text-xs text-gray-500">
                This is how other users can identify you.
              </p>
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label
                htmlFor="accountType"
                className="block text-sm font-semibold text-gray-900"
              >
                Account Type
              </label>

              <select
                id="accountType"
                name="accountType"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Client">Client</option>
                {/* <option value="Freelancer">Freelancer</option> */}
              </select>

              <p className="text-xs text-gray-500">
                Your account type determines the features available to you.
              </p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Globe size={20} />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900">Preferences</h3>

              <p className="text-sm text-gray-500">
                Customize your language and regional settings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language */}
            <div className="space-y-2">
              <label
                htmlFor="language"
                className="block text-sm font-semibold text-gray-900"
              >
                Language
              </label>

              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>

            {/* Timezone */}
            <div className="space-y-2">
              <label
                htmlFor="timezone"
                className="block text-sm font-semibold text-gray-900"
              >
                Time Zone
              </label>

              <div className="relative">
                <Clock3
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Africa/Cairo">Africa/Cairo (GMT+3)</option>

                  <option value="Europe/London">Europe/London</option>

                  <option value="Europe/Berlin">Europe/Berlin</option>

                  <option value="America/New_York">America/New_York</option>

                  <option value="Asia/Dubai">Asia/Dubai</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Account Verification */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Account Verification
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Your email address is verified and your account is secure.
                </p>
              </div>
            </div>

            <span className="shrink-0 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
              Verified
            </span>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-7 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="border-t border-red-200 bg-red-50/40 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Trash2 size={20} />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-red-700">Delete Account</h3>

            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>

            {!showDeleteWarning ? (
              <button
                type="button"
                onClick={() => setShowDeleteWarning(true)}
                className="mt-4 px-4 cursor-pointer py-2 rounded-lg border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-100 transition"
              >
                Delete My Account
              </button>
            ) : (
              <div className="mt-4 p-4 rounded-xl bg-white border border-red-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    size={20}
                    className="text-red-600 shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Are you absolutely sure?
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Your profile, projects, proposals, messages, and other
                      account data will be permanently deleted.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteWarning(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition cursor-pointer"
                  >
                    Yes, Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
