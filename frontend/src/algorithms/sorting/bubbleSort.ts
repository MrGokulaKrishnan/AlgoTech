import { arrayState, createStepBuilder, rangeIndices } from "../shared";
import type { AlgorithmStep } from "../../types/algorithm";

export const bubbleSortSteps = (input: number[]): AlgorithmStep[] => {
  const values = [...input];
  const { add, steps } = createStepBuilder();
  add({ type: "initial", description: "We compare neighbouring values and let the largest value bubble to the end of each pass.", data: arrayState(values), codeLine: 1 });

  for (let end = values.length - 1; end > 0; end -= 1) {
    for (let index = 0; index < end; index += 1) {
      add({
        type: "compare",
        description: `Compare ${values[index]} and ${values[index + 1]}.`,
        data: arrayState(values, { sortedIndices: rangeIndices(end + 1, values.length - 1) }),
        comparedIndices: [index, index + 1],
        codeLine: 4,
      });
      if (values[index] > values[index + 1]) {
        [values[index], values[index + 1]] = [values[index + 1], values[index]];
        add({
          type: "swap",
          description: `${values[index + 1]} was larger, so we swap the pair to keep the smaller value on the left.`,
          data: arrayState(values, { sortedIndices: rangeIndices(end + 1, values.length - 1) }),
          swappedIndices: [index, index + 1],
          codeLine: 6,
        });
      }
    }
    add({
      type: "select",
      description: `${values[end]} is now in its final position at index ${end}.`,
      data: arrayState(values, { sortedIndices: rangeIndices(end, values.length - 1) }),
      highlightedIndices: [end],
      codeLine: 3,
    });
  }

  add({ type: "complete", description: "All values are in order. Bubble Sort is complete!", data: arrayState(values, { sortedIndices: rangeIndices(0, values.length - 1) }), codeLine: 10 });
  return steps;
};
