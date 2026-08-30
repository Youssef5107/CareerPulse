"use client";

import React, { useState } from "react";

export default function JobAlertSidebar() {
  const [emailAlert, setEmailAlert] = useState(true);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm sticky top-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
          <span className="material-symbols-outlined">
            notifications_active
          </span>
        </div>
        <div>
          <h3 className="text-headline-md font-headline-md text-on-surface">
            Job Alert
          </h3>
          <p className="text-body-sm text-on-surface-variant">
            Stay updated on new roles
          </p>
        </div>
      </div>

      <p className="text-body-sm text-on-surface-variant mb-6">
        Create an alert for{" "}
        <strong className="text-on-surface">Product Designer</strong> in{" "}
        <strong className="text-on-surface">San Francisco</strong> and never
        miss an opportunity.
      </p>

      <div className="flex items-center justify-between mb-6 p-3 bg-surface-container-low rounded-lg">
        <span className="text-label-md font-label-md text-on-surface">
          Daily Email Summary
        </span>
        <button
          onClick={() => setEmailAlert(!emailAlert)}
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
            emailAlert
              ? "bg-secondary justify-end"
              : "bg-outline-variant justify-start"
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-on-primary shadow-md" />
        </button>
      </div>

      <button className="w-full bg-secondary text-on-primary py-2.5 rounded-lg font-label-md hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-[18px]">add_alert</span>
        Create Job Alert
      </button>
    </div>
  );
}
