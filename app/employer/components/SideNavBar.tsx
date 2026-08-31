"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavBar() {
  const pathname = usePathname();

  const mainNavItems = [
    {
      label: "Dashboard",
      href: "/employer/dashboard", // Updated from "/employer"
      icon: "dashboard",
    },
    {
      label: "My Postings",
      href: "/employer/postings",
      icon: "work",
    },
    {
      label: "Post a Job",
      href: "/employer/post-job",
      icon: "add_circle",
    },
    {
      label: "Applicants",
      href: "/employer/applicants",
      icon: "group",
    },
  ];

  const secondaryNavItems = [
    {
      label: "Help",
      href: "/employer/help",
      icon: "help",
    },
  ];

  return (
    <>
      {/* Desktop Side Navigation Bar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant z-40 p-6 justify-between">
        {" "}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 px-2 pt-2">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              corporate_fare
            </span>
            <div>
              <h1 className="text-2xl font-bold text-primary leading-none">
                Employer
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                Hiring Manager
              </p>
            </div>
          </div>

          <Link
            href="/employer/post-job"
            className="w-full bg-secondary hover:bg-secondary-container text-on-secondary text-sm font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
            Post a Job
          </Link>

          <nav className="flex flex-col gap-1 mt-2">
            {mainNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-secondary bg-secondary-fixed"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
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
        <nav className="flex flex-col gap-1 mb-2">
          {secondaryNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-secondary bg-secondary-fixed"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <span
                  className="material-symbols-outlined"
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

          <button className="flex items-center gap-4 px-4 py-2.5 w-full text-left text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Sticky Header */}
      <header className="md:hidden flex justify-between items-center px-6 w-full h-16 bg-surface border-b border-outline-variant z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            corporate_fare
          </span>
          <span className="text-xl font-bold text-primary">CareerPulse</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
    </>
  );
}
