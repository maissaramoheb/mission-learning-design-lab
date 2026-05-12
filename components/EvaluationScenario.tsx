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
      <article className="relative overflow-hidden rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-6 text-white shadow-[0_24px_70px_rgba(2,10,22,0.28)]">
        <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_18%_16%,rgba(93,167,242,.22),transparent_30%),linear-gradient(rgba(116,145,172,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
        <div className="relative">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="text-[#8ec2f4]" size={28} aria-hidden />
          <h2 className="text-3xl font-bold">
            Evaluation Mission Scenario
          </h2>
        </div>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
          Mission Brief
        </p>
        <p className="mt-5 text-lg leading-8 text-white/[0.82]">
          A group of newly deployed UN Police officers completed a training
          session on “Protection of Civilians by UN Police.”
        </p>
        <p className="mt-4 text-lg font-bold">
          During the training, they learned to:
        </p>
        <ul className="mt-3 space-y-3 text-lg leading-8 text-white/[0.78]">
          {learnedItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#8ec2f4]" />
              <span>{item};</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-lg leading-8 text-white/[0.82]">
          Three months later, the training unit wants to know whether
          participants applied this learning in their actual mission duties.
          Your group must design a Level 3 evaluation package.
        </p>
        </div>
      </article>

      <div className="space-y-5">
        <article className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#10263d] p-6 text-white shadow-[0_18px_48px_rgba(2,10,22,0.22)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
            Evaluation Design Orders
          </p>
          <h3 className="mt-2 text-2xl font-bold">Your task</h3>
          <ol className="mt-4 space-y-3 text-lg leading-8 text-white/80">
            {taskItems.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#7fb8ef]/35 bg-[#123352] font-bold text-[#d7ecff]">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#2a2115] p-6 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 text-[#f0ce8e]" size={24} aria-hidden />
            <div>
              <h3 className="text-xl font-bold">
                Important instruction
              </h3>
              <p className="mt-2 text-lg leading-8 text-white/[0.82]">
                This is not a course satisfaction form. This is a
                transfer-of-learning evaluation.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
          <FieldShell
            label="Evaluation focus"
            helper="In one sentence, what application evidence should the training unit look for?"
            tone="tactical"
          >
            <TextArea
              rows={3}
              value={data.scenarioTrainingGap}
              onChange={(scenarioTrainingGap) => updateData({ scenarioTrainingGap })}
              placeholder="Example: evidence that officers used POC response options, coordinated with relevant actors, and reported protection concerns clearly."
            />
          </FieldShell>
        </article>
      </div>
    </div>
  );
}
