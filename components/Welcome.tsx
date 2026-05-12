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
      badge: "Transfer",
      body: "Convert learning objectives into observable workplace behaviours."
    },
    {
      title: "Survey Questions",
      icon: BarChart3,
      badge: "Questions",
      body: "Ask what was applied, how often, and with what result."
    },
    {
      title: "Evidence Methods",
      icon: Layers3,
      badge: "Evidence",
      body: "Use surveys, supervisor feedback, and work-sample evidence."
    },
    {
      title: "Barriers & Enablers",
      icon: BadgeCheck,
      badge: "Transfer",
      body: "Identify why workplace application succeeded or stalled."
    }
  ]
};

export function Welcome({ mode, onModeChange, onStart }: WelcomeProps) {
  const content = modeContent[mode];

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-[2rem] border border-navy-900/10 bg-navy-900 p-6 text-white shadow-command md:p-8">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative">
            <Badge>UN Peacekeeping Training-of-Trainers</Badge>
            <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
              {content.appTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-2xl leading-10 text-un-line">
              {content.subtitle}
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
              Select the lab for this session. Both modes keep the same roster,
              group workflow, local save behavior, presentation mode, and
              printable summary.
            </p>
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
                        ? "border-un-line bg-white text-navy-900 shadow-xl"
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
              className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-navy-900 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-un-light"
            >
              {mode === "evaluation"
                ? "Start Evaluation Mission"
                : "Start Learning Mission"}
              <ArrowRight size={20} aria-hidden />
            </button>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-white/75 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
                <p className="text-un-line">Core message</p>
                <p className="mt-1 text-white">{content.tagline}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
                <p className="text-un-line">Presentation output</p>
                <p className="mt-1 text-white">{content.presentationTitleLine}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {modeCards[mode].map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.24 }}
                className="group rounded-[1.5rem] border border-field-border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-un-line hover:shadow-command"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-un-line bg-un-light text-un-blue transition group-hover:scale-105">
                    <Icon size={24} aria-hidden />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-navy-900">
                        {card.title}
                      </h3>
                      <Badge>{card.badge}</Badge>
                    </div>
                    <p className="mt-2 text-lg leading-7 text-slate-700">
                      {card.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr_0.95fr]">
        <div className="grid gap-4 lg:grid-cols-2 xl:col-span-2">
          <div className="rounded-2xl border border-field-border bg-field-mist p-5">
            <div className="flex gap-3">
              <QrCode className="mt-1 text-un-blue" size={24} aria-hidden />
              <div>
                <h3 className="text-xl font-bold text-navy-900">
                  Open one workspace per group
                </h3>
                <p className="mt-2 text-lg leading-8 text-slate-700">
                  The facilitator chooses the lab, then each group uses one
                  workspace on one laptop.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-field-border bg-white p-5">
            <div className="flex gap-3">
              <BadgeCheck className="mt-1 text-un-blue" size={24} aria-hidden />
              <div>
                <h3 className="text-xl font-bold text-navy-900">
                  Shared workflow, mode-specific content
                </h3>
                <p className="mt-2 text-lg leading-8 text-slate-700">
                  Select members, assign roles, complete the mode-specific
                  phases, and brief from Presentation Mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        <QRCodeAccessCard
          url={LIVE_WORKSPACE_URL}
          title="Scan to Open Workspace"
          subtitle="Open one workspace per group."
        />
      </section>

      <footer className="border-t border-field-border pt-5 text-sm font-semibold text-slate-600">
        {PREPARED_BY}
      </footer>
    </div>
  );
}
