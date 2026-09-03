"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ApplyButtonProps {
  jobId: string;
  hasApplied: boolean;
}

export default function ApplyButton({
  jobId,
  hasApplied: initialHasApplied,
}: ApplyButtonProps) {
  const [hasApplied, setHasApplied] = useState(initialHasApplied);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApply = async () => {
    if (hasApplied || loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to submit application");
        setLoading(false);
        return;
      }

      setHasApplied(true);
      router.refresh(); // Refresh page data
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 pt-1 w-full">
      <button
        onClick={handleApply}
        disabled={hasApplied || loading}
        className={`flex-1 sm:flex-initial sm:w-48 text-sm font-semibold h-11 px-5 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 ${
          hasApplied
            ? "bg-emerald-600 text-white cursor-default opacity-90"
            : "bg-[#142175] text-white hover:bg-[#2e3a8c] active:scale-[0.98] disabled:opacity-60"
        }`}
      >
        {loading ? (
          <span>Applying...</span>
        ) : hasApplied ? (
          <>
            <span className="material-symbols-outlined text-lg">
              check_circle
            </span>
            <span>Applied</span>
          </>
        ) : (
          <>
            <span>Apply Now</span>
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </>
        )}
      </button>

      <button className="flex-1 sm:flex-initial sm:w-48 bg-[#f8f9ff] text-[#142175] border border-[#767682]/40 text-sm font-semibold h-11 px-5 rounded-xl hover:bg-[#eff4ff] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-lg">bookmark</span>
        <span>Save Job</span>
      </button>
    </div>
  );
}
