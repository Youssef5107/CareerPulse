import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export const middleware = auth;

export const config = {
  matcher: ["/jobseeker/:path*", "/employer/:path*"],
};
