import { ArrowLeft, ArrowRight, CircleDot, Code2, Gauge, PlayCircle } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getAlgorithm } from "../data/algorithms";
import { CodePanel } from "../components/CodePanel";
import { ComplexityPanel } from "../components/ComplexityPanel";
import { FadeIn } from "../components/Animations";

export const AlgorithmDetailPage = () => {
  const { algorithmId = "" } = useParams();
  const algorithm = getAlgorithm(algorithmId);
  if (!algorithm) return <Navigate to="/learn" replace />;

  return (
    <section className="mx-auto max-w-screen-2xl page-padding py-16 sm:py-24 bg-black">
      <FadeIn>
        <Link to="/learn" className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-400 hover:text-emerald-400 transition-colors">
          <ArrowLeft size={16} /> All Lessons
        </Link>
      </FadeIn>
      <div className="mt-7 grid gap-12 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-emerald-950/80 border border-emerald-900/60 px-3 py-1 text-sm font-bold text-emerald-400">
                {algorithm.category}
              </span>
              <span className="rounded-lg border border-emerald-950 bg-black px-3 py-1 text-sm font-bold text-zinc-300">
                {algorithm.difficulty}
              </span>
            </div>
            <h1 className="mt-7 text-5xl font-black tracking-tight text-white sm:text-6xl">{algorithm.name}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-zinc-300">{algorithm.description}</p>
          </FadeIn>
          
          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to={`/visualize/${algorithm.id}`} className="button-primary">
                <PlayCircle size={19} fill="currentColor" /> Open Visualizer
              </Link>
              <Link to="/roadmap" className="button-secondary">
                View Learning Path <ArrowRight size={17} />
              </Link>
            </div>
          </FadeIn>

          <section className="mt-16">
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 text-emerald-400">
                <CircleDot size={20} />
                <h2 className="text-3xl font-bold text-white">What You Will Learn</h2>
              </div>
            </FadeIn>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <FadeIn delay={0.25}>
                <div className="rounded-2xl border border-emerald-950 bg-black p-7">
                  <Code2 className="text-emerald-400" size={22} />
                  <h3 className="mt-4 font-bold text-white">The Core Idea</h3>
                  <p className="mt-1 text-base leading-6 text-zinc-400">
                    Understand each comparison, decision, and state change as it happens visually.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="rounded-2xl border border-emerald-950 bg-black p-7">
                  <Gauge className="text-emerald-400" size={22} />
                  <h3 className="mt-4 font-bold text-white">When to Use It</h3>
                  <p className="mt-1 text-base leading-6 text-zinc-400">
                    Connect the algorithm’s time and space trade-offs to practical problem solving.
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>
        </div>

        <FadeIn delay={0.25}>
          <div className="space-y-6">
            <ComplexityPanel complexity={algorithm.complexity} />
            <CodePanel lines={algorithm.code} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
