"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/features/toast/toastSlice";

interface BookmarkIconProps {
  jobId: string;
  initialIsSaved: boolean;
}

export default function BookmarkIcon({
  jobId,
  initialIsSaved,
}: BookmarkIconProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/jobs/${jobId}/save`, { method: "POST" });

      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.isSaved);
        dispatch(
          showToast({
            message: data.isSaved
              ? "Job saved."
              : "Job removed from saved jobs.",
            variant: "success",
          }),
        );
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("API error response:", res.status, errorData);
        dispatch(
          showToast({
            message:
              errorData.error ||
              errorData.message ||
              "Failed to update saved job.",
            variant: "error",
          }),
        );
      }
    } catch (err) {
      console.error("Failed to toggle save", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update saved job.";

      dispatch(
        showToast({
          message: errorMessage,
          variant: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      aria-label={isSaved ? "Remove saved job" : "Save job"}
      className={`shrink-0 z-20 p-1 transition-colors ${
        loading
          ? "cursor-wait opacity-60"
          : isSaved
            ? "text-[#142175]"
            : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <span className="material-symbols-outlined">
        {loading
          ? "progress_activity"
          : isSaved
            ? "bookmark_added"
            : "bookmark"}
      </span>
    </button>
  );
}
