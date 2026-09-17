"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideToast } from "@/store/features/toast/toastSlice";

export default function Toast() {
  const dispatch = useAppDispatch();
  const { message, variant, isVisible } = useAppSelector(
    (state) => state.toast,
  );

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible || !message) return null;

  const variantStyles = {
    error: "bg-rose-50/95 border-rose-200 text-rose-800",
    success: "bg-emerald-50/95 border-emerald-200 text-emerald-800",
    info: "bg-sky-50/95 border-sky-200 text-sky-800",
  };

  const icons = {
    error: "error",
    success: "check_circle",
    info: "info",
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-2xl transition-all max-w-md ${variantStyles[variant]}`}
      >
        <span className="material-symbols-outlined text-xl">
          {icons[variant]}
        </span>
        <p className="text-sm font-medium leading-snug">{message}</p>
        <button
          onClick={() => dispatch(hideToast())}
          className="ml-auto opacity-70 hover:opacity-100 transition-opacity p-1"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
}
