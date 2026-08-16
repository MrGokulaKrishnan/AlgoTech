import { describe, expect, it } from "vitest";
import { binarySearchSteps } from "./searching/binarySearch";
import { linearSearchSteps } from "./searching/linearSearch";
import { bubbleSortSteps } from "./sorting/bubbleSort";
import { insertionSortSteps } from "./sorting/insertionSort";
import { selectionSortSteps } from "./sorting/selectionSort";

const lastStep = <T,>(steps: T[]): T | undefined => steps[steps.length - 1];
const finalValues = (steps: { data: { values: number[] } }[]): number[] => lastStep(steps)?.data.values ?? [];

describe("Linear Search steps", () => {
  it("finds a target and gives the correct index", () => {
    const steps = linearSearchSteps([9, 4, 7], 4);
    expect(lastStep(steps)?.data.foundIndex).toBe(1);
    expect(lastStep(steps)?.type).toBe("found");
  });

  it("explains a target that is absent", () => {
    const steps = linearSearchSteps([], 9);
    expect(lastStep(steps)?.type).toBe("complete");
  });
});

describe("Binary Search steps", () => {
  it("finds values at either edge without changing the input", () => {
    const input = [10, 20, 30, 40];
    expect(lastStep(binarySearchSteps(input, 10))?.data.foundIndex).toBe(0);
    expect(lastStep(binarySearchSteps(input, 40))?.data.foundIndex).toBe(3);
    expect(input).toEqual([10, 20, 30, 40]);
  });

  it("ends cleanly when a target is not present", () => {
    expect(lastStep(binarySearchSteps([2, 4, 6, 8], 7))?.type).toBe("complete");
  });
});

describe("Sorting step generators", () => {
  const cases = [[64, 25, 12, 22, 11], [1, 1, 1], [5], [], [5, 4, 3, 2, 1]];
  const generators = [bubbleSortSteps, selectionSortSteps, insertionSortSteps];

  for (const generator of generators) {
    it(`${generator.name} sorts edge cases deterministically`, () => {
      for (const values of cases) {
        const first = generator(values);
        const second = generator(values);
        expect(finalValues(first)).toEqual([...values].sort((a, b) => a - b));
        expect(first).toEqual(second);
      }
    });
  }
});
