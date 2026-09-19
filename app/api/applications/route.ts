import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 },
      );
    }

    const userId = session.user.id;

    // Check if application already exists
    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job." },
        { status: 409 },
      );
    }

    // 1. Fetch job to retrieve employer's user ID and job title
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        title: true,
        postedById: true,
        status: true,
        isExpired: true,
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job posting not found." },
        { status: 404 },
      );
    }

    if (job.status === "CLOSED" || job.isExpired) {
      return NextResponse.json(
        { error: "This job is closed and no longer accepting applications." },
        { status: 403 },
      );
    }

    // 2. Create the application record
    const application = await prisma.application.create({
      data: {
        jobId,
        userId,
        status: "PENDING",
      },
    });

    try {
      if (job.postedById) {
        await prisma.notification.create({
          data: {
            userId: job.postedById,
            title: "New Job Application",
            message: `A candidate has applied for your job posting "${job.title}".`,
            type: "NEW_APPLICANT",
            link: `/employer/applicants/${application.id}`,
          },
        });
      }
    } catch (notificationError) {
      console.error(
        "Failed to send notification to employer:",
        notificationError,
      );
    }

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error("API error applying to job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
