import { motion, useReducedMotion } from "framer-motion";
import type { AlgorithmStep } from "../types/algorithm";

type ArrayVisualizerProps = {
  step?: AlgorithmStep;
  target?: number;
};

const cellStyle = (step: AlgorithmStep, index: number): string => {
  const { data } = step;
  if (data.foundIndex === index) 
    return "border-emerald-400 bg-emerald-500/25 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/50";
  if (step.swappedIndices?.includes(index)) 
    return "border-rose-500 bg-rose-500/20 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.3)]";
  if (step.comparedIndices?.includes(index)) 
    return "border-amber-400 bg-amber-500/20 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.3)]";
  if (step.highlightedIndices?.includes(index)) 
    return "border-emerald-300 bg-emerald-400/20 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.4)]";
  if (data.sortedIndices?.includes(index)) 
    return "border-emerald-700/80 bg-emerald-950/50 text-emerald-300";
  if (data.eliminatedIndices?.includes(index)) 
    return "border-zinc-800 bg-black/60 text-zinc-600 opacity-40 scale-95";
  return "border-emerald-950/80 bg-zinc-950 text-zinc-100 hover:border-emerald-900";
};

export const ArrayVisualizer = ({ step, target }: ArrayVisualizerProps) => {
  const reducedMotion = useReducedMotion();
  if (!step) return <div className="flex min-h-72 items-center justify-center text-zinc-500">Enter input to create a visualization.</div>;

  const pointersByIndex = Object.entries(step.data.pointers ?? {}).reduce<Record<number, string[]>>((result, [name, index]) => {
    if (index >= 0 && index < step.data.values.length) {
      result[index] = [...(result[index] ?? []), name];
    }
    return result;
  }, {});

  return (
    <section aria-label="Array visualization" className="relative overflow-hidden rounded-2xl border border-emerald-950/80 bg-black p-5 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="rounded-full border border-emerald-950 bg-emerald-950/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">Array Visualizer</span>
        {target !== undefined && <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">Target = {target}</span>}
      </div>
      <div className="flex min-h-56 min-w-max items-center justify-center gap-2 pb-10 pt-4 sm:gap-3">
        {step.data.values.map((value, index) => (
          <div className="relative flex flex-col items-center" key={`${value}-${index}`}>
            <motion.div
              layout={!reducedMotion}
              initial={false}
              animate={reducedMotion ? undefined : { y: step.swappedIndices?.includes(index) ? [0, -12, 0] : 0, scale: step.highlightedIndices?.includes(index) ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold tabular-nums transition-all sm:h-16 sm:w-16 sm:text-xl ${cellStyle(step, index)}`}
              aria-label={`Index ${index}, value ${value}`}
            >
              {value}
            </motion.div>
            <span className="mt-2.5 text-xs font-mono font-medium text-zinc-500">{index}</span>
            {pointersByIndex[index] && (
              <div className="absolute top-[5.65rem] flex flex-wrap justify-center gap-1 sm:top-[6.2rem]">
                {pointersByIndex[index].map((name) => (
                  <span key={name} className="rounded-md border border-emerald-500/40 bg-black px-1.5 py-0.5 text-[10px] font-black tracking-wider text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    ↑ {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {step.data.values.length === 0 && <p className="py-16 text-center text-zinc-500">This array is empty.</p>}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-zinc-400" aria-label="Visualization legend">
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />Comparing</span>
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />Swapping / Moving</span>
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />Final / Found</span>
      </div>
    </section>
  );
};

