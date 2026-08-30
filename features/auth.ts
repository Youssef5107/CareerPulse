"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";

export const loginWithCredentials = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/post-login",
    });
  } catch (error) {
    // NextAuth throws a redirect internally on success - only swallow real auth errors.
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};
