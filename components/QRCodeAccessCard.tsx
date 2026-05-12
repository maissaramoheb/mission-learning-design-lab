"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type QRCodeAccessCardProps = {
  url: string;
  title: string;
  subtitle: string;
  variant?: "default" | "evaluation";
};

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function QRCodeAccessCard({
  url,
  title,
  subtitle,
  variant = "default"
}: QRCodeAccessCardProps) {
  const [copied, setCopied] = useState(false);
  const isEvaluation = variant === "evaluation";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      className={
        isEvaluation
          ? "rounded-[1.5rem] border border-[#5d7896]/55 bg-[#081725] p-5 text-white shadow-[0_24px_70px_rgba(2,10,22,0.34)]"
          : "rounded-[1.5rem] border border-un-line bg-white p-5 shadow-command"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div
            className={
              isEvaluation
                ? "inline-flex items-center gap-2 rounded-full border border-[#7fb8ef]/35 bg-[#123352]/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#d7ecff]"
                : "inline-flex items-center gap-2 rounded-full border border-un-line bg-un-light px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-navy-900"
            }
          >
            <ExternalLink size={14} aria-hidden />
            Live Link
          </div>
          <h3 className={isEvaluation ? "mt-3 text-2xl font-bold text-white" : "mt-3 text-2xl font-bold text-navy-900"}>
            {title}
          </h3>
          <p className={isEvaluation ? "mt-1 text-lg font-semibold text-[#d7ecff]" : "mt-1 text-lg font-semibold text-navy-700"}>
            {subtitle}
          </p>
        </div>
      </div>

      <div
        className={
          isEvaluation
            ? "mt-5 flex flex-col items-center rounded-2xl border border-[#5d7896]/45 bg-[#10263d]/[0.82] p-4"
            : "mt-5 flex flex-col items-center rounded-2xl border border-field-border bg-field-mist p-4"
        }
      >
        <div className={isEvaluation ? "rounded-2xl border border-[#7fb8ef]/35 bg-white p-3 shadow-sm" : "rounded-2xl border border-un-line bg-white p-3 shadow-sm"}>
          <QRCodeSVG
            value={url}
            size={190}
            level="M"
            marginSize={2}
            bgColor="#FFFFFF"
            fgColor="#081F3B"
            className="h-40 w-40 md:h-48 md:w-48"
          />
        </div>
        <p className={isEvaluation ? "mt-4 text-center text-sm font-semibold leading-6 text-white/[0.76]" : "mt-4 text-center text-sm font-semibold leading-6 text-slate-600"}>
          Use this QR code to access the live Vercel version of the activity.
        </p>
        <p className={isEvaluation ? "mt-2 break-all text-center text-xs font-bold leading-5 text-[#d7ecff]" : "mt-2 break-all text-center text-xs font-bold leading-5 text-navy-800"}>
          {displayUrl(url)}
        </p>
      </div>

      <button
        type="button"
        onClick={copyLink}
        className={
          isEvaluation
            ? "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123352] px-4 py-3 font-bold text-white shadow-[0_16px_36px_rgba(2,10,22,0.32)] transition hover:-translate-y-0.5 hover:bg-[#19446b]"
            : "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 font-bold text-white shadow-lg shadow-navy-900/15 transition hover:-translate-y-0.5 hover:bg-navy-800"
        }
      >
        {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
        {copied ? "Link copied" : "Copy link"}
      </button>

      <p className={isEvaluation ? "mt-3 text-center text-sm font-semibold leading-6 text-white/[0.72]" : "mt-3 text-center text-sm font-semibold leading-6 text-slate-600"}>
        One laptop per group is recommended. Work is saved only on that
        laptop/browser.
      </p>
    </article>
  );
}
