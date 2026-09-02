"use client";

import React, { useState } from "react";

export default function PostJobReviewPage() {
  const [currentStep, setCurrentStep] = useState<number>(3);

  const steps = [
    { id: 1, label: "Job Details" },
    { id: 2, label: "Description" },
    { id: 3, label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col w-full">
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[900px] mx-auto p-4 md:p-8 flex flex-col justify-between space-y-8">
        <div>
          {/* Header Title */}
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">
            Post a New Job
          </h1>

          {/* Stepper Progress Bar */}
          <div className="w-full mb-10 px-4">
            <div className="flex items-center justify-between relative max-w-[650px] mx-auto">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                  <React.Fragment key={step.id}>
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

                    {index < steps.length - 1 && (
                      <div className="flex-1 h-[2px] bg-[#e2e8f0] -mt-7 mx-3" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Subtitle */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Review Job Posting
            </h2>
            <p className="text-sm text-slate-500">
              Please review the details below before publishing.
            </p>
          </div>

          {/* Main Review Content Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-8">
            {/* Section 1: Job Summary */}
            <section>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Job Summary
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[#1d61e8] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">
                    edit
                  </span>
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Job Title
                  </p>
                  <p className="text-base text-slate-900 font-medium">
                    Senior UX Designer
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Department
                  </p>
                  <p className="text-sm text-slate-800">Product & Design</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Employment Type
                  </p>
                  <span className="inline-block bg-slate-100 text-slate-700 border border-slate-200 rounded-md px-2.5 py-1 text-xs font-semibold">
                    Full-Time
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Location
                  </p>
                  <div className="flex items-center gap-1 text-slate-800 text-sm">
                    <span className="material-symbols-outlined text-base text-slate-400">
                      location_on
                    </span>
                    <span>San Francisco, CA (Hybrid)</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Salary Range
                  </p>
                  <p className="text-sm text-slate-800">
                    $120,000 - $150,000 / year
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Job Description */}
            <section>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Job Description
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-[#1d61e8] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">
                    edit
                  </span>
                  Edit
                </button>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-slate-700 space-y-4">
                <p className="text-sm leading-relaxed">
                  We are looking for a Senior UX Designer to join our
                  fast-growing Product team. You will be responsible for leading
                  design initiatives, creating intuitive user experiences, and
                  collaborating closely with engineering and product management.
                </p>
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-2">
                    Key Responsibilities:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                    <li>Lead end-to-end design for major product features.</li>
                    <li>
                      Conduct user research and translate insights into
                      actionable design solutions.
                    </li>
                    <li>
                      Create wireframes, prototypes, and high-fidelity mockups.
                    </li>
                    <li>Maintain and evolve our design system.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Settings */}
            <section>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-slate-900">Settings</h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[#1d61e8] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">
                    edit
                  </span>
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Visibility
                    </p>
                    <p className="text-xs text-slate-500">
                      Who can see this job posting?
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-[#1d61e8] rounded-full px-3 py-1 text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm">
                      public
                    </span>
                    Public
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Expiration Date
                    </p>
                    <p className="text-xs text-slate-500">
                      When will this posting close?
                    </p>
                  </div>
                  <p className="text-sm font-medium text-slate-800">
                    Dec 31, 2024
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#1d61e8] hover:bg-blue-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#1d61e8] text-white hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"
            >
              Publish Job
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
