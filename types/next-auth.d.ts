import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "JOB_SEEKER" | "EMPLOYER" | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "JOB_SEEKER" | "EMPLOYER" | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: "JOB_SEEKER" | "EMPLOYER" | null;
  }
}
