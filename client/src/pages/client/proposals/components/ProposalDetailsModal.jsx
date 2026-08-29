import React from "react";
import {
  X,
  User,
  MapPin,
  Mail,
  Briefcase,
  DollarSign,
  Clock,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function ProposalDetailsModal({ proposal, onClose }) {
  const URL_SERVER = import.meta.env.VITE_APP_SERVER_URL;

  if (!proposal) {
    return null;
  }

  const freelancer = proposal.freelancer;
  const job = proposal.job;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Proposal Details
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review freelancer proposal
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* ================================================= */}
          {/* Freelancer */}
          {/* ================================================= */}

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Freelancer
            </h3>

            <div className="rounded-2xl border border-gray-200 p-5 dark:border-slate-800">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {freelancer?.profilePhoto ? (
                  <img
                    src={`${URL_SERVER}/${freelancer.profilePhoto.replaceAll(
                      "\\",
                      "/",
                    )}`}
                    alt={freelancer?.fullName || "Freelancer"}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <User size={30} />
                  </div>
                )}

                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {freelancer?.fullName || "Freelancer unavailable"}
                  </h4>

                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    {freelancer?.professionalTitle || "Freelancer"}
                  </p>
                </div>
              </div>

              {freelancer && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {freelancer.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail size={16} />
                      {freelancer.email}
                    </div>
                  )}

                  {freelancer.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      {freelancer.location}
                    </div>
                  )}

                  {freelancer.yearsOfExperience !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Briefcase size={16} />
                      {freelancer.yearsOfExperience} years experience
                    </div>
                  )}

                  {freelancer.hourlyRate !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign size={16} />
                      {freelancer.hourlyRate}/hour
                    </div>
                  )}
                </div>
              )}

              {freelancer?.bio && (
                <div className="mt-5">
                  <h5 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    About
                  </h5>

                  <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {freelancer.bio}
                  </p>
                </div>
              )}

              {freelancer?.skills?.length > 0 && (
                <div className="mt-5">
                  <h5 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    Skills
                  </h5>

                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {freelancer?.github && (
                  <a
                    href={freelancer.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <FaGithub size={16} />
                    GitHub
                    <ExternalLink size={13} />
                  </a>
                )}

                {freelancer?.linkedin && (
                  <a
                    href={freelancer.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <FaLinkedin size={16} />
                    LinkedIn
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* ================================================= */}
          {/* Job */}
          {/* ================================================= */}

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Job
            </h3>

            <div className="rounded-2xl border border-gray-200 p-5 dark:border-slate-800">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {job?.jobTitle || "Unknown Job"}
              </h4>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {job?.description || "No description available."}
              </p>
            </div>
          </section>

          {/* ================================================= */}
          {/* Proposal */}
          {/* ================================================= */}

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Proposal
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-800">
                <DollarSign size={18} className="mb-2 text-blue-500" />

                <p className="text-xs text-gray-500">Budget</p>

                <p className="mt-1 font-bold text-gray-900 dark:text-white">
                  {proposal.proposedBudget} {job?.currency || "USD"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-800">
                <Clock size={18} className="mb-2 text-blue-500" />

                <p className="text-xs text-gray-500">Duration</p>

                <p className="mt-1 font-bold text-gray-900 dark:text-white">
                  {proposal.estimatedDuration}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-800">
                <Briefcase size={18} className="mb-2 text-blue-500" />

                <p className="text-xs text-gray-500">Status</p>

                <p className="mt-1 font-bold text-gray-900 dark:text-white">
                  {proposal.status}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-gray-50 p-5 dark:bg-slate-800/50">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Cover Letter
              </h4>

              <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600 dark:text-gray-400">
                {proposal.coverLetter || "No cover letter provided."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetailsModal;
