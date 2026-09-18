"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/features/toast/toastSlice";
import ConfirmationMessage from "@/app/components/ConfirmationMessage";

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
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

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
        dispatch(
          showToast({
            message: data.error || "Failed to submit application",
            variant: "error",
          }),
        );
        setLoading(false);
        return;
      }

      setHasApplied(true);
      setConfirmationMessage("Your application was submitted successfully.");
      router.refresh();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

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
    <>
      {confirmationMessage && (
        <ConfirmationMessage
          key={confirmationMessage}
          message={confirmationMessage}
          onDismiss={() => setConfirmationMessage(null)}
        />
      )}
      <button
        onClick={handleApply}
        disabled={hasApplied || loading}
        className={`text-sm font-semibold h-11 px-6 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 ${
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
    </>
  );
}
