import { prisma } from "@/lib/prisma";
import { getCached, setCached } from "@/lib/redis";

export const PUBLIC_COMPANY_PROFILE_FIELDS = {
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
} as const;

export type PublicCompanyProfile = {
  companyName: string | null;
  name: string | null;
  companyProfile: {
    overview: string | null;
    history: string | null;
    targetCustomers: string | null;
    mission: string | null;
    industry: string | null;
    website: string | null;
    headquarters: string | null;
    companySize: string | null;
  } | null;
} | null;

export async function getPublicCompanyProfile(
  employerId: string,
): Promise<PublicCompanyProfile> {
  const cacheKey = `cache:company-profile:${employerId}`;
  const cachedProfile = await getCached<PublicCompanyProfile>(cacheKey);

  if (cachedProfile) {
    return cachedProfile;
  }

  const profile = await prisma.user.findUnique({
    where: { id: employerId },
    select: PUBLIC_COMPANY_PROFILE_FIELDS,
  });

  await setCached(cacheKey, profile);
  return profile;
}
