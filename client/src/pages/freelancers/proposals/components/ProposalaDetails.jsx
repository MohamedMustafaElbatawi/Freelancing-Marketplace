import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  MapPin,
  User,
  XCircle,
  MessageCircle,
} from "lucide-react";

const SERVER_URL =
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";

function ProposalaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // Get Proposal
  const getProposal = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${SERVER_URL}/api/proposals/${id}`, {
        withCredentials: true,
      });

      setProposal(response.data.proposal);
    } catch (error) {
      console.error("GET PROPOSAL DETAILS ERROR:", error);

      setError(
        error.response?.data?.message || "Failed to load proposal details",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProposal();
    }
  }, [id]);

  // Withdraw Proposal
  const withdrawProposal = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this proposal?",
    );

    if (!confirmed) return;

    try {
      await axios.patch(
        `${SERVER_URL}/api/proposals/${id}/withdraw`,
        {},
        {
          withCredentials: true,
        },
      );

      // تحديث البيانات بعد الـ Withdraw
      await getProposal();
    } catch (error) {
      console.error("WITHDRAW PROPOSAL ERROR:", error);

      alert(error.response?.data?.message || "Failed to withdraw proposal");
    }
  };

  const messageClient = async () => {
    try {
      const client = proposal?.job?.client;

      console.log("========== MESSAGE CLIENT ==========");
      console.log("Client:", client);
      console.log("Client ID:", client?._id);
      console.log("====================================");

      if (!client?._id) {
        alert("Client information is not available");
        return;
      }

      const response = await axios.post(
        `${SERVER_URL}/api/conversations`,
        {
          userId: client._id,
        },
        {
          withCredentials: true,
        },
      );

      console.log("CREATE CONVERSATION:", response.data);

      if (!response.data?.success) {
        alert(response.data?.message || "Failed to create conversation");
        return;
      }

      const conversation = response.data.conversation;

      if (!conversation?._id) {
        alert("Conversation was not created");
        return;
      }

      navigate(`/freelancer/messages/${conversation._id}`);
    } catch (error) {
      console.error("MESSAGE CLIENT ERROR:", error);

      console.error("STATUS:", error.response?.status);
      console.error("SERVER RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to start conversation with client",
      );
    }
  };

  // Loading

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl space-y-5">
          <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

          <div className="h-72 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />

          <div className="h-96 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
        </div>
      </div>
    );
  }

  // Error

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <XCircle size={45} className="mx-auto text-red-500" />

          <h2 className="mt-4 text-xl font-bold text-red-600 dark:text-red-400">
            Failed to load proposal
          </h2>

          <p className="mt-2 text-sm text-red-500">{error}</p>

          <button
            onClick={() => navigate("/freelancer/proposals")}
            className="cursor-pointer mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to My Proposals
          </button>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return null;
  }

  const job = proposal.job;
  // const freelancer = proposal.freelancer;
  console.log("========== JOB DEBUG ==========");
  console.log("JOB:", job);
  console.log("JOB CLIENT:", job?.client);
  console.log("JOB CLIENT TYPE:", typeof job?.client);
  console.log("================================");
  // console.log("CLIENT:", proposal.job?.client);

  // =====================================================
  // Status
  // =====================================================

  const getStatusStyle = () => {
    switch (proposal.status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";

      case "Rejected":
        return "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";

      case "Withdrawn":
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

      default:
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =====================================================
            Back
        ===================================================== */}

        <button
          onClick={() => navigate("/freelancer/proposals")}
          className="cursor-pointer mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={18} />
          Back to My Proposals
        </button>

        {/* =====================================================
            Header
        ===================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {job?.category && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {job.category}
                  </span>
                )}

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle()}`}
                >
                  {proposal.status}
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
                {job?.jobTitle || "Job"}
              </h1>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness size={16} />
                  {job?.projectType || "N/A"}
                </span>

                {job?.category && (
                  <span className="flex items-center gap-1.5">
                    <BriefcaseBusiness size={16} />
                    {job.category}
                  </span>
                )}
              </div>
            </div>

            {/* Proposal Status */}

            <div className="flex items-center gap-2">
              {proposal.status === "Accepted" && (
                <CheckCircle2 size={25} className="text-emerald-500" />
              )}

              {proposal.status === "Withdrawn" && (
                <XCircle size={25} className="text-slate-400" />
              )}

              <span className="font-semibold">{proposal.status}</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            Content
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ===================================================
              Left
          =================================================== */}

          <div className="space-y-6">
            {/* Cover Letter */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold">Your Cover Letter</h2>

              <div className="mt-4 rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                {proposal.coverLetter}
              </div>
            </section>

            {/* Job Description */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold">Job Description</h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                {job?.description || "No description available."}
              </p>
            </section>

            {/* Skills */}

            {job?.skills?.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-bold">Required Skills</h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ===================================================
              Right Sidebar
          =================================================== */}

          <aside className="space-y-6">
            {/* Your Proposal */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold">Your Proposal</h2>

              <div className="mt-5 space-y-4">
                {/* Budget */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <DollarSign size={18} className="text-indigo-500" />

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Proposed Budget
                    </span>
                  </div>

                  <span className="font-bold">${proposal.proposedBudget}</span>
                </div>

                {/* Duration */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-indigo-500" />

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Duration
                    </span>
                  </div>

                  <span className="font-bold">
                    {proposal.estimatedDuration}
                  </span>
                </div>

                {/* Submitted */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <CalendarDays size={18} className="text-indigo-500" />

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Submitted
                    </span>
                  </div>

                  <span className="text-sm font-semibold">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Withdraw */}

              {proposal.status === "Pending" && (
                <button
                  onClick={withdrawProposal}
                  className=" cursor-pointer mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/20"
                >
                  <XCircle size={17} />
                  Withdraw Proposal
                </button>
              )}

              {proposal.status === "Withdrawn" && (
                <div className="mt-5 rounded-xl bg-slate-100 p-4 text-center text-sm font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  This proposal has been withdrawn.
                </div>
              )}
            </section>

            {/* Client */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold">Client</h2>

              <div className="mt-4 flex items-center gap-3">
                {/* {job?.client?.profilePhoto ? (
                  <img
                    src={job.client.profilePhoto}
                    alt={job.client.fullName}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                ) : ( */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <User size={22} />
                  </div>
                {/* )} */}

                <div>
                  <p className="font-semibold">
                    {job?.client?.fullName || job?.client?.userName || "Client"}
                  </p>

                  {job?.client?.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={13} />
                      {job.client.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Client */}

              <button
                onClick={messageClient}
                className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
              >
                <MessageCircle size={17} />
                Message Client
              </button>

              {/* View Client Profile */}

              <button
                onClick={() =>
                  job?.client?._id && navigate(`/client/${job.client._id}`)
                }
                className=" cursor-pointer mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <User size={17} />
                View Client Profile
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default ProposalaDetails;
