import { NextResponse } from "next/server";
import { getPublicJobs } from "@/lib/public-jobs";
import { getCached, PUBLIC_JOBS_CACHE_KEY } from "@/lib/redis";

// GET: Fetch all public listings for job seekers, excluding drafts
export async function GET() {
  try {
    // 1. Attempt to retrieve cached job feed from Redis
    const cachedJobs = await getCached<
      Awaited<ReturnType<typeof getPublicJobs>>
    >(PUBLIC_JOBS_CACHE_KEY);

    if (cachedJobs) {
      return NextResponse.json(cachedJobs, {
        headers: { "X-Cache": "HIT" },
      });
    }

    // 2. Fetch fresh job data from Neon PostgreSQL on cache miss
    const publicJobs = await getPublicJobs();

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
