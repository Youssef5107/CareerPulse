import { PrismaClient } from "@/app/generated/prisma";
import Link from "next/link";

const prisma = new PrismaClient();

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: rawCategory } = await params;
  const categoryName = decodeURIComponent(rawCategory);

  const jobs = await prisma.job.findMany({
    where: {
      category: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
    orderBy: {
      postedAt: "desc",
    },
  });

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

      {/* Responsive Grid: 1 column on mobile, 2 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {job.company} • {job.location}
                    </p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 shrink-0">
                  <span className="material-symbols-outlined">bookmark</span>
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-3 flex-wrap border-t border-slate-100 mt-4">
              {job.salary && (
                <span className="bg-blue-50 text-blue-600 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {job.salary}
                </span>
              )}
              <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md">
                {job.type}
              </span>
              <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md">
                {job.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
