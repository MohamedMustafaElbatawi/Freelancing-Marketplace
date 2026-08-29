import React from "react";

function AboutSection({ profile }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>

      <p className="text-gray-600 leading-7">{profile.bio}</p>
    </section>
  );
}

export default AboutSection;
