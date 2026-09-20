export default function JobseekerLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-surface p-6 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-surface-container-high" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-surface-container-high" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 animate-pulse rounded-2xl bg-surface-container-high" />
          <div className="h-40 animate-pulse rounded-2xl bg-surface-container-high" />
          <div className="h-40 animate-pulse rounded-2xl bg-surface-container-high" />
        </div>
      </div>
    </div>
  );
}