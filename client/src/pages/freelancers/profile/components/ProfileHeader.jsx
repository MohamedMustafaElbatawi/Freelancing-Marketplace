import axios from "axios";
import { MapPin, Briefcase, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ profile }) {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [previewImage, setPreviewImage] = useState(null);
  // console.log(profile);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Preview
    const preview = URL.createObjectURL(file);

    setPreviewImage(preview);

    try {
      const formData = new FormData();

      formData.append("profilePhoto", file);

      const response = await axios.patch(
        "http://localhost:5000/api/auth/profile/freelancer-photo",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Upload image error:", error);
    }
  };
  const navigate = useNavigate();
  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Cover */}
      <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600" />

      <div className="px-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row gap-5 -mt-16">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={
                  previewImage
                    ? previewImage
                    : `${SERVER_URL}/${profile.profilePhoto.replaceAll("\\", "/")}`
                }
                alt={profile.fullName}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />

              {/* Edit Image */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className=" cursor-pointer  absolute bottom-2 right-2 bg-white shadow-md rounded-lg p-2 hover:bg-gray-50 transition hover:scale-105 "
              >
                <Pencil size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Name + Info */}
            <div className="sm:pt-16">
              {/* Name */}
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.fullName}
                </h1>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    profile.isAvailable
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {profile.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>

              {/* Professional Title */}
              <p className="text-gray-600 mt-1">{profile.professionalTitle}</p>

              {/* Location + Experience */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {profile.location}
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase size={16} />
                  {profile.yearsOfExperience}+ Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            type="button"
            onClick={() => navigate("/complete-profile-freelancer")}
            className=" cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
}
