"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PostJobDescriptionPage() {
  const [currentStep, setCurrentStep] = useState<number>(2);

  const steps = [
    { id: 1, label: "Job Details" },
    { id: 2, label: "Description" },
    { id: 3, label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col w-full">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-[800px] mx-auto p-4 md:p-8 flex flex-col justify-between space-y-8">
        <div>
          {/* Main Title */}
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">
            Post a New Job
          </h1>

          {/* Stepper Component Matching Image Design */}
          <div className="w-full mb-10 px-4">
            <div className="flex items-center justify-between relative max-w-[650px] mx-auto">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                  <React.Fragment key={step.id}>
                    {/* Step Item */}
                    <div className="flex flex-col items-center z-10">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(step.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${
                          isActive || isCompleted
                            ? "bg-[#1d61e8] text-white"
                            : "bg-[#e2e8f0] text-slate-500"
                        }`}
                      >
                        {step.id}
                      </button>
                      <span
                        className={`text-sm ${
                          isActive || isCompleted
                            ? "font-bold text-[#1d61e8]"
                            : "font-normal text-slate-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-[2px] bg-[#e2e8f0] -mt-7 mx-3" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Job Description
            </h2>

            {/* Rich Text Editor Component */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="job-description"
                className="text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 transition-all bg-white">
                {/* Toolbar */}
                <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    title="Bold"
                    className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_bold
                    </span>
                  </button>
                  <button
                    type="button"
                    title="Italic"
                    className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_italic
                    </span>
                  </button>
                  <button
                    type="button"
                    title="Underline"
                    className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_underlined
                    </span>
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    type="button"
                    title="Bulleted List"
                    className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_list_bulleted
                    </span>
                  </button>
                  <button
                    type="button"
                    title="Numbered List"
                    className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_list_numbered
                    </span>
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    type="button"
                    title="Link"
                    className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      link
                    </span>
                  </button>
                </div>
                {/* Textarea */}
                <textarea
                  id="job-description"
                  rows={8}
                  placeholder="Describe the day-to-day responsibilities, expectations, and goals for this role..."
                  className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0 resize-y text-slate-800 placeholder:text-slate-400 text-sm"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Minimum 100 words recommended for optimal visibility.
              </p>
            </div>

            {/* Company Overview */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="company-overview"
                  className="text-xs font-semibold text-slate-600 uppercase tracking-wider"
                >
                  Company Overview{" "}
                  <span className="text-slate-400 font-normal lowercase">
                    (optional)
                  </span>
                </label>
                <button
                  type="button"
                  className="text-blue-600 text-xs font-medium hover:underline"
                >
                  Use default template
                </button>
              </div>
              <textarea
                id="company-overview"
                rows={4}
                placeholder="Share a brief introduction about your company culture, mission, and values..."
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-slate-800 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Benefits & Perks */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Benefits & Perks
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      Health Insurance
                    </span>
                    <span className="block text-xs text-slate-400 mt-0.5">
                      Comprehensive medical, dental, vision
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      401(k) Matching
                    </span>
                    <span className="block text-xs text-slate-400 mt-0.5">
                      Up to 5% company match
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      Remote Work Options
                    </span>
                    <span className="block text-xs text-slate-400 mt-0.5">
                      Flexible schedule & hybrid models
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      Unlimited PTO
                    </span>
                    <span className="block text-xs text-slate-400 mt-0.5">
                      Take time off when you need it
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors mt-1"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Custom Benefit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <Link
            href={"/employer/post-job/job-details"}
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            Back
          </Link>
          <Link
            href={"/employer/post-job/job-review"}
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#1d61e8] text-white hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"
          >
            Continue to Review
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
