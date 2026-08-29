import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Lock,
  Bell,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Camera,
  Check,
} from "lucide-react";

const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

const API_URL = `${URL_SERVER}/api`;

function SettingsFreelancer() {
  const [activeSection, setActiveSection] = useState("account");

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const [notifications, setNotifications] = useState(true);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // Get Current Freelancer
  // =====================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
        });

        setUser(response.data?.user || null);
      } catch (error) {
        console.error("GET CURRENT USER ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // =====================================================
  // Dark Mode
  // =====================================================

  const toggleDarkMode = () => {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    document.documentElement.classList.toggle("dark", nextMode);

    localStorage.setItem("freelancer-dark-mode", String(nextMode));
  };

  // =====================================================
  // Notifications
  // =====================================================

  const toggleNotifications = () => {
    const nextValue = !notifications;

    setNotifications(nextValue);

    localStorage.setItem("freelancer-notifications", String(nextValue));
  };

  // =====================================================
  // Logout
  // =====================================================

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      window.location.href = "/login";
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      window.location.href = "/login";
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4 dark:bg-slate-950 md:p-6">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-gray-200 dark:bg-slate-800" />

          <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
            <div className="h-96 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />

            <div className="h-[500px] animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // Menu
  // =====================================================

  const menu = [
    {
      id: "account",
      title: "Account",
      description: "Manage your account information",
      icon: User,
    },
    {
      id: "profile",
      title: "Profile",
      description: "Manage your professional profile",
      icon: BriefcaseBusiness,
    },
    {
      id: "security",
      title: "Security",
      description: "Password and account security",
      icon: ShieldCheck,
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Customize your experience",
      icon: Bell,
    },
  ];

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4 dark:bg-slate-950 md:p-6">
      <div className="mx-auto max-w-6xl">
        {/* =================================================
            Header
        ================================================= */}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Settings
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your freelancer account and preferences.
          </p>
        </div>

        {/* =================================================
            Layout
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* =================================================
              Sidebar
          ================================================= */}

          <aside className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center gap-3 border-b border-gray-100 px-3 pb-4 dark:border-slate-800">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                {user?.profilePhoto ? (
                  <img
                    src={`${API_URL.replace("/api", "")}/${user.profilePhoto
                      .replaceAll("\\", "/")
                      .replace(/^\/+/, "")}`}
                    alt={user?.fullName || "Freelancer"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={21} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900 dark:text-white">
                  {user?.fullName || "Freelancer"}
                </p>

                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {user?.professionalTitle || "Freelancer"}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {menu.map((item) => {
                const Icon = item.icon;

                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`cursor-pointer flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                      active
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon size={19} />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.title}</p>

                      <p className="mt-0.5 hidden text-[11px] opacity-70 xl:block">
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </nav>

            {/* Logout */}

            <div className="mt-3 border-t border-gray-100 pt-3 dark:border-slate-800">
              <button
                type="button"
                onClick={handleLogout}
                className=" cursor-pointer flex w-full items-center gap-3 rounded-xl p-3 text-left text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <LogOut size={19} />

                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </aside>

          {/* =================================================
              Content
          ================================================= */}

          <main className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Account */}

            {activeSection === "account" && (
              <section>
                <SectionHeader
                  title="Account Information"
                  description="View your basic account information."
                />

                <div className="grid gap-5 p-5 md:grid-cols-2 md:p-6">
                  <InfoField
                    icon={<User size={17} />}
                    label="Full Name"
                    value={user?.fullName || "Not provided"}
                  />

                  <InfoField
                    icon={<Mail size={17} />}
                    label="Email"
                    value={user?.email || "Not provided"}
                  />

                  <InfoField
                    icon={<User size={17} />}
                    label="Username"
                    value={user?.userName || "Not provided"}
                  />

                  <InfoField
                    icon={<Phone size={17} />}
                    label="Phone"
                    value={user?.phone || "Not provided"}
                  />

                  <InfoField
                    icon={<MapPin size={17} />}
                    label="Location"
                    value={user?.location || "Not provided"}
                  />

                  <InfoField
                    icon={<BriefcaseBusiness size={17} />}
                    label="Role"
                    value="Freelancer"
                  />
                </div>
              </section>
            )}

            {/* Profile */}

            {activeSection === "profile" && (
              <section>
                <SectionHeader
                  title="Professional Profile"
                  description="Your public freelancer profile information."
                />

                <div className="space-y-5 p-5 md:p-6">
                  <div className="flex flex-col items-start gap-4 rounded-2xl border border-gray-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      {user?.profilePhoto ? (
                        <img
                          src={`${API_URL.replace(
                            "/api",
                            "",
                          )}/${user.profilePhoto
                            .replaceAll("\\", "/")
                            .replace(/^\/+/, "")}`}
                          alt={user?.fullName || "Freelancer"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User size={28} />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Profile Photo
                      </h3>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        This is the photo displayed on your freelancer profile.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                      onClick={() =>
                        alert(
                          "Profile photo editing can be connected to your existing profile upload.",
                        )
                      }
                    >
                      <Camera size={17} />
                      Change
                    </button>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <InfoField
                      icon={<BriefcaseBusiness size={17} />}
                      label="Professional Title"
                      value={user?.professionalTitle || "Not provided"}
                    />

                    <InfoField
                      icon={<BriefcaseBusiness size={17} />}
                      label="Experience Level"
                      value={user?.experienceLevel || "Not provided"}
                    />

                    <InfoField
                      icon={<BriefcaseBusiness size={17} />}
                      label="Years of Experience"
                      value={`${user?.yearsOfExperience ?? 0} years`}
                    />

                    <InfoField
                      icon={<DollarSignIcon />}
                      label="Hourly Rate"
                      value={`${user?.hourlyRate ?? 0} / hour`}
                    />
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5 dark:bg-slate-800/50">
                    <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                      Bio
                    </p>

                    <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {user?.bio || "No bio has been added yet."}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Security */}

            {activeSection === "security" && (
              <section>
                <SectionHeader
                  title="Security"
                  description="Keep your account secure."
                />

                <div className="space-y-4 p-5 md:p-6">
                  <SettingRow
                    icon={<Lock size={19} />}
                    title="Password"
                    description="Change your account password."
                    action={
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            "Use the existing Forgot Password / Reset Password flow to change your password.",
                          )
                        }
                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                      >
                        Change
                      </button>
                    }
                  />

                  <SettingRow
                    icon={<ShieldCheck size={19} />}
                    title="Account Status"
                    description="Your freelancer account is active."
                    action={
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                        <Check size={14} />
                        Active
                      </span>
                    }
                  />
                </div>
              </section>
            )}

            {/* Preferences */}

            {activeSection === "preferences" && (
              <section>
                <SectionHeader
                  title="Preferences"
                  description="Customize how your freelancer dashboard behaves."
                />

                <div className="space-y-4 p-5 md:p-6">
                  <SettingRow
                    icon={
                      notifications ? <Bell size={19} /> : <Bell size={19} />
                    }
                    title="Notifications"
                    description="Receive notifications about proposals, messages, and projects."
                    action={
                      <Toggle
                        enabled={notifications}
                        onClick={toggleNotifications}
                      />
                    }
                  />

                  <SettingRow
                    icon={darkMode ? <Moon size={19} /> : <Sun size={19} />}
                    title="Dark Mode"
                    description="Switch between light and dark appearance."
                    action={
                      <Toggle enabled={darkMode} onClick={toggleDarkMode} />
                    }
                  />
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// Section Header
// =====================================================

function SectionHeader({ title, description }) {
  return (
    <div className="border-b border-gray-200 px-5 py-5 dark:border-slate-800 md:px-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

// =====================================================
// Info Field
// =====================================================

function InfoField({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 dark:border-slate-800">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 break-words font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

// =====================================================
// Setting Row
// =====================================================

function SettingRow({ icon, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 sm:flex-row sm:items-center dark:border-slate-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div>{action}</div>
    </div>
  );
}

// =====================================================
// Toggle
// =====================================================

function Toggle({ enabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle setting"
      className={`relative h-7 w-12 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

// =====================================================
// Dollar Icon
// =====================================================

function DollarSignIcon() {
  return <span className="text-lg font-bold">$</span>;
}

export default SettingsFreelancer;
