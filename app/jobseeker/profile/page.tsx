"use client";

import React from "react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="flex-1 p-4 md:p-12 max-w-[1280px] mx-auto w-full flex flex-col lg:flex-row gap-6">
      {/* Left Column: Primary Profile Info */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Profile Banner & Basic Info Card */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
          {/* Banner Image */}
          <div className="h-48 w-full bg-slate-200 relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCobtFn7AVbo-pF5clV2-ePkP92qQKqH0khhYpj_4BwSiBoy3jhxLdIGclddPGh15vI9xMdBz4-jZoCNqA-u27Umy2G-1lwI2R2miZre7smm98_oVI-MjovV0YVlZwmc03GGUriPMt2xJy1lQ1sJ3lvOZT1nmxgsqc-uC9LX_T-oj9Ri4il4WpnYltylNkNmzl1NbCrlESNgqgTKgcyHaPGzzl23Rx-g8y_rhpx9Odon2T0kdQytQ"
              alt="Profile banner"
              fill
              className="object-cover"
            />
            <button className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full backdrop-blur-sm transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">
                edit
              </span>
            </button>
          </div>

          {/* Avatar & Info */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 sm:-mt-12 mb-4 gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden relative bg-slate-100 shadow-sm z-10">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoL8Ml0L1amlkDAV5_NcE-PyuE8bz6r_aeD9Lf5DQYnLi5p1eWi0TYFugCG--5Rjf8tZql8GOdHkOpdwwQz9SgRzFVqPOUnYSc6mC-1FOzfqU35xvXL-M0mQpI9aYU1NBqrsLmrqjsFCgcX3LmlYDO2Ys07oKB67YfmRVlWhFlKNBcyZ0BU3il4t8TVoK3FfsRbf2ALfOgq0uhAuPvGlyMy9DKEa0AZphJH8v5GRnhqpstHkoEJQ"
                    alt="Alex Reynolds"
                    fill
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-[#142175] text-white p-1.5 rounded-full shadow-md hover:bg-[#2e3a8c] transition-colors z-20">
                  <span className="material-symbols-outlined text-[16px]">
                    photo_camera
                  </span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    download
                  </span>
                  Resume
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#142175] text-white font-semibold text-xs hover:bg-[#142175]/90 hover:-translate-y-[1px] transition-all shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    edit
                  </span>
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Text Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1">
                Alex Reynolds
              </h2>
              <p className="text-base text-slate-500 mb-4">
                Senior UX/UI Designer crafting user-centric digital experiences.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    location_on
                  </span>
                  San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    business_center
                  </span>
                  8+ Years Experience
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    mail
                  </span>
                  alex.reynolds@example.com
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#142175]">
                work_history
              </span>
              Experience
            </h3>
            <button className="text-[#142175] hover:bg-slate-50 p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>

          {/* Timeline */}
          <div className="relative border-l-2 border-slate-200 ml-2 space-y-6 pl-6 pb-2">
            {/* Item 1 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 bg-white border-2 border-[#142175] w-4 h-4 rounded-full"></span>
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-lg font-semibold text-slate-900">
                  Senior Product Designer
                </h4>
                <button className="text-slate-400 hover:text-[#142175] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </button>
              </div>
              <p className="text-xs font-semibold text-[#142175] mb-1">
                TechCorp Inc. • Full-time
              </p>
              <p className="text-xs font-semibold text-slate-400 mb-2">
                Jan 2020 - Present • 4 yrs
              </p>
              <p className="text-sm text-slate-600">
                Lead designer for the core SaaS platform. Spearheaded the
                redesign of the user dashboard resulting in a 40% increase in
                user engagement. Mentored junior designers.
              </p>
            </div>

            {/* Item 2 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 bg-slate-300 border-2 border-slate-300 w-4 h-4 rounded-full"></span>
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-lg font-semibold text-slate-900">
                  UX Designer
                </h4>
                <button className="text-slate-400 hover:text-[#142175] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </button>
              </div>
              <p className="text-xs font-semibold text-slate-500 mb-1">
                Creative Solutions Agency
              </p>
              <p className="text-xs font-semibold text-slate-400 mb-2">
                Mar 2016 - Dec 2019 • 3 yrs 10 mos
              </p>
              <p className="text-sm text-slate-600">
                Worked on varied client projects ranging from e-commerce to
                healthcare apps. Conducted user research, wireframing, and
                high-fidelity prototyping.
              </p>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#142175]">
                school
              </span>
              Education
            </h3>
            <button className="text-[#142175] hover:bg-slate-50 p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-600">
                  account_balance
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-semibold text-slate-900">
                    University of Design
                  </h4>
                  <button className="text-slate-400 hover:text-[#142175] transition-colors opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                </div>
                <p className="text-sm text-slate-600">
                  Bachelor of Arts in Interaction Design
                </p>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  2012 - 2016
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Secondary Widgets */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        {/* Profile Strength Widget */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
            Profile Strength
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-slate-900">
              Intermediate
            </span>
            <span className="text-xs font-semibold text-[#142175]">70%</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-[#142175] w-[70%] rounded-full"></div>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            Complete your profile to stand out to recruiters.
          </p>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-1.5 text-slate-900">
              <span className="material-symbols-outlined text-[#142175] text-[16px]">
                check_circle
              </span>
              Add Education
            </li>
            <li className="flex items-center gap-1.5 text-slate-900">
              <span className="material-symbols-outlined text-[#142175] text-[16px]">
                check_circle
              </span>
              Add Experience
            </li>
            <li className="flex items-center gap-1.5 text-slate-400">
              <span className="material-symbols-outlined text-slate-400 text-[16px]">
                radio_button_unchecked
              </span>
              Upload Resume
            </li>
            <li className="flex items-center gap-1.5 text-slate-400">
              <span className="material-symbols-outlined text-slate-400 text-[16px]">
                radio_button_unchecked
              </span>
              Add Skills
            </li>
          </ul>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
            <button className="text-[#142175] hover:bg-slate-50 p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                edit
              </span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-[#142175] text-xs font-semibold rounded-full border border-blue-100">
              UI Design
            </span>
            <span className="px-3 py-1 bg-blue-50 text-[#142175] text-xs font-semibold rounded-full border border-blue-100">
              UX Research
            </span>
            <span className="px-3 py-1 bg-blue-50 text-[#142175] text-xs font-semibold rounded-full border border-blue-100">
              Figma
            </span>
            <span className="px-3 py-1 bg-blue-50 text-[#142175] text-xs font-semibold rounded-full border border-blue-100">
              Prototyping
            </span>
            <span className="px-3 py-1 bg-blue-50 text-[#142175] text-xs font-semibold rounded-full border border-blue-100">
              Wireframing
            </span>
            <button className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-300 border-dashed hover:bg-slate-200 cursor-pointer transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">add</span>{" "}
              Add Skill
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
