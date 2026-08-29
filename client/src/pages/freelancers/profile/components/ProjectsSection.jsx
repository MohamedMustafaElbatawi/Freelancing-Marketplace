import { ExternalLink } from "lucide-react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProjectsSection({ projects, loading, profile }) {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>

        <button
          onClick={() => navigate("/freelancer/projects")}
          className=" cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <div
            key={project._id}
            // key={project.title}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
          >
            <img
              src={
                project.image
                  ? `${SERVER_URL}/${project.image.replaceAll("\\", "/")} `
                  : "/placeholder-project.png"
              }
              alt={project.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-gray-900">{project.title}</h3>

              <p className="text-sm text-gray-500 mt-2 leading-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md word-break-all whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* <div className="flex gap-4 mt-5">
                <a
                  href="#"
                  className="flex items-center gap-1 text-sm text-indigo-600 font-medium"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>

                <a
                  href={profile.github}
                  className="flex items-center gap-1 text-sm text-gray-700 font-medium"
                >
                  <FaGithub size={15} />
                  GitHub
                </a>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
