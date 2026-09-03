import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ApplicantDetailPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans relative flex flex-col">
      {/* Main Content Area */}
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

        {/* Applicant Profile Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFkWl57FL3ThLi1EAK4f7X4rIPZOP6czi4zYZ6f_dDVva6LWra2iFTfOBzMAHd_BXcZU7iBZo-8FfikC-dkjrC5l2WYFwNY-c6ZMhUrAHODcRyvRt0UcFCeG-eVGl8mzEh5tzkPHw2os98JRX-AwXs6bfKzx8-F9mChR5nqh6IzkFoc8U1nC0iThKfQNFIxZTdcsMl6B9mNwrhXvVCtxWcTCuT4IN9Xi8tVwjF38gitDPhStJwyQ"
                alt="Elena Rodriguez"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                Elena Rodriguez
              </h1>
              <div className="text-lg text-slate-600 mb-2">
                UX Designer at TechCorp
              </div>
              <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    location_on
                  </span>
                  San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    mail
                  </span>
                  elena.r@example.com
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    call
                  </span>
                  +1 (555) 234-5678
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">
                calendar_month
              </span>
              Schedule Interview
            </button>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 border border-slate-200">
              <span className="material-symbols-outlined text-base">send</span>
              Send Message
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left / Main Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview & Summary */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Overview &amp; Summary
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Passionate UX Designer with over 6 years of experience crafting
                intuitive digital products and enterprise platforms. Specializes
                in user-centered design research, wireframing, and interactive
                prototyping.
              </p>
            </div>

            {/* Work Experience */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Work Experience
              </h2>
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-4">
                  <div className="font-semibold text-slate-900">
                    Senior UX Designer - TechCorp
                  </div>
                  <div className="text-xs text-slate-500 mb-1">
                    2021 - Present • San Francisco, CA
                  </div>
                  <p className="text-sm text-slate-600">
                    Leading core design initiatives for enterprise cloud
                    solutions, improving workflow efficiency by 34%.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    Product Designer - StartupHub
                  </div>
                  <div className="text-xs text-slate-500 mb-1">
                    2018 - 2021 • San Francisco, CA
                  </div>
                  <p className="text-sm text-slate-600">
                    Designed mobile-first consumer applications from conception
                    to launch with over 500k active users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column / Sidebar */}
          <div className="space-y-6">
            {/* Application Status & Quick Actions */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Application Status
              </h2>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">
                  check_circle
                </span>
                Applied for Senior Product Designer
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Match Score:</span>
                  <span className="font-bold text-slate-900">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Applied Date:</span>
                  <span>Oct 24, 2023</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2">
                <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-base">
                    check
                  </span>
                  Accept Application
                </button>
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 border border-slate-200">
                  <span className="material-symbols-outlined text-base">
                    close
                  </span>
                  Reject Application
                </button>
              </div>
            </div>

            {/* Recruiter Notes */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Recruiter Notes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Strong portfolio and impressive communication skills. Highly
                recommended for technical interview round.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
