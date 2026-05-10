"use client";

import { AlertCircle, CheckCircle2, Presentation, Target } from "lucide-react";
import { useEffect } from "react";
import type { ActivityData } from "@/types/activity";
import {
  Badge,
  FieldShell,
  SelectInput,
  TextArea,
  TextInput
} from "@/components/FormElements";
import { getPresentationMissingFields, isPresentationReady } from "@/lib/validation";

type TrainingDesignBuilderProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
  onGeneratePresentation: () => void;
};

const assessmentMethods = [
  "quick right/wrong check",
  "role-play observation checklist",
  "group presentation",
  "scenario decision brief",
  "written mini-report",
  "combined method"
];

const deliveryRisks = [
  "dominant participant",
  "weak participation",
  "time overrun",
  "too much lecture",
  "confusion between solving and teaching",
  "unrealistic response",
  "other"
];

function deriveSocialElement(data: ActivityData) {
  const behaviour = data.social.demonstratedBehaviour;
  const practice = data.social.rolePlayerAction;
  const feedback = data.social.feedbackApproach;
  return [behaviour, practice ? `Role-play: ${practice}` : "", feedback ? `Feedback: ${feedback}` : ""]
    .filter(Boolean)
    .join("\n");
}

function deriveConstructivistElement(data: ActivityData) {
  return [
    data.constructivist.scenarioQuestion
      ? `Scenario question: ${data.constructivist.scenarioQuestion}`
      : "",
    data.constructivist.groupTask ? `Group task: ${data.constructivist.groupTask}` : "",
    data.constructivist.expectedLearningPoint
      ? `Learning point: ${data.constructivist.expectedLearningPoint}`
      : ""
  ]
    .filter(Boolean)
    .join("\n");
}

