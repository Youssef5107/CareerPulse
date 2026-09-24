"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";

interface SideNavBarProps {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  onWidthChange: (width: number) => void;
}

export default function SideNavBar({
  isOpen,
  onClose,
  width,
  onWidthChange,
}: SideNavBarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/employer/dashboard", icon: "dashboard" },
    { label: "My Postings", href: "/employer/postings", icon: "work" },
    {
      label: "Post a Job",
      href: "/employer/post-job/job-details",
      activePaths: [
        "/employer/post-job/job-details",
        "/employer/post-job/job-description",
        "/employer/post-job/job-review",
      ],
      icon: "add_circle",
    },
    { label: "Applicants", href: "/employer/applicants", icon: "group" },
    {
      label: "Interviews",
      href: "/employer/interviews",
      icon: "calendar_month",
    },
    {
      label: "Company Profile",
      href: "/employer/company-profile",
      icon: "business",
    },
    {
      label: "Notifications",
      href: "/employer/notifications",
      icon: "notifications",
    },
    { label: "Settings", href: "/employer/settings", icon: "settings" },
  ];
  const isPathActive = (item: (typeof navItems)[number]) => {
    const paths = item.activePaths ?? [item.href];
    return paths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
  };

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Slide-out Sidebar covering full height */}
      <aside
        style={{ "--sidebar-width": `${width}px` } as React.CSSProperties}
        className={`fixed top-0 bottom-auto h-dvh w-64 bg-surface-container-low border-r border-outline-variant z-60 transition-[left] duration-200 ease-in-out flex flex-col justify-between p-4 overflow-hidden lg:sticky lg:top-16 lg:bottom-0 lg:left-auto lg:h-[calc(100vh-4rem)] lg:w-(--sidebar-width) lg:shrink-0 lg:transition-[width] lg:duration-150 ${
          isOpen ? "left-0" : "-left-full"
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
              className="lg:hidden p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-xl block">
                close
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = isPathActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "auto" });
                    onClose();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                  aria-current={isActive ? "page" : undefined}
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
            href="/employer/help"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "auto" });
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-xl">help</span>
            Help
          </Link>
          <LogoutButton onClose={onClose} />
        </div>

        <div
          role="separator"
          aria-label="Resize sidebar"
          onPointerDown={(event) => {
            event.preventDefault();
            const startX = event.clientX;
            const startWidth = width;
            const handlePointerMove = (moveEvent: PointerEvent) => {
              onWidthChange(
                Math.min(
                  380,
                  Math.max(220, startWidth + moveEvent.clientX - startX),
                ),
              );
            };
            const handlePointerUp = () => {
              window.removeEventListener("pointermove", handlePointerMove);
              window.removeEventListener("pointerup", handlePointerUp);
            };
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
          }}
          className="hidden lg:block absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-secondary/40 active:bg-secondary/60"
        />
      </aside>
    </>
  );
}
