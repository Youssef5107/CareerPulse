import { prisma } from "@/lib/prisma";
import { getCached, PUBLIC_JOBS_CACHE_KEY, setCached } from "@/lib/redis";

type PublicJobs = Awaited<ReturnType<typeof prisma.job.findMany>>;

export async function getPublicJobs(): Promise<PublicJobs> {
  const cachedJobs = await getCached<PublicJobs>(PUBLIC_JOBS_CACHE_KEY);

  if (cachedJobs) {
    return cachedJobs;
  }

  const publicJobs = await prisma.job.findMany({
    where: {
      status: {
        in: ["ACTIVE", "CLOSED"],
      },
    },
    orderBy: { postedAt: "desc" },
  });

  await setCached(PUBLIC_JOBS_CACHE_KEY, publicJobs);
  return publicJobs;
}
