"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signup } from "@/features/auth";

export default function SignUpPage() {
  const [role, setRole] = useState<"job-seeker" | "employer">("job-seeker");
  const [state, formAction, isPending] = useActionState(signup, undefined);

  // Deriving modal visibility directly from the form state
  const isSuccess = Boolean(state?.success);

  return (
    <div className="bg-background font-body-md text-on-background antialiased gradient-bg flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4 md:p-12 pb-12 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary-container/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        {/* Signup Card */}
        <div className="w-full max-w-[480px] glass-panel rounded-[24px] p-6 md:p-10 relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-on-surface mb-2">
              Create an account
            </h1>
            <p className="text-sm text-on-surface-variant">
              Join CareerPulse to unlock your potential.
            </p>
          </div>

          {state?.error && (
            <div className="mb-6 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {state.error}
            </div>
          )}

          {/* Role Selector */}
          <div className="flex bg-surface-container-low rounded-xl p-1 mb-6 shadow-sm">
            <button
              type="button"
              onClick={() => setRole("job-seeker")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "job-seeker"
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "employer"
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              Employer
            </button>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <input
              type="hidden"
              name="role"
              value={role === "job-seeker" ? "JOB_SEEKER" : "EMPLOYER"}
            />

            {/* First and Last Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-semibold text-on-surface-variant mb-1"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      person
                    </span>
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Jane"
                    className="block w-full pl-10 pr-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-semibold text-on-surface-variant mb-1"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      person
                    </span>
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Doe"
                    className="block w-full pl-10 pr-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Job Title / Headline Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-variant mb-1"
                htmlFor="headline"
              >
                Job Title / Headline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    work
                  </span>
                </div>
                <input
                  id="headline"
                  name="headline"
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer"
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-variant mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    mail
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-variant mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    lock
                  </span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-[48px] bg-primary hover:bg-primary-container text-on-primary font-medium text-sm rounded-xl shadow-md transform hover:-translate-y-[2px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:translate-y-0 mt-2"
            >
              <span>
                {isPending ? "Creating account..." : "Create Account"}
              </span>
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-on-surface-variant">
              By signing up, you agree to our{" "}
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
                href="/terms"
                className="text-primary hover:underline font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
                href="/privacy"
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-on-surface-variant">
              Already have an account?{" "}
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
                href="/auth/signin"
                className="text-primary hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Completion Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-[24px] p-6 md:p-8 max-w-md w-full shadow-2xl border border-outline-variant text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">
                check_circle
              </span>
            </div>

            <h3 className="text-xl font-bold text-on-surface">
              Account Created Successfully!
            </h3>

            <p className="text-sm text-on-surface-variant">
              Welcome to CareerPulse. Complete your profile details now to
              optimize your job searches and visibility to employers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/auth/signin"
                className="flex-1 py-2.5 border border-outline-variant text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center"
              >
                Close
              </Link>
              <Link
                href="/jobseeker/profile"
                className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:bg-primary-container transition-colors flex items-center justify-center"
              >
                Continue Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
