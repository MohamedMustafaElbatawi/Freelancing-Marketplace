import { Plus } from "lucide-react";

function JobsHeader() {
  return (
    <div
      className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-4
      mb-8
      "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
          text-gray-900
          "
        >
          My Jobs
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Manage your job postings and review freelancer proposals.
        </p>
      </div>
    </div>
  );
}

export default JobsHeader;
