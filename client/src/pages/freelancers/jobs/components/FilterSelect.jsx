import { ChevronDown } from 'lucide-react';
import React from 'react'

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold">{label}</label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-9 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

export default FilterSelect