import type { NextAuthConfig } from "next-auth";

// This config must stay edge-safe: no Prisma, no bcrypt, no Node-only APIs.
// It's shared between the full config in lib/auth.ts and middleware.ts.
export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },

  providers: [], // real providers are added in lib/auth.ts

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isJobSeekerRoute = nextUrl.pathname.startsWith("/jobseeker");
      const isEmployerRoute = nextUrl.pathname.startsWith("/employer");

      if ((isJobSeekerRoute || isEmployerRoute) && !isLoggedIn) {
        return false; // NextAuth redirects to pages.signIn automatically
      }

      // Logged-in job seeker wandering into /employer, or vice versa
      if (isJobSeekerRoute && role !== "JOB_SEEKER") {
        return Response.redirect(new URL("/post-login", nextUrl));
      }
      if (isEmployerRoute && role !== "EMPLOYER") {
        return Response.redirect(new URL("/post-login", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
