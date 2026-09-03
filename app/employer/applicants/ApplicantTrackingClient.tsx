"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ApplicantData {
  applicationId: string;
  status: string;
  appliedAt: Date;
  candidate: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  targetJob: {
    id: string;
    title: string;
    location: string;
    salary: string;
  };
}

export default function ApplicantTrackingClient({
  applicants,
}: {
  applicants: ApplicantData[];
}) {
  const [selectedJobId, setSelectedJobId] = useState<string>("ALL");

  // Filter list if user selects a specific job post filter
  const filteredApplicants =
    selectedJobId === "ALL"
      ? applicants
      : applicants.filter((app) => app.targetJob.id === selectedJobId);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Applicants ({filteredApplicants.length})
      </h1>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Candidate</th>
                <th className="p-4">Target Job Post</th>
                <th className="p-4">Applied Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredApplicants.map((app) => (
                <tr
                  key={app.applicationId}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Candidate Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative shrink-0">
                        {app.candidate.image ? (
                          <Image
                            src={app.candidate.image}
                            alt={app.candidate.name || "User Avatar"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-slate-600">
                            {app.candidate.name?.slice(0, 2).toUpperCase() ||
                              "U"}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {app.candidate.name || "Anonymous Applicant"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {app.candidate.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Target Job Column */}
                  <td className="p-4">
                    <Link
                      href={`/employer/postings/${app.targetJob.id}`}
                      className="text-sm font-semibold text-blue-600 hover:underline block"
                    >
                      {app.targetJob.title}
                    </Link>
                    <span className="text-xs text-slate-500">
                      {app.targetJob.location}
                    </span>
                  </td>

                  {/* Applied Date */}
                  <td className="p-4 text-sm text-slate-500">
                    {new Date(app.appliedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {app.status}
                    </span>
                  </td>

                  {/* Action Link */}
                  <td className="p-4 text-right">
                    <Link
                      href={`/employer/applicants/${app.applicationId}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Profile &rarr;
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredApplicants.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No applicants found for your job postings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
