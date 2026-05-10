export const groupIdentities = [
  {
    key: "alpha",
    label: "Alpha",
    title: "Alpha Team",
    tone: "border-un-line bg-un-light text-navy-900"
  },
  {
    key: "bravo",
    label: "Bravo",
    title: "Bravo Team",
    tone: "border-[#B9C6D8] bg-[#EEF3F8] text-navy-900"
  },
  {
    key: "charlie",
    label: "Charlie",
    title: "Charlie Team",
    tone: "border-[#AFC4D2] bg-[#E8F1F5] text-navy-900"
  }
] as const;

export function getGroupIdentity(groupName: string) {
  const normalized = groupName.trim().toLowerCase();

  return (
    groupIdentities.find(
      (identity) =>
        normalized.includes(identity.key) ||
        normalized.includes(identity.label.toLowerCase())
    ) ?? null
  );
}
