"use client";

import { AlertCircle, CheckCircle2, Presentation } from "lucide-react";
import { useEffect } from "react";
import type { ActivityData } from "@/types/activity";
import { EvaluationEvidenceChain } from "@/components/EvaluationEvidenceChain";
import { Badge, FieldShell, TextArea, TextInput } from "@/components/FormElements";
import { getPresentationMissingFields, isPresentationReady } from "@/lib/validation";

type EvaluationDesignBuilderProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
  onGeneratePresentation: () => void;
};

function compactList(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean).join("\n");
}

function formatEvidenceMethods(data: ActivityData) {
  return data.evidence.selectedMethods
    .map((method) => {
      const detail = data.evidence.methodDetails[method];
      if (!detail) {
        return method;
      }
      return [
        method,
        detail.evidenceCollected ? `Evidence: ${detail.evidenceCollected}` : "",
        detail.evidenceProvider ? `Provider: ${detail.evidenceProvider}` : "",
        detail.collectionTiming ? `Timing: ${detail.collectionTiming}` : "",
        detail.questionAsked ? `Question: ${detail.questionAsked}` : ""
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

export function EvaluationDesignBuilder({
  data,
  updateData,
  onGeneratePresentation
}: EvaluationDesignBuilderProps) {
  const ready = isPresentationReady(data);
  const missingFields = getPresentationMissingFields(data);

  const updateDesign = (patch: Partial<ActivityData["evaluationDesign"]>) => {
    updateData({
      evaluationDesign: {
        ...data.evaluationDesign,
        ...patch
      }
    });
  };

  useEffect(() => {
    const patch: Partial<ActivityData["evaluationDesign"]> = {};
    const derived = {
      originalLearningObjective: data.application.originalLearningObjective,
      applicationObjective: data.application.applicationObjective,
      mainSurveyQuestion: data.survey.mainApplicationQuestion,
      actionChecklist: compactList(data.survey.actionOptions),
      confidenceQuestion: data.survey.confidenceQuestion,
      frequencyQuestion: data.survey.frequencyQuestion,
      barriersQuestion: data.survey.barriersQuestion,
      barrierOptions: compactList(data.survey.barrierOptions),
      openEvidenceQuestion: data.survey.openEvidenceQuestion,
      additionalEvidenceMethods: formatEvidenceMethods(data),
      targetScore: data.targets.targetScore,
      confidenceTarget: data.targets.confidenceTarget,
      transferTarget: data.targets.transferTarget,
      enablers: compactList(data.targets.enablers),
      barriers: compactList(data.targets.barriers),
      followUpAction: data.targets.followUpAction
    };

    Object.entries(derived).forEach(([key, value]) => {
      const typedKey = key as keyof typeof derived;
      if (!data.evaluationDesign[typedKey] && value) {
        patch[typedKey] = value;
      }
    });

    if (Object.keys(patch).length > 0) {
      updateDesign(patch);
    }
    // Initializes empty final builder fields from phase work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#081725] p-6 text-white shadow-[0_24px_70px_rgba(2,10,22,0.28)]">
        <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_14%_18%,rgba(210,166,90,.16),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(93,167,242,.16),transparent_24%),linear-gradient(rgba(116,145,172,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,auto,34px_34px,34px_34px]" />
        <div className="relative">
          <Badge>Final Evaluation Package</Badge>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Build Evaluation Package
              </h2>
              <p className="mt-3 max-w-4xl text-lg leading-8 text-white/80">
                Convert the phase work into one coherent Level 3 evaluation
                package. The final brief should show what behaviour will be
                measured, what evidence will be collected, and how success will
                be judged.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d2a65a]/45 bg-[#2a2115]/[0.88] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0ce8e]">
                Final Evaluation Package
              </p>
              <p className="mt-2 max-w-xs text-base font-semibold leading-7 text-white/80">
                Consolidate objective, questions, evidence, targets, and action.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EvaluationEvidenceChain compact />

      <section className="grid gap-5 rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)] lg:grid-cols-2">
        <FieldShell label="1. Training topic" tone="tactical">
          <TextInput
            value={data.evaluationDesign.trainingTopic}
            onChange={(trainingTopic) => updateDesign({ trainingTopic })}
          />
        </FieldShell>
        <FieldShell label="2. Original learning objective" tone="tactical">
          <TextArea
            value={data.evaluationDesign.originalLearningObjective}
            onChange={(originalLearningObjective) =>
              updateDesign({ originalLearningObjective })
            }
          />
        </FieldShell>
      </section>

      <section className="rounded-[1.75rem] border border-[#7fb8ef]/40 bg-[#123352] p-5 shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
        <FieldShell
          label="3. Level 3 application objective"
          helper="This is the anchor statement for all later evidence choices."
          tone="tactical"
        >
          <TextArea
            rows={4}
            value={data.evaluationDesign.applicationObjective}
            onChange={(applicationObjective) =>
              updateDesign({ applicationObjective })
            }
          />
        </FieldShell>
      </section>

      <section className="grid gap-5 rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)] lg:grid-cols-2">
        <FieldShell label="4. Main Level 3 survey question" tone="tactical">
          <TextArea
            value={data.evaluationDesign.mainSurveyQuestion}
            onChange={(mainSurveyQuestion) =>
              updateDesign({ mainSurveyQuestion })
            }
          />
        </FieldShell>
        <FieldShell label="5. Action checklist" tone="tactical">
          <TextArea
            value={data.evaluationDesign.actionChecklist}
            onChange={(actionChecklist) => updateDesign({ actionChecklist })}
          />
        </FieldShell>
        <FieldShell label="6. Confidence question" tone="tactical">
          <TextArea
            value={data.evaluationDesign.confidenceQuestion}
            onChange={(confidenceQuestion) =>
              updateDesign({ confidenceQuestion })
            }
          />
        </FieldShell>
        <FieldShell label="7. Frequency question" tone="tactical">
          <TextArea
            value={data.evaluationDesign.frequencyQuestion}
            onChange={(frequencyQuestion) => updateDesign({ frequencyQuestion })}
          />
        </FieldShell>
        <FieldShell label="8. Barriers question" tone="tactical">
          <TextArea
            value={data.evaluationDesign.barriersQuestion}
            onChange={(barriersQuestion) => updateDesign({ barriersQuestion })}
          />
        </FieldShell>
        <FieldShell label="9. Barrier options" tone="tactical">
          <TextArea
            value={data.evaluationDesign.barrierOptions}
            onChange={(barrierOptions) => updateDesign({ barrierOptions })}
          />
        </FieldShell>
      </section>

      <section className="rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
        <FieldShell label="10. Open-ended evidence question" tone="tactical">
          <TextArea
            value={data.evaluationDesign.openEvidenceQuestion}
            onChange={(openEvidenceQuestion) =>
              updateDesign({ openEvidenceQuestion })
            }
          />
        </FieldShell>
      </section>

      <section className="grid gap-5 rounded-[1.75rem] border border-[#5d7896]/45 bg-[#10263d] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)] lg:grid-cols-2">
        <FieldShell label="11. Additional data collection methods" tone="tactical">
          <TextArea
            rows={6}
            value={data.evaluationDesign.additionalEvidenceMethods}
            onChange={(additionalEvidenceMethods) =>
              updateDesign({ additionalEvidenceMethods })
            }
          />
        </FieldShell>
        <FieldShell label="12. Follow-up action if target is not met" tone="tactical">
          <TextArea
            rows={6}
            value={data.evaluationDesign.followUpAction}
            onChange={(followUpAction) => updateDesign({ followUpAction })}
          />
        </FieldShell>
      </section>

      <section className="grid gap-5 rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#2a2115] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)] lg:grid-cols-3">
        <FieldShell label="13. Target score" tone="tactical">
          <TextArea
            value={data.evaluationDesign.targetScore}
            onChange={(targetScore) => updateDesign({ targetScore })}
          />
        </FieldShell>
        <FieldShell label="14. Confidence target" tone="tactical">
          <TextArea
            value={data.evaluationDesign.confidenceTarget}
            onChange={(confidenceTarget) => updateDesign({ confidenceTarget })}
          />
        </FieldShell>
        <FieldShell label="15. Transfer target" tone="tactical">
          <TextArea
            value={data.evaluationDesign.transferTarget}
            onChange={(transferTarget) => updateDesign({ transferTarget })}
          />
        </FieldShell>
      </section>

      <section className="grid gap-5 rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.18)] lg:grid-cols-2">
        <FieldShell label="16. Enablers" tone="tactical">
          <TextArea
            value={data.evaluationDesign.enablers}
            onChange={(enablers) => updateDesign({ enablers })}
          />
        </FieldShell>
        <FieldShell label="17. Barriers" tone="tactical">
          <TextArea
            value={data.evaluationDesign.barriers}
            onChange={(barriers) => updateDesign({ barriers })}
          />
        </FieldShell>
      </section>

      <section className="rounded-[1.75rem] border border-[#7fb8ef]/40 bg-[#123352] p-5 shadow-[0_18px_48px_rgba(2,10,22,0.18)]">
        <FieldShell label="18. Final message" tone="tactical">
          <TextArea
            rows={3}
            value={data.evaluationDesign.finalMessage}
            onChange={(finalMessage) => updateDesign({ finalMessage })}
          />
        </FieldShell>
      </section>

      <div className="flex justify-end">
        <div className="w-full rounded-[1.75rem] border border-[#d2a65a]/45 bg-[#2a2115] p-5 text-white shadow-[0_24px_70px_rgba(2,10,22,0.24)] lg:w-auto lg:min-w-[460px]">
          <div className="flex gap-3">
            {ready ? (
              <CheckCircle2 className="mt-1 text-emerald-700" size={24} aria-hidden />
            ) : (
              <AlertCircle className="mt-1 text-amber-700" size={24} aria-hidden />
            )}
            <div>
              <h3 className="text-xl font-bold">
                {ready
                  ? "Presentation is ready to generate"
                  : "Complete key fields before presentation"}
              </h3>
              <p className="mt-2 text-lg leading-8 text-white/80">
                {ready
                  ? "The required Level 3 evaluation fields are complete."
                  : `Missing: ${missingFields.join(", ")}.`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onGeneratePresentation}
            disabled={!ready}
            className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#123352] px-6 py-4 text-lg font-bold text-white shadow-[0_18px_44px_rgba(2,10,22,0.34)] transition hover:-translate-y-0.5 hover:bg-[#19446b] disabled:cursor-not-allowed disabled:bg-[#10263d] disabled:text-white/[0.72] disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <Presentation size={20} aria-hidden />
            Brief Evaluation Package
          </button>
        </div>
      </div>
    </div>
  );
}
