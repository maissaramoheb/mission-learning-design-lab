"use client";

import { useEffect, useMemo, useState } from "react";
import { BehaviouristPhase } from "@/components/BehaviouristPhase";
import { ApplicationObjectivePhase } from "@/components/ApplicationObjectivePhase";
import { ConstructivistPhase } from "@/components/ConstructivistPhase";
import { EvaluationDesignBuilder } from "@/components/EvaluationDesignBuilder";
import { EvaluationScenario } from "@/components/EvaluationScenario";
import { EvidenceMethodsPhase } from "@/components/EvidenceMethodsPhase";
import { ExportSummary } from "@/components/ExportSummary";
import { FacilitatorGuide } from "@/components/FacilitatorGuide";
import { GroupSetup } from "@/components/GroupSetup";
import { MissionScenario } from "@/components/MissionScenario";
import { PresentationMode } from "@/components/PresentationMode";
import { SocialCognitivePhase } from "@/components/SocialCognitivePhase";
import { StepLayout } from "@/components/StepLayout";
import { SurveyQuestionsPhase } from "@/components/SurveyQuestionsPhase";
import { TargetsPhase } from "@/components/TargetsPhase";
import { TrainingDesignBuilder } from "@/components/TrainingDesignBuilder";
import { Welcome } from "@/components/Welcome";
import { modeContent } from "@/lib/constants";
import {
  emptyActivityData,
  loadActivityData,
  loadCurrentStep,
  resetActivityData,
  saveActivityData,
  saveCurrentStep
} from "@/lib/storage";
import type {
  ActivityData,
  AppMode,
  StepDefinition,
  StepKey
} from "@/types/activity";
import { isGroupSetupValid, isPresentationReady } from "@/lib/validation";

type StepCopy = {
  title: string;
  eyebrow?: string;
  description?: string;
};

const stepSets: Record<AppMode, StepDefinition[]> = {
  learning: [
    { key: "welcome", label: "Welcome", shortLabel: "Welcome" },
    { key: "setup", label: "Setup", shortLabel: "Setup" },
    { key: "scenario", label: "Scenario", shortLabel: "Scenario" },
    { key: "behaviourist", label: "Rules", shortLabel: "Rules" },
    { key: "social", label: "Model", shortLabel: "Model" },
    { key: "constructivist", label: "Build", shortLabel: "Build" },
    { key: "builder", label: "Design", shortLabel: "Design" },
    { key: "presentation", label: "Present", shortLabel: "Present" },
    { key: "export", label: "Export", shortLabel: "Export" }
  ],
  evaluation: [
    { key: "welcome", label: "Welcome", shortLabel: "Welcome" },
    { key: "setup", label: "Setup", shortLabel: "Setup" },
    { key: "scenario", label: "Mission", shortLabel: "Mission" },
    { key: "application", label: "Objective", shortLabel: "Objective" },
    { key: "survey", label: "Survey", shortLabel: "Survey" },
    { key: "evidence", label: "Evidence", shortLabel: "Evidence" },
    { key: "targets", label: "Targets", shortLabel: "Targets" },
    { key: "builder", label: "Package", shortLabel: "Package" },
    { key: "presentation", label: "Present", shortLabel: "Present" },
    { key: "export", label: "Export", shortLabel: "Export" }
  ]
};

