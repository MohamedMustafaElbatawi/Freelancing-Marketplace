import ProfilePhotoUpload from "./ProfilePhotoUpload";

export default function PersonalInfoStep({ formData, setFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Tell us about yourself
        </h2>

        <p className="text-sm sm:text-base text-slate-500">
          Let's start with the basics. Your profile helps freelancers know who
          they're talking to.
        </p>
      </header>

      <div className="space-y-6">
        <ProfilePhotoUpload
          onChange={(file) =>
            setFormData((prev) => ({
              ...prev,
              profilePhoto: file,
            }))
          }
        />
        {/*  Full Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Alexander Hamilton"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* About */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* phone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-slate-800"
            >
              {" "}
              Phone
            </label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 123-456-7890"
              id="phone"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 "
            />
          </div>
          {/* location */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-slate-800 "
            >
              {" "}
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              id="location"
              placeholder="e.g. New York, NY"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
