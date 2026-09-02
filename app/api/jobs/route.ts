import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; // Adjust path if your prisma client is exported elsewhere

export async function POST(req: Request) {
  try {
    // 1. Get current logged-in user session
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    const body = await req.json();

    // 2. Format salary string from salaryMin & salaryMax
    let formattedSalary = "Not specified";
    if (body.salaryMin || body.salaryMax) {
      formattedSalary = `$${body.salaryMin || "0"} - $${body.salaryMax || "0"}`;
    }

    // 3. Create job matching Prisma schema rules
    const newJob = await prisma.job.create({
      data: {
        title: body.title,
        company: body.companyName || "Company", // Mapped from companyName -> company
        location: body.location,
        type: body.employmentType,
        category: body.department, // Mapped from department -> category
        locationType: body.locationType || "onsite",
        description: body.description,
        companyOverview: body.companyOverview || null,
        salary: formattedSalary, // Mapped from salaryMin/salaryMax -> salary
        benefits: body.benefits || [],
        visibility: body.visibility || "PUBLIC",
        expirationDate: body.expirationDate
          ? new Date(body.expirationDate)
          : null,
        postedById: session.user.id, // Relation key for User model
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