const stepCopy: Record<AppMode, Partial<Record<StepKey, StepCopy>>> = {
  learning: {
    welcome: {
      title: "Mission Learning Design Lab",
      eyebrow: "Start",
      description:
        "Facts need clarity. Skills need modelling. Complex mission problems need judgment."
    },
    setup: {
      title: "Group Setup",
      eyebrow: "Roles and responsibilities",
      description:
        "Assign the roles needed to keep the group focused, disciplined, and ready to brief."
    },
    scenario: {
      title: "Mission Scenario",
      eyebrow: "Operational training problem",
      description:
        "Read the field situation, then identify the main training gap your mini-session must address."
    },
    behaviourist: {
      title: "Rules Under Pressure",
      eyebrow: "Phase 1",
      description:
        "Use clear right/wrong items, immediate correction, and reinforcement for facts and rules."
    },
    social: {
      title: "Watch, Practice, Improve",
      eyebrow: "Phase 2",
      description:
        "Move from knowing the rule to observing and improving field-facing behaviour."
    },
    constructivist: {
      title: "Build the Solution",
      eyebrow: "Phase 3",
      description:
        "Use group experience to design a scenario-based activity for complex mission judgment."
    },
    builder: {
      title: "Final Mini-Training Design",
      eyebrow: "Synthesis",
      description:
        "Convert the three phases into one coherent 15-minute training design."
    },
    presentation: {
      title: "Presentation Mode",
      eyebrow: "Briefing",
      description: "Present directly from the app."
    },
    export: {
      title: "Export / Print Summary",
      eyebrow: "Record",
      description: "Save, print, or reset this group’s work."
    }
  },
  evaluation: {
    welcome: {
      title: "Evaluation Design Operations Lab",
      eyebrow: "Start",
      description:
        "Level 3 evaluation asks whether learning became observable workplace behaviour."
    },
    setup: {
      title: "Evaluation Team Setup",
      eyebrow: "Roles and responsibilities",
      description:
        "Assign the group roles needed to design a credible Level 3 evaluation package."
    },
    scenario: {
      title: "Evaluation Mission Scenario",
      eyebrow: "Transfer-of-learning brief",
      description:
        "Frame the evaluation mission: application evidence after training, not course satisfaction."
    },
    application: {
      title: "From Objective to Application",
      eyebrow: "Phase 1",
      description:
        "Convert a classroom learning objective into a workplace application objective."
    },
    survey: {
      title: "Build Level 3 Survey Questions",
      eyebrow: "Phase 2",
      description:
        "Design questions that test application, confidence, frequency, barriers, and examples."
    },
    evidence: {
      title: "Evidence Beyond the Survey",
      eyebrow: "Phase 3",
      description:
        "Strengthen the evaluation package with supervisor, peer, document, and follow-up evidence."
    },
    targets: {
      title: "Targets, Barriers, and Enablers",
      eyebrow: "Phase 4",
      description:
        "Define success criteria and identify what may support or block transfer."
    },
    builder: {
      title: "Final Evaluation Design Package",
      eyebrow: "Synthesis",
      description:
        "Assemble one coherent Level 3 evaluation package ready to brief."
    },
    presentation: {
      title: "Presentation Mode",
      eyebrow: "Briefing",
      description: "Present the Level 3 evaluation design directly from the app."
    },
    export: {
      title: "Export / Print Summary",
      eyebrow: "Record",
      description: "Save, print, or reset this group’s evaluation package."
    }
  }
};

function nextStep(step: StepKey, steps: StepDefinition[]): StepKey {
  const index = steps.findIndex((item) => item.key === step);
  return steps[Math.min(Math.max(index, 0) + 1, steps.length - 1)].key;
}

