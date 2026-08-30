import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function PostLoginPage() {
  const session = await auth();

  if (!session?.user?.role) {
    redirect("/auth/signin");
  }

  redirect(session.user.role === "JOB_SEEKER" ? "/jobseeker/home" : "/employer/home");
}
