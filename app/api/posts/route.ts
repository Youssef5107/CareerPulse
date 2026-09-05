import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    const body = await req.json();

    let formattedSalary = "Not specified";
    if (body.salaryMin || body.salaryMax) {
      formattedSalary = `$${body.salaryMin || "0"} - $${body.salaryMax || "0"}`;
    }

    const newJob = await prisma.job.create({
      data: {
        title: body.title,
        company: body.companyName || "Company",
        location: body.location,
        type: body.employmentType,
        category: body.department,
        locationType: body.locationType || "onsite",
        description: body.description,
        companyOverview: body.companyOverview || null,
        salary: formattedSalary,
        benefits: body.benefits || [],
        visibility: body.visibility || "PUBLIC",
        expirationDate: body.expirationDate
          ? new Date(body.expirationDate)
          : null,
        postedById: session.user.id,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Bad request. Failed to create job." },
      { status: 400 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    const rawJobs = await prisma.job.findMany({
      where: { postedById: session.user.id },
      include: {
        applications: {
          select: { id: true, status: true },
        },
      },
      orderBy: { postedAt: "desc" },
    });

    const postings = rawJobs.map((job) => ({
      id: job.id,
      title: job.title,
      location: job.location,
      type: job.type,
      postedDate: `Posted ${new Date(job.postedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`,
      status: (job.status as "ACTIVE" | "DRAFT" | "CLOSED") || "ACTIVE",
      totalApplicants: job.applications.length,
      newApplicants: job.applications.filter((app) => app.status === "PENDING")
        .length,
    }));

    return NextResponse.json(postings);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
