import { Search, X } from "lucide-react";
import React from "react";
function EmptyJobs({ onClear }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
        <Search size={28} />
      </div>

      <h3 className="mt-5 text-lg font-bold">No jobs found</h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        We couldn't find jobs matching your current search and filters. Try
        changing your search criteria.
      </p>

      <button
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        <X size={16} />
        Clear Filters
      </button>
    </div>
  );
}
export default EmptyJobs;
