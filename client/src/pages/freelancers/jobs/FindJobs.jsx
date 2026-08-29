import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  BriefcaseBusiness,
  Filter,
  Check,
  Sparkles,
} from "lucide-react";

import FilterSelect from "./components/FilterSelect";
import JobCard from "./components/JobCard";
import EmptyJobs from "./components/EmptyJobs";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

/*
|--------------------------------------------------------------------------
| Backend values
|--------------------------------------------------------------------------
*/

const categories = [
  "All Categories",
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Web Design",
  "Database",
];

const experiences = ["All Levels", "Entry Level", "Intermediate", "Expert"];

const projectTypes = ["All Types", "Short Term", "Long Term"];

const paymentTypes = ["All Payment Types", "Fixed", "Hourly"];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

// Frontend text -> Backend value
const experienceToBackend = {
  "Entry Level": "entry",
  Intermediate: "intermediate",
  Expert: "expert",
};

const projectTypeToBackend = {
  "Short Term": "one-time",
  "Long Term": "ongoing",
};

const paymentTypeToBackend = {
  Fixed: "Fixed Price",
  Hourly: "Hourly Rate",
};

function FindJobs() {
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All Categories");

  const [experience, setExperience] = useState("All Levels");

  const [projectType, setProjectType] = useState("All Types");

  const [paymentType, setPaymentType] = useState("All Payment Types");

  const [sortBy, setSortBy] = useState("Newest");

  const [showFilters, setShowFilters] = useState(false);

  const [savedJobs, setSavedJobs] = useState([]);

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalJobs: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  /*
  |--------------------------------------------------------------------------
  | Get Jobs
  |--------------------------------------------------------------------------
  */

  const getJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: currentPage,
        limit: 10,
      };

      /*
      |--------------------------------------------------------------------------
      | Search
      |--------------------------------------------------------------------------
      */

      if (search.trim()) {
        params.search = search.trim();
      }

      /*
      |--------------------------------------------------------------------------
      | Category
      |--------------------------------------------------------------------------
      */

      if (category !== "All Categories") {
        params.category = category;
      }

      /*
      |--------------------------------------------------------------------------
      | Experience
      |--------------------------------------------------------------------------
      */

      if (experience !== "All Levels") {
        params.experienceLevel = experienceToBackend[experience];
      }

      /*
      |--------------------------------------------------------------------------
      | Project Type
      |--------------------------------------------------------------------------
      */

      if (projectType !== "All Types") {
        params.projectType = projectTypeToBackend[projectType];
      }

      /*
      |--------------------------------------------------------------------------
      | Payment Type
      |--------------------------------------------------------------------------
      */

      if (paymentType !== "All Payment Types") {
        params.paymentType = paymentTypeToBackend[paymentType];
      }

      /*
      |--------------------------------------------------------------------------
      | Sort
      |--------------------------------------------------------------------------
      */

      if (sortBy === "Newest") {
        params.sort = "newest";
      }

      if (sortBy === "Oldest") {
        params.sort = "oldest";
      }

      if (sortBy === "Most Proposals") {
        params.sort = "mostProposals";
      }

      if (sortBy === "Most Views") {
        params.sort = "mostViews";
      }

      /*
      |--------------------------------------------------------------------------
      | API Request
      |--------------------------------------------------------------------------
      */

      const response = await axios.get(`${SERVER_URL}/api/jobs`, {
        withCredentials: true,
        params,
      });

      setJobs(response.data.jobs || []);

      setPagination(
        response.data.pagination || {
          currentPage: 1,
          itemsPerPage: 10,
          totalJobs: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      );
    } catch (error) {
      console.error("GET JOBS ERROR:", error);

      setJobs([]);

      setError(error.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch jobs
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    getJobs();
  }, [
    currentPage,
    search,
    category,
    experience,
    projectType,
    paymentType,
    sortBy,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Save Job
  |--------------------------------------------------------------------------
  */

  const toggleSaveJob = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id],
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Clear Filters
  |--------------------------------------------------------------------------
  */

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setExperience("All Levels");
    setProjectType("All Types");
    setPaymentType("All Payment Types");
    setSortBy("Newest");
    setCurrentPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Change Page
  |--------------------------------------------------------------------------
  */

  const changePage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* =========================================================
          Header
      ========================================================= */}

      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Title */}

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <Sparkles size={16} />
                Discover opportunities
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Find Jobs
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                Find the right projects, showcase your skills, and grow your
                freelance career.
              </p>
            </div>

            {/* Available Jobs */}

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Available Jobs
                </p>

                <p className="font-bold">{pagination.totalJobs} jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          Main
      ========================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =======================================================
            Search
        ======================================================= */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search Input */}

            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search jobs, skills, or keywords..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            {/* Mobile Filters */}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 lg:hidden"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            {/* Sort */}

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium outline-none dark:border-slate-700 dark:bg-slate-950 lg:w-52"
              >
                <option>Newest</option>

                <option>Oldest</option>

                <option>Most Proposals</option>

                <option>Most Views</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            Content Grid
        ======================================================= */}

        <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
          {/* =====================================================
              Filters
          ===================================================== */}

          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-indigo-500" />

                  <h2 className="font-bold">Filters</h2>
                </div>

                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Clear
                </button>
              </div>

              {/* Category */}

              <FilterSelect
                label="Category"
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  setCurrentPage(1);
                }}
                options={categories}
              />

              {/* Experience */}

              <FilterSelect
                label="Experience Level"
                value={experience}
                onChange={(value) => {
                  setExperience(value);
                  setCurrentPage(1);
                }}
                options={experiences}
              />

              {/* Project Type */}

              <FilterSelect
                label="Project Type"
                value={projectType}
                onChange={(value) => {
                  setProjectType(value);
                  setCurrentPage(1);
                }}
                options={projectTypes}
              />

              {/* Payment Type */}

              <FilterSelect
                label="Payment Type"
                value={paymentType}
                onChange={(value) => {
                  setPaymentType(value);
                  setCurrentPage(1);
                }}
                options={paymentTypes}
              />
            </div>
          </aside>

          {/* =====================================================
              Jobs
          ===================================================== */}

          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {pagination.totalJobs} Available Jobs
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Find projects that match your skills
                </p>
              </div>

              <div className="hidden items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex">
                <Check size={16} className="text-emerald-500" />
                Updated recently
              </div>
            </div>

            {/* ===================================================
                Loading
            =================================================== */}

            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  />
                ))}
              </div>
            )}

            {/* ===================================================
                Error
            =================================================== */}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
                <h3 className="font-bold text-red-600 dark:text-red-400">
                  Failed to load jobs
                </h3>

                <p className="mt-2 text-sm text-red-500">{error}</p>

                <button
                  onClick={getJobs}
                  className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* ===================================================
                Jobs List
            =================================================== */}

            {!loading && !error && jobs.length > 0 && (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    saved={savedJobs.includes(job._id)}
                    onSave={() => toggleSaveJob(job._id)}
                  />
                ))}
              </div>
            )}

            {/* ===================================================
                Empty
            =================================================== */}

            {!loading && !error && jobs.length === 0 && (
              <EmptyJobs onClear={clearFilters} />
            )}

            {/* ===================================================
                Pagination
            =================================================== */}

            {!loading && !error && pagination.totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {Array.from(
                  {
                    length: pagination.totalPages,
                  },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                        : "border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default FindJobs;
