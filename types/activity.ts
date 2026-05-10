export type StepKey =
  | "welcome"
  | "setup"
  | "scenario"
  | "behaviourist"
  | "social"
  | "constructivist"
  | "builder"
  | "presentation"
  | "export";

export type Choice = "Correct" | "Needs Improvement";

export type MemberCount = string;

export type Roles = {
  leadFacilitator: string;
  rolePlayer: string;
  observerEvaluator: string;
  rapporteur: string;
  presenter: string;
};

export type BehaviouristResponse = {
  quizAnswers: Array<Choice | "">;
  ruleItem: string;
  reinforcement: string;
};

export type SocialCognitiveResponse = {
  whatWentWrong: string[];
  demonstratedBehaviour: string;
  rolePlayerAction: string;
  observerChecklist: string[];
  feedbackApproach: string;
};

export type ConstructivistResponse = {
  mainProblem: string;
  actors: string[];
  otherActor: string;
  scenarioQuestion: string;
  groupTask: string;
  outputs: string[];
  otherOutput: string;
  expectedLearningPoint: string;
};

export type TrainingDesign = {
  title: string;
  targetAudience: string;
  smartObjective: string;
  behaviouristElement: string;
  socialCognitiveElement: string;
  constructivistElement: string;
  assessmentMethod: string;
  assessmentDescription: string;
  deliveryRisk: string;
  controlMeasure: string;
  finalKeyMessage: string;
};

export type ActivityData = {
  groupName: string;
  memberCount: MemberCount;
  selectedMembers: string[];
  roles: Roles;
  trainingGap: string;
  behaviourist: BehaviouristResponse;
  social: SocialCognitiveResponse;
  constructivist: ConstructivistResponse;
  design: TrainingDesign;
  updatedAt: string;
};

export type StepDefinition = {
  key: StepKey;
  label: string;
  shortLabel: string;
};
