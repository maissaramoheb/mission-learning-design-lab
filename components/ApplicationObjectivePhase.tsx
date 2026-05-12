"use client";

import { ArrowRight, Target } from "lucide-react";
import type { ActivityData } from "@/types/activity";
import { Badge, FieldShell, TextArea, TextInput } from "@/components/FormElements";

type ApplicationObjectivePhaseProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

export function ApplicationObjectivePhase({
  data,
  updateData
}: ApplicationObjectivePhaseProps) {
  const updateApplication = (patch: Partial<ActivityData["application"]>) => {
    updateData({
      application: {
        ...data.application,
        ...patch
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-6 text-white shadow-[0_24px_70px_rgba(2,10,22,0.28)]">
        <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_18%,rgba(93,167,242,.22),transparent_30%),linear-gradient(rgba(116,145,172,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
        <div className="relative">
          <Badge>Convert Objective</Badge>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Phase 1 — From Learning Objective to Application Objective
              </h2>
              <p className="mt-3 max-w-4xl text-lg leading-8 text-white/80">
                A learning objective states what trainees can do by the end of
                training. An application objective states what they must
                demonstrably do in mission duties after training.
              </p>
            </div>
            <div className="rounded-2xl border border-[#7fb8ef]/35 bg-[#123352]/[0.82] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
                Field Behaviour
              </p>
              <p className="mt-2 max-w-xs text-sm font-semibold leading-6 text-white/[0.78]">
                Describe what participants should actually do on the job after
                training.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <article className="rounded-2xl border border-[#5d7896]/45 bg-[#10263d] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.22)]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
            Classroom Intent
          </p>
          <h3 className="mt-2 text-xl font-bold">Learning Objective</h3>
          <p className="mt-3 text-lg leading-8 text-white/[0.78]">
            By the end of the session, participants will identify protection
            threats and explain appropriate UNPOL response options.
          </p>
        </article>
        <div className="hidden items-center text-un-blue lg:flex">
          <ArrowRight size={30} aria-hidden />
        </div>
        <article className="rounded-2xl border border-[#7fb8ef]/45 bg-[#123352] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.22)]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
            Mission Transfer
          </p>
          <h3 className="mt-2 text-xl font-bold">
            Application Objective
          </h3>
          <p className="mt-3 text-lg leading-8 text-white/[0.82]">
            Within three months of deployment, participants will apply
            appropriate UNPOL response options to protection threats, coordinate
            with relevant actors, and report protection concerns in accordance
            with mission procedures.
          </p>
        </article>
      </section>

      <section className="rounded-[1.75rem] border border-[#5d7896]/35 bg-[#081725]/[0.97] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
            Field Behaviour
          </p>
          <p className="mt-2 text-lg leading-8 text-white/[0.78]">
            Why this matters: Level 3 evidence starts with an application
            objective clear enough to observe later.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
        <FieldShell
          label="1. Original learning objective"
          helper="Anchor the evaluation in the training objective already taught."
          tone="tactical"
        >
          <TextArea
            value={data.application.originalLearningObjective}
            onChange={(originalLearningObjective) =>
              updateApplication({ originalLearningObjective })
            }
          />
        </FieldShell>
        <FieldShell
          label="2. Target workplace/context"
          helper="Define where application should be visible in mission duties."
          tone="tactical"
        >
          <TextInput
            value={data.application.workplaceContext}
            onChange={(workplaceContext) => updateApplication({ workplaceContext })}
            placeholder="Example: mission duties after deployment"
          />
        </FieldShell>
        <FieldShell
          label="3. Observable behaviour/task"
          helper="State the job behaviour that an evaluator could plausibly detect."
          tone="tactical"
        >
          <TextArea
            value={data.application.observableBehaviour}
            onChange={(observableBehaviour) =>
              updateApplication({ observableBehaviour })
            }
            placeholder="Example: apply POC response options, coordinate with actors, report concerns clearly."
          />
        </FieldShell>
        <FieldShell
          label="4. Timeframe for application"
          helper="Fix the evaluation window before collecting evidence."
          tone="tactical"
        >
          <TextInput
            value={data.application.timeframe}
            onChange={(timeframe) => updateApplication({ timeframe })}
            placeholder="Example: within three months of deployment"
          />
        </FieldShell>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[#7fb8ef]/45 bg-[#123352] p-6 text-white shadow-[0_24px_70px_rgba(2,10,22,0.24)]">
        <div className="flex items-center gap-3">
          <Target className="text-[#8ec2f4]" size={24} aria-hidden />
          <h3 className="text-2xl font-bold">
            5. Final Level 3 application objective
          </h3>
        </div>
        <div className="mt-4">
          <TextArea
            rows={4}
            value={data.application.applicationObjective}
            onChange={(applicationObjective) =>
              updateApplication({ applicationObjective })
            }
            placeholder="Within three months of deployment, participants will..."
          />
        </div>
        <ul className="mt-4 grid gap-3 text-base font-semibold text-white/[0.82] md:grid-cols-2">
          <li>Identifies observable behaviour.</li>
          <li>Is outcome-based and specific.</li>
          <li>Describes what should change on the job.</li>
          <li>Includes a timeframe where possible.</li>
        </ul>
      </section>
    </div>
  );
}
