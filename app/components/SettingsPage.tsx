"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/features/toast/toastSlice";

interface SettingsPageProps {
  role: "employer" | "jobseeker";
}

interface SettingsForm {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  location: string;
  headline: string;
  summary: string;
}

const emptyForm: SettingsForm = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  phone: "",
  location: "",
  headline: "",
  summary: "",
};

export default function SettingsPage({ role }: SettingsPageProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isEmployer = role === "employer";
  const title = isEmployer ? "Employer settings" : "Account settings";
  const description = isEmployer
    ? "Keep your account and company details up to date."
    : "Manage the personal details shown on your job-seeker profile.";

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Unable to load your settings.");
        const user = await response.json();
        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          companyName: user.companyName || "",
          phone: user.profile?.phone || "",
          location: user.profile?.location || "",
          headline: user.profile?.headline || "",
          summary: user.profile?.summary || "",
        });
      } catch (error) {
        dispatch(
          showToast({
            message:
              error instanceof Error
                ? error.message
                : "Unable to load your settings.",
            variant: "error",
          }),
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, [dispatch]);

  const updateField = (field: keyof SettingsForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = isEmployer
        ? {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            companyName: form.companyName,
          }
        : {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            location: form.location,
            headline: form.headline,
            summary: form.summary,
          };

      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Unable to save your settings.",
        );
      }

      setShowConfirmation(false);
      dispatch(
        showToast({
          message: "Your settings were updated successfully.",
          variant: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showToast({
          message:
            error instanceof Error
              ? error.message
              : "Unable to save your settings.",
          variant: "error",
        }),
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface px-4 py-10 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-sm text-on-surface-variant">
          Loading settings...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            Preferences
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setShowConfirmation(true);
          }}
          className="space-y-6 rounded-3xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm md:p-8"
        >
          <section>
            <h2 className="text-lg font-semibold text-on-surface">
              Personal details
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field
                label="First name"
                value={form.firstName}
                onChange={(value) => updateField("firstName", value)}
              />
              <Field
                label="Last name"
                value={form.lastName}
                onChange={(value) => updateField("lastName", value)}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
              />
              {isEmployer ? (
                <Field
                  label="Company name"
                  value={form.companyName}
                  onChange={(value) => updateField("companyName", value)}
                />
              ) : (
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                />
              )}
            </div>
          </section>

          {!isEmployer && (
            <section className="border-t border-outline-variant pt-6">
              <h2 className="text-lg font-semibold text-on-surface">
                Job-seeker profile
              </h2>
              <div className="mt-4 space-y-4">
                <Field
                  label="Location"
                  value={form.location}
                  onChange={(value) => updateField("location", value)}
                />
                <Field
                  label="Professional headline"
                  value={form.headline}
                  onChange={(value) => updateField("headline", value)}
                />
                <label className="block text-sm font-medium text-on-surface">
                  Summary
                  <textarea
                    value={form.summary}
                    onChange={(event) =>
                      updateField("summary", event.target.value)
                    }
                    rows={5}
                    className="mt-2 w-full resize-y rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </label>
              </div>
            </section>
          )}

          <div className="flex justify-end border-t border-outline-variant pt-6">
            <button
              type="submit"
              className="rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-on-secondary shadow-sm transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/35 p-6 backdrop-blur-sm confirmation-dialog-enter">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-confirmation-title"
            className="w-full max-w-md rounded-3xl border border-white/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-secondary">
              <span className="material-symbols-outlined text-2xl">save</span>
            </div>
            <h2
              id="settings-confirmation-title"
              className="mt-5 text-xl font-bold text-slate-900"
            >
              Apply these changes?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Your updated details will be saved to your CareerPulse account.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                disabled={isSaving}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
              >
                Review again
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-on-secondary transition-colors hover:bg-secondary-container hover:text-on-secondary-container disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Confirm changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-on-surface">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}
