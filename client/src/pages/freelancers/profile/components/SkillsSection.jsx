import { Code2 } from "lucide-react";
import React from "react";

function SkillsSection({ profile }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Code2 size={21} />
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
