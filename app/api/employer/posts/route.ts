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

    // 1. Validate required fields BEFORE touching the database
    const company = (body.companyName || body.company)?.trim();
    const title = body.title?.trim();
    const location = body.location?.trim();
    const category = body.department?.trim() || body.category?.trim();

    if (!title || !company || !location || !category) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, company, location, or department.",
        },
        { status: 400 },
      );
    }

    // 2. Check for duplicate job posting by the same employer
    const existingJob = await prisma.job.findFirst({
      where: {
        postedById: session.user.id,
        title: { equals: title, mode: "insensitive" },
        company: { equals: company, mode: "insensitive" },
      },
    });

    if (existingJob) {
      return NextResponse.json(
        { error: "You have already posted a job with this title and company." },
        { status: 409 },
      );
    }

    // 3. Format salary string safely
    let formattedSalary = "Not specified";
    if (body.salaryMin || body.salaryMax) {
      const min = body.salaryMin ? `$${body.salaryMin}` : "$0";
      const max = body.salaryMax ? `$${body.salaryMax}` : "N/A";
      formattedSalary = `${min} - ${max}`;
    }

    // 4. Create the job posting
    const newJob = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type: body.employmentType || "Full-Time",
        category,
        locationType: body.locationType || "onsite",
        description: body.description || "",
        companyOverview: body.companyOverview || null,
        salary: formattedSalary,
        benefits: Array.isArray(body.benefits) ? body.benefits : [],
        visibility: body.visibility || "PUBLIC",
        expirationDate: body.expirationDate
          ? new Date(body.expirationDate)
          : null,
        postedById: session.user.id,
      },
    });

    // 5. Non-blocking Notification Dispatch for matching Job Seekers
    try {
      const matchingSeekers = await prisma.user.findMany({
        where: {
          role: "JOB_SEEKER",
          profile: {
            headline: { contains: title, mode: "insensitive" },
          },
        },
        select: { id: true },
      });

      if (matchingSeekers.length > 0) {
        await prisma.notification.createMany({
          data: matchingSeekers.map((seeker) => ({
            userId: seeker.id,
            title: "New Job Match!",
            message: `A new job for "${newJob.title}" was just posted.`,
            type: "NEW_JOB_MATCH",
            link: `/jobseeker/jobs/${newJob.id}`,
          })),
        });
      }
    } catch (notificationError) {
      console.error(
        "Failed to send job match notifications:",
        notificationError,
      );
    }

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Failed to create job posting." },
      { status: 500 },
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
