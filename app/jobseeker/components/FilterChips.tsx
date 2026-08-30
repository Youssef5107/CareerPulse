"use client";

import React, { useState } from "react";

export default function FilterChips() {
  const [selectedFilter, setSelectedFilter] = useState("Remote");

  return (
    <div className="bg-surface border-b border-outline-variant sticky top-16 z-20 md:static md:bg-transparent md:border-none">
      <div className="max-w-container-max mx-auto px-md py-3 flex gap-2 overflow-x-auto no-scrollbar items-center">
        <button className="flex-shrink-0 flex items-center gap-1 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-1.5 text-label-md font-label-md text-on-surface hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined text-[18px]">tune</span>{" "}
          Filters
        </button>

        <div className="w-px h-6 bg-outline-variant mx-1" />

        <button
          onClick={() => setSelectedFilter("Remote")}
          className={`flex-shrink-0 border rounded-full px-4 py-1.5 text-label-md font-label-md transition-colors ${
            selectedFilter === "Remote"
              ? "bg-secondary-fixed/20 border-secondary text-secondary"
              : "bg-surface-container-lowest border-outline-variant text-on-surface hover:bg-surface-container-low"
          }`}
        >
          Remote (34)
        </button>

        <button
          onClick={() => setSelectedFilter("Full-time")}
          className={`flex-shrink-0 border rounded-full px-4 py-1.5 text-label-md font-label-md transition-colors ${
            selectedFilter === "Full-time"
              ? "bg-secondary-fixed/20 border-secondary text-secondary"
              : "bg-surface-container-lowest border-outline-variant text-on-surface hover:bg-surface-container-low"
          }`}
        >
          Full-time
        </button>

        <button className="flex-shrink-0 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-1.5 text-label-md font-label-md text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-1">
          Salary Range{" "}
          <span className="material-symbols-outlined text-[16px]">
            arrow_drop_down
          </span>
        </button>

        <button className="flex-shrink-0 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-1.5 text-label-md font-label-md text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-1">
          Experience Level{" "}
          <span className="material-symbols-outlined text-[16px]">
            arrow_drop_down
          </span>
        </button>
      </div>
    </div>
  );
}
