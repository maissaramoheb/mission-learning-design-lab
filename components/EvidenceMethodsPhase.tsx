"use client";

import type { ActivityData, EvidenceMethodDetail } from "@/types/activity";
import { Badge, FieldShell, OptionToggle, TextArea, TextInput } from "@/components/FormElements";
import { toggleInArray } from "@/lib/utils";

type EvidenceMethodsPhaseProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const methods = [
  "supervisor feedback",
  "360 evaluation",
  "focus group",
  "action-plan follow-up",
  "observation checklist",
  "work sample review",
  "patrol report review",
  "interview with direct supervisor",
  "peer feedback",
  "after-action review"
];

const emptyDetail: EvidenceMethodDetail = {
  evidenceCollected: "",
  evidenceProvider: "",
  collectionTiming: "",
  questionAsked: ""
};

export function EvidenceMethodsPhase({
  data,
  updateData
}: EvidenceMethodsPhaseProps) {
  const updateEvidence = (patch: Partial<ActivityData["evidence"]>) => {
    updateData({
      evidence: {
        ...data.evidence,
        ...patch
      }
    });
  };

  const updateMethodDetail = (
    method: string,
    patch: Partial<EvidenceMethodDetail>
  ) => {
    updateEvidence({
      methodDetails: {
        ...data.evidence.methodDetails,
        [method]: {
          ...emptyDetail,
          ...data.evidence.methodDetails[method],
          ...patch
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-6 text-white shadow-[0_24px_70px_rgba(2,10,22,0.28)]">
        <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_14%_18%,rgba(131,148,166,.22),transparent_30%),linear-gradient(rgba(116,145,172,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
        <div className="relative">
          <Badge>Collect Evidence</Badge>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Phase 3 — Beyond the Survey: Additional Evidence
              </h2>
              <p className="mt-3 max-w-4xl text-lg leading-8 text-white/80">
                Level 3 gains credibility when survey results are supported by
                supervisory, peer, document, or observed evidence.
              </p>
            </div>
            <div className="rounded-2xl border border-[#7fb8ef]/35 bg-[#123352]/[0.82] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
                Evidence Board
              </p>
              <p className="mt-2 max-w-xs text-base font-semibold leading-7 text-white/[0.82]">
                Choose evidence strong enough to confirm transfer beyond
                participant self-report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#10263d] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.22)]">
        <h3 className="text-2xl font-bold">
          Select suitable evidence methods
        </h3>
        <p className="mt-2 max-w-4xl text-lg leading-8 text-white/[0.74]">
          Why this matters: a robust Level 3 package triangulates application
          evidence instead of relying on one instrument.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((method) => (
            <OptionToggle
              key={method}
              label={method}
              tone="tactical"
              selected={data.evidence.selectedMethods.includes(method)}
              onClick={() =>
                updateEvidence({
                  selectedMethods: toggleInArray(
                    data.evidence.selectedMethods,
                    method
                  )
                })
              }
            />
          ))}
        </div>
      </section>

      {data.evidence.selectedMethods.length > 0 ? (
        <section className="grid gap-5">
          {data.evidence.selectedMethods.map((method) => {
            const detail = {
              ...emptyDetail,
              ...data.evidence.methodDetails[method]
            };
            return (
              <article
                key={method}
                className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)]"
              >
                <h3 className="text-xl font-bold capitalize">
                  {method}
                </h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <FieldShell
                    label="What evidence would this method collect?"
                    helper="Name the decision-useful proof this method adds."
                    tone="tactical"
                  >
                    <TextArea
                      value={detail.evidenceCollected}
                      onChange={(evidenceCollected) =>
                        updateMethodDetail(method, { evidenceCollected })
                      }
                    />
                  </FieldShell>
                  <FieldShell
                    label="Who would provide the evidence?"
                    helper="Identify the source before designing the collection step."
                    tone="tactical"
                  >
                    <TextInput
                      value={detail.evidenceProvider}
                      onChange={(evidenceProvider) =>
                        updateMethodDetail(method, { evidenceProvider })
                      }
                    />
                  </FieldShell>
                  <FieldShell
                    label="When would it be collected?"
                    helper="Align timing with the Level 3 review window."
                    tone="tactical"
                  >
                    <TextInput
                      value={detail.collectionTiming}
                      onChange={(collectionTiming) =>
                        updateMethodDetail(method, { collectionTiming })
                      }
                    />
                  </FieldShell>
                  <FieldShell
                    label="What question would be asked?"
                    helper="Keep the question tightly linked to workplace behaviour."
                    tone="tactical"
                  >
                    <TextArea
                      value={detail.questionAsked}
                      onChange={(questionAsked) =>
                        updateMethodDetail(method, { questionAsked })
                      }
                    />
                  </FieldShell>
                </div>
              </article>
            );
          })}
        </section>
      ) : null}
    </div>
  );
}
