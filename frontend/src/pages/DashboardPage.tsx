import { BookOpenCheck, Flame, GraduationCap, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { algorithmMetadata } from "../data/algorithms";
import { useAuth } from "../context/AuthContext";
import { getProgress } from "../services/progress";
import type { ProgressRecord } from "../types/auth";

export const DashboardPage = () => {
  const { user, token } = useAuth();
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!token) return;
    let active = true;
    void getProgress(token)
      .then((records) => {
        if (active) setProgress(records);
      })
      .catch(() => {
        if (active) setError("We could not load your saved progress yet.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token]);

  const completed = useMemo(() => progress.filter((record) => record.completed).length, [progress]);
  const overall = algorithmMetadata.length ? Math.round((completed / algorithmMetadata.length) * 100) : 0;
  const progressByAlgorithm = new Map(progress.map((record) => [record.algorithmId, record]));

  return (
    <section className="mx-auto max-w-screen-2xl page-padding py-16 sm:py-24 bg-black">
      <p className="eyebrow">Your Learning Dashboard</p>
      <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Welcome back, {user?.name ?? "learner"}.</h1>
      <p className="mt-4 text-xl text-zinc-400">Your visualizer milestones appear here as you complete them.</p>

      {/* Stats Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <article className="panel p-8 border-emerald-950/80 bg-black">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Target size={24} />
          </span>
          <p className="mt-6 text-sm font-semibold text-zinc-400">Overall Progress</p>
          <p className="mt-1 text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{overall}%</p>
        </article>

        <article className="panel p-8 border-emerald-950/80 bg-black">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <BookOpenCheck size={24} />
          </span>
          <p className="mt-6 text-sm font-semibold text-zinc-400">Algorithms Completed</p>
          <p className="mt-1 text-4xl font-black text-white">
            {completed} <span className="text-sm font-normal text-zinc-500">/ {algorithmMetadata.length}</span>
          </p>
        </article>

        <article className="panel p-8 border-emerald-950/80 bg-black">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <GraduationCap size={24} />
          </span>
          <p className="mt-6 text-sm font-semibold text-zinc-400">Topic Quizzes</p>
          <Link to="/quiz" className="mt-2.5 inline-block text-sm font-bold text-emerald-400 hover:text-emerald-300">
            Take a Quiz →
          </Link>
        </article>

        <article className="panel p-8 border-emerald-950/80 bg-black">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <Flame size={24} />
          </span>
          <p className="mt-6 text-sm font-semibold text-zinc-400">Active Streak</p>
          <p className="mt-1 text-4xl font-black text-zinc-600">—</p>
        </article>
      </div>

      {/* Progress Table */}
      <section className="panel mt-10 p-8 sm:p-10 border-emerald-950/80 bg-black">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Algorithm Progress</h2>
            <p className="mt-1 text-xs text-zinc-400">Finish a visualizer run to mark the lesson complete.</p>
          </div>
          <Link to="/learn" className="button-primary">
            Continue Learning
          </Link>
        </div>

        {isLoading ? (
          <p className="py-12 text-center text-zinc-500">Loading your saved progress…</p>
        ) : error ? (
          <p role="alert" className="mt-6 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-sm text-rose-200">
            {error}
          </p>
        ) : (
          <div className="mt-6 divide-y divide-emerald-950/80">
            {algorithmMetadata.map((algorithm) => {
              const record = progressByAlgorithm.get(algorithm.id);
              const percentage = record?.progressPercentage ?? 0;
              return (
                <div key={algorithm.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <div className="min-w-48">
                    <p className="font-bold text-white">{algorithm.name}</p>
                    <p className="text-xs text-zinc-500">{algorithm.category}</p>
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-950 border border-emerald-950">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={`text-xs font-mono font-bold ${record?.completed ? "text-emerald-400" : "text-zinc-500"}`}>
                    {record?.completed ? "Completed ✓" : `${percentage}%`}
                  </span>
                  <Link
                    to={`/visualize/${algorithm.id}`}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {record?.completed ? "Replay" : "Start"}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
};

