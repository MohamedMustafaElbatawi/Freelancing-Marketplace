import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProfilePhotoUpload from "@/components/onboardingFreelancer/ProfilePhotoUpload";
import OnboardingSidebar from "@/components/onboardingFreelancer/OnboardingSidebar";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const initialFormData = {
  // Personal Information
  profilePhoto: null,
  fullName: "",
  phone: "",
  location: "",

  // Professional Information
  professionalTitle: "",
  skills: [],
  experienceLevel: "",
  yearsOfExperience: 0,
  hourlyRate: 25,

  // About & Portfolio
  bio: "",
  portfolio: "",
  github: "",
  linkedin: "",
};

const availableSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "TypeScript",
  "Next.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "UI/UX Design",
];

export default function CompleteFreelancerProfile() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(initialFormData);

  const [skillInput, setSkillInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const totalSteps = 3;

  const progress = currentStep === 4 ? 100 : (currentStep / totalSteps) * 100;

  // =========================
  // Handle Input Changes
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Add Skill
  // =========================

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();

    if (!trimmedSkill) return;

    if (formData.skills.includes(trimmedSkill)) {
      setSkillInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmedSkill],
    }));

    setSkillInput("");
  };

  // =========================
  // Remove Skill
  // =========================

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // =========================
  // Handle Skill Enter
  // =========================

  const handleSkillKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      addSkill(skillInput);
    }
  };

  // =========================
  // Validation
  // =========================

  const validateCurrentStep = () => {
    setError("");

    // Step 1
    if (currentStep === 1) {
      if (
        !formData.fullName.trim() ||
        !formData.phone.trim() ||
        !formData.location.trim()
      ) {
        setError("Please complete all personal information.");

        return false;
      }
    }

    // Step 2
    if (currentStep === 2) {
      if (!formData.professionalTitle.trim()) {
        setError("Please enter your professional title.");

        return false;
      }

      if (formData.skills.length === 0) {
        setError("Please add at least one skill.");

        return false;
      }

      if (!formData.experienceLevel) {
        setError("Please select your experience level.");

        return false;
      }

      if (
        formData.yearsOfExperience === "" ||
        Number(formData.yearsOfExperience) < 0
      ) {
        setError("Please enter your years of experience.");

        return false;
      }

      if (formData.hourlyRate === "" || Number(formData.hourlyRate) <= 0) {
        setError("Please enter a valid hourly rate.");

        return false;
      }
    }

    // Step 3
    if (currentStep === 3) {
      if (!formData.bio.trim()) {
        setError("Please tell clients something about yourself.");

        return false;
      }
    }

    return true;
  };

  // =========================
  // Next
  // =========================

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // =========================
  // Back
  // =========================

  const handleBack = () => {
    setError("");

    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // =========================
  // Skip
  // =========================

  const handleSkip = () => {
    navigate("/freelancer/dashboard");
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    try {
      setLoading(true);

      setError("");

      console.log("Final Freelancer Profile Data:", formData);

      const data = new FormData();

      // Personal Information
      data.append("fullName", formData.fullName);

      data.append("phone", formData.phone);

      data.append("location", formData.location);

      // Professional Information
      data.append("professionalTitle", formData.professionalTitle);

      data.append("skills", JSON.stringify(formData.skills));

      data.append("experienceLevel", formData.experienceLevel);

      data.append("yearsOfExperience", formData.yearsOfExperience);

      data.append("hourlyRate", formData.hourlyRate);

      // About
      data.append("bio", formData.bio);

      data.append("portfolio", formData.portfolio);

      data.append("github", formData.github);

      data.append("linkedin", formData.linkedin);

      // Profile Photo
      if (formData.profilePhoto) {
        data.append("profilePhoto", formData.profilePhoto);
      }

      const response = await axios.patch(
        `${SERVER_URL}/api/auth/profile/complete-freelancer`,
        data,
        {
          withCredentials: true,
        },
      );

      console.log("Complete Freelancer Profile Response:", response.data);

      setCurrentStep(4);
    } catch (error) {
      console.log(
        "Complete Freelancer Profile Error:",
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.message ||
          "Something went wrong while completing your profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Step 1
  // =========================

  const renderPersonalInfo = () => {
    return (
      <div className="space-y-8">
        <header>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Tell us about yourself
          </h2>

          <p className="text-sm sm:text-base text-slate-500">
            Start with the basics. This information helps clients get to know
            you.
          </p>
        </header>

        <div className="space-y-6">
          {/* Profile Photo */}
          <ProfilePhotoUpload
            onChange={(file) =>
              setFormData((prev) => ({
                ...prev,
                profilePhoto: file,
              }))
            }
          />

          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-slate-800"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Mohamed Elbatawi"
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Phone & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-800"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +20 100 123 4567"
                autoComplete="tel"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-slate-800"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Cairo, Egypt"
                autoComplete="address-level2"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =========================
  // Step 2
  // =========================

  const renderProfessionalInfo = () => {
    return (
      <div className="space-y-8">
        <header>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Tell us about your expertise
          </h2>

          <p className="text-sm sm:text-base text-slate-500">
            Help clients understand your skills and professional experience.
          </p>
        </header>

        <div className="space-y-6">
          {/* Professional Title */}
          <div className="space-y-2">
            <label
              htmlFor="professionalTitle"
              className="block text-sm font-semibold text-slate-800"
            >
              Professional Title
            </label>

            <input
              id="professionalTitle"
              type="text"
              name="professionalTitle"
              value={formData.professionalTitle}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <label
              htmlFor="skills"
              className="block text-sm font-semibold text-slate-800"
            >
              Skills
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="skills"
                type="text"
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g. React"
                className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Add Skill
              </button>
            </div>

            {/* Suggested Skills */}
            <div className="flex flex-wrap gap-2">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  disabled={formData.skills.includes(skill)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                    formData.skills.includes(skill)
                      ? "bg-indigo-50 text-indigo-600 border-indigo-200 cursor-not-allowed"
                      : "bg-white text-slate-600 border-slate-300 hover:border-indigo-500 hover:text-indigo-600"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* Selected Skills */}
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-medium"
                  >
                    <span>{skill}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-indigo-500 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experience & Years */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Experience Level */}
            <div className="space-y-2">
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-semibold text-slate-800"
              >
                Experience Level
              </label>

              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">Select your level</option>

                <option value="beginner">Beginner</option>

                <option value="intermediate">Intermediate</option>

                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Years */}
            <div className="space-y-2">
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-semibold text-slate-800"
              >
                Years of Experience
              </label>

              <input
                id="yearsOfExperience"
                type="number"
                name="yearsOfExperience"
                min="0"
                max="50"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="space-y-2">
            <label
              htmlFor="hourlyRate"
              className="block text-sm font-semibold text-slate-800"
            >
              Hourly Rate
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                $
              </span>

              <input
                id="hourlyRate"
                type="number"
                name="hourlyRate"
                min="1"
                value={formData.hourlyRate}
                onChange={handleChange}
                className="w-full pl-9 pr-20 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                / hour
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =========================
  // Step 3
  // =========================

  const renderAbout = () => {
    return (
      <div className="space-y-8">
        <header>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Tell clients about yourself
          </h2>

          <p className="text-sm sm:text-base text-slate-500">
            Share more about your experience and showcase your professional
            work.
          </p>
        </header>

        <div className="space-y-6">
          {/* Bio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-slate-800"
              >
                About You
              </label>

              <span className="text-xs text-slate-500">
                {formData.bio.length}/500
              </span>
            </div>

            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              maxLength={500}
              rows={6}
              placeholder="Tell clients about your experience, your expertise, and the value you can provide..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none resize-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Portfolio */}
          <div className="space-y-2">
            <label
              htmlFor="portfolio"
              className="block text-sm font-semibold text-slate-800"
            >
              Portfolio Website
            </label>

            <input
              id="portfolio"
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* GitHub */}
          <div className="space-y-2">
            <label
              htmlFor="github"
              className="block text-sm font-semibold text-slate-800"
            >
              GitHub Profile
            </label>

            <input
              id="github"
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <label
              htmlFor="linkedin"
              className="block text-sm font-semibold text-slate-800"
            >
              LinkedIn Profile
            </label>

            <input
              id="linkedin"
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>
    );
  };

  // =========================
  // Step 4
  // =========================

  const renderSuccess = () => {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl">✓</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Profile Completed!
          </h2>

          <p className="text-slate-500 max-w-md">
            Your freelancer profile is ready. Clients can now discover your
            skills and professional experience.
          </p>
        </div>

        <button
          onClick={() => navigate("/freelancer/dashboard")}
          className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Go to Freelancer Dashboard
        </button>
      </div>
    );
  };

  // =========================
  // Render Current Step
  // =========================

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();

      case 2:
        return renderProfessionalInfo();

      case 3:
        return renderAbout();

      case 4:
        return renderSuccess();

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#fcf8ff] px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
        {/* Sidebar */}
        <OnboardingSidebar currentStep={currentStep} />

        {/* Main Content */}
        <section className="relative flex-1 min-w-0 rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <div
              className="h-full bg-indigo-600 transition-all duration-700 ease-in-out"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="p-6 sm:p-8 lg:p-12 min-h-[600px] flex flex-col">
            {/* Content */}
            <div className="flex-1">{renderCurrentStep()}</div>

            {/* Error */}
            {error && currentStep !== 4 && (
              <p className="mt-6 text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Footer */}
            {currentStep !== 4 && (
              <footer className="mt-10 pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Back */}
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition ${
                    currentStep === 1
                      ? "invisible"
                      : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                  }`}
                >
                  ← Back
                </button>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSkip}
                    className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition"
                  >
                    Skip for now
                  </button>

                  <button
                    onClick={currentStep === 3 ? handleSubmit : handleNext}
                    disabled={loading}
                    className="px-7 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      "Saving..."
                    ) : (
                      <>
                        <span>
                          {currentStep === 3 ? "Complete Profile" : "Continue"}
                        </span>

                        {currentStep < 3 && <span>→</span>}
                      </>
                    )}
                  </button>
                </div>
              </footer>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
