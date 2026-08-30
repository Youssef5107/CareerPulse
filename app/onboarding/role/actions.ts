"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const setRole = async (role: "JOB_SEEKER" | "EMPLOYER") => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated.");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role },
  });

  return { role };
};
