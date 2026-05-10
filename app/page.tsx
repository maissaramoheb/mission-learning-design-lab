"use client";

import { useEffect, useMemo, useState } from "react";
import { BehaviouristPhase } from "@/components/BehaviouristPhase";
import { ConstructivistPhase } from "@/components/ConstructivistPhase";
import { ExportSummary } from "@/components/ExportSummary";
import { FacilitatorGuide } from "@/components/FacilitatorGuide";
import { GroupSetup } from "@/components/GroupSetup";
import { MissionScenario } from "@/components/MissionScenario";
import { PresentationMode } from "@/components/PresentationMode";
import { SocialCognitivePhase } from "@/components/SocialCognitivePhase";
import { StepLayout } from "@/components/StepLayout";
import { TrainingDesignBuilder } from "@/components/TrainingDesignBuilder";
import { Welcome } from "@/components/Welcome";
import {
  APP_TITLE,
  MAIN_TAGLINE,
  PRODUCT_CREDIT
} from "@/lib/constants";
import {
  emptyActivityData,
  loadActivityData,
  loadCurrentStep,
  resetActivityData,
  saveActivityData,
  saveCurrentStep
} from "@/lib/storage";
import type { ActivityData, StepDefinition, StepKey } from "@/types/activity";
import { isGroupSetupValid, isPresentationReady } from "@/lib/validation";

const steps: StepDefinition[] = [
  { key: "welcome", label: "Welcome", shortLabel: "Welcome" },
  { key: "setup", label: "Setup", shortLabel: "Setup" },
  { key: "scenario", label: "Scenario", shortLabel: "Scenario" },
  { key: "behaviourist", label: "Rules", shortLabel: "Rules" },
  { key: "social", label: "Model", shortLabel: "Model" },
  { key: "constructivist", label: "Build", shortLabel: "Build" },
  { key: "builder", label: "Design", shortLabel: "Design" },
  { key: "presentation", label: "Present", shortLabel: "Present" },
  { key: "export", label: "Export", shortLabel: "Export" }
];

const stepCopy: Record<StepKey, { title: string; eyebrow?: string; description?: string }> = {
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
};

function nextStep(step: StepKey): StepKey {
  const index = steps.findIndex((item) => item.key === step);
  return steps[Math.min(index + 1, steps.length - 1)].key;
}

function previousStep(step: StepKey): StepKey {
  const index = steps.findIndex((item) => item.key === step);
  return steps[Math.max(index - 1, 0)].key;
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
  const setupValid = isGroupSetupValid(data);
  const presentationReady = isPresentationReady(data);
  const setupIndex = steps.findIndex((item) => item.key === "setup");

  useEffect(() => {
    setData(loadActivityData());
    setStep(loadCurrentStep());
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
        setStep((current) => nextStep(current));
      }
      if (event.key === "ArrowLeft") {
        setStep((current) => previousStep(current));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [presentationReady, setupIndex, setupValid, step]);

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
    const targetStep = nextStep(step);
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

  const copy = stepCopy[step];
  const index = useMemo(() => steps.findIndex((item) => item.key === step), [step]);
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
            {APP_TITLE}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{MAIN_TAGLINE}</h1>
          <p className="mt-5 text-lg text-white/80">{PRODUCT_CREDIT}</p>
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
        saveStatus={saveStatus}
        progressPercent={Math.round((index / (steps.length - 1)) * 100)}
        groupName={data.groupName}
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        nextLabel={
          step === "welcome"
            ? "Start Group Activity"
            : step === "builder"
              ? "Generate Presentation"
              : step === "export"
                ? "Finished"
                : "Continue"
        }
        onBack={() => setStep((current) => previousStep(current))}
        onNext={handleNext}
        onStepClick={handleStepClick}
        onOpenGuide={() => setGuideOpen(true)}
      >
        {step === "welcome" ? <Welcome onStart={() => setStep("setup")} /> : null}
        {step === "setup" ? (
          <GroupSetup data={data} updateData={updateData} />
        ) : null}
        {step === "scenario" ? (
          <MissionScenario data={data} updateData={updateData} />
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
        {step === "builder" ? (
          <TrainingDesignBuilder
            data={data}
            updateData={updateData}
            onGeneratePresentation={() => {
              if (presentationReady) {
                setStep("presentation");
              }
            }}
          />
        ) : null}
        {step === "export" ? <ExportSummary data={data} onReset={resetAll} /> : null}
      </StepLayout>

      <FacilitatorGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
