import React from "react";
import { PrismaClient } from "@/app/generated/prisma";
import Link from "next/link";

const prisma = new PrismaClient();

const categoryMetadata: Record<string, { icon: string; bg: string }> = {
  Design: { icon: "palette", bg: "bg-blue-50 text-blue-600" },
  Engineering: { icon: "code", bg: "bg-indigo-50 text-indigo-600" },
  Marketing: { icon: "campaign", bg: "bg-sky-50 text-sky-600" },
  Data: { icon: "analytics", bg: "bg-teal-50 text-teal-600" },
  Sales: { icon: "trending_up", bg: "bg-emerald-50 text-emerald-600" },
  Product: { icon: "inventory_2", bg: "bg-amber-50 text-amber-600" },
};

export default async function JobSeekerHomePage() {
  const categoryCounts = await prisma.job.groupBy({
    by: ["category"],
    _count: {
      id: true,
    },
  });

  const countMap = categoryCounts.reduce(
    (acc, curr) => {
      acc[curr.category] = curr._count.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  const primaryCategoryNames = ["Design", "Engineering", "Marketing", "Data"];

  const categories = primaryCategoryNames.map((name) => {
    const jobCount = countMap[name] || 0;
    const meta = categoryMetadata[name] || {
      icon: "work",
      bg: "bg-slate-50 text-slate-600",
    };

    return {
      name,
      count: `${jobCount.toLocaleString()} ${jobCount === 1 ? "job" : "jobs"}`,
      icon: meta.icon,
      bg: meta.bg,
    };
  });

  const recommendedJob = await prisma.job.findFirst({
    orderBy: { postedAt: "desc" },
  });

  return (
    <div className="pt-20 md:pt-10 pb-12 px-4 md:px-10 max-w-6xl mx-auto w-full">
      {/* Header Container */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find your next <br /> career move
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base max-w-xl">
            Discover opportunities that match your skills, experience, and
            aspirations across top global companies.
          </p>
        </div>
        <button className="hidden md:flex p-2.5 text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-colors">
          <span className="material-symbols-outlined text-xl">
            notifications
          </span>
        </button>
      </div>

      {/* Unified Search Bar */}
      <div className="bg-white p-2 md:p-3 rounded-2xl border border-slate-200 shadow-sm mb-4 flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
          <span className="material-symbols-outlined text-slate-400 mr-3">
            search
          </span>
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="w-full bg-transparent border-none text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="flex-1 flex items-center px-4 py-2">
          <span className="material-symbols-outlined text-slate-400 mr-3">
            location_on
          </span>
          <input
            type="text"
            placeholder="City, state, zip code, or 'remote'"
            className="w-full bg-transparent border-none text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
        </div>
        <button className="bg-[#2170e4] hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shrink-0">
          Search Jobs
        </button>
      </div>

      {/* Popular Chips */}
      <div className="flex items-center gap-2 mb-10 text-xs text-slate-500 flex-wrap">
        <span>Popular:</span>
        <span className="bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full cursor-pointer">
          Product Manager
        </span>
        <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full cursor-pointer">
          UX Designer
        </span>
        <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full cursor-pointer">
          Data Scientist
        </span>
      </div>

      {/* Category Section & Side Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Content) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Explore Categories */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Explore Categories
              </h2>
              <a
                href="/jobseeker/search"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/jobseeker/categories/${encodeURIComponent(cat.name.toLowerCase())}`}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all text-center flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                  >
                    <span className="material-symbols-outlined">
                      {cat.icon}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Recommended for You
            </h2>
            <div className="space-y-4">
              {recommendedJob && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      {recommendedJob.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">
                        {recommendedJob.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {recommendedJob.company} • {recommendedJob.location}
                      </p>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {recommendedJob.salary && (
                          <span className="bg-blue-50 text-blue-600 text-[11px] font-medium px-2.5 py-1 rounded">
                            {recommendedJob.salary}
                          </span>
                        )}
                        <span className="bg-slate-100 text-slate-600 text-[11px] px-2.5 py-1 rounded">
                          {recommendedJob.type}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-[11px] px-2.5 py-1 rounded">
                          {recommendedJob.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Strength */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-slate-900">
                Profile Strength
              </h3>
              <span className="text-xs font-bold text-blue-600">75%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
              <div className="bg-blue-600 h-full w-[75%]" />
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Add your portfolio link to stand out to design recruiters.
            </p>
            <button className="w-full border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs py-2.5 rounded-lg transition-colors">
              Update Profile
            </button>
          </div>

          {/* Trending Companies */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-4">
              Trending Companies
            </h3>
            <div className="space-y-4">
              {["CloudSync", "RetailNext", "HealthPlus"].map((company) => (
                <div
                  key={company}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {company[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {company}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        42 open roles
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 text-sm">
                    chevron_right
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
