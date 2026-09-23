// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  redis,
  getCached,
  setCached,
  PUBLIC_JOBS_CACHE_KEY,
} from "@/lib/redis";

// Define the type directly if needed for client responses
export type PublicJob = Awaited<ReturnType<typeof prisma.job.findMany>>[number];

export async function GET() {
  try {
    // 1. Check Redis Cache
    const cachedJobs = await getCached<PublicJob[]>(PUBLIC_JOBS_CACHE_KEY);

    if (cachedJobs) {
      return NextResponse.json(cachedJobs, {
        headers: { "X-Cache": "HIT" },
      });
    }

    // 2. Query Neon PostgreSQL on cache miss
    const publicJobs = await prisma.job.findMany({
      where: {
        status: {
          in: ["ACTIVE", "CLOSED"],
        },
      },
      orderBy: { postedAt: "desc" },
    });

    // 3. Write back to Redis
    await setCached(PUBLIC_JOBS_CACHE_KEY, publicJobs);

    return NextResponse.json(publicJobs, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("Error fetching job seeker feed:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
