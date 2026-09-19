import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface CompanyProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function CompanyProfilePage({
  params,
}: CompanyProfilePageProps) {
  const { id } = await params;
  const employer = await prisma.user.findUnique({
    where: { id },
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

  if (!employer) {
    notFound();
  }

  const profile = employer.companyProfile;
  const companyName = employer.companyName || employer.name || "Company";
  const website = profile?.website?.match(/^https?:\/\//i)
    ? profile.website
    : null;
  const hasProfileContent = Boolean(
    profile &&
    Object.values(profile).some(
      (value) => typeof value === "string" && value.trim(),
    ),
  );

  return (
    <main className="min-h-screen bg-[#f8f9ff] px-4 py-8 text-[#191c20] md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/jobseeker/home"
          className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-[#142175] hover:underline"
        >
          <span className="material-symbols-outlined text-base">
            arrow_back
          </span>
          Back to jobs
        </Link>

        <section className="rounded-2xl border border-[#c6c5d3]/30 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#e7e8ee] text-2xl font-bold text-[#454651]">
              {companyName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#454651]">
                Company profile
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-[#191c20]">
                {companyName}
              </h1>
              {profile?.industry && (
                <p className="mt-2 text-sm text-[#454651]">
                  {profile.industry}
                </p>
              )}
            </div>
          </div>

          {profile && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#c6c5d3]/20 pt-5">
              {profile.headquarters && (
                <Meta icon="location_on" value={profile.headquarters} />
              )}
              {profile.companySize && (
                <Meta icon="groups" value={profile.companySize} />
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#c6c5d3]/30 bg-[#f8f9ff] px-3 py-2 text-xs font-semibold text-[#142175] hover:bg-[#eff4ff]"
                >
                  <span className="material-symbols-outlined text-base">
                    language
                  </span>
                  Visit website
                </a>
              )}
            </div>
          )}
        </section>

        {!hasProfileContent ? (
          <section className="mt-6 rounded-2xl border border-[#c6c5d3]/30 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
            <h2 className="text-xl font-bold">About {companyName}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#454651]">
              This company has not added its public profile information yet.
            </p>
          </section>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ProfileSection
                title="About the company"
                content={profile?.overview}
              />
              <ProfileSection
                title="Company history"
                content={profile?.history}
              />
            </div>
            <div className="space-y-6">
              <ProfileSection
                title="Mission and values"
                content={profile?.mission}
              />
              <ProfileSection
                title="Target customers"
                content={profile?.targetCustomers}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Meta({ icon, value }: { icon: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#c6c5d3]/30 bg-[#f8f9ff] px-3 py-2 text-xs font-medium text-[#454651]">
      <span className="material-symbols-outlined text-base text-[#142175]">
        {icon}
      </span>
      {value}
    </span>
  );
}

function ProfileSection({
  title,
  content,
}: {
  title: string;
  content?: string | null;
}) {
  if (!content?.trim()) return null;

  return (
    <section className="rounded-2xl border border-[#c6c5d3]/30 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
      <h2 className="text-lg font-bold text-[#191c20]">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#454651]">
        {content}
      </p>
    </section>
  );
}
