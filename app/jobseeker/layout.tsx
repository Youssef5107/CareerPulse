"use client";

import React, { useState } from "react";
import Link from "next/link";
import SideNavBar from "./components/SideNavBar";
import NotificationBell from "../components/NotificationBell";
import PageTransition from "../components/PageTransition";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top Header */}
      <header className="h-16 bg-surface-container-lowest border-b border-outline-variant px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined text-2xl block">
              menu
            </span>
          </button>
          <Link
            href="/jobseeker/home"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            className="text-xl font-bold text-primary tracking-tight"
          >
            CareerPulse
          </Link>
        </div>

        <NotificationBell></NotificationBell>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 relative">
        <SideNavBar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
        />
        <main className="flex-1 min-w-0 w-full">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
