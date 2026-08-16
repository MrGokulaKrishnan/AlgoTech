import { ArrowLeft, ArrowRight, CircleDot, Code2, Gauge, PlayCircle } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getAlgorithm } from "../data/algorithms";
import { CodePanel } from "../components/CodePanel";
import { ComplexityPanel } from "../components/ComplexityPanel";

export const AlgorithmDetailPage = () => {
  const { algorithmId = "" } = useParams();
  const algorithm = getAlgorithm(algorithmId);
  if (!algorithm) return <Navigate to="/learn" replace />;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-black">
      <Link to="/learn" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-emerald-400 transition-colors">
        <ArrowLeft size={16} /> All Lessons
      </Link>
      <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-emerald-950/80 border border-emerald-900/60 px-3 py-1 text-xs font-bold text-emerald-400">
              {algorithm.category}
            </span>
            <span className="rounded-lg border border-emerald-950 bg-black px-3 py-1 text-xs font-bold text-zinc-300">
              {algorithm.difficulty}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">{algorithm.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{algorithm.description}</p>
          
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={`/visualize/${algorithm.id}`} className="button-primary">
              <PlayCircle size={19} fill="currentColor" /> Open Visualizer
            </Link>
            <Link to="/roadmap" className="button-secondary">
              View Learning Path <ArrowRight size={17} />
            </Link>
          </div>

          <section className="mt-12">
            <div className="flex items-center gap-2 text-emerald-400">
              <CircleDot size={20} />
              <h2 className="text-2xl font-bold text-white">What You Will Learn</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-950 bg-black p-5">
                <Code2 className="text-emerald-400" size={22} />
                <h3 className="mt-3 font-bold text-white">The Core Idea</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Understand each comparison, decision, and state change as it happens visually.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-950 bg-black p-5">
                <Gauge className="text-emerald-400" size={22} />
                <h3 className="mt-3 font-bold text-white">When to Use It</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Connect the algorithm’s time and space trade-offs to practical problem solving.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <ComplexityPanel complexity={algorithm.complexity} />
          <CodePanel lines={algorithm.code} />
        </div>
      </div>
    </section>
  );
};

