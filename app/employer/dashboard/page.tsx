import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EmployerDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [user, jobs, applications] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { firstName: true, name: true }, //
    }),
    prisma.job.findMany({
      where: { postedById: session.user.id },
      select: { id: true, status: true, postedAt: true },
    }),
    prisma.application.findMany({
      where: {
        job: { postedById: session.user.id },
      },
      include: {
        user: {
          select: {
            name: true,
            firstName: true,
            lastName: true,
            image: true,
            profile: {
              select: { headline: true, matchScore: true },
            },
          },
        },
        job: {
          select: { title: true },
        },
      },
      orderBy: { appliedAt: "desc" },
    }),
  ]);

  // Dynamic calculations
  const activePostingsCount = jobs.filter((j) => j.status === "ACTIVE").length;
  const pendingAppsCount = applications.filter(
    (a) => a.status === "PENDING",
  ).length;
  const recentApplicants = applications.slice(0, 3);

  // Pipeline status breakdown
  const screeningCount = applications.filter(
    (a) => a.status === "PENDING" || a.status === "SCREENING",
  ).length;
  const interviewingCount = applications.filter(
    (a) => a.status === "INTERVIEWING",
  ).length;
  const offerCount = applications.filter((a) => a.status === "OFFER").length;
  const totalAppsCount = applications.length || 1; // avoid division by 0

  const employerName = session.user.name?.split(" ")[0] || "Employer";
  const currentDateFormatted = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="p-4 md:p-6 lg:p-12 max-w-[1280px] mx-auto w-full flex flex-col gap-6 lg:gap-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-1">
            Welcome back, {employerName}
          </h2>
          <p className="text-base text-on-surface-variant">
            Here&apos;s what&apos;s happening with your job postings today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 shadow-sm w-fit">
          <span className="material-symbols-outlined text-outline">
            calendar_today
          </span>
          <span className="text-xs font-semibold text-on-surface">
            {currentDateFormatted}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm hover:border-secondary transition-colors cursor-default">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-fixed rounded-lg text-secondary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                work
              </span>
            </div>
            <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mb-1">
            Active Postings
          </p>
          <h3 className="text-5xl font-bold text-primary leading-tight">
            {activePostingsCount}
          </h3>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm hover:border-secondary transition-colors cursor-default">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-fixed rounded-lg text-tertiary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                group_add
              </span>
            </div>
            <span className="flex items-center text-xs font-semibold text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[16px] mr-1">
                trending_up
              </span>{" "}
              Total: {applications.length}
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mb-1">New Applicants</p>
          <h3 className="text-5xl font-bold text-primary leading-tight">
            {pendingAppsCount}
          </h3>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm hover:border-secondary transition-colors cursor-default">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary-fixed rounded-lg text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                event
              </span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant mb-1">
            Interviews Scheduled
          </p>
          <h3 className="text-5xl font-bold text-primary leading-tight">
            {interviewingCount}
          </h3>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col">
          <div className="p-6 border-b border-surface-container-high flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-primary">
              Recent Applicants
            </h3>
            <Link
              href="/employer/applicants"
              className="text-xs font-semibold text-secondary hover:underline flex items-center"
            >
              View All{" "}
              <span className="material-symbols-outlined text-[16px] ml-1">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col">
            {recentApplicants.length === 0 ? (
              <div className="p-8 text-center text-sm text-on-surface-variant">
                No job applications received yet.
              </div>
            ) : (
              recentApplicants.map((app) => {
                const applicantName =
                  app.user.name ||
                  `${app.user.firstName || ""} ${app.user.lastName || ""}`.trim() ||
                  "Anonymous Candidate";
                const headline = app.user.profile?.headline || app.job.title;
                const matchScore = app.user.profile?.matchScore ?? 85;
                const initials = applicantName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 md:p-6 border-b border-surface-container-high hover:bg-surface-bright transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative border border-outline-variant shrink-0 bg-tertiary-fixed text-tertiary flex items-center justify-center font-semibold text-base">
                        {app.user.image ? (
                          <Image
                            src={app.user.image}
                            alt={applicantName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          initials
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-on-surface group-hover:text-secondary transition-colors">
                          {applicantName}
                        </h4>
                        <p className="text-sm text-on-surface-variant">
                          {headline}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-on-surface-variant mb-1">
                        {new Date(app.appliedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <span className="inline-block px-2 py-1 bg-surface-container rounded-md text-xs font-semibold text-on-surface">
                        Match: {matchScore}%
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions & Pipeline Side */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="bg-primary text-on-primary rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-tertiary-fixed rounded-full opacity-10 blur-xl"></div>
            <h3 className="text-2xl font-semibold mb-6 relative z-10">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-4 relative z-10">
              <Link
                href="/employer/post-job"
                className="w-full bg-secondary hover:bg-secondary-container text-on-secondary text-sm font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">add</span>
                  Post a New Job
                </div>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/employer/applicants"
                className="w-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 border border-outline-variant/30 text-on-primary text-sm font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">checklist</span>
                  Review Pending ({pendingAppsCount})
                </div>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Pipeline Card */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex-1">
            <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
              Hiring Pipeline
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sm text-on-surface">Screening</span>
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {screeningCount} candidates
                  </span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.round((screeningCount / totalAppsCount) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sm text-on-surface">Interviewing</span>
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {interviewingCount} candidates
                  </span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div
                    className="bg-tertiary h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.round((interviewingCount / totalAppsCount) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sm text-on-surface">Offer Stage</span>
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {offerCount} candidates
                  </span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.round((offerCount / totalAppsCount) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
