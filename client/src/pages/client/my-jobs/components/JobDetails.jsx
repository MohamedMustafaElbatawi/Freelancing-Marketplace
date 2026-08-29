import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Briefcase } from "lucide-react";

function JobDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const URL = import.meta.env.VITE_APP_SERVER_URL;

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const getJob = async () => {
    try {
      const response = await axios.get(`${URL}/api/job/${id}`, {
        withCredentials: true,
      });

      // console.log(response.data);

      setJob(response.data.job);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!job) {
    return <div className="p-10">Job Not Found</div>;
  }

  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      p-6
      md:p-10
    "
    >
      <div
        className="
        max-w-6xl
        mx-auto
      "
      >
        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="
          flex
          items-center
          cursor-pointer
          gap-2
          text-blue-600
          mb-6
          hover:text-blue-700
          "
        >
          <ArrowLeft size={18} />
          Back To Jobs
        </button>

        {/* Header Card */}

        <div
          className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          p-8
        "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row
            justify-between
            gap-5
          "
          >
            <div>
              <div
                className="
                flex
                items-center
                gap-3
                mb-3
              "
              >
                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-semibold
                  bg-emerald-100
                  text-emerald-700
                "
                >
                  {job.status}
                </span>

                <span
                  className="
                  flex
                  items-center
                  gap-1
                  text-gray-500
                  text-sm
                "
                >
                  <Briefcase size={16} />

                  {job.category}
                </span>
              </div>

              <h1
                className="
                text-3xl
                font-bold
                text-gray-900
              "
              >
                {job.jobTitle}
              </h1>

              <p
                className="
                text-gray-500
                mt-3
              "
              >
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}

        <div
          className="
          bg-white
          border
          rounded-2xl
          p-8
          mt-6
        "
        >
          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Description
          </h2>

          <p
            className="
            text-gray-600
            leading-8
          "
          >
            {job.description}
          </p>
        </div>

        {/* Skills */}

        <div
          className="
          bg-white
          border
          rounded-2xl
          p-8
          mt-6
        "
        >
          <h2
            className="
            text-xl
            font-bold
            mb-5
          "
          >
            Required Skills
          </h2>

          <div
            className="
            flex
            flex-wrap
            gap-3
          "
          >
            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="
                    px-4
                    py-2
                    rounded-full
                    bg-blue-50
                    text-blue-700
                    font-medium
                    "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 2 */}
        {/* Project Details */}

        <div
          className="
  bg-white
  border
  rounded-2xl
  p-8
  mt-6
  "
        >
          <h2
            className="
    text-xl
    font-bold
    mb-6
    "
          >
            Project Details
          </h2>

          <div
            className="
    grid
    md:grid-cols-2
    gap-6
    "
          >
            {/* Budget */}

            <div className="flex items-center gap-4">
              <div
                className="
        w-12
        h-12
        rounded-xl
        bg-green-50
        flex
        items-center
        justify-center
        text-green-600
        "
              >
                $
              </div>

              <div>
                <p className="text-sm text-gray-500">Budget</p>

                <h3 className="font-semibold text-gray-900">
                  {job.currency} {job.budget}
                </h3>
              </div>
            </div>

            {/* Payment Type */}

            <div className="flex items-center gap-4">
              <div
                className="
        w-12
        h-12
        rounded-xl
        bg-blue-50
        flex
        items-center
        justify-center
        text-blue-600
        "
              >
                💳
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment Type</p>

                <h3 className="font-semibold">{job.paymentType}</h3>
              </div>
            </div>

            {/* Experience */}

            <div className="flex items-center gap-4">
              <div
                className="
        w-12
        h-12
        rounded-xl
        bg-purple-50
        flex
        items-center
        justify-center
        "
              >
                🎯
              </div>

              <div>
                <p className="text-sm text-gray-500">Experience Level</p>

                <h3 className="font-semibold capitalize">
                  {job.experienceLevel}
                </h3>
              </div>
            </div>

            {/* Duration */}

            <div className="flex items-center gap-4">
              <div
                className="
        w-12
        h-12
        rounded-xl
        bg-orange-50
        flex
        items-center
        justify-center
        "
              >
                ⏱
              </div>

              <div>
                <p className="text-sm text-gray-500">Duration</p>

                <h3 className="font-semibold">{job.duration}</h3>
              </div>
            </div>

            {/* Commitment */}

            <div className="flex items-center gap-4">
              <div
                className="
        w-12
        h-12
        rounded-xl
        bg-yellow-50
        flex
        items-center
        justify-center
        "
              >
                👥
              </div>

              <div>
                <p className="text-sm text-gray-500">Commitment</p>

                <h3 className="font-semibold">{job.commitment}</h3>
              </div>
            </div>

            {/* Deadline */}

            <div className="flex items-center gap-4">
              <div
                className="
        w-12
        h-12
        rounded-xl
        bg-red-50
        flex
        items-center
        justify-center
        "
              >
                📅
              </div>

              <div>
                <p className="text-sm text-gray-500">Deadline</p>

                <h3 className="font-semibold">
                  {job.deadline
                    ? new Date(job.deadline).toLocaleDateString()
                    : "No deadline"}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Attachments */}

        <div
          className="
bg-white
border
rounded-2xl
p-8
mt-6
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            Attachments
          </h2>

          {job.attachments?.length > 0 ? (
            <div className="space-y-3">
              {job.attachments.map((file, index) => (
                <div
                  key={index}
                  className="
      flex
      items-center
      gap-3
      bg-gray-50
      p-3
      rounded-xl
      "
                >
                  📎
                  <span className="text-gray-700">
                    {file.split("\\").pop()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No attachments</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
