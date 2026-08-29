import { Search, SlidersHorizontal } from "lucide-react";

function JobsFilters({ search, setSearch, status, setStatus, sort, setSort }) {
  return (
    <div
      className="
      bg-white
      border
      border-gray-200
      rounded-2xl
      p-5
      mb-8
      flex
      flex-col
      lg:flex-row
      gap-4
      lg:items-center
      lg:justify-between
      "
    >
      {/* Search */}

      <div
        className="
        relative
        w-full
        lg:max-w-md
        "
      >
        <Search
          size={20}
          className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full
          pl-10
          pr-4
          py-3
          rounded-xl
          border
          border-gray-200
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />
      </div>

      <div
        className="
        flex
        flex-col
        sm:flex-row
        gap-3
        "
      >
        {/* Status */}

        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          <SlidersHorizontal size={18} className="text-gray-500" />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
            border
            border-gray-200
            rounded-xl
            px-4
            py-3
            outline-none
            "
          >
            <option value="All">All Status</option>

            <option value="Published">Published</option>

            {/* <option value="Draft">Draft</option> */}

            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
          border
          border-gray-200
          rounded-xl
          px-4
          py-3
          outline-none
          "
        >
          <option value="newest">Newest</option>

          <option value="oldest">Oldest</option>

          <option value="proposals">Most Proposals</option>
        </select>
      </div>
    </div>
  );
}

export default JobsFilters;
