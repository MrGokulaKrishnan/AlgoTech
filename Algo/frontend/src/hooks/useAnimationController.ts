import { useCallback, useEffect, useMemo, useState } from "react";
import type { AlgorithmStep } from "../types/algorithm";

const speeds = [0.25, 0.5, 1, 1.5, 2] as const;
export type PlaybackSpeed = (typeof speeds)[number];

const delayForSpeed = (speed: PlaybackSpeed): number => 900 / speed;

export const playbackSpeeds = speeds;

export const useAnimationController = (steps: AlgorithmStep[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const lastIndex = Math.max(steps.length - 1, 0);

  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    if (!isPlaying || currentIndex >= lastIndex) return undefined;
    const timer = window.setTimeout(() => setCurrentIndex((index) => Math.min(index + 1, lastIndex)), delayForSpeed(speed));
    return () => window.clearTimeout(timer);
  }, [currentIndex, isPlaying, lastIndex, speed]);

  useEffect(() => {
    if (currentIndex >= lastIndex) setIsPlaying(false);
  }, [currentIndex, lastIndex]);

  const previous = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);
  const next = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((index) => Math.min(index + 1, lastIndex));
  }, [lastIndex]);
  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);
  const togglePlay = useCallback(() => {
    if (currentIndex >= lastIndex) setCurrentIndex(0);
    setIsPlaying((playing) => !playing || currentIndex >= lastIndex);
  }, [currentIndex, lastIndex]);

  return useMemo(() => ({
    currentIndex,
    currentStep: steps[currentIndex],
    isPlaying,
    speed,
    isAtStart: currentIndex === 0,
    isAtEnd: currentIndex === lastIndex,
    totalSteps: steps.length,
    previous,
    next,
    reset,
    togglePlay,
    setSpeed,
  }), [currentIndex, isPlaying, speed, lastIndex, steps, previous, next, reset, togglePlay]);
};
