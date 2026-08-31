import SideNavBar from "./components/SideNavBar";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen relative">
      <SideNavBar />
      {/* Use explicit left margin matching w-64 sidebar */}
      <div className="w-full md:pl-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
