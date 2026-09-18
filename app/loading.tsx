export default function Loading() {
  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-outline-variant bg-surface-container-lowest px-8 py-7 shadow-xl">
        <span className="material-symbols-outlined animate-spin text-4xl text-secondary">
          progress_activity
        </span>
        <p className="text-sm font-semibold text-on-surface">
          Loading your workspace...
        </p>
      </div>
    </div>
  );
}
