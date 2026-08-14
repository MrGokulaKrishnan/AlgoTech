import { arrayState, createStepBuilder, rangeIndices } from "../shared";
import type { AlgorithmStep } from "../../types/algorithm";

export const binarySearchSteps = (values: number[], target: number): AlgorithmStep[] => {
  const { add, steps } = createStepBuilder();
  let left = 0;
  let right = values.length - 1;

  add({
    type: "initial",
    description: `The array is sorted, so we can search for ${target} by repeatedly checking the middle.`,
    data: arrayState(values, { pointers: { LEFT: left, RIGHT: right }, activeRange: [left, right] }),
    codeLine: 1,
  });

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    add({
      type: "compare",
      description: `The middle of the current range is index ${middle}, where the value is ${values[middle]}.`,
      data: arrayState(values, { pointers: { LEFT: left, MID: middle, RIGHT: right }, activeRange: [left, right] }),
      highlightedIndices: [middle],
      comparedIndices: [middle],
      codeLine: 4,
    });

    if (values[middle] === target) {
      add({
        type: "found",
        description: `Success! The middle value is ${target}, so we found it at index ${middle}.`,
        data: arrayState(values, { pointers: { LEFT: left, MID: middle, RIGHT: right }, activeRange: [left, right], foundIndex: middle }),
        highlightedIndices: [middle],
        codeLine: 6,
      });
      return steps;
    }

    if (values[middle] < target) {
      const oldLeft = left;
      left = middle + 1;
      add({
        type: "eliminate",
        description: `${target} is greater than ${values[middle]}, so the left half cannot contain it. Move LEFT to ${left}.`,
        data: arrayState(values, {
          pointers: { LEFT: left, RIGHT: right },
          activeRange: [left, right],
          eliminatedIndices: rangeIndices(oldLeft, middle),
        }),
        highlightedIndices: [middle],
        codeLine: 11,
      });
    } else {
      const oldRight = right;
      right = middle - 1;
      add({
        type: "eliminate",
        description: `${target} is smaller than ${values[middle]}, so the right half cannot contain it. Move RIGHT to ${right}.`,
        data: arrayState(values, {
          pointers: { LEFT: left, RIGHT: right },
          activeRange: [left, right],
          eliminatedIndices: rangeIndices(middle, oldRight),
        }),
        highlightedIndices: [middle],
        codeLine: 13,
      });
    }
  }

  add({
    type: "complete",
    description: `There are no values left to check. ${target} is not in this array.`,
    data: arrayState(values, { eliminatedIndices: rangeIndices(0, values.length - 1) }),
    codeLine: 16,
  });
  return steps;
};
