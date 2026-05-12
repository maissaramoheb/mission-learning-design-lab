import type { StepKey } from "@/types/activity";

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
  application: {
    label: "Application Objective",
    color: "#4B92DB"
  },
  survey: {
    label: "Survey Questions",
    color: "#2D7D8F"
  },
  evidence: {
    label: "Evidence Methods",
    color: "#64748B"
  },
  targets: {
    label: "Targets / Transfer",
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

export function getPhaseStyle(step: StepKey) {
  return phaseStyles[step] ?? defaultPhase;
}
