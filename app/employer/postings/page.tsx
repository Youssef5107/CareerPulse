"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPostings,
  setActiveTab,
  setSearchQuery,
  updatePostingStatus,
} from "@/store/features/postings/postingsSlice";

export default function EmployerPostingsPage() {
  const dispatch = useAppDispatch();
  const { items, activeTab, searchQuery, loading } = useAppSelector(
    (state) => state.postings,
  );

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPostings());
  }, [dispatch]);

  const handleStatusUpdate = (
    jobId: string,
    status: "ACTIVE" | "DRAFT" | "CLOSED",
  ) => {
    setOpenMenuId(null);
    dispatch(updatePostingStatus({ jobId, status }));
  };

  const counts = {
    ALL: items.length,
    ACTIVE: items.filter((p) => p.status === "ACTIVE").length,
    DRAFT: items.filter((p) => p.status === "DRAFT").length,
    CLOSED: items.filter((p) => p.status === "CLOSED").length,
  };

  const filteredPostings = items.filter((job) => {
    const matchesTab = activeTab === "ALL" || job.status === activeTab;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading && items.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        Loading job postings...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-12 max-w-[1280px] mx-auto w-full flex flex-col">
      {/* Page Header */}
      <div className="hidden md:flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-semibold text-primary mb-2 tracking-tight">
            My Postings
          </h1>
          <p className="text-base text-on-surface-variant">
            Manage your current job advertisements and review candidates.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search postings..."
              className="pl-10 pr-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:border-secondary text-sm w-64 outline-none"
            />
          </div>
          <Link
            href="/employer/post-job"
            className="bg-secondary text-on-secondary text-sm font-medium px-6 py-2 rounded-lg hover:bg-secondary-container transition-colors shadow-sm inline-flex items-center justify-center"
          >
            Post a Job
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-outline-variant overflow-x-auto pb-px">
        {(["ALL", "ACTIVE", "DRAFT", "CLOSED"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => dispatch(setActiveTab(tab))}
            className={`px-4 py-2 text-sm font-medium cursor-pointer capitalize ${
              activeTab === tab
                ? "text-secondary border-b-2 border-secondary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.toLowerCase()} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Postings Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPostings.map((job) => (
          <div
            key={job.id}
            className={`border rounded-xl p-4 lg:p-6 relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
              job.status === "DRAFT"
                ? "bg-surface-container-low border-dashed opacity-80"
                : job.status === "CLOSED"
                  ? "bg-slate-50 border-slate-200 opacity-60"
                  : "bg-surface-container-lowest border-outline-variant hover:border-secondary hover:shadow-sm"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {job.status}
                </span>
                <span className="text-sm text-on-surface-variant">
                  {job.postedDate}
                </span>
              </div>
              <Link
                href={`/employer/postings/${job.id}`}
                className="text-2xl font-semibold text-primary mb-1 hover:text-secondary block"
              >
                {job.title}
              </Link>
              <p className="text-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  location_on
                </span>{" "}
                {job.location} • {job.type}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-6 lg:gap-12 items-center">
              <div className="text-center">
                <p className="text-2xl font-semibold text-primary">
                  {job.totalApplicants}
                </p>
                <p className="text-sm text-on-surface-variant">Total</p>
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === job.id ? null : job.id)
                  }
                  className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>

                {openMenuId === job.id && (
                  <div className="absolute right-0 top-12 bg-white border border-slate-200 shadow-lg rounded-lg py-1 w-40 z-20 text-xs">
                    <button
                      onClick={() => handleStatusUpdate(job.id, "ACTIVE")}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 font-medium text-slate-700"
                    >
                      Set Active
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(job.id, "DRAFT")}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 font-medium text-slate-700"
                    >
                      Set Draft
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(job.id, "CLOSED")}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 font-medium text-red-600"
                    >
                      Close Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
