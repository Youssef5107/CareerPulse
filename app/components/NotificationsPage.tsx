"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNotificationHref } from "@/lib/notifications";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  createdAt: string;
}

const PAGE_SIZE = 10;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadNotifications() {
      try {
        const response = await fetch("/api/notifications");
        if (!response.ok) {
          throw new Error("Unable to load notifications.");
        }

        const data = (await response.json()) as NotificationItem[];
        if (isActive) {
          setNotifications(data);
          setIsLoading(false);
        }

        await fetch("/api/notifications", { method: "PATCH" });
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load notifications.",
          );
          setIsLoading(false);
        }
      }
    }

    loadNotifications();

    return () => {
      isActive = false;
    };
  }, []);

  const visibleNotifications = notifications.slice(0, visibleCount);
  const hasMore = visibleCount < notifications.length;

  return (
    <main className="min-h-screen bg-surface px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Activity center
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Keep up with your applications, candidates, and account activity.
            </p>
          </div>
          <span className="hidden rounded-full bg-surface-container-high px-3 py-1.5 text-xs font-semibold text-on-surface-variant sm:inline-flex">
            {notifications.length} total
          </span>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-10 text-center text-sm text-on-surface-variant">
            Loading notifications...
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm font-medium text-rose-800">
            {error}
          </div>
        )}

        {!isLoading && !error && notifications.length === 0 && (
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest px-6 py-16 text-center">
            <span className="material-symbols-outlined mb-3 text-4xl text-on-surface-variant">
              notifications_none
            </span>
            <h2 className="text-lg font-semibold text-on-surface">
              You&apos;re all caught up
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              New activity will appear here when it happens.
            </p>
          </div>
        )}

        {!isLoading && !error && notifications.length > 0 && (
          <div className="space-y-3">
            {visibleNotifications.map((notification) => (
              <Link
                key={notification.id}
                href={getNotificationHref(notification.link)}
                className="group flex gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-md md:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-container text-secondary">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <h2 className="font-semibold text-on-surface group-hover:text-secondary">
                      {notification.title}
                    </h2>
                    <time
                      dateTime={notification.createdAt}
                      className="text-xs text-on-surface-variant"
                    >
                      {new Date(notification.createdAt).toLocaleString(
                        undefined,
                        { dateStyle: "medium", timeStyle: "short" },
                      )}
                    </time>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                    {notification.message}
                  </p>
                </div>
                <span className="material-symbols-outlined self-center text-on-surface-variant transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            ))}

            {hasMore && (
              <div className="flex justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-on-secondary shadow-sm transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
                >
                  View more
                  <span className="material-symbols-outlined text-lg">
                    expand_more
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
