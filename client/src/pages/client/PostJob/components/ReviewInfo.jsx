import React, { useState } from "react";
import {
  Edit,
  Rocket,
  ArrowLeft,
  CheckCircle,
  BriefcaseBusiness,
  Award,
  DollarSign,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ReviewInfo({ formData, setStep, handlePublishJob }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-8 space-y-6">
          {/* Job Core */}
          <section className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Job Core</h2>

              <button
                className="text-blue-600 flex items-center gap-1 cursor-pointer hover:underline"
                onClick={() => setStep(1)}
              >
                <Edit size={16} />
                Edit
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500 uppercase">Project Title</p>

                <h3 className="text-xl font-semibold mt-1 break-words ">
                  {formData.jobTitle || "No Title Added"}
                </h3>
              </div>

              <div className="flex gap-10">
                <div>
                  <p className="text-sm text-gray-500 uppercase">Category</p>

                  <p className="mt-1 font-medium">
                    {formData.category || "Not Selected"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase">
                    Experience Level
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <Award size={18} className="text-blue-600" />

                    <p>{formData.experienceLevel || "Not Selected"}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white border rounded-xl p-6">
            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-bold">Description</h2>

              <button
                className="text-blue-600 flex gap-1 cursor-pointer hover:underline"
                onClick={() => setStep(1)}
              >
                <Edit size={16} />
                Edit
              </button>
            </div>

            <p className="text-gray-600 leading-7 break-words  ">
              {formData.description || "No description added yet"}
            </p>
          </section>

          {/* Skills */}

          <section className="bg-white border rounded-xl p-6">
            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-bold">Required Skills</h2>

              <button
                className="text-blue-600 flex gap-1 cursor-pointer hover:underline"
                onClick={() => setStep(2)}
              >
                <Edit size={16} />
                Edit
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.skills?.length > 0 ? (
                formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No skills selected</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Side */}

        <div className="lg:col-span-4 space-y-6">
          {/* Budget */}

          <section className="bg-gray-50 border rounded-xl p-6">
            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-bold">Budget</h2>

              <Edit
                size={18}
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setStep(3)}
              />
            </div>

            <div className="bg-white border rounded-lg p-4">
              <p className="text-sm text-gray-500">
                {formData.paymentType || "Not Selected"}
              </p>

              <div className="flex items-center gap-2 mt-2 ">
                {/* <DollarSign } /> */}
                <div className=" text-3xl font-bold">$</div>
                <span className="text-3xl font-bold ">
                  {formData.budget || "0"}
                </span>

                <span className="text-gray-500 text-sm mt-2">
                  {formData.currency || "USD"}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>

                <span className="font-semibold">
                  {formData.duration || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Commitment</span>

                <span className="font-semibold">
                  {formData.commitment || "-"}
                </span>
              </div>
            </div>
          </section>

          {/* Publish Buttons */}

          <div className="space-y-3">
            <button
              onClick={() => {
                setShowModal(true);
                handlePublishJob();
              }}
              className="w-full py-4 bg-blue-600 text-white rounded-xl flex justify-center items-center gap-2 font-bold hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out"
            >
              Publish Job
              <Rocket size={18} />
            </button>

            <button
              onClick={() => setStep(3)}
              className="w-full py-4 border rounded-xl flex justify-center gap-2 items-center font-bold text-gray-600 hover:bg-gray-100 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out "
            >
              <ArrowLeft size={18} />
              Back to Budget
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-md text-center">
            <CheckCircle size={70} className="text-green-600 mx-auto mb-5" />

            <h2 className="text-2xl font-bold mb-3">Job Published!</h2>

            <p className="text-gray-500 mb-6">
              Your project is now live and freelancers can apply.
            </p>

            <button
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer "
              onClick={() => {
                setShowModal(false);
                navigate("/client/dashboard");
              }}
            >
              Go To Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewInfo;
