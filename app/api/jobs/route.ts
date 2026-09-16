import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all active listings for job seekers
export async function GET() {
  try {
    const activeJobs = await prisma.job.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: { postedAt: "desc" },
    });

    return NextResponse.json(activeJobs);
  } catch (error) {
    console.error("Error fetching job seeker feed:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
