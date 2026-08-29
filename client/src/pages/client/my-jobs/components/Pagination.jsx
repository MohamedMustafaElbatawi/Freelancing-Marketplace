import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, setCurrentPage, totalJobs, jobsPerPage }) {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <div
      className="
      flex
      items-center
      justify-between
      mt-8
      border-t
      border-gray-200
      pt-6
      "
    >
      <p className="text-sm text-gray-500">
        Showing
        <span className="font-bold text-gray-900 mx-1">
          {(currentPage - 1) * jobsPerPage + 1}-
          {Math.min(currentPage * jobsPerPage, totalJobs)}
        </span>
        of
        <span className="font-bold text-gray-900 mx-1">{totalJobs}</span>
        jobs
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="
          w-10
          cursor-pointer
          h-10
          border
          rounded-xl
          flex
          items-center
          justify-center
          hover:bg-gray-50
          disabled:opacity-40
          "
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            // onClick={() => changePage(index + 1)}
            className={`
                w-10
                h-10
                rounded-xl
                font-semibold
                ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-50"
                }
                `}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="
          cursor-pointer
          w-10
          h-10
          border
          rounded-xl
          flex
          items-center
          justify-center
          hover:bg-gray-50
          disabled:opacity-40
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
