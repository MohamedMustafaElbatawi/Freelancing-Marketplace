import { useState } from "react";

export default function ProfilePhotoUpload({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
    onChange(file);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300">
      {/* Preview */}
      <label className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow cursor-pointer group">
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl text-slate-400">
            👤
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      <div className="text-center md:text-left">
        <h3 className="font-semibold text-slate-900">
          Profile Photo
        </h3>

        <p className="text-sm text-slate-500 mb-3">
          Upload a professional headshot. Max 5MB.
        </p>

        <label className="cursor-pointer text-indigo-600 font-semibold text-sm hover:underline">
          Upload Image

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}