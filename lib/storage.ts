import type { ActivityData, EvidenceMethodDetail, StepKey } from "@/types/activity";

export const STORAGE_KEY = "mission-learning-design-lab:v2";
export const STEP_STORAGE_KEY = "mission-learning-design-lab:step:v2";
const LEGACY_STORAGE_KEY = "mission-learning-design-lab:v1";
const LEGACY_STEP_STORAGE_KEY = "mission-learning-design-lab:step:v1";

const validSteps: StepKey[] = [
  "welcome",
  "setup",
  "scenario",
  "behaviourist",
  "social",
  "constructivist",
  "application",
  "survey",
  "evidence",
  "targets",
  "builder",
  "presentation",
  "export"
];

const emptyEvidenceMethodDetail: EvidenceMethodDetail = {
  evidenceCollected: "",
  evidenceProvider: "",
  collectionTiming: "",
  questionAsked: ""
};

export const emptyActivityData: ActivityData = {
  mode: "learning",
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
  scenarioTrainingGap: "",
  application: {
    originalLearningObjective:
      "By the end of the session, participants will identify protection threats and explain appropriate UNPOL response options.",
    workplaceContext: "",
    observableBehaviour: "",
    timeframe: "Within three months of deployment",
    applicationObjective: ""
  },
  survey: {
    mainApplicationQuestion:
      "Were you able to apply the POC response options learned during the training in your mission duties?",
    actionOptions: ["", "", "", ""],
    confidenceQuestion:
      "How confident were you in applying these skills on the job?",
    frequencyQuestion:
      "How often have you applied these skills since the training?",
    barriersQuestion:
      "If no or not yet, what barriers prevented application?",
    barrierOptions: ["", "", "", ""],
    openEvidenceQuestion:
      "Please describe one example where you applied or attempted to apply the learning."
  },
  evidence: {
    selectedMethods: [],
    methodDetails: {}
  },
  targets: {
    targetScore:
      "At least 80% of participants report applying the skill within three months.",
    confidenceTarget: "Average confidence score of 4/5 or above.",
    transferTarget:
      "At least 60% report sharing or transferring knowledge to colleagues.",
    enablers: [],
    barriers: [],
    followUpAction: ""
  },
  evaluationDesign: {
    trainingTopic: "Protection of Civilians by UN Police",
    originalLearningObjective:
      "By the end of the session, participants will identify protection threats and explain appropriate UNPOL response options.",
    applicationObjective: "",
    mainSurveyQuestion: "",
    actionChecklist: "",
    confidenceQuestion: "",
    frequencyQuestion: "",
    barriersQuestion: "",
    barrierOptions: "",
    openEvidenceQuestion: "",
    additionalEvidenceMethods: "",
    targetScore: "",
    confidenceTarget: "",
    transferTarget: "",
    enablers: "",
    barriers: "",
    followUpAction: "",
    finalMessage:
      "Level 3 evaluation proves whether learning became workplace behaviour."
  },
  updatedAt: ""
};

function normalizeStringArray(value: unknown, fallbackLength = 0): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item : ""));
  }

  return Array.from({ length: fallbackLength }, () => "");
}

function normalizeMethodDetails(
  value: unknown
): Record<string, EvidenceMethodDetail> {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, Partial<EvidenceMethodDetail>>).map(
      ([key, detail]) => [
        key,
        {
          ...emptyEvidenceMethodDetail,
          ...detail
        }
      ]
    )
  );
}

function mergeActivityData(value: Partial<ActivityData>): ActivityData {
  return {
    ...emptyActivityData,
    ...value,
    mode: value.mode === "evaluation" ? "evaluation" : "learning",
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
    },
    application: {
      ...emptyActivityData.application,
      ...value.application
    },
    survey: {
      ...emptyActivityData.survey,
      ...value.survey,
      actionOptions: normalizeStringArray(
        value.survey?.actionOptions,
        emptyActivityData.survey.actionOptions.length
      ),
      barrierOptions: normalizeStringArray(
        value.survey?.barrierOptions,
        emptyActivityData.survey.barrierOptions.length
      )
    },
    evidence: {
      ...emptyActivityData.evidence,
      ...value.evidence,
      selectedMethods: normalizeStringArray(value.evidence?.selectedMethods),
      methodDetails: normalizeMethodDetails(value.evidence?.methodDetails)
    },
    targets: {
      ...emptyActivityData.targets,
      ...value.targets,
      enablers: normalizeStringArray(value.targets?.enablers),
      barriers: normalizeStringArray(value.targets?.barriers)
    },
    evaluationDesign: {
      ...emptyActivityData.evaluationDesign,
      ...value.evaluationDesign
    }
  };
}

export function loadActivityData(): ActivityData {
  if (typeof window === "undefined") {
    return emptyActivityData;
  }

  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_STORAGE_KEY);
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
  window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_STEP_STORAGE_KEY);
}

export function loadCurrentStep(): StepKey {
  if (typeof window === "undefined") {
    return "welcome";
  }

  const raw =
    window.localStorage.getItem(STEP_STORAGE_KEY) ??
    window.localStorage.getItem(LEGACY_STEP_STORAGE_KEY);
  return raw && validSteps.includes(raw as StepKey) ? (raw as StepKey) : "welcome";
}

export function saveCurrentStep(step: StepKey): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STEP_STORAGE_KEY, step);
}
