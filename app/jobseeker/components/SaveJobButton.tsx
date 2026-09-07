"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SaveJobButtonProps {
  jobId: string;
  initialIsSaved: boolean;
}

export default function SaveJobButton({
  jobId,
  initialIsSaved,
}: SaveJobButtonProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    if (!jobId || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/jobs/${jobId}/save`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.isSaved);
        router.refresh();
      } else {
        console.error("API error response:", res.status);
      }
    } catch (err) {
      console.error("Failed to toggle save", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2.5 rounded-xl border font-semibold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors ${
        isSaved
          ? "bg-[#142175] text-white border-[#142175]"
          : "bg-white text-[#454651] border-[#c6c5d3]/40 hover:bg-[#f8f9ff]"
      }`}
    >
      <span className="material-symbols-outlined text-base">
        {isSaved ? "bookmark_added" : "bookmark"}
      </span>
      {isSaved ? "Saved" : "Save Job"}
    </button>
  );
}
