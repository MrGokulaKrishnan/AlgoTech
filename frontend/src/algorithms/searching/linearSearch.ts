import { arrayState, createStepBuilder } from "../shared";
import type { AlgorithmStep } from "../../types/algorithm";

export const linearSearchSteps = (values: number[], target: number): AlgorithmStep[] => {
  const { add, steps } = createStepBuilder();
  add({
    type: "initial",
    description: `We start at the first value and look for ${target}, one item at a time.`,
    data: arrayState(values, { pointers: { CURRENT: 0 } }),
    codeLine: 1,
  });

  for (let index = 0; index < values.length; index += 1) {
    add({
      type: "compare",
      description: `Compare ${values[index]} at index ${index} with the target ${target}.`,
      data: arrayState(values, { pointers: { CURRENT: index } }),
      highlightedIndices: [index],
      comparedIndices: [index],
      codeLine: 3,
    });
    if (values[index] === target) {
      add({
        type: "found",
        description: `Success! ${values[index]} matches the target, so it is at index ${index}.`,
        data: arrayState(values, { pointers: { CURRENT: index }, foundIndex: index }),
        highlightedIndices: [index],
        codeLine: 4,
      });
      return steps;
    }
  }

  add({
    type: "complete",
    description: `We checked every value. ${target} is not in this array.`,
    data: arrayState(values),
    codeLine: 7,
  });
  return steps;
};
