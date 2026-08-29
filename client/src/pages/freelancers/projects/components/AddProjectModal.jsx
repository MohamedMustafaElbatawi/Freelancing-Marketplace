import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

export default function AddProjectModal({
  onClose,
  project,
  onUpdated,
  onAdd,
}) {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
    image: null,
  });

  // Api
  const [loading, setLoading] = useState(false);
  const [technologyInput, setTechnologyInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies || [],
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        image: null,
      });

      if (project.image) {
        if (
          project.image.startsWith("http://") ||
          project.image.startsWith("https://")
        ) {
          setImagePreview(project.image);
        } else {
          setImagePreview(
            `${SERVER_URL}/${project.image
              .replaceAll("\\", "/")
              .replace(/^\/+/, "")}`,
          );
        }
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({
        title: "",
        description: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
        image: null,
      });

      setImagePreview(null);
    }
  }, [project]);
  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveTechnology = (technology) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((item) => item !== technology),
    }));
  };

  // Image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter project title");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter project description");
      return;
    }

    if (formData.technologies.length === 0) {
      alert("Please add at least one technology");
      return;
    }

    if (project) {
      await handleUpdateProject();
    } else {
      await handleCreateProject();
    }
  };

  const handleCreateProject = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      data.append("technologies", JSON.stringify(formData.technologies));

      data.append("liveUrl", formData.liveUrl);
      data.append("githubUrl", formData.githubUrl);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await axios.post(
        `${SERVER_URL}/api/freelancer/projects`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        console.log("Project created:", response.data.project);

        // ابعت المشروع للـ parent
        onAdd(response.data.project);

        // اقفل الـ modal
        onClose();
      }
    } catch (error) {
      console.error(
        "Create project error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      data.append("technologies", JSON.stringify(formData.technologies));

      data.append("liveUrl", formData.liveUrl);
      data.append("githubUrl", formData.githubUrl);

      // لو اختار صورة جديدة فقط
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await axios.put(
        `${SERVER_URL}/api/freelancer/projects/${project._id}`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        console.log("Project updated:", response.data.project);

        onUpdated(response.data.project);
        onClose();
      }
    } catch (error) {
      console.error(
        "Update project error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* =========================
          Overlay
      ========================= */}

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      {/* =========================
          Modal
      ========================= */}

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-white rounded-3xl shadow-2xl">
        {/* =========================
            Header
        ========================= */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Project
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Showcase your work and let clients know what you can build.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            <X size={21} />
          </button>
        </div>

        {/* =========================
            Body
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(92vh-145px)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="space-y-6">
              {/* Section Title */}

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Project Information
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Tell clients about your project.
                </p>
              </div>

              {/* Project Title */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Travel Booking Platform"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-gray-900 transition"
                />
              </div>

              {/* Description */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project, what you built and the problem it solves..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-gray-900 transition resize-none"
                />

                <p className="text-xs text-gray-400 mt-2">
                  Give a clear description of your project.
                </p>
              </div>

              {/* Technologies */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies
                </label>

                <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus-within:bg-white focus-within:border-gray-900 transition">
                  {/* Input + Save Button */}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={technologyInput}
                      onChange={(e) => setTechnologyInput(e.target.value)}
                      placeholder="e.g. React"
                      className="flex-1 h-10 px-3 bg-transparent outline-none text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const technology = technologyInput.trim();

                        if (!technology) return;

                        if (
                          formData.technologies.some(
                            (item) =>
                              item.toLowerCase() === technology.toLowerCase(),
                          )
                        ) {
                          setTechnologyInput("");
                          return;
                        }

                        setFormData((prev) => ({
                          ...prev,
                          technologies: [...prev.technologies, technology],
                        }));

                        setTechnologyInput("");
                      }}
                      className="px-4 h-10 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                    >
                      حفظ
                    </button>
                  </div>

                  {/* Technologies Tags */}

                  {formData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
                      {formData.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm"
                        >
                          {technology}

                          <button
                            type="button"
                            onClick={() => handleRemoveTechnology(technology)}
                            className="text-gray-300 hover:text-white transition"
                          >
                            <X size={13} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  اكتب التقنية ثم اضغط حفظ لإضافتها.
                </p>
              </div>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="space-y-6">
              {/* Section Title */}

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Project Details
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add your project image and links.
                </p>
              </div>

              {/* Project Image */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>

                <label className="block cursor-pointer">
                  <div className="relative h-56 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden hover:border-gray-400 transition bg-gray-50">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Project preview"
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-900">
                            <Upload size={17} />
                            Change Image
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                          <ImageIcon size={26} className="text-gray-400" />
                        </div>

                        <p className="text-sm font-medium text-gray-700 mt-4">
                          Upload Project Image
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG or WEBP
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Live Demo */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Demo URL
                </label>

                <div className="relative">
                  <LinkIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-gray-900 transition"
                  />
                </div>
              </div>

              {/* GitHub */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>

                <div className="relative">
                  <FaGithub
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username/project"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-gray-900 transition"
                  />
                </div>
              </div>

              {/* Info Card */}

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-sm font-medium text-gray-800">
                  💡 Project Tip
                </p>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                  Add a clear description, relevant technologies, and a working
                  demo to make your project more attractive to clients.
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              Footer
          ========================= */}

          <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50/50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition shadow-sm"
            >
              <Plus size={18} />
              <h2>{project ? "Edit Project" : "Add New Project"}</h2>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
