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
import type { AppMode, StepDefinition, StepKey } from "@/types/activity";
import { ProgressStepper } from "@/components/ProgressStepper";
import { PREPARED_BY } from "@/lib/constants";
import { getGroupIdentity } from "@/lib/groupIdentity";
import { getPhaseStyle } from "@/lib/phaseStyles";
import { cn } from "@/lib/utils";

type StepLayoutProps = {
  mode: AppMode;
  step: StepKey;
  steps: StepDefinition[];
  title: string;
  eyebrow?: string;
  description?: string;
  appTitle: string;
  mainTagline: string;
  commandLabel: string;
  saveStatus: "loading" | "saving" | "saved";
  progressPercent: number;
  groupName: string;
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
  mode,
  step,
  steps,
  title,
  eyebrow,
  description,
  appTitle,
  mainTagline,
  commandLabel,
  saveStatus,
  progressPercent,
  groupName,
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
  const groupIdentity = getGroupIdentity(groupName);
  const phase = getPhaseStyle(step, mode);
  const isEvaluation = mode === "evaluation";

  return (
    <div className={cn("relative min-h-screen overflow-hidden", isEvaluation && "evaluation-mode")}>
      <div
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(75,146,219,0.22),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(8,31,59,0.10),transparent_30%),linear-gradient(rgba(75,146,219,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(75,146,219,0.08)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px,42px_42px]",
          isEvaluation &&
            "bg-[#06111e] bg-[radial-gradient(circle_at_14%_10%,rgba(93,167,242,.22),transparent_28%),radial-gradient(circle_at_84%_6%,rgba(210,166,90,.10),transparent_24%),linear-gradient(rgba(116,145,172,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.09)_1px,transparent_1px)]"
        )}
      />

      <header
        className={cn(
          "no-print border-b border-white/20 bg-navy-900 text-white shadow-[0_18px_60px_rgba(8,31,59,0.18)]",
          isEvaluation &&
            "border-[#5d7896]/35 bg-[#050f1a] shadow-[0_22px_70px_rgba(1,8,18,0.42)]"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:px-8">
          {isEvaluation ? (
            <div className="grid gap-3 xl:grid-cols-[1.15fr_0.85fr] xl:items-stretch">
              <section className="relative overflow-hidden rounded-[1.5rem] border border-[#5d7896]/45 bg-[#081725]/[0.94] p-4 shadow-[0_18px_54px_rgba(0,0,0,0.24)]">
                <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(116,145,172,.11)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:30px_30px]" />
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: phase.color }}
                />
                <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
                      <Shield size={16} aria-hidden />
                      Mode: Level 3 Evaluation
                    </div>
                    <h1 className="mt-2 text-3xl font-bold md:text-4xl">{appTitle}</h1>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
                        {phase.label}
                      </span>
                      {eyebrow ? (
                        <span className="rounded-full border border-[#d2a65a]/35 bg-[#d2a65a]/[0.12] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f0ce8e]">
                          {eyebrow}
                        </span>
                      ) : null}
                    </div>
                    {description ? (
                      <p className="mt-3 max-w-4xl text-base leading-7 text-white/[0.78]">
                        {description}
                      </p>
                    ) : null}
                  </div>
                  <div className="min-w-[160px] rounded-2xl border border-[#7fb8ef]/30 bg-[#10263d]/85 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
                      Current Phase
                    </p>
                    <p className="mt-2 text-lg font-bold leading-7 text-white">{title}</p>
                  </div>
                </div>
              </section>

              <section className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-[#5d7896]/45 bg-[#081725]/[0.94] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
                    Progress
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white">{progressPercent}%</p>
                  <p className="mt-2 text-sm font-semibold text-white/[0.68]">
                    Output: Application Evidence Package
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-[#5d7896]/45 bg-[#081725]/[0.94] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
                    Status
                  </p>
                  <p className="mt-2 text-base font-bold text-white">{saveLabel}</p>
                  <p className="mt-2 text-sm font-semibold text-white/[0.68]">
                    Saved locally on this device
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-[#5d7896]/45 bg-[#081725]/[0.94] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
                    Workspace
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]",
                        groupIdentity?.tone ??
                          "border-white/15 bg-white/[0.08] text-white/75"
                      )}
                    >
                      {groupIdentity?.label ?? "Group workspace"}
                    </span>
                    {groupName.trim() ? (
                      <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-bold text-white/75">
                        {groupName}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="rounded-[1.35rem] border border-[#5d7896]/45 bg-[#081725]/[0.94] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
                    Prepared By
                  </p>
                  <p className="mt-2 text-base font-bold leading-7 text-white">
                    Lt. Col. / Maissara Selim
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/[0.68]">
                    Evaluation Design Operations Lab
                  </p>
                </div>
              </section>
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr] xl:items-stretch">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.07] p-4 backdrop-blur">
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: phase.color }}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-un-line">
                    <Shield size={18} aria-hidden />
                    {appTitle}
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/[0.09] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                    {phase.label}
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase text-un-line">
                      {eyebrow ?? "Current phase"}
                    </p>
                    <h1 className="mt-1 text-3xl font-bold md:text-4xl">{title}</h1>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2.5">
                    <p className="text-xs font-bold uppercase text-un-line">Progress</p>
                    <p className="text-2xl font-bold">{progressPercent}%</p>
                  </div>
                </div>
                {description ? (
                  <p className="mt-3 max-w-4xl text-base leading-7 text-white/80">
                    {description}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/15 bg-white/[0.09] p-4 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <Signal className="text-un-line" size={20} aria-hidden />
                    <div>
                      <p className="text-xs font-bold uppercase text-un-line">
                        Command centre
                      </p>
                      <p className="text-base font-bold">{commandLabel}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/75">{mainTagline}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/15 bg-white/[0.09] p-4 backdrop-blur">
                  <div className="flex items-start gap-3">
                    {saveStatus === "saving" ? (
                      <Database className="mt-1 text-un-line" size={20} aria-hidden />
                    ) : (
                      <CheckCircle2 className="mt-1 text-un-line" size={20} aria-hidden />
                    )}
                    <div>
                      <p className="text-sm font-bold text-white">{saveLabel}</p>
                      <p className="mt-1 text-sm leading-6 text-white/70">{PREPARED_BY}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]",
                            groupIdentity?.tone ??
                              "border-white/15 bg-white/[0.08] text-white/75"
                          )}
                        >
                          {groupIdentity?.label ?? "Group workspace"}
                        </span>
                        {groupName.trim() ? (
                          <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-bold text-white/75">
                            {groupName}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ProgressStepper
            mode={mode}
            steps={steps}
            currentStep={step}
            onStepClick={onStepClick}
          />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
        <motion.section
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/[0.92] p-5 shadow-command backdrop-blur md:p-8",
            isEvaluation &&
              "border-[#5d7896]/35 bg-[#f7fbff]/[0.96] shadow-[0_28px_82px_rgba(2,10,22,0.24)]"
          )}
        >
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: phase.color }}
          />
          {children}
        </motion.section>
      </main>

      <footer className="no-print mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          type="button"
          onClick={onOpenGuide}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl border border-field-border bg-white/90 px-4 py-3 font-semibold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:text-navy-900 hover:shadow-md",
            isEvaluation &&
              "border-[#5d7896]/55 bg-[#081725] text-white hover:border-[#8ec2f4] hover:bg-[#10263d] hover:text-white"
          )}
        >
          <FileText size={18} aria-hidden />
          Facilitator Guide
        </button>
        <p className={cn("text-sm font-semibold text-slate-600", isEvaluation && "text-white/[0.78]")}>
          {isEvaluation
            ? "Evaluation Design Operations Lab | Prepared by Lt. Col. / Maissara Selim"
            : PREPARED_BY}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl border border-field-border bg-white px-5 py-3 font-semibold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0",
            isEvaluation &&
                "border-[#5d7896]/55 bg-[#081725] text-white hover:border-[#8ec2f4] hover:bg-[#10263d] disabled:text-white/[0.72] disabled:opacity-60"
            )}
          >
            <ArrowLeft size={18} aria-hidden />
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3 font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0",
            isEvaluation &&
                "bg-[#123352] shadow-[0_16px_36px_rgba(2,10,22,0.32)] hover:bg-[#19446b] disabled:bg-[#10263d] disabled:text-white/[0.72] disabled:opacity-60"
            )}
          >
            {nextLabel}
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </footer>
    </div>
  );
}
