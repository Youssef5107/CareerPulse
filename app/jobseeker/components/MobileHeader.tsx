"use client";

import React from "react";

interface MobileHeaderProps {
  onMenuClick?: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="md:hidden bg-surface border-b border-outline-variant fixed top-0 left-0 w-full z-40 flex justify-between items-center h-16 px-md">
      <div className="flex items-center gap-3 text-secondary">
        <button
          onClick={onMenuClick}
          aria-label="Open Navigation Menu"
          className="material-symbols-outlined hover:bg-surface-container-low text-on-surface transition-colors rounded-full p-1 cursor-pointer active:scale-95 duration-150"
        >
          menu
        </button>
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile font-bold text-primary tracking-tight">
          CareerPulse
        </h1>
      </div>
      <button
        aria-label="Notifications"
        className="material-symbols-outlined text-secondary hover:bg-surface-container-low transition-colors rounded-full p-2 cursor-pointer active:scale-95 duration-150"
      >
        notifications
      </button>
    </header>
  );
}
