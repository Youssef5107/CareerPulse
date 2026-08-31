"use server";

import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export type AuthActionState = { error?: string } | undefined;

export const loginWithCredentials = async (
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> => {
  try {
    const session = await auth();
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo:
        session?.user.role === "JOB_SEEKER"
          ? "/jobseeker/home"
          : "/employer/dashboard",
    });
  } catch (error) {
    // signIn() throws a redirect internally on success - only swallow real auth errors.
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
};

export const signup = async (
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !password || !role) {
    return { error: "Please fill in all fields." };
  }

  if (role !== "JOB_SEEKER" && role !== "EMPLOYER") {
    return { error: "Invalid role." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  try {
    const session = await auth();
    await signIn("credentials", {
      email,
      password,
      redirectTo:
        session?.user.role === "JOB_SEEKER"
          ? "/jobseeker/home"
          : "/employer/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created — please sign in." };
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};
