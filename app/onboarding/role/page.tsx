"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { setRole } from "./actions";

export default function ChooseRolePage() {
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [picked, setPicked] = useState<"JOB_SEEKER" | "EMPLOYER" | null>(null);

  const handleChoose = (role: "JOB_SEEKER" | "EMPLOYER") => {
    setPicked(role);
    startTransition(async () => {
      await setRole(role);
      await update({ role });
      router.push(role === "JOB_SEEKER" ? "/jobseeker/home" : "/employer/home");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-on-surface mb-2">
            One last thing
          </h1>
          <p className="text-sm text-on-surface-variant">
            How are you using CareerPulse?
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleChoose("JOB_SEEKER")}
            className="flex-1 py-6 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface font-medium disabled:opacity-50 transition-colors"
          >
            {isPending && picked === "JOB_SEEKER" ? "Setting up..." : "I'm a Job Seeker"}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleChoose("EMPLOYER")}
            className="flex-1 py-6 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface font-medium disabled:opacity-50 transition-colors"
          >
            {isPending && picked === "EMPLOYER" ? "Setting up..." : "I'm an Employer"}
          </button>
        </div>
      </div>
    </div>
  );
}
