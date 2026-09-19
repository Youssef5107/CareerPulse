import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all public listings for job seekers, excluding drafts
export async function GET() {
  try {
    const publicJobs = await prisma.job.findMany({
      where: {
        status: {
          in: ["ACTIVE", "CLOSED"],
        },
      },
      orderBy: { postedAt: "desc" },
    });

    return NextResponse.json(publicJobs);
  } catch (error) {
    console.error("Error fetching job seeker feed:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
