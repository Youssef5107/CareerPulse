// app/jobseeker/saved/page.tsx
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SavedJobsClient from "./SavedJobsClient";

const prisma = new PrismaClient();

export default async function SavedJobsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const savedJobs = await prisma.savedJob.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      job: true,
    },
    orderBy: {
      savedAt: "desc",
    },
  });

  const formattedSavedJobs = savedJobs.map((item) => ({
    id: item.id,
    savedAt: item.savedAt.toISOString(),
    job: {
      id: item.job.id,
      title: item.job.title,
      company: item.job.company,
      location: item.job.location,
      salary: item.job.salary,
      type: item.job.type,
      category: item.job.category,
    },
  }));

  return <SavedJobsClient initialSavedJobs={formattedSavedJobs} />;
}
