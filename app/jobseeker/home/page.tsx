"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex overflow-hidden font-sans">
      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant/30 h-screen p-6 shrink-0 z-10 shadow-[4px_0_24px_rgba(30,41,59,0.02)]">
        <div className="flex items-center gap-3 mb-12 text-primary">
          <div className="w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-sm">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              work
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight">CareerPulse</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Link
            href="/"
            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-secondary-fixed/20 text-secondary font-bold hover:bg-secondary-fixed/30 transition-colors"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              home
            </span>
            <span className="text-sm font-medium">Home</span>
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
            <span className="text-sm font-medium">Search</span>
          </Link>
          <Link
            href="/saved"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">bookmark</span>
            <span className="text-sm font-medium">Saved</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant/30">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-surface-container-low transition-colors text-left cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8i0Wh4Uj-7ewYNWItip4syTASfDCQXmRdFsJjj2G8OnfFxfsK_XScxnRFDHUKWOfec-8zGHPHmpiak6UVnud4zQf_gKoAlrR45r1qncaKgNjjqSvbSmSTknQrHh9jr2-fgopPdWYiBfbDxaRw5F6AH22QoqcWDKcucZOVL-oTrp96ROtdHzdp9oQTP4XFy_piaGzPf5itWtR9bzsvZROEjx4pdjvJyrjXEnlGVltIULRR9HHU6A"
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Alex Morgan</p>
              <p className="text-xs text-on-surface-variant truncate">
                UX Designer
              </p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              more_vert
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-background p-6 md:p-12 relative scroll-smooth">
        {/* Header Actions */}
        <div className="absolute top-6 right-8 md:top-12 md:right-12 flex items-center gap-4 z-20">
          <button className="w-12 h-12 rounded-full bg-surface-container-lowest border border-outline-variant shadow-sm flex items-center justify-center text-on-surface hover:border-secondary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>

        <div className="max-w-[1280px] mx-auto w-full pt-16 md:pt-0">
          {/* Hero Section */}
          <section className="mb-16 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
              Find your next
              <br />
              career move
            </h1>
            <p className="text-lg text-on-surface-variant mb-10 max-w-xl">
              Discover opportunities that match your skills, experience, and
              aspirations across top global companies.
            </p>

            {/* Search Bar */}
            <div className="bg-surface-container-lowest rounded-full shadow-[0_8px_30px_rgba(30,41,59,0.08)] border border-outline-variant/50 p-2 flex flex-col md:flex-row items-center relative z-20">
              <div className="flex-1 flex items-center px-6 py-3 w-full border-b md:border-b-0 md:border-r border-outline-variant/30">
                <span className="material-symbols-outlined text-on-surface-variant mr-3">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full bg-transparent border-none focus:outline-none text-on-surface placeholder:text-on-surface-variant text-base p-0"
                />
              </div>
              <div className="flex-1 flex items-center px-6 py-3 w-full">
                <span className="material-symbols-outlined text-on-surface-variant mr-3">
                  location_on
                </span>
                <input
                  type="text"
                  placeholder="City, state, zip code, or 'remote'"
                  className="w-full bg-transparent border-none focus:outline-none text-on-surface placeholder:text-on-surface-variant text-base p-0"
                />
              </div>
              <button className="w-full md:w-auto mt-2 md:mt-0 bg-secondary text-on-secondary font-medium text-sm px-8 py-4 rounded-full hover:bg-on-secondary-fixed-variant transition-colors shadow-sm whitespace-nowrap cursor-pointer">
                Search Jobs
              </button>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm text-on-surface-variant whitespace-nowrap">
                Popular:
              </span>
              <button className="px-4 py-1.5 rounded-full bg-secondary-fixed/30 text-secondary text-xs font-semibold whitespace-nowrap hover:bg-secondary-fixed/50 transition-colors cursor-pointer">
                Product Manager
              </button>
              <button className="px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold whitespace-nowrap hover:bg-surface-variant transition-colors cursor-pointer">
                UX Designer
              </button>
              <button className="px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold whitespace-nowrap hover:bg-surface-variant transition-colors cursor-pointer">
                Data Scientist
              </button>
            </div>
          </section>

          {/* Bento Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Feed (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Featured Categories */}
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-2xl font-semibold text-primary">
                    Explore Categories
                  </h2>
                  <Link
                    href="/categories"
                    className="text-secondary text-sm font-medium hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link
                    href="/category/design"
                    className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 hover:border-secondary hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-fixed/30 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        design_services
                      </span>
                    </div>
                    <h3 className="text-sm font-medium mb-1">Design</h3>
                    <p className="text-xs text-on-surface-variant">
                      1,204 jobs
                    </p>
                  </Link>

                  <Link
                    href="/category/engineering"
                    className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 hover:border-secondary hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-fixed/30 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <h3 className="text-sm font-medium mb-1">Engineering</h3>
                    <p className="text-xs text-on-surface-variant">
                      3,450 jobs
                    </p>
                  </Link>

                  <Link
                    href="/category/marketing"
                    className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 hover:border-secondary hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-fixed/30 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        campaign
                      </span>
                    </div>
                    <h3 className="text-sm font-medium mb-1">Marketing</h3>
                    <p className="text-xs text-on-surface-variant">856 jobs</p>
                  </Link>

                  <Link
                    href="/category/data"
                    className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 hover:border-secondary hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-fixed/30 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        analytics
                      </span>
                    </div>
                    <h3 className="text-sm font-medium mb-1">Data</h3>
                    <p className="text-xs text-on-surface-variant">
                      1,890 jobs
                    </p>
                  </Link>
                </div>
              </section>

              {/* Recommended Jobs List */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-6">
                  Recommended for You
                </h2>
                <div className="flex flex-col gap-4">
                  {/* Job Card 1 */}
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 hover:border-secondary hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all flex flex-col sm:flex-row gap-6 cursor-pointer relative group">
                    <div className="w-16 h-16 rounded-xl bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYQ3Mm3KwFlXwH-hwwMjPVOfzgzQbz7tD-TFS2jKVPODE4JaQU4-bCFDBb8tmrNnlPan5XlJHXFDAXB4hMq82GUtIEwJy05rvZK6qDiH__ArmuQplG8nv5EWu0eiSCNE9t_33QqRat4WiCTp54nMYz3fCGC7-8amKZzwR_5ricONtLQAVisHLNdaAOVFqMvcpjEhcekLDopWtjZe_FAtsVYEJN-mMa8fi5wJrhGb0eQTzc_7vOXQ"
                        alt="TechFlow Systems"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">
                            Senior UX Researcher
                          </h3>
                          <p className="text-sm text-on-surface-variant">
                            TechFlow Systems • San Francisco, CA (Hybrid)
                          </p>
                        </div>
                        <button className="text-on-surface-variant hover:text-secondary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer">
                          <span className="material-symbols-outlined">
                            bookmark_border
                          </span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 rounded-md bg-secondary-fixed/20 text-secondary text-xs font-semibold">
                          $140k - $180k
                        </span>
                        <span className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant text-xs font-semibold border border-outline-variant/20">
                          Full-time
                        </span>
                        <span className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant text-xs font-semibold border border-outline-variant/20">
                          Mid-Senior level
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Card 2 */}
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 hover:border-secondary hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all flex flex-col sm:flex-row gap-6 cursor-pointer relative group">
                    <div className="w-16 h-16 rounded-xl bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9oHqNr7o2_LkYG3Kg0Sdysql0uR2mFcEJ0QAX4ICtumPi3N4t3GpM6OMh89E1NcPz9HLGN23WzfKz61C_c1AEuLljB-BEb5xtzy01bX_A_9DlR_PknHzEF1SXJp10puQ1i67NtysZEd7jXh-irr6R4erNfmgRL75IkG2lTcIDj1wYEaIvs28drewc4Pd_nTE9qAJbx1zKWVZJo02aKY6qIfs3Y3XCrXk2Kx6wqFwpSMf7f2s3ZQ"
                        alt="EcoSphere"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">
                            Product Designer
                          </h3>
                          <p className="text-sm text-on-surface-variant">
                            EcoSphere • Remote
                          </p>
                        </div>
                        <button className="text-on-surface-variant hover:text-secondary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer">
                          <span className="material-symbols-outlined">
                            bookmark_border
                          </span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 rounded-md bg-secondary-fixed/20 text-secondary text-xs font-semibold">
                          $110k - $150k
                        </span>
                        <span className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant text-xs font-semibold border border-outline-variant/20">
                          Full-time
                        </span>
                        <span className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant text-xs font-semibold border border-outline-variant/20">
                          Remote
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Card 3 */}
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 hover:border-secondary hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all flex flex-col sm:flex-row gap-6 cursor-pointer relative group">
                    <div className="w-16 h-16 rounded-xl bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <div className="w-10 h-10 bg-tertiary-container rounded text-on-tertiary-container flex items-center justify-center font-bold text-lg">
                        A
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">
                            Front-End Developer
                          </h3>
                          <p className="text-sm text-on-surface-variant">
                            Apex Financial • New York, NY (On-site)
                          </p>
                        </div>
                        <button className="text-on-surface-variant hover:text-secondary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer">
                          <span className="material-symbols-outlined">
                            bookmark_border
                          </span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 rounded-md bg-secondary-fixed/20 text-secondary text-xs font-semibold">
                          $130k - $160k
                        </span>
                        <span className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant text-xs font-semibold border border-outline-variant/20">
                          Contract
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Profile Completion Widget */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 shadow-[0_4px_12px_rgba(30,41,59,0.02)]">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Profile Strength
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 bg-surface-container-high rounded-full h-2 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full w-[75%]"></div>
                  </div>
                  <span className="text-xs font-bold text-secondary">75%</span>
                </div>
                <p className="text-sm text-on-surface-variant mb-4">
                  Add your portfolio link to stand out to design recruiters.
                </p>
                <button className="w-full py-2.5 rounded-lg border border-outline-variant text-primary text-sm font-medium hover:bg-surface-container-low transition-colors cursor-pointer">
                  Update Profile
                </button>
              </div>

              {/* Trending Companies */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 shadow-[0_4px_12px_rgba(30,41,59,0.02)]">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Trending Companies
                </h3>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/company/cloudsync"
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary">
                          cloud
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary group-hover:text-secondary transition-colors">
                          CloudSync
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          42 open roles
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward_ios
                    </span>
                  </Link>

                  <Link
                    href="/company/retailnext"
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary">
                          shopping_bag
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary group-hover:text-secondary transition-colors">
                          RetailNext
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          18 open roles
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward_ios
                    </span>
                  </Link>

                  <Link
                    href="/company/healthplus"
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary">
                          healing
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary group-hover:text-secondary transition-colors">
                          HealthPlus
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          56 open roles
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward_ios
                    </span>
                  </Link>
                </div>
                <button className="w-full mt-6 py-2 text-secondary text-sm font-medium hover:underline cursor-pointer">
                  See all companies
                </button>
              </div>
            </div>
          </div>

          <div className="h-24 md:h-12"></div>
        </div>
      </main>

      {/* Bottom Nav Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface border-t border-outline-variant pb-safe px-2 flex justify-around items-center h-16">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-secondary font-bold bg-secondary-fixed/20 rounded-xl px-2 py-1 flex-1"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link
          href="/search"
          className="flex flex-col items-center justify-center text-on-surface-variant flex-1"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px]">Search</span>
        </Link>
        <Link
          href="/saved"
          className="flex flex-col items-center justify-center text-on-surface-variant flex-1"
        >
          <span className="material-symbols-outlined">bookmark</span>
          <span className="text-[10px]">Saved</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center justify-center text-on-surface-variant flex-1"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px]">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
