"use client";

import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Eye,
  Layers3,
  QrCode,
  ShieldCheck,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import type { AppMode } from "@/types/activity";
import { Badge } from "@/components/FormElements";
import { EvaluationEvidenceChain } from "@/components/EvaluationEvidenceChain";
import { QRCodeAccessCard } from "@/components/QRCodeAccessCard";
import { LIVE_WORKSPACE_URL, PREPARED_BY, modeContent } from "@/lib/constants";
import { cn } from "@/lib/utils";

type WelcomeProps = {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  onStart: () => void;
};

const modeCards: Record<
  AppMode,
  Array<{ title: string; body: string; badge: string; icon: typeof ShieldCheck }>
> = {
  learning: [
    {
      title: "Behaviourist Learning",
      icon: ShieldCheck,
      badge: "Rules",
      body: "Rules. Right/wrong. Correction. Reinforcement."
    },
    {
      title: "Social Cognitive Learning",
      icon: Eye,
      badge: "Skills",
      body: "Demonstration. Modelling. Practice. Feedback."
    },
    {
      title: "Constructivist Learning",
      icon: Layers3,
      badge: "Judgment",
      body: "Scenario analysis. Experience. Group-built solution."
    }
  ],
  evaluation: [
    {
      title: "Application Objective",
      icon: Target,
      badge: "Field Behaviour",
      body: "Convert a classroom learning objective into observable workplace behaviour."
    },
    {
      title: "Survey Questions",
      icon: BarChart3,
      badge: "Transfer Check",
      body: "Ask what was applied, how often, how confidently, and with what barriers."
    },
    {
      title: "Evidence Methods",
      icon: Layers3,
      badge: "Evidence",
      body: "Strengthen survey data with supervisor feedback, 360 review, focus groups, work samples, or action-plan follow-up."
    },
    {
      title: "Targets & Improvement",
      icon: BadgeCheck,
      badge: "Target vs Actual",
      body: "Compare actual application data against targets and recommend corrective action."
    }
  ]
};

