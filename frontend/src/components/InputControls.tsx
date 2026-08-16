import { Play, RotateCcw } from "lucide-react";
import type { AlgorithmMetadata } from "../types/algorithm";

type InputControlsProps = {
  metadata: AlgorithmMetadata;
  values: string;
  target: string;
  error?: string;
  onValuesChange: (values: string) => void;
  onTargetChange: (target: string) => void;
  onVisualize: () => void;
  onRestoreExample: () => void;
};

export const InputControls = ({ metadata, values, target, error, onValuesChange, onTargetChange, onVisualize, onRestoreExample }: InputControlsProps) => (
  <section className="panel p-5 border-emerald-950/80 bg-black">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 className="font-bold text-white text-base">Try your own input</h2>
        <p className="mt-0.5 text-xs text-zinc-400">Use comma-separated whole or decimal numbers.</p>
      </div>
      <button type="button" onClick={onRestoreExample} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
        <RotateCcw className="mr-1 inline" size={14} /> Reset Example
      </button>
    </div>
    <div className={`grid gap-3 ${metadata.needsTarget ? "sm:grid-cols-[1fr_9rem]" : ""}`}>
      <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
        {metadata.inputLabel}
        <input
          value={values}
          onChange={(event) => onValuesChange(event.target.value)}
          placeholder="64, 25, 12, 22, 11"
          className="rounded-xl border border-emerald-950 bg-zinc-950 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </label>
      {metadata.needsTarget && (
        <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
          Target
          <input
            inputMode="decimal"
            value={target}
            onChange={(event) => onTargetChange(event.target.value)}
            placeholder="60"
            className="rounded-xl border border-emerald-950 bg-zinc-950 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </label>
      )}
    </div>
    {metadata.requiresSortedInput && (
      <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-medium text-amber-200">
        Binary Search requires values in ascending order.
      </p>
    )}
    {error && (
      <p role="alert" className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-medium text-rose-200">
        {error}
      </p>
    )}
    <button type="button" onClick={onVisualize} className="button-primary mt-4 w-full sm:w-auto">
      <Play size={16} fill="currentColor" /> Visualize
    </button>
  </section>
);

