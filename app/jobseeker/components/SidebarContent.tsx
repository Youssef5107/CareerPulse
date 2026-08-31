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
    <div className="flex flex-col h-full justify-between p-6 bg-surface-container-lowest">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                work
              </span>
            </div>
            <span className="font-headline-md text-headline-md font-bold tracking-tight">
              CareerPulse
            </span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose && onClose()}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-secondary-fixed/20 text-secondary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: isActive
                      ? "'FILL' 1, 'wght' 700, 'opsz' 48"
                      : "'FILL' 0, 'wght' 400",
                  }}
                >
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="pt-6 border-t border-outline-variant/30">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-surface-container-low transition-colors text-left">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant shrink-0">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8i0Wh4Uj-7ewYNWItip4syTASfDCQXmRdFsJjj2G8OnfFxfsK_XScxnRFDHUKWOfec-8zGHPHmpiak6UVnud4zQf_gKoAlrR45r1qncaKgNjjqSvbSmSTknQrHh9jr2-fgopPdWYiBfbDxaRw5F6AH22QoqcWDKcucZOVL-oTrp96ROtdHzdp9oQTP4XFy_piaGzPf5itWtR9bzsvZROEjx4pdjvJyrjXEnlGVltIULRR9HHU6A"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-label-sm text-label-sm truncate">Alex Morgan</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate text-xs">
              UX Designer
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">
            more_vert
          </span>
        </button>
      </div>
    </div>
  );
}
