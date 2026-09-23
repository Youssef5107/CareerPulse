// app/api/company-profile/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCached, setCached, invalidateCached } from "@/lib/redis";

const profileFields = {
  overview: true,
  history: true,
  targetCustomers: true,
  mission: true,
  industry: true,
  website: true,
  headquarters: true,
  companySize: true,
};

async function getEmployerId() {
  const session = await auth();
  if (session?.user?.role !== "EMPLOYER" || !session.user.id) return null;
  return session.user.id;
}

export async function GET() {
  const userId = await getEmployerId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cacheKey = `cache:company-profile:${userId}`;

  // 1. Try Redis cache first
  const cachedProfile = await getCached(cacheKey);
  if (cachedProfile) {
    return NextResponse.json(cachedProfile, {
      headers: { "X-Cache": "HIT" },
    });
  }

  // 2. Fetch from database on cache miss
  const profile = await prisma.companyProfile.findUnique({
    where: { userId },
    select: profileFields,
  });

  const responseData = profile ?? {};

  // 3. Cache the result
  await setCached(cacheKey, responseData);

  return NextResponse.json(responseData, {
    headers: { "X-Cache": "MISS" },
  });
}

export async function PATCH(request: Request) {
  const userId = await getEmployerId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const stringFields = Object.keys(profileFields) as Array<
      keyof typeof profileFields
    >;
    const data = Object.fromEntries(
      stringFields.map((field) => [
        field,
        typeof body[field] === "string" ? body[field].trim() : "",
      ]),
    );

    const profile = await prisma.companyProfile.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
      select: profileFields,
    });

    // Invalidate Redis cache when updated
    await invalidateCached(`cache:company-profile:${userId}`);

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { error: "Unable to save company profile." },
      { status: 500 },
    );
  }
}
