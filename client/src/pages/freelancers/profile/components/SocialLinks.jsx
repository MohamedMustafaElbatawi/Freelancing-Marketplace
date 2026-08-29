import { ExternalLink, Globe } from "lucide-react";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function SocialLinks({ profile, loading }) {
  if (loading) return <p>Loading...</p>;
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-5">Links</h2>

      <div className="space-y-3">
        <a
          href={profile.portfolio}
          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <Globe size={18} />
            <span className="text-sm font-medium">Portfolio</span>
          </div>

          <ExternalLink size={16} />
        </a>

        <a
          href={profile.github}
          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <FaGithub size={18} />
            <span className="text-sm font-medium">GitHub</span>
          </div>

          <ExternalLink size={16} />
        </a>

        <a
          href={profile.linkedin}
          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <FaLinkedin size={18} className="text-blue-600" />

            <span className="text-sm font-medium">LinkedIn</span>
          </div>

          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}

export default SocialLinks;
