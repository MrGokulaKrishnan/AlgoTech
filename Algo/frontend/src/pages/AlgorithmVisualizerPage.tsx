import { ArrowLeft, CheckCircle2, ListRestart } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { generateSteps, isNonDecreasing, parseNumberList } from "../algorithms";
import { ArrayVisualizer } from "../components/ArrayVisualizer";
import { CodePanel } from "../components/CodePanel";
import { ComplexityPanel } from "../components/ComplexityPanel";
import { ExplanationPanel } from "../components/ExplanationPanel";
import { InputControls } from "../components/InputControls";
import { PlaybackControls } from "../components/PlaybackControls";
import { getAlgorithm } from "../data/algorithms";
import { useAuth } from "../context/AuthContext";
import { useAnimationController } from "../hooks/useAnimationController";
import { saveProgress } from "../services/progress";
import type { AlgorithmId, AlgorithmRunInput } from "../types/algorithm";

type InputExample = { values: string; target: string; run: AlgorithmRunInput };

const examples: Record<AlgorithmId, InputExample> = {
  "linear-search": { values: "12, 5, 18, 7, 24, 3", target: "18", run: { values: [12, 5, 18, 7, 24, 3], target: 18 } },
  "binary-search": { values: "10, 20, 30, 40, 50, 60, 70", target: "60", run: { values: [10, 20, 30, 40, 50, 60, 70], target: 60 } },
  "bubble-sort": { values: "64, 25, 12, 22, 11", target: "", run: { values: [64, 25, 12, 22, 11] } },
  "selection-sort": { values: "64, 25, 12, 22, 11", target: "", run: { values: [64, 25, 12, 22, 11] } },
  "insertion-sort": { values: "64, 25, 12, 22, 11", target: "", run: { values: [64, 25, 12, 22, 11] } },
};

const copyRun = (input: AlgorithmRunInput): AlgorithmRunInput => ({ values: [...input.values], target: input.target });

