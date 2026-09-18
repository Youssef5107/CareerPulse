"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton({ onClose }: { onClose: () => void }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleConfirm = async () => {
    setIsSigningOut(true);
    onClose();
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
      >
        <span className="material-symbols-outlined text-xl">logout</span>
        Logout
      </button>

      {isConfirming && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/35 p-6 backdrop-blur-sm confirmation-dialog-enter">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-confirmation-title"
            className="w-full max-w-sm rounded-3xl border border-white/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <span className="material-symbols-outlined text-2xl">logout</span>
            </div>
            <h2
              id="logout-confirmation-title"
              className="text-xl font-bold text-slate-900"
            >
              Log out of CareerPulse?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              You can sign back in whenever you&apos;re ready.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                disabled={isSigningOut}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isSigningOut}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
