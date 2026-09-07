"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BookmarkIcon from "../components/BookmarkIcon";

interface SavedJobItem {
  id: string;
  savedAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    category: string;
  };
}

interface SavedJobsClientProps {
  initialSavedJobs: SavedJobItem[];
}

export default function SavedJobsClient({
  initialSavedJobs,
}: SavedJobsClientProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setNow(Date.now());
    }, 0);
  }, []);

  const categories = Array.from(
    new Set(initialSavedJobs.map((item) => item.job.category)),
  );

  const filteredJobs = initialSavedJobs.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.job.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.savedAt).getTime();
    const dateB = new Date(b.savedAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const getRelativeTimeString = (dateString: string) => {
    if (!now) return "Saved recently";

    const diffMs = now - new Date(dateString).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Saved today";
    if (diffDays === 1) return "Saved 1 day ago";
    if (diffDays < 7) return `Saved ${diffDays} days ago`;
    const weeks = Math.floor(diffDays / 7);
    if (weeks === 1) return "Saved 1 week ago";
    if (weeks < 4) return `Saved ${weeks} weeks ago`;
    const months = Math.floor(diffDays / 30);
    return months <= 1 ? "Saved 1 month ago" : `Saved ${months} months ago`;
  };

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto bg-[#f8f9ff] text-[#191c20] pt-20 md:pt-10 pb-16 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c20] tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-[#454651] text-xs md:text-sm mt-1">
            You have {initialSavedJobs.length} saved opportunities.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-white border border-[#c6c5d3]/40 hover:bg-[#eff4ff] text-[#454651] text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>
            Filter
          </button>

          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
            }
            className="bg-white border border-[#c6c5d3]/40 hover:bg-[#eff4ff] text-[#454651] text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">sort</span>
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </button>

          {isFilterOpen && (
            <div className="absolute top-12 left-0 z-30 w-48 bg-white border border-[#c6c5d3]/40 rounded-xl shadow-lg p-2">
              <div className="text-[11px] font-bold text-[#454651] uppercase px-2 py-1">
                Category
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === "ALL"
                    ? "bg-[#eff4ff] text-[#142175] font-bold"
                    : "text-[#454651] hover:bg-slate-50"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg capitalize transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#eff4ff] text-[#142175] font-bold"
                      : "text-[#454651] hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {sortedJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#c6c5d3]/30 p-12 text-center text-[#454651]">
          <span className="material-symbols-outlined text-4xl mb-2 text-[#767682]">
            bookmark_border
          </span>
          <p className="text-sm font-semibold">No saved jobs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedJobs.map((item, index) => {
            const isFeatured = index === 0 && selectedCategory === "ALL";

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border border-[#c6c5d3]/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 md:p-6 flex flex-col justify-between ${
                  isFeatured
                    ? "md:col-span-2 border-l-4 border-l-[#142175]"
                    : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex gap-3.5 items-start">
                      <div className="w-12 h-12 rounded-xl bg-[#e7e8ee] border border-[#c6c5d3]/20 shrink-0 flex items-center justify-center font-bold text-sm text-[#454651]">
                        {item.job.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#191c20] text-base md:text-lg leading-snug">
                          {item.job.title}
                        </h3>
                        <p className="text-xs text-[#454651] mt-0.5">
                          {item.job.company} • {item.job.location}
                        </p>
                      </div>
                    </div>
                    <BookmarkIcon jobId={item.job.id} initialIsSaved={true} />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.job.salary && (
                      <span className="bg-[#eff4ff] text-[#142175] text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {item.job.salary}
                      </span>
                    )}
                    <span className="bg-[#f8f9ff] text-[#454651] border border-[#c6c5d3]/30 text-[11px] font-medium px-2.5 py-1 rounded-md">
                      {item.job.type}
                    </span>
                    <span className="bg-[#f8f9ff] text-[#454651] border border-[#c6c5d3]/30 text-[11px] font-medium px-2.5 py-1 rounded-md capitalize">
                      {item.job.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#c6c5d3]/20 pt-4 mt-2">
                  <span className="text-xs text-[#767682] font-medium">
                    {getRelativeTimeString(item.savedAt)}
                  </span>
                  <Link
                    href={`/jobseeker/jobs/${item.job.id}`}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${
                      isFeatured
                        ? "bg-[#142175] text-white hover:bg-[#0f1959]"
                        : "bg-white text-[#191c20] border border-[#c6c5d3]/50 hover:bg-[#f8f9ff]"
                    }`}
                  >
                    {isFeatured ? "Quick Apply" : "View Details"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
