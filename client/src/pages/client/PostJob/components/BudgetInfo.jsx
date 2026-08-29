import React from "react";
import { DollarSign, Clock3 } from "lucide-react";
import { Lightbulb, CheckCircle2, TrendingUp, Briefcase } from "lucide-react";

function BudgetInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value > 100000) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Payment Type */}
      {/* Left Side */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          {/* Payment Type */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">Payment Type</h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Fixed */}
              <div
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentType: "Fixed Price",
                  }))
                }
                className={`cursor-pointer rounded-xl border-2 p-6 transition ${
                  formData.paymentType === "Fixed Price"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <DollarSign
                  className={`mb-3 ${
                    formData.paymentType === "Fixed Price"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                  size={35}
                />

                <h4 className="font-semibold text-lg">Fixed Price</h4>

                <p className="text-gray-500 text-sm mt-2">
                  Best for projects with a clear scope.
                </p>
              </div>

              {/* Hourly */}
              <div
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentType: "Hourly Rate",
                  }))
                }
                className={`cursor-pointer rounded-xl border-2 p-6 transition ${
                  formData.paymentType === "Hourly Rate"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <Clock3
                  className={`mb-3 ${
                    formData.paymentType === "Hourly Rate"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                  size={35}
                />

                <h4 className="font-semibold text-lg">Hourly Rate</h4>

                <p className="text-gray-500 text-sm mt-2">
                  Great for long-term or ongoing work.
                </p>
              </div>
            </div>
          </div>

          {/* Currency */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Currency</label>

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="  w-full
        h-12
        rounded-xl
        border border-gray-300
        px-4
        text-lg
        placeholder:text-gray-400
        transition-all duration-200
        focus:outline-none
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-500/20
        focus:shadow-lg"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="EGP">EGP (E£)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* Budget */}

          <div className="mt-6">
            <label className="block mb-2 font-medium">Budget</label>

            <input
              type="number"
              name="budget"
              value={formData.budget || ""}
              onChange={handleChange}
              placeholder="Enter your budget"
              className="
      w-full
      h-12
      rounded-xl
      border border-gray-300
      px-4
      text-lg
      focus:outline-none
      focus:border-indigo-500
      focus:ring-4
      focus:ring-indigo-500/20
    "
            />
          </div>

          {/* Project Timeline */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Duration */}

            <div>
              <label className="block mb-2 font-medium">Project Duration</label>

              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="
      w-full
      h-12
      rounded-xl
      border border-gray-300
      px-4
      text-lg
      focus:outline-none
      focus:border-indigo-500
      focus:ring-4
      focus:ring-indigo-500/20
      "
              >
                <option value="">Select duration</option>

                <option value="Less than 1 month">Less than 1 month</option>

                <option value="1-3 Months">1-3 Months</option>

                <option value="3-6 Months">3-6 Months</option>

                <option value="6+ Months">6+ Months</option>
              </select>
            </div>

            {/* Commitment */}

            <div>
              <label className="block mb-2 font-medium">
                Weekly Commitment
              </label>

              <select
                name="commitment"
                value={formData.commitment}
                onChange={handleChange}
                className="
      w-full
      h-12
      rounded-xl
      border border-gray-300
      px-4
      text-lg
      focus:outline-none
      focus:border-indigo-500
      focus:ring-4
      focus:ring-indigo-500/20
      "
              >
                <option value="">Select commitment</option>

                <option value="Part-time (10-20 hrs/week)">
                  Part-time (10-20 hrs/week)
                </option>

                <option value="Full-time (30+ hrs/week)">
                  Full-time (30+ hrs/week)
                </option>
              </select>
            </div>
          </div>

          {/* Tip */}
          <div className="mt-8 rounded-xl bg-blue-50 border border-blue-100 p-4">
            <p className="text-sm text-blue-700">
              💡 Jobs with a clear budget usually receive more proposals and
              attract better freelancers.
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="space-y-6">
        {/* Budget Tips */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
            <Lightbulb className="text-blue-600" size={28} />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3">Budget Tips</h3>

          <p className="text-gray-500 leading-7 mb-5">
            A realistic budget attracts skilled freelancers and increases the
            chances of receiving quality proposals in less time.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 mt-1" size={18} />
              <p className="text-gray-600 text-sm">
                Set a clear budget range to avoid unnecessary negotiations.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 mt-1" size={18} />
              <p className="text-gray-600 text-sm">
                Competitive pricing helps attract experienced freelancers.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 mt-1" size={18} />
              <p className="text-gray-600 text-sm">
                Keep a small reserve budget for additional revisions if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
          <TrendingUp
            size={150}
            className="absolute -right-8 -bottom-6 opacity-10"
          />

          <h4 className="font-semibold uppercase tracking-wider">
            Market Insights
          </h4>

          <div className="flex justify-between items-end mt-6">
            <h2 className="text-6xl font-black">94%</h2>

            <div className="text-right">
              <p className="font-semibold">Success Rate</p>

              <p className="text-sm text-blue-100">Within this budget range</p>
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-3 mt-6">
            <div className="w-[94%] h-full bg-white rounded-full"></div>
          </div>

          <p className="mt-5 text-sm text-blue-100">
            Jobs with a clear budget receive more proposals and are completed
            faster.
          </p>
        </div>

        {/* Information Card */}
        <div className="relative overflow-hidden rounded-2xl h-56 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 flex flex-col justify-end shadow-lg">
          <Briefcase size={110} className="absolute top-4 right-4 opacity-10" />

          <h3 className="text-white text-xl font-bold">Hire with Confidence</h3>

          <p className="text-gray-300 mt-2 text-sm leading-6">
            A well-defined budget helps you connect with qualified freelancers
            and receive better proposals for your project.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BudgetInfo;
