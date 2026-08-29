// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // console.log(user);
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/me`, {
//           withCredentials: true,
//         });

//         setUser(response.data.user);
//       } catch (error) {
//         console.log(error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUser();
//   }, []);

//   // if (loading) return <p>Loading...</p>;
//   // if (!user)  return <p>Loading...not found user</p>;

//   return (
//     <>
//       {/* <Sidebar /> */}

//       <div className="  ">
//         <h1 className="text-4xl font-bold">Client Dashboard</h1>
//       </div>
//     </>
//   );
// }
// {
//   /* <p className="text-gray-500 mt-2">Welcome {user?.fullName} 👋</p> */
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ClientDashboard = () => {
  const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const currentUserId = "6a69e102d6a113a4324cc2e0";
  // =========================
  // Dummy Data
  // =========================

  const stats = [
    {
      title: "Total Jobs",
      value: "12",
      change: "+12%",
      icon: "work",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      changeColor: "text-emerald-600",
    },
    {
      title: "Active Jobs",
      value: "4",
      change: "+8%",
      icon: "bolt",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      changeColor: "text-emerald-600",
    },
    {
      title: "Pending Proposals",
      value: "28",
      change: "+15%",
      icon: "description",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      changeColor: "text-emerald-600",
    },
    {
      title: "Completed Projects",
      value: "45",
      change: "+20%",
      icon: "check_circle",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      changeColor: "text-emerald-600",
    },
  ];

  const projects = [
    {
      title: "E-commerce Mobile App Redesign",
      freelancer: "Alex Rivera",
      role: "Senior UI/UX",
      progress: 75,
      deadline: "Due in 5 days",
      image: "https://i.pravatar.cc/150?img=12",
      tags: ["UI/UX Design", "Mobile App"],
    },
    {
      title: "Fintech Backend API Integration",
      freelancer: "Sarah Jenkins",
      role: "Node.js Architect",
      progress: 30,
      deadline: "Due in 12 days",
      image: "https://i.pravatar.cc/150?img=47",
      tags: ["Development", "Backend"],
    },
    {
      title: "Social Media Marketing Campaign",
      freelancer: "David Chen",
      role: "Growth Marketer",
      progress: 92,
      deadline: "Due in 2 days",
      image: "https://i.pravatar.cc/150?img=11",
      tags: ["Marketing", "SMM"],
    },
  ];

  const proposals = [
    {
      name: "Elena Moretti",
      rating: "4.9",
      category: "Logo & Branding",
      price: "$4,500",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Marcus Thorne",
      rating: "5.0",
      category: "Full-stack Dev",
      price: "$8,200",
      image: "https://i.pravatar.cc/150?img=68",
    },
  ];

  const messages = [
    {
      initials: "AR",
      name: "Alex Rivera",
      time: "2m ago",
      message: "I've uploaded the final wireframes for the checkout flow...",
      bg: "bg-violet-100",
      text: "text-violet-600",
      unread: true,
    },
    {
      initials: "SJ",
      name: "Sarah Jenkins",
      time: "1h ago",
      message:
        "The API testing is 90% complete. I'll have a report for you by...",
      bg: "bg-green-100",
      text: "text-green-600",
      unread: false,
    },
  ];

  // =========================
  // Component
  // =========================

  const fetchConversations = async () => {
    try {
      setLoadingMessages(true);

      const response = await fetch(`${URL_SERVER}/api/conversations`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Client Overview 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Welcome back, here is what's happening with your workspace.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
            Export Data
          </button>
        </div>

        {/* =========================================
            STATS
        ========================================= */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <span
                    className={`material-symbols-outlined ${stat.iconColor} text-2xl`}
                  >
                    {stat.icon}
                  </span>
                </div>

                <span
                  className={`rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold ${stat.changeColor}`}
                >
                  ↑ {stat.change}
                </span>
              </div>

              <p className="text-sm font-medium text-slate-500">{stat.title}</p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </h2>

              <p className="mt-1 text-xs text-slate-400">from last month</p>
            </div>
          ))}
        </div>

        {/* =========================================
            MAIN GRID
        ========================================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* =====================================
              LEFT SIDE   في انتظار الفريلانسر
          ===================================== */}

          <section className="xl:col-span-8">
            {/* ACTIVE PROJECTS */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Active Projects في انتظار الفريلانسر
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Track your current projects
                  </p>
                </div>

                <button className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                  View All
                </button>
              </div>

              {/* Projects */}

              <div className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className="group p-6 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                      {/* Freelancer */}

                      <div className="flex min-w-0 flex-1 items-center gap-4">
                        <img
                          src={project.image}
                          alt={project.freelancer}
                          className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-bold text-slate-900 md:text-base">
                            {project.title}
                          </h4>

                          <p className="mt-1 text-sm text-slate-500">
                            Freelancer:{" "}
                            <span className="font-medium text-slate-700">
                              {project.freelancer}
                            </span>{" "}
                            · {project.role}
                          </p>

                          {/* Tags */}

                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Progress */}

                      <div className="w-full lg:w-52">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500">
                            Progress
                          </span>

                          <span className="text-sm font-bold text-violet-600">
                            {project.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              project.progress >= 80
                                ? "bg-emerald-500"
                                : project.progress >= 50
                                  ? "bg-violet-600"
                                  : "bg-orange-500"
                            }`}
                            style={{
                              width: `${project.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Deadline */}

                      <div className="flex items-center gap-2 lg:w-28 lg:justify-end">
                        <span className="material-symbols-outlined text-[19px] text-slate-400">
                          calendar_today
                        </span>

                        <div>
                          <p className="text-[11px] text-slate-400">Deadline</p>

                          <p
                            className={`text-xs font-bold ${
                              project.deadline.includes("2 days")
                                ? "text-red-500"
                                : "text-slate-700"
                            }`}
                          >
                            {project.deadline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}

              <div className="border-t border-slate-200 px-6 py-4 text-center">
                <button className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-700">
                  View All Projects
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* =====================================
                QUICK ACTIONS   
            ===================================== */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Quick Actions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Quickly access your most used actions
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "Post a New Job",
                    icon: "add_circle",
                    bg: "bg-violet-100",
                    color: "text-violet-600",
                    path: "/client/post-job",
                  },
                  {
                    title: "Manage Jobs",
                    icon: "work",
                    bg: "bg-green-100",
                    color: "text-green-600",
                    path: "/client/jobs",
                  },
                  {
                    title: "Messages",
                    icon: "chat",
                    bg: "bg-orange-100",
                    color: "text-orange-500",
                    path: "/client/messages",
                  },
                  {
                    title: "Browse Freelancers",
                    icon: "group",
                    bg: "bg-blue-100",
                    color: "text-blue-600",
                    path: "",
                  },
                  {
                    title: "My Proposals",
                    icon: "description",
                    bg: "bg-purple-100",
                    color: "text-purple-600",
                    path: "",
                  },
                  {
                    title: "Settings",
                    icon: "settings",
                    bg: "bg-slate-100",
                    color: "text-slate-600",
                    path: "/client/settings",
                  },
                ].map((action) => (
                  <button
                    key={action.title}
                    onClick={() => navigate(action.path)}
                    className=" cursor-pointer flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 text-center transition hover:border-violet-200 hover:bg-violet-50"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.bg}`}
                    >
                      <span
                        className={`material-symbols-outlined ${action.color}`}
                      >
                        {action.icon}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-slate-700">
                      {action.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <aside className="space-y-6 xl:col-span-4">
            {/* =================================
                RECENT PROPOSALS    في انتظار الفريلانسر
            ================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Recent Proposals في انتظار الفريلانسر
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Latest proposals received
                  </p>
                </div>

                <button className="text-sm font-semibold text-violet-600">
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {proposals.map((proposal) => (
                  <div
                    key={proposal.name}
                    className="group cursor-pointer p-5 transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={proposal.image}
                        alt={proposal.name}
                        className="h-11 w-11 rounded-full object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="truncate text-sm font-bold text-slate-900">
                            {proposal.name}
                          </h4>

                          <span className="text-sm font-bold text-violet-600">
                            {proposal.price}
                          </span>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                            <span className="material-symbols-outlined text-[16px] text-yellow-500">
                              star
                            </span>

                            {proposal.rating}
                          </span>

                          <span className="text-xs text-slate-400">
                            {proposal.category}
                          </span>
                        </div>
                      </div>

                      <span className="material-symbols-outlined text-slate-400 transition group-hover:text-violet-600">
                        chevron_right
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 bg-slate-50 p-4">
                <button className="w-full rounded-xl bg-violet-50 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-100">
                  Review 28 Proposals
                </button>
              </div>
            </div>

            {/* =================================
                RECENT MESSAGES
            ================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Recent Messages
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Latest conversations
                  </p>
                </div>

                <button className=" cursor-pointer   text-sm font-semibold text-violet-600 ">
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {loadingMessages ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    Loading messages...
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="p-6 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300">
                      chat
                    </span>

                    <p className="mt-2 text-sm font-medium text-slate-600">
                      No conversations yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Your recent conversations will appear here.
                    </p>
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const otherUser = conversation.participants.find(
                      (user) => user._id !== currentUserId,
                    );

                    if (!otherUser) return null;

                    const initials = otherUser.fullName
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <div
                        key={conversation._id}
                        className="flex cursor-pointer gap-3 p-5 transition hover:bg-slate-50"
                      >
                        {/* Avatar */}

                        {otherUser.profilePhoto ? (
                          <img
                            src={`${URL_SERVER}/${otherUser.profilePhoto.replace(
                              /\\/g,
                              "/",
                            )}`}
                            alt={otherUser.fullName}
                            className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600">
                            {initials}
                          </div>
                        )}

                        {/* Message */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="truncate text-sm font-bold text-slate-900">
                              {otherUser.fullName}
                            </h4>

                            <span className="whitespace-nowrap text-[10px] font-medium uppercase text-slate-400">
                              {new Date(
                                conversation.lastMessageAt,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {conversation.lastMessage || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="border-t border-slate-200 p-4">
                <button
                  onClick={() => navigate("/client/messages")}
                  className=" cursor-pointer w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Open Inbox
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =========================================
          FLOATING POST JOB BUTTON
      ========================================= */}

      {/* <button
        type="button"
        title="Post a New Job"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-xl transition hover:scale-105 hover:bg-violet-700 active:scale-95"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button> */}
    </main>
  );
};

export default ClientDashboard;
