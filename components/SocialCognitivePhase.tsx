"use client";

import { MessageSquareWarning, UserCheck } from "lucide-react";
import type { ActivityData } from "@/types/activity";
import {
  Badge,
  FieldShell,
  OptionToggle,
  TextArea
} from "@/components/FormElements";
import { toggleInArray } from "@/lib/utils";

type SocialCognitivePhaseProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const problemOptions = [
  "Leading question",
  "Rushed the witness",
  "Interrupted the witness",
  "Made a promise",
  "Failed to confirm understanding",
  "Weak respect / weak listening"
];

const observerOptions = [
  "Open questions",
  "Respectful tone",
  "One question at a time",
  "No leading questions",
  "No false promises",
  "Confirms understanding",
  "Separates facts from assumptions"
];

export function SocialCognitivePhase({
  data,
  updateData
}: SocialCognitivePhaseProps) {
  const updateSocial = (patch: Partial<ActivityData["social"]>) => {
    updateData({
      social: {
        ...data.social,
        ...patch
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <Badge>Social Cognitive</Badge>
        <h2 className="mt-3 text-3xl font-bold text-navy-900">
          Phase 2 — Social Cognitive Learning: Watch, Practice, Improve
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
          Social cognitive learning works well for skills. Learners observe a
          model, practice the behaviour, and receive feedback.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <MessageSquareWarning className="text-amber-700" size={24} aria-hidden />
            <h3 className="text-2xl font-bold text-navy-900">
              Bad interview sample
            </h3>
          </div>
          <div className="space-y-4 text-lg leading-8 text-slate-800">
            <p>
              <strong>Officer:</strong> “You saw the armed men coming from the
              market road, correct? We already know they threatened people, so
              just confirm what happened quickly. Don’t worry, we will protect you.”
            </p>
            <p>
              <strong>Witness:</strong> “I am not sure... I heard something but...”
            </p>
            <p>
              <strong>Officer:</strong> “Please answer directly. Did they threaten
              the women near the checkpoint or not?”
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-field-border bg-white p-6">
          <h3 className="text-2xl font-bold text-navy-900">
            What went wrong? Select all that apply.
          </h3>
          <p className="mt-2 text-base text-slate-600">All options are correct.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {problemOptions.map((option) => (
              <OptionToggle
                key={option}
                label={option}
                selected={data.social.whatWentWrong.includes(option)}
                onClick={() =>
                  updateSocial({
                    whatWentWrong: toggleInArray(data.social.whatWentWrong, option)
                  })
                }
              />
            ))}
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-un-line bg-un-light p-6">
        <div className="mb-4 flex items-center gap-3">
          <UserCheck className="text-un-blue" size={24} aria-hidden />
          <h3 className="text-2xl font-bold text-navy-900">Improved model</h3>
        </div>
        <p className="text-xl leading-9 text-navy-900">
          <strong>Officer:</strong> “Thank you for speaking with us. Please tell me,
          in your own words, what happened from the beginning. Take your time. I
          may ask follow-up questions to understand clearly.”
        </p>
        <ul className="mt-5 grid gap-3 text-lg leading-8 text-slate-700 md:grid-cols-2">
          <li>Where were you when this happened?</li>
          <li>What did you see directly?</li>
          <li>What did you hear from others?</li>
          <li>Can I repeat what I understood to confirm accuracy?</li>
        </ul>
      </article>

      <section className="rounded-2xl border border-field-border bg-white p-6">
        <h3 className="text-2xl font-bold text-navy-900">
          Design your short demonstration or role-play
        </h3>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <FieldShell label="1. What behaviour will you demonstrate?">
            <TextArea
              value={data.social.demonstratedBehaviour}
              onChange={(demonstratedBehaviour) =>
                updateSocial({ demonstratedBehaviour })
              }
              placeholder="Example: respectful questioning of a civilian witness."
            />
          </FieldShell>
          <FieldShell label="2. What will the role-player do?">
            <TextArea
              value={data.social.rolePlayerAction}
              onChange={(rolePlayerAction) => updateSocial({ rolePlayerAction })}
              placeholder="Example: act as a nervous witness from the IDP settlement."
            />
          </FieldShell>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-bold text-navy-900">
            3. What will observers look for?
          </h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {observerOptions.map((option) => (
              <OptionToggle
                key={option}
                label={option}
                selected={data.social.observerChecklist.includes(option)}
                onClick={() =>
                  updateSocial({
                    observerChecklist: toggleInArray(
                      data.social.observerChecklist,
                      option
                    )
                  })
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <FieldShell label="4. What feedback will you give?">
            <TextArea
              value={data.social.feedbackApproach}
              onChange={(feedbackApproach) => updateSocial({ feedbackApproach })}
              placeholder="Example: praise open questions, correct leading questions, ask interviewer to summarize facts."
            />
          </FieldShell>
        </div>
      </section>
    </div>
  );
}
