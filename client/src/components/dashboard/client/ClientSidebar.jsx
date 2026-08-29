import { NavLink, useNavigate } from "react-router-dom";
import { sidebarLinks, bottomLinks } from "../../../data/dashboardData";
import axios from "axios";

export default function ClientSidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <aside className="flex flex-col justify-between h-full min-h-screen border-r bg-white shadow-sm">
      {" "}
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">EliteLancer</h1>

        <p className="text-sm text-gray-500">Client Portal</p>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition

                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
      {/* Bottom */}
      <div className=" border-t p-4 space-y-2">
        {bottomLinks.map((item) => {
          const Icon = item.icon;

          if (item.type === "logout") {
            return (
              <button
                key={item.title}
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-red-600"
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-gray-100"
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