export function Welcome({ mode, onModeChange, onStart }: WelcomeProps) {
  const content = modeContent[mode];
  const isEvaluation = mode === "evaluation";

  return (
    <div className="space-y-6">
      <section
        className={cn(
          "grid",
          isEvaluation
            ? "gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-start"
            : "gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-[2rem] border border-navy-900/10 bg-navy-900 p-6 text-white shadow-command md:p-8",
            isEvaluation &&
              "border-[#5d7896]/55 bg-[#071725] shadow-[0_28px_82px_rgba(2,10,22,0.36)]"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:34px_34px]",
              isEvaluation &&
                "opacity-100 [background-image:radial-gradient(circle_at_20%_16%,rgba(93,167,242,.22),transparent_28%),linear-gradient(rgba(116,145,172,.11)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)]"
            )}
          />
          <div className="relative">
            <Badge>
              {isEvaluation
                ? "Tactical Evaluation Operations Room"
                : "UN Peacekeeping Training-of-Trainers"}
            </Badge>
            <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
              {content.appTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-2xl leading-10 text-un-line">
              {content.subtitle}
            </p>
            {isEvaluation ? (
              <>
                <p className="mt-5 max-w-3xl text-xl font-semibold leading-9 text-white/[0.86]">
                  Level 3 asks whether learning transferred into observable job
                  behaviour.
                </p>
                <article className="mt-5 rounded-[1.5rem] border border-[#7fb8ef]/[0.32] bg-[#10263d]/[0.84] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
                    Mission Brief
                  </p>
                  <p className="mt-3 text-lg leading-8 text-white/[0.84]">
                    Your group will convert learning objectives into application
                    objectives, build survey questions, define evidence methods,
                    set targets, and prepare a 3-minute evaluation briefing.
                  </p>
                </article>
              </>
            ) : (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
                Select the lab for this session. Both modes keep the same roster,
                group workflow, local save behavior, presentation mode, and
                printable summary.
              </p>
            )}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(["learning", "evaluation"] as AppMode[]).map((labMode) => {
                const lab = modeContent[labMode];
                return (
                  <button
                    key={labMode}
                    type="button"
                    onClick={() => onModeChange(labMode)}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-0.5",
                      mode === labMode
                        ? isEvaluation
                          ? "border-[#8ec2f4] bg-[#d7ecff] text-[#071725] shadow-xl"
                          : "border-un-line bg-white text-navy-900 shadow-xl"
                        : isEvaluation
                          ? "border-[#5d7896]/45 bg-[#10263d]/[0.72] text-white hover:border-[#8ec2f4]"
                          : "border-white/15 bg-white/[0.08] text-white hover:border-white/35"
                    )}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-80">
                      {labMode === "learning"
                        ? "1. Learning Theories Lab"
                        : "2. Evaluation Design Operations Lab"}
                    </p>
                    <p className="mt-2 text-lg font-bold">{lab.appTitle}</p>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={onStart}
              className={cn(
                "mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-navy-900 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-un-light",
                isEvaluation &&
                  "bg-[#d7ecff] text-[#071725] shadow-[0_20px_44px_rgba(0,0,0,0.28)] hover:bg-white"
              )}
            >
              {isEvaluation
                ? "Start Evaluation Mission"
                : "Start Learning Mission"}
              <ArrowRight size={20} aria-hidden />
            </button>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-white/75 sm:grid-cols-2">
              <div
                className={cn(
                  "rounded-2xl border border-white/15 bg-white/[0.08] p-4",
                  isEvaluation && "border-[#5d7896]/45 bg-[#10263d]/[0.72]"
                )}
              >
                <p className="text-un-line">Core message</p>
                <p className="mt-1 text-white">{content.tagline}</p>
              </div>
              <div
                className={cn(
                  "rounded-2xl border border-white/15 bg-white/[0.08] p-4",
                  isEvaluation && "border-[#5d7896]/45 bg-[#10263d]/[0.72]"
                )}
              >
                <p className="text-un-line">Presentation output</p>
                <p className="mt-1 text-white">{content.presentationTitleLine}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "grid gap-3",
            isEvaluation && "self-start gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          )}
        >
          {modeCards[mode].map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.24 }}
                className={cn(
                  "group rounded-[1.5rem] border border-field-border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-un-line hover:shadow-command",
                  isEvaluation &&
                    "border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_18px_48px_rgba(2,10,22,0.26)] hover:border-[#8ec2f4]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-un-line bg-un-light text-un-blue transition group-hover:scale-105",
                      isEvaluation &&
                        "border-[#7fb8ef]/35 bg-[#123352] text-[#8ec2f4]"
                    )}
                  >
                    <Icon size={24} aria-hidden />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className={cn("text-xl font-bold text-navy-900", isEvaluation && "text-white")}>
                        {card.title}
                      </h3>
                      <Badge>{card.badge}</Badge>
                    </div>
                    <p className={cn("mt-2 text-base leading-7 text-slate-700", isEvaluation && "text-white/[0.82]")}>
                      {card.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {isEvaluation ? <EvaluationEvidenceChain compact /> : null}

      <section
        className={cn(
          "grid gap-4",
          isEvaluation ? "xl:grid-cols-[1.28fr_0.72fr]" : "xl:grid-cols-[1fr_1fr_0.95fr]"
        )}
      >
        <div
          className={cn(
            "grid gap-4 lg:grid-cols-2",
            !isEvaluation && "xl:col-span-2"
          )}
        >
          <div
            className={cn(
              "rounded-2xl border border-field-border bg-field-mist p-5",
              isEvaluation &&
                "border-[#5d7896]/45 bg-[#081725] text-white shadow-[0_18px_48px_rgba(2,10,22,0.24)]"
            )}
          >
            <div className="flex gap-3">
              <QrCode className="mt-1 text-un-blue" size={24} aria-hidden />
              <div>
                <h3 className={cn("text-xl font-bold text-navy-900", isEvaluation && "text-white")}>
                  Open one workspace per group
                </h3>
                <p className={cn("mt-2 text-base leading-7 text-slate-700", isEvaluation && "text-white/[0.82]")}>
                  The facilitator chooses the lab, then each group uses one
                  workspace on one laptop.
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "rounded-2xl border border-field-border bg-white p-5",
              isEvaluation &&
                "border-[#5d7896]/45 bg-[#081725] text-white shadow-[0_18px_48px_rgba(2,10,22,0.24)]"
            )}
          >
            <div className="flex gap-3">
              <BadgeCheck className="mt-1 text-un-blue" size={24} aria-hidden />
              <div>
                <h3 className={cn("text-xl font-bold text-navy-900", isEvaluation && "text-white")}>
                  Shared workflow, mode-specific content
                </h3>
                <p className={cn("mt-2 text-base leading-7 text-slate-700", isEvaluation && "text-white/[0.82]")}>
                  Select members, assign roles, complete the mode-specific
                  phases, and brief from Presentation Mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        <QRCodeAccessCard
          url={LIVE_WORKSPACE_URL}
          title={
            isEvaluation
              ? "Scan to Access Lab"
              : "Scan to Open Workspace"
          }
          subtitle="Open one workspace per group."
          variant={isEvaluation ? "evaluation" : "default"}
          compact={isEvaluation}
        />
      </section>

      <footer
        className={cn(
          "border-t border-field-border pt-5 text-sm font-semibold text-slate-600",
          isEvaluation &&
            "rounded-[1.5rem] border border-[#5d7896]/35 bg-[#081725] p-4 text-white/[0.76] shadow-[0_18px_48px_rgba(2,10,22,0.18)]"
        )}
      >
        {isEvaluation ? content.productCredit : PREPARED_BY}
      </footer>
    </div>
  );
}
