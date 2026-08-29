import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFolderOpen, FaGithub } from "react-icons/fa";
import AddProjectModal from "./components/AddProjectModal";
import axios from "axios";

// const projects = [
//   {
//     id: 1,
//     title: "Travel Booking Platform",
//     description:
//       "A full-stack travel booking platform where users can search and book hotels and manage their reservations.",
//     technologies: ["React", "Node.js", "MongoDB"],
//     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//     liveUrl: "#",
//     githubUrl: "#",
//   },
//   {
//     id: 2,
//     title: "Freelancing Marketplace",
//     description:
//       "A freelancing platform connecting clients with freelancers to post jobs, submit proposals and manage projects.",
//     technologies: ["React", "Express", "MongoDB"],
//     image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
//     liveUrl: "#",
//     githubUrl: "#",
//   },
//   {
//     id: 3,
//     title: "Dashboard System",
//     description:
//       "A modern responsive dashboard with statistics, charts, notifications and user management.",
//     technologies: ["React", "Tailwind CSS"],
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
//     liveUrl: "#",
//     githubUrl: "#",
//   },
// ];

export default function FreelancerProjects() {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    return `${SERVER_URL}/${imagePath
      .replaceAll("\\", "/")
      .replace(/^\/+/, "")}`;
  };
  const [showAddModal, setShowAddModal] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loaging, setLoading] = useState(false);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${SERVER_URL}/api/freelancer/projects`,
          {
            withCredentials: true,
          },
        );

        if (response.data.projects) {
          setProjects(response.data.projects);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // delete
  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`${SERVER_URL}/api/freelancer/projects/${projectId}`, {
        withCredentials: true,
      });
      setProjects((pro) => pro.filter((project) => project._id !== projectId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((project) =>
        project._id === updatedProject._id ? updatedProject : project,
      ),
    );
  };
  if (loaging) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ================= Header ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage and showcase your projects
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProject(null);
            setShowProjectModal(true);
          }}
          className=" cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* ================= Projects ================= */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 mt-5">
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900"
                  >
                    <FaGithub size={16} />
                    GitHub
                  </a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowProjectModal(true);
                    }} // onClick={() => updateProject(project._id)}
                    className=" cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProject(project._id)}
                    className=" cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= Empty State ================= */
        <div className="bg-white rounded-2xl border border-gray-200 py-16 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center">
            <FaFolderOpen size={26} className="text-gray-500" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mt-4">
            No Projects Yet
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Start adding your projects to showcase your work.
          </p>

          <button
            onClick={() => {
              setSelectedProject(null);
              setShowProjectModal(true);
            }}
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            Add Your First Project
          </button>
        </div>
      )}
      {showProjectModal && (
        <AddProjectModal
          project={selectedProject}
          onClose={() => {
            setShowProjectModal(false);
            setSelectedProject(null);
          }}
          onAdd={(newProject) => {
            setProjects((prev) => [newProject, ...prev]);

            setShowProjectModal(false);
            setSelectedProject(null);
          }}
          onUpdated={(updatedProject) => {
            setProjects((prev) =>
              prev.map((project) =>
                project._id === updatedProject._id ? updatedProject : project,
              ),
            );

            setShowProjectModal(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}
