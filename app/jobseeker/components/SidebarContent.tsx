"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarContentProps {
  onClose?: () => void;
}

export default function SidebarContent({ onClose }: SidebarContentProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/jobseeker/home", icon: "home" },
    { label: "Search", href: "/jobseeker/search", icon: "search" },
    { label: "Saved", href: "/jobseeker/saved", icon: "bookmark" },
    { label: "Profile", href: "/jobseeker/profile", icon: "person" },
  ];

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-white">
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-[#091426]">
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

          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose && onClose()}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-sm font-semibold ${
                  isActive
                    ? "bg-blue-50 text-[#2170e4]"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={
                    isActive ? { fontVariationSettings: "'FILL' 1" } : undefined
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

      {/* User Profile Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700">
            AM
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 leading-tight">
              Alex Morgan
            </span>
            <span className="text-xs text-slate-500">UX Designer</span>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400 text-base cursor-pointer hover:text-slate-600">
          more_vert
        </span>
      </div>
    </div>
  );
}
