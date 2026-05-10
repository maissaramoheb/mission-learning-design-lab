import type { ActivityData } from "@/types/activity";
import type { StepKey } from "@/types/activity";

export const STORAGE_KEY = "mission-learning-design-lab:v1";
export const STEP_STORAGE_KEY = "mission-learning-design-lab:step:v1";
const validSteps: StepKey[] = [
  "welcome",
  "setup",
  "scenario",
  "behaviourist",
  "social",
  "constructivist",
  "builder",
  "presentation",
  "export"
];

export const emptyActivityData: ActivityData = {
  groupName: "",
  memberCount: "",
  selectedMembers: [],
  roles: {
    leadFacilitator: "",
    rolePlayer: "",
    observerEvaluator: "",
    rapporteur: "",
    presenter: ""
  },
  trainingGap: "",
  behaviourist: {
    quizAnswers: ["", "", "", "", ""],
    ruleItem: "",
    reinforcement: ""
  },
  social: {
    whatWentWrong: [],
    demonstratedBehaviour: "",
    rolePlayerAction: "",
    observerChecklist: [],
    feedbackApproach: ""
  },
  constructivist: {
    mainProblem: "",
    actors: [],
    otherActor: "",
    scenarioQuestion: "",
    groupTask: "",
    outputs: [],
    otherOutput: "",
    expectedLearningPoint: ""
  },
  design: {
    title: "",
    targetAudience: "Newly deployed UN Police officers",
    smartObjective: "",
    behaviouristElement: "",
    socialCognitiveElement: "",
    constructivistElement: "",
    assessmentMethod: "",
    assessmentDescription: "",
    deliveryRisk: "",
    controlMeasure: "",
    finalKeyMessage: ""
  },
  updatedAt: ""
};

function mergeActivityData(value: Partial<ActivityData>): ActivityData {
  return {
    ...emptyActivityData,
    ...value,
    selectedMembers: Array.isArray(value.selectedMembers)
      ? value.selectedMembers
      : emptyActivityData.selectedMembers,
    roles: {
      ...emptyActivityData.roles,
      ...value.roles
    },
    behaviourist: {
      ...emptyActivityData.behaviourist,
      ...value.behaviourist,
      quizAnswers:
        value.behaviourist?.quizAnswers?.length === 5
          ? value.behaviourist.quizAnswers
          : emptyActivityData.behaviourist.quizAnswers
    },
    social: {
      ...emptyActivityData.social,
      ...value.social
    },
    constructivist: {
      ...emptyActivityData.constructivist,
      ...value.constructivist
    },
    design: {
      ...emptyActivityData.design,
      ...value.design
    }
  };
}

export function loadActivityData(): ActivityData {
  if (typeof window === "undefined") {
    return emptyActivityData;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyActivityData;
    }
    return mergeActivityData(JSON.parse(raw) as Partial<ActivityData>);
  } catch {
    return emptyActivityData;
  }
}

export function saveActivityData(data: ActivityData): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...data, updatedAt: new Date().toISOString() })
  );
}

export function resetActivityData(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(STEP_STORAGE_KEY);
}

export function loadCurrentStep(): StepKey {
  if (typeof window === "undefined") {
    return "welcome";
  }

  const raw = window.localStorage.getItem(STEP_STORAGE_KEY);
  return raw && validSteps.includes(raw as StepKey) ? (raw as StepKey) : "welcome";
}

export function saveCurrentStep(step: StepKey): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STEP_STORAGE_KEY, step);
}
