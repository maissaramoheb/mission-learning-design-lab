"use client";

import type { ActivityData } from "@/types/activity";
import { Badge, FieldShell, OptionToggle, TextArea } from "@/components/FormElements";
import { toggleInArray } from "@/lib/utils";

type TargetsPhaseProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const enablerOptions = [
  "supervisor support",
  "opportunity to apply",
  "clear SOPs",
  "mission leadership support",
  "available reporting tools"
];

const barrierOptions = [
  "lack of opportunity",
  "no supervisor reinforcement",
  "unclear mission procedures",
  "lack of time/resources",
  "security restrictions",
  "mismatch between training and field reality"
];

export function TargetsPhase({ data, updateData }: TargetsPhaseProps) {
  const updateTargets = (patch: Partial<ActivityData["targets"]>) => {
    updateData({
      targets: {
        ...data.targets,
        ...patch
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#1c1820] p-6 text-white shadow-[0_24px_70px_rgba(2,10,22,0.28)]">
        <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_14%_18%,rgba(210,166,90,.18),transparent_28%),linear-gradient(rgba(210,166,90,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
        <div className="relative">
          <Badge>Compare Against Target</Badge>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Phase 4 — Targets, Barriers, and Enablers
              </h2>
              <p className="mt-3 max-w-4xl text-lg leading-8 text-white/80">
                Targets should be declared before data is collected. That makes
                the later interpretation of gaps more disciplined and credible.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d2a65a]/45 bg-[#2a2115]/[0.88] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0ce8e]">
                Target vs Actual
              </p>
              <p className="mt-2 max-w-xs text-base font-semibold leading-7 text-white/80">
                Targets must be defined before collecting Level 3 data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 rounded-[1.75rem] border border-[#d2a65a]/40 bg-[#2a2115] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)] lg:grid-cols-3">
        <FieldShell
          label="1. Target score"
          helper="Define the headline success threshold."
          tone="tactical"
        >
          <TextArea
            value={data.targets.targetScore}
            onChange={(targetScore) => updateTargets({ targetScore })}
          />
        </FieldShell>
        <FieldShell
          label="2. Application confidence target"
          helper="Set the confidence benchmark before evidence review."
          tone="tactical"
        >
          <TextArea
            value={data.targets.confidenceTarget}
            onChange={(confidenceTarget) => updateTargets({ confidenceTarget })}
          />
        </FieldShell>
        <FieldShell
          label="3. Transfer target"
          helper="Specify the peer-sharing or wider-transfer expectation."
          tone="tactical"
        >
          <TextArea
            value={data.targets.transferTarget}
            onChange={(transferTarget) => updateTargets({ transferTarget })}
          />
        </FieldShell>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
          <h3 className="text-xl font-bold">
            4. Expected enablers
          </h3>
          <div className="mt-4 grid gap-3">
            {enablerOptions.map((option) => (
              <OptionToggle
                key={option}
                label={option}
                tone="tactical"
                selected={data.targets.enablers.includes(option)}
                onClick={() =>
                  updateTargets({
                    enablers: toggleInArray(data.targets.enablers, option)
                  })
                }
              />
            ))}
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#2a2115] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
          <h3 className="text-xl font-bold">
            5. Expected barriers
          </h3>
          <div className="mt-4 grid gap-3">
            {barrierOptions.map((option) => (
              <OptionToggle
                key={option}
                label={option}
                tone="tactical"
                selected={data.targets.barriers.includes(option)}
                onClick={() =>
                  updateTargets({
                    barriers: toggleInArray(data.targets.barriers, option)
                  })
                }
              />
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#2a2115] p-5 shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
        <FieldShell
          label="6. What will be done if target is not met?"
          helper="Name the corrective action before the brief is finalized."
          tone="tactical"
        >
          <TextArea
            rows={4}
            value={data.targets.followUpAction}
            onChange={(followUpAction) => updateTargets({ followUpAction })}
            placeholder="Example: refresher training, coaching, revised job aid, supervisor briefing, better alignment with SOPs."
          />
        </FieldShell>
      </section>
    </div>
  );
}
