"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  Shield,
  Signal
} from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { StepDefinition, StepKey } from "@/types/activity";
import { ProgressStepper } from "@/components/ProgressStepper";
import { APP_TITLE, MAIN_TAGLINE, PREPARED_BY } from "@/lib/constants";

type StepLayoutProps = {
  step: StepKey;
  steps: StepDefinition[];
  title: string;
  eyebrow?: string;
  description?: string;
  saveStatus: "loading" | "saving" | "saved";
  progressPercent: number;
  children: ReactNode;
  canGoBack: boolean;
  canGoNext: boolean;
  nextLabel?: string;
  onBack: () => void;
  onNext: () => void;
  onStepClick: (step: StepKey) => void;
  onOpenGuide: () => void;
};

export function StepLayout({
  step,
  steps,
  title,
  eyebrow,
  description,
  saveStatus,
  progressPercent,
  children,
  canGoBack,
  canGoNext,
  nextLabel = "Continue",
  onBack,
  onNext,
  onStepClick,
  onOpenGuide
}: StepLayoutProps) {
  const saveLabel =
    saveStatus === "saving" ? "Saving..." : "Saved locally on this device";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(75,146,219,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(75,146,219,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <header className="no-print border-b border-white/20 bg-navy-900 text-white shadow-[0_18px_60px_rgba(8,31,59,0.18)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr] xl:items-stretch">
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur">
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-un-line">
                <Shield size={18} aria-hidden />
                {APP_TITLE}
              </div>
              <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase text-un-line">
                    {eyebrow ?? "Current phase"}
                  </p>
                  <h1 className="mt-1 text-3xl font-bold md:text-5xl">{title}</h1>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3">
                  <p className="text-xs font-bold uppercase text-un-line">Progress</p>
                  <p className="text-3xl font-bold">{progressPercent}%</p>
                </div>
              </div>
              {description ? (
                <p className="mt-4 max-w-4xl text-lg leading-8 text-white/80">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-3xl border border-white/15 bg-white/[0.09] p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <Signal className="text-un-line" size={22} aria-hidden />
                  <div>
                    <p className="text-xs font-bold uppercase text-un-line">
                      Command centre
                    </p>
                    <p className="text-lg font-bold">UN Mission Training Operations Room</p>
                  </div>
                </div>
                <p className="mt-4 text-base leading-7 text-white/75">{MAIN_TAGLINE}</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/[0.09] p-5 backdrop-blur">
                <div className="flex items-start gap-3">
                  {saveStatus === "saving" ? (
                    <Database className="mt-1 text-un-line" size={22} aria-hidden />
                  ) : (
                    <CheckCircle2 className="mt-1 text-un-line" size={22} aria-hidden />
                  )}
                  <div>
                    <p className="text-sm font-bold text-white">{saveLabel}</p>
                    <p className="mt-1 text-sm leading-6 text-white/70">{PREPARED_BY}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProgressStepper steps={steps} currentStep={step} onStepClick={onStepClick} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <motion.section
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="rounded-[1.75rem] border border-white/70 bg-white/[0.92] p-5 shadow-command backdrop-blur md:p-8"
        >
          {children}
        </motion.section>
      </main>

      <footer className="no-print mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-field-border bg-white/90 px-4 py-3 font-semibold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:text-navy-900 hover:shadow-md"
        >
          <FileText size={18} aria-hidden />
          Facilitator Guide
        </button>
        <p className="text-sm font-semibold text-slate-600">{PREPARED_BY}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-field-border bg-white px-5 py-3 font-semibold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          >
            <ArrowLeft size={18} aria-hidden />
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3 font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          >
            {nextLabel}
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </footer>
    </div>
  );
}
