import React from "react";
import {
  Check,
  X,
  Eye,
  Clock,
  DollarSign,
  Briefcase,
  User,
} from "lucide-react";

function ProposalCard({ proposal, onView, onAccept, onReject, actionLoading }) {
  const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

  const freelancer = proposal?.freelancer;
  const job = proposal?.job;

  const status = proposal?.status || "Pending";

  const statusClasses = {
    Pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",

    Accepted:
      "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",

    Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",

    Withdrawn:
      "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Freelancer Image */}

          {freelancer?.profilePhoto ? (
            <img
              src={`${URL_SERVER}/${freelancer.profilePhoto.replaceAll(
                "\\",
                "/",
              )}`}
              alt={freelancer?.fullName || "Freelancer"}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <User size={22} />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {freelancer?.fullName || "Freelancer unavailable"}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {freelancer?.professionalTitle || "Freelancer"}
            </p>
          </div>
        </div>

        {/* Status */}

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            statusClasses[status] || statusClasses.Pending
          }`}
        >
          {status}
        </span>
      </div>

      {/* ================================================= */}
      {/* Job */}
      {/* ================================================= */}

      <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Briefcase size={16} />

          <span>Applied for</span>
        </div>

        <h4 className="mt-1 font-semibold text-gray-900 dark:text-white">
          {job?.jobTitle || "Unknown Job"}
        </h4>
      </div>

      {/* ================================================= */}
      {/* Proposal Info */}
      {/* ================================================= */}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-100 p-3 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <DollarSign size={15} />
            Proposed Budget
          </div>

          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {proposal?.proposedBudget ?? 0} {job?.currency || "USD"}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 p-3 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock size={15} />
            Estimated Duration
          </div>

          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {proposal?.estimatedDuration || "Not specified"}
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* Cover Letter */}
      {/* ================================================= */}

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Cover Letter
        </p>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {proposal?.coverLetter || "No cover letter provided."}
        </p>
      </div>

      {/* ================================================= */}
      {/* Actions */}
      {/* ================================================= */}

      <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4 dark:border-slate-800">
        <button
          onClick={() => onView(proposal)}
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
        >
          <Eye size={16} />
          View Details
        </button>

        {status === "Pending" && freelancer && (
          <>
            <button
              onClick={() => onAccept(proposal)}
              disabled={actionLoading}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={16} />

              {actionLoading ? "Processing..." : "Accept"}
            </button>

            <button
              onClick={() => onReject(proposal)}
              disabled={actionLoading}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={16} />

              {actionLoading ? "Processing..." : "Reject"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProposalCard;
