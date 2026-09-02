"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNavBar({ isOpen, onClose }: SideNavBarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/employer/dashboard", icon: "dashboard" },
    { label: "My Postings", href: "/employer/postings", icon: "work" },
    { label: "Post a Job", href: "/employer/post-job", icon: "add_circle" },
    { label: "Applicants", href: "/employer/applicants", icon: "group" },
  ];

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out Sidebar covering full height */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-surface-container-low border-r border-outline-variant z-[60] transform transition-transform duration-200 ease-in-out flex flex-col justify-between p-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Top Header inside Sidebar with Close (X) Button */}
          {/* Top Header inside Sidebar with Close (X) Button */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-3">
              {/* Briefcase Badge Icon */}
              <div className="w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-sm">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  work
                </span>
              </div>

              {/* Title Hierarchy */}
              <div className="flex flex-col">
                <h2 className="font-bold text-[#1d2975] text-lg leading-snug">
                  CareerPulse
                </h2>
                <p className="text-xs text-slate-500 leading-tight">
                  Hiring Manager
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-xl block">
                close
              </span>
            </button>
          </div>

          {/* Action Button */}
          <Link
            href="/employer/post-job/job-details"
            onClick={onClose}
            className="w-full bg-secondary text-on-secondary py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Post a Job
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Links */}
        <div className="border-t border-outline-variant pt-4 flex flex-col gap-1">
          <Link
            href="/help"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-xl">help</span>
            Help
          </Link>
          <button
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors w-full text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
