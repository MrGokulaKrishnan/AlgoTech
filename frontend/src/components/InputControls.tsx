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
  <section className="panel p-6 sm:p-8 border-emerald-950/80 bg-black">
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <h2 className="font-bold text-white text-lg">Try your own input</h2>
        <p className="mt-1 text-sm text-zinc-400">Use comma-separated whole or decimal numbers.</p>
      </div>
      <button type="button" onClick={onRestoreExample} className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
        <RotateCcw className="mr-1.5 inline" size={15} /> Reset Example
      </button>
    </div>
    <div className={`grid gap-4 ${metadata.needsTarget ? "sm:grid-cols-[1fr_10rem]" : ""}`}>
      <label className="grid gap-2 text-sm font-semibold text-zinc-300">
        {metadata.inputLabel}
        <input
          value={values}
          onChange={(event) => onValuesChange(event.target.value)}
          placeholder="64, 25, 12, 22, 11"
          className="rounded-xl border border-emerald-950 bg-zinc-950 px-4 py-3 font-mono text-base text-white placeholder:text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </label>
      {metadata.needsTarget && (
        <label className="grid gap-2 text-sm font-semibold text-zinc-300">
          Target
          <input
            inputMode="decimal"
            value={target}
            onChange={(event) => onTargetChange(event.target.value)}
            placeholder="60"
            className="rounded-xl border border-emerald-950 bg-zinc-950 px-4 py-3 font-mono text-base text-white placeholder:text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </label>
      )}
    </div>
    {metadata.requiresSortedInput && (
      <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-200">
        Binary Search requires values in ascending order.
      </p>
    )}
    {error && (
      <p role="alert" className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200">
        {error}
      </p>
    )}
    <button type="button" onClick={onVisualize} className="button-primary mt-5 w-full sm:w-auto">
      <Play size={18} /> Visualize
    </button>
  </section>
);
