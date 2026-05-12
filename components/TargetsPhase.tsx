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
      <div>
        <Badge>Targets / Transfer</Badge>
        <h2 className="mt-3 text-3xl font-bold text-navy-900">
          Phase 4 — Targets, Barriers, and Enablers
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
          Level 3 data should be compared against pre-determined targets. The
          target explains what “successful transfer” looks like.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-3">
        <FieldShell label="1. Target score">
          <TextArea
            value={data.targets.targetScore}
            onChange={(targetScore) => updateTargets({ targetScore })}
          />
        </FieldShell>
        <FieldShell label="2. Application confidence target">
          <TextArea
            value={data.targets.confidenceTarget}
            onChange={(confidenceTarget) => updateTargets({ confidenceTarget })}
          />
        </FieldShell>
        <FieldShell label="3. Transfer target">
          <TextArea
            value={data.targets.transferTarget}
            onChange={(transferTarget) => updateTargets({ transferTarget })}
          />
        </FieldShell>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-un-line bg-un-light p-5 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900">
            4. Expected enablers
          </h3>
          <div className="mt-4 grid gap-3">
            {enablerOptions.map((option) => (
              <OptionToggle
                key={option}
                label={option}
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

        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900">
            5. Expected barriers
          </h3>
          <div className="mt-4 grid gap-3">
            {barrierOptions.map((option) => (
              <OptionToggle
                key={option}
                label={option}
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

      <FieldShell label="6. What will be done if target is not met?">
        <TextArea
          rows={4}
          value={data.targets.followUpAction}
          onChange={(followUpAction) => updateTargets({ followUpAction })}
          placeholder="Example: refresher training, coaching, revised job aid, supervisor briefing, better alignment with SOPs."
        />
      </FieldShell>
    </div>
  );
}
