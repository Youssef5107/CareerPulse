"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [role, setRole] = useState<"job-seeker" | "employer">("job-seeker");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted SignIn Payload:", { role, ...formData });
  };

  return (
    <div className="bg-background text-on-background font-sans antialiased gradient-bg flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary-container/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        {/* Signin Card */}
        <div className="w-full max-w-md glass-panel rounded-[24px] p-6 sm:p-10 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-on-surface mb-2 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-primary">
                work
              </span>
              CareerPulse
            </h1>
            <p className="text-sm text-on-surface-variant">
              Welcome back to your professional journey.
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex bg-surface-container-low rounded-xl p-1 mb-8 shadow-xs">
            <button
              type="button"
              onClick={() => setRole("job-seeker")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                role === "job-seeker"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                role === "employer"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              Employer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  className="block text-xs font-semibold text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
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
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder-outline focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[52px] bg-primary hover:bg-primary-container text-on-primary font-medium text-sm rounded-xl shadow-md transform hover:-translate-y-[2px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In</span>
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Bottom Navigation Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
