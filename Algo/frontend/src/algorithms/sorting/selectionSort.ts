import { arrayState, createStepBuilder, rangeIndices } from "../shared";
import type { AlgorithmStep } from "../../types/algorithm";

export const selectionSortSteps = (input: number[]): AlgorithmStep[] => {
  const values = [...input];
  const { add, steps } = createStepBuilder();
  add({ type: "initial", description: "For each position, we find the smallest remaining value and place it there.", data: arrayState(values), codeLine: 1 });

  for (let start = 0; start < values.length - 1; start += 1) {
    let minimum = start;
    add({
      type: "select",
      description: `Start at index ${start}. For now, ${values[minimum]} is the smallest value in the unsorted part.`,
      data: arrayState(values, { sortedIndices: rangeIndices(0, start - 1) }),
      highlightedIndices: [minimum],
      codeLine: 2,
    });
    for (let index = start + 1; index < values.length; index += 1) {
      add({
        type: "compare",
        description: `Compare ${values[index]} with the current smallest value ${values[minimum]}.`,
        data: arrayState(values, { sortedIndices: rangeIndices(0, start - 1) }),
        comparedIndices: [index, minimum],
        codeLine: 5,
      });
      if (values[index] < values[minimum]) {
        minimum = index;
        add({
          type: "select",
          description: `${values[minimum]} is smaller, so it becomes our new smallest value.`,
          data: arrayState(values, { sortedIndices: rangeIndices(0, start - 1) }),
          highlightedIndices: [minimum],
          codeLine: 6,
        });
      }
    }
    if (minimum !== start) {
      const selected = values[minimum];
      [values[start], values[minimum]] = [values[minimum], values[start]];
      add({
        type: "swap",
        description: `Place the smallest remaining value, ${selected}, at index ${start}.`,
        data: arrayState(values, { sortedIndices: rangeIndices(0, start) }),
        swappedIndices: [start, minimum],
        codeLine: 10,
      });
    } else {
      add({
        type: "select",
        description: `${values[start]} is already the smallest remaining value, so it stays at index ${start}.`,
        data: arrayState(values, { sortedIndices: rangeIndices(0, start) }),
        highlightedIndices: [start],
        codeLine: 10,
      });
    }
  }

  add({ type: "complete", description: "Every position now holds its smallest possible value. Selection Sort is complete!", data: arrayState(values, { sortedIndices: rangeIndices(0, values.length - 1) }), codeLine: 12 });
  return steps;
};
