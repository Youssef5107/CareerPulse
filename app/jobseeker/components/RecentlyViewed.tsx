"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
}

export default function RecentlyViewed() {
  const [recentJobs, setRecentJobs] = useState<JobItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recently_viewed_jobs");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        queueMicrotask(() => {
          setRecentJobs(parsed);
        });
      } catch (e) {
        console.error("Failed to parse recently viewed jobs", e);
      }
    }
  }, []);

  if (recentJobs.length === 0) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm text-slate-900">Recently Viewed</h3>
      </div>

      <div className="space-y-3">
        {recentJobs.slice(0, 3).map((job) => (
          <Link
            key={job.id}
            href={`/jobseeker/jobs/${job.id}`}
            className="p-3 bg-[#f8f9ff] hover:bg-[#eff4ff] rounded-xl border border-slate-200/50 transition-colors flex items-center justify-between group block"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-9 h-9 rounded-lg bg-white text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                {job.company.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {job.title}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {job.company} • {job.location}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm shrink-0">
              chevron_right
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
