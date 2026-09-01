import Image from "next/image";
import Link from "next/link";

interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  postedDate: string;
  status: "Active" | "Draft" | "Closed";
  totalApplicants: number | null;
  newApplicants: number | null;
}

const mockPostings: JobPosting[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    postedDate: "Posted Oct 12, 2023",
    status: "Active",
    totalApplicants: 45,
    newApplicants: 12,
  },
  {
    id: "2",
    title: "Frontend Developer (React)",
    location: "Remote",
    type: "Full-time",
    postedDate: "Posted Oct 05, 2023",
    status: "Active",
    totalApplicants: 128,
    newApplicants: 34,
  },
  {
    id: "3",
    title: "Marketing Manager",
    location: "New York, NY",
    type: "Full-time",
    postedDate: "Edited yesterday",
    status: "Draft",
    totalApplicants: null,
    newApplicants: null,
  },
];

export default function EmployerPostingsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-12 max-w-[1280px] mx-auto w-full flex flex-col">
      {/* Mobile Header (Visible only on mobile) */}
      <header className="md:hidden flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">My Postings</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden relative bg-surface-container-high shrink-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJET1nU_qacPzi29aJyY_bmPN0udxT1EoMKmyBr428vMt3Yk-PzDtd2BdAqY1tKtmF7zfbyZIIx2l_VwkPgmWQHRaY1t811NnuEA5e2VcqeKh4REr64tCxAo0T1lqipN7gqCgji0rvKNGKamIHwfsknDO2FTqhWaEZWw0aiw8yuGxT4N7qoom_FtNiiVjEFF24mkTjn6EPRPxOez_0_n6tmRjRIMHKO_u0NQLyASjkxIuojTSl6Q"
            alt="Hiring Manager Headshot"
            fill
            className="object-cover"
          />
        </div>
      </header>

      {/* Page Header & Actions (Desktop) */}
      <div className="hidden md:flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-semibold text-primary mb-2 tracking-tight">
            My Postings
          </h1>
          <p className="text-base text-on-surface-variant">
            Manage your current job advertisements and review candidates.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Search postings..."
              className="pl-10 pr-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-sm w-64 text-on-surface outline-none"
            />
          </div>
          <Link
            href="/employer/post-job"
            className="bg-secondary text-on-secondary text-sm font-medium px-6 py-2 rounded-lg hover:bg-secondary-container transition-colors shadow-sm inline-flex items-center justify-center"
          >
            Post a Job
          </Link>
        </div>
      </div>

      {/* Mobile Search & Action */}
      <div className="md:hidden flex flex-col gap-2 mb-6">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="Search postings..."
            className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-sm text-on-surface outline-none"
          />
        </div>
        <Link
          href="/employer/post-job"
          className="w-full bg-secondary text-on-secondary text-sm font-medium py-3 rounded-lg hover:bg-secondary-container transition-colors shadow-sm text-center"
        >
          Post a Job
        </Link>
      </div>

      {/* Filters / Tabs */}
      <div className="flex gap-4 mb-6 border-b border-outline-variant overflow-x-auto pb-px">
        <button className="px-4 py-2 text-sm font-medium text-secondary border-b-2 border-secondary whitespace-nowrap cursor-pointer">
          All Postings (12)
        </button>
        <button className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer">
          Active (8)
        </button>
        <button className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer">
          Drafts (3)
        </button>
        <button className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer">
          Closed (1)
        </button>
      </div>

      {/* Job Postings Grid */}
      <div className="grid grid-cols-1 gap-4">
        {mockPostings.map((job) => {
          const isDraft = job.status === "Draft";

          return (
            <div
              key={job.id}
              className={`border rounded-xl p-4 lg:p-6 transition-all cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                isDraft
                  ? "bg-surface-container-low border-outline-variant border-dashed hover:border-outline hover:shadow-sm opacity-80"
                  : "bg-surface-container-lowest border-outline-variant hover:border-secondary hover:shadow-sm"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      isDraft
                        ? "bg-surface-variant text-on-surface-variant border border-outline-variant"
                        : "bg-secondary-fixed text-on-secondary-fixed-variant"
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    {job.postedDate}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-1 group-hover:text-secondary transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    location_on
                  </span>{" "}
                  {job.location}
                  <span className="mx-2">•</span>
                  <span className="material-symbols-outlined text-[16px]">
                    work
                  </span>{" "}
                  {job.type}
                </p>
              </div>

              <div className="flex gap-6 lg:gap-12 items-center border-t lg:border-t-0 border-outline-variant pt-4 lg:pt-0 mt-2 lg:mt-0">
                <div className={`text-center ${isDraft ? "opacity-50" : ""}`}>
                  <p className="text-2xl font-semibold text-primary">
                    {job.totalApplicants ?? "-"}
                  </p>
                  <p className="text-sm text-on-surface-variant">Total</p>
                </div>

                <div
                  className={`text-center relative ${
                    isDraft ? "opacity-50" : ""
                  }`}
                >
                  <p
                    className={`text-2xl font-semibold ${
                      isDraft ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {job.newApplicants ?? "-"}
                  </p>
                  <p className="text-sm text-on-surface-variant">New</p>
                  {!isDraft && (job.newApplicants ?? 0) > 0 && (
                    <div className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-error" />
                  )}
                </div>

                <div className="ml-auto lg:ml-0 flex items-center gap-2">
                  {isDraft && (
                    <button className="text-xs font-semibold text-secondary hover:underline cursor-pointer">
                      Complete Draft
                    </button>
                  )}
                  <button
                    aria-label="Options"
                    className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
