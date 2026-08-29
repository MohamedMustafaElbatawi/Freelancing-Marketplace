import { projects } from "../../data/dashboardData";
import ProjectCard from "./ProjectCard";


export default function ActiveProjects(){

return (

<div className="bg-white border rounded-2xl shadow-sm overflow-hidden">


  {/* Header */}

  <div className="flex justify-between items-center px-6 py-5 border-b">


    <h3 className="text-xl font-bold">
      Active Projects
    </h3>


    <button className="text-blue-600 font-semibold text-sm">
      View All
    </button>


  </div>



  {/* Projects */}

  <div className="divide-y">


    {
      projects.map((project)=>(

        <ProjectCard
          key={project.id}
          {...project}
        />

      ))
    }


  </div>


</div>

)

}