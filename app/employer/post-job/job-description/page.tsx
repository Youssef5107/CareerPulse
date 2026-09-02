"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateJobDetails } from "@/store/features/jobPost/jobPostSlice";

export default function PostJobDescriptionPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.jobPost);

  // Protection Guard: Redirect to step 1 if step 1 is incomplete
  useEffect(() => {
    if (!formData.title || !formData.employmentType || !formData.location) {
      router.replace("/employer/post-job/job-details");
    }
  }, [formData, router]);

  const handleBenefitToggle = (benefit: string) => {
    const updatedBenefits = formData.benefits.includes(benefit)
      ? formData.benefits.filter((b) => b !== benefit)
      : [...formData.benefits, benefit];

    dispatch(updateJobDetails({ benefits: updatedBenefits }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert("Please fill in the Job Description.");
      return;
    }
    router.push("/employer/post-job/job-review");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col w-full">
      <main className="flex-1 w-full max-w-[800px] mx-auto p-4 md:p-8 flex flex-col justify-between space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">
            Post a New Job
          </h1>

          {/* Stepper */}
          <div className="w-full mb-10 px-4">
            <div className="flex items-center justify-between relative max-w-[650px] mx-auto">
              <div className="flex flex-col items-center z-10">
                <button
                  type="button"
                  onClick={() => router.push("/employer/post-job/job-details")}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 bg-[#1d61e8] text-white"
                >
                  1
                </button>
                <span className="text-sm font-bold text-[#1d61e8]">
                  Job Details
                </span>
              </div>
              <div className="flex-1 h-[2px] bg-[#e2e8f0] -mt-7 mx-3" />
              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 bg-[#1d61e8] text-white">
                  2
                </div>
                <span className="text-sm font-bold text-[#1d61e8]">
                  Description
                </span>
              </div>
              <div className="flex-1 h-[2px] bg-[#e2e8f0] -mt-7 mx-3" />
              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 bg-[#e2e8f0] text-slate-500">
                  3
                </div>
                <span className="text-sm font-normal text-slate-500">
                  Review
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleContinue}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Job Description
            </h2>

            {/* Description Textarea */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 transition-all bg-white">
                <textarea
                  id="description"
                  rows={8}
                  value={formData.description}
                  onChange={(e) =>
                    dispatch(updateJobDetails({ description: e.target.value }))
                  }
                  placeholder="Describe the day-to-day responsibilities, expectations, and goals for this role..."
                  className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0 resize-y text-slate-800 placeholder:text-slate-400 text-sm"
                  required
                />
              </div>
            </div>

            {/* Company Overview */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="companyOverview"
                className="text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                Company Overview{" "}
                <span className="text-slate-400 font-normal lowercase">
                  (optional)
                </span>
              </label>
              <textarea
                id="companyOverview"
                rows={4}
                value={formData.companyOverview}
                onChange={(e) =>
                  dispatch(
                    updateJobDetails({ companyOverview: e.target.value }),
                  )
                }
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
                {[
                  {
                    id: "health",
                    label: "Health Insurance",
                    desc: "Comprehensive medical, dental, vision",
                  },
                  {
                    id: "401k",
                    label: "401(k) Matching",
                    desc: "Up to 5% company match",
                  },
                  {
                    id: "remote",
                    label: "Remote Work Options",
                    desc: "Flexible schedule & hybrid models",
                  },
                  {
                    id: "pto",
                    label: "Unlimited PTO",
                    desc: "Take time off when you need it",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.benefits.includes(item.label)}
                      onChange={() => handleBenefitToggle(item.label)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer Buttons inside Form */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => router.push("/employer/post-job/job-details")}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#1d61e8] text-white hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"
              >
                Continue to Review
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
