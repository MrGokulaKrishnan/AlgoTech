import type { Complexity } from "../types/algorithm";

export const ComplexityPanel = ({ complexity }: { complexity: Complexity }) => (
  <section className="panel p-5 border-emerald-950/80 bg-black">
    <h2 className="font-bold text-white text-base">Complexity Analysis</h2>
    <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded-xl border border-emerald-950 bg-zinc-950 p-2.5">
        <dt className="text-xs font-semibold text-zinc-500">Best</dt>
        <dd className="mt-1 font-mono font-bold text-emerald-400">{complexity.best}</dd>
      </div>
      <div className="rounded-xl border border-emerald-950 bg-zinc-950 p-2.5">
        <dt className="text-xs font-semibold text-zinc-500">Average</dt>
        <dd className="mt-1 font-mono font-bold text-amber-400">{complexity.average}</dd>
      </div>
      <div className="rounded-xl border border-emerald-950 bg-zinc-950 p-2.5">
        <dt className="text-xs font-semibold text-zinc-500">Worst</dt>
        <dd className="mt-1 font-mono font-bold text-rose-400">{complexity.worst}</dd>
      </div>
    </dl>
    <div className="mt-4 flex items-center justify-between border-t border-emerald-950 pt-3 text-sm">
      <span className="text-zinc-400 font-medium">Space Complexity</span>
      <strong className="font-mono font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-md">
        {complexity.space}
      </strong>
    </div>
    <p className="mt-3.5 text-sm leading-6 text-zinc-400">{complexity.explanation}</p>
  </section>
);

