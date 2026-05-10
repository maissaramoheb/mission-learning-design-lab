"use client";

import {
  ArrowRight,
  BadgeCheck,
  Eye,
  Layers3,
  QrCode,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/FormElements";
import { QRCodeAccessCard } from "@/components/QRCodeAccessCard";
import {
  APP_TITLE,
  MAIN_TAGLINE,
  PREPARED_BY,
  PRESENTATION_TITLE_LINE
} from "@/lib/constants";

type WelcomeProps = {
  onStart: () => void;
};

const theories = [
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
];

const liveWorkspaceUrl =
  "https://mission-learning-design-nm7eoczna-delta4ce20-5830s-projects.vercel.app/";

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-[2rem] border border-navy-900/10 bg-navy-900 p-6 text-white shadow-command md:p-8">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative">
            <Badge>UN Peacekeeping Training-of-Trainers</Badge>
            <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
              {APP_TITLE}
            </h2>
            <p className="mt-4 max-w-3xl text-2xl leading-10 text-un-line">
              One mission scenario. Three learning theories. One professional
              training response.
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
              This is not a slide deck. It is a group design workspace. Work
              together, assign roles, build your training response, and present
              from the same tool.
            </p>
            <button
              type="button"
              onClick={onStart}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-navy-900 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-un-light"
            >
              Start Group Activity
              <ArrowRight size={20} aria-hidden />
            </button>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-white/75 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
                <p className="text-un-line">Mission principle</p>
                <p className="mt-1 text-white">{MAIN_TAGLINE}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
                <p className="text-un-line">Presentation outcome</p>
                <p className="mt-1 text-white">{PRESENTATION_TITLE_LINE}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {theories.map((theory, index) => {
            const Icon = theory.icon;
            return (
              <motion.article
                key={theory.title}
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
                        {theory.title}
                      </h3>
                      <Badge>{theory.badge}</Badge>
                    </div>
                    <p className="mt-2 text-lg leading-7 text-slate-700">
                      {theory.body}
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
                  Open this app on one laptop per group. Use the shared link or
                  QR code.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-field-border bg-white p-5">
            <div className="flex gap-3">
              <BadgeCheck className="mt-1 text-un-blue" size={24} aria-hidden />
              <div>
                <h3 className="text-xl font-bold text-navy-900">
                  Classroom-ready group workflow
                </h3>
                <p className="mt-2 text-lg leading-8 text-slate-700">
                  Select members, assign roles, build the training design, and
                  brief from Presentation Mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        <QRCodeAccessCard
          url={liveWorkspaceUrl}
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
