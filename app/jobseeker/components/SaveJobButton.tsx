"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/features/toast/toastSlice";

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
  const dispatch = useAppDispatch();

  const handleToggle = async () => {
    if (!jobId || loading) return;
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
