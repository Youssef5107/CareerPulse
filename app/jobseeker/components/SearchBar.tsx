"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    if (location.trim()) params.set("location", location.trim());

    router.push(`/jobseeker/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-2 md:p-2.5 rounded-2xl border border-[#c6c5d3]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-2 w-full max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f8f9ff] rounded-xl flex-1 w-full">
        <span className="material-symbols-outlined text-[#767682] text-xl">
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job title, keywords, or company"
          className="w-full bg-transparent text-sm text-[#191c20] focus:outline-none placeholder:text-[#767682]"
        />
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f8f9ff] rounded-xl flex-1 w-full">
        <span className="material-symbols-outlined text-[#767682] text-xl">
          location_on
        </span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or remote"
          className="w-full bg-transparent text-sm text-[#191c20] focus:outline-none placeholder:text-[#767682]"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 h-11 bg-[#142175] text-white text-sm font-semibold rounded-xl hover:bg-[#2e3a8c] transition-colors shrink-0 flex items-center justify-center"
      >
        Search Jobs
      </button>
    </form>
  );
}
