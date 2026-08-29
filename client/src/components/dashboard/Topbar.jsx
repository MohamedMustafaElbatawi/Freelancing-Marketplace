import { Bell, CircleHelp, Menu, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Topbar({ setOpen }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="h-16 flex items-center justify-between px-4 lg:px-8 shadow-md">
        {/* Left */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <nav className="">
            <button
              className="p-2 rounded hover:bg-gray-100 cursor-pointer lg:hidden transition-opacity duration-300 "
              onClick={() => setOpen((prev) => !prev)}
            >
              <Menu size={24} />
            </button>
          </nav>

          {/* Search */}
          {/* <div className="flex items-center  gap-3 w-[150px] px-4 py-2 md:w-[420px]  border rounded-xl  ">
            <Search size={18} className="text-gray-400 " id="search" />

            <input
              type="text"
              id="search"
              placeholder="Search talent, jobs"
              className="outline-none flex-1 flex items-center w-full"
            />
          </div> */}

          <p>EliteLancer == logo</p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3 ">
          <button className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-blue-700">
            <Plus size={18} />
            <span  onClick={() => navigate("/client/post-job")} >Post Job</span>
          </button>

          <button className="    w-10 h-10 rounded-full hover:bg-gray-100 flex justify-center items-center cursor-pointer">
            <Bell size={20} />
          </button>

          <button className="   hidden sm:flex w-10 h-10 rounded-full hover:bg-gray-100 flex justify-center items-center cursor-pointer">
            <CircleHelp size={20} />
          </button>

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt=""
            className="w-11 h-11 rounded-full object-cover border cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
