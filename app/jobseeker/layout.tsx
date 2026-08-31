"use client";

import React, { useState } from "react";
import MobileHeader from "./components/MobileHeader";
import SidebarContent from "./components/SidebarContent";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen md:h-screen flex overflow-hidden font-sans antialiased">
      {/* 1. Desktop Permanent Sidebar */}
      <aside className="hidden md:block w-64 border-r border-slate-200 h-full shrink-0 z-30">
        <SidebarContent />
      </aside>

      {/* 2. Main Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto min-w-0">
        <MobileHeader onMenuClick={() => setIsDrawerOpen(true)} />
        {children}
      </div>

      {/* 3. Mobile Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* 4. Mobile Slide-over Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-xl ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onClose={() => setIsDrawerOpen(false)} />
      </aside>
    </div>
  );
}
