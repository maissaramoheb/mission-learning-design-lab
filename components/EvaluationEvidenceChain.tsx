"use client";

import { ArrowRight, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type EvaluationEvidenceChainProps = {
  compact?: boolean;
};

const nodes = [
  "Learning Objective",
  "Application Objective",
  "Survey Questions",
  "Evidence Methods",
  "Targets",
  "Findings",
  "Improvement Action"
];

export function EvaluationEvidenceChain({
  compact = false
}: EvaluationEvidenceChainProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-[#5d7896]/55 bg-[#071725] p-5 text-white shadow-[0_24px_70px_rgba(2,10,22,0.34)]",
        compact && "p-4"
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18%_18%,rgba(93,167,242,.24),transparent_30%),linear-gradient(rgba(116,145,172,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
      <div className="relative">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
              Evaluation Evidence Chain
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              From classroom intent to field evidence.
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d2a65a]/45 bg-[#d2a65a]/[0.12] px-3 py-1.5 text-sm font-bold text-[#f0ce8e]">
            <TriangleAlert size={16} aria-hidden />
            GAP / BELOW TARGET
          </div>
        </div>

        <div
          className={cn(
            "mt-5 grid gap-3",
            compact
              ? "md:grid-cols-2 xl:grid-cols-7"
              : "md:grid-cols-2 xl:grid-cols-7"
          )}
        >
          {nodes.map((node, index) => {
            const isFinding = node === "Findings";
            const isAction = node === "Improvement Action";

            return (
              <div key={node} className="relative">
                <article
                  className={cn(
                    "flex h-full min-h-[118px] flex-col justify-between rounded-2xl border p-4",
                    isFinding
                      ? "border-[#d2a65a]/60 bg-[#d2a65a]/[0.12]"
                      : isAction
                        ? "border-[#7fb8ef]/55 bg-[#123352]/[0.72]"
                        : "border-white/[0.12] bg-white/[0.055]"
                  )}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ec2f4]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-base font-bold leading-6 text-white">
                    {node}
                  </p>
                  {isFinding ? (
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#f0ce8e]">
                      Compare target vs actual
                    </p>
                  ) : null}
                </article>

                {index < nodes.length - 1 ? (
                  <span className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#7fb8ef]/40 bg-[#10263d] p-1 text-[#8ec2f4] shadow-lg xl:inline-flex">
                    <ArrowRight size={15} aria-hidden />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
