import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  Clock3,
  DollarSign,
  Eye,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

function MyProposals() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProposals = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/proposals/my`, {
        withCredentials: true,
      });

      setProposals(response.data.proposals || []);
    } catch (error) {
      console.error("GET PROPOSALS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProposals();
  }, []);

  const withdrawProposal = async (id) => {
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

      getProposals();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to withdraw proposal");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="h-40 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Proposals</h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Track all jobs you have applied for.
          </p>
        </div>

        {proposals.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <BriefcaseBusiness size={40} className="mx-auto text-slate-400" />

            <h2 className="mt-4 text-xl font-bold">No proposals yet</h2>

            <p className="mt-2 text-sm text-slate-500">
              Start applying to jobs to see your proposals here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => {
              const job = proposal.job;

              return (
                <article
                  key={proposal._id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          {job?.category}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {proposal.status}
                        </span>
                      </div>

                      <h2 className="mt-3 text-xl font-bold">
                        {job?.jobTitle}
                      </h2>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <DollarSign size={16} />
                          {proposal.proposedBudget}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3 size={16} />
                          {proposal.estimatedDuration}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <BriefcaseBusiness size={16} />
                          {job?.projectType}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/freelancer/proposals/${proposal._id}`)
                        }
                        className=" cursor-pointer flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      {proposal.status === "Pending" && (
                        <button
                          onClick={() => withdrawProposal(proposal._id)}
                          className=" cursor-pointer flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/20"
                        >
                          <XCircle size={16} />
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyProposals;
