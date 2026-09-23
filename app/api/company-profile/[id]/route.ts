// app/api/company-profile/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCached, setCached } from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: companyId } = await params;

    if (!companyId) {
      return NextResponse.json(
        { message: "Company ID is required" },
        { status: 400 },
      );
    }

    const cacheKey = `cache:company-profile:${companyId}`;

    const cachedCompany = await getCached(cacheKey);
    if (cachedCompany) {
      return NextResponse.json(cachedCompany, {
        headers: { "X-Cache": "HIT" },
      });
    }

    const company = await prisma.user.findUnique({
      where: { id: companyId },
      select: {
        companyName: true,
        name: true,
        companyProfile: {
          select: {
            overview: true,
            history: true,
            targetCustomers: true,
            mission: true,
            industry: true,
            website: true,
            headquarters: true,
            companySize: true,
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 },
      );
    }

    await setCached(cacheKey, company);

    return NextResponse.json(company, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("Error fetching public company profile:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
