"use client";

import { ClipboardCopy, Download, Printer, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { ActivityData } from "@/types/activity";
import { Badge } from "@/components/FormElements";
import { APP_TITLE, PREPARED_BY, PRODUCT_CREDIT } from "@/lib/constants";

type ExportSummaryProps = {
  data: ActivityData;
  onReset: () => void;
};

const scenarioSummary =
  "A UN Police patrol team is deployed near an IDP settlement where there are reports of harassment at an informal checkpoint, suspicious objects near a market route, community mistrust toward local police, poor patrol reporting, and tension between host community and displaced families.";

function fallback(value: string, fallbackValue: string) {
  return value.trim() ? value : fallbackValue;
}

function roleLine(label: string, value: string) {
  return `${label}: ${fallback(value, "Not assigned")}`;
}

function makePlainTextSummary(data: ActivityData) {
  return [
    "Mission Learning Design Lab - Group Summary",
    PREPARED_BY,
    "",
    `Group: ${fallback(data.groupName, "Not named")}`,
    `Selected members: ${
      data.selectedMembers.length > 0
        ? data.selectedMembers.join(", ")
        : "Not selected"
    }`,
    roleLine("Lead Facilitator", data.roles.leadFacilitator),
    roleLine("Role-player", data.roles.rolePlayer),
    roleLine("Observer / Evaluator", data.roles.observerEvaluator),
    roleLine("Rapporteur", data.roles.rapporteur),
    roleLine("Presenter", data.roles.presenter),
    "",
    "Scenario:",
    scenarioSummary,
    "",
    `Main training gap: ${fallback(data.trainingGap, "Not completed")}`,
    `SMART objective: By the end of this 15-minute mini-training, participants will be able to ${fallback(
      data.design.smartObjective,
      "not completed"
    )}`,
    "",
    `Behaviourist element: ${fallback(
      data.design.behaviouristElement || data.behaviourist.ruleItem,
      "Not completed"
    )}`,
    `Reinforcement: ${fallback(data.behaviourist.reinforcement, "Not completed")}`,
    "",
    `Social cognitive element: ${fallback(
      data.design.socialCognitiveElement || data.social.demonstratedBehaviour,
      "Not completed"
    )}`,
    `Observer checklist: ${
      data.social.observerChecklist.length > 0
        ? data.social.observerChecklist.join(", ")
        : "Not completed"
    }`,
    `Feedback: ${fallback(data.social.feedbackApproach, "Not completed")}`,
    "",
    `Constructivist element: ${fallback(
      data.design.constructivistElement || data.constructivist.scenarioQuestion,
      "Not completed"
    )}`,
    `Outputs: ${
      data.constructivist.outputs.length > 0
        ? data.constructivist.outputs.join(", ")
        : "Not completed"
    }`,
    "",
    `Assessment method: ${fallback(data.design.assessmentMethod, "Not completed")}`,
    `Assessment description: ${fallback(
      data.design.assessmentDescription,
      "Not completed"
    )}`,
    `Risk: ${fallback(data.design.deliveryRisk, "Not completed")}`,
    `Control measure: ${fallback(data.design.controlMeasure, "Not completed")}`,
    "",
    `Final key message: ${fallback(data.design.finalKeyMessage, "Not completed")}`
  ].join("\n");
}

export function ExportSummary({ data, onReset }: ExportSummaryProps) {
  const [copyStatus, setCopyStatus] = useState("");
  const summary = useMemo(() => makePlainTextSummary(data), [data]);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("Summary copied.");
    } catch {
      setCopyStatus("Copy failed. Select the printable summary and copy manually.");
    }
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileGroup = data.groupName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "group";
    link.href = url;
    link.download = `${fileGroup}-mission-learning-design.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const confirmReset = () => {
    if (window.confirm("Reset all saved group data on this device?")) {
      onReset();
    }
  };

  return (
    <div className="space-y-8">
      <div className="no-print flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>Export / Print Summary</Badge>
          <h2 className="mt-3 text-3xl font-bold text-navy-900">
            Group Training Design Summary
          </h2>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">
            Print the group output, copy it into course records, or download a
            JSON file for later editing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md"
          >
            <Printer size={18} aria-hidden />
            Print
          </button>
          <button
            type="button"
            onClick={copySummary}
            className="inline-flex items-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md"
          >
            <ClipboardCopy size={18} aria-hidden />
            Copy Summary
          </button>
          <button
            type="button"
            onClick={downloadJson}
            className="inline-flex items-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md"
          >
            <Download size={18} aria-hidden />
            Download JSON
          </button>
          <button
            type="button"
            onClick={confirmReset}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-3 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-md"
          >
            <RotateCcw size={18} aria-hidden />
            Reset Data
          </button>
        </div>
      </div>

      {copyStatus ? (
        <p className="no-print rounded-lg border border-un-line bg-un-light px-4 py-3 font-semibold text-navy-900">
          {copyStatus}
        </p>
      ) : null}

      <article className="print-area rounded-2xl border border-field-border bg-white p-6 shadow-sm">
        <div className="border-b border-field-border pb-5">
          <p className="text-sm font-bold uppercase text-un-blue">
            {APP_TITLE}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-navy-900">
            One Mission Scenario. Three Learning Theories.
          </h3>
          <p className="mt-2 text-lg text-slate-700">
            Group: {fallback(data.groupName, "Not named")}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            {PRODUCT_CREDIT}
          </p>
        </div>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <SummaryBlock title="Group Roles">
            <p>
              <strong>Selected members:</strong>{" "}
              {data.selectedMembers.length > 0
                ? data.selectedMembers.join(", ")
                : "Not selected"}
            </p>
            <div className="mt-3" />
            <p>{roleLine("Lead Facilitator", data.roles.leadFacilitator)}</p>
            <p>{roleLine("Role-player", data.roles.rolePlayer)}</p>
            <p>{roleLine("Observer / Evaluator", data.roles.observerEvaluator)}</p>
            <p>{roleLine("Rapporteur", data.roles.rapporteur)}</p>
            <p>{roleLine("Presenter", data.roles.presenter)}</p>
          </SummaryBlock>

          <SummaryBlock title="Scenario">
            <p>{scenarioSummary}</p>
          </SummaryBlock>
        </section>

        <section className="mt-5 grid gap-5">
          <SummaryBlock title="Main Training Gap">
            <p>{fallback(data.trainingGap, "Not completed")}</p>
          </SummaryBlock>
          <SummaryBlock title="SMART Objective">
            <p>
              By the end of this 15-minute mini-training, participants will be
              able to {fallback(data.design.smartObjective, "not completed")}
            </p>
          </SummaryBlock>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-3">
          <SummaryBlock title="Behaviourist Element">
            <p className="whitespace-pre-line">
              {fallback(
                data.design.behaviouristElement || data.behaviourist.ruleItem,
                "Not completed"
              )}
            </p>
            <p className="mt-3">
              <strong>Reinforcement:</strong>{" "}
              {fallback(data.behaviourist.reinforcement, "Not completed")}
            </p>
          </SummaryBlock>
          <SummaryBlock title="Social Cognitive Element">
            <p className="whitespace-pre-line">
              {fallback(
                data.design.socialCognitiveElement ||
                  data.social.demonstratedBehaviour,
                "Not completed"
              )}
            </p>
            <p className="mt-3">
              <strong>Observer checklist:</strong>{" "}
              {data.social.observerChecklist.length > 0
                ? data.social.observerChecklist.join(", ")
                : "Not completed"}
            </p>
          </SummaryBlock>
          <SummaryBlock title="Constructivist Element">
            <p className="whitespace-pre-line">
              {fallback(
                data.design.constructivistElement ||
                  data.constructivist.scenarioQuestion,
                "Not completed"
              )}
            </p>
            <p className="mt-3">
              <strong>Expected output:</strong>{" "}
              {data.constructivist.outputs.length > 0
                ? data.constructivist.outputs.join(", ")
                : "Not completed"}
            </p>
          </SummaryBlock>
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-2">
          <SummaryBlock title="Assessment Method">
            <p>
              <strong>Method:</strong>{" "}
              {fallback(data.design.assessmentMethod, "Not completed")}
            </p>
            <p className="mt-3">
              {fallback(data.design.assessmentDescription, "Not completed")}
            </p>
          </SummaryBlock>
          <SummaryBlock title="Risk / Control">
            <p>
              <strong>Risk:</strong>{" "}
              {fallback(data.design.deliveryRisk, "Not completed")}
            </p>
            <p className="mt-3">
              <strong>Control:</strong>{" "}
              {fallback(data.design.controlMeasure, "Not completed")}
            </p>
          </SummaryBlock>
        </section>

        <section className="mt-5 rounded-xl border border-un-line bg-un-light p-5">
          <h4 className="text-xl font-bold text-navy-900">Final Key Message</h4>
          <p className="mt-2 text-xl leading-9 text-navy-900">
            {fallback(data.design.finalKeyMessage, "Not completed")}
          </p>
        </section>

        <footer className="print-footer mt-6 border-t border-field-border pt-4 text-sm font-semibold text-slate-600">
          {PREPARED_BY}
        </footer>
      </article>
    </div>
  );
}

function SummaryBlock({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-field-border bg-field-mist p-5 text-lg leading-8 text-slate-800">
      <h4 className="mb-2 text-xl font-bold text-navy-900">{title}</h4>
      {children}
    </div>
  );
}
