"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PostJobPage() {
  const [locationType, setLocationType] = useState<
    "onsite" | "hybrid" | "remote"
  >("remote");

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header & Stepper */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Post a New Job
          </h1>

          {/* Stepper */}
          <div className="flex items-center justify-between w-full relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center z-10 bg-slate-50 px-2">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-1 shadow-sm">
                1
              </div>
              <span className="text-xs sm:text-sm font-semibold text-blue-600">
                Job Details
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-slate-200 -mt-5" />

            {/* Step 2 */}
            <div className="flex flex-col items-center z-10 bg-slate-50 px-2">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm mb-1">
                2
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                Description
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-slate-200 -mt-5" />

            {/* Step 3 */}
            <div className="flex flex-col items-center z-10 bg-slate-50 px-2">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm mb-1">
                3
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                Review
              </span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
            Job Details
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Job Title */}
            <div className="space-y-2">
              <label
                htmlFor="job-title"
                className="block text-sm font-semibold text-slate-700"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="job-title"
                type="text"
                placeholder="e.g. Senior Product Designer"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>

            {/* Department & Employment Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Department
                </label>
                <div className="relative">
                  <select
                    id="department"
                    defaultValue=""
                    className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-10"
                  >
                    <option value="" disabled>
                      Select department
                    </option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="hr">Human Resources</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="employment-type"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="employment-type"
                    defaultValue=""
                    required
                    className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-10"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-6">
                {(["onsite", "hybrid", "remote"] as const).map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 capitalize"
                  >
                    <input
                      type="radio"
                      name="location_type"
                      value={type}
                      checked={locationType === type}
                      onChange={() => setLocationType(type)}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    {type === "onsite" ? "On-site" : type}
                  </label>
                ))}
              </div>
              <input
                id="location-details"
                type="text"
                placeholder="e.g. San Francisco, CA or Remote (US Only)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Salary Range (Annual)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-center">
                <div className="relative sm:col-span-3">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    $
                  </span>
                  <input
                    id="salary-min"
                    type="number"
                    placeholder="Min"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>
                <span className="text-center text-slate-400 text-sm font-medium">
                  to
                </span>
                <div className="relative sm:col-span-3">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    $
                  </span>
                  <input
                    id="salary-max"
                    type="number"
                    placeholder="Max"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition text-sm"
              >
                Cancel
              </button>
              <Link
                href={"/employer/post-job/job-description"}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                Continue to Description
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
