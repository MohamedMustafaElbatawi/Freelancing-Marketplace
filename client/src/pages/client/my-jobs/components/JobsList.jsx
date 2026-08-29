import JobCard from "./JobCard";

function JobsList({ jobs, getMyJobs }) {
  return (
    <div className="space-y-5">
      {jobs.map((job, index) => (
        <JobCard key={job._id} job={job} getMyJobs={getMyJobs} />
      ))}
    </div>
  );
}

export default JobsList;
