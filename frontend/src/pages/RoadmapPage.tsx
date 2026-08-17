import { ArrowDown, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { roadmap } from "../data/roadmap";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/Animations";

export const RoadmapPage = () => (
  <section className="mx-auto max-w-screen-2xl page-padding py-16 sm:py-24 bg-black">
    <FadeIn>
      <div className="max-w-2xl">
        <p className="eyebrow">Learning Path</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white">A roadmap that keeps DSA manageable.</h1>
        <p className="mt-5 text-xl leading-8 text-zinc-400">
          Move step-by-step from core foundations to advanced algorithms. Pick up where you left off anytime.
        </p>
      </div>
    </FadeIn>

    <StaggerContainer>
      <div className="mt-12 space-y-0">
        {roadmap.map((topic, index) => (
          <StaggerItem key={topic.id}>
            <div className="relative">
              <article
                className={`panel flex flex-col gap-7 p-7 sm:flex-row sm:items-center sm:p-8 border-emerald-950/80 bg-black hover:scale-[1.01] duration-300 ${
                  topic.active ? "border-emerald-500/60 bg-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]" : ""
                }`}
              >
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono font-bold ${
                    topic.completion === 100
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : topic.active
                      ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      : "bg-zinc-950 text-zinc-500 border border-emerald-950"
                  }`}
                >
                  {topic.completion === 100 ? <CheckCircle2 size={21} /> : index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{topic.title}</h2>
                    <span className="rounded-lg border border-emerald-950 bg-emerald-950/40 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                      {topic.difficulty}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1 text-emerald-400/80">
                      <Clock3 size={14} /> {topic.duration}
                    </span>
                    <span>
                      {topic.algorithmCount || "Core"} {topic.algorithmCount === 1 ? "algorithm" : "algorithms"}
                    </span>
                  </div>
                  <div className="mt-3 h-2 max-w-md overflow-hidden rounded-full bg-zinc-950 border border-emerald-950">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      style={{ width: `${topic.completion}%` }}
                    />
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 sm:block sm:text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400">{topic.completion}% complete</span>
                  {topic.id === "searching" || topic.id === "sorting" ? (
                    <Link to="/learn" className="button-primary mt-0 sm:mt-3 block text-center text-sm">
                      Start
                    </Link>
                  ) : (
                    <button type="button" className="button-secondary mt-0 text-sm sm:mt-3 block">
                      Preview
                    </button>
                  )}
                </div>
              </article>
              {index < roadmap.length - 1 && (
                <div className="grid h-9 place-items-center text-emerald-900">
                  <ArrowDown size={18} />
                </div>
              )}
            </div>
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>

    <div className="mt-10 text-center">
      <Link to="/learn" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
        Explore all available lessons <ArrowRight className="ml-1 inline" size={15} />
      </Link>
    </div>
  </section>
);
