import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import React from "react";
import JobInfo from "./JobInfo";
import { useNavigate } from "react-router-dom";

function JobCard({ job, saved, onSave }) {
  const navigate = useNavigate();
  // =========================
  // Client Data
  // =========================

  const clientName = job?.client?.fullName || "Unknown Client";

  const clientInitial = clientName?.charAt(0)?.toUpperCase() || "U";

  const clientLocation = job?.client?.location || "Remote";

  // =========================
  // Job Data
  // =========================

  const title = job?.jobTitle || "Untitled Job";

  const category = job?.category || "General";

  const description =
    job?.description || "No description available for this job.";

  const skills = Array.isArray(job?.skills) ? job.skills : [];

  const budget = job?.budget || "Negotiable";

  const duration = job?.duration || "Not specified";

  const experience =
    job?.experienceLevel === "entry"
      ? "Entry Level"
      : job?.experienceLevel === "intermediate"
        ? "Intermediate"
        : job?.experienceLevel === "expert"
          ? "Expert"
          : "Not specified";

  const paymentType = job?.paymentType || "Fixed Price";

  const proposals = job?.proposals ?? 0;

  const projectType =
    job?.projectType === "one-time"
      ? "One Time"
      : job?.projectType === "ongoing"
        ? "Ongoing"
        : "Not specified";

  // =========================
  // Created Date
  // =========================

  const postedAt = job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently";

  // =========================
  // Budget Display
  // =========================

  const budgetValue =
    paymentType === "Hourly Rate" ? `$${budget}/hr` : `$${budget}`;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30">
      {/* =========================
          Top
      ========================= */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          {/* Client Avatar */}

          <div className="hidden h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white sm:flex">
            {job?.client?.profilePhoto ? (
              <img
                src={`http://localhost:5000/${job.client.profilePhoto}`}
                alt={clientName}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              clientInitial
            )}
          </div>

          {/* Job Header */}

          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {category}
              </span>

              <span className="text-xs text-slate-400">{postedAt}</span>
            </div>

            <h3 className="line-clamp-1 text-lg font-bold transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Posted by {clientName}
            </p>
          </div>
        </div>

        {/* Save */}

        <button
          onClick={onSave}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-500/30"
          title={saved ? "Remove from saved" : "Save job"}
        >
          {saved ? (
            <BookmarkCheck size={19} className="text-indigo-500" />
          ) : (
            <Bookmark size={19} />
          )}
        </button>
      </div>

      {/* =========================
          Description
      ========================= */}

      <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>

      {/* =========================
          Skills
      ========================= */}

      {skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* =========================
          Job Information
      ========================= */}

      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 dark:border-slate-800 sm:grid-cols-4">
        <JobInfo
          icon={<DollarSign size={16} />}
          label="Budget"
          value={budgetValue}
        />

        <JobInfo
          icon={<Clock3 size={16} />}
          label="Duration"
          value={duration}
        />

        <JobInfo
          icon={<BriefcaseBusiness size={16} />}
          label="Experience"
          value={experience}
        />

        <JobInfo
          icon={<Users size={16} />}
          label="Proposals"
          value={proposals}
        />
      </div>

      {/* =========================
          Bottom
      ========================= */}

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
          {/* Location */}

          <span className="flex items-center gap-1.5">
            <MapPin size={15} />
            {clientLocation}
          </span>

          {/* Project Type */}

          <span className="flex items-center gap-1.5">
            <CalendarDays size={15} />
            {projectType}
          </span>
        </div>

        {/* Actions */}

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/freelancer/details-job/${job._id}`)}
            className=" cursor-pointer flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            View Details
            <ArrowRight size={16} />
          </button>

          <button
               onClick={() => navigate(`/freelancer/apply-job/${job._id}`)}
          className=" cursor-pointer h-10 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700">
            Apply Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default JobCard;
