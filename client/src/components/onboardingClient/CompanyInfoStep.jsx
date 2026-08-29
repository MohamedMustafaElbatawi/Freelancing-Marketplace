import { useState } from "react";

export default function CompanyInfoStep({ formData, setFormData }) {
  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      companyLogo: file,
    }));

    setLogoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Organization Details
        </h2>

        <p className="text-sm sm:text-base text-slate-500">
          This information will be used for contracts and invoicing.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Acme Corp"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Industry
          </label>

          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="Software & Tech">Software & Tech</option>
            <option value="Fintech">Fintech</option>
            <option value="Healthcare">Healthcare</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Company Size */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Company Size
          </label>

          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="1-10 employees">1-10 employees</option>
            <option value="11-50 employees">11-50 employees</option>
            <option value="51-200 employees">51-200 employees</option>
            <option value="200+ employees">200+ employees</option>
          </select>
        </div>

        {/* Logo */}
        <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden flex items-center justify-center">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl">🏢</span>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Company Logo
              </h3>

              <p className="text-xs text-slate-500">Recommended 400x400px</p>
            </div>
          </div>

          <label className="cursor-pointer px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-100 transition">
            Select File
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
