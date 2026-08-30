"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { loginWithCredentials } from "@/features/auth";

export default function SignUpPage() {
  const [role, setRole] = useState<"job-seeker" | "employer">("job-seeker");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role === "job-seeker" ? "JOB_SEEKER" : "EMPLOYER",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      const result = await loginWithCredentials(formData.email, formData.password);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <div className="bg-background font-body-md text-on-background antialiased gradient-bg flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4 md:p-12 pb-12 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary-container/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        {/* Signup Card */}
        <div className="w-full max-w-[440px] glass-panel rounded-[24px] p-6 md:p-12 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-on-surface mb-2">
              Create an account
            </h1>
            <p className="text-sm text-on-surface-variant">
              Join CareerPulse to unlock your potential.
            </p>
          </div>

          {error && (
            <div className="mb-6 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className="flex bg-surface-container-low rounded-xl p-1 mb-8 shadow-sm">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-variant mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">
                    person
                  </span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
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
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">
                    mail
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
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
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">
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
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
              <p className="mt-2 text-[12px] text-on-surface-variant">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-[52px] bg-primary hover:bg-primary-container text-on-primary font-medium text-sm rounded-xl shadow-md transform hover:-translate-y-[2px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:translate-y-0"
            >
              <span>{isPending ? "Creating account..." : "Create Account"}</span>
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-on-surface-variant">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-on-surface-variant">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
