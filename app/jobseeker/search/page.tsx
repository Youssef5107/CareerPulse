// app/jobseeker/search/page.tsx
import Link from "next/link";
import { PrismaClient } from "@/app/generated/prisma";
import SearchBar from "../components/SearchBar";
import BookmarkIcon from "../components/BookmarkIcon";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    location?: string;
    category?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query, location, category } = await searchParams;
  const session = await auth();

  // Fetch jobs matching query filters
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { company: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        location
          ? { location: { contains: location, mode: "insensitive" } }
          : {},
        category ? { category: { equals: category, mode: "insensitive" } } : {},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch saved job IDs for logged-in user
  let savedJobIds: string[] = [];
  if (session?.user?.id) {
    const saved = await prisma.savedJob.findMany({
      where: { userId: session.user.id },
      select: { jobId: true },
    });
    savedJobIds = saved.map((s) => s.jobId);
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9ff] text-[#191c20]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 space-y-8">
        {/* Results Metadata */}
        <div className="flex items-center justify-between border-b border-[#c6c5d3]/20 pb-4">
          <p className="text-sm font-semibold text-[#454651]">
            Showing <span className="text-[#191c20]">{jobs.length}</span>{" "}
            {jobs.length === 1 ? "result" : "results"}
            {category && (
              <span>
                {" "}
                in{" "}
                <span className="capitalize text-[#142175]">
                  &quot;{category}&quot;
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Job Listings Grid */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#c6c5d3]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <span className="material-symbols-outlined text-4xl text-[#767682] mb-2">
              search_off
            </span>
            <h3 className="text-lg font-bold text-[#191c20]">No jobs found</h3>
            <p className="text-xs text-[#454651] mt-1">
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-5 border border-[#c6c5d3]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-[#142175]/30 transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#e7e8ee] text-[#454651] flex items-center justify-center font-bold text-sm shrink-0">
                          {job.company.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#191c20] text-base truncate group-hover:text-[#142175] transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-xs text-[#454651] truncate">
                            {job.company} • {job.location}
                          </p>
                        </div>
                      </div>

                      {/* Bookmark Icon */}
                      <BookmarkIcon jobId={job.id} initialIsSaved={isSaved} />
                    </div>

                    <p className="text-xs text-[#454651] line-clamp-2 my-3 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 my-3">
                      <span className="bg-[#f8f9ff] text-[#454651] text-[11px] font-medium px-2 py-0.5 rounded-md border border-[#c6c5d3]/30 capitalize">
                        {job.type}
                      </span>
                      <span className="bg-[#f8f9ff] text-[#454651] text-[11px] font-medium px-2 py-0.5 rounded-md border border-[#c6c5d3]/30 capitalize">
                        {job.category}
                      </span>
                      {job.salary && (
                        <span className="bg-[#eff4ff] text-[#142175] text-[11px] font-semibold px-2 py-0.5 rounded-md">
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#c6c5d3]/20 flex items-center justify-between mt-2">
                    <span className="text-[11px] text-[#767682]">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/jobseeker/jobs/${job.id}`}
                      className="text-xs font-semibold text-[#142175] hover:underline flex items-center gap-0.5"
                    >
                      View Details
                      <span className="material-symbols-outlined text-[14px]">
                        chevron_right
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
