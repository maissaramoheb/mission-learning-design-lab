"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldShellProps = {
  label: string;
  helper?: string;
  tone?: "default" | "tactical";
  children: ReactNode;
};

export function FieldShell({
  label,
  helper,
  tone = "default",
  children
}: FieldShellProps) {
  const tactical = tone === "tactical";

  return (
    <label className="block">
      <span className={cn("block text-base font-bold text-navy-900", tactical && "text-white")}>
        {label}
      </span>
      {helper ? (
        <span
          className={cn(
            "mt-1 block text-sm leading-6 text-slate-600",
            tactical && "text-base leading-7 text-white/[0.78]"
          )}
        >
          {helper}
        </span>
      ) : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-field-border bg-white px-4 py-3 text-lg text-field-ink shadow-sm transition placeholder:text-slate-400 hover:border-un-line focus:border-un-blue focus:shadow-md"
    />
  );
}

type TextAreaProps = TextInputProps & {
  rows?: number;
};

export function TextArea({ value, onChange, placeholder, rows = 4 }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-y rounded-xl border border-field-border bg-white px-4 py-3 text-lg leading-8 text-field-ink shadow-sm transition placeholder:text-slate-400 hover:border-un-line focus:border-un-blue focus:shadow-md"
    />
  );
}

type SelectInputProps = {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

export function SelectInput({ value, onChange, children }: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-field-border bg-white px-4 py-3 text-lg text-field-ink shadow-sm transition hover:border-un-line focus:border-un-blue focus:shadow-md"
    >
      {children}
    </select>
  );
}

type OptionToggleProps = {
  selected: boolean;
  label: string;
  onClick: () => void;
  description?: string;
  tone?: "default" | "tactical";
};

export function OptionToggle({
  selected,
  label,
  onClick,
  description,
  tone = "default"
}: OptionToggleProps) {
  const tactical = tone === "tactical";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        tactical
          ? selected
            ? "border-[#8ec2f4] bg-[#123352] text-white ring-2 ring-[#5da7f2]/35"
            : "border-[#5d7896]/45 bg-[#081725] text-white/[0.82] hover:border-[#8ec2f4]"
          : selected
            ? "border-un-blue bg-un-light text-navy-900 ring-2 ring-un-line"
            : "border-field-border bg-white text-slate-700 hover:border-un-line"
      )}
    >
      <span className="block text-base font-bold">{label}</span>
      {description ? <span className="mt-1 block text-sm leading-6">{description}</span> : null}
    </button>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-un-line bg-un-light px-3 py-1 text-sm font-bold tracking-wide text-navy-800 shadow-sm">
      {children}
    </span>
  );
}
