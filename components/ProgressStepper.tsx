"use client";

import { Check } from "lucide-react";
import type { StepDefinition, StepKey } from "@/types/activity";
import { cn } from "@/lib/utils";

type ProgressStepperProps = {
  steps: StepDefinition[];
  currentStep: StepKey;
  onStepClick: (step: StepKey) => void;
};

export function ProgressStepper({
  steps,
  currentStep,
  onStepClick
}: ProgressStepperProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <nav
      aria-label="Activity progress"
      className="no-print rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-2 backdrop-blur"
    >
      <ol className="grid gap-2 md:grid-cols-3 xl:grid-cols-9">
        {steps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isComplete = index < currentIndex;

          return (
            <li key={step.key}>
              <button
                type="button"
                onClick={() => onStepClick(step.key)}
                title={step.label}
                className={cn(
                  "group flex h-full w-full items-center gap-2 rounded-2xl border px-3 py-2 text-left text-sm transition",
                  isActive &&
                    "border-un-line bg-white text-navy-900 shadow-lg shadow-navy-900/15 ring-2 ring-un-line/50",
                  !isActive &&
                    isComplete &&
                    "border-white/25 bg-white/[0.18] text-white hover:border-un-line hover:bg-white/25",
                  !isActive &&
                    !isComplete &&
                    "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/25 hover:bg-white/[0.08]"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition group-hover:scale-105",
                    isActive && "border-un-blue bg-un-blue text-white shadow-sm",
                    isComplete && !isActive && "border-un-line bg-white text-un-blue",
                    !isActive &&
                      !isComplete &&
                      "border-white/20 bg-white/[0.06] text-white/70"
                  )}
                >
                  {isComplete ? <Check aria-hidden size={14} /> : index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-bold">{step.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
