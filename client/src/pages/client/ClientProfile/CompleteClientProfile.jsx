import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OnboardingSidebar from "../../../components/onboardingClient/OnboardingSidebar";
import PersonalInfoStep from "../../../components/onboardingClient/PersonalInfoStep";
import CompanyInfoStep from "../../../components/onboardingClient/CompanyInfoStep";
import AboutStep from "../../../components/onboardingClient/AboutStep";
import SuccessStep from "../../../components/onboardingClient/SuccessStep";
const apiUrl = import.meta.env.VITE_API_URL;
const initialFormData = {
  profilePhoto: null,
  fullName: "",
  phone: "",
  location: "",

  companyName: "",
  industry: "Software & Tech",
  companySize: "1-10 employees",
  companyLogo: null,

  bio: "",

  website: "",
  linkedin: "",
  github: "",
};

export default function CompleteProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3;

  const progress = currentStep === 4 ? 100 : (currentStep / totalSteps) * 100;

  // علشان المستخدم يملي الحقول
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim() || !formData.phone.trim()) {
        alert("Please enter your full name and phone number");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!formData.companyName.trim()) {
        alert("Please enter your company name");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(4);
  };

  // const handleSubmit = async () => {
  const handleSubmit = async () => {
    try {
      console.log("Final Profile Data:", formData);

      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("companyName", formData.companyName);
      data.append("industry", formData.industry);
      data.append("companySize", formData.companySize);
      data.append("bio", formData.bio);
      data.append("website", formData.website);
      data.append("portfolio", formData.portfolio);
      data.append("linkedin", formData.linkedin);
      data.append("github", formData.github);

      if (formData.profilePhoto) {
        data.append("profilePhoto", formData.profilePhoto);
      }

      if (formData.companyLogo) {
        data.append("companyLogo", formData.companyLogo);
      }

      const response = await axios.patch(`${apiUrl}/profile/complete`, data, {
        withCredentials: true,
      });

      console.log("Complete Profile Response:", response.data);

      const user = response.data.user;

      if (user.role === "client") {
        navigate("/client/dashboard");
      } else if (user.role === "freelancer") {
        navigate("/freelancer/dashboard");
      }
      setCurrentStep(4);
    } catch (error) {
      console.log(
        "Complete Profile Error:",
        error.response?.data || error.message,
      );
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep formData={formData} setFormData={setFormData} />
        );

      case 2:
        return (
          <CompanyInfoStep formData={formData} setFormData={setFormData} />
        );

      case 3:
        return <AboutStep formData={formData} setFormData={setFormData} />;

      case 4:
        return (
          <SuccessStep onDashboard={() => navigate("/client/dashboard")} />
        );

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
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6 sm:p-8 lg:p-12 min-h-[600px] flex flex-col">
            {/* Content */}
            <div className="flex-1">{renderCurrentStep()}</div>

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
                    className="px-7 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>
                      {currentStep === 3 ? "Complete Profile" : "Continue"}
                    </span>

                    {currentStep < 3 && <span>→</span>}
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
