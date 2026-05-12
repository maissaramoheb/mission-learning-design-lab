"use client";

import { ClipboardCopy, Download, Printer, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { ActivityData } from "@/types/activity";
import { Badge } from "@/components/FormElements";
import { PREPARED_BY, modeContent } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ExportSummaryProps = {
  data: ActivityData;
  onReset: () => void;
};

const learningScenarioSummary =
  "A UN Police patrol team is deployed near an IDP settlement where there are reports of harassment at an informal checkpoint, suspicious objects near a market route, community mistrust toward local police, poor patrol reporting, and tension between host community and displaced families.";

const evaluationScenarioSummary =
  "Three months after a Protection of Civilians by UN Police training session, the training unit needs to know whether participants transferred the learning into observable mission duties, what evidence confirms that application, and what barriers affected transfer.";

function fallback(value: string, fallbackValue: string) {
  return value.trim() ? value : fallbackValue;
}

function roleLine(label: string, value: string) {
  return `${label}: ${fallback(value, "Not assigned")}`;
}

function linesOrFallback(value: string, fallbackValue: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("; ") || fallbackValue;
}

function roleLabels(data: ActivityData) {
  return data.mode === "evaluation"
    ? {
        lead: "Evaluation Lead",
        supportOne: "Application Objective Writer",
        supportTwo: "Survey Designer",
        supportThree: "Evidence / Data Collection Officer",
        presenter: "Presenter / Briefer"
      }
    : {
        lead: "Lead Facilitator",
        supportOne: "Role-player",
        supportTwo: "Observer / Evaluator",
        supportThree: "Rapporteur",
        presenter: "Presenter"
      };
}

function makeLearningPlainTextSummary(data: ActivityData) {
  const labels = roleLabels(data);

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
    roleLine(labels.lead, data.roles.leadFacilitator),
    roleLine(labels.supportOne, data.roles.rolePlayer),
    roleLine(labels.supportTwo, data.roles.observerEvaluator),
    roleLine(labels.supportThree, data.roles.rapporteur),
    roleLine(labels.presenter, data.roles.presenter),
    "",
    "Scenario:",
    learningScenarioSummary,
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

function makeEvaluationPlainTextSummary(data: ActivityData) {
  const labels = roleLabels(data);

  return [
    "Evaluation Design Operations Lab - Level 3 Evaluation Design Package",
    PREPARED_BY,
    "",
    `Group: ${fallback(data.groupName, "Not named")}`,
    `Selected members: ${
      data.selectedMembers.length > 0
        ? data.selectedMembers.join(", ")
        : "Not selected"
    }`,
    roleLine(labels.lead, data.roles.leadFacilitator),
    roleLine(labels.supportOne, data.roles.rolePlayer),
    roleLine(labels.supportTwo, data.roles.observerEvaluator),
    roleLine(labels.supportThree, data.roles.rapporteur),
    roleLine(labels.presenter, data.roles.presenter),
    "",
    "Scenario:",
    evaluationScenarioSummary,
    "",
    `Training topic: ${fallback(data.evaluationDesign.trainingTopic, "Not completed")}`,
    `Original learning objective: ${fallback(
      data.evaluationDesign.originalLearningObjective,
      "Not completed"
    )}`,
    `Level 3 application objective: ${fallback(
      data.evaluationDesign.applicationObjective,
      "Not completed"
    )}`,
    "",
    `Main survey question: ${fallback(
      data.evaluationDesign.mainSurveyQuestion,
      "Not completed"
    )}`,
    `Action checklist: ${linesOrFallback(
      data.evaluationDesign.actionChecklist,
      "Not completed"
    )}`,
    `Confidence question: ${fallback(
      data.evaluationDesign.confidenceQuestion,
      "Not completed"
    )}`,
    `Frequency question: ${fallback(
      data.evaluationDesign.frequencyQuestion,
      "Not completed"
    )}`,
    `Barriers question: ${fallback(
      data.evaluationDesign.barriersQuestion,
      "Not completed"
    )}`,
    `Barrier options: ${linesOrFallback(
      data.evaluationDesign.barrierOptions,
      "Not completed"
    )}`,
    `Open-ended evidence question: ${fallback(
      data.evaluationDesign.openEvidenceQuestion,
      "Not completed"
    )}`,
    "",
    `Additional evidence methods: ${linesOrFallback(
      data.evaluationDesign.additionalEvidenceMethods,
      "Not completed"
    )}`,
    `Target score: ${fallback(data.evaluationDesign.targetScore, "Not completed")}`,
    `Confidence target: ${fallback(
      data.evaluationDesign.confidenceTarget,
      "Not completed"
    )}`,
    `Transfer target: ${fallback(
      data.evaluationDesign.transferTarget,
      "Not completed"
    )}`,
    `Enablers: ${linesOrFallback(data.evaluationDesign.enablers, "Not completed")}`,
    `Barriers: ${linesOrFallback(data.evaluationDesign.barriers, "Not completed")}`,
    `Follow-up action: ${fallback(data.evaluationDesign.followUpAction, "Not completed")}`,
    "",
    `Final message: ${fallback(data.evaluationDesign.finalMessage, "Not completed")}`
  ].join("\n");
}

function makePlainTextSummary(data: ActivityData) {
  return data.mode === "evaluation"
    ? makeEvaluationPlainTextSummary(data)
    : makeLearningPlainTextSummary(data);
}

export function ExportSummary({ data, onReset }: ExportSummaryProps) {
  const [copyStatus, setCopyStatus] = useState("");
  const summary = useMemo(() => makePlainTextSummary(data), [data]);
  const content = modeContent[data.mode];
  const labels = roleLabels(data);
  const isEvaluation = data.mode === "evaluation";

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
    const fileGroup =
      data.groupName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
      "group";
    const modeSlug =
      data.mode === "evaluation"
        ? "level-3-evaluation-design"
        : "mission-learning-design";
    link.href = url;
    link.download = `${fileGroup}-${modeSlug}.json`;
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
      <div
        className={cn(
          "no-print flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
          isEvaluation &&
            "rounded-[1.75rem] border border-[#5d7896]/45 bg-[#081725] p-5 text-white shadow-[0_24px_70px_rgba(2,10,22,0.24)]"
        )}
      >
        <div>
          <Badge>Export / Print Summary</Badge>
          <h2 className={cn("mt-3 text-3xl font-bold text-navy-900", isEvaluation && "text-white")}>
            {data.mode === "evaluation"
              ? "Level 3 Evaluation Design Package"
              : "Group Training Design Summary"}
          </h2>
          <p className={cn("mt-3 max-w-4xl text-lg leading-8 text-slate-700", isEvaluation && "text-white/[0.78]")}>
            {data.mode === "evaluation"
              ? "Application Evidence and Transfer-of-Learning Plan. Print the brief, copy it into course records, or download a JSON file for later editing."
              : "Print the group output, copy it into course records, or download a JSON file for later editing."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md",
              isEvaluation && "border-[#5d7896]/55 bg-[#10263d] text-white hover:border-[#8ec2f4]"
            )}
          >
            <Printer size={18} aria-hidden />
            Print
          </button>
          <button
            type="button"
            onClick={copySummary}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md",
              isEvaluation && "border-[#5d7896]/55 bg-[#10263d] text-white hover:border-[#8ec2f4]"
            )}
          >
            <ClipboardCopy size={18} aria-hidden />
            Copy Summary
          </button>
          <button
            type="button"
            onClick={downloadJson}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-field-border bg-white px-4 py-3 font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:shadow-md",
              isEvaluation && "border-[#5d7896]/55 bg-[#10263d] text-white hover:border-[#8ec2f4]"
            )}
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
            {content.appTitle}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-navy-900">
            {data.mode === "evaluation"
              ? "Level 3 Evaluation Design Package"
              : "One Mission Scenario. Three Learning Theories."}
          </h3>
          {isEvaluation ? (
            <p className="mt-2 text-lg font-semibold text-slate-700">
              Application Evidence and Transfer-of-Learning Plan
            </p>
          ) : null}
          <p className="mt-2 text-lg text-slate-700">
            Group: {fallback(data.groupName, "Not named")}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            {content.productCredit}
          </p>
        </div>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <SummaryBlock title={isEvaluation ? "Evaluation Team" : "Group Roles"}>
            <p>
              <strong>Selected members:</strong>{" "}
              {data.selectedMembers.length > 0
                ? data.selectedMembers.join(", ")
                : "Not selected"}
            </p>
            <div className="mt-3" />
            <p>{roleLine(labels.lead, data.roles.leadFacilitator)}</p>
            <p>{roleLine(labels.supportOne, data.roles.rolePlayer)}</p>
            <p>{roleLine(labels.supportTwo, data.roles.observerEvaluator)}</p>
            <p>{roleLine(labels.supportThree, data.roles.rapporteur)}</p>
            <p>{roleLine(labels.presenter, data.roles.presenter)}</p>
          </SummaryBlock>

          <SummaryBlock title="Scenario">
            <p>
              {data.mode === "evaluation"
                ? evaluationScenarioSummary
                : learningScenarioSummary}
            </p>
          </SummaryBlock>
        </section>

        {data.mode === "evaluation" ? (
          <>
            <section className="mt-5 grid gap-5">
              <SummaryBlock title="Training Topic">
                <p>{fallback(data.evaluationDesign.trainingTopic, "Not completed")}</p>
              </SummaryBlock>
              <SummaryBlock title="Learning Objective">
                <p>
                  {fallback(
                    data.evaluationDesign.originalLearningObjective,
                    "Not completed"
                  )}
                </p>
              </SummaryBlock>
              <SummaryBlock title="Level 3 Application Objective">
                <p>
                  {fallback(
                    data.evaluationDesign.applicationObjective,
                    "Not completed"
                  )}
                </p>
              </SummaryBlock>
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-2">
              <SummaryBlock title="Survey Questions">
                <p>
                  <strong>Main:</strong>{" "}
                  {fallback(data.evaluationDesign.mainSurveyQuestion, "Not completed")}
                </p>
                <p className="mt-3">
                  <strong>Confidence:</strong>{" "}
                  {fallback(data.evaluationDesign.confidenceQuestion, "Not completed")}
                </p>
                <p className="mt-3">
                  <strong>Frequency:</strong>{" "}
                  {fallback(data.evaluationDesign.frequencyQuestion, "Not completed")}
                </p>
                <p className="mt-3">
                  <strong>Barrier question:</strong>{" "}
                  {fallback(data.evaluationDesign.barriersQuestion, "Not completed")}
                </p>
                <p className="mt-3">
                  <strong>Open evidence:</strong>{" "}
                  {fallback(data.evaluationDesign.openEvidenceQuestion, "Not completed")}
                </p>
              </SummaryBlock>
              <SummaryBlock title="Response Options">
                <p>
                  <strong>Action checklist:</strong>{" "}
                  {linesOrFallback(
                    data.evaluationDesign.actionChecklist,
                    "Not completed"
                  )}
                </p>
                <p className="mt-3">
                  <strong>Barrier options:</strong>{" "}
                  {linesOrFallback(
                    data.evaluationDesign.barrierOptions,
                    "Not completed"
                  )}
                </p>
              </SummaryBlock>
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-2">
              <SummaryBlock title="Additional Evidence Methods">
                <p className="whitespace-pre-line">
                  {fallback(
                    data.evaluationDesign.additionalEvidenceMethods,
                    "Not completed"
                  )}
                </p>
              </SummaryBlock>
              <SummaryBlock title="Targets">
                <p>
                  <strong>Target score:</strong>{" "}
                  {fallback(data.evaluationDesign.targetScore, "Not completed")}
                </p>
                <p className="mt-3">
                  <strong>Confidence target:</strong>{" "}
                  {fallback(data.evaluationDesign.confidenceTarget, "Not completed")}
                </p>
                <p className="mt-3">
                  <strong>Transfer target:</strong>{" "}
                  {fallback(data.evaluationDesign.transferTarget, "Not completed")}
                </p>
              </SummaryBlock>
            </section>

            <section className="mt-5 grid gap-5 md:grid-cols-2">
              <SummaryBlock title="Expected Enablers">
                <p className="whitespace-pre-line">
                  {fallback(data.evaluationDesign.enablers, "Not completed")}
                </p>
              </SummaryBlock>
              <SummaryBlock title="Expected Barriers">
                <p className="whitespace-pre-line">
                  {fallback(data.evaluationDesign.barriers, "Not completed")}
                </p>
              </SummaryBlock>
            </section>

            <section className="mt-5">
              <SummaryBlock title="Follow-up Action">
                <p>
                  {fallback(data.evaluationDesign.followUpAction, "Not completed")}
                </p>
              </SummaryBlock>
            </section>

            <section className="mt-5 rounded-xl border border-un-line bg-un-light p-5">
              <h4 className="text-xl font-bold text-navy-900">
                Final Evaluation Message
              </h4>
              <p className="mt-2 text-xl leading-9 text-navy-900">
                {fallback(data.evaluationDesign.finalMessage, "Not completed")}
              </p>
            </section>
          </>
        ) : (
          <>
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
          </>
        )}

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
