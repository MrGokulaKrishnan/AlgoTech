import { binarySearchSteps } from "./searching/binarySearch";
import { linearSearchSteps } from "./searching/linearSearch";
import { bubbleSortSteps } from "./sorting/bubbleSort";
import { insertionSortSteps } from "./sorting/insertionSort";
import { selectionSortSteps } from "./sorting/selectionSort";
import type { AlgorithmId, AlgorithmRunInput, AlgorithmStep } from "../types/algorithm";

export const generateSteps = ({ values, target }: AlgorithmRunInput, id: AlgorithmId): AlgorithmStep[] => {
  switch (id) {
    case "linear-search":
      return linearSearchSteps(values, target ?? 0);
    case "binary-search":
      return binarySearchSteps(values, target ?? 0);
    case "bubble-sort":
      return bubbleSortSteps(values);
    case "selection-sort":
      return selectionSortSteps(values);
    case "insertion-sort":
      return insertionSortSteps(values);
  }
};

export { parseNumberList, isNonDecreasing } from "./shared";
