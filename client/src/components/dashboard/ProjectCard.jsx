export default function ProjectCard({
  title,
  freelancer,
  skill,
  image,
  progress,
  deadline,
}) {

  return (
    <div className="p-6 hover:bg-gray-50 transition">


      {/* Header */}

      <div className="flex gap-4 items-center mb-5">


        <img
          src={image}
          alt={freelancer}
          className="w-12 h-12 rounded-xl object-cover"
        />


        <div className="flex-1">


          <div className="flex justify-between gap-3">

            <h4 className="font-bold text-gray-900">
              {title}
            </h4>


            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
              {deadline}
            </span>

          </div>


          <p className="text-sm text-gray-500 mt-1">
            Freelancer: {freelancer} ({skill})
          </p>


        </div>


      </div>



      {/* Progress */}


      <div>


        <div className="flex justify-between text-sm mb-2">

          <span className="font-medium">
            Progress
          </span>


          <span className="text-blue-600 font-bold">
            {progress}%
          </span>


        </div>


        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">


          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{
              width:`${progress}%`
            }}
          />


        </div>


      </div>


    </div>
  );
}