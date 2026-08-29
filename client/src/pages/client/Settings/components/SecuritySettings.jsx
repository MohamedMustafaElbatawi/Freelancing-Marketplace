import { useState } from "react";
import {
  LockKeyhole,
  ShieldCheck,
  Monitor,
  Smartphone,
  LogOut,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";

export default function SecuritySettings() {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirmation password do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `${SERVER_URL}/api/client/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);

      alert("Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to change password.");
    }
  };

  return (
    <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Security</h2>

        <p className="mt-1 text-sm text-gray-500">
          Protect your account and keep your personal information secure.
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Password */}
        <div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <LockKeyhole size={20} />
            </div>

            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900">Password</h3>

              <p className="text-sm text-gray-500 mt-1">
                Change your password regularly to keep your account secure.
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Last changed 3 months ago.
              </p>
            </div>
          </div>

          {!showPasswordForm ? (
            <button
              type="button"
              onClick={() => setShowPasswordForm(true)}
              className="mt-5 w-full cursor-pointer flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <LockKeyhole size={17} />
              Change Password
            </button>
          ) : (
            <form
              onSubmit={handlePasswordSubmit}
              className="mt-5 p-5 rounded-xl border border-gray-200 bg-gray-50 space-y-4"
            >
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Current Password
                </label>

                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your current password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  New Password
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Confirm New Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="px-5 cursor-pointer py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 cursor-pointer rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Two Factor Authentication */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Two-Factor Authentication
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add an extra layer of security to your account.
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle2
                    size={16}
                    className={
                      twoFactorEnabled ? "text-green-600" : "text-gray-400"
                    }
                  />

                  <span
                    className={`text-xs font-bold ${
                      twoFactorEnabled ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTwoFactorEnabled((prev) => !prev)}
              className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  twoFactorEnabled ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Monitor size={20} />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900">
                Active Sessions
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Manage the devices currently signed in to your account.
              </p>
            </div>
          </div>

          {/* Current Device */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <Monitor size={19} className="text-gray-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">Windows PC</p>

                <p className="text-xs text-gray-500 mt-1">
                  Chrome · Cairo, Egypt
                </p>
              </div>
            </div>

            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Current
            </span>
          </div>

          {/* Mobile Device */}
          <div className="flex items-center justify-between gap-4 p-4 mt-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                <Smartphone size={19} className="text-gray-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">Mobile Device</p>

                <p className="text-xs text-gray-500 mt-1">
                  Last active 2 hours ago
                </p>
              </div>
            </div>

            <button
              type="button"
              className="text-gray-400 hover:text-gray-700 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => console.log("Logout all devices")}
            className="mt-4 cursor-pointer flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition"
          >
            <LogOut size={17} />
            Log out of all other devices
          </button>
        </div>
      </div>
    </section>
  );
}
