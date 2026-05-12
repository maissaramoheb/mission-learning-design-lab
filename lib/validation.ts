import type { ActivityData } from "@/types/activity";

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

export function isGroupSetupValid(data: ActivityData): boolean {
  return (
    hasText(data.groupName) &&
    data.selectedMembers.length >= 2 &&
    hasText(data.roles.leadFacilitator) &&
    hasText(data.roles.presenter)
  );
}

function getLearningMissingFields(data: ActivityData): string[] {
  const missing: string[] = [];

  if (!hasText(data.groupName)) missing.push("group name");
  if (data.selectedMembers.length < 2) missing.push("at least 2 group members");
  if (!hasText(data.roles.leadFacilitator)) missing.push("Lead Facilitator role");
  if (!hasText(data.roles.presenter)) missing.push("Presenter role");
  if (!hasText(data.design.smartObjective)) missing.push("SMART objective");
  if (!hasText(data.design.behaviouristElement)) missing.push("behaviourist element");
  if (!hasText(data.design.socialCognitiveElement)) {
    missing.push("social cognitive element");
  }
  if (!hasText(data.design.constructivistElement)) {
    missing.push("constructivist element");
  }
  if (!hasText(data.design.assessmentMethod)) missing.push("assessment method");

  return missing;
}

function getEvaluationMissingFields(data: ActivityData): string[] {
  const missing: string[] = [];

  if (!hasText(data.groupName)) missing.push("group name");
  if (data.selectedMembers.length < 2) missing.push("at least 2 group members");
  if (!hasText(data.roles.leadFacilitator)) missing.push("Evaluation Lead role");
  if (!hasText(data.roles.presenter)) missing.push("Presenter / Briefer role");
  if (!hasText(data.evaluationDesign.trainingTopic)) missing.push("training topic");
  if (!hasText(data.evaluationDesign.originalLearningObjective)) {
    missing.push("original learning objective");
  }
  if (!hasText(data.evaluationDesign.applicationObjective)) {
    missing.push("Level 3 application objective");
  }
  if (!hasText(data.evaluationDesign.mainSurveyQuestion)) {
    missing.push("main Level 3 survey question");
  }
  if (!hasText(data.evaluationDesign.actionChecklist)) missing.push("action checklist");
  if (!hasText(data.evaluationDesign.confidenceQuestion)) {
    missing.push("confidence question");
  }
  if (!hasText(data.evaluationDesign.frequencyQuestion)) {
    missing.push("frequency question");
  }
  if (!hasText(data.evaluationDesign.barriersQuestion)) {
    missing.push("barriers question");
  }
  if (!hasText(data.evaluationDesign.openEvidenceQuestion)) {
    missing.push("open-ended evidence question");
  }
  if (!hasText(data.evaluationDesign.additionalEvidenceMethods)) {
    missing.push("additional evidence methods");
  }
  if (!hasText(data.evaluationDesign.targetScore)) missing.push("target score");
  if (!hasText(data.evaluationDesign.followUpAction)) missing.push("follow-up action");

  return missing;
}

export function getPresentationMissingFields(data: ActivityData): string[] {
  return data.mode === "evaluation"
    ? getEvaluationMissingFields(data)
    : getLearningMissingFields(data);
}

export function isPresentationReady(data: ActivityData): boolean {
  return isGroupSetupValid(data) && getPresentationMissingFields(data).length === 0;
}
