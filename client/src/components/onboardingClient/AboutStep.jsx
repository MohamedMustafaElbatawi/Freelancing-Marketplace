export default function AboutStep({ formData, setFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}{" "}
      <header>
        {" "}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
          Final Touches{" "}
        </h2>
        <p className="text-sm sm:text-base text-slate-500">
          Tell us more about yourself and add links where people can learn more
          about you.
        </p>
      </header>
      <div className="space-y-3">
        {/* Bio */}
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-sm font-semibold text-slate-800"
          >
            About You
          </label>

          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength={500}
            rows={5}
            placeholder="Tell us about yourself, your company, your experience, or what you are looking for..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 resize-none outline-none transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          />

          <p className="text-right text-xs text-slate-500">
            {formData.bio?.length || 0} / 500 characters
          </p>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <label
            htmlFor="website"
            className="block text-sm font-semibold text-slate-800"
          >
            Website
            <span className="ml-2 text-xs font-normal text-slate-400">
              Optional
            </span>
          </label>

          <input
            id="website"
            type="url"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Portfolio */}
        <div className="space-y-2">
          <label
            htmlFor="portfolio"
            className="block text-sm font-semibold text-slate-800"
          >
            Portfolio
            <span className="ml-2 text-xs font-normal text-slate-400">
              Optional
            </span>
          </label>

          <input
            id="portfolio"
            type="url"
            name="portfolio"
            value={formData.portfolio || ""}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Social Links */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/* LinkedIn */}
        <div className="space-y-2">
          <label
            htmlFor="linkedin"
            className="block text-sm font-semibold text-slate-800"
          >
            LinkedIn
            <span className="ml-2 text-xs font-normal text-slate-400">
              Optional
            </span>
          </label>

          <input
            id="linkedin"
            type="url"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* GitHub */}
        {/* <div className="space-y-2">
            <label
              htmlFor="github"
              className="block text-sm font-semibold text-slate-800"
            >
              GitHub
              <span className="ml-2 text-xs font-normal text-slate-400">
                Optional
              </span>
            </label>

            <input
              id="github"
              type="url"
              name="github"
              value={formData.github|| ""}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div> */}

        {/* </div> */}
      </div>
    </div>
  );
}
