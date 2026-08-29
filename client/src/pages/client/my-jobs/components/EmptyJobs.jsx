import { BriefcaseBusiness, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


function EmptyJobs() {

  const navigate = useNavigate();


  return (
    <div
      className="
      bg-white
      border
      border-gray-200
      rounded-2xl
      py-16
      flex
      flex-col
      items-center
      justify-center
      text-center
      "
    >

      <div
        className="
        w-16
        h-16
        rounded-full
        bg-blue-50
        flex
        items-center
        justify-center
        mb-5
        "
      >

        <BriefcaseBusiness
          size={32}
          className="text-blue-600"
        />

      </div>


      <h3
        className="
        text-xl
        font-bold
        text-gray-900
        "
      >
        No jobs posted yet
      </h3>


      <p
        className="
        text-gray-500
        mt-2
        max-w-md
        "
      >
        Start hiring talented freelancers by creating your first job post.
      </p>



      <button
        onClick={()=>navigate("/client/post-job")}
        className="
        mt-6
        flex
        items-center
        gap-2
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        py-3
        rounded-xl
        transition
        "
      >

        <Plus size={20}/>

        Post Your First Job

      </button>


    </div>
  );
}


export default EmptyJobs;