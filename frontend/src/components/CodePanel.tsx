type CodePanelProps = {
  lines: string[];
  activeLine?: number;
};

export const CodePanel = ({ lines, activeLine }: CodePanelProps) => (
  <section className="panel overflow-hidden border-emerald-950/80 bg-black" aria-label="Java source code">
    <div className="flex items-center justify-between border-b border-emerald-950 px-6 py-5 bg-zinc-950">
      <h2 className="font-bold text-white text-base">Source Code</h2>
      <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-bold text-emerald-400">Java</span>
    </div>
    <pre className="max-h-[28rem] overflow-auto p-5 text-base leading-8 font-mono sm:p-6 bg-black"><code>
      {lines.map((line, index) => {
        const lineNumber = index + 1;
        const isActive = lineNumber === activeLine;
        return (
          <div
            key={`${lineNumber}-${line}`}
            className={`grid grid-cols-[3rem_1fr] rounded-lg px-3 py-1 transition-all ${
              isActive
                ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)] font-bold"
                : "text-zinc-300 hover:bg-zinc-950"
            }`}
          >
            <span className={`select-none text-right font-mono text-sm ${isActive ? "text-emerald-400 font-bold" : "text-zinc-600"}`}>
              {lineNumber}
            </span>
            <span className="pl-5">{line || " "}</span>
          </div>
        );
      })}
    </code></pre>
  </section>
);