export function TrainingDesignBuilder({
  data,
  updateData,
  onGeneratePresentation
}: TrainingDesignBuilderProps) {
  const missingFields = getPresentationMissingFields(data);
  const ready = isPresentationReady(data);
  const updateDesign = (patch: Partial<ActivityData["design"]>) => {
    updateData({
      design: {
        ...data.design,
        ...patch
      }
    });
  };

  useEffect(() => {
    const derived = {
      behaviouristElement: data.behaviourist.ruleItem,
      socialCognitiveElement: deriveSocialElement(data),
      constructivistElement: deriveConstructivistElement(data)
    };

    const patch: Partial<ActivityData["design"]> = {};
    if (!data.design.behaviouristElement && derived.behaviouristElement) {
      patch.behaviouristElement = derived.behaviouristElement;
    }
    if (!data.design.socialCognitiveElement && derived.socialCognitiveElement) {
      patch.socialCognitiveElement = derived.socialCognitiveElement;
    }
    if (!data.design.constructivistElement && derived.constructivistElement) {
      patch.constructivistElement = derived.constructivistElement;
    }

    if (Object.keys(patch).length > 0) {
      updateDesign(patch);
    }
    // The effect only initializes empty builder fields from prior phase work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Final Training Design</Badge>
        <h2 className="mt-3 text-3xl font-bold text-navy-900">
          Final Mini-Training Design
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
          Now convert your work into a coherent 15-minute mini-training design.
          This is a training-design exercise, not only a tactical
          problem-solving exercise.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-2">
        <FieldShell label="1. Training Title">
          <TextInput
            value={data.design.title}
            onChange={(title) => updateDesign({ title })}
            placeholder="Example: First Response Near an IDP Settlement"
          />
        </FieldShell>

        <FieldShell label="2. Target Audience">
          <TextInput
            value={data.design.targetAudience}
            onChange={(targetAudience) => updateDesign({ targetAudience })}
            placeholder="Newly deployed UN Police officers"
          />
        </FieldShell>
      </section>

      <section className="rounded-2xl border border-un-line bg-un-light p-6">
        <div className="flex items-center gap-3">
          <Target className="text-un-blue" size={24} aria-hidden />
          <h3 className="text-2xl font-bold text-navy-900">
            3. SMART Learning Objective
          </h3>
        </div>
        <p className="mt-3 text-lg leading-8 text-slate-700">
          By the end of this 15-minute mini-training, participants will be able to...
        </p>
        <div className="mt-4">
          <TextArea
            rows={3}
            value={data.design.smartObjective}
            onChange={(smartObjective) => updateDesign({ smartObjective })}
            placeholder="identify three immediate safety indicators, demonstrate respectful witness questioning, and propose a community-sensitive response..."
          />
        </div>
        <div className="mt-4 grid gap-3 text-base text-slate-700 md:grid-cols-3">
          <p className="rounded-lg border border-un-line bg-white p-3">
            identify three immediate safety indicators...
          </p>
          <p className="rounded-lg border border-un-line bg-white p-3">
            demonstrate respectful witness questioning...
          </p>
          <p className="rounded-lg border border-un-line bg-white p-3">
            propose a community-sensitive response...
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <FieldShell label="4. Behaviourist Element" helper="Auto-filled from Phase 1, editable.">
          <TextArea
            value={data.design.behaviouristElement}
            onChange={(behaviouristElement) =>
              updateDesign({ behaviouristElement })
            }
            placeholder="What clear rule, fact, or right/wrong item will you teach?"
          />
        </FieldShell>

        <FieldShell label="5. Social Cognitive Element" helper="Auto-filled from Phase 2, editable.">
          <TextArea
            value={data.design.socialCognitiveElement}
            onChange={(socialCognitiveElement) =>
              updateDesign({ socialCognitiveElement })
            }
            placeholder="What behaviour will you demonstrate, let participants practice, and give feedback on?"
          />
        </FieldShell>

        <FieldShell label="6. Constructivist Element" helper="Auto-filled from Phase 3, editable.">
          <TextArea
            value={data.design.constructivistElement}
            onChange={(constructivistElement) =>
              updateDesign({ constructivistElement })
            }
            placeholder="What scenario problem will participants solve using their experience?"
          />
        </FieldShell>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <FieldShell label="7. Assessment Method">
          <SelectInput
            value={data.design.assessmentMethod}
            onChange={(assessmentMethod) => updateDesign({ assessmentMethod })}
          >
            <option value="">Select assessment method</option>
            {assessmentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </SelectInput>
        </FieldShell>

        <FieldShell label="Describe how you will know learning happened.">
          <TextArea
            value={data.design.assessmentDescription}
            onChange={(assessmentDescription) =>
              updateDesign({ assessmentDescription })
            }
            placeholder="Example: observe the role-play, check reporting decisions, and ask each group to brief their response logic."
          />
        </FieldShell>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <FieldShell label="8. Main Risk During Delivery">
          <SelectInput
            value={data.design.deliveryRisk}
            onChange={(deliveryRisk) => updateDesign({ deliveryRisk })}
          >
            <option value="">Select delivery risk</option>
            {deliveryRisks.map((risk) => (
              <option key={risk} value={risk}>
                {risk}
              </option>
            ))}
          </SelectInput>
        </FieldShell>

        <FieldShell label="9. Control Measure">
          <TextArea
            value={data.design.controlMeasure}
            onChange={(controlMeasure) => updateDesign({ controlMeasure })}
            placeholder="Example: assign roles, use strict time, force groups to produce a training output."
          />
        </FieldShell>
      </section>

      <FieldShell label="10. Final Key Message">
        <TextArea
          rows={3}
          value={data.design.finalKeyMessage}
          onChange={(finalKeyMessage) => updateDesign({ finalKeyMessage })}
          placeholder="Example: Facts need clarity, skills need modelling, complex problems need judgment."
        />
      </FieldShell>

      <div className="flex justify-end">
        <div className="w-full rounded-2xl border border-field-border bg-field-mist p-5 shadow-sm lg:w-auto lg:min-w-[460px]">
          <div className="flex gap-3">
            {ready ? (
              <CheckCircle2 className="mt-1 text-emerald-700" size={24} aria-hidden />
            ) : (
              <AlertCircle className="mt-1 text-amber-700" size={24} aria-hidden />
            )}
            <div>
              <h3 className="text-xl font-bold text-navy-900">
                {ready
                  ? "Presentation is ready to generate"
                  : "Complete key fields before presentation"}
              </h3>
              {ready ? (
                <p className="mt-2 text-lg leading-8 text-slate-700">
                  The required design fields are complete.
                </p>
              ) : (
                <p className="mt-2 text-lg leading-8 text-slate-700">
                  Missing: {missingFields.join(", ")}.
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onGeneratePresentation}
            disabled={!ready}
            className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-navy-900 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          >
            <Presentation size={20} aria-hidden />
            Generate Presentation
          </button>
        </div>
      </div>
    </div>
  );
}
