"use client";

import React from "react";

export default function SearchPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9ff] overflow-y-auto pt-16 md:pt-0">
      {/* Top Search Header */}
      <header className="bg-white px-4 md:px-8 py-6 z-10 border-b border-slate-200 shadow-sm shrink-0">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
              Find Your Next Role
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              Explore over 12,000 open positions tailored for you.
            </p>
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <div className="relative flex-1 min-w-[200px] flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-slate-400">
                search
              </span>
              <input
                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Job title, keywords, or company"
                type="text"
              />
            </div>

            <div className="hidden lg:block w-px h-8 bg-slate-200"></div>

            <div className="relative flex-1 min-w-[200px] flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-slate-400">
                location_on
              </span>
              <input
                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="City, state, or remote"
                type="text"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none justify-center bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors h-[46px]">
                <span className="material-symbols-outlined text-slate-500 text-lg">
                  tune
                </span>{" "}
                Filters
              </button>
              <button className="flex-1 sm:flex-none justify-center bg-[#142175] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#142175]/90 transition-all shadow-sm h-[46px]">
                Search Jobs
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-start">
            <button className="px-4 py-1.5 rounded-full bg-blue-100 text-[#142175] text-xs font-semibold whitespace-nowrap">
              All Roles
            </button>
            <button className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-semibold border border-slate-200 hover:bg-slate-50 whitespace-nowrap">
              Remote
            </button>
            <button className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-semibold border border-slate-200 hover:bg-slate-50 whitespace-nowrap">
              Engineering
            </button>
            <button className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-semibold border border-slate-200 hover:bg-slate-50 whitespace-nowrap">
              Design
            </button>
            <button className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-semibold border border-slate-200 hover:bg-slate-50 whitespace-nowrap">
              Full-time
            </button>
          </div>
        </div>
      </header>

      {/* Main Container View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden max-w-[1280px] w-full mx-auto p-4 md:p-6 gap-6">
        {/* Left Column: Job Cards */}
        <div className="w-full md:w-[400px] shrink-0 flex flex-col md:h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">
              Showing 245 results
            </span>
            <button className="text-[#142175] text-xs font-semibold flex items-center gap-1">
              Sort by: Relevance{" "}
              <span className="material-symbols-outlined text-[16px]">
                expand_more
              </span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
            {/* Active Card */}
            <div className="bg-white border-2 border-[#142175] rounded-xl p-4 cursor-pointer relative shadow-sm">
              <div className="absolute top-4 right-4">
                <span
                  className="material-symbols-outlined text-[#142175]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bookmark
                </span>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-400">
                  TF
                </div>
                <div className="pr-6">
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Senior UX Designer
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    TechFlow Systems • San Francisco, CA (Hybrid)
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Full-time
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Mid-Senior
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-[#142175]">
                  $130k - $160k
                </span>
                <span className="text-xs text-slate-400">2 days ago</span>
              </div>
            </div>

            {/* Regular Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#142175]/40 transition-all relative">
              <div className="absolute top-4 right-4 text-slate-300 hover:text-slate-500">
                <span className="material-symbols-outlined">
                  bookmark_border
                </span>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-400">
                  AF
                </div>
                <div className="pr-6">
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Product Designer
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Apex Financial • New York, NY (Remote)
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Contract
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase">
                  Remote
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-slate-900">
                  $90/hr - $110/hr
                </span>
                <span className="text-xs text-slate-400">5 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="flex-1 flex flex-col md:h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Sticky Header */}
          <div className="p-6 border-b border-slate-100 bg-white shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xl text-slate-400 shrink-0">
                  TF
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Senior UX Designer
                  </h2>
                  <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                    TechFlow Systems{" "}
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>{" "}
                    San Francisco, CA
                  </p>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="w-11 h-11 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors shrink-0">
                  <span
                    className="material-symbols-outlined text-[#142175]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bookmark
                  </span>
                </button>
                <button className="flex-1 sm:flex-none bg-[#142175] text-white px-6 rounded-xl text-sm font-semibold hover:bg-[#142175]/90 transition-all h-11">
                  Apply Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="block text-xs text-slate-400 font-medium mb-1">
                  Salary
                </span>
                <span className="text-sm font-bold text-slate-900">
                  $130,000 - $160,000
                </span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-medium mb-1">
                  Job Type
                </span>
                <span className="text-sm font-bold text-slate-900">
                  Full-time, Hybrid
                </span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-medium mb-1">
                  Experience
                </span>
                <span className="text-sm font-bold text-slate-900">
                  Mid-Senior Level
                </span>
              </div>
            </div>
          </div>

          {/* Description Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-600 text-sm leading-relaxed">
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                About the Role
              </h3>
              <p className="mb-3">
                TechFlow Systems is seeking a highly skilled and passionate
                Senior UX Designer to join our core product team. You will be
                responsible for designing complex, enterprise-level web
                applications that feel effortless and intuitive to our end
                users.
              </p>
              <p>
                In this role, you will partner closely with product managers,
                engineers, and researchers to understand user needs, map out
                complex workflows, and deliver polished, high-fidelity designs.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Key Responsibilities
              </h3>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#142175]">
                <li>
                  Lead the UX design for a major new product vertical from
                  concept to launch.
                </li>
                <li>
                  Create wireframes, user flows, prototypes, and high-fidelity
                  mockups using Figma.
                </li>
                <li>
                  Conduct user research and usability testing to validate design
                  decisions.
                </li>
                <li>
                  Collaborate seamlessly with frontend engineering to ensure
                  pixel-perfect implementation.
                </li>
                <li>
                  Contribute to and help maintain our evolving design system.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
