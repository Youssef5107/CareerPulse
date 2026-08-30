interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags?: string[];
  description?: string;
  time: string;
  isPromoted?: boolean;
  isApplied?: boolean;
}

export default function JobCard({
  title,
  company,
  location,
  salary,
  type,
  tags = [],
  description,
  time,
  isPromoted,
  isApplied,
}: JobCardProps) {
  return (
    <div
      className={`bg-surface-container-lowest border rounded-xl p-5 shadow-sm transition-all group relative cursor-pointer ${
        isPromoted
          ? "border-secondary/30 hover:border-secondary"
          : "border-outline-variant hover:border-secondary"
      } ${isApplied ? "opacity-75 grayscale-[20%]" : ""}`}
    >
      {isPromoted && (
        <div className="absolute top-0 right-0 bg-secondary/10 text-secondary px-3 py-1 rounded-bl-lg font-label-sm text-label-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">star</span>{" "}
          Promoted
        </div>
      )}

      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant shrink-0 flex items-center justify-center font-bold text-on-surface-variant">
          {company[0]}
        </div>
        <div className="flex-1">
          <h3 className="text-headline-md font-headline-md text-on-surface mb-1 group-hover:text-secondary transition-colors">
            {title}
          </h3>
          <p className="text-body-md text-on-surface-variant">
            {company} • {location}
          </p>
        </div>
        {isApplied ? (
          <div className="flex items-center text-[#059669] bg-[#059669]/10 px-3 py-1 rounded-full text-label-sm font-label-sm gap-1">
            <span className="material-symbols-outlined text-[16px]">
              check_circle
            </span>{" "}
            Applied
          </div>
        ) : (
          <button
            aria-label="Save job"
            className="text-outline hover:text-secondary p-2 rounded-full hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined">bookmark_border</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded text-label-sm border border-outline-variant/50">
          {salary}
        </span>
        <span className="bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded text-label-sm border border-outline-variant/50">
          {type}
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-primary-fixed text-on-primary-fixed-variant px-2.5 py-1 rounded text-label-sm border border-primary-fixed-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      {description && (
        <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">
          {description}
        </p>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-outline-variant/40">
        <span className="text-label-sm text-on-surface-variant">{time}</span>
        {!isApplied && (
          <button className="bg-secondary text-on-primary px-4 py-1.5 rounded-lg font-label-md hover:bg-secondary/90 transition-colors">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
