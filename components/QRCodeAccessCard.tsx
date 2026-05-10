"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type QRCodeAccessCardProps = {
  url: string;
  title: string;
  subtitle: string;
};

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function QRCodeAccessCard({ url, title, subtitle }: QRCodeAccessCardProps) {
  const [copied, setCopied] = useState(false);

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
    <article className="rounded-[1.5rem] border border-un-line bg-white p-5 shadow-command">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-un-line bg-un-light px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-navy-900">
            <ExternalLink size={14} aria-hidden />
            Live Link
          </div>
          <h3 className="mt-3 text-2xl font-bold text-navy-900">{title}</h3>
          <p className="mt-1 text-lg font-semibold text-navy-700">{subtitle}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-2xl border border-field-border bg-field-mist p-4">
        <div className="rounded-2xl border border-un-line bg-white p-3 shadow-sm">
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
        <p className="mt-4 text-center text-sm font-semibold leading-6 text-slate-600">
          Use this QR code to access the live Vercel version of the activity.
        </p>
        <p className="mt-2 break-all text-center text-xs font-bold leading-5 text-navy-800">
          {displayUrl(url)}
        </p>
      </div>

      <button
        type="button"
        onClick={copyLink}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 font-bold text-white shadow-lg shadow-navy-900/15 transition hover:-translate-y-0.5 hover:bg-navy-800"
      >
        {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
        {copied ? "Link copied" : "Copy link"}
      </button>

      <p className="mt-3 text-center text-sm font-semibold leading-6 text-slate-600">
        One laptop per group is recommended. Work is saved only on that
        laptop/browser.
      </p>
    </article>
  );
}
