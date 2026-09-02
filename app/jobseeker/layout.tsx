"use client";

import React, { useState } from "react";
import Link from "next/link";
import SideNavBar from "./components/SideNavBar";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top Header */}
      <header className="h-16 bg-surface-container-lowest border-b border-outline-variant px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined text-2xl block">
              menu
            </span>
          </button>
          <Link
            href="/employer/dashboard"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            className="text-xl font-bold text-primary tracking-tight"
          >
            CareerPulse
          </Link>
        </div>

        <button
          className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer relative"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-2xl">
            notifications
          </span>
        </button>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 relative">
        <SideNavBar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="flex-1 w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
