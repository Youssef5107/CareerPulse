import type { NextAuthConfig } from "next-auth";

// This config must stay edge-safe: no Prisma, no bcrypt, no Node-only APIs.
// It's shared between the full config in lib/auth.ts and middleware.ts, so
// jwt/session callbacks live here too - otherwise middleware never sees `role`.
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

      if (isJobSeekerRoute && role !== "JOB_SEEKER") {
        return Response.redirect(new URL("/post-login", nextUrl));
      }
      if (isEmployerRoute && role !== "EMPLOYER") {
        return Response.redirect(new URL("/post-login", nextUrl));
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = (user as { role?: "JOB_SEEKER" | "EMPLOYER" | null }).role ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = (token.role as "JOB_SEEKER" | "EMPLOYER" | null) ?? null;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
