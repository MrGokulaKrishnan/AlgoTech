export type AlgorithmId = "linear-search" | "binary-search" | "bubble-sort" | "selection-sort" | "insertion-sort";

export type AlgorithmCategory = "Searching" | "Sorting";

export type ArrayVisualizationState = {
  values: number[];
  pointers?: Record<string, number>;
  activeRange?: [number, number];
  eliminatedIndices?: number[];
  sortedIndices?: number[];
  foundIndex?: number;
};

export type AlgorithmStep = {
  stepNumber: number;
  type: "initial" | "compare" | "swap" | "select" | "shift" | "found" | "complete" | "eliminate";
  description: string;
  data: ArrayVisualizationState;
  highlightedIndices?: number[];
  swappedIndices?: number[];
  comparedIndices?: number[];
  codeLine?: number;
};

export type Complexity = {
  best: string;
  average: string;
  worst: string;
  space: string;
  explanation: string;
};

export type AlgorithmMetadata = {
  id: AlgorithmId;
  name: string;
  category: AlgorithmCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  shortDescription: string;
  inputLabel: string;
  needsTarget: boolean;
  requiresSortedInput?: boolean;
  code: string[];
  complexity: Complexity;
};

export type AlgorithmRunInput = {
  values: number[];
  target?: number;
};
