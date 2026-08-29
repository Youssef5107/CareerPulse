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
    console.log("Submitted Payload:", { role, ...formData });
  };

  return (
    <div className="h-full bg-background text-on-background antialiased flex items-center justify-center relative overflow-hidden min-h-screen">
      {/* Layered Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low via-background to-secondary-container opacity-40"></div>
        <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[60%] h-[60%] rounded-full bg-primary-container blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-[20%] -mb-[10%] w-[60%] h-[60%] rounded-full bg-tertiary blur-[100px] opacity-10"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[440px] px-md">
        <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-outline-variant/30 p-xl">
          {/* Header */}
          <div className="text-center mb-xl">
            <div className="flex justify-center items-center mb-sm">
              <span className="material-symbols-outlined text-primary text-[32px] font-bold">
                work
              </span>
              <span className="ml-xs font-headline-md text-headline-md font-bold text-primary">
                CareerPulse
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Welcome back to your professional journey.
            </p>
          </div>

          {/* Role Toggle */}
          <div className="bg-surface-container-low rounded-lg p-xs flex mb-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)_inset]">
            <button
              type="button"
              onClick={() => setRole("job-seeker")}
              className={`flex-1 font-label-md text-label-md py-sm px-md rounded-[6px] transition-all duration-200 ${
                role === "job-seeker"
                  ? "bg-surface-container-lowest text-primary-container shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`flex-1 font-label-md text-label-md py-sm px-md rounded-[6px] transition-all duration-200 ${
                role === "employer"
                  ? "bg-surface-container-lowest text-primary-container shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Employer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Email Input */}
            <div>
              <label
                className="block font-label-sm text-label-sm text-on-surface-variant mb-[8px]"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
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
                  className="block w-full pl-[44px] pr-md py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-outline/60"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-[8px]">
                <label
                  className="block font-label-sm text-label-sm text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
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
                  className="block w-full pl-[44px] pr-md py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-outline/60"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md h-[52px] rounded-lg shadow-[0_4px_14px_rgba(20,33,117,0.2)] hover:shadow-[0_6px_20px_rgba(20,33,117,0.3)] hover:-translate-y-[2px] transition-all duration-200 group cursor-pointer"
            >
              <span>Sign In</span>
              <span className="material-symbols-outlined ml-sm text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-xl text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-label-md text-label-md text-primary font-bold hover:text-primary-container hover:underline transition-all"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
