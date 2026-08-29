import React, { useEffect, useState } from "react";
import { Bell, CircleHelp, Menu, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";
const SERVER_URL =
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";

export default function TopbarFreelancer({ setOpen }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // =====================================================
  // Get Current Freelancer
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const getFreelancer = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          withCredentials: true,
        });

        if (!mounted) return;

        const currentUser = response.data?.user;

        if (currentUser?.role !== "freelancer") {
          console.error("Current user is not a freelancer");
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("GET FREELANCER TOPBAR USER ERROR:", error);
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    };

    getFreelancer();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // Profile Image
  // =====================================================

  const getProfileImage = () => {
    if (!user?.profilePhoto) return null;

    if (user.profilePhoto.startsWith("http")) {
      return user.profilePhoto;
    }

    return `${SERVER_URL}/${user.profilePhoto
      .replaceAll("\\", "/")
      .replace(/^\/+/, "")}`;
  };

  const profileImage = getProfileImage();

  // =====================================================
  // Navigation
  // =====================================================

  const goToMessages = () => {
    navigate("/freelancer/messages");
  };

  const goToNotifications = () => {
    navigate("/freelancer/notifications");
  };

  const goToProfile = () => {
    navigate("/freelancer/profile");
  };

  const goToJobs = () => {
    navigate("/freelancer/jobs");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4 shadow-sm lg:px-8">
        {/* =================================================
            Left
        ================================================= */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}

          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}

          <button
            type="button"
            onClick={() => navigate("/freelancer/dashboard")}
            className=" cursor-pointer text-left text-lg font-bold text-gray-900 dark:text-white"
          >
            <span className="text-blue-600 dark:text-blue-400">Elite</span>
            Lancer
          </button>

          {/* Search */}

          <button
            type="button"
            onClick={goToJobs}
            className="cursor-pointer ml-2 hidden items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-500 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 md:flex"
          >
            <Search size={17} />
            <span>Find jobs</span>
          </button>
        </div>

        {/* =================================================
            Right
        ================================================= */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Find Jobs */}

          <button
            type="button"
            onClick={goToJobs}
            className=" cursor-pointer hidden rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800 lg:block"
          >
            Find Jobs
          </button>

          {/* Messages */}

          <button
            type="button"
            onClick={goToMessages}
            className="cursor-pointer relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            aria-label="Messages"
            title="Messages"
          >
            <CircleHelp className="hidden" size={20} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
          </button>

          {/* Notifications */}

          <button
            type="button"
            onClick={goToNotifications}
            className=" cursor-pointer relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={20} />
          </button>

          {/* Help */}

          <button
            type="button"
            className="cursor-pointer hidden h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 sm:flex"
            aria-label="Help"
            title="Help"
          >
            <CircleHelp size={20} />
          </button>

          {/* Profile */}

          <button
            type="button"
            onClick={goToProfile}
            className="cursor-pointer flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            title="My Profile"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300">
              {!loadingUser && profileImage ? (
                <img
                  src={profileImage}
                  alt={user?.fullName || "Freelancer"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={19} />
              )}
            </div>

            <div className="hidden min-w-0 text-left xl:block">
              <p className="max-w-[130px] truncate text-sm font-semibold text-gray-900 dark:text-white">
                {user?.fullName || "Freelancer"}
              </p>

              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {user?.professionalTitle || "Freelancer"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
