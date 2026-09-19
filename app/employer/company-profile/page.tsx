"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/features/toast/toastSlice";

interface CompanyProfileForm {
  industry: string;
  website: string;
  headquarters: string;
  companySize: string;
  overview: string;
  history: string;
  mission: string;
  targetCustomers: string;
}

const emptyForm: CompanyProfileForm = {
  industry: "",
  website: "",
  headquarters: "",
  companySize: "",
  overview: "",
  history: "",
  mission: "",
  targetCustomers: "",
};

export default function CompanyProfilePage() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/company-profile");
        if (!response.ok)
          throw new Error("Unable to load your company profile.");
        const profile = await response.json();
        setForm({ ...emptyForm, ...profile });
      } catch (error) {
        dispatch(
          showToast({
            message:
              error instanceof Error
                ? error.message
                : "Unable to load your company profile.",
            variant: "error",
          }),
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [dispatch]);

  const updateField = (field: keyof CompanyProfileForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/company-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || "Unable to save your company profile.",
        );
      }

      dispatch(
        showToast({
          message: "Company profile updated successfully.",
          variant: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showToast({
          message:
            error instanceof Error
              ? error.message
              : "Unable to save your company profile.",
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
        <div className="mx-auto max-w-4xl text-sm text-on-surface-variant">
          Loading company profile...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            Employer profile
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            Company profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
            Give candidates a clear picture of what your company does, who it
            serves, and what it stands for.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-8 rounded-3xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm md:p-8"
        >
          <section>
            <h2 className="text-lg font-semibold text-on-surface">
              Company details
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field
                label="Industry"
                value={form.industry}
                onChange={(value) => updateField("industry", value)}
              />
              <Field
                label="Company size"
                placeholder="e.g. 11-50 employees"
                value={form.companySize}
                onChange={(value) => updateField("companySize", value)}
              />
              <Field
                label="Website"
                type="url"
                placeholder="https://example.com"
                value={form.website}
                onChange={(value) => updateField("website", value)}
              />
              <Field
                label="Headquarters"
                placeholder="City, country"
                value={form.headquarters}
                onChange={(value) => updateField("headquarters", value)}
              />
            </div>
          </section>

          <section className="space-y-5 border-t border-outline-variant pt-6">
            <h2 className="text-lg font-semibold text-on-surface">
              Your company story
            </h2>
            <TextArea
              label="Company overview"
              hint="A concise summary candidates can quickly understand."
              value={form.overview}
              onChange={(value) => updateField("overview", value)}
            />
            <TextArea
              label="History"
              hint="Share how the company started and the milestones that shaped it."
              value={form.history}
              onChange={(value) => updateField("history", value)}
            />
            <TextArea
              label="Mission and values"
              hint="Describe the principles that guide your work and culture."
              value={form.mission}
              onChange={(value) => updateField("mission", value)}
            />
            <TextArea
              label="Target customers"
              hint="Explain who uses your products or services and the problems you solve for them."
              value={form.targetCustomers}
              onChange={(value) => updateField("targetCustomers", value)}
            />
          </section>

          <div className="flex justify-end border-t border-outline-variant pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-on-secondary shadow-sm transition-colors hover:bg-secondary-container hover:text-on-secondary-container disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save company profile"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-on-surface">
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}

function TextArea({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-on-surface">
      {label}
      <span className="mt-1 block text-xs font-normal text-on-surface-variant">
        {hint}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        className="mt-2 w-full resize-y rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm leading-relaxed text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}
