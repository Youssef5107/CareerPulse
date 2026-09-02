"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetJobPostForm } from "@/store/features/jobPost/jobPostSlice";

export default function PostJobReviewPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const jobData = useAppSelector((state) => state.jobPost);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Protection Guard: Ensure all required fields exist before allowing review
  useEffect(() => {
    if (!jobData.title || !jobData.employmentType || !jobData.location) {
      router.replace("/employer/post-job/job-details");
    } else if (!jobData.description) {
      router.replace("/employer/post-job/job-description");
    }
  }, [jobData, router]);

  const handlePublishJob = async () => {
    setIsSubmitting(true);
    try {
      // Map values to common Prisma/Backend conventions
      const payload = {
        ...jobData,
        // Pass null/undefined instead of empty strings for optional fields
        companyName: jobData.companyName.trim() || undefined,
        companyOverview: jobData.companyOverview.trim() || undefined,
        expirationDate: jobData.expirationDate
          ? new Date(jobData.expirationDate)
          : undefined,

        // Numbers
        salaryMin: jobData.salaryMin ? Number(jobData.salaryMin) : undefined,
        salaryMax: jobData.salaryMax ? Number(jobData.salaryMax) : undefined,

        // Format Enums if your API expects uppercase / underscore formats
        employmentType: jobData.employmentType.toUpperCase().replace("-", "_"), // "FULL_TIME"
        locationType: jobData.locationType.toUpperCase(), // "HYBRID"
      };

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server validation error detail:", errorData);
        throw new Error(
          typeof errorData === "string"
            ? errorData
            : errorData.message || "Failed to publish job",
        );
      }

      dispatch(resetJobPostForm());
      router.push("/employer/jobs");
    } catch (error: unknown) {
      console.error("Error submitting job:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while publishing the job.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col w-full">
      <main className="flex-1 w-full max-w-[900px] mx-auto p-4 md:p-8 flex flex-col justify-between space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">
            Post a New Job
          </h1>

          {/* Stepper */}
          <div className="w-full mb-10 px-4">
            <div className="flex items-center justify-between relative max-w-[650px] mx-auto">
              {[
                {
                  id: 1,
                  label: "Job Details",
                  path: "/employer/post-job/job-details",
                },
                {
                  id: 2,
                  label: "Description",
                  path: "/employer/post-job/job-description",
                },
                {
                  id: 3,
                  label: "Review",
                  path: "/employer/post-job/job-review",
                },
              ].map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center z-10">
                    <button
                      type="button"
                      onClick={() => router.push(step.path)}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 bg-[#1d61e8] text-white"
                    >
                      {step.id}
                    </button>
                    <span className="text-sm font-bold text-[#1d61e8]">
                      {step.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="flex-1 h-[2px] bg-[#e2e8f0] -mt-7 mx-3" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Review Job Posting
            </h2>
            <p className="text-sm text-slate-500">
              Please review the details below before publishing.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-8">
            {/* Section 1: Job Summary */}
            <section>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Job Summary
                </h3>
                <button
                  type="button"
                  onClick={() => router.push("/employer/post-job/job-details")}
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
                    {jobData.title || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Department
                  </p>
                  <p className="text-sm text-slate-800 capitalize">
                    {jobData.department || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Employment Type
                  </p>
                  <span className="inline-block bg-slate-100 text-slate-700 border border-slate-200 rounded-md px-2.5 py-1 text-xs font-semibold capitalize">
                    {jobData.employmentType || "—"}
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
                    <span>
                      {jobData.location} ({jobData.locationType})
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    Salary Range
                  </p>
                  <p className="text-sm text-slate-800">
                    {jobData.salaryMin || jobData.salaryMax
                      ? `$${jobData.salaryMin || "0"} - $${jobData.salaryMax || "0"} / year`
                      : "Not specified"}
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
                  onClick={() =>
                    router.push("/employer/post-job/job-description")
                  }
                  className="text-[#1d61e8] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">
                    edit
                  </span>
                  Edit
                </button>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-slate-700 space-y-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {jobData.description}
                </p>
                {jobData.companyOverview && (
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">
                      Company Overview:
                    </p>
                    <p className="text-sm text-slate-600">
                      {jobData.companyOverview}
                    </p>
                  </div>
                )}
                {jobData.benefits.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-2">
                      Selected Benefits:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                      {jobData.benefits.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => router.push("/employer/post-job/job-description")}
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
              disabled={isSubmitting}
              onClick={handlePublishJob}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#1d61e8] text-white hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish Job"}
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
