"use client";

import { useEffect } from "react";

interface JobTrackerProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
  };
}

export default function JobTracker({ job }: JobTrackerProps) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("recently_viewed_jobs");
      const parsed = stored ? JSON.parse(stored) : [];
      const jobs = Array.isArray(parsed) ? parsed : [];
      const updatedJobs = [
        job,
        ...jobs.filter((item: { id?: string }) => item.id !== job.id),
      ].slice(0, 5);

      localStorage.setItem("recently_viewed_jobs", JSON.stringify(updatedJobs));
      window.dispatchEvent(new Event("recently-viewed-updated"));
    } catch (error) {
      console.error("Failed to save recently viewed job", error);
    }
  }, [job]);

  return null;
}
