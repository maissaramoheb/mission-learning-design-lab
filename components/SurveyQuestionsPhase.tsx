"use client";

import { ClipboardList } from "lucide-react";
import type { ActivityData } from "@/types/activity";
import { Badge, FieldShell, TextArea, TextInput } from "@/components/FormElements";

type SurveyQuestionsPhaseProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

function updateArray(values: string[], index: number, value: string) {
  const next = [...values];
  next[index] = value;
  return next;
}

export function SurveyQuestionsPhase({
  data,
  updateData
}: SurveyQuestionsPhaseProps) {
  const updateSurvey = (patch: Partial<ActivityData["survey"]>) => {
    updateData({
      survey: {
        ...data.survey,
        ...patch
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-6 text-white shadow-[0_24px_70px_rgba(2,10,22,0.28)]">
        <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_14%_18%,rgba(109,147,184,.24),transparent_30%),linear-gradient(rgba(116,145,172,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
        <div className="relative">
          <Badge>Build Questions</Badge>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Phase 2 — Converting Application Objectives into Survey Questions
              </h2>
              <p className="mt-3 max-w-4xl text-lg leading-8 text-white/80">
                Level 3 questions should expose transfer, frequency, confidence,
                barriers, and usable examples from the field.
              </p>
            </div>
            <div className="rounded-2xl border border-[#7fb8ef]/35 bg-[#123352]/[0.82] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
                Transfer Check
              </p>
              <p className="mt-2 max-w-xs text-base font-semibold leading-7 text-white/[0.82]">
                Ask whether learning was applied, what actions were taken, and
                what prevented transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#10263d] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.22)]">
        <div className="flex items-center gap-3">
          <ClipboardList className="text-[#8ec2f4]" size={24} aria-hidden />
          <h3 className="text-2xl font-bold">
            Core Level 3 survey structure
          </h3>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <FieldShell
            label="1. Main yes/no application question"
            helper="This is the primary self-report transfer indicator."
            tone="tactical"
          >
            <TextArea
              value={data.survey.mainApplicationQuestion}
              onChange={(mainApplicationQuestion) =>
                updateSurvey({ mainApplicationQuestion })
              }
            />
          </FieldShell>
          <FieldShell
            label="3. Confidence question"
            helper="Confidence helps interpret whether application felt feasible."
            tone="tactical"
          >
            <TextArea
              value={data.survey.confidenceQuestion}
              onChange={(confidenceQuestion) =>
                updateSurvey({ confidenceQuestion })
              }
            />
          </FieldShell>
          <FieldShell
            label="4. Frequency question"
            helper="Frequency distinguishes isolated use from sustained transfer."
            tone="tactical"
          >
            <TextArea
              value={data.survey.frequencyQuestion}
              onChange={(frequencyQuestion) => updateSurvey({ frequencyQuestion })}
            />
          </FieldShell>
          <FieldShell
            label="5. Barriers question"
            helper="Barrier data explains why transfer did or did not occur."
            tone="tactical"
          >
            <TextArea
              value={data.survey.barriersQuestion}
              onChange={(barriersQuestion) => updateSurvey({ barriersQuestion })}
            />
          </FieldShell>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
          <h3 className="text-xl font-bold">
            2. Action checklist options
          </h3>
          <p className="mt-2 text-base leading-7 text-white/[0.72]">
            Write 4–6 actions that would show application.
          </p>
          <div className="mt-4 grid gap-3">
            {data.survey.actionOptions.map((option, index) => (
              <TextInput
                key={`action-${index}`}
                value={option}
                onChange={(value) =>
                  updateSurvey({
                    actionOptions: updateArray(
                      data.survey.actionOptions,
                      index,
                      value
                    )
                  })
                }
                placeholder={`Action option ${index + 1}`}
              />
            ))}
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#2a2115] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
          <h3 className="text-xl font-bold">
            Barrier response options
          </h3>
          <p className="mt-2 text-base leading-7 text-white/[0.72]">
            Write 4–6 likely reasons why application did not happen.
          </p>
          <div className="mt-4 grid gap-3">
            {data.survey.barrierOptions.map((option, index) => (
              <TextInput
                key={`barrier-${index}`}
                value={option}
                onChange={(value) =>
                  updateSurvey({
                    barrierOptions: updateArray(
                      data.survey.barrierOptions,
                      index,
                      value
                    )
                  })
                }
                placeholder={`Barrier option ${index + 1}`}
              />
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
        <FieldShell
          label="6. Open-ended evidence question"
          helper="Invite one concrete example of transfer or attempted transfer."
          tone="tactical"
        >
          <TextArea
            rows={3}
            value={data.survey.openEvidenceQuestion}
            onChange={(openEvidenceQuestion) =>
              updateSurvey({ openEvidenceQuestion })
            }
          />
        </FieldShell>
      </section>
    </div>
  );
}
