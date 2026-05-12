"use client";

import { ArrowLeft, ArrowRight, Clock3, FileDown, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ActivityData } from "@/types/activity";
import { Timer } from "@/components/Timer";
import { cn } from "@/lib/utils";
import { PREPARED_BY, modeContent } from "@/lib/constants";
import { getGroupIdentity } from "@/lib/groupIdentity";

type PresentationModeProps = {
  data: ActivityData;
  onExit: () => void;
  onSummary: () => void;
};

type Slide = {
  title: string;
  kicker?: string;
  content: Array<{ label?: string; value: string | string[] }>;
};

function valueOrFallback(value: string, fallback: string) {
  return value.trim() ? value : fallback;
}

function listOrFallback(values: string[], fallback: string) {
  return values.length > 0 ? values : [fallback];
}

function splitLines(value: string, fallback: string) {
  const entries = value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
  return entries.length > 0 ? entries : [fallback];
}

function buildLearningSlides(data: ActivityData): Slide[] {
  const content = modeContent.learning;

  return [
    {
      title: content.appTitle,
      kicker: content.presentationTitleLine,
      content: [
        {
          label: "Group",
          value: valueOrFallback(data.groupName, "Group Presentation")
        },
        {
          label: "Training title",
          value: valueOrFallback(
            data.design.title,
            "First Response Near an IDP Settlement"
          )
        },
        {
          label: "Target audience",
          value: valueOrFallback(
            data.design.targetAudience,
            "Newly deployed UN Police officers"
          )
        },
        {
          label: "Credit",
          value: PREPARED_BY
        }
      ]
    },
    {
      title: "Mission Scenario Summary",
      kicker: "Patrol Near an IDP Settlement",
      content: [
        {
          value:
            "UN Police patrols face safety indicators, weak reporting, community mistrust, and tension near an IDP settlement."
        },
        {
          label: "Main training gap",
          value: valueOrFallback(
            data.trainingGap,
            "A consistent training response is needed for safety, respectful engagement, reporting, and trust-building."
          )
        }
      ]
    },
    {
      title: "SMART Learning Objective",
      kicker: "Objective-led design",
      content: [
        {
          value: `By the end of this 15-minute mini-training, participants will be able to ${valueOrFallback(
            data.design.smartObjective,
            "identify safety indicators, demonstrate respectful witness questioning, and propose a community-sensitive response."
          )}`
        }
      ]
    },
    {
      title: "Behaviourist Element",
      kicker: "Rules, correction, reinforcement",
      content: [
        {
          label: "Rule / right-wrong item",
          value: valueOrFallback(
            data.design.behaviouristElement || data.behaviourist.ruleItem,
            "Officers must separate observed facts from assumptions in patrol reporting."
          )
        },
        {
          label: "Reinforcement method",
          value: valueOrFallback(
            data.behaviourist.reinforcement,
            "Use immediate correction during a quick scenario drill."
          )
        }
      ]
    },
    {
      title: "Social Cognitive Element",
      kicker: "Model, practice, feedback",
      content: [
        {
          label: "Demonstration / role-play",
          value: valueOrFallback(
            data.design.socialCognitiveElement || data.social.demonstratedBehaviour,
            "Demonstrate respectful questioning of a civilian witness."
          )
        },
        {
          label: "Observer checklist",
          value: listOrFallback(
            data.social.observerChecklist,
            "Open questions, respectful tone, one question at a time."
          )
        },
        {
          label: "Feedback approach",
          value: valueOrFallback(
            data.social.feedbackApproach,
            "Praise effective questioning, correct leading questions, and require an accurate summary."
          )
        }
      ]
    },
    {
      title: "Constructivist Element",
      kicker: "Scenario, experience, group-built solution",
      content: [
        {
          label: "Scenario question",
          value: valueOrFallback(
            data.constructivist.scenarioQuestion,
            "How should the patrol respond in the first 30 minutes without increasing risk or damaging community trust?"
          )
        },
        {
          label: "Group task",
          value: valueOrFallback(
            data.constructivist.groupTask,
            "Propose a patrol response plan covering safety, engagement, reporting, and coordination."
          )
        },
        {
          label: "Expected output",
          value: listOrFallback(
            data.constructivist.outputs,
            "Patrol response plan"
          )
        }
      ]
    },
    {
      title: "Assessment Method",
      kicker: "Evidence of learning",
      content: [
        {
          label: "Method",
          value: valueOrFallback(data.design.assessmentMethod, "combined method")
        },
        {
          label: "How learning will be checked",
          value: valueOrFallback(
            data.design.assessmentDescription,
            "Observe role-play performance and review each group’s response logic against the objective."
          )
        }
      ]
    },
    {
      title: "Risk and Control Measure",
      kicker: "Training room discipline",
      content: [
        {
          label: "Main risk",
          value: valueOrFallback(data.design.deliveryRisk, "time overrun")
        },
        {
          label: "Control measure",
          value: valueOrFallback(
            data.design.controlMeasure,
            "Assign roles, use strict time, and keep the output focused on training design."
          )
        }
      ]
    },
    {
      title: "Final Key Message",
      kicker: "Training design principle",
      content: [
        {
          value: valueOrFallback(
            data.design.finalKeyMessage,
            "Facts need clarity. Skills need modelling. Complex mission problems need judgment."
          )
        }
      ]
    }
  ];
}

