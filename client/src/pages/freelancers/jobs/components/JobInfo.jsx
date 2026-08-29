import React from "react";

function JobInfo({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 text-indigo-500">{icon}</div>

      <div className="min-w-0">
        <p className="text-[11px] text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

export default JobInfo;
