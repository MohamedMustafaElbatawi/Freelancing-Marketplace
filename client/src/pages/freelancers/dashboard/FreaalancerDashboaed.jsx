import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  MessageCircle,
  TrendingUp,
  User,
  ArrowUpRight,
  CalendarDays,
  Star,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

const API_URL = `${URL_SERVER}/api`;
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${URL_SERVER}/${imagePath.replaceAll("\\", "/").replace(/^\/+/, "")}`;
};

function FreaalancerDashboaed() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [conversations, setConversations] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // Load Dashboard Data
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [userResponse, proposalsResponse, conversationsResponse] =
          await Promise.all([
            axios.get(`${API_URL}/auth/me`, {
              withCredentials: true,
            }),

            axios.get(`${API_URL}/proposals/my`, {
              withCredentials: true,
            }),

            axios.get(`${API_URL}/conversations`, {
              withCredentials: true,
            }),
          ]);

        if (!mounted) return;

        const currentUser = userResponse.data?.user || null;

        const myProposals = proposalsResponse.data?.proposals || [];

        const myConversations = conversationsResponse.data?.conversations || [];

        setUser(currentUser);
        setProposals(myProposals);
        setConversations(myConversations);

        console.log("========== FREELANCER DASHBOARD ==========");
        console.log("USER:", currentUser);
        console.log("PROPOSALS:", myProposals);
        console.log("CONVERSATIONS:", myConversations);
        console.log("==========================================");
      } catch (error) {
        console.error("GET FREELANCER DASHBOARD ERROR:", error);

        if (error.response) {
          console.error("STATUS:", error.response.status);

          console.error("SERVER RESPONSE:", error.response.data);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // Stats
  // =====================================================

  const stats = useMemo(() => {
    const total = proposals.length;

    const pending = proposals.filter(
      (proposal) => proposal.status === "Pending",
    ).length;

    const accepted = proposals.filter(
      (proposal) => proposal.status === "Accepted",
    ).length;

    const rejected = proposals.filter(
      (proposal) => proposal.status === "Rejected",
    ).length;

    return {
      total,
      pending,
      accepted,
      rejected,
    };
  }, [proposals]);

  // =====================================================
  // Recent Proposals
  // =====================================================

  const recentProposals = useMemo(() => {
    return [...proposals]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5);
  }, [proposals]);

  // =====================================================
  // Recent Conversations
  // =====================================================

  const recentConversations = useMemo(() => {
    return [...conversations]
      .sort(
        (a, b) =>
          new Date(b.lastMessageAt || b.updatedAt || 0) -
          new Date(a.lastMessageAt || a.updatedAt || 0),
      )
      .slice(0, 4);
  }, [conversations]);

  // =====================================================
  // Helpers
  // =====================================================

  const getOtherUser = (conversation) => {
    if (!conversation?.participants?.length || !user?._id) {
      return null;
    }

    return conversation.participants.find(
      (participant) => String(participant?._id) !== String(user._id),
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "N/A";
    }

    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "";
    }

    return value.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";

      case "Rejected":
        return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";

      case "Withdrawn":
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

      default:
        return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <Loader2 size={22} className="animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  // =====================================================
  // Dashboard
  // =====================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4 dark:bg-slate-950 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* =================================================
            Welcome
        ================================================= */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-lg md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">
                Freelancer Dashboard
              </p>

              <h1 className="mt-2 text-2xl font-bold md:text-3xl">
                Welcome back, {user?.fullName || "Freelancer"} 👋
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Track your proposals, conversations, projects, and overall
                freelancing activity from one place.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/freelancer/jobs")}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  <BriefcaseBusiness size={17} />
                  Find Jobs
                </button>

                <button
                  onClick={() => navigate("/freelancer/proposals")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <FileText size={17} />
                  My Proposals
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
                <TrendingUp size={54} />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            Profile Summary
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                {user?.profilePhoto ? (
                  <img
                    src={getImageUrl(user.profilePhoto)}
                    alt={user?.fullName || "Freelancer"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={24} />
                )}
              </div>

              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">
                  {user?.fullName || "Freelancer"}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {user?.professionalTitle || "Freelancer"}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/freelancer/profile")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
            >
              View Profile
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-800/60">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Experience
              </p>

              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {user?.yearsOfExperience ?? 0} years
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-800/60">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hourly Rate
              </p>

              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                ${user?.hourlyRate ?? 0}/hr
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-800/60">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Availability
              </p>

              <p
                className={`mt-1 font-semibold ${
                  user?.isAvailable ? "text-emerald-600" : "text-gray-500"
                }`}
              >
                {user?.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-800/60">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Location
              </p>

              <p className="mt-1 truncate font-semibold text-gray-900 dark:text-white">
                {user?.location || "Not specified"}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            Stats
        ================================================= */}

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            title="Total Proposals"
            value={stats.total}
            icon={<FileText size={21} />}
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<Clock3 size={21} />}
          />

          <StatCard
            title="Accepted"
            value={stats.accepted}
            icon={<CheckCircle2 size={21} />}
          />

          <StatCard
            title="Messages"
            value={conversations.length}
            icon={<MessageCircle size={21} />}
          />
        </section>

        {/* =================================================
            Main Grid
        ================================================= */}

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          {/* =================================================
              Recent Proposals
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-slate-800">
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">
                  Recent Proposals
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Your latest applications
                </p>
              </div>

              <button
                onClick={() => navigate("/freelancer/proposals")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {recentProposals.length === 0 ? (
                <div className="p-10 text-center">
                  <FileText size={28} className="mx-auto text-gray-400" />

                  <p className="mt-3 font-medium text-gray-700 dark:text-gray-300">
                    No proposals yet
                  </p>

                  <button
                    onClick={() => navigate("/freelancer/jobs")}
                    className="mt-3 text-sm font-semibold text-blue-600"
                  >
                    Find your first job
                  </button>
                </div>
              ) : (
                recentProposals.map((proposal) => (
                  <button
                    key={proposal._id}
                    type="button"
                    onClick={() =>
                      navigate(`/freelancer/proposals/${proposal._id}`)
                    }
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate font-semibold text-gray-900 dark:text-white">
                          {proposal.job?.jobTitle || "Untitled Job"}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                            proposal.status,
                          )}`}
                        >
                          {proposal.status}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <DollarSign size={13} />
                          {proposal.proposedBudget}{" "}
                          {proposal.job?.currency || "USD"}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={13} />
                          {proposal.estimatedDuration || "N/A"}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays size={13} />
                          {formatDate(proposal.createdAt)}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-gray-400"
                    />
                  </button>
                ))
              )}
            </div>
          </section>

          {/* =================================================
              Recent Messages
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-slate-800">
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">
                  Recent Messages
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Your latest conversations
                </p>
              </div>

              <button
                onClick={() => navigate("/freelancer/messages")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {recentConversations.length === 0 ? (
                <div className="p-10 text-center">
                  <MessageCircle size={28} className="mx-auto text-gray-400" />

                  <p className="mt-3 font-medium text-gray-700 dark:text-gray-300">
                    No conversations yet
                  </p>
                </div>
              ) : (
                recentConversations.map((conversation) => {
                  const client = getOtherUser(conversation);

                  return (
                    <button
                      key={conversation._id}
                      type="button"
                      onClick={() =>
                        navigate(`/freelancer/messages/${conversation._id}`)
                      }
                      className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-gray-50 dark:hover:bg-slate-800/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {client?.profilePhoto ? (
                          <img
                            src={getImageUrl(client.profilePhoto)}
                            alt={client.fullName || "Client"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User size={18} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {client?.fullName || client?.userName || "Client"}
                          </h3>

                          <span className="shrink-0 text-[11px] text-gray-400">
                            {formatTime(conversation.lastMessageAt)}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                          {conversation.lastMessage || "No messages yet"}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>
        </div>

        {/* =================================================
            Quick Actions
        ================================================= */}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              icon={<BriefcaseBusiness size={20} />}
              title="Find Jobs"
              description="Discover new opportunities"
              onClick={() => navigate("/freelancer/jobs")}
            />

            <QuickAction
              icon={<FileText size={20} />}
              title="My Proposals"
              description="Track your applications"
              onClick={() => navigate("/freelancer/proposals")}
            />

            <QuickAction
              icon={<MessageCircle size={20} />}
              title="Messages"
              description="Chat with clients"
              onClick={() => navigate("/freelancer/messages")}
            />

            <QuickAction
              icon={<User size={20} />}
              title="My Profile"
              description="Update your professional profile"
              onClick={() => navigate("/freelancer/profile")}
            />
          </div>
        </section>

        {/* =================================================
            Profile Completion
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">
                Profile Status
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Keep your profile complete to make a stronger impression with
                clients.
              </p>
            </div>

            <button
              onClick={() => navigate("/freelancer/profile")}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Manage Profile
            </button>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-gray-500 dark:text-gray-400">
                Profile
              </span>

              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {getProfileCompletion(user)}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${getProfileCompletion(user)}%`,
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// =====================================================
// Stat Card
// =====================================================

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          {icon}
        </div>

        <ArrowUpRight size={17} className="text-gray-400" />
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

// =====================================================
// Quick Action
// =====================================================

function QuickAction({ icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </button>
  );
}

// =====================================================
// Profile Completion
// =====================================================

function getProfileCompletion(user) {
  if (!user) return 0;

  const fields = [
    user.fullName,
    user.userName,
    user.email,
    user.profilePhoto,
    user.professionalTitle,
    user.bio,
    user.location,
    user.skills?.length,
    user.yearsOfExperience !== undefined,
    user.hourlyRate !== undefined,
    user.linkedin,
    user.github,
    user.portfolio,
  ];

  const completed = fields.filter(Boolean).length;

  return Math.round((completed / fields.length) * 100);
}

export default FreaalancerDashboaed;
