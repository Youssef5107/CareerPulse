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
    const stored = localStorage.getItem("recently_viewed_jobs");
    let jobs = stored ? JSON.parse(stored) : [];

    // Remove duplicates and place the current job at the top
    jobs = [job, ...jobs.filter((j: { id: string }) => j.id !== job.id)].slice(
      0,
      5,
    );

    localStorage.setItem("recently_viewed_jobs", JSON.stringify(jobs));
  }, [job]);

  return null;
}
