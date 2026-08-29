import { useEffect, useState } from "react";

import axios from "axios";
import JobsHeader from "./components/JobsHeader";
import JobsFilters from "./components/JobsFilters";
import JobsList from "./components/JobsList";
import EmptyJobs from "./components/EmptyJobs";
import Pagination from "./components/Pagination";

import { jobsData } from "@/data/jobsData";

function MyJobs() {
  const URL = import.meta.env.VITE_APP_SERVER_URL;

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 6;
  //   const [jobs, setJobs] = useState(jobsData);
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  // Filtering

  let filteredJobs = jobs.filter((job) => {
    const matchSearch = job.jobTitle
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "All" || job.status === status;

    return matchSearch && matchStatus;
  });
  const indexOfLastJob = currentPage * jobsPerPage;

  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Sorting

  if (sort === "proposals") {
    filteredJobs.sort((a, b) => b.proposals - a.proposals);
  }

  if (sort === "oldest") {
    filteredJobs.reverse();
  }

  const getMyJobs = async () => {
    try {
      const response = await axios.get(`${URL}/api/job/myJobs`, {
        withCredentials: true,
      });

      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      p-6
      md:p-8
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        "
      >
        {/* Header */}
        <JobsHeader />

        {/* Filters */}
        <JobsFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
        />

        {filteredJobs.length > 0 ? (
          <>
            <JobsList jobs={currentJobs} getMyJobs={getMyJobs} />

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalJobs={filteredJobs.length}
              jobsPerPage={jobsPerPage}
            />
          </>
        ) : (
          <EmptyJobs />
        )}
      </div>
    </div>
  );
}

export default MyJobs;
