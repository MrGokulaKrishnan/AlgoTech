import { arrayState, createStepBuilder, rangeIndices } from "../shared";
import type { AlgorithmStep } from "../../types/algorithm";

export const insertionSortSteps = (input: number[]): AlgorithmStep[] => {
  const values = [...input];
  const { add, steps } = createStepBuilder();
  add({ type: "initial", description: "We grow a sorted section from left to right by inserting each new value in the right spot.", data: arrayState(values), codeLine: 1 });

  for (let index = 1; index < values.length; index += 1) {
    const key = values[index];
    let position = index - 1;
    add({
      type: "select",
      description: `Take ${key} and find where it belongs in the sorted section on the left.`,
      data: arrayState(values, { sortedIndices: rangeIndices(0, index - 1) }),
      highlightedIndices: [index],
      codeLine: 2,
    });
    while (position >= 0 && values[position] > key) {
      add({
        type: "compare",
        description: `${values[position]} is greater than ${key}, so shift it one position to the right.`,
        data: arrayState(values, { sortedIndices: rangeIndices(0, index - 1) }),
        comparedIndices: [position, position + 1],
        codeLine: 5,
      });
      values[position + 1] = values[position];
      add({
        type: "shift",
        description: `Make room for ${key} by moving ${values[position]} right.`,
        data: arrayState(values, { sortedIndices: rangeIndices(0, index - 1) }),
        swappedIndices: [position, position + 1],
        codeLine: 6,
      });
      position -= 1;
    }
    values[position + 1] = key;
    add({
      type: "select",
      description: `Insert ${key} at index ${position + 1}. The left section is now sorted.`,
      data: arrayState(values, { sortedIndices: rangeIndices(0, index) }),
      highlightedIndices: [position + 1],
      codeLine: 10,
    });
  }

  add({ type: "complete", description: "The sorted section now includes every value. Insertion Sort is complete!", data: arrayState(values, { sortedIndices: rangeIndices(0, values.length - 1) }), codeLine: 12 });
  return steps;
};
