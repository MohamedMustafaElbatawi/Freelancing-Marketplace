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
  Send,
  Users,
  Eye,
  User,
  ExternalLink,
  Loader2,
} from "lucide-react";

const SERVER_URL =
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";

function DetailsJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const getJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${SERVER_URL}/api/jobs/${id}`, {
          withCredentials: true,
        });

        setJob(response.data.job);
      } catch (error) {
        console.error("GET JOB DETAILS ERROR:", error);

        setError(error.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getJob();
    }
  }, [id]);
const handleSaveJob = () => {
  setSaved((prev) => !prev);
};
  const toggleSaveJob = async () => {
    try {
      setSaving(true);

      if (saved) {
        // هنربطه بالـ DELETE API بعد ما نعمله
        await axios.delete(`${SERVER_URL}/api/saved-jobs/${job._id}`, {
          withCredentials: true,
        });

        setSaved(false);
      } else {
        // هنربطه بالـ POST API
        await axios.post(
          `${SERVER_URL}/api/saved-jobs`,
          {
            jobId: job._id,
          },
          {
            withCredentials: true,
          },
        );

        setSaved(true);
      }
    } catch (error) {
      console.error("SAVE JOB ERROR:", error);

      alert(error.response?.data?.message || "Failed to save job");
    } finally {
      setSaving(false);
    }
  };
  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 h-10 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
            <div className="space-y-6">
              <div className="h-72 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
              <div className="h-64 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
            </div>

            <div className="h-96 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error || !job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            !
          </div>

          <h2 className="mt-4 text-xl font-bold">Job Not Found</h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error || "This job does not exist or has been removed."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const client = job.client;

  const clientName =
    typeof client === "object"
      ? client?.fullName || client?.userName || "Client"
      : client || "Client";

  const clientPhoto = typeof client === "object" ? client?.profilePhoto : "";

  const clientLocation =
    typeof client === "object"
      ? client?.location || "Location not specified"
      : "Location not specified";

  const clientInitial = clientName?.charAt(0)?.toUpperCase() || "C";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Job Header */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  {/* Client Avatar */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white">
                    {clientPhoto ? (
                      <img
                        src={
                          clientPhoto.startsWith("http")
                            ? clientPhoto
                            : `${SERVER_URL}/${clientPhoto}`
                        }
                        alt={clientName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      clientInitial
                    )}
                  </div>

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        {job.category || "General"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          job.status === "Closed"
                            ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        }`}
                      >
                        {job.status || "Published"}
                      </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {job.jobTitle}
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Posted by{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {clientName}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-slate-100 py-5 dark:border-slate-800 sm:grid-cols-4">
                <JobStat
                  icon={<DollarSign size={18} />}
                  label="Budget"
                  value={
                    job.paymentType === "Hourly Rate"
                      ? `$${job.budget}/hr`
                      : `$${job.budget}`
                  }
                />

                <JobStat
                  icon={<Clock3 size={18} />}
                  label="Duration"
                  value={job.duration || "Not specified"}
                />

                <JobStat
                  icon={<BriefcaseBusiness size={18} />}
                  label="Experience"
                  value={job.experienceLevel || "Not specified"}
                />

                <JobStat
                  icon={<Users size={18} />}
                  label="Proposals"
                  value={job.proposals || 0}
                />
              </div>

              {/* Description */}
              <div className="mt-7">
                <h2 className="text-lg font-bold">About the Job</h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {job.description}
                </p>
              </div>

              {/* Skills */}
              <div className="mt-7">
                <h2 className="text-lg font-bold">Skills Required</h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.isArray(job.skills) &&
                    job.skills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </section>

            {/* Project Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-lg font-bold">Project Details</h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <DetailItem
                  icon={<BriefcaseBusiness size={18} />}
                  label="Project Type"
                  value={formatValue(job.projectType)}
                />

                <DetailItem
                  icon={<DollarSign size={18} />}
                  label="Payment Type"
                  value={formatValue(job.paymentType)}
                />

                <DetailItem
                  icon={<Clock3 size={18} />}
                  label="Commitment"
                  value={job.commitment || "Not specified"}
                />

                <DetailItem
                  icon={<CalendarDays size={18} />}
                  label="Deadline"
                  value={
                    job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "No deadline"
                  }
                />

                <DetailItem
                  icon={<Eye size={18} />}
                  label="Views"
                  value={job.views || 0}
                />

                <DetailItem
                  icon={<Users size={18} />}
                  label="Proposals"
                  value={job.proposals || 0}
                />
              </div>
            </section>

            {/* Attachments */}
            {job.attachments?.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <h2 className="text-lg font-bold">Attachments</h2>

                <div className="mt-4 space-y-2">
                  {job.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={
                        file.startsWith("http") ? file : `${SERVER_URL}/${file}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/5"
                    >
                      <div className="flex items-center gap-3">
                        <ExternalLink size={18} className="text-indigo-500" />

                        <span className="text-sm font-medium">
                          Attachment {index + 1}
                        </span>
                      </div>

                      <ArrowLeft
                        size={16}
                        className="rotate-180 text-slate-400"
                      />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-6 space-y-5">
              {/* Apply Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Project Budget
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {job.paymentType === "Hourly Rate"
                      ? `$${job.budget}/hr`
                      : `$${job.budget}`}
                  </p>
                </div>
                <button
                  disabled={job.status === "Closed"}
                  onClick={() => navigate(`/freelancer/apply-job/${job._id}`)}
                  className=" cursor-pointer mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
                >
                  <Send size={18} />

                  {job.status === "Closed" ? "Job Closed" : "Apply Now"}
                </button>

                <button
                  onClick={handleSaveJob}
                  className="cursor-pointer mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {saved ? "Job Saved ✓" : "Save Job"}
                </button>
              </div>

              {/* Client Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="font-bold">About the Client</h2>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {clientPhoto ? (
                      <img
                        src={
                          clientPhoto.startsWith("http")
                            ? clientPhoto
                            : `${SERVER_URL}/${clientPhoto}`
                        }
                        alt={clientName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      clientInitial
                    )}
                  </div>

                  <div>
                    <p className="font-semibold">{clientName}</p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Client
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={17} />
                    {clientLocation}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <CheckCircle2 size={17} className="text-emerald-500" />
                    Verified Client
                  </div>
                </div>

                <button className=" cursor-pointer mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                  <User size={16} />
                  View Client Profile
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   Components
========================================================= */

function JobStat({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-indigo-500">
        {icon}

        <span className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-1 text-sm font-bold capitalize">{value}</p>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>

        <p className="mt-1 text-sm font-semibold capitalize">{value}</p>
      </div>
    </div>
  );
}

function formatValue(value) {
  if (!value) return "Not specified";

  return String(value)
    .replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default DetailsJob;
