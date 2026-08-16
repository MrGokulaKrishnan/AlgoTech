import type { AlgorithmStep, ArrayVisualizationState } from "../types/algorithm";

type StepOptions = Omit<AlgorithmStep, "stepNumber">;

export const createStepBuilder = () => {
  const steps: AlgorithmStep[] = [];

  const add = (step: StepOptions) => {
    steps.push({ ...step, stepNumber: steps.length + 1 });
  };

  return { steps, add };
};

export const arrayState = (
  values: number[],
  extras: Omit<ArrayVisualizationState, "values"> = {},
): ArrayVisualizationState => ({ values: [...values], ...extras });

export const rangeIndices = (from: number, to: number): number[] =>
  from > to ? [] : Array.from({ length: to - from + 1 }, (_, index) => from + index);

export const parseNumberList = (input: string): number[] | null => {
  const normalized = input.trim().replace(/^\[/, "").replace(/\]$/, "");
  if (!normalized) return null;

  const values = normalized.split(",").map((item) => Number(item.trim()));
  return values.length > 0 && values.every(Number.isFinite) ? values : null;
};

export const isNonDecreasing = (values: number[]): boolean =>
  values.every((value, index) => index === 0 || values[index - 1] <= value);
