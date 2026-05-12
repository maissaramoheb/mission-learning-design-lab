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
      <div>
        <Badge>Application Objective</Badge>
        <h2 className="mt-3 text-3xl font-bold text-navy-900">
          Phase 1 — From Learning Objective to Application Objective
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
          A learning objective focuses on what participants can do by the end of
          training. An application objective focuses on what participants will
          actually do on the job after training.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <article className="rounded-2xl border border-field-border bg-field-mist p-5 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900">Learning Objective</h3>
          <p className="mt-3 text-lg leading-8 text-slate-700">
            By the end of the session, participants will identify protection
            threats and explain appropriate UNPOL response options.
          </p>
        </article>
        <div className="hidden items-center text-un-blue lg:flex">
          <ArrowRight size={30} aria-hidden />
        </div>
        <article className="rounded-2xl border border-un-line bg-un-light p-5 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900">
            Application Objective
          </h3>
          <p className="mt-3 text-lg leading-8 text-slate-700">
            Within three months of deployment, participants will apply
            appropriate UNPOL response options to protection threats, coordinate
            with relevant actors, and report protection concerns in accordance
            with mission procedures.
          </p>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <FieldShell label="1. Original learning objective">
          <TextArea
            value={data.application.originalLearningObjective}
            onChange={(originalLearningObjective) =>
              updateApplication({ originalLearningObjective })
            }
          />
        </FieldShell>
        <FieldShell label="2. Target workplace/context">
          <TextInput
            value={data.application.workplaceContext}
            onChange={(workplaceContext) => updateApplication({ workplaceContext })}
            placeholder="Example: mission duties after deployment"
          />
        </FieldShell>
        <FieldShell label="3. Observable behaviour/task">
          <TextArea
            value={data.application.observableBehaviour}
            onChange={(observableBehaviour) =>
              updateApplication({ observableBehaviour })
            }
            placeholder="Example: apply POC response options, coordinate with actors, report concerns clearly."
          />
        </FieldShell>
        <FieldShell label="4. Timeframe for application">
          <TextInput
            value={data.application.timeframe}
            onChange={(timeframe) => updateApplication({ timeframe })}
            placeholder="Example: within three months of deployment"
          />
        </FieldShell>
      </section>

      <section className="rounded-2xl border border-un-line bg-un-light p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Target className="text-un-blue" size={24} aria-hidden />
          <h3 className="text-2xl font-bold text-navy-900">
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
        <ul className="mt-4 grid gap-3 text-base font-semibold text-slate-700 md:grid-cols-2">
          <li>Identifies observable behaviour.</li>
          <li>Is outcome-based and specific.</li>
          <li>Describes what should change on the job.</li>
          <li>Includes a timeframe where possible.</li>
        </ul>
      </section>
    </div>
  );
}
