import { Briefcase } from "lucide-react";
import React from "react";

function ExperienceSection({ experiences }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Work Experience</h2>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.position} className="flex gap-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Briefcase size={20} className="text-indigo-600" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">{experience.position}</h3>

              <p className="text-sm text-indigo-600 mt-1">
                {experience.company}
              </p>

              <p className="text-sm text-gray-400 mt-1">{experience.period}</p>

              <p className="text-sm text-gray-600 leading-6 mt-3">
                {experience.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
