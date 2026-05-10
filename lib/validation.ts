import type { ActivityData } from "@/types/activity";

export function isGroupSetupValid(data: ActivityData): boolean {
  return (
    data.groupName.trim().length > 0 &&
    data.selectedMembers.length >= 2 &&
    data.roles.leadFacilitator.trim().length > 0 &&
    data.roles.presenter.trim().length > 0
  );
}

export function getPresentationMissingFields(data: ActivityData): string[] {
  const missing: string[] = [];

  if (!data.groupName.trim()) {
    missing.push("group name");
  }
  if (data.selectedMembers.length < 2) {
    missing.push("at least 2 selected group members");
  }
  if (!data.roles.leadFacilitator.trim()) {
    missing.push("Lead Facilitator role");
  }
  if (!data.roles.presenter.trim()) {
    missing.push("Presenter role");
  }
  if (!data.design.smartObjective.trim()) {
    missing.push("SMART objective");
  }
  if (!data.design.behaviouristElement.trim()) {
    missing.push("behaviourist element");
  }
  if (!data.design.socialCognitiveElement.trim()) {
    missing.push("social cognitive element");
  }
  if (!data.design.constructivistElement.trim()) {
    missing.push("constructivist element");
  }
  if (!data.design.assessmentMethod.trim()) {
    missing.push("assessment method");
  }

  return missing;
}

export function isPresentationReady(data: ActivityData): boolean {
  return isGroupSetupValid(data) && getPresentationMissingFields(data).length === 0;
}
