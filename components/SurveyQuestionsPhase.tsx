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
      <div>
        <Badge>Survey Questions</Badge>
        <h2 className="mt-3 text-3xl font-bold text-navy-900">
          Phase 2 — Converting Application Objectives into Survey Questions
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
          Level 3 survey questions measure whether participants applied the
          learning, what actions they implemented, how often they used it, how
          confident they felt, and what blocked or enabled transfer.
        </p>
      </div>

      <section className="rounded-2xl border border-un-line bg-un-light p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <ClipboardList className="text-un-blue" size={24} aria-hidden />
          <h3 className="text-2xl font-bold text-navy-900">
            Core Level 3 survey structure
          </h3>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <FieldShell label="1. Main yes/no application question">
            <TextArea
              value={data.survey.mainApplicationQuestion}
              onChange={(mainApplicationQuestion) =>
                updateSurvey({ mainApplicationQuestion })
              }
            />
          </FieldShell>
          <FieldShell label="3. Confidence question">
            <TextArea
              value={data.survey.confidenceQuestion}
              onChange={(confidenceQuestion) =>
                updateSurvey({ confidenceQuestion })
              }
            />
          </FieldShell>
          <FieldShell label="4. Frequency question">
            <TextArea
              value={data.survey.frequencyQuestion}
              onChange={(frequencyQuestion) => updateSurvey({ frequencyQuestion })}
            />
          </FieldShell>
          <FieldShell label="5. Barriers question">
            <TextArea
              value={data.survey.barriersQuestion}
              onChange={(barriersQuestion) => updateSurvey({ barriersQuestion })}
            />
          </FieldShell>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-field-border bg-white p-5 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900">
            2. Action checklist options
          </h3>
          <p className="mt-2 text-base leading-7 text-slate-600">
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

        <article className="rounded-2xl border border-field-border bg-white p-5 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900">
            Barrier response options
          </h3>
          <p className="mt-2 text-base leading-7 text-slate-600">
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

      <FieldShell label="6. Open-ended evidence question">
        <TextArea
          rows={3}
          value={data.survey.openEvidenceQuestion}
          onChange={(openEvidenceQuestion) =>
            updateSurvey({ openEvidenceQuestion })
          }
        />
      </FieldShell>
    </div>
  );
}
