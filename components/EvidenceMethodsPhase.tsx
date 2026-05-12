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
      <div>
        <Badge>Evidence Methods</Badge>
        <h2 className="mt-3 text-3xl font-bold text-navy-900">
          Phase 3 — Beyond the Survey: Additional Evidence
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
          Surveys are useful, but Level 3 is stronger when supported by
          supervisor feedback, work samples, observations, or other evidence of
          on-the-job application.
        </p>
      </div>

      <section>
        <h3 className="text-2xl font-bold text-navy-900">
          Select suitable evidence methods
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((method) => (
            <OptionToggle
              key={method}
              label={method}
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
                className="rounded-2xl border border-field-border bg-white p-5 shadow-sm"
              >
                <h3 className="text-xl font-bold capitalize text-navy-900">
                  {method}
                </h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <FieldShell label="What evidence would this method collect?">
                    <TextArea
                      value={detail.evidenceCollected}
                      onChange={(evidenceCollected) =>
                        updateMethodDetail(method, { evidenceCollected })
                      }
                    />
                  </FieldShell>
                  <FieldShell label="Who would provide the evidence?">
                    <TextInput
                      value={detail.evidenceProvider}
                      onChange={(evidenceProvider) =>
                        updateMethodDetail(method, { evidenceProvider })
                      }
                    />
                  </FieldShell>
                  <FieldShell label="When would it be collected?">
                    <TextInput
                      value={detail.collectionTiming}
                      onChange={(collectionTiming) =>
                        updateMethodDetail(method, { collectionTiming })
                      }
                    />
                  </FieldShell>
                  <FieldShell label="What question would be asked?">
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
