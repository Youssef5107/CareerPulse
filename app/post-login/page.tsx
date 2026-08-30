import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function PostLoginPage() {
  const session = await auth();

  if (!session?.user?.role) {
    redirect("/auth/signin");
  }

  console.log(session.user.role);
  redirect(
    session.user.role === "JOB_SEEKER" ? "/jobseeker/home" : "/employer/home",
  );
}
