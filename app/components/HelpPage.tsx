import Link from "next/link";

interface HelpPageProps {
  role: "employer" | "jobseeker";
}

const employerTopics = [
  {
    icon: "work",
    title: "Manage job posts",
    text: "Create, review, and update your job posts from My Postings.",
  },
  {
    icon: "group",
    title: "Review applicants",
    text: "Open Applicants to review profiles and update an application status.",
  },
  {
    icon: "notifications",
    title: "Stay informed",
    text: "Your notifications keep you updated about new applications and activity.",
  },
];

const jobseekerTopics = [
  {
    icon: "search",
    title: "Find opportunities",
    text: "Use search and categories to discover roles that fit your goals.",
  },
  {
    icon: "bookmark",
    title: "Save jobs",
    text: "Save interesting jobs and find them later from the Saved section.",
  },
  {
    icon: "person",
    title: "Keep your profile current",
    text: "Update your profile and settings so your information stays accurate.",
  },
];

export default function HelpPage({ role }: HelpPageProps) {
  const isEmployer = role === "employer";
  const topics = isEmployer ? employerTopics : jobseekerTopics;

  return (
    <main className="min-h-screen bg-surface px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl bg-primary p-6 text-on-primary shadow-lg md:p-10">
          <span className="material-symbols-outlined text-4xl">help</span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-on-primary-container">
            CareerPulse support
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            How can we help?
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-primary-container md:text-base">
            A quick guide to the tools available in your{" "}
            {isEmployer ? "employer" : "job-seeker"} workspace.
          </p>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {topics.map((topic) => (
            <article
              key={topic.title}
              className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="material-symbols-outlined text-2xl text-secondary">
                {topic.icon}
              </span>
              <h2 className="mt-4 font-bold text-on-surface">{topic.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                {topic.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <h2 className="text-xl font-bold text-on-surface">Need a hand?</h2>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            Check Notifications for recent activity or update your account from
            Settings.
          </p>
          <Link
            href={isEmployer ? "/employer/settings" : "/jobseeker/settings"}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-secondary transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
          >
            Open Settings
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
