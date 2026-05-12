"use client";

import { AlertTriangle, ClipboardCheck } from "lucide-react";
import type { ActivityData } from "@/types/activity";
import { FieldShell, TextArea } from "@/components/FormElements";

type EvaluationScenarioProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const learnedItems = [
  "identify protection threats",
  "explain their role within the mission POC framework",
  "apply appropriate response options within their mandate",
  "coordinate with relevant mission and humanitarian actors",
  "report protection concerns clearly"
];

const taskItems = [
  "Convert a learning objective into an application objective.",
  "Write survey questions that measure application.",
  "Identify what actions were implemented.",
  "Identify barriers and enablers.",
  "Suggest additional data collection methods.",
  "Define a target and decide how success will be judged."
];

export function EvaluationScenario({
  data,
  updateData
}: EvaluationScenarioProps) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="rounded-2xl border border-field-border bg-field-mist p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="text-un-blue" size={28} aria-hidden />
          <h2 className="text-3xl font-bold text-navy-900">
            Evaluation Mission Scenario
          </h2>
        </div>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A group of newly deployed UN Police officers completed a training
          session on “Protection of Civilians by UN Police.”
        </p>
        <p className="mt-4 text-lg font-bold text-navy-900">
          During the training, they learned to:
        </p>
        <ul className="mt-3 space-y-3 text-lg leading-8 text-slate-700">
          {learnedItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-un-blue" />
              <span>{item};</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Three months later, the training unit wants to know whether
          participants applied this learning in their actual mission duties.
          Your group must design a Level 3 evaluation package.
        </p>
      </article>

      <div className="space-y-5">
        <article className="rounded-2xl border border-un-line bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-navy-900">Your task</h3>
          <ol className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            {taskItems.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-un-light font-bold text-navy-800">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 text-amber-700" size={24} aria-hidden />
            <div>
              <h3 className="text-xl font-bold text-navy-900">
                Important instruction
              </h3>
              <p className="mt-2 text-lg leading-8 text-slate-700">
                This is not a course satisfaction form. This is a
                transfer-of-learning evaluation.
              </p>
            </div>
          </div>
        </article>

        <FieldShell
          label="Evaluation focus"
          helper="In one sentence, what application evidence should the training unit look for?"
        >
          <TextArea
            rows={3}
            value={data.scenarioTrainingGap}
            onChange={(scenarioTrainingGap) => updateData({ scenarioTrainingGap })}
            placeholder="Example: evidence that officers used POC response options, coordinated with relevant actors, and reported protection concerns clearly."
          />
        </FieldShell>
      </div>
    </div>
  );
}
