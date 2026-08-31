import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@/app/generated/prisma";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface JobDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto bg-[#f8f9ff] text-[#191c20] relative font-sans selection:bg-[#2e3a8c] selection:text-[#9ea9ff]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-[#eff4ff] to-[#f8f9ff] z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#142175 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Added pt-20 on mobile & pt-24 on desktop to clear fixed top navbar */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 pt-20 md:pt-24 pb-12 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[#454651] text-xs font-semibold mb-4 md:mb-6">
          <Link
            href="/jobseeker/home"
            className="hover:text-[#142175] transition-colors"
          >
            Jobs
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <Link
            href={`/jobseeker/categories/${encodeURIComponent(job.category.toLowerCase())}`}
            className="hover:text-[#142175] transition-colors capitalize"
          >
            {job.category}
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-[#191c20] truncate max-w-[150px] sm:max-w-none">
            {job.title}
          </span>
        </nav>

        {/* Hero Job Header */}
        <div className="bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#c6c5d3]/30 mb-6">
          {/* Header Top Row: Logo + Title + Status */}
          <div className="flex items-start gap-3.5 md:gap-5 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-[#e7e8ee] border border-[#c6c5d3]/20 shrink-0 flex items-center justify-center font-bold text-base md:text-lg text-[#454651]">
              {job.company.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-3xl font-bold text-[#191c20] tracking-tight leading-snug">
                  {job.title}
                </h1>
                <span className="bg-[#eff4ff] text-[#142175] text-[11px] font-semibold px-2 py-0.5 rounded-md inline-flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#142175] inline-block" />{" "}
                  Active
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#454651] mt-1">
                <span className="font-semibold text-[#191c20]">
                  {job.company}
                </span>{" "}
                • {job.location}
              </p>
            </div>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap gap-2 py-3 border-t border-b border-[#c6c5d3]/20 my-4">
            {job.salary && (
              <div className="flex items-center gap-1 text-[#454651] text-xs font-medium bg-[#f8f9ff] px-2.5 py-1 rounded-md border border-[#c6c5d3]/30">
                <span className="material-symbols-outlined text-[16px]">
                  payments
                </span>
                {job.salary}
              </div>
            )}
            <div className="flex items-center gap-1 text-[#454651] text-xs font-medium bg-[#f8f9ff] px-2.5 py-1 rounded-md border border-[#c6c5d3]/30">
              <span className="material-symbols-outlined text-[16px]">
                work
              </span>
              {job.type}
            </div>
            <div className="flex items-center gap-1 text-[#454651] text-xs font-medium bg-[#f8f9ff] px-2.5 py-1 rounded-md border border-[#c6c5d3]/30 capitalize">
              <span className="material-symbols-outlined text-[16px]">
                category
              </span>
              {job.category}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button className="flex-1 sm:flex-initial sm:w-48 bg-[#142175] text-white text-sm font-semibold h-11 px-5 rounded-xl shadow-sm hover:bg-[#2e3a8c] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2">
              <span>Apply Now</span>
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
            <button className="flex-1 sm:flex-initial sm:w-48 bg-[#f8f9ff] text-[#142175] border border-[#767682]/40 text-sm font-semibold h-11 px-5 rounded-xl hover:bg-[#eff4ff] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">
                bookmark
              </span>
              <span>Save Job</span>
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Role Details */}
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#c6c5d3]/30">
              <h2 className="text-lg md:text-xl font-bold text-[#191c20] mb-3">
                About the Role
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[#454651] whitespace-pre-line">
                {job.description ||
                  `${job.company} is seeking a dynamic ${job.title} to join their team in ${job.location}. This position requires driving user-focused outcomes and collaborating closely with cross-functional teams.`}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#c6c5d3]/30">
              <h2 className="text-lg md:text-xl font-bold text-[#191c20] mb-3">
                Requirements
              </h2>
              <ul className="text-sm md:text-base text-[#454651] space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#142175] mt-0.5 text-base shrink-0">
                    check_circle
                  </span>
                  <span>
                    Proven experience working in relevant development
                    environments and projects.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#142175] mt-0.5 text-base shrink-0">
                    check_circle
                  </span>
                  <span>
                    Strong problem-solving abilities and effective cross-team
                    communication.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#142175] mt-0.5 text-base shrink-0">
                    check_circle
                  </span>
                  <span>
                    Ability to operate efficiently in structured development
                    workflows.
                  </span>
                </li>
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#c6c5d3]/30">
              <h2 className="text-lg md:text-xl font-bold text-[#191c20] mb-3">
                Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3.5 bg-[#f8f9ff] rounded-xl border border-[#c6c5d3]/20">
                  <div className="w-9 h-9 rounded-full bg-[#eff4ff] text-[#142175] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">
                      health_and_safety
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-[#191c20]">
                      Comprehensive Health
                    </h3>
                    <p className="text-[11px] md:text-xs text-[#454651]">
                      Medical, dental, and vision.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-[#f8f9ff] rounded-xl border border-[#c6c5d3]/20">
                  <div className="w-9 h-9 rounded-full bg-[#eff4ff] text-[#142175] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">
                      paid
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-[#191c20]">
                      Competitive Compensation
                    </h3>
                    <p className="text-[11px] md:text-xs text-[#454651]">
                      Competitive base salary and benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#c6c5d3]/30">
              <h3 className="text-[11px] font-semibold text-[#454651] mb-3 uppercase tracking-wider">
                Posted By
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#e1e2e8] flex items-center justify-center text-xs font-bold text-[#454651] shrink-0">
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-[#191c20]">
                    {job.company} Team
                  </h4>
                  <p className="text-[11px] text-[#454651]">Recruiting Team</p>
                </div>
              </div>
              <button className="w-full bg-[#f8f9ff] text-[#142175] border border-[#767682]/40 text-xs md:text-sm font-semibold h-10 rounded-xl hover:bg-[#eff4ff] transition-colors duration-200">
                Message
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#c6c5d3]/30">
              <h3 className="text-[11px] font-semibold text-[#454651] mb-2 uppercase tracking-wider">
                About {job.company}
              </h3>
              <p className="text-xs md:text-sm text-[#454651] mb-3 leading-relaxed">
                {job.company} designs modern software systems focused on
                building impactful digital user experiences.
              </p>
              <Link
                href="#"
                className="text-[#142175] text-xs md:text-sm font-semibold flex items-center gap-1 hover:underline"
              >
                View Company Profile
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
