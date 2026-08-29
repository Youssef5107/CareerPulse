import { signIn, signOut } from "@/features/auth";

export const login = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/fsignin" });
};
