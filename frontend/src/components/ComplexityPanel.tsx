import type { Complexity } from "../types/algorithm";

export const ComplexityPanel = ({ complexity }: { complexity: Complexity }) => (
  <section className="panel p-6 sm:p-8 border-emerald-950/80 bg-black">
    <h2 className="font-bold text-white text-lg">Complexity Analysis</h2>
    <dl className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
      <div className="rounded-xl border border-emerald-950 bg-zinc-950 p-4">
        <dt className="text-sm font-semibold text-zinc-500">Best</dt>
        <dd className="mt-1.5 text-lg font-mono font-bold text-emerald-400">{complexity.best}</dd>
      </div>
      <div className="rounded-xl border border-emerald-950 bg-zinc-950 p-4">
        <dt className="text-sm font-semibold text-zinc-500">Average</dt>
        <dd className="mt-1.5 text-lg font-mono font-bold text-amber-400">{complexity.average}</dd>
      </div>
      <div className="rounded-xl border border-emerald-950 bg-zinc-950 p-4">
        <dt className="text-sm font-semibold text-zinc-500">Worst</dt>
        <dd className="mt-1.5 text-lg font-mono font-bold text-rose-400">{complexity.worst}</dd>
      </div>
    </dl>
    <div className="mt-6 flex items-center justify-between border-t border-emerald-950 pt-4 text-base">
      <span className="text-zinc-400 font-medium">Space Complexity</span>
      <strong className="font-mono font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-md">
        {complexity.space}
      </strong>
    </div>
    <p className="mt-4 text-base leading-7 text-zinc-400">{complexity.explanation}</p>
  </section>
);
