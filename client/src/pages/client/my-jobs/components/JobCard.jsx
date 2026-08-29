import axios from "axios";
import {
  Eye,
  Edit,
  Trash2,
  XCircle,
  CalendarDays,
  Users,
  DollarSign,
  RotateCcw,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const getDaysAgo = (date) => {
  const now = new Date();

  const created = new Date(date);

  const diff = now - created;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";

  if (days === 1) return "Yesterday";

  return `${days} days ago`;
};
function JobCard({ job, getMyJobs }) {
  const URL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();
  const statusStyle = {
    Published: "bg-emerald-100 text-emerald-700",
    Draft: "bg-amber-100 text-amber-700",
    Closed: "bg-gray-100 text-gray-700",
  };

  const [deleting, setDeleting] = useState(false);

  const handleDeleteJob = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await axios.delete(`${URL}/api/job/${job._id}`, {
        withCredentials: true,
      });

      alert("Job deleted successfully");
      window.location.reload();
      // navigate("/client/jobs");
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseJob = async () => {
    try {
      await axios.patch(
        `${URL}/api/job/${job._id}/close`,
        {},
        {
          withCredentials: true,
        },
      );

      getMyJobs();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  const handleReopenJob = async () => {
    try {
      await axios.patch(
        `${URL}/api/job/${job._id}/reopen`,
        {},
        {
          withCredentials: true,
        },
      );

      getMyJobs(); // تحديث القائمة
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  return (
    <div
      className="
      bg-white 
      border 
      border-gray-200 
      rounded-2xl 
      p-6 
      hover:shadow-lg 
      transition duration-300 hover:scale-[1.01]
      "
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-5 ">
        <div className="flex-1">
          {/* Status + Category */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`
                px-3 
                py-1 
                rounded-full 
                text-xs 
                font-semibold
                ${statusStyle[job.status]}
              `}
            >
              {job.status}
            </span>

            <span
              className="
              text-sm 
              text-gray-500
              flex
              items-center
              gap-1
            "
            >
              <Briefcase size={15} />
              {job.category}
            </span>

            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
              Posted {getDaysAgo(job.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
            text-xl 
            font-bold 
            text-gray-900
            mb-2
            "
          >
            {job.jobTitle}
          </h3>

          {/* Description */}
          <p
            className="
            text-gray-500
            text-sm
            max-w-3xl
            line-clamp-2
            break-words
            "
          >
            {job.description}
          </p>

          {/* Info */}
          <div
            className="
            flex
            flex-wrap
            gap-5
            mt-5
            text-sm
            text-gray-600
            "
          >
            <div className="flex items-center gap-2">
              <DollarSign size={17} />
              <span>{job.budget}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={17} />
              <span>{job.proposals} Proposals</span>
            </div>

            <div className="flex items-center gap-2">
              <Eye size={17} />
              <span>{job.views} Views</span>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2">
              <CalendarDays size={17} />

              <span>{new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}

        <div
          className="
          flex
          lg:flex-col
          gap-2
          lg:border-l
          lg:pl-5
          border-gray-200
          "
        >
          <button
            onClick={() => navigate(`/client/jobs/${job._id}`)}
            className="
            cursor-pointer
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-blue-600
            text-white
            hover:bg-blue-700
            transition
            "
          >
            <Eye size={17} />
            View
          </button>

          <button
            onClick={() => navigate(`/client/jobs/edit/${job._id}`)}
            className="
            flex
            cursor-pointer
            items-center
            justify-center
            gap-2
            px-4
            py-2
            rounded-xl
            border
            border-gray-200
            hover:bg-gray-50
            transition
            "
          >
            <Edit size={17} />
            Edit
          </button>

          {job.status === "Published" ? (
            <button
              onClick={handleCloseJob}
              className="
                flex
                cursor-pointer
                items-center
                justify-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-orange-600
                hover:bg-orange-50
                transition
                "
            >
              <XCircle size={17} />
              Close
            </button>
          ) : (
            <button
              onClick={handleReopenJob}
              className="
              cursor-pointer
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-green-600
                hover:bg-green-50
                transition
                "
            >
              <RotateCcw size={17} />
              Open
            </button>
          )}

          <button
            onClick={handleDeleteJob}
            disabled={deleting}
            className="
            cursor-pointer
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-2
            rounded-xl
            text-red-600
            hover:bg-red-50
            transition
            "
          >
            <Trash2 size={17} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
