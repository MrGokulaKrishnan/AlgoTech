import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { playbackSpeeds, type PlaybackSpeed } from "../hooks/useAnimationController";

type PlaybackControlsProps = {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  isAtStart: boolean;
  isAtEnd: boolean;
  speed: PlaybackSpeed;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
};

export const PlaybackControls = ({
  currentStep, totalSteps, isPlaying, isAtStart, isAtEnd, speed, onPrevious, onNext, onTogglePlay, onReset, onSpeedChange,
}: PlaybackControlsProps) => (
  <section aria-label="Animation controls" className="panel p-5 sm:p-7 border-emerald-950/80 bg-black">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <button type="button" className="button-secondary !rounded-xl !p-3" onClick={onPrevious} disabled={isAtStart} aria-label="Previous step">
          <SkipBack size={20} />
        </button>
        <button type="button" className="button-primary min-w-32 !rounded-xl !px-5 !py-3" onClick={onTogglePlay} disabled={totalSteps < 2}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />} {isPlaying ? "Pause" : isAtEnd ? "Replay" : "Play"}
        </button>
        <button type="button" className="button-secondary !rounded-xl !p-3" onClick={onNext} disabled={isAtEnd} aria-label="Next step">
          <SkipForward size={20} />
        </button>
        <button type="button" className="button-secondary !rounded-xl !p-3" onClick={onReset} aria-label="Reset animation">
          <RotateCcw size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="text-base font-mono font-bold tabular-nums text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-4 py-2 rounded-lg">
          Step {Math.min(currentStep, totalSteps)} / {totalSteps}
        </span>
        <label className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
          Speed
          <select
            aria-label="Animation speed"
            value={speed}
            onChange={(event) => onSpeedChange(Number(event.target.value) as PlaybackSpeed)}
            className="rounded-lg border border-emerald-950 bg-zinc-950 px-3 py-2 text-sm font-mono font-bold text-emerald-300 focus:border-emerald-500 focus:outline-none"
          >
            {playbackSpeeds.map((value) => <option value={value} key={value}>{value}x</option>)}
          </select>
        </label>
      </div>
    </div>
  </section>
);
