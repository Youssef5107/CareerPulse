import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface PostingOverviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostingOverviewPage({
  params,
}: PostingOverviewPageProps) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const { id } = await params;
  const job = await prisma.job.findFirst({
    where: {
      id,
      postedById: session.user.id,
    },
    include: {
      applications: {
        select: { status: true },
      },
    },
  });

  if (!job) notFound();

  const applicantCounts = {
    total: job.applications.length,
    pending: job.applications.filter(
      (application) => application.status === "PENDING",
    ).length,
    accepted: job.applications.filter(
      (application) => application.status === "ACCEPTED",
    ).length,
    rejected: job.applications.filter(
      (application) => application.status === "REJECTED",
    ).length,
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/employer/postings"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to postings
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    job.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-800"
                      : job.status === "CLOSED"
                        ? "bg-slate-200 text-slate-700"
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {job.status}
                </span>
                <span className="text-sm text-slate-500">
                  Posted{" "}
                  {new Date(job.postedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                {job.title}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-lg">
                    location_on
                  </span>
                  {job.location}
                </span>
                <span>•</span>
                <span>{job.type}</span>
                <span>•</span>
                <span>{job.locationType}</span>
              </p>
            </div>

            <Link
              href="/employer/applicants"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-secondary transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
            >
              <span className="material-symbols-outlined text-lg">group</span>
              View applicants
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Total applicants"
            value={applicantCounts.total}
            icon="group"
          />
          <Metric
            label="Pending review"
            value={applicantCounts.pending}
            icon="pending_actions"
          />
          <Metric
            label="Accepted"
            value={applicantCounts.accepted}
            icon="check_circle"
          />
          <Metric
            label="Rejected"
            value={applicantCounts.rejected}
            icon="cancel"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <ContentSection title="About this role" content={job.description} />
            <ContentSection
              title="Requirements"
              content={job.requirements.join("\n")}
              emptyLabel="No requirements listed."
            />
            <ContentSection
              title="Benefits"
              content={job.benefits.join("\n")}
              emptyLabel="No benefits listed."
            />
          </section>

          <aside className="h-fit space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Post details</h2>
            <Detail label="Company" value={job.company} />
            <Detail label="Category" value={job.category} />
            <Detail label="Salary" value={job.salary || "Not specified"} />
            <Detail label="Visibility" value={job.visibility} />
            <Detail
              label="Expires"
              value={
                job.expirationDate
                  ? new Date(job.expirationDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No expiration date"
              }
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="material-symbols-outlined text-secondary">{icon}</span>
      <p className="mt-3 text-2xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function ContentSection({
  title,
  content,
  emptyLabel = "Not provided.",
}: {
  title: string;
  content: string;
  emptyLabel?: string;
}) {
  const lines = content ? content.split("\n").filter(Boolean) : [];

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {lines.length > 0 ? (
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
          {lines.map((line, index) => (
            <p key={`${title}-${index}`}>{line}</p>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-400">{emptyLabel}</p>
      )}
    </section>
  );
}
