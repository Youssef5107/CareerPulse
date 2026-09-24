"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/features/toast/toastSlice";

type Role = "EMPLOYER" | "JOB_SEEKER";
type Interview = {
  id: string;
  applicationId: string;
  proposedAt: string;
  mode: "ONSITE" | "ONLINE";
  details: string;
  status: "PENDING_JOBSEEKER" | "PENDING_EMPLOYER" | "ACCEPTED" | "REJECTED";
  proposedBy: "EMPLOYER" | "JOBSEEKER";
  application: {
    job: { title: string };
    user: { id: string; name: string | null; email: string | null };
  };
  employer: { name: string | null; companyName: string | null };
};

type Application = {
  applicationId: string;
  jobTitle: string;
  candidate: { name: string };
};

const statusLabels: Record<Interview["status"], string> = {
  PENDING_JOBSEEKER: "Pending applicant reply",
  PENDING_EMPLOYER: "Pending employer reply",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

function toInputDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export default function InterviewsPage({ role }: { role: Role }) {
  const dispatch = useAppDispatch();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [application, setApplication] = useState<Application | null>(null);
  const [form, setForm] = useState({
    proposedAt: "",
    mode: "ONLINE",
    details: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [counterInterviewId, setCounterInterviewId] = useState<string | null>(
    null,
  );
  const [counterForm, setCounterForm] = useState({
    proposedAt: "",
    mode: "ONLINE",
    details: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const queryApplicationId =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("applicationId");
  const queryInterviewId =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("interviewId");

  async function load() {
    const response = await fetch("/api/interviews");
    if (!response.ok) throw new Error("Unable to load interviews.");
    setInterviews(await response.json());
  }

  useEffect(() => {
    async function initialize() {
      try {
        await load();
        if (role === "EMPLOYER" && queryApplicationId) {
          const response = await fetch(
            `/api/applications/${queryApplicationId}`,
          );
          if (response.ok) setApplication(await response.json());
        }
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Unable to load interviews.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [role, queryApplicationId]);

  useEffect(() => {
    if (!queryInterviewId || isLoading) return;

    document
      .getElementById(`interview-${queryInterviewId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [isLoading, queryInterviewId, interviews]);

  async function submitEmployerProposal(event: FormEvent) {
    event.preventDefault();
    if (!application || isSaving) return;
    setIsSaving(true);
    try {
      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: application.applicationId,
          ...form,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Unable to schedule interview.");
      setMessage("Interview proposal sent.");
      dispatch(
        showToast({
          message: "Interview time sent successfully.",
          variant: "success",
        }),
      );
      setApplication(null);
      setForm({ proposedAt: "", mode: "ONLINE", details: "" });
      await load();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to schedule interview.";
      setMessage(errorMessage);
      dispatch(showToast({ message: errorMessage, variant: "error" }));
    } finally {
      setIsSaving(false);
    }
  }

  async function updateInterview(
    id: string,
    action: "ACCEPT" | "REJECT" | "COUNTER",
    counterData?: { proposedAt: string; mode: string; details: string },
  ) {
    const response = await fetch(`/api/interviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        proposedAt: counterData?.proposedAt,
        details: counterData?.details,
        mode: counterData?.mode,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result.error || "Unable to update interview.";
      setMessage(errorMessage);
      dispatch(showToast({ message: errorMessage, variant: "error" }));
      return;
    }
    const successMessage =
      action === "COUNTER"
        ? "Your new interview time was sent successfully."
        : action === "ACCEPT"
          ? "Interview accepted successfully."
          : "Interview rejected successfully.";
    setMessage(successMessage);
    dispatch(showToast({ message: successMessage, variant: "success" }));
    setCounterInterviewId(null);
    setCounterForm({ proposedAt: "", mode: "ONLINE", details: "" });
    await load();
  }

  async function submitCounterProposal(
    event: FormEvent<HTMLFormElement>,
    interviewId: string,
  ) {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      await updateInterview(interviewId, "COUNTER", counterForm);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Interview workspace
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
              Interviews
            </h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Review proposed times, locations, and next steps.
            </p>
          </div>
          <span className="hidden rounded-full bg-surface-container-high px-3 py-1.5 text-xs font-semibold text-on-surface-variant sm:inline-flex">
            {interviews.length} total
          </span>
        </div>

        {message && (
          <div className="mb-5 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface">
            {message}
          </div>
        )}

        {role === "EMPLOYER" && application && (
          <form
            onSubmit={submitEmployerProposal}
            className="mb-6 space-y-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
          >
            <div>
              <h2 className="text-lg font-semibold text-on-surface">
                Schedule with {application.candidate.name}
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                {application.jobTitle}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-on-surface">
                Recommended time
                <input
                  required
                  type="datetime-local"
                  value={form.proposedAt}
                  onChange={(event) =>
                    setForm({ ...form, proposedAt: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5"
                />
              </label>
              <label className="text-sm font-medium text-on-surface">
                Format
                <select
                  value={form.mode}
                  onChange={(event) =>
                    setForm({ ...form, mode: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5"
                >
                  <option value="ONLINE">Online</option>
                  <option value="ONSITE">On site</option>
                </select>
              </label>
            </div>
            <label className="block text-sm font-medium text-on-surface">
              Additional highlights
              <textarea
                value={form.details}
                onChange={(event) =>
                  setForm({ ...form, details: event.target.value })
                }
                rows={4}
                placeholder="Meeting link, address, interview focus, or anything the applicant should know"
                className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5"
              />
            </label>
            <button
              disabled={isSaving}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
            >
              {isSaving ? "Sending..." : "Send interview proposal"}
            </button>
          </form>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-10 text-center text-sm text-on-surface-variant">
            Loading interviews...
          </div>
        ) : interviews.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-10 text-center text-sm text-on-surface-variant">
            No interviews yet.
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <article
                key={interview.id}
                id={`interview-${interview.id}`}
                className={`rounded-2xl border bg-surface-container-lowest p-5 shadow-sm transition-colors ${
                  queryInterviewId === interview.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-outline-variant"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h2 className="text-lg font-semibold text-on-surface">
                      {interview.application.job.title}
                    </h2>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      {role === "EMPLOYER"
                        ? interview.application.user.name ||
                          interview.application.user.email
                        : interview.employer.companyName ||
                          interview.employer.name ||
                          "Employer"}
                    </p>
                  </div>
                  <span
                    className={`h-fit rounded-full px-3 py-1.5 text-xs font-semibold ${interview.status === "ACCEPTED" ? "bg-emerald-100 text-emerald-800" : interview.status === "REJECTED" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {statusLabels[interview.status]}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-on-surface-variant md:grid-cols-3">
                  <p>
                    <strong className="text-on-surface">Time:</strong>{" "}
                    {new Date(interview.proposedAt).toLocaleString()}
                  </p>
                  <p>
                    <strong className="text-on-surface">Format:</strong>{" "}
                    {interview.mode === "ONLINE" ? "Online" : "On site"}
                  </p>
                  <p>
                    <strong className="text-on-surface">Proposed by:</strong>{" "}
                    {interview.proposedBy === "EMPLOYER"
                      ? "Employer"
                      : "Job seeker"}
                  </p>
                </div>
                {interview.details && (
                  <p className="mt-4 rounded-xl bg-surface-container-low p-3 text-sm text-on-surface-variant">
                    {interview.details}
                  </p>
                )}
                {((role === "JOB_SEEKER" &&
                  interview.status === "PENDING_JOBSEEKER") ||
                  (role === "EMPLOYER" &&
                    interview.status === "PENDING_EMPLOYER")) && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        updateInterview(interview.id, "ACCEPT", interview)
                      }
                      className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateInterview(interview.id, "REJECT", interview)
                      }
                      className="rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700"
                    >
                      Reject
                    </button>
                    {role === "JOB_SEEKER" && (
                      <button
                        type="button"
                        onClick={() => {
                          setCounterInterviewId(
                            counterInterviewId === interview.id
                              ? null
                              : interview.id,
                          );
                          setCounterForm({
                            proposedAt: toInputDate(interview.proposedAt),
                            mode: interview.mode,
                            details: interview.details,
                          });
                        }}
                        className="rounded-xl border border-outline-variant px-4 py-2.5 text-sm font-semibold text-on-surface"
                      >
                        {counterInterviewId === interview.id
                          ? "Close form"
                          : "Suggest another time"}
                      </button>
                    )}
                  </div>
                )}
                {role === "JOB_SEEKER" &&
                  interview.status === "PENDING_JOBSEEKER" &&
                  counterInterviewId === interview.id && (
                    <form
                      onSubmit={(event) =>
                        submitCounterProposal(event, interview.id)
                      }
                      className="mt-5 space-y-4 rounded-2xl border border-secondary-container bg-surface-container-low p-4"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-on-surface">
                          Suggest a more suitable time
                        </h3>
                        <p className="mt-1 text-sm text-on-surface-variant">
                          The employer will see your suggestion as pending until
                          they respond.
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-on-surface">
                          New time
                          <input
                            required
                            type="datetime-local"
                            value={counterForm.proposedAt}
                            onChange={(event) =>
                              setCounterForm({
                                ...counterForm,
                                proposedAt: event.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5"
                          />
                        </label>
                      </div>
                      <label className="block text-sm font-medium text-on-surface">
                        Additional highlights
                        <textarea
                          value={counterForm.details}
                          onChange={(event) =>
                            setCounterForm({
                              ...counterForm,
                              details: event.target.value,
                            })
                          }
                          rows={4}
                          placeholder="Share your availability, preferred format, or anything the employer should know"
                          className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5"
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
                      >
                        {isSaving ? "Sending..." : "Send new time"}
                      </button>
                    </form>
                  )}
              </article>
            ))}
          </div>
        )}

        {role === "EMPLOYER" && (
          <Link
            href="/employer/applicants"
            className="mt-6 inline-flex text-sm font-semibold text-secondary hover:underline"
          >
            Back to applicants
          </Link>
        )}
      </div>
    </main>
  );
}
