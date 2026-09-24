import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const current = await prisma.interview.findUnique({
      where: { id },
      include: { application: { include: { job: true, user: true } } },
    });

    if (!current) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 },
      );
    }

    const isEmployer = current.employerId === session.user.id;
    const isJobSeeker = current.jobSeekerId === session.user.id;
    if (!isEmployer && !isJobSeeker) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const action = body.action as "ACCEPT" | "REJECT" | "COUNTER";
    if (action === "COUNTER" && !isJobSeeker) {
      return NextResponse.json(
        { error: "Only the job seeker can counter-propose" },
        { status: 403 },
      );
    }
    if (
      (action === "ACCEPT" || action === "REJECT") &&
      current.status !== (isEmployer ? "PENDING_EMPLOYER" : "PENDING_JOBSEEKER")
    ) {
      return NextResponse.json(
        { error: "This interview is not awaiting your response" },
        { status: 409 },
      );
    }

    let data:
      | { status: "ACCEPTED" | "REJECTED" }
      | {
          proposedAt: Date;
          mode: "ONLINE" | "ONSITE";
          details: string;
          status: "PENDING_EMPLOYER";
          proposedBy: "JOBSEEKER";
        };

    if (action === "ACCEPT" || action === "REJECT") {
      data = { status: action === "ACCEPT" ? "ACCEPTED" : "REJECTED" };
    } else {
      const proposedAt = new Date(body.proposedAt);
      if (Number.isNaN(proposedAt.getTime())) {
        return NextResponse.json(
          { error: "A valid interview time is required" },
          { status: 400 },
        );
      }
      data = {
        proposedAt,
        mode: body.mode === "ONLINE" ? "ONLINE" : "ONSITE",
        details: String(body.details || "").trim(),
        status: "PENDING_EMPLOYER",
        proposedBy: "JOBSEEKER",
      };
    }

    const interview = await prisma.interview.update({ where: { id }, data });
    const recipientId = isEmployer ? current.jobSeekerId : current.employerId;
    const message =
      action === "COUNTER"
        ? `The applicant suggested another time for ${current.application.job.title}.`
        : action === "ACCEPT"
          ? `The interview for ${current.application.job.title} was accepted.`
          : `The interview for ${current.application.job.title} was rejected.`;

    await prisma.notification.create({
      data: {
        userId: recipientId,
        title:
          action === "COUNTER"
            ? "New interview time suggested"
            : `Interview ${action === "ACCEPT" ? "accepted" : "rejected"}`,
        message,
        type: "INTERVIEW_UPDATED",
        link: isEmployer ? "/jobseeker/interviews" : "/employer/interviews",
      },
    });

    return NextResponse.json(interview);
  } catch (error) {
    console.error("Update interview error:", error);
    return NextResponse.json(
      { error: "Unable to update interview" },
      { status: 500 },
    );
  }
}