export const AlgorithmVisualizerPage = () => {
  const { algorithmId = "" } = useParams();
  const { user, token } = useAuth();
  const algorithm = getAlgorithm(algorithmId);
  const id = algorithm?.id;
  const initial = id ? examples[id] : undefined;
  const [valuesText, setValuesText] = useState(initial?.values ?? "");
  const [targetText, setTargetText] = useState(initial?.target ?? "");
  const [runInput, setRunInput] = useState<AlgorithmRunInput>(() => initial ? copyRun(initial.run) : { values: [] });
  const [error, setError] = useState<string>();
  const [progressStatus, setProgressStatus] = useState<"idle" | "saved" | "error">("idle");
  const completedRuns = useRef(new Set<string>());
  const wasAtEnd = useRef(false);

  useEffect(() => {
    if (!id) return;
    const example = examples[id];
    setValuesText(example.values);
    setTargetText(example.target);
    setRunInput(copyRun(example.run));
    setError(undefined);
  }, [id]);

  const steps = useMemo(() => id ? generateSteps(runInput, id) : [], [id, runInput]);
  const controller = useAnimationController(steps);
  const runKey = `${id ?? "unknown"}:${runInput.values.join(",")}:${runInput.target ?? ""}:${controller.totalSteps}`;

  useEffect(() => {
    const reachedEnd = !wasAtEnd.current && controller.isAtEnd && controller.currentIndex > 0;
    wasAtEnd.current = controller.isAtEnd;
    if (!id || !user || !token || !reachedEnd || completedRuns.current.has(runKey)) return;
    completedRuns.current.add(runKey);
    void saveProgress(token, {
      algorithmId: id,
      completed: true,
      progressPercentage: 100,
      lastStep: controller.totalSteps,
    })
      .then(() => setProgressStatus("saved"))
      .catch(() => setProgressStatus("error"));
  }, [controller.currentIndex, controller.isAtEnd, controller.totalSteps, id, runKey, token, user]);

  // Keyboard controls: Space = play/pause, ← = prev, → = next, R = reset
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        controller.togglePlay();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        controller.previous();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        controller.next();
      } else if (event.key === "r" || event.key === "R") {
        controller.reset();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [controller]);

  if (!algorithm || !id) return <Navigate to="/learn" replace />;

  const runVisualization = () => {
    const values = parseNumberList(valuesText);
    if (!values) { setError("Enter at least one valid number, separated by commas."); return; }
    if (values.length > 16) { setError("Use at most 16 values so every step stays easy to follow."); return; }
    if (algorithm.requiresSortedInput && !isNonDecreasing(values)) { setError("Binary Search needs values in ascending order. Sort the array, then try again."); return; }
    let target: number | undefined;
    if (algorithm.needsTarget) {
      target = Number(targetText.trim());
      if (!targetText.trim() || !Number.isFinite(target)) { setError("Enter one valid target number."); return; }
    }
    setError(undefined);
    setProgressStatus("idle");
    setRunInput({ values, target });
  };

  const restoreExample = () => {
    const example = examples[id];
    setValuesText(example.values);
    setTargetText(example.target);
    setRunInput(copyRun(example.run));
    setError(undefined);
    setProgressStatus("idle");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-black">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to={`/algorithms/${id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-emerald-400 transition-colors">
            <ArrowLeft size={16} /> Lesson Overview
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-950/80 border border-emerald-900/60 px-3 py-1 text-xs font-bold text-emerald-400">
              {algorithm.category}
            </span>
            <span className="text-xs font-mono font-semibold text-zinc-500">Interactive Visualizer</span>
          </div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{algorithm.name}</h1>
        </div>
        <div className="hidden rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-3 text-xs font-semibold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] lg:block">
          <CheckCircle2 className="mr-2 inline text-emerald-400" size={17} />
          Keyboard controls: <span className="font-mono text-white">Space</span> (Play) | <span className="font-mono text-white">← / →</span> (Step) | <span className="font-mono text-white">R</span> (Reset)
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-5">
          <InputControls
            metadata={algorithm}
            values={valuesText}
            target={targetText}
            error={error}
            onValuesChange={setValuesText}
            onTargetChange={setTargetText}
            onVisualize={runVisualization}
            onRestoreExample={restoreExample}
          />
          <div className="panel overflow-x-auto p-2 sm:p-3 border-emerald-950/80 bg-black">
            <ArrayVisualizer step={controller.currentStep} target={runInput.target} />
          </div>
          <PlaybackControls
            currentStep={controller.currentIndex + 1}
            totalSteps={controller.totalSteps}
            isPlaying={controller.isPlaying}
            isAtStart={controller.isAtStart}
            isAtEnd={controller.isAtEnd}
            speed={controller.speed}
            onPrevious={controller.previous}
            onNext={controller.next}
            onTogglePlay={controller.togglePlay}
            onReset={controller.reset}
            onSpeedChange={controller.setSpeed}
          />
          {user ? (
            <p aria-live="polite" className={`text-xs font-semibold ${progressStatus === "error" ? "text-amber-400" : "text-emerald-400"}`}>
              {progressStatus === "saved"
                ? "✓ Progress saved to your dashboard."
                : progressStatus === "error"
                ? "The lesson completed, but progress could not be saved right now."
                : "Finish the run to save it to your dashboard."}
            </p>
          ) : (
            <p className="text-xs text-zinc-500">
              <Link to="/login" className="font-bold text-emerald-400 underline">
                Log in
              </Link>{" "}
              to save completed lessons to your dashboard.
            </p>
          )}
        </div>
        <aside className="space-y-5">
          <ExplanationPanel step={controller.currentStep} />
          <CodePanel lines={algorithm.code} activeLine={controller.currentStep?.codeLine} />
          <ComplexityPanel complexity={algorithm.complexity} />
          <button type="button" onClick={restoreExample} className="button-secondary w-full">
            <ListRestart size={17} /> Reset Example Data
          </button>
        </aside>
      </div>
    </section>
  );
};

