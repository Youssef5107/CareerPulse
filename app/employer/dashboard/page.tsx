"use client";

import Link from "next/link";
import Image from "next/image";

export default function EmployerDashboardPage() {
  return (
    <div className="bg-background text-on-background font-sans antialiased min-h-screen flex w-full overflow-x-hidden">
      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant z-40 p-6 justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 px-2 pt-2">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              corporate_fare
            </span>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Employer Portal
              </h1>
              <p className="text-sm text-on-surface-variant">Hiring Manager</p>
            </div>
          </div>

          <button className="w-full bg-secondary hover:bg-secondary-container text-on-secondary text-sm font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">add</span>
            Post a Job
          </button>

          <nav className="flex flex-col gap-1 mt-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-4 py-2 text-secondary bg-secondary-fixed rounded-lg transition-all"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                dashboard
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              href="/postings"
              className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
            >
              <span className="material-symbols-outlined">work</span>
              <span className="text-sm font-medium">My Postings</span>
            </Link>
            <Link
              href="/post-job"
              className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span className="text-sm font-medium">Post a Job</span>
            </Link>
            <Link
              href="/applicants"
              className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="text-sm font-medium">Applicants</span>
            </Link>
          </nav>
        </div>

        <nav className="flex flex-col gap-1 mb-4">
          <Link
            href="/help"
            className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="text-sm font-medium">Help</span>
          </Link>
          <button className="flex items-center gap-4 px-4 py-2 w-full text-left text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* TopNavBar (Mobile Only) */}
        <header className="md:hidden flex justify-between items-center px-6 w-full h-16 bg-surface border-b border-outline-variant z-30 sticky top-0">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              corporate_fare
            </span>
            <span className="text-xl font-bold text-primary">CareerPulse</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-12 max-w-[1280px] mx-auto w-full flex flex-col gap-6 lg:gap-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-1">
                Welcome back, Sarah
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
                Oct 24, 2023
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Stat Card 1 */}
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
                  +1 this week
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-1">
                Active Postings
              </p>
              <h3 className="text-5xl font-bold text-primary leading-tight">
                4
              </h3>
            </div>

            {/* Stat Card 2 */}
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
                  24%
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-1">
                New Applicants
              </p>
              <h3 className="text-5xl font-bold text-primary leading-tight">
                12
              </h3>
            </div>

            {/* Stat Card 3 */}
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
                <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                  Next: 2:00 PM
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-1">
                Interviews Scheduled
              </p>
              <h3 className="text-5xl font-bold text-primary leading-tight">
                3
              </h3>
            </div>
          </div>

          {/* Bento Layout Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Recent Applicants */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col">
              <div className="p-6 border-b border-surface-container-high flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-primary">
                  Recent Applicants
                </h3>
                <Link
                  href="/applicants"
                  className="text-xs font-semibold text-secondary hover:underline flex items-center"
                >
                  View All{" "}
                  <span className="material-symbols-outlined text-[16px] ml-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <div className="flex-1 flex flex-col">
                {/* Applicant 1 */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-surface-container-high hover:bg-surface-bright transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-outline-variant shrink-0">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCevtHdCEkI_P6AIYKeNQ9-sVJQFx-uvVa7wRLXDYUCMD7ePNe_SC-_ToNGUIvNmshrFFJ8fdQ0U_CWa7pZMLjVP2GVcu91DWM6XPW7Q4bsAn7fd7lxB-sZ4FMkFMpeTcHykWkhZPxW93PYJSRelY_TfKlq7xbqh8HdExfGK9m1vuCw7dtClGBX-1P_r52HvvdhDV6HlodioDG4cW95bV7338Kspu1apolCusomGk42V0vzvFbVNQ"
                        alt="Michael Chen"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-on-surface group-hover:text-secondary transition-colors">
                        Michael Chen
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Senior Frontend Engineer
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-on-surface-variant mb-1">
                      Today, 10:24 AM
                    </p>
                    <span className="inline-block px-2 py-1 bg-surface-container rounded-md text-xs font-semibold text-on-surface">
                      Match: 92%
                    </span>
                  </div>
                </div>

                {/* Applicant 2 */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-surface-container-high hover:bg-surface-bright transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center text-xl font-semibold border border-outline-variant shrink-0">
                      ER
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-on-surface group-hover:text-secondary transition-colors">
                        Elena Rodriguez
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Product Manager
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-on-surface-variant mb-1">
                      Yesterday
                    </p>
                    <span className="inline-block px-2 py-1 bg-surface-container rounded-md text-xs font-semibold text-on-surface">
                      Match: 88%
                    </span>
                  </div>
                </div>

                {/* Applicant 3 */}
                <div className="flex items-center justify-between p-4 md:p-6 hover:bg-surface-bright transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-outline-variant shrink-0">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA43nLHdCWi9dcRPmdpTpwUk9-6W7gF2KAr9Wj_RdXB0s4h1UuiAKOyepTn_Ezh91DrQ3tNWX69KWGY4i4pLm3PYZEIbGmw4uS0rs4B59CHJ_WK4SewOpnsrUvfH_EhxUmA6OgrfZF1GkARiqpjZCI4XpBYuzYpVSLU_n00PVQd2C2WMiVjli3ZSa0_E6DNGufSrM_kgmenvupVgH0kgCZzl0UxNkqCF_oXXIl32hDbYB9zleqfYg"
                        alt="David Smith"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-on-surface group-hover:text-secondary transition-colors">
                        David Smith
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        UX Designer
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-on-surface-variant mb-1">
                      Oct 22
                    </p>
                    <span className="inline-block px-2 py-1 bg-surface-container rounded-md text-xs font-semibold text-on-surface">
                      Match: 75%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Quick Actions & Pipeline) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Quick Actions Card */}
              <div className="bg-primary text-on-primary rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-tertiary-fixed rounded-full opacity-10 blur-xl"></div>
                <h3 className="text-2xl font-semibold mb-6 relative z-10">
                  Quick Actions
                </h3>
                <div className="flex flex-col gap-4 relative z-10">
                  <button className="w-full bg-secondary hover:bg-secondary-container text-on-secondary text-sm font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined">add</span>
                      Post a New Job
                    </div>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <button className="w-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 border border-outline-variant/30 text-on-primary text-sm font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined">
                        checklist
                      </span>
                      Review Pending (5)
                    </div>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>

              {/* Mini Pipeline Overview */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex-1">
                <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
                  Hiring Pipeline
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-sm text-on-surface">Screening</span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        24 candidates
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full w-[60%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-sm text-on-surface">
                        Interviewing
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        8 candidates
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-tertiary h-2 rounded-full w-[30%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-sm text-on-surface">
                        Offer Stage
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        2 candidates
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[10%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
