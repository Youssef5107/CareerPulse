"use client";

import { useState } from "react";

interface ConfirmationMessageProps {
  message: string;
  onDismiss: () => void;
}

export default function ConfirmationMessage({
  message,
  onDismiss,
}: ConfirmationMessageProps) {
  const [isClosing, setIsClosing] = useState(false);

  return (
    <div
      role="status"
      aria-live="polite"
      onAnimationEnd={(event) => {
        if (event.animationName === "confirmation-exit") {
          onDismiss();
        }
      }}
      className={`fixed inset-0 z-90 flex items-center justify-center pointer-events-none px-6 ${
        isClosing ? "confirmation-message-exit" : "confirmation-message-enter"
      }`}
    >
      <div className="pointer-events-auto flex w-full max-w-md items-center gap-4 rounded-3xl border border-emerald-200 bg-white/95 px-6 py-5 text-emerald-950 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <span className="material-symbols-outlined text-2xl">
            check_circle
          </span>
        </div>
        <p className="flex-1 text-sm font-semibold leading-relaxed">
          {message}
        </p>
        <button
          type="button"
          onClick={() => setIsClosing(true)}
          className="rounded-full p-1.5 text-emerald-700/60 transition-colors hover:bg-emerald-50 hover:text-emerald-900"
          aria-label="Dismiss confirmation"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
}
