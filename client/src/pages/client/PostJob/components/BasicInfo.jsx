import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";

function BasicInfo({ formData, handleChange, templates, applyTemplate }) {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-7">
        {/* left */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1 =>left Job Title */}
          <div className="  space-y-2 bg-white p-4 rounded-lg shadow  ">
            <Label className="mt-1 text-lg text-gray-900  font-bold">
              Job Title
            </Label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              type="text"
              placeholder="Enter job title"
              className="
        w-full
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
        focus:shadow-lg
      "
            />
            <Label className="mt-1 text-sm text-gray-500">
              A clear title helps attract the right candidates.
            </Label>
          </div>
          {/* 2 =>left Category */}

          <div className=" space-y-2 bg-white p-4 rounded-lg shadow">
            <Label className="mt-1 text-lg text-gray-900 font-bold">
              Category
            </Label>

            <select
              value={formData.category}
              name="category"
              onChange={handleChange}
              className=" w-full h-12 rounded-xl    border border-gray-300 px-4 text-lg text-gray-700 transition-all duration-200 focus:outline-none  focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg "
            >
              <option value="" disabled>
                Select category
              </option>

              <option value="web-development">Web Development</option>

              <option value="mobile-development">Mobile Development</option>

              <option value="ui-ux">UI/UX Design</option>

              <option value="marketing">Marketing</option>
            </select>
          </div>

          {/* 3 =>left Description */}
          <div className="space-y-2  bg-white p-4 rounded-lg shadow">
            <Label className="mt-1 text-lg text-gray-900 font-bold">
              Description
            </Label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              type="text"
              placeholder="Describe the project scope, objectives, and deliverables..."
              className=" p-2 w-full  rounded-xl resize-none   border border-gray-300 px-4 text-lg text-gray-700 transition-all duration-200 focus:outline-none  focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-lg "
              rows="5"
              cols="50"
              maxLength="200"
            ></textarea>
            <p
              className={`text-sm  text-right ${formData.description.length >= 200 ? "text-red-500" : formData.description.length >= 130 ? "text-yellow-600" : "text-gray-500"} `}
            >
              {formData.description.length} / 200 characters
            </p>
          </div>
        </div>
        {/* 1 =>right */}
        <div className="space-y-6">
          <div className="  flex flex-col gap-4 justify-between">
            <div className="space-y-2  p-4">
              <h1 className="text-indigo-200 font-bold md:text-lg text-sm flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide"
                >
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  <path d="M20 2v4" />
                  <path d="M22 4h-4" />
                  <circle cx="4" cy="20" r="2" />
                </svg>
                Expert Tip
              </h1>
              <p className="text-indigo-200 md:text-lg">
                Posts with detailed descriptions receive 3x more qualified
                proposals within the first 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.title}
                  onClick={() => applyTemplate(template)}
                  className="flex items-center justify-between w-full bg-white cursor-pointer  hover:bg-gray-200 transition rounded-lg p-4"
                >
                  <span className="text-lg">{template.title}</span>

                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
