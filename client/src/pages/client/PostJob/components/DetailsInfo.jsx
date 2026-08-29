import React from "react";
import {
  CalendarDays,
  Baby,
  Award,
  Trophy,
  UploadCloud,
  X,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const experienceLevels = [
  {
    id: "entry",
    title: "Entry",
    desc: "Cost-effective for simpler tasks",
    icon: Baby,
  },
  {
    id: "intermediate",
    title: "Intermediate",
    desc: "The best balance of skill and cost",
    icon: Award,
  },
  {
    id: "expert",
    title: "Expert",
    desc: "Top-tier talent for complex projects",
    icon: Trophy,
  },
];

function DetailsInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExperience = (level) => {
    setFormData((prev) => ({
      ...prev,
      experienceLevel: level,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...files],
    }));

    e.target.value = "";
  };

  // const handleFileUpload = (e) => {
  //   const files = Array.from(e.target.files);

  //   const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);

  //   setFormData((prev) => ({
  //     ...prev,
  //     attachments: [...(prev.attachments || []), ...validFiles],
  //   }));

  //   e.target.value = "";
  // };
  return (
    <section className="bg-white border rounded-xl p-6 md:p-8 shadow-sm md:mt-0 mt-6 ">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Project Details</h1>

        <p className="text-gray-500 mt-2">
          Specify the timeline, experience requirements, and project scope.
        </p>
      </header>

      <div className="space-y-8">
        {/* Deadline */}
        <div>
          <label className="block mb-2 font-medium">Project Deadline</label>

          <div className="relative">
            <input
              type="date"
              name="deadline"
              value={formData.deadline || ""}
              onChange={handleChange}
              className="  w-full h-12  rounded-xl border border-gray-300 px-4 text-lg  placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4  focus:ring-indigo-500/20 focus:shadow-lg"
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-3 font-medium">Experience Level</label>

          <div className="grid md:grid-cols-3 gap-4">
            {experienceLevels.map((item) => {
              const Icon = item.icon;

              const active = formData.experienceLevel === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleExperience(item.id)}
                  className={`
                  p-5 rounded-xl border-2 text-center transition
                  ${
                    active
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-400"
                  }
                  `}
                >
                  <Icon className="mx-auto mb-2 text-blue-600" size={28} />

                  <h3 className="font-bold">{item.title}</h3>

                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Type */}

        <div>
          <label className="block mb-3 font-medium">Project Type</label>

          <div className="grid md:grid-cols-2 gap-4">
            <label
              className={`
        flex gap-3 items-center
        w-full
        h-20
        rounded-xl
        border
        px-4
        cursor-pointer
        transition-all duration-200

        ${
          formData.projectType === "one-time"
            ? "border-indigo-500 ring-4 ring-indigo-500/20 shadow-lg bg-indigo-50"
            : "border-gray-300 hover:border-indigo-400"
        }

      `}
            >
              <input
                type="radio"
                name="projectType"
                value="one-time"
                checked={formData.projectType === "one-time"}
                onChange={handleChange}
                className="w-5 h-5 text-indigo-600"
              />

              <div>
                <h3 className="font-bold text-lg">One-time project</h3>

                <p className="text-sm text-gray-500">
                  Fixed scope with a specific end date
                </p>
              </div>
            </label>

            <label
              className={`
        flex gap-3 items-center
        w-full
        h-20
        rounded-xl
        border
        px-4
        cursor-pointer
        transition-all duration-200

        ${
          formData.projectType === "ongoing"
            ? "border-indigo-500 ring-4 ring-indigo-500/20 shadow-lg bg-indigo-50"
            : "border-gray-300 hover:border-indigo-400"
        }

      `}
            >
              <input
                type="radio"
                name="projectType"
                value="ongoing"
                checked={formData.projectType === "ongoing"}
                onChange={handleChange}
                className="w-5 h-5 text-indigo-600"
              />

              <div>
                <h3 className="font-bold text-lg">Ongoing</h3>

                <p className="text-sm text-gray-500">Long-term collaboration</p>
              </div>
            </label>
          </div>
        </div>

        {/* Upload */}

        <div>
          <label className="block mb-3 font-medium">
            Attachments
            <span className="text-gray-400"> (Optional)</span>
          </label>

          <label
            htmlFor="fileUpload"
            className="
      border-2
      border-dashed
      rounded-xl
      p-8
      text-center
      cursor-pointer
      hover:bg-gray-50
      block
      transition
    "
          >
            <UploadCloud className="mx-auto text-gray-400" size={40} />

            <p className="mt-3 text-gray-500">
              <span className="text-blue-600 font-bold">Click to upload</span>{" "}
              or drag and drop
            </p>

            <p className="text-sm text-gray-400 mt-2">
              PDF, DOCX, JPG up to 10MB
            </p>

            <input
              id="fileUpload"
              type="file"
              multiple
              accept=".pdf,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Files Preview */}

          {formData.attachments?.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="
              flex
              items-center
              justify-between
              bg-gray-100
              p-3
              rounded-lg
            "
                >
                  <span className="text-sm">📄 {file.name}</span>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        attachments: prev.attachments.filter(
                          (_, i) => i !== index,
                        ),
                      }));
                    }}
                  >
                    <X
                      size={18}
                      className=" cursor-pointer hover:text-gray-600"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tip */}

      <aside className="mt-6 bg-yellow-50 p-4 rounded-xl flex gap-3">
        <Lightbulb className="text-yellow-600" />

        <div>
          <h4 className="font-bold">Expert Tip</h4>

          <p className="text-sm text-gray-600">
            Detailed projects receive more qualified bids.
          </p>
        </div>
      </aside>
    </section>
  );
}

export default DetailsInfo;
