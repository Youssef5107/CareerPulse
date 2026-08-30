export default function SearchSection() {
  return (
    <>
      {/* Mobile Search Box */}
      <div className="md:hidden bg-surface border-b border-outline-variant px-md py-4">
        <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
          Job Search
        </h2>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-4">
          <div className="flex items-center px-3 py-3 border-b border-outline-variant">
            <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
              search
            </span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md text-on-surface outline-none"
              type="text"
              defaultValue="Product Designer"
            />
          </div>
          <div className="flex items-center px-3 py-3">
            <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
              location_on
            </span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md text-on-surface outline-none"
              type="text"
              defaultValue="San Francisco"
            />
          </div>
        </div>
      </div>

      {/* Desktop Search Header */}
      <div className="hidden md:flex max-w-container-max mx-auto px-md mb-6 justify-between items-center">
        <div className="flex-1 max-w-2xl">
          <div className="flex w-full bg-surface-container-lowest rounded-full border border-outline-variant shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-secondary transition-all">
            <div className="flex-1 flex items-center px-4 py-2 border-r border-outline-variant">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
                search
              </span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md text-on-surface placeholder-on-surface-variant outline-none"
                type="text"
                defaultValue="Product Designer"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
                location_on
              </span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md text-on-surface placeholder-on-surface-variant outline-none"
                type="text"
                defaultValue="San Francisco"
              />
            </div>
            <button className="bg-secondary text-on-primary px-6 py-2 font-label-md hover:bg-secondary/90 transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-secondary hover:bg-surface-container-low transition-colors rounded-full p-2 cursor-pointer">
            notifications
          </span>
          <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-label-sm">
            JS
          </div>
        </div>
      </div>
    </>
  );
}
