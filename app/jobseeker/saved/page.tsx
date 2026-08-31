"use client";

import React from "react";
import Image from "next/image";

export default function SavedJobsPage() {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f8f9ff] px-4 md:px-12 pb-6 md:pb-12 pt-20 md:pt-12">
      <div className="max-w-[1024px] mx-auto">
        {/* Page Header */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Saved Jobs
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              You have 4 saved opportunities.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                sort
              </span>
              Newest First
            </button>
          </div>
        </header>

        {/* Saved Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Card 1 - Highlighted */}
          <article className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:-translate-y-[2px] transition-transform duration-300">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#142175]"></div>

            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative bg-slate-50">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjfSKf5vN83Ai5tLm3b8w6ITEyl7LDsqwYnbcA_BAQYflCIlmm8OzLIpOedB1NG04d4NfRKGd_TUtb_pKSQOtQaRgI-udRRZ4ydR-Ks4uUvLQP1yZkzn28ebUOH8MjWA1UvJhyXjzfgvlPwMa6pbJBxxjvvD1QUntNrzCuqN75_gjAmMGI4epEwQxgNewMxs4XjTqjRjpoxfGjs54UxxOfS8AUfnle-ynJ4qkzZwPFRVn_eIPuOw"
                alt="Acme Corp logo"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Senior Product Designer
                    </h3>
                    <p className="text-sm text-[#142175] font-medium mt-0.5">
                      Acme Corp • San Francisco, CA (Hybrid)
                    </p>
                  </div>
                  <button className="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50">
                    <span
                      className="material-symbols-outlined text-[#142175]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                    $140k - $180k
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                    Full-time
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                    Design Systems
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-400">Saved 2 days ago</p>
                <button className="h-[44px] px-6 bg-[#142175] text-white text-xs font-semibold rounded-lg hover:bg-[#142175]/90 transition-all shadow-sm">
                  Quick Apply
                </button>
              </div>
            </div>
          </article>

          {/* Job Card 2 */}
          <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between gap-4 relative group hover:-translate-y-[2px] transition-transform duration-300">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 relative bg-slate-50">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDou0Z3Kv_lQzkLl2kfmp3OZ_cNxWDs1DEIQ5MUq26hBP00jcw-kBJFwyyi5Bf2aIuG6FRz8slOUPPmBNENWuhhc4HpMWef4QLBFIO3X2YnnNksoNW__-J0x6-G3t8Q53LCtS9z835BdIbiPezexOwTRcS4wiett4SEMiKIUK8gaCoDaky-vOfWkS1_xDuQfDYPHqiStc75BW5NvSMtV5MuamESAQW9MIC3BlTyg_80MMzh1t8ZFQ"
                    alt="Nebula Tech logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    UX Engineer
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Nebula Tech • Remote
                  </p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-red-50">
                <span
                  className="material-symbols-outlined text-[20px] text-[#142175]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bookmark
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-slate-400">Saved 1 week ago</p>
              <button className="h-[40px] px-4 border border-[#142175] text-[#142175] text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
            </div>
          </article>

          {/* Job Card 3 */}
          <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between gap-4 relative group hover:-translate-y-[2px] transition-transform duration-300">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 relative bg-slate-50">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWUfYjzwMPIjle16UadmhYO_PU97ZNVtFvXrYDEToY7yn_Ue3MdKszhj5i32woJ_s63lsDkMVOuNGyEcZZkq-GFTpV5DtuMEuAThaja-rjh06piDah5v-Mo0NW_O7fxQl1yWIkJwp5061XoltGQS7A5bJXGMFPIWBaoKnR5GYLmbUL6IT9WI7hZQqLC0tjM7oj5wrEA8E_iPTYfR9ghYEeFD75BA8e1MuN295hQJ3RpPqoS4nBGQ"
                    alt="Global Finance logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Front-End Developer
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Global Finance • New York, NY
                  </p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-red-50">
                <span
                  className="material-symbols-outlined text-[20px] text-[#142175]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bookmark
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-slate-400">Saved 2 weeks ago</p>
              <button className="h-[40px] px-4 border border-[#142175] text-[#142175] text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
            </div>
          </article>

          {/* Job Card 4 */}
          <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between gap-4 relative group hover:-translate-y-[2px] transition-transform duration-300">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg shrink-0 border border-slate-200 bg-slate-800 flex items-center justify-center text-white font-bold text-lg">
                  V
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Lead UI Designer
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Vanguard Studios • Austin, TX
                  </p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-red-50">
                <span
                  className="material-symbols-outlined text-[20px] text-[#142175]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bookmark
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-slate-400">Saved 1 month ago</p>
              <button className="h-[40px] px-4 border border-[#142175] text-[#142175] text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
