import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    "applicant-id": string;
  }>;
}

export async function GET(request: Request, context: RouteParams) {
  try {
    const params = await context.params;
    const applicationId = params["applicant-id"];

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 },
      );
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: true,
        user: {
          include: {
            profile: {
              include: {
                experiences: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    const payload = {
      applicationId: application.id,
      status: application.status,
      appliedAt: application.appliedAt.toISOString(),
      jobTitle: application.job.title,
      candidate: {
        name: application.user.name ?? "Anonymous Applicant",
        email: application.user.email ?? "N/A",
        image: application.user.image,
        headline: application.user.profile?.headline ?? "Job Seeker",
        location: application.user.profile?.location ?? "Not specified",
        phone: application.user.profile?.phone ?? "N/A",
        summary: application.user.profile?.summary ?? "No summary provided.",
        skills: application.user.profile?.skills ?? [],
        cvUrl: application.user.profile?.cvUrl,
        matchScore: application.user.profile?.matchScore ?? 90,
        recruiterNotes:
          application.user.profile?.recruiterNotes ??
          "No recruiter notes available.",
        experiences: application.user.profile?.experiences ?? [],
      },
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("GET Application Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteParams) {
  try {
    const params = await context.params;
    const applicationId = params["applicant-id"];
    const body = await request.json();
    const { status } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: "Missing applicationId or status" },
        { status: 400 },
      );
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });

    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    console.error("PATCH Application Error:", error);
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 },
    );
  }
}
