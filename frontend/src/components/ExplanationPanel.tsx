import { Lightbulb } from "lucide-react";
import type { AlgorithmStep } from "../types/algorithm";

export const ExplanationPanel = ({ step }: { step?: AlgorithmStep }) => (
  <section className="panel border-emerald-500/30 bg-emerald-950/20 p-5 shadow-[0_0_30px_rgba(16,185,129,0.06)]" aria-live="polite">
    <div className="mb-3 flex items-center gap-2 text-emerald-400">
      <Lightbulb size={20} className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      <h2 className="font-bold text-white text-base">What is happening?</h2>
    </div>
    {step ? (
      <>
        <div className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider text-emerald-300">
          STEP {step.stepNumber}
        </div>
        <p className="mt-2.5 text-base leading-7 text-zinc-100 font-medium">{step.description}</p>
      </>
    ) : (
      <p className="text-zinc-500 text-sm">The current explanation will appear here.</p>
    )}
  </section>
);

