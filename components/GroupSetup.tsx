"use client";

import {
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  ShieldAlert,
  UserRoundCheck,
  UsersRound
} from "lucide-react";
import { useState } from "react";
import type { ActivityData, Roles } from "@/types/activity";
import { FieldShell, SelectInput, TextInput } from "@/components/FormElements";
import { cn, toggleInArray } from "@/lib/utils";
import { isGroupSetupValid } from "@/lib/validation";
import { groupIdentities } from "@/lib/groupIdentity";

type GroupSetupProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const participantRoster = [
  "Brig. / Amr Abou Hassan",
  "Col. / Ahmed Ibrahim",
  "Col. / Mohamed Abdel Gayed",
  "Lt. Col. / Sherif Makawy",
  "Lt. Col. / Mina Bekhit",
  "Lt. Col. / Mahmoud Soliman",
  "Lt. Col. / Ayman Ibrahim",
  "Maj. / Manar Ashraf",
  "Col. / Mohamed Abdel Dayem",
  "Maj. / Madonna Magdy",
  "Col. / Sayed Abd Elghany",
  "Lt. Col. / Ahmed Abdo",
  "Lt. Col. / Moamen Talaat",
  "Lt. Col. / Mahmoud Ramadan",
  "Lt. Col. / Ahmed Gaber",
  "Maj. / Shady Ashraf"
];

function generateBalancedGroups(count: 3 | 4, roster: string[]): string[][] {
  const shuffled = [...roster];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (count === 3) {
    return [
      shuffled.slice(0, 6),
      shuffled.slice(6, 11),
      shuffled.slice(11, 16)
    ];
  }
  return [
    shuffled.slice(0, 4),
    shuffled.slice(4, 8),
    shuffled.slice(8, 12),
    shuffled.slice(12, 16)
  ];
}

type RoleDescriptor = {
  key: keyof Roles;
  label: string;
  helper: string;
  required?: boolean;
};

const rolesByMode: Record<ActivityData["mode"], RoleDescriptor[]> = {
  learning: [
    {
      key: "leadFacilitator",
      label: "Lead Facilitator",
      helper: "Keeps the group focused and manages discussion.",
      required: true
    },
    {
      key: "rolePlayer",
      label: "Role-player",
      helper: "Performs the short demonstration or scenario role."
    },
    {
      key: "observerEvaluator",
      label: "Observer / Evaluator",
      helper: "Checks whether the activity uses the learning theory correctly."
    },
    {
      key: "rapporteur",
      label: "Rapporteur",
      helper: "Captures group decisions in the app."
    },
    {
      key: "presenter",
      label: "Presenter",
      helper: "Delivers the final group presentation.",
      required: true
    }
  ],
  evaluation: [
    {
      key: "leadFacilitator",
      label: "Evaluation Lead",
      helper: "Keeps the group focused on credible Level 3 design.",
      required: true
    },
    {
      key: "rolePlayer",
      label: "Application Objective Writer",
      helper: "Drafts the workplace application objective."
    },
    {
      key: "observerEvaluator",
      label: "Survey Designer",
      helper: "Shapes questions that measure transfer into job behaviour."
    },
    {
      key: "rapporteur",
      label: "Evidence / Data Collection Officer",
      helper: "Captures non-survey evidence methods, targets, and barriers."
    },
    {
      key: "presenter",
      label: "Presenter / Briefer",
      helper: "Delivers the final Level 3 evaluation briefing.",
      required: true
    }
  ]
};

function cleanRolesForMembers(rolesValue: Roles, selectedMembers: string[]): Roles {
  return Object.fromEntries(
    Object.entries(rolesValue).map(([key, value]) => [
      key,
      selectedMembers.includes(value) ? value : ""
    ])
  ) as Roles;
}

