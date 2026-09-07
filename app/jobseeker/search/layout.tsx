import SearchBar from "../components/SearchBar";

export default function JobseekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Top Header / Nav Bar here */}
      <div className="px-4 md:px-12 pt-4">
        <SearchBar />
      </div>
      <main>{children}</main>
    </div>
  );
}
