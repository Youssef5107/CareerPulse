// app/jobseeker/categories/[category]/page.tsx
import { PrismaClient } from "@/app/generated/prisma";
import Link from "next/link";
import { auth } from "@/lib/auth";
import BookmarkIcon from "../../components/BookmarkIcon";

const prisma = new PrismaClient();

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: rawCategory } = await params;
  const categoryName = decodeURIComponent(rawCategory);
  const session = await auth();

  const jobs = await prisma.job.findMany({
    where: {
      status: "ACTIVE",
      category: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
    orderBy: {
      postedAt: "desc",
    },
  });

  let savedJobIds = new Set<string>();
  if (session?.user?.id) {
    const savedJobs = await prisma.savedJob.findMany({
      where: { userId: session.user.id },
      select: { jobId: true },
    });
    savedJobIds = new Set(savedJobs.map((s) => s.jobId));
  }

  const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto pt-20 md:pt-10 pb-16 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/jobseeker/home"
          className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 capitalize tracking-tight">
          {title} Jobs
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Showing {jobs.length} available positions for {title}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => {
          const isClosed =
            job.isExpired ||
            (job as unknown as { status?: string }).status === "CLOSED";
          const isSaved = savedJobIds.has(job.id);

          return (
            <Link
              href={`/jobseeker/jobs/${job.id}`}
              key={job.id}
              className="w-full bg-white rounded-2xl p-5 border border-[#c6c5d3]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-[#142175]/30 transition-all flex flex-col justify-between group relative"
            >
              <div className="w-full">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3 w-full">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-[#e7e8ee] text-[#454651] flex items-center justify-center font-bold text-sm shrink-0">
                      {job.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#191c20] text-base truncate group-hover:text-[#142175] transition-colors leading-snug">
                          {job.title}
                        </h3>

                        {/* Closed Badge */}
                        {isClosed && (
                          <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" />
                            Closed
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#454651] truncate mt-0.5">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <BookmarkIcon jobId={job.id} initialIsSaved={isSaved} />
                  </div>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {job.salary && (
                    <span className="bg-[#eff4ff] text-[#142175] text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                      {job.salary}
                    </span>
                  )}
                  <span className="bg-[#f8f9ff] text-[#454651] text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-[#c6c5d3]/30 capitalize">
                    {job.type}
                  </span>
                  <span className="bg-[#f8f9ff] text-[#454651] text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-[#c6c5d3]/30 capitalize">
                    {job.category}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}{" "}
      </div>
    </div>
  );
}
