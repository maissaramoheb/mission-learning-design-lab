"use client";

import { AlertTriangle, MapPinned } from "lucide-react";
import type { ActivityData } from "@/types/activity";
import { FieldShell, TextArea } from "@/components/FormElements";

type MissionScenarioProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const reports = [
  "harassment at an informal checkpoint",
  "suspicious objects near a market route",
  "community mistrust toward local police",
  "poor reporting from patrol teams",
  "tension between host community and displaced families"
];

const trainingOutcomes = [
  "Identify immediate safety indicators.",
  "Demonstrate respectful questioning of a civilian witness.",
  "Propose a community-sensitive response that reduces risk and builds trust."
];

export function MissionScenario({ data, updateData }: MissionScenarioProps) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="rounded-2xl border border-field-border bg-field-mist p-6">
        <div className="flex items-center gap-3">
          <MapPinned className="text-un-blue" size={28} aria-hidden />
          <h2 className="text-3xl font-bold text-navy-900">
            Scenario: Patrol Near an IDP Settlement
          </h2>
        </div>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A UN Police patrol team is deployed near an IDP settlement. Recently,
          there have been reports of:
        </p>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          {reports.map((report) => (
            <li key={report} className="flex gap-3">
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-un-blue" />
              <span>{report};</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Your group is tasked to design a 15-minute mini-training response for
          newly deployed UN Police officers.
        </p>
      </article>

      <div className="space-y-5">
        <article className="rounded-2xl border border-un-line bg-white p-6">
          <h3 className="text-2xl font-bold text-navy-900">
            The mini-training must help them:
          </h3>
          <ol className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            {trainingOutcomes.map((outcome, index) => (
              <li key={outcome} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-un-light font-bold text-navy-800">
                  {index + 1}
                </span>
                <span>{outcome}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 text-amber-700" size={24} aria-hidden />
            <div>
              <h3 className="text-xl font-bold text-navy-900">Important instruction</h3>
              <p className="mt-2 text-lg leading-8 text-slate-700">
                This is a training-design exercise, not only a tactical
                problem-solving exercise. Your main task is to design how you
                would train newly deployed officers to respond.
              </p>
            </div>
          </div>
        </article>

        <FieldShell label="Reflection" helper="In one sentence, what is the main training gap in this scenario?">
          <TextArea
            rows={3}
            value={data.trainingGap}
            onChange={(trainingGap) => updateData({ trainingGap })}
            placeholder="Example: Officers may recognize the incident but lack a consistent approach to safe engagement, reporting, and community trust."
          />
        </FieldShell>
      </div>
    </div>
  );
}
