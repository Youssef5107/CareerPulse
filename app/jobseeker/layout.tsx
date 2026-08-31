"use client";

import React, { useState } from "react";
import MobileHeader from "./components/MobileHeader";
import SideNavBar from "./components/SideNavBar";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-background text-on-background h-screen flex overflow-hidden font-sans antialiased">
      {/* Permanent Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant/30 shrink-0 z-20 shadow-[4px_0_24px_rgba(30,41,59,0.02)] h-full">
        <SideNavBar />
      </aside>

      {/* Main Page Container */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative z-0 overflow-hidden">
        <MobileHeader onMenuClick={() => setIsDrawerOpen(true)} />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-xl ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideNavBar onClose={() => setIsDrawerOpen(false)} />
      </aside>
    </div>
  );
}
