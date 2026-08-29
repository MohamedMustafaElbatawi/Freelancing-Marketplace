import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  DollarSign,
  Clock3,
  Send,
  CheckCircle2,
} from "lucide-react";

const SERVER_URL =
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedBudget: "",
    estimatedDuration: "",
  });

  // =========================
  // Get Job
  // =========================

  const getJob = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${SERVER_URL}/api/jobs/${id}`, {
        withCredentials: true,
      });

      setJob(response.data.job);
    } catch (error) {
      console.error("GET JOB ERROR:", error);

      setError(error.response?.data?.message || "Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJob();
  }, [id]);

  // =========================
  // Handle Change
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Submit Application
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coverLetter.trim()) {
      setError("Please write your cover letter.");
      return;
    }

    if (!formData.proposedBudget) {
      setError("Please enter your proposed budget.");
      return;
    }

    if (!formData.estimatedDuration.trim()) {
      setError("Please enter the estimated duration.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await axios.post(
        `${SERVER_URL}/api/jobs/${id}/proposals`,
        {
          coverLetter: formData.coverLetter,
          proposedBudget: formData.proposedBudget,
          estimatedDuration: formData.estimatedDuration,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);

      alert("Proposal submitted successfully!");

      navigate("/freelancer/proposals");
    } catch (error) {
      console.error("APPLY JOB ERROR:", error);

      setError(error.response?.data?.message || "Failed to submit proposal");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <div className="h-80 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================

  if (error && !job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500">Failed to load job</h2>

          <p className="mt-2 text-sm text-slate-500">{error}</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // Closed Job
  // =========================

  if (job?.status === "Closed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <BriefcaseBusiness size={28} className="text-slate-500" />
          </div>

          <h2 className="mt-5 text-2xl font-bold">Job Closed</h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            This job is no longer accepting applications.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Header */}

      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Job
          </button>

          <div>
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              {job.category}
            </span>

            <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
              Apply for: {job.jobTitle}
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Send your proposal to the client
            </p>
          </div>
        </div>
      </div>

      {/* Content */}

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Application Form */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold">Your Proposal</h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Tell the client why you're the right person for this job.
              </p>
            </div>

            {/* Cover Letter */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Cover Letter
              </label>

              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={8}
                placeholder="Introduce yourself, explain your experience, and tell the client how you can help..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            {/* Budget */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Your Proposed Budget
              </label>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  name="proposedBudget"
                  value={formData.proposedBudget}
                  onChange={handleChange}
                  placeholder="Enter your price"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
            </div>

            {/* Duration */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Estimated Duration
              </label>

              <div className="relative">
                <Clock3
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="estimatedDuration"
                  value={formData.estimatedDuration}
                  onChange={handleChange}
                  placeholder="e.g. 2 weeks"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
            </div>

            {/* Error */}

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className=" cursor-pointer mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <Send size={18} />

              {submitting ? "Submitting..." : "Submit Proposal"}
            </button>
          </form>

          {/* Job Summary */}

          <aside>
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-bold">Job Summary</h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Job</p>

                  <p className="mt-1 text-sm font-semibold">{job.jobTitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign size={18} className="text-indigo-500" />

                  <div>
                    <p className="text-xs text-slate-400">Budget</p>

                    <p className="text-sm font-semibold">
                      {job.budget} {job.currency}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock3 size={18} className="text-indigo-500" />

                  <div>
                    <p className="text-xs text-slate-400">Duration</p>

                    <p className="text-sm font-semibold">
                      {job.duration || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BriefcaseBusiness size={18} className="text-indigo-500" />

                  <div>
                    <p className="text-xs text-slate-400">Experience</p>

                    <p className="text-sm font-semibold capitalize">
                      {job.experienceLevel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 size={17} />
                  Applications are open
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default ApplyJob;
