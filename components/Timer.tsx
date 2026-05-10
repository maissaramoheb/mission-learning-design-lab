"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type TimerProps = {
  seconds: number;
  label?: string;
};

export function Timer({ seconds, label = "Timer" }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRemaining(seconds);
    setRunning(false);
  }, [seconds]);

  useEffect(() => {
    if (!running || remaining <= 0) {
      return;
    }

    const id = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(id);
  }, [remaining, running]);

  const formatted = useMemo(() => {
    const minutes = Math.floor(remaining / 60)
      .toString()
      .padStart(2, "0");
    const secs = (remaining % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  }, [remaining]);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-un-line bg-white/[0.92] px-4 py-3 shadow-sm">
      <div>
        <p className="text-xs font-bold uppercase text-un-blue">{label}</p>
        <p className="font-mono text-3xl font-bold text-navy-900">{formatted}</p>
      </div>
      <div className="ml-auto flex gap-2">
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-3 py-2 text-sm font-bold text-white hover:bg-navy-800"
        >
          {running ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRemaining(seconds);
            setRunning(false);
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-field-border bg-white px-3 py-2 text-sm font-bold text-navy-800 hover:border-un-blue"
        >
          <RotateCcw size={16} aria-hidden />
          Reset
        </button>
      </div>
    </div>
  );
}
