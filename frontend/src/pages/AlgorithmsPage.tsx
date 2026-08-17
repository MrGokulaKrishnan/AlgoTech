import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { algorithmMetadata } from "../data/algorithms";
import type { AlgorithmCategory } from "../types/algorithm";

const filters: Array<"All" | AlgorithmCategory> = ["All", "Searching", "Sorting"];

export const AlgorithmsPage = () => {
  const [filter, setFilter] = useState<"All" | AlgorithmCategory>("All");
  const [query, setQuery] = useState("");
  const visibleAlgorithms = useMemo(
    () =>
      algorithmMetadata.filter(
        (algorithm) =>
          (filter === "All" || algorithm.category === filter) &&
          algorithm.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [filter, query]
  );

  return (
    <section className="mx-auto max-w-screen-2xl page-padding py-16 sm:py-24 bg-black">
      <div className="max-w-2xl">
        <p className="eyebrow">Interactive Lessons</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white">Algorithms you can actually follow.</h1>
        <p className="mt-5 text-xl leading-8 text-zinc-400">
          Choose a lesson, set your own data, and move through every decision at a pace that makes sense.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-emerald-950/80 bg-zinc-950/80 p-5 sm:flex-row sm:items-center sm:justify-between shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 overflow-x-auto">
          <SlidersHorizontal size={17} className="shrink-0 text-emerald-400" />
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                filter === item
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-black text-zinc-300 hover:text-white border border-emerald-950"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
          <input
            aria-label="Search algorithms"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search lessons..."
            className="w-full rounded-xl border border-emerald-950 bg-black py-3 pl-10 pr-3.5 text-base text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
          />
        </label>
      </div>

      {/* Cards Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleAlgorithms.map((algorithm) => (
          <article
            key={algorithm.id}
            className="panel flex flex-col p-8 border-emerald-950/80 bg-black hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-lg bg-emerald-950/80 border border-emerald-900/60 px-3 py-1 text-sm font-bold text-emerald-300">
                {algorithm.category}
              </span>
              <span className="text-sm font-bold text-emerald-400">{algorithm.difficulty}</span>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white">{algorithm.name}</h2>
            <p className="mt-3 flex-1 text-base leading-6 text-zinc-400">{algorithm.shortDescription}</p>
            <div className="mt-8 flex items-center justify-between border-t border-emerald-950 pt-5 text-sm">
              <span className="text-zinc-500 text-sm">
                Worst: <strong className="font-mono text-zinc-200">{algorithm.complexity.worst}</strong>
              </span>
              <Link
                to={`/algorithms/${algorithm.id}`}
                className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center"
              >
                Learn <ArrowRight className="ml-1 inline" size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {visibleAlgorithms.length === 0 && (
        <div className="panel mt-7 p-16 text-center border-emerald-950 bg-black">
          <p className="font-bold text-white">No matching lessons found.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
            className="mt-3 text-sm font-bold text-emerald-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
