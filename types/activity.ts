export type AppMode = "learning" | "evaluation";

export type StepKey =
  | "welcome"
  | "setup"
  | "scenario"
  | "behaviourist"
  | "social"
  | "constructivist"
  | "application"
  | "survey"
  | "evidence"
  | "targets"
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

export type ApplicationObjectiveResponse = {
  originalLearningObjective: string;
  workplaceContext: string;
  observableBehaviour: string;
  timeframe: string;
  applicationObjective: string;
};

export type SurveyQuestionsResponse = {
  mainApplicationQuestion: string;
  actionOptions: string[];
  confidenceQuestion: string;
  frequencyQuestion: string;
  barriersQuestion: string;
  barrierOptions: string[];
  openEvidenceQuestion: string;
};

export type EvidenceMethodDetail = {
  evidenceCollected: string;
  evidenceProvider: string;
  collectionTiming: string;
  questionAsked: string;
};

export type EvidenceMethodsResponse = {
  selectedMethods: string[];
  methodDetails: Record<string, EvidenceMethodDetail>;
};

export type TargetsResponse = {
  targetScore: string;
  confidenceTarget: string;
  transferTarget: string;
  enablers: string[];
  barriers: string[];
  followUpAction: string;
};

export type EvaluationDesign = {
  trainingTopic: string;
  originalLearningObjective: string;
  applicationObjective: string;
  mainSurveyQuestion: string;
  actionChecklist: string;
  confidenceQuestion: string;
  frequencyQuestion: string;
  barriersQuestion: string;
  barrierOptions: string;
  openEvidenceQuestion: string;
  additionalEvidenceMethods: string;
  targetScore: string;
  confidenceTarget: string;
  transferTarget: string;
  enablers: string;
  barriers: string;
  followUpAction: string;
  finalMessage: string;
};

export type ActivityData = {
  mode: AppMode;
  groupName: string;
  memberCount: MemberCount;
  selectedMembers: string[];
  roles: Roles;
  trainingGap: string;
  behaviourist: BehaviouristResponse;
  social: SocialCognitiveResponse;
  constructivist: ConstructivistResponse;
  design: TrainingDesign;
  scenarioTrainingGap: string;
  application: ApplicationObjectiveResponse;
  survey: SurveyQuestionsResponse;
  evidence: EvidenceMethodsResponse;
  targets: TargetsResponse;
  evaluationDesign: EvaluationDesign;
  updatedAt: string;
};

export type StepDefinition = {
  key: StepKey;
  label: string;
  shortLabel: string;
};
