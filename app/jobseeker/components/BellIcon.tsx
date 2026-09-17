"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Notification = {
  id: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    const res = await fetch("/api/notifications");
    if (res.ok) {
      const data = await res.json();
      setNotifications(data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchNotifications();
    }, 0);
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    if (unreadCount > 0) {
      await fetch("/api/notifications", { method: "PATCH" });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors"
      >
        <span className="material-symbols-outlined text-[24px]">
          notifications
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-background" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl z-50 p-4">
          <h4 className="font-semibold text-sm mb-3">Notifications</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-xs text-on-surface-variant py-2">
                No new notifications.
              </p>
            ) : (
              notifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.link || "#"}
                  className="block p-2.5 rounded-xl hover:bg-surface-container-low transition-colors text-left"
                >
                  <p className="text-xs font-semibold text-on-surface">
                    {n.title}
                  </p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    {n.message}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