function buildEvaluationSlides(data: ActivityData): Slide[] {
  const content = modeContent.evaluation;

  return [
    {
      title: content.appTitle,
      kicker: content.presentationTitleLine,
      content: [
        {
          label: "Group",
          value: valueOrFallback(data.groupName, "Evaluation Design Team")
        },
        {
          label: "Training topic",
          value: valueOrFallback(
            data.evaluationDesign.trainingTopic,
            "Protection of Civilians by UN Police"
          )
        },
        {
          label: "Credit",
          value: content.productCredit
        }
      ]
    },
    {
      title: "Training Topic & Learning Objective",
      kicker: "Evaluation starting point",
      content: [
        {
          label: "Training topic",
          value: valueOrFallback(
            data.evaluationDesign.trainingTopic,
            "Protection of Civilians by UN Police"
          )
        },
        {
          label: "Original learning objective",
          value: valueOrFallback(
            data.evaluationDesign.originalLearningObjective,
            "Participants identify protection threats and explain appropriate UNPOL response options."
          )
        }
      ]
    },
    {
      title: "Level 3 Application Objective",
      kicker: "Observable workplace behaviour",
      content: [
        {
          value: valueOrFallback(
            data.evaluationDesign.applicationObjective,
            "Within three months of deployment, participants apply appropriate UNPOL response options, coordinate with relevant actors, and report protection concerns in accordance with mission procedures."
          )
        }
      ]
    },
    {
      title: "Level 3 Survey Architecture",
      kicker: "Application evidence questions",
      content: [
        {
          label: "Core survey items",
          value: [
            valueOrFallback(
              data.evaluationDesign.mainSurveyQuestion,
              "Were you able to apply the learning in your mission duties?"
            ),
            valueOrFallback(
              data.evaluationDesign.confidenceQuestion,
              "How confident were you in applying these skills?"
            ),
            valueOrFallback(
              data.evaluationDesign.frequencyQuestion,
              "How often have you applied these skills since training?"
            ),
            valueOrFallback(
              data.evaluationDesign.barriersQuestion,
              "What barriers prevented application?"
            ),
            valueOrFallback(
              data.evaluationDesign.openEvidenceQuestion,
              "Describe one example of application or attempted application."
            )
          ]
        },
        {
          label: "Action checklist",
          value: splitLines(
            data.evaluationDesign.actionChecklist,
            "Action checklist to be confirmed by the group."
          )
        }
      ]
    },
    {
      title: "Evidence Methods Beyond Survey",
      kicker: "Beyond self-report",
      content: [
        {
          value: splitLines(
            data.evaluationDesign.additionalEvidenceMethods,
            "Supervisor feedback, work sample review, or action-plan follow-up."
          )
        }
      ]
    },
    {
      title: "Targets and Success Criteria",
      kicker: "How success will be judged",
      content: [
        {
          label: "Target score",
          value: valueOrFallback(
            data.evaluationDesign.targetScore,
            "At least 80% report application within three months."
          )
        },
        {
          label: "Confidence target",
          value: valueOrFallback(
            data.evaluationDesign.confidenceTarget,
            "Average confidence score of 4/5 or above."
          )
        },
        {
          label: "Transfer target",
          value: valueOrFallback(
            data.evaluationDesign.transferTarget,
            "At least 60% report sharing or transferring knowledge to colleagues."
          )
        }
      ]
    },
    {
      title: "Barriers / Enablers / Risk to Transfer",
      kicker: "Transfer conditions",
      content: [
        {
          label: "Enablers",
          value: splitLines(
            data.evaluationDesign.enablers,
            "Supervisor support, opportunity to apply, clear SOPs."
          )
        },
        {
          label: "Barriers",
          value: splitLines(
            data.evaluationDesign.barriers,
            "Lack of opportunity, unclear procedures, limited time or resources."
          )
        }
      ]
    },
    {
      title: "Follow-up Action if Target Is Not Met",
      kicker: "Corrective action",
      content: [
        {
          value: valueOrFallback(
            data.evaluationDesign.followUpAction,
            "Use refresher training, coaching, supervisor briefing, or a revised job aid."
          )
        }
      ]
    },
    {
      title: "Final Message: Evidence of Transfer",
      kicker: "Evaluation principle",
      content: [
        {
          value: valueOrFallback(
            data.evaluationDesign.finalMessage,
            "Level 3 evaluation proves whether learning became workplace behaviour."
          )
        }
      ]
    }
  ];
}

