import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ "post-id": string }>;
}

function buildJobData(body: Record<string, unknown>) {
  const company = (body.companyName || body.company || "").toString().trim();
  const title = body.title?.toString().trim() || "";
  const location = body.location?.toString().trim() || "";
  const category = (body.department || body.category || "").toString().trim();
  const salaryMin = body.salaryMin?.toString();
  const salaryMax = body.salaryMax?.toString();

  return {
    title,
    company,
    location,
    category,
    type: body.employmentType?.toString() || "Full-Time",
    locationType: body.locationType?.toString() || "onsite",
    description: body.description?.toString() || "",
    companyOverview: body.companyOverview?.toString() || null,
    salary:
      salaryMin || salaryMax
        ? `${salaryMin ? `$${salaryMin}` : "$0"} - ${salaryMax ? `$${salaryMax}` : "N/A"}`
        : "Not specified",
    benefits: Array.isArray(body.benefits)
      ? body.benefits.filter((item): item is string => typeof item === "string")
      : [],
    visibility: body.visibility?.toString() || "PUBLIC",
    expirationDate: body.expirationDate
      ? new Date(body.expirationDate.toString())
      : null,
    status: "ACTIVE" as const,
  };
}

export async function GET(request: Request, context: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { "post-id": postId } = await context.params;
    const job = await prisma.job.findFirst({
      where: { id: postId, postedById: session.user.id },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Posting not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(job);
  } catch {
    return NextResponse.json(
      { message: "Failed to load posting" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { "post-id": postId } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;

    if (body.status && body.status !== "ACTIVE") {
      return NextResponse.json(
        { message: "Invalid edit status" },
        { status: 400 },
      );
    }

    const data = buildJobData(body);
    if (!data.title || !data.company || !data.location || !data.category) {
      return NextResponse.json(
        { message: "Missing required job fields" },
        { status: 400 },
      );
    }

    const existingJob = await prisma.job.findFirst({
      where: { id: postId, postedById: session.user.id },
    });
    if (!existingJob) {
      return NextResponse.json(
        { message: "Posting not found" },
        { status: 404 },
      );
    }

    const updatedJob = await prisma.job.update({
      where: { id: postId },
      data,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error editing post:", error);
    return NextResponse.json(
      { message: "Failed to edit posting" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { "post-id": postId } = await context.params;
    const { status } = await request.json();

    if (!["ACTIVE", "DRAFT", "CLOSED"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const existingJob = await prisma.job.findFirst({
      where: { id: postId, postedById: session.user.id },
    });

    if (!existingJob) {
      return NextResponse.json(
        { message: "Posting not found" },
        { status: 404 },
      );
    }

    const updatedJob = await prisma.job.update({
      where: { id: postId },
      data: { status },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating post status:", error);
    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 },
    );
  }
}
