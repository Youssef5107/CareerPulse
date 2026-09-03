// app/employer/applicants/[applicant-id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
}

interface ApplicantDetailData {
  applicationId: string;
  status: string;
  appliedAt: string;
  jobTitle: string;
  candidate: {
    name: string;
    email: string;
    image?: string | null;
    headline: string;
    location: string;
    phone: string;
    summary: string;
    skills: string[];
    cvUrl?: string | null;
    matchScore: number;
    recruiterNotes: string;
    experiences: Experience[];
  };
}

export default function ApplicantDetailPage() {
  const params = useParams();
  const applicationId = params?.["applicant-id"] as string;

  const [data, setData] = useState<ApplicantDetailData | null>(null);
  const [status, setStatus] = useState<string>("PENDING");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!applicationId) return;

    async function fetchApplicant() {
      try {
        const res = await fetch(`/api/applications/${applicationId}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const result: ApplicantDetailData = await res.json();
        setData(result);
        setStatus(result.status);
      } catch (err) {
        console.error("Failed to load applicant details", err);
      } finally {
        setLoading(false);
      }
    }

    fetchApplicant();
  }, [applicationId]);

  const handleUpdateStatus = async (newStatus: string) => {
    setStatus(newStatus);
    try {
      await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined animate-spin">
            progress_activity
          </span>
          <span>Loading candidate profile...</span>
        </div>
      </main>
    );
  }

  if (!data) {
    return notFound();
  }

  const { candidate } = data;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans relative flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="flex items-center gap-2 mb-2 text-slate-500">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <Link
            href="/employer/applicants"
            className="text-sm font-medium hover:underline text-slate-600"
          >
            Back to Applicants
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative flex items-center justify-center text-slate-600 font-bold text-xl">
              {candidate.image ? (
                <Image
                  src={candidate.image}
                  alt={candidate.name || "Candidate"}
                  fill
                  className="object-cover"
                />
              ) : (
                <span>{(candidate.name || "U").slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {candidate.name || "N/A"}
              </h1>
              <div className="text-lg text-slate-600 mb-2">
                {candidate.headline || "N/A"}
              </div>
              <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    location_on
                  </span>
                  {candidate.location || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    mail
                  </span>
                  {candidate.email || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    call
                  </span>
                  {candidate.phone || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {candidate.cvUrl ? (
              <a
                href={candidate.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 border border-slate-200"
              >
                <span className="material-symbols-outlined text-base">
                  description
                </span>
                Download CV
              </a>
            ) : (
              <button
                disabled
                className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-slate-200 cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-base">
                  description
                </span>
                No CV Uploaded
              </button>
            )}
            {candidate.email ? (
              <a
                href={`mailto:${candidate.email}`}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">
                  calendar_month
                </span>
                Schedule Interview
              </a>
            ) : (
              <button
                disabled
                className="bg-slate-300 text-slate-500 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-base">
                  calendar_month
                </span>
                Schedule Interview
              </button>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview & Summary */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Overview &amp; Summary
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {candidate.summary || "No overview or summary available."}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Skills</h2>
              {candidate.skills && candidate.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No skills listed.</p>
              )}
            </div>

            {/* Work Experience */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Work Experience
              </h2>
              <div className="space-y-4">
                {candidate.experiences && candidate.experiences.length > 0 ? (
                  candidate.experiences.map((exp, idx) => (
                    <div
                      key={exp.id || idx}
                      className={`${
                        idx !== candidate.experiences.length - 1
                          ? "border-b border-slate-200 pb-4"
                          : ""
                      }`}
                    >
                      <div className="font-semibold text-slate-900">
                        {exp.title || "N/A"} - {exp.company || "N/A"}
                      </div>
                      <div className="text-xs text-slate-500 mb-1">
                        {exp.startDate || "N/A"} - {exp.endDate || "Present"}{" "}
                        {exp.location ? `• ${exp.location}` : ""}
                      </div>
                      <p className="text-sm text-slate-600">
                        {exp.description || "No description provided."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No work experience details listed.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Right Column */}
          <div className="space-y-6">
            {/* Application Status Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Application Status
              </h2>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">
                  check_circle
                </span>
                Applied for {data.jobTitle || "N/A"}
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Match Score:</span>
                  <span className="font-bold text-slate-900">
                    {candidate.matchScore ?? "N/A"}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Applied Date:</span>
                  <span>
                    {data.appliedAt
                      ? new Date(data.appliedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Accept / Reject Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2">
                <button
                  onClick={() => handleUpdateStatus("ACCEPTED")}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                    status === "ACCEPTED"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    check
                  </span>
                  {status === "ACCEPTED"
                    ? "Application Accepted"
                    : "Accept Application"}
                </button>
                <button
                  onClick={() => handleUpdateStatus("REJECTED")}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 border ${
                    status === "REJECTED"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    close
                  </span>
                  {status === "REJECTED"
                    ? "Application Rejected"
                    : "Reject Application"}
                </button>
              </div>
            </div>

            {/* Recruiter Notes */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Recruiter Notes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {candidate.recruiterNotes || "No recruiter notes available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
