import { Mail, Phone } from "lucide-react";
import React from "react";



function ContactInfo({profile ,loading}) {

  if (loading) return <p>Loading...</p>;
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Contact Information
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-gray-400" />

          <span className="text-sm text-gray-600">{profile.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-gray-400" />

          <span className="text-sm text-gray-600">{profile.phone}</span>
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;
