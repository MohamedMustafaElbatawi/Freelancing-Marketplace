import React, { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Search,
  FileText,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import ProposalCard from "./components/ProposalCard";
import ProposalDetailsModal from "./components/ProposalDetailsModal";

import {
  getClientProposals,
  acceptProposal,
  rejectProposal,
} from "./proposalService";

function ClientProposals() {
  const [proposals, setProposals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedProposal, setSelectedProposal] = useState(null);

  const [actionLoading, setActionLoading] = useState(null);

  // =====================================================
  // Load Proposals
  // =====================================================

  const loadProposals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getClientProposals();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load proposals",
        );
      }

      setProposals(response.proposals || []);
    } catch (err) {
      console.error("GET CLIENT PROPOSALS ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load proposals",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  // =====================================================
  // Accept
  // =====================================================

  const handleAccept = async (proposal) => {
    if (!proposal?._id) {
      return;
    }

    const freelancerName =
      proposal?.freelancer?.fullName || "this freelancer";

    const confirmed = window.confirm(
      `Are you sure you want to accept ${freelancerName}'s proposal?\n\nOther pending proposals for this job will be rejected.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(proposal._id);

      const response = await acceptProposal(proposal._id);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to accept proposal",
        );
      }

      // Reload because:
      // Accepted proposal -> Accepted
      // Other proposals -> Rejected
      // Job -> Closed

      await loadProposals();

      setSelectedProposal(null);

      alert("Proposal accepted successfully.");
    } catch (err) {
      console.error("ACCEPT PROPOSAL ERROR:", err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to accept proposal",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =====================================================
  // Reject
  // =====================================================

  const handleReject = async (proposal) => {
    if (!proposal?._id) {
      return;
    }

    const freelancerName =
      proposal?.freelancer?.fullName || "this freelancer";

    const confirmed = window.confirm(
      `Are you sure you want to reject ${freelancerName}'s proposal?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(proposal._id);

      const response = await rejectProposal(proposal._id);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to reject proposal",
        );
      }

      await loadProposals();

      setSelectedProposal(null);

      alert("Proposal rejected successfully.");
    } catch (err) {
      console.error("REJECT PROPOSAL ERROR:", err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to reject proposal",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =====================================================
  // Filtering
  // =====================================================

  const filteredProposals = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return proposals.filter((proposal) => {
      const freelancerName =
        proposal?.freelancer?.fullName?.toLowerCase() || "";

      const username =
        proposal?.freelancer?.userName?.toLowerCase() || "";

      const jobTitle =
        proposal?.job?.jobTitle?.toLowerCase() || "";

      const matchesSearch =
        !searchValue ||
        freelancerName.includes(searchValue) ||
        username.includes(searchValue) ||
        jobTitle.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        proposal?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [proposals, search, statusFilter]);

  // =====================================================
  // Stats
  // =====================================================

  const stats = useMemo(() => {
    return {
      total: proposals.length,

      pending: proposals.filter(
        (proposal) => proposal.status === "Pending",
      ).length,

      accepted: proposals.filter(
        (proposal) => proposal.status === "Accepted",
      ).length,

      rejected: proposals.filter(
        (proposal) => proposal.status === "Rejected",
      ).length,
    };
  }, [proposals]);

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <Loader2 size={22} className="animate-spin" />

          <span>Loading proposals...</span>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4 dark:bg-slate-950 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <FileText size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Proposals
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Review proposals from freelancers
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={loadProposals}
            className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* ================================================= */}
        {/* Error */}
        {/* ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-semibold">
                Failed to load proposals
              </p>

              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* Stats */}
        {/* ================================================= */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </p>

            <p className="mt-1 text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Accepted
            </p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {stats.accepted}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Rejected
            </p>

            <p className="mt-1 text-2xl font-bold text-red-600">
              {stats.rejected}
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* Filters */}
        {/* ================================================= */}

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search freelancer or job..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>
        </div>

        {/* ================================================= */}
        {/* Empty */}
        {/* ================================================= */}

        {filteredProposals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400">
              <FileText size={25} />
            </div>

            <h2 className="mt-4 font-semibold text-gray-900 dark:text-white">
              No proposals found
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {proposals.length === 0
                ? "You haven't received any proposals yet."
                : "Try changing your search or filter."}
            </p>
          </div>
        ) : (
          /* ================================================= */
          /* Proposals */
          /* ================================================= */

          <div className="grid gap-5 lg:grid-cols-2">
            {filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal._id}
                proposal={proposal}
                onView={setSelectedProposal}
                onAccept={handleAccept}
                onReject={handleReject}
                actionLoading={actionLoading === proposal._id}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* Modal */}
      {/* ================================================= */}

      {selectedProposal && (
        <ProposalDetailsModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
        />
      )}
    </div>
  );
}

export default ClientProposals;
