import React from "react";
import { PrismaClient } from "@/app/generated/prisma";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import RecentlyViewed from "../components/RecentlyViewed";

const prisma = new PrismaClient();

const categoryMetadata: Record<string, { icon: string; bg: string }> = {
  design: { icon: "palette", bg: "bg-blue-50 text-blue-600" },
  engineering: { icon: "code", bg: "bg-indigo-50 text-indigo-600" },
  marketing: { icon: "campaign", bg: "bg-sky-50 text-sky-600" },
  data: { icon: "analytics", bg: "bg-teal-50 text-teal-600" },
  sales: { icon: "trending_up", bg: "bg-emerald-50 text-emerald-600" },
  product: { icon: "inventory_2", bg: "bg-amber-50 text-amber-600" },
};

export default async function JobSeekerHomePage() {
  const rawJobs = await prisma.job.findMany({
    select: {
      category: true,
    },
  });

  const categoryMap = rawJobs.reduce<
    Record<string, { displayName: string; count: number }>
  >((acc, job) => {
    if (!job.category) return acc;
    const trimmed = job.category.trim();
    const key = trimmed.toLowerCase();

    if (!acc[key]) {
      const formattedName = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      acc[key] = { displayName: formattedName, count: 0 };
    }

    acc[key].count += 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryMap).map(([key, data]) => {
    const meta = categoryMetadata[key] || {
      icon: "folder",
      bg: "bg-slate-50 text-slate-600",
    };

    return {
      key,
      name: data.displayName,
      count: `${data.count.toLocaleString()} ${data.count === 1 ? "job" : "jobs"}`,
      icon: meta.icon,
      bg: meta.bg,
    };
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
      </div>

      {/* Search Bar Component */}
      <div className="mb-4">
        <SearchBar />
      </div>

      {/* Popular Chips */}
      <div className="flex items-center gap-2 mb-10 text-xs text-slate-500 flex-wrap">
        <span className="bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
          Popular:
        </span>
        <Link
          href="/jobseeker/search?query=Product+Manager"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full cursor-pointer transition-colors"
        >
          Product Manager
        </Link>
        <Link
          href="/jobseeker/search?query=UX+Designer"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full cursor-pointer transition-colors"
        >
          UX Designer
        </Link>
        <Link
          href="/jobseeker/search?query=Data+Scientist"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full cursor-pointer transition-colors"
        >
          Data Scientist
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Deduplicated Categories Grid) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Explore Categories
              </h2>
              <Link
                href="/jobseeker/categories"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.key}
                  href={`/jobseeker/categories/${encodeURIComponent(cat.key)}`}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-all text-center flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                  >
                    <span className="material-symbols-outlined">
                      {cat.icon}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm truncate w-full">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Recently Viewed Jobs Sidebar) */}
        <div className="lg:col-span-5 space-y-6">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
}
