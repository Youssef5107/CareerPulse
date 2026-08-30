"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/jobseeker/home", icon: "home" },
    { label: "Search", href: "/jobseeker/search", icon: "search" },
    { label: "Saved", href: "/jobseeker/saved", icon: "bookmark" },
    { label: "Profile", href: "/jobseeker/profile", icon: "person" },
  ];

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen md:h-screen flex overflow-hidden font-sans antialiased">
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full p-6 shrink-0 z-30 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8 text-[#091426]">
            <div className="w-10 h-10 bg-[#091426] text-white rounded-xl flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                work
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              CareerPulse
            </span>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-sm font-semibold ${
                    isActive
                      ? "bg-blue-50 text-[#2170e4]"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={
                      isActive
                        ? { fontVariationSettings: "'FILL' 1" }
                        : undefined
                    }
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Card Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700">
              AM
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                Alex Morgan
              </span>
              <span className="text-[11px] text-slate-500">UX Designer</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-slate-600">
            more_vert
          </span>
        </div>
      </aside>

      {/* Main Responsive Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto min-w-0">
        {/* Mobile Header Toggle Bar */}
        <header className="md:hidden bg-white border-b border-slate-200 fixed top-0 left-0 w-full z-40 flex justify-between items-center h-16 px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="text-lg font-bold text-slate-900">
              CareerPulse
            </span>
          </div>
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <span className="material-symbols-outlined text-xl">
              notifications
            </span>
          </button>
        </header>

        {children}
      </div>

      {/* Mobile Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer Side Menu */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-xl flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#091426] text-white rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-base">work</span>
            </div>
            <span className="font-bold text-slate-900">CareerPulse</span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
