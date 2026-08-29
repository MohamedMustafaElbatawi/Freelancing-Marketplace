import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/dashboard/client/ClientSidebar";
import Topbar from "@/components/dashboard/Topbar";
import { X } from "lucide-react";
export default function ClientLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className=" min-h-screen flex items-stretch bg-gray-100">
      {/* Sidebar */}
      {/* {open && ( */}
      <aside className="hidden lg:block lg:w-[300px] shrink-0 transition-all duration-300">
        <Sidebar />
      </aside>
      {/* )} */}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-100 bg-black/50 lg:hidden transition-opacity duration-300
    ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      >
        <div
          // onClick={(e) => e.stopPropagation()}
          className={`w-[300px] h-full bg-white transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <X size={24} />
          </button>
          <Sidebar />
        </div>
      </div>

      {/* باقي الصفحة */}
      <div className="flex-1 flex flex-col">
        <Topbar setOpen={setOpen} open={open} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
