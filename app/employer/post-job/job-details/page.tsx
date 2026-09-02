"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateJobDetails } from "@/store/features/jobPost/jobPostSlice";

export default function PostJobPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.jobPost);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch(updateJobDetails({ [name]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.employmentType || !formData.location) {
      alert("Please complete all required fields (*).");
      return;
    }
    router.push("/employer/post-job/job-description");
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header & Stepper */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Post a New Job
          </h1>

          <div className="flex items-center justify-between w-full relative">
            <div className="flex flex-col items-center z-10 bg-slate-50 px-2">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-1 shadow-sm">
                1
              </div>
              <span className="text-xs sm:text-sm font-semibold text-blue-600">
                Job Details
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 -mt-5" />
            <div className="flex flex-col items-center z-10 bg-slate-50 px-2">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm mb-1">
                2
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                Description
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 -mt-5" />
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

          <form className="space-y-6" onSubmit={handleContinue}>
            {/* Job Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-slate-700"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
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
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
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
                  htmlFor="employmentType"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
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
                      name="locationType"
                      value={type}
                      checked={formData.locationType === type}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    {type === "onsite" ? "On-site" : type}
                  </label>
                ))}
              </div>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                required
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
                    id="salaryMin"
                    name="salaryMin"
                    type="number"
                    value={formData.salaryMin}
                    onChange={handleInputChange}
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
                    id="salaryMax"
                    name="salaryMax"
                    type="number"
                    value={formData.salaryMax}
                    onChange={handleInputChange}
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
                onClick={() => router.push("/employer/dashboard")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                Continue to Description
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
