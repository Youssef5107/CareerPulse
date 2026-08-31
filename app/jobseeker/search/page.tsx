"use client";

import React from "react";

export default function SearchPage() {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden bg-[#f8f9ff]">
      {/* Top Search Header */}
      {/* Top Search Header Container */}
      <header className="bg-white px-4 lg:px-8 pt-6 pb-5 border-b border-slate-200 shrink-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Section Title & Subtitle */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Find Your Next Role
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Explore over 12,000 open positions tailored for you.
            </p>
          </div>

          {/* Integrated Search Bar Container */}
          <div className="bg-[#f2f4fa] p-2 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-center gap-2">
            {/* Search Input: Title / Keyword */}
            <div className="relative flex-1 flex items-center w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 shadow-sm">
              <span className="material-symbols-outlined text-slate-400 text-xl mr-2.5 shrink-0">
                search
              </span>
              <input
                type="text"
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                placeholder="Job title, keywords, or company"
              />
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-[1px] h-8 bg-slate-300/60 mx-1 shrink-0" />

            {/* Search Input: Location */}
            <div className="relative flex-1 flex items-center w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 shadow-sm">
              <span className="material-symbols-outlined text-slate-400 text-xl mr-2.5 shrink-0">
                location_on
              </span>
              <input
                type="text"
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                placeholder="City, state, or remote"
              />
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-[1px] h-8 bg-slate-300/60 mx-1 shrink-0" />

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-lg">tune</span>
                Filters
              </button>

              <button className="flex-1 md:flex-none bg-[#142175] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#142175]/90 transition-colors shadow-sm whitespace-nowrap">
                Search Jobs
              </button>
            </div>
          </div>

          {/* Filter Tags / Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button className="px-4 py-1.5 bg-[#dbe2ff] text-[#142175] rounded-full text-xs font-semibold whitespace-nowrap transition-colors">
              All Roles
            </button>
            <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-full text-xs font-medium hover:bg-slate-50 whitespace-nowrap transition-colors">
              Remote
            </button>
            <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-full text-xs font-medium hover:bg-slate-50 whitespace-nowrap transition-colors">
              Engineering
            </button>
            <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-full text-xs font-medium hover:bg-slate-50 whitespace-nowrap transition-colors">
              Design
            </button>
            <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-full text-xs font-medium hover:bg-slate-50 whitespace-nowrap transition-colors">
              Full-time
            </button>
          </div>
        </div>
      </header>

      {/* Two-Column Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 gap-4 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Left Column: Job List */}
        {/* Left Column: Job List */}
        <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden h-[350px] lg:h-full shadow-sm">
          {/* Header with Sort dropdown */}
          <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center shrink-0">
            <span className="text-xs font-semibold text-slate-500">
              Showing 245 results
            </span>
            <button className="text-[#142175] text-xs font-semibold flex items-center gap-1 hover:underline">
              Sort by: Relevance
              <span className="material-symbols-outlined text-[16px]">
                expand_more
              </span>
            </button>
          </div>

          {/* Job Cards Container */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50 min-h-0">
            {/* Active Job Card */}
            <div className="bg-white border-2 border-[#142175] rounded-xl p-4 cursor-pointer relative shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-4 right-4">
                <span
                  className="material-symbols-outlined text-[#142175] text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bookmark
                </span>
              </div>

              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-400 text-sm">
                  TF
                </div>
                <div className="pr-6 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 leading-tight truncate">
                    Senior UX Designer
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    TechFlow Systems • San Francisco, CA (Hybrid)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Full-time
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Mid-Senior
                </span>
              </div>

              <div className="flex justify-between items-end pt-1">
                <span className="text-sm font-bold text-[#142175]">
                  $130k – $160k
                </span>
                <span className="text-xs text-slate-400">2 days ago</span>
              </div>
            </div>

            {/* Inactive Job Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#142175]/40 transition-all relative">
              <div className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-xl">
                  bookmark_border
                </span>
              </div>

              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-400 text-sm">
                  AF
                </div>
                <div className="pr-6 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 leading-tight truncate">
                    Product Designer
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    Apex Financial • New York, NY (Remote)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Contract
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Remote
                </span>
              </div>

              <div className="flex justify-between items-end pt-1">
                <span className="text-sm font-bold text-slate-900">
                  $90/hr – $110/hr
                </span>
                <span className="text-xs text-slate-400">5 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden min-w-0 h-full">
          {/* Header section (Fixed inside card) */}
          <div className="p-4 sm:p-6 border-b border-slate-100 bg-white shrink-0">
            <div className="flex justify-between items-center gap-4 mb-4">
              <div className="flex gap-3 items-center min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 shrink-0">
                  TF
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900 truncate">
                    Senior UX Designer
                  </h2>
                  <p className="text-xs text-slate-500 truncate">
                    TechFlow Systems • San Francisco, CA
                  </p>
                </div>
              </div>
              <button className="bg-[#142175] text-white px-5 py-2 rounded-xl text-sm font-semibold shrink-0">
                Apply Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="block text-slate-400">Salary</span>
                <span className="font-bold text-slate-900">$130k - $160k</span>
              </div>
              <div>
                <span className="block text-slate-400">Job Type</span>
                <span className="font-bold text-slate-900">Full-time</span>
              </div>
              <div>
                <span className="block text-slate-400">Experience</span>
                <span className="font-bold text-slate-900">Mid-Senior</span>
              </div>
            </div>
          </div>

          {/* Body Section (Scrolls independently) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-slate-600 text-sm min-h-0">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                About the Role
              </h3>
              <p className="leading-relaxed">
                TechFlow Systems is seeking a highly skilled and passionate
                Senior UX Designer to join our core product team. You will be
                responsible for designing complex, enterprise-level web
                applications that feel effortless and intuitive to our end
                users.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Key Responsibilities
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lead UX design for major product verticals.</li>
                <li>
                  Create wireframes, user flows, and high-fidelity mockups.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
