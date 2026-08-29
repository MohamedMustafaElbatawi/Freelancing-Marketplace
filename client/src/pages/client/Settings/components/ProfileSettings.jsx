import { useEffect, useState } from "react";
import { Camera, Upload, Trash2, Globe, UserRound } from "lucide-react";
import axios from "axios";

export default function ProfileSettings() {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    industry: "",
    website: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    // نخزن الملف الحقيقي
    setProfileFile(file);

    // نعمل Preview للصورة
    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };
  const handleRemoveImage = async () => {
    try {
      // لو صورة جديدة ولسه ما اترفعتش
      if (profileFile) {
        setProfileImage(null);
        setProfileFile(null);
        return;
      }

      // حذف الصورة المحفوظة في السيرفر
      const response = await axios.delete(
        `${SERVER_URL}/api/client/profile/photo`,
        {
          withCredentials: true,
        },
      );

      setProfileImage(null);
      setProfileFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("companyName", formData.companyName);
      data.append("industry", formData.industry);
      data.append("website", formData.website);
      data.append("bio", formData.bio);

      if (profileFile) {
        data.append("profilePhoto", profileFile);
      }

      const response = await axios.put(
        `${SERVER_URL}/api/client/update/profile`,
        data,
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/client/profile`, {
          withCredentials: true,
        });
        setFormData({
          fullName: response.data.user.fullName || "",
          email: response.data.user.email || "",
          companyName: response.data.user.companyName || "",
          industry: response.data.user.industry || "",
          website: response.data.user.website || "",
          bio: response.data.user.bio || "",
        });

        // const imagePath = response.data.user.profilePhoto?.replaceAll(
        //   "\\",
        //   "/",
        // );
        // if (imagePath) {
        //   setProfileImage(`${SERVER_URL}/${imagePath.replaceAll("\\", "/")}`);
        // } else {
        //   setProfileImage(null);
        const imagePath = response.data.user.profilePhoto;

        if (imagePath) {
          if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
          ) {
            setProfileImage(imagePath);
          } else {
            setProfileImage(
              `${SERVER_URL}/${imagePath
                .replaceAll("\\", "/")
                .replace(/^\/+/, "")}`,
            );
          }
        } else {
          setProfileImage(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>

        <p className="mt-1 text-sm text-gray-500">
          Update your public profile and personal information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Profile Photo */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative group shrink-0">
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover "
                />
              ) : (
                <UserRound size={38} className="text-gray-400  " />
              )}
            </div>

            {/* Camera Button */}
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition"
            >
              <Camera size={16} />

              <input
                id="profileImage"
                type="file"
                accept="image/png,image/jpeg,image/gif"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">
              Your Profile Photo
            </p>

            <p className="text-sm text-gray-500 mt-1 mb-3">
              JPG, GIF or PNG. Max size of 2MB.
            </p>

            <div className="flex flex-wrap gap-2">
              <label
                htmlFor="profileImage"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                <Upload size={16} />
                Upload New
              </label>

              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className=" cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-900"
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none  transition-all duration-200   focus:outline-none  focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none transition-all duration-200   focus:outline-none  focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="block text-sm font-semibold text-gray-900"
            >
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none transition-all duration-200   focus:outline-none  focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg"
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label
              htmlFor="industry"
              className="block text-sm font-semibold text-gray-900"
            >
              Industry
            </label>

            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none transition-all duration-200   focus:outline-none  focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg"
            >
              <option value="Software Development">Software Development</option>

              <option value="Fintech">Fintech</option>

              <option value="E-commerce">E-commerce</option>

              <option value="HealthTech">HealthTech</option>

              <option value="SaaS">SaaS</option>

              <option value="Marketing">Marketing</option>

              <option value="Education">Education</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* Website */}
          <div className="md:col-span-2 space-y-2">
            <label
              htmlFor="website"
              className="block text-sm font-semibold text-gray-900"
            >
              Website
            </label>

            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                <Globe size={16} />
              </span>

              <input
                id="website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                placeholder="yourwebsite.com"
                className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 bg-white text-sm outline-none transition-all duration-200   focus:outline-none  focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-gray-900"
              >
                Bio
              </label>

              <span
                className={`text-xs ${
                  formData.bio.length > 500 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {formData.bio.length} / 500
              </span>
            </div>

            <textarea
              id="bio"
              name="bio"
              rows="5"
              maxLength="500"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none resize-none transition-all duration-200   focus:outline-none  focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-7 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
