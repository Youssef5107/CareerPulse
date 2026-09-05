"use server";

import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AuthActionState = { success?: boolean; error?: string } | undefined;

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
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const headline = formData.get("headline") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!firstName || !lastName || !headline || !email || !password || !role) {
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

  // Create User along with Profile including the headline
  await prisma.user.create({
    data: {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: role as "JOB_SEEKER" | "EMPLOYER",
      profile: {
        create: {
          headline,
        },
      },
    },
  });

  try {
    // Authenticate session in background without instant redirect
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Return success to trigger the frontend success modal popup
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created — please sign in manually." };
    }
    // If NextAuth throws internal redirect structure, return success
    return { success: true };
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};
