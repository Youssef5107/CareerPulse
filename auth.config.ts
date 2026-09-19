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
      const pathname = nextUrl.pathname;
      const isJobSeekerRoute = pathname.startsWith("/jobseeker");
      const isEmployerRoute = pathname.startsWith("/employer");
      const isAuthRoute = pathname.startsWith("/auth/");
      const roleHome =
        role === "JOB_SEEKER" ? "/jobseeker/home" : "/employer/dashboard";
      const redirectToRoleHome = () =>
        Response.redirect(new URL(roleHome, nextUrl));
      const matchesRoute = (route: string) =>
        pathname === route || pathname.startsWith(`${route}/`);

      if (pathname === "/") {
        return isLoggedIn
          ? redirectToRoleHome()
          : Response.redirect(new URL("/auth/signin", nextUrl));
      }

      if (isAuthRoute && isLoggedIn) {
        return redirectToRoleHome();
      }

      if ((isJobSeekerRoute || isEmployerRoute) && !isLoggedIn) {
        return false;
      }

      if (isJobSeekerRoute) {
        if (role !== "JOB_SEEKER") return redirectToRoleHome();

        const isKnownRoute = [
          "/jobseeker/home",
          "/jobseeker/search",
          "/jobseeker/saved",
          "/jobseeker/profile",
          "/jobseeker/notifications",
          "/jobseeker/settings",
          "/jobseeker/help",
          "/jobseeker/categories",
          "/jobseeker/jobs",
          "/jobseeker/company-profile",
        ].some(matchesRoute);

        if (!isKnownRoute) {
          return Response.redirect(new URL("/jobseeker/home", nextUrl));
        }
      }

      if (isEmployerRoute) {
        if (role !== "EMPLOYER") return redirectToRoleHome();

        if (pathname === "/employer/post-job") {
          return Response.redirect(
            new URL("/employer/post-job/job-details", nextUrl),
          );
        }

        const isKnownRoute = [
          "/employer/dashboard",
          "/employer/postings",
          "/employer/post-job",
          "/employer/applicants",
          "/employer/company-profile",
          "/employer/notifications",
          "/employer/settings",
          "/employer/help",
        ].some(matchesRoute);

        if (!isKnownRoute) {
          return Response.redirect(new URL("/employer/dashboard", nextUrl));
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role =
          (user as { role?: "JOB_SEEKER" | "EMPLOYER" | null }).role ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role =
          (token.role as "JOB_SEEKER" | "EMPLOYER" | null) ?? null;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
