"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { ActivityData, Choice } from "@/types/activity";
import { Badge, FieldShell, TextArea } from "@/components/FormElements";
import { cn } from "@/lib/utils";

type BehaviouristPhaseProps = {
  data: ActivityData;
  updateData: (patch: Partial<ActivityData>) => void;
};

const statements: Array<{
  statement: string;
  answer: Choice;
  feedback: string;
}> = [
  {
    statement: "A suspicious object should be moved away quickly to protect civilians.",
    answer: "Needs Improvement",
    feedback:
      "Moving a suspicious object may increase risk. Personnel should secure, cordon, report, and follow mission SOPs."
  },
  {
    statement: "A witness interview should start with open questions.",
    answer: "Correct",
    feedback:
      "Open questions reduce leading and allow the witness to explain events in their own words."
  },
  {
    statement: "If the community is angry, the patrol should avoid all engagement.",
    answer: "Needs Improvement",
    feedback:
      "Avoidance may worsen mistrust. Engagement must be safe, respectful, coordinated, and context-sensitive."
  },
  {
    statement: "A patrol report should separate facts from assumptions.",
    answer: "Correct",
    feedback:
      "Clear reporting distinguishes observed facts, witness claims, and officer assessment."
  },
  {
    statement: "The trainer can assume senior officers already know the basics.",
    answer: "Needs Improvement",
    feedback:
      "Seniority does not guarantee shared baseline knowledge. A good trainer checks assumptions."
  }
];

function reinforcementFor(answer: Choice) {
  return answer === "Correct"
    ? "Correct. Clear, fast, and evidence-based."
    : "Needs improvement. The intention may be good, but the action increases risk.";
}

export function BehaviouristPhase({ data, updateData }: BehaviouristPhaseProps) {
  const answers = data.behaviourist.quizAnswers;
  const answeredCount = answers.filter(Boolean).length;
  const score = answers.reduce((total, answer, index) => {
    return answer === statements[index].answer ? total + 1 : total;
  }, 0);

  const chooseAnswer = (index: number, answer: Choice) => {
    const nextAnswers = [...answers];
    nextAnswers[index] = answer;
    updateData({
      behaviourist: {
        ...data.behaviourist,
        quizAnswers: nextAnswers
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>Behaviourist</Badge>
          <h2 className="mt-3 text-3xl font-bold text-navy-900">
            Phase 1 — Behaviourist Learning: Rules Under Pressure
          </h2>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
            Behaviourist learning works well when the trainer needs clear rules,
            correct responses, repetition, correction, and reinforcement.
          </p>
        </div>
        <div className="rounded-xl border border-field-border bg-field-mist px-4 py-3">
          <p className="text-sm font-bold uppercase text-un-blue">Immediate feedback</p>
          <p className="text-2xl font-bold text-navy-900">
            {score}/{answeredCount || 5}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {statements.map((item, index) => {
          const selected = answers[index];
          const isAnswered = selected !== "";
          const isRight = selected === item.answer;

          return (
            <article
              key={item.statement}
              className="rounded-2xl border border-field-border bg-white p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-4xl">
                  <p className="text-sm font-bold uppercase text-un-blue">
                    Statement {index + 1}
                  </p>
                  <p className="mt-2 text-xl font-bold leading-8 text-navy-900">
                    “{item.statement}”
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {(["Correct", "Needs Improvement"] as Choice[]).map((answer) => (
                    <button
                      type="button"
                      key={answer}
                      onClick={() => chooseAnswer(index, answer)}
                      className={cn(
                        "rounded-lg border px-4 py-3 font-bold transition",
                        selected === answer
                          ? "border-un-blue bg-un-light text-navy-900 ring-2 ring-un-line"
                          : "border-field-border bg-white text-slate-700 hover:border-un-blue"
                      )}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>

              {isAnswered ? (
                <div
                  className={cn(
                    "mt-4 rounded-xl border p-4",
                    isRight
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-amber-200 bg-amber-50"
                  )}
                >
                  <div className="flex gap-3">
                    {isRight ? (
                      <CheckCircle2 className="mt-1 text-emerald-700" size={22} aria-hidden />
                    ) : (
                      <XCircle className="mt-1 text-amber-700" size={22} aria-hidden />
                    )}
                    <div>
                      <p className="text-lg font-bold text-navy-900">
                        {reinforcementFor(item.answer)}
                      </p>
                      <p className="mt-1 text-lg leading-8 text-slate-700">
                        {item.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="rounded-2xl border border-un-line bg-un-light p-6">
        <div className="flex items-center gap-3">
          <RotateCcw className="text-un-blue" size={24} aria-hidden />
          <h3 className="text-2xl font-bold text-navy-900">
            Convert this into your mini-training
          </h3>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <FieldShell label="What rule, fact, or right/wrong item will you teach clearly?">
            <TextArea
              value={data.behaviourist.ruleItem}
              onChange={(ruleItem) =>
                updateData({
                  behaviourist: { ...data.behaviourist, ruleItem }
                })
              }
              placeholder="Example: Officers must separate observed facts from assumptions in patrol reporting."
            />
          </FieldShell>
          <FieldShell label="How will you reinforce correct performance?">
            <TextArea
              value={data.behaviourist.reinforcement}
              onChange={(reinforcement) =>
                updateData({
                  behaviourist: { ...data.behaviourist, reinforcement }
                })
              }
              placeholder="Example: Immediate correction during a quick scenario drill."
            />
          </FieldShell>
        </div>
      </div>
    </div>
  );
}
