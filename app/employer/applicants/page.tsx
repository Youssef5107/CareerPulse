import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import ApplicantTrackingClient from "./ApplicantTrackingClient";

export default async function ApplicantsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  // Fetch all jobs posted by this employer along with applicants
  const jobs = await prisma.job.findMany({
    where: {
      postedById: session.user.id,
    },
    select: {
      id: true,
      title: true,
      location: true,
      type: true,
      salary: true,
      applications: {
        select: {
          id: true,
          status: true,
          appliedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  // Flatten applications so each row represents an applicant + target job
  const applicants = jobs.flatMap((job) =>
    job.applications.map((app) => ({
      applicationId: app.id,
      status: app.status,
      appliedAt: app.appliedAt,
      candidate: app.user,
      targetJob: {
        id: job.id,
        title: job.title,
        location: job.location,
        salary: job.salary,
      },
    })),
  );

  return <ApplicantTrackingClient applicants={applicants} />;
}