function previousStep(step: StepKey, steps: StepDefinition[]): StepKey {
  const index = steps.findIndex((item) => item.key === step);
  return steps[Math.max(index - 1, 0)]?.key ?? steps[0].key;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

export default function Home() {
  const [data, setData] = useState<ActivityData>(emptyActivityData);
  const [step, setStep] = useState<StepKey>("welcome");
  const [loaded, setLoaded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"loading" | "saving" | "saved">(
    "loading"
  );
  const steps = stepSets[data.mode];
  const setupValid = isGroupSetupValid(data);
  const presentationReady = isPresentationReady(data);
  const setupIndex = steps.findIndex((item) => item.key === "setup");
  const mode = modeContent[data.mode];

  useEffect(() => {
    const storedData = loadActivityData();
    const storedStep = loadCurrentStep();
    const compatibleSteps = stepSets[storedData.mode];
    setData(storedData);
    setStep(
      compatibleSteps.some((item) => item.key === storedStep)
        ? storedStep
        : "welcome"
    );
    setLoaded(true);
    setSaveStatus("saved");
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    setSaveStatus("saving");
    saveActivityData(data);
    const id = window.setTimeout(() => setSaveStatus("saved"), 450);
    return () => window.clearTimeout(id);
  }, [data, loaded]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    saveCurrentStep(step);
  }, [step, loaded]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (step === "presentation" || isTypingTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowRight") {
        const currentIndex = steps.findIndex((item) => item.key === step);
        const targetIndex = Math.min(currentIndex + 1, steps.length - 1);
        if (targetIndex > setupIndex && !setupValid) {
          setStep("setup");
          return;
        }
        if (steps[targetIndex].key === "presentation" && !presentationReady) {
          setStep("builder");
          return;
        }
        setStep((current) => nextStep(current, steps));
      }
      if (event.key === "ArrowLeft") {
        setStep((current) => previousStep(current, steps));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [presentationReady, setupIndex, setupValid, step, steps]);

  const updateData = (patch: Partial<ActivityData>) => {
    setData((current) => ({
      ...current,
      ...patch
    }));
  };

  const resetAll = () => {
    resetActivityData();
    setData(emptyActivityData);
    setStep("welcome");
  };

  const handleNext = () => {
    const targetStep = nextStep(step, steps);
    const targetIndex = steps.findIndex((item) => item.key === targetStep);

    if (targetIndex > setupIndex && !setupValid) {
      setStep("setup");
      return;
    }
    if (targetStep === "presentation" && !presentationReady) {
      setStep("builder");
      return;
    }

    setStep(targetStep);
  };

  const copy =
    stepCopy[data.mode][step] ??
    stepCopy[data.mode].welcome ?? {
      title: mode.appTitle
    };
  const index = useMemo(
    () => Math.max(steps.findIndex((item) => item.key === step), 0),
    [step, steps]
  );
  const canGoBack = index > 0;
  const canGoNext =
    index < steps.length - 1 &&
    !(index >= setupIndex && step !== "welcome" && !setupValid) &&
    !(step === "builder" && !presentationReady);
  const handleStepClick = (targetStep: StepKey) => {
    const targetIndex = steps.findIndex((item) => item.key === targetStep);

    if (targetIndex > setupIndex && !setupValid) {
      setStep("setup");
      return;
    }
    if (targetStep === "presentation" && !presentationReady) {
      setStep("builder");
      return;
    }

    setStep(targetStep);
  };

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy-900 p-6 text-white">
        <section className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-command backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-un-line">
            {mode.appTitle}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{mode.tagline}</h1>
          <p className="mt-5 text-lg text-white/80">{mode.productCredit}</p>
        </section>
      </main>
    );
  }

  if (step === "presentation") {
    return (
      <PresentationMode
        data={data}
        onExit={() => setStep("builder")}
        onSummary={() => setStep("export")}
      />
    );
  }

  return (
    <>
      <StepLayout
        step={step}
        steps={steps}
        title={copy.title}
        eyebrow={copy.eyebrow}
        description={copy.description}
        appTitle={mode.appTitle}
        mainTagline={mode.tagline}
        commandLabel={mode.commandLabel}
        saveStatus={saveStatus}
        progressPercent={Math.round((index / (steps.length - 1)) * 100)}
        groupName={data.groupName}
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        nextLabel={
          step === "welcome"
            ? data.mode === "evaluation"
              ? "Start Evaluation Mission"
              : "Start Learning Mission"
            : step === "builder"
              ? "Generate Presentation"
              : step === "export"
                ? "Finished"
                : "Continue"
        }
        onBack={() => setStep((current) => previousStep(current, steps))}
        onNext={handleNext}
        onStepClick={handleStepClick}
        onOpenGuide={() => setGuideOpen(true)}
      >
        {step === "welcome" ? (
          <Welcome
            mode={data.mode}
            onModeChange={(modeValue) =>
              updateData({
                mode: modeValue,
                roles:
                  modeValue === data.mode
                    ? data.roles
                    : {
                        leadFacilitator: "",
                        rolePlayer: "",
                        observerEvaluator: "",
                        rapporteur: "",
                        presenter: ""
                      }
              })
            }
            onStart={() => setStep("setup")}
          />
        ) : null}
        {step === "setup" ? (
          <GroupSetup data={data} updateData={updateData} />
        ) : null}
        {step === "scenario" ? (
          data.mode === "evaluation" ? (
            <EvaluationScenario data={data} updateData={updateData} />
          ) : (
            <MissionScenario data={data} updateData={updateData} />
          )
        ) : null}
        {step === "behaviourist" ? (
          <BehaviouristPhase data={data} updateData={updateData} />
        ) : null}
        {step === "social" ? (
          <SocialCognitivePhase data={data} updateData={updateData} />
        ) : null}
        {step === "constructivist" ? (
          <ConstructivistPhase data={data} updateData={updateData} />
        ) : null}
        {step === "application" ? (
          <ApplicationObjectivePhase data={data} updateData={updateData} />
        ) : null}
        {step === "survey" ? (
          <SurveyQuestionsPhase data={data} updateData={updateData} />
        ) : null}
        {step === "evidence" ? (
          <EvidenceMethodsPhase data={data} updateData={updateData} />
        ) : null}
        {step === "targets" ? (
          <TargetsPhase data={data} updateData={updateData} />
        ) : null}
        {step === "builder" ? (
          data.mode === "evaluation" ? (
            <EvaluationDesignBuilder
              data={data}
              updateData={updateData}
              onGeneratePresentation={() => {
                if (presentationReady) {
                  setStep("presentation");
                }
              }}
            />
          ) : (
            <TrainingDesignBuilder
              data={data}
              updateData={updateData}
              onGeneratePresentation={() => {
                if (presentationReady) {
                  setStep("presentation");
                }
              }}
            />
          )
        ) : null}
        {step === "export" ? <ExportSummary data={data} onReset={resetAll} /> : null}
      </StepLayout>

      <FacilitatorGuide
        mode={data.mode}
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
      />
    </>
  );
}
