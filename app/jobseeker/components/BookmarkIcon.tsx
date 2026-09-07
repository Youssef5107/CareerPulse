"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BookmarkIconProps {
  jobId: string;
  initialIsSaved: boolean;
}

export default function BookmarkIcon({
  jobId,
  initialIsSaved,
}: BookmarkIconProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const router = useRouter();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await fetch(`/api/jobs/${jobId}/save`, { method: "POST" });

      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.isSaved);
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("API error response:", res.status, errorData);
      }
    } catch (err) {
      console.error("Failed to toggle save", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`shrink-0 z-20 p-1 transition-colors ${
        isSaved ? "text-[#142175]" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <span className="material-symbols-outlined">
        {isSaved ? "bookmark_added" : "bookmark"}
      </span>
    </button>
  );
}