export function PresentationMode({
  data,
  onExit,
  onSummary
}: PresentationModeProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const groupIdentity = getGroupIdentity(data.groupName);
  const content = modeContent[data.mode];
  const isEvaluation = data.mode === "evaluation";

  const slides = useMemo<Slide[]>(
    () => (data.mode === "evaluation" ? buildEvaluationSlides(data) : buildLearningSlides(data)),
    [data]
  );

  const currentSlide = slides[slideIndex];

  const previous = () => setSlideIndex((value) => Math.max(0, value - 1));
  const next = () => setSlideIndex((value) => Math.min(slides.length - 1, value + 1));

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setSlideIndex((value) => Math.min(slides.length - 1, value + 1));
      }
      if (event.key === "ArrowLeft") {
        setSlideIndex((value) => Math.max(0, value - 1));
      }
      if (event.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onExit, slides.length]);

  return (
    <main
      className={cn(
        "min-h-screen bg-navy-900 p-4 text-white [background-image:radial-gradient(circle_at_20%_10%,rgba(75,146,219,.22),transparent_28%),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:auto,44px_44px,44px_44px] md:p-6",
        isEvaluation &&
          "bg-[#050f1a] [background-image:radial-gradient(circle_at_18%_10%,rgba(93,167,242,.22),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(210,166,90,.12),transparent_24%),linear-gradient(rgba(116,145,172,.11)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)]"
      )}
    >
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white text-field-ink shadow-command md:min-h-[calc(100vh-3rem)]",
          isEvaluation &&
            "border-[#5d7896]/45 bg-[#071725] text-white shadow-[0_30px_90px_rgba(0,0,0,0.38)]"
        )}
      >
        <header
          className={cn(
            "no-print flex flex-col gap-4 border-b border-field-border bg-field-mist/70 p-4 lg:flex-row lg:items-center lg:justify-between",
            isEvaluation && "border-[#5d7896]/35 bg-[#081725]"
          )}
        >
          <div>
            <p className={cn("text-sm font-bold uppercase text-un-blue", isEvaluation && "text-[#8ec2f4]")}>
              {content.appTitle}
            </p>
            <p className={cn("text-lg font-bold text-navy-900", isEvaluation && "text-white")}>
              {data.mode === "evaluation"
                ? "Tactical briefing deck. Use arrow keys to navigate."
                : "Mission briefing deck. Use arrow keys to navigate."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-un-line bg-un-light px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-navy-900",
                isEvaluation && "border-[#7fb8ef]/35 bg-[#123352] text-[#d7ecff]"
              )}
            >
              {groupIdentity?.label ?? "Group"}
            </span>
            <Timer
              seconds={180}
              label="Presentation time"
              variant={isEvaluation ? "tactical" : "default"}
            />
            <button
              type="button"
              onClick={onSummary}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md",
                isEvaluation && "border-[#5d7896]/55 bg-[#10263d] text-white hover:border-[#8ec2f4]"
              )}
            >
              <FileDown size={18} aria-hidden />
              {isEvaluation ? "Export Evaluation Summary" : "Summary"}
            </button>
            <button
              type="button"
              onClick={onExit}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 font-bold text-white shadow-lg shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-800",
                isEvaluation && "bg-[#123352] hover:bg-[#19446b]"
              )}
            >
              <X size={18} aria-hidden />
              Exit
            </button>
          </div>
        </header>

        <section className="relative flex flex-1 flex-col justify-center overflow-hidden p-7 md:p-12 lg:p-16">
          <div className={cn("absolute inset-y-0 right-0 hidden w-28 border-l border-un-line bg-un-light/70 lg:block", isEvaluation && "border-[#5d7896]/35 bg-[#10263d]/[0.78]")} />
          <div className={cn("absolute left-0 top-0 h-full w-2 bg-un-blue", isEvaluation && "bg-[#d2a65a]")} />
          <div className="relative">
            <p className={cn("text-base font-bold uppercase tracking-[0.18em] text-un-blue", isEvaluation && "text-[#8ec2f4]")}>
              Slide {slideIndex + 1} of {slides.length}
            </p>
            {currentSlide.kicker ? (
              <p className={cn("mt-3 max-w-5xl text-2xl font-bold text-navy-700", isEvaluation && "text-[#d7ecff]")}>
                {currentSlide.kicker}
              </p>
            ) : null}
            <h1 className={cn("mt-4 max-w-5xl text-5xl font-bold leading-tight text-navy-900 md:text-7xl", isEvaluation && "text-white")}>
              {currentSlide.title}
            </h1>

            <div className="mt-8 grid gap-4">
              {currentSlide.content.map((item, index) => (
                <article
                  key={`${item.label ?? "content"}-${index}`}
                  className={cn(
                    "rounded-2xl border border-field-border bg-field-mist p-5 shadow-sm",
                    slideIndex === 0 && "bg-white",
                    isEvaluation &&
                      "border-[#5d7896]/45 bg-[#10263d] text-white shadow-[0_18px_48px_rgba(2,10,22,0.22)]",
                    isEvaluation && slideIndex === 0 && "bg-[#123352]"
                  )}
                >
                  {item.label ? (
                    <p className={cn("mb-2 text-sm font-bold uppercase tracking-[0.12em] text-un-blue", isEvaluation && "text-[#8ec2f4]")}>
                      {item.label}
                    </p>
                  ) : null}
                  {Array.isArray(item.value) ? (
                    <ul className={cn("grid gap-2 text-2xl leading-10 text-navy-900 md:grid-cols-2", isEvaluation && "text-white")}>
                      {item.value.map((entry) => (
                        <li key={entry} className="flex gap-3">
                          <span className={cn("mt-4 h-2 w-2 shrink-0 rounded-full bg-un-blue", isEvaluation && "bg-[#d2a65a]")} />
                          <span>{entry}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={cn("whitespace-pre-line text-2xl leading-10 text-navy-900", isEvaluation && "text-white")}>
                      {item.value}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer
          className={cn(
            "flex flex-col gap-4 border-t border-field-border bg-white p-4 md:flex-row md:items-center md:justify-between",
            isEvaluation && "border-[#5d7896]/35 bg-[#081725]"
          )}
        >
          <div className="flex flex-col gap-1">
            <div className="no-print flex items-center gap-2">
              <Clock3 size={18} className={cn("text-un-blue", isEvaluation && "text-[#8ec2f4]")} aria-hidden />
              <span className={cn("font-semibold text-navy-800", isEvaluation && "text-white")}>
                Projector-friendly slide view
              </span>
            </div>
            <p className={cn("text-sm font-semibold text-slate-600", isEvaluation && "text-white/[0.74]")}>
              {isEvaluation ? content.productCredit : PREPARED_BY}
              {data.groupName.trim() ? ` | ${data.groupName}` : ""}
            </p>
          </div>
          <div className="no-print flex flex-wrap items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setSlideIndex(index)}
                className={cn(
                  "h-3 w-9 rounded-full transition",
                  slideIndex === index
                    ? isEvaluation
                      ? "bg-[#d2a65a]"
                      : "bg-un-blue"
                    : isEvaluation
                      ? "bg-[#5d7896]/55"
                      : "bg-field-border"
                )}
              />
            ))}
          </div>
          <div className="no-print flex gap-2">
            <button
              type="button"
              onClick={previous}
              disabled={slideIndex === 0}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md disabled:opacity-45 disabled:hover:translate-y-0",
                isEvaluation && "border-[#5d7896]/55 bg-[#10263d] text-white hover:border-[#8ec2f4]"
              )}
            >
              <ArrowLeft size={18} aria-hidden />
              Previous
            </button>
            <button
              type="button"
              onClick={next}
              disabled={slideIndex === slides.length - 1}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-3 font-bold text-white shadow-lg shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-800 disabled:opacity-45 disabled:hover:translate-y-0",
                isEvaluation && "bg-[#123352] hover:bg-[#19446b]"
              )}
            >
              Next
              <ArrowRight size={18} aria-hidden />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
