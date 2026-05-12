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
        compact && "p-4 shadow-[0_18px_52px_rgba(2,10,22,0.28)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18%_18%,rgba(93,167,242,.24),transparent_30%),linear-gradient(rgba(116,145,172,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(116,145,172,.08)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
      <div className="relative">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8ec2f4]">
              Evaluation Evidence Chain
            </p>
            <h3 className={cn("mt-2 font-bold text-white", compact ? "text-xl" : "text-2xl")}>
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
              ? "md:grid-cols-3 xl:grid-cols-7"
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
                    "flex h-full flex-col justify-between rounded-2xl border",
                    compact ? "min-h-[96px] p-3" : "min-h-[118px] p-4",
                    isFinding
                      ? "border-[#d2a65a]/60 bg-[#d2a65a]/[0.12]"
                      : isAction
                        ? "border-[#7fb8ef]/55 bg-[#123352]/[0.72]"
                        : "border-white/[0.12] bg-white/[0.055]"
                  )}
                >
                  <p className={cn("font-bold uppercase tracking-[0.16em] text-[#8ec2f4]", compact ? "text-[11px]" : "text-xs")}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className={cn("font-bold text-white", compact ? "mt-3 text-sm leading-5" : "mt-4 text-base leading-6")}>
                    {node}
                  </p>
                  {isFinding ? (
                    <p className={cn("font-bold uppercase tracking-[0.14em] text-[#f0ce8e]", compact ? "mt-2 text-[11px]" : "mt-3 text-xs")}>
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