export function GroupSetup({ data, updateData }: GroupSetupProps) {
  const [groupCountChoice, setGroupCountChoice] = useState<3 | 4>(3);
  const [generatedGroups, setGeneratedGroups] = useState<string[][] | null>(null);
  const selectedCount = data.selectedMembers.length;
  const roles = rolesByMode[data.mode];
  const leadRole = roles.find((role) => role.key === "leadFacilitator");
  const presenterRole = roles.find((role) => role.key === "presenter");
  const requiredMissing = {
    groupName: data.groupName.trim().length === 0,
    members: selectedCount < 3 || selectedCount > 6,
    lead: data.roles.leadFacilitator.trim().length === 0,
    presenter: data.roles.presenter.trim().length === 0
  };
  const recommendedMissing = roles.filter(
    (role) => !role.required && !data.roles[role.key]
  );

  const handleGenerateGroups = (count: 3 | 4 = groupCountChoice) => {
    setGeneratedGroups(generateBalancedGroups(count, participantRoster));
  };

  const handleSelectGroupCount = (count: 3 | 4) => {
    setGroupCountChoice(count);
    if (generatedGroups !== null) {
      setGeneratedGroups(generateBalancedGroups(count, participantRoster));
    }
  };

  const toggleMember = (member: string) => {
    const isSelected = data.selectedMembers.includes(member);
    if (!isSelected && data.selectedMembers.length >= 6) {
      return;
    }
    const selectedMembers = toggleInArray(data.selectedMembers, member);
    const memberCount = selectedMembers.length
      ? (String(Math.min(selectedMembers.length, 6)) as ActivityData["memberCount"])
      : "";

    updateData({
      selectedMembers,
      memberCount,
      roles: cleanRolesForMembers(data.roles, selectedMembers)
    });
  };

  const assignRole = (role: keyof Roles, value: string) => {
    updateData({
      roles: {
        ...data.roles,
        [role]: value
      }
    });
  };

  const applySuggestedGroup = (members: string[], index: number) => {
    const defaultName = groupIdentities[index]?.title ?? `Group ${index + 1}`;
    updateData({
      groupName: data.groupName.trim() ? data.groupName : defaultName,
      selectedMembers: members,
      memberCount: String(Math.min(members.length, 6)),
      roles: cleanRolesForMembers(data.roles, members)
    });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-3">
          <ShieldAlert className="mt-1 text-amber-700" size={24} aria-hidden />
          <div>
            <h3 className="text-xl font-bold text-navy-900">
              Local browser workspace
            </h3>
            <p className="mt-2 text-lg leading-8 text-slate-700">
              Open one workspace per group. Your work is saved only on this
              laptop/browser.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <FieldShell
            label="Group Name"
            helper="Required. Use Alpha, Bravo, Charlie, or Delta for the clearest group identity."
          >
            <TextInput
              value={data.groupName}
              onChange={(groupName) => updateData({ groupName })}
              placeholder="Alpha Team"
            />
          </FieldShell>
          <div className="flex flex-wrap gap-2">
            {groupIdentities.map((identity) => (
              <button
                key={identity.key}
                type="button"
                onClick={() => updateData({ groupName: identity.title })}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                  identity.tone,
                  data.groupName === identity.title && "ring-2 ring-un-line"
                )}
              >
                {identity.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-un-line bg-un-light p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <UsersRound className="mt-1 text-un-blue" size={24} aria-hidden />
            <div>
              <h3 className="text-xl font-bold text-navy-900">
                Facilitator group allocation
              </h3>
              <p className="mt-2 text-lg leading-8 text-slate-700">
                The facilitator divides the class into three or four groups. Each
                group selects its members from the roster on its own laptop.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-navy-900">
              Participant Roster
            </h3>
            <p className="mt-2 text-lg leading-8 text-slate-700">
              Select 3 to 6 members for this group.
            </p>
          </div>
          <div className="rounded-xl border border-field-border bg-field-mist px-4 py-3">
            <p className="text-sm font-bold uppercase text-un-blue">Selected</p>
            <p className="text-2xl font-bold text-navy-900">{selectedCount}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-field-border bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <Lightbulb className="mt-1 text-un-blue" size={22} aria-hidden />
            <div>
              <p className="font-bold text-navy-900">
                Facilitator testing/demo support
              </p>
              <p className="text-sm leading-6 text-slate-600">
                Generate balanced group suggestions from the built-in
                roster. Groups may still select members manually.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl border border-un-line bg-un-light p-1">
              <button
                type="button"
                onClick={() => handleSelectGroupCount(3)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-bold transition",
                  groupCountChoice === 3
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-navy-800 hover:text-navy-900"
                )}
                aria-pressed={groupCountChoice === 3}
              >
                3 Groups
              </button>
              <button
                type="button"
                onClick={() => handleSelectGroupCount(4)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-bold transition",
                  groupCountChoice === 4
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-navy-800 hover:text-navy-900"
                )}
                aria-pressed={groupCountChoice === 4}
              >
                4 Groups
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleGenerateGroups(groupCountChoice)}
              className="inline-flex items-center justify-center rounded-xl border border-un-line bg-un-light px-4 py-3 font-bold text-navy-900 transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md"
            >
              Generate Balanced Groups
            </button>
            {generatedGroups !== null ? (
              <button
                type="button"
                onClick={() => setGeneratedGroups(null)}
                className="inline-flex items-center justify-center rounded-xl border border-field-border bg-white px-3 py-3 text-sm font-semibold text-slate-600 transition hover:border-un-line hover:text-navy-900"
              >
                Hide
              </button>
            ) : null}
          </div>
        </div>

        {generatedGroups !== null ? (
          <div
            className={cn(
              "mt-4 grid gap-3",
              generatedGroups.length === 4
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "lg:grid-cols-3"
            )}
          >
            {generatedGroups.map((members, index) => {
              const identity = groupIdentities[index];
              const groupTitle = identity?.title ?? `Group ${index + 1}`;
              return (
                <article
                  key={`suggested-group-${identity?.key ?? index + 1}`}
                  className="flex flex-col justify-between rounded-2xl border border-un-line bg-un-light p-4 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold uppercase text-un-blue">
                        {groupTitle}
                      </p>
                      <span className="rounded-full border border-un-line bg-white px-2 py-0.5 text-xs font-bold text-slate-700">
                        {members.length} members
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-base font-semibold leading-7 text-navy-900">
                      {members.map((member) => (
                        <li key={member}>{member}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => applySuggestedGroup(members, index)}
                    className="mt-4 w-full rounded-xl bg-navy-900 px-4 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-md"
                  >
                    Use this group
                  </button>
                </article>
              );
            })}
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {participantRoster.map((member) => {
            const selected = data.selectedMembers.includes(member);
            const disabled = !selected && selectedCount >= 6;
            return (
              <button
                type="button"
                key={member}
                onClick={() => toggleMember(member)}
                disabled={disabled}
                className={cn(
                  "flex min-h-[92px] items-start gap-3 rounded-2xl border px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                  selected
                    ? "border-un-blue bg-un-light text-navy-900 ring-2 ring-un-line"
                    : disabled
                    ? "cursor-not-allowed border-field-border bg-slate-50 text-slate-400 opacity-60 hover:translate-y-0 hover:shadow-none"
                    : "border-field-border bg-white text-slate-700 hover:border-un-line"
                )}
                aria-pressed={selected}
              >
                <span
                  className={cn(
                    "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                    selected
                      ? "border-un-blue bg-un-blue text-white"
                      : "border-field-border bg-white"
                  )}
                >
                  {selected ? <CheckCircle2 size={16} aria-hidden /> : null}
                </span>
                <span className="text-lg font-bold leading-7">{member}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-2xl border border-field-border bg-field-mist p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <UserRoundCheck className="text-un-blue" size={24} aria-hidden />
            <h3 className="text-2xl font-bold text-navy-900">Selected Group</h3>
          </div>
          {selectedCount > 0 ? (
            <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-800">
              {data.selectedMembers.map((member) => (
                <li key={member} className="flex gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-un-blue" />
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-lg leading-8 text-slate-600">
              No members selected yet.
            </p>
          )}
        </article>

        <article className="rounded-2xl border border-field-border bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-bold text-navy-900">Role Assignment</h3>
          <p className="mt-2 text-lg leading-8 text-slate-700">
            {leadRole?.label ?? "Lead role"} and {presenterRole?.label ?? "Presenter role"}{" "}
            are required. Other roles are recommended but not mandatory. One
            person may hold more than one role when the group has fewer than
            five members.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <FieldShell
                key={role.key}
                label={`${role.label}${role.required ? " *" : ""}`}
                helper={role.helper}
              >
                <SelectInput
                  value={data.roles[role.key]}
                  onChange={(value) => assignRole(role.key, value)}
                >
                  <option value="">
                    {selectedCount > 0
                      ? `Select ${role.label}`
                      : "Select group members first"}
                  </option>
                  {data.selectedMembers.map((member) => (
                    <option key={`${role.key}-${member}`} value={member}>
                      {member}
                    </option>
                  ))}
                </SelectInput>
              </FieldShell>
            ))}
          </div>
        </article>
      </section>

      <section
        className={cn(
          "rounded-2xl border p-5",
          isGroupSetupValid(data)
            ? "border-emerald-200 bg-emerald-50"
            : "border-amber-200 bg-amber-50"
        )}
      >
        <div className="flex gap-3">
          {isGroupSetupValid(data) ? (
            <CheckCircle2 className="mt-1 text-emerald-700" size={24} aria-hidden />
          ) : (
            <AlertCircle className="mt-1 text-amber-700" size={24} aria-hidden />
          )}
          <div>
            <h3 className="text-xl font-bold text-navy-900">
              {isGroupSetupValid(data) ? "Group setup complete" : "Complete required setup"}
            </h3>
            <ul className="mt-3 space-y-2 text-lg leading-8 text-slate-800">
              <li>
                {requiredMissing.groupName ? "Required: enter a group name." : "Group name entered."}
              </li>
              <li>
                {requiredMissing.members
                  ? "Required: select 3 to 6 group members."
                  : `Selected members: ${selectedCount}.`}
              </li>
              <li>
                {requiredMissing.lead
                  ? `Required: assign ${leadRole?.label ?? "the lead role"}.`
                  : `${leadRole?.label ?? "Lead role"}: ${data.roles.leadFacilitator}.`}
              </li>
              <li>
                {requiredMissing.presenter
                  ? `Required: assign ${presenterRole?.label ?? "the presenter role"}.`
                  : `${presenterRole?.label ?? "Presenter role"}: ${data.roles.presenter}.`}
              </li>
              {recommendedMissing.length > 0 ? (
                <li>
                  Recommended: assign{" "}
                  {recommendedMissing.map((role) => role.label).join(", ")} if
                  group size allows.
                </li>
              ) : (
                <li>Recommended roles are assigned.</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
