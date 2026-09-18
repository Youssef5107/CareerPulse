import { Suspense } from "react";
import SearchBar from "../components/SearchBar";

export default function JobseekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <div className="px-4 md:px-12 pt-4">
        <Suspense fallback={<div className="h-[68px]" />}>
          <SearchBar />
        </Suspense>
      </div>
      <main>{children}</main>
    </div>
  );
}
