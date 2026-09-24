import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const interviewSelect = {
  id: true,
  applicationId: true,
  proposedAt: true,
  mode: true,
  details: true,
  status: true,
  proposedBy: true,
  updatedAt: true,
  application: {
    select: {
      job: { select: { title: true } },
      user: { select: { id: true, name: true, email: true } },
    },
  },
  employer: { select: { id: true, name: true, companyName: true } },
  jobSeeker: { select: { id: true, name: true, email: true } },
} as const;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const where =
    session.user.role === "EMPLOYER"
      ? { employerId: session.user.id }
      : { jobSeekerId: session.user.id };

  const interviews = await prisma.interview.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    select: interviewSelect,
  });

  return NextResponse.json(interviews);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "EMPLOYER") {
    return NextResponse.json(
      { error: "Employer access required" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const application = await prisma.application.findUnique({
      where: { id: body.applicationId },
      include: { job: true, user: true },
    });

    if (!application || application.job.postedById !== session.user.id) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    const proposedAt = new Date(body.proposedAt);
    if (Number.isNaN(proposedAt.getTime())) {
      return NextResponse.json(
        { error: "A valid interview time is required" },
        { status: 400 },
      );
    }

    const interview = await prisma.interview.upsert({
      where: { applicationId: application.id },
      create: {
        applicationId: application.id,
        employerId: session.user.id,
        jobSeekerId: application.userId,
        proposedAt,
        mode: body.mode === "ONLINE" ? "ONLINE" : "ONSITE",
        details: String(body.details || "").trim(),
        status: "PENDING_JOBSEEKER",
        proposedBy: "EMPLOYER",
      },
      update: {
        proposedAt,
        mode: body.mode === "ONLINE" ? "ONLINE" : "ONSITE",
        details: String(body.details || "").trim(),
        status: "PENDING_JOBSEEKER",
        proposedBy: "EMPLOYER",
      },
      select: interviewSelect,
    });

    await prisma.notification.create({
      data: {
        userId: application.userId,
        title: "Interview invitation",
        message: `An interview was proposed for ${application.job.title}. Please review the time and reply.`,
        type: "INTERVIEW_PROPOSED",
        link: "/jobseeker/interviews",
      },
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error("Create interview error:", error);
    return NextResponse.json(
      { error: "Unable to create interview" },
      { status: 500 },
    );
  }
}
