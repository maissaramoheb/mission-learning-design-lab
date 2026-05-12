import type { AppMode, StepKey } from "@/types/activity";

const defaultPhase = {
  label: "Operations Board",
  color: "#4B92DB"
};

const phaseStyles: Partial<Record<StepKey, typeof defaultPhase>> = {
  behaviourist: {
    label: "Rules / Reinforcement",
    color: "#4B92DB"
  },
  social: {
    label: "Modelling / Practice",
    color: "#2D7D8F"
  },
  constructivist: {
    label: "Scenario / Judgment",
    color: "#526D9E"
  },
  builder: {
    label: "Final Package",
    color: "#5B6F82"
  },
  presentation: {
    label: "Briefing",
    color: "#4B92DB"
  }
};

const evaluationPhaseStyles: Partial<Record<StepKey, typeof defaultPhase>> = {
  welcome: {
    label: "Level 3 Evaluation",
    color: "#5DA7F2"
  },
  setup: {
    label: "Evaluation Team Setup",
    color: "#5DA7F2"
  },
  scenario: {
    label: "Mission Brief",
    color: "#6D93B8"
  },
  application: {
    label: "Convert Objective",
    color: "#5DA7F2"
  },
  survey: {
    label: "Build Questions",
    color: "#6D93B8"
  },
  evidence: {
    label: "Collect Evidence",
    color: "#8394A6"
  },
  targets: {
    label: "Compare Against Target",
    color: "#D2A65A"
  },
  builder: {
    label: "Final Evaluation Package",
    color: "#D2A65A"
  },
  presentation: {
    label: "Brief Evaluation Package",
    color: "#5DA7F2"
  },
  export: {
    label: "Export Evaluation Summary",
    color: "#6D93B8"
  }
};

export function getPhaseStyle(step: StepKey, mode: AppMode = "learning") {
  if (mode === "evaluation") {
    return evaluationPhaseStyles[step] ?? defaultPhase;
  }

  return phaseStyles[step] ?? defaultPhase;
}
