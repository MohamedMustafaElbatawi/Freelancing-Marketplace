import { GraduationCap } from "lucide-react";

function EducationSection({ education, loading }) {
  if (loading) {
    return (
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>

        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>

      <div className="space-y-6">
        {education?.map((item, index) => (
          <div key={item._id || index} className="flex gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <GraduationCap size={21} className="text-purple-600" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">{item.degree}</h3>

              <p className="text-sm text-gray-600 mt-1">{item.university}</p>

              <p className="text-sm text-gray-400 mt-1">
                {item.startDate} - {item.endDate || "Present"}
              </p>

              {item.description && (
                <p className="text-sm text-gray-600 leading-6 mt-3">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EducationSection;
