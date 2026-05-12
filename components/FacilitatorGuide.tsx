"use client";

import { X } from "lucide-react";
import { PREPARED_BY, modeContent } from "@/lib/constants";
import type { AppMode } from "@/types/activity";

type FacilitatorGuideProps = {
  mode: AppMode;
  open: boolean;
  onClose: () => void;
};

export function FacilitatorGuide({
  mode,
  open,
  onClose
}: FacilitatorGuideProps) {
  if (!open) {
    return null;
  }

  const content = modeContent[mode];
  const isEvaluation = mode === "evaluation";

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-navy-900/65 p-4 backdrop-blur-sm">
      <section className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-un-line bg-white p-6 shadow-command md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-un-blue">Optional page</p>
            <h2 className="text-3xl font-bold text-navy-900">Facilitator Guide</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {content.productCredit}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-field-border p-2 text-navy-800 transition hover:border-un-blue hover:shadow-md"
            aria-label="Close facilitator guide"
          >
            <X size={22} aria-hidden />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-field-border bg-field-mist p-5">
            <h3 className="mb-3 text-xl font-bold text-navy-900">How to run</h3>
            <ol className="space-y-2 text-lg leading-8 text-slate-700">
              <li>1. Divide participants into three groups.</li>
              <li>2. Each group opens the app on one laptop.</li>
              <li>3. Groups select members and assign roles.</li>
              <li>
                4. Groups complete{" "}
                {isEvaluation ? "phases 1-4" : "all three learning-theory phases"}.
              </li>
              <li>5. Groups generate presentation mode.</li>
              <li>6. Each group presents for 3 minutes.</li>
              <li>7. Facilitator debriefs using the discussion questions.</li>
            </ol>
          </div>

          <div className="rounded-xl border border-field-border bg-white p-5">
            <h3 className="mb-3 text-xl font-bold text-navy-900">Debrief questions</h3>
            <ol className="space-y-2 text-lg leading-8 text-slate-700">
              {isEvaluation ? (
                <>
                  <li>1. What changed when you moved from learning objective to application objective?</li>
                  <li>2. Which survey question best measures actual transfer?</li>
                  <li>3. Which barriers are most realistic in a mission environment?</li>
                  <li>4. Why is Level 3 stronger when survey data is supported by supervisor or work-sample evidence?</li>
                  <li>5. How would you report if the target was not met?</li>
                </>
              ) : (
                <>
                  <li>1. Which theory was easiest to apply?</li>
                  <li>2. Which theory best fits facts and rules?</li>
                  <li>3. Which theory best fits practical skills?</li>
                  <li>4. Which theory best fits complex judgment?</li>
                  <li>5. What happens when a trainer uses only one method for every objective?</li>
                  <li>6. How does the objective decide the method?</li>
                </>
              )}
            </ol>
          </div>
        </div>

        {isEvaluation ? (
          <div className="mt-6 rounded-xl border border-field-border bg-field-mist p-5">
            <h3 className="mb-3 text-xl font-bold text-navy-900">
              Recommended timing
            </h3>
            <p className="text-lg leading-8 text-slate-700">
              45-60 minutes total: framing 5 min, setup 5 min, phase 1 10 min,
              phase 2 12 min, phase 3 8 min, phase 4 8 min, final builder 5
              min, presentations 9-12 min, debrief 5 min.
            </p>
          </div>
        ) : null}

        <div className="mt-6 rounded-xl border border-un-line bg-un-light p-5">
          <p className="text-xl font-bold text-navy-900">
            {isEvaluation
              ? "Level 3 evaluation is not about asking whether people liked the course. It is about proving whether training changed workplace behaviour."
              : "The professional trainer does not marry one method. He selects the method according to the learning objective."}
          </p>
          <p className="mt-3 text-xl font-semibold text-navy-800" dir="rtl" lang="ar">
            {isEvaluation
              ? "Level 3 مش بيسأل الناس عجبها التدريب ولا لأ. بيسأل: طبقتوا إيه فعلاً في الشغل؟ وإيه الدليل؟"
              : "المدرب الشاطر مش اللي بيحب طريقة واحدة. المدرب الشاطر يختار الطريقة حسب الهدف."}
          </p>
        </div>
        <footer className="mt-6 border-t border-field-border pt-4 text-sm font-semibold text-slate-600">
          {PREPARED_BY}
        </footer>
      </section>
    </div>
  );
}
