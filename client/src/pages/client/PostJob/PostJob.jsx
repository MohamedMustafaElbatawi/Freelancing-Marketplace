import React, { useState } from "react";
import BasicInfo from "@/pages/client/PostJob/components/BasicInfo";
import axios from "axios";
import SkillsInfo from "@/pages/client/PostJob/components/SkillsInfo";
import BudgetInfo from "@/pages/client/PostJob/components/BudgetInfo";
import DetailsInfo from "@/pages/client/PostJob/components/DetailsInfo";
import ReviewInfo from "@/pages/client/PostJob/components/ReviewInfo";

const postJob = {
  jobTitle: "",
  category: "",
  description: "",

  skills: [],
  paymentType: "Fixed Price",
  currency: "USD",
  budget: "",
  duration: "",
  commitment: "",

  deadline: "",
  experienceLevel: "entry",
  projectType: "one-time",
  attachments: [],
};
const templates = [
  {
    title: "Product Designer",
    jobTitle: "Senior Product Designer",
    category: "ui-ux",
    description:
      "We are looking for an experienced Product Designer to create intuitive user experiences, wireframes, prototypes, and high-fidelity UI designs.",
  },
  {
    title: "React Developer",
    jobTitle: "React Frontend Developer",
    category: "web-development",
    description:
      "We are looking for a React developer with experience in React, Tailwind CSS, REST APIs, and modern frontend development.",
  },
];

function PostJob() {
  const URL = import.meta.env.VITE_APP_SERVER_URL;

  const [formData, setFormData] = useState(postJob);

  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 5;

  const progress = currentStep === 5 ? 100 : (currentStep / totalSteps) * 100;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyTemplate = (template) => {
    setFormData((prev) => ({
      ...prev,
      jobTitle: template.jobTitle,
      category: template.category,
      description: template.description,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublishJob = async () => {
    try {
      const data = new FormData();

      data.append("jobTitle", formData.jobTitle);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("skills", JSON.stringify(formData.skills));
      data.append("paymentType", formData.paymentType);
      data.append("currency", formData.currency);
      data.append("budget", formData.budget);
      data.append("duration", formData.duration);
      data.append("commitment", formData.commitment);
      data.append("deadline", formData.deadline);
      data.append("experienceLevel", formData.experienceLevel);
      data.append("projectType", formData.projectType);
      data.append("status", "Published");
      // الملفات
      formData.attachments.forEach((file) => {
        data.append("attachments", file);
      });

      const response = await axios.post(`${URL}/api/job`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Job Published Response:", response.data);
      // setCurrentStep(6);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            templates={templates}
            applyTemplate={applyTemplate}
          />
        );

      case 2:
        return <SkillsInfo formData={formData} setFormData={setFormData} />;

      case 3:
        return <BudgetInfo formData={formData} setFormData={setFormData} />;

      case 4:
        return <DetailsInfo formData={formData} setFormData={setFormData} />;

      case 5:
        return (
          <ReviewInfo
            formData={formData}
            setStep={setCurrentStep}
            handlePublishJob={handlePublishJob}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="md:px-1">
      {/* top */}
      <div className="">
        <div className="flex justify-between">
          <div className=" md:text-2xl text-1xl font-bold ">
            {" "}
            Step {currentStep}: Post a Job
          </div>
          <div className=" md:text-2xl text-1xl font-bold">
            {" "}
            {currentStep}/5 Steps
          </div>
        </div>

        <div className="mt-5">
          <div className="w-full h-2 bg-gray-200">
            <div
              className="w-1/5 h-2 bg-indigo-600"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <h1
              className={` font-bold md:text-lg text-sm ${currentStep > 0 ? "text-indigo-600" : "text-gray-400"}   `}
            >
              BASICS
            </h1>
            <h1
              className={` font-bold md:text-lg text-sm ${currentStep > 1 ? "text-indigo-600" : "text-gray-400"}   `}
            >
              SKILLS
            </h1>
            <h1
              className={` font-bold md:text-lg text-sm ${currentStep > 2 ? "text-indigo-600" : "text-gray-400"}   `}
            >
              BUDGET
            </h1>
            <h1
              className={` font-bold md:text-lg text-sm ${currentStep > 3 ? "text-indigo-600" : "text-gray-400"}   `}
            >
              DETAILS
            </h1>
            <h1
              className={` font-bold md:text-lg text-sm ${currentStep > 4 ? "text-indigo-600" : "text-gray-400"}   `}
            >
              REVIEW
            </h1>
          </div>
        </div>
      </div>

      {/* BasicInfo */}
      <div className="  lg:p-6 sm:p-8 lg:p-12 min-h-[600px] flex flex-col">
        {/* Content */}
        <div className="flex-1">{renderCurrentStep()}</div>

        {/* footer-buttons */}
        {currentStep !== 5 && (
          <footer className="mt-10 flex items-center justify-between bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            {/* Back */}
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                currentStep === 1
                  ? "invisible "
                  : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              ← Back
            </button>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={currentStep === 5 ? handlePublishJob : handleNext}
                className="px-7 py-3 cursor-pointer rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{currentStep === 5 ? "Publish Job" : "Continue"}</span>

                {currentStep < 5 && <span>→</span>}
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default PostJob;
