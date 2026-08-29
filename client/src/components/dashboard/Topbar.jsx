import { Bell, CircleHelp, Menu, Plus, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Topbar({ setOpen }) {
  const navigate = useNavigate();

  const SERVER_URL =
    import.meta.env.VITE_APP_SERVER_URL ;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/auth/me`, {
          withCredentials: true,
        });

        setUser(response.data?.user || null);
      } catch (error) {
        console.error("GET CLIENT TOPBAR USER ERROR:", error);
      }
    };

    fetchUser();
  }, [SERVER_URL]);

  const getProfileImage = () => {
    if (!user?.profilePhoto) {
      return null;
    }

    // Cloudinary URL
    if (
      user.profilePhoto.startsWith("http://") ||
      user.profilePhoto.startsWith("https://")
    ) {
      return user.profilePhoto;
    }

    // Old local image path
    return `${SERVER_URL}/${user.profilePhoto
      .replaceAll("\\", "/")
      .replace(/^\/+/, "")}`;
  };

  const profileImage = getProfileImage();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4 shadow-md lg:px-8">
        {/* Left */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}

          <button
            type="button"
            className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden dark:hover:bg-slate-800"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}

          <button
            type="button"
            onClick={() => navigate("/client/dashboard")}
            className="text-left text-lg font-bold text-gray-900 dark:text-white"
          >
            <span className="text-blue-600 dark:text-blue-400">Elite</span>
            Lancer
          </button>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Post Job */}

          <button
            type="button"
            onClick={() => navigate("/client/post-job")}
            className=" cursor-pointer hidden items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 sm:flex"
          >
            <Plus size={18} />
            <span>Post Job</span>
          </button>

          {/* Notifications */}

          <button
            type="button"
            onClick={() => navigate("/client/notifications")}
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          {/* Help */}

          <button
            type="button"
            className=" cursor-pointer hidden h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 sm:flex"
            title="Help"
            aria-label="Help"
          >
            <CircleHelp size={20} />
          </button>

          {/* Profile */}

          <button
            type="button"
            onClick={() => navigate("/client/settings")}
            className=" cursor-pointer flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 transition hover:ring-2 hover:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
            title="My Profile"
            aria-label="My Profile"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt={user?.fullName || "Client"}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={21} className="text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
