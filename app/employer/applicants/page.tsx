import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ApplicantTrackingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans relative flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
        <span className="text-xl font-bold text-slate-900">CareerPulse</span>
        <button className="text-slate-700 hover:text-slate-900">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              <Link href="#" className="text-sm font-medium hover:underline">
                Back to Postings
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Senior Product Designer
            </h1>
            <div className="flex flex-wrap gap-4 text-slate-600 text-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  location_on
                </span>
                San Francisco, CA (Hybrid)
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  schedule
                </span>
                Full-time
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  payments
                </span>
                $140k - $180k
              </span>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:w-auto w-full">
            <div className="bg-slate-100 p-3 rounded-lg flex flex-col items-center justify-center border border-slate-200 min-w-[90px]">
              <span className="text-2xl font-bold text-slate-900">45</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Total
              </span>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg flex flex-col items-center justify-center border border-blue-200 min-w-[90px]">
              <span className="text-2xl font-bold text-blue-900">12</span>
              <span className="text-xs text-blue-800 font-semibold uppercase tracking-wider">
                New
              </span>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg flex flex-col items-center justify-center border border-indigo-200 min-w-[90px]">
              <span className="text-2xl font-bold text-indigo-900">5</span>
              <span className="text-xs text-indigo-800 font-semibold uppercase tracking-wider">
                Interview
              </span>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg flex flex-col items-center justify-center border border-slate-200 opacity-70 min-w-[90px]">
              <span className="text-2xl font-bold text-slate-600">28</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Rejected
              </span>
            </div>
          </div>
        </div>

        {/* Controls (Filters & Search) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm sticky top-0 z-10">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search applicants..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm bg-slate-50"
            />
          </div>

          {/* Status Filters */}
          <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-1 md:pb-0">
            <button className="px-4 py-1.5 rounded-full border border-blue-600 bg-blue-50 text-blue-700 font-medium text-xs whitespace-nowrap">
              All (45)
            </button>
            <button className="px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 font-medium text-xs whitespace-nowrap transition-colors">
              Applied (12)
            </button>
            <button className="px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 font-medium text-xs whitespace-nowrap transition-colors">
              In Review (8)
            </button>
            <button className="px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 font-medium text-xs whitespace-nowrap transition-colors">
              Interviewing (5)
            </button>
          </div>

          <button className="hidden md:flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>{" "}
            Filter
          </button>
        </div>

        {/* Applicants List Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Applicant 1 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative">
                        <Image
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFkWl57FL3ThLi1EAK4f7X4rIPZOP6czi4zYZ6f_dDVva6LWra2iFTfOBzMAHd_BXcZU7iBZo-8FfikC-dkjrC5l2WYFwNY-c6ZMhUrAHODcRyvRt0UcFCeG-eVGl8mzEh5tzkPHw2os98JRX-AwXs6bfKzx8-F9mChR5nqh6IzkFoc8U1nC0iThKfQNFIxZTdcsMl6B9mNwrhXvVCtxWcTCuT4IN9Xi8tVwjF38gitDPhStJwyQ"
                          alt="Elena Rodriguez"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Elena Rodriguez
                        </div>
                        <div className="text-xs text-slate-500">
                          UX Designer at TechCorp
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500">Oct 24, 2023</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5" />
                      Applied
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                    >
                      View Profile{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </td>
                </tr>

                {/* Applicant 2 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative">
                        <Image
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkKWDbmFn4GNrO1hrz5IRnrqk4SSGvS6hPxg3OSf-kCay0YLF5lc4iVj6a96-f-wW66smu_gRNDxuJ7gdQpEGikPrhCMePUDY2O3niNGMYjv3-uwO82v0LEL8UhZNItHlLAKYK6JauO8H9w_SxjcWVMlH1nU973jgtCBkAOBbbjoaMNrGWhDItZ7bSznuYtuzqtYQ6cOHuREdJCMuUTOGgpkwIPWnc80KGJCXIh6xCfm1MaVvMBA"
                          alt="Marcus Johnson"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Marcus Johnson
                        </div>
                        <div className="text-xs text-slate-500">
                          Product Designer at FinTech Solutions
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500">Oct 22, 2023</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-1.5" />
                      Interviewing
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                    >
                      View Profile{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </td>
                </tr>

                {/* Applicant 3 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 shrink-0 flex items-center justify-center text-slate-600 text-xs font-bold">
                        SY
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Sarah Yilmaz
                        </div>
                        <div className="text-xs text-slate-500">
                          Senior UI Designer at Creative Agency
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500">Oct 20, 2023</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-1.5" />
                      In Review
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                    >
                      View Profile{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </td>
                </tr>

                {/* Applicant 4 */}
                <tr className="hover:bg-slate-50 transition-colors group opacity-75">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative">
                        <Image
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBODTvBsDLCAM1LGrfUYi46iU5Q4kbbSo8B5grSFr4f1iCzRl1N35D6F1Ebs7zMiVXg4rQZ6jbB87RdDQBnQD6PsYSU4z1D13UV8YrkTC5P4HZsH6p0kVmSHG05ro5s4YNdjnRmOyWGoMp8PnrC6gxwEtYLZ1Sw5P-UDamsARmG1P746ndoFgxg3hv_O5EN0ETr6HAE0ZSsfLx165Tu9zQ3wmCttsRI6-t_HLbM5M9WdkfmNXqRGQ"
                          alt="David Chen"
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-700">
                          David Chen
                        </div>
                        <div className="text-xs text-slate-500">
                          Graphic Designer at RetailCo
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500">Oct 18, 2023</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                      Rejected
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="#"
                      className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                    >
                      View Profile{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-3 border-t border-slate-200 flex items-center justify-between bg-white text-slate-500 text-sm">
            <span>Showing 1 to 4 of 45 applicants</span>
            <div className="flex gap-1">
              <button
                disabled
                className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-40 cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button className="p-1.5 rounded hover:bg-slate-100">
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
