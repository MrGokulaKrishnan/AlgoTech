import { Lightbulb } from "lucide-react";
import type { AlgorithmStep } from "../types/algorithm";

export const ExplanationPanel = ({ step }: { step?: AlgorithmStep }) => (
  <section className="panel border-emerald-500/30 bg-emerald-950/20 p-6 sm:p-8 shadow-[0_0_30px_rgba(16,185,129,0.06)]" aria-live="polite">
    <div className="mb-4 flex items-center gap-3 text-emerald-400">
      <Lightbulb size={24} className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      <h2 className="font-bold text-white text-lg">What is happening?</h2>
    </div>
    {step ? (
      <>
        <div className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-mono font-bold tracking-wider text-emerald-300">
          STEP {step.stepNumber}
        </div>
        <p className="mt-4 text-lg leading-8 text-zinc-100 font-medium">{step.description}</p>
      </>
    ) : (
      <p className="text-zinc-500 text-base">The current explanation will appear here.</p>
    )}
  </section>
);
