"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function isNavigationClick(event: MouseEvent, anchor: HTMLAnchorElement) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !anchor.target &&
    anchor.origin === window.location.origin &&
    anchor.href !== window.location.href
  );
}

export default function NavigationLoading() {
  const pathname = usePathname();
  const [pendingNavigation, setPendingNavigation] = useState<{
    targetPath: string;
    startPath: string;
  } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPendingNavigation(null);
    }, 0);
  }, [pathname]);

  // 2. Handle click and browser back/forward listeners
  useEffect(() => {
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (anchor && isNavigationClick(event, anchor)) {
        if (fallbackTimer) clearTimeout(fallbackTimer);
        setPendingNavigation({
          targetPath: new URL(anchor.href).pathname,
          startPath: pathname,
        });
        fallbackTimer = setTimeout(() => {
          setPendingNavigation(null);
        }, 10000);
      }
    };

    const resetState = () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      setPendingNavigation(null);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", resetState);
    window.addEventListener("pagehide", resetState);
    window.addEventListener("pageshow", resetState);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", resetState);
      window.removeEventListener("pagehide", resetState);
      window.removeEventListener("pageshow", resetState);
    };
  }, [pathname]);

  if (!pendingNavigation || pendingNavigation.startPath !== pathname) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-background/70 backdrop-blur-sm navigation-loading-enter">
      <div className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-surface-container-lowest px-5 py-4 shadow-xl">
        <span className="material-symbols-outlined animate-spin text-2xl text-secondary">
          progress_activity
        </span>
        <span className="text-sm font-semibold text-on-surface">
          Loading page...
        </span>
      </div>
    </div>
  );
}
