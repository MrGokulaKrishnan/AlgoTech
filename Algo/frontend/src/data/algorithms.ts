import type { AlgorithmId, AlgorithmMetadata } from "../types/algorithm";

export const algorithmMetadata: AlgorithmMetadata[] = [
  {
    id: "linear-search",
    name: "Linear Search",
    category: "Searching",
    difficulty: "Beginner",
    shortDescription: "Check values one by one until you find the target.",
    description: "Linear Search starts at the beginning of an array and checks each value in order. It is easy to understand and works even when the array is not sorted.",
    inputLabel: "Enter array",
    needsTarget: true,
    code: ["for (int i = 0; i < array.length; i++) {", "  // check one value at a time", "  if (array[i] == target) {", "    return i;", "  }", "}", "return -1;"],
    complexity: {
      best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)",
      explanation: "In the best case the target is first. Otherwise, Linear Search may need to inspect each of the n values once.",
    },
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    difficulty: "Beginner",
    shortDescription: "Use a sorted array to discard half the search space at a time.",
    description: "Binary Search checks the middle value of a sorted array. It uses that comparison to safely ignore half of the remaining values, making it much faster for large sorted lists.",
    inputLabel: "Enter sorted array",
    needsTarget: true,
    requiresSortedInput: true,
    code: ["int left = 0;", "int right = array.length - 1;", "while (left <= right) {", "  int mid = (left + right) / 2;", "", "  if (array[mid] == target) {", "    return mid;", "  }", "", "  if (array[mid] < target) {", "    left = mid + 1;", "  } else {", "    right = mid - 1;", "  }", "}", "return -1;"],
    complexity: {
      best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)",
      explanation: "Each comparison removes about half of the remaining search space, so the number of checks grows very slowly as the array grows.",
    },
  },
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    difficulty: "Beginner",
    shortDescription: "Swap neighbouring values until the array is in order.",
    description: "Bubble Sort repeatedly compares neighbouring values. When a larger value is on the left, it swaps the pair. After each pass, the largest remaining value reaches its final position.",
    inputLabel: "Enter array",
    needsTarget: false,
    code: ["for (int end = array.length - 1; end > 0; end--) {", "  // one pass places a large value at the end", "  for (int i = 0; i < end; i++) {", "    if (array[i] > array[i + 1]) {", "", "      swap(array[i], array[i + 1]);", "    }", "  }", "}", "return array;"],
    complexity: {
      best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)",
      explanation: "It compares many neighbouring pairs over multiple passes. With n values, this can mean roughly n × n comparisons.",
    },
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Sorting",
    difficulty: "Beginner",
    shortDescription: "Find the smallest remaining value and put it in place.",
    description: "Selection Sort splits the array into sorted and unsorted sections. It repeatedly selects the smallest value in the unsorted section and moves it to the next available position.",
    inputLabel: "Enter array",
    needsTarget: false,
    code: ["for (int start = 0; start < array.length - 1; start++) {", "  int min = start;", "", "  for (int i = start + 1; i < array.length; i++) {", "    if (array[i] < array[min]) {", "      min = i;", "    }", "  }", "", "  swap(array[start], array[min]);", "}", "return array;"],
    complexity: {
      best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)",
      explanation: "To choose the value for every position, it scans the remaining unsorted values. Those repeated scans result in quadratic time.",
    },
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    difficulty: "Beginner",
    shortDescription: "Insert each value into its proper position in a growing sorted section.",
    description: "Insertion Sort builds a sorted section one value at a time. For each new value, it shifts larger values right until there is space to insert it in the correct position.",
    inputLabel: "Enter array",
    needsTarget: false,
    code: ["for (int i = 1; i < array.length; i++) {", "  int key = array[i];", "  int j = i - 1;", "", "  while (j >= 0 && array[j] > key) {", "    array[j + 1] = array[j];", "    j--;", "  }", "", "  array[j + 1] = key;", "}", "return array;"],
    complexity: {
      best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)",
      explanation: "It is quick when values are almost sorted, but a reverse-sorted array makes each new value shift across most of the sorted section.",
    },
  },
];

export const getAlgorithm = (id: string): AlgorithmMetadata | undefined =>
  algorithmMetadata.find((algorithm) => algorithm.id === id);

export const isAlgorithmId = (id: string): id is AlgorithmId =>
  algorithmMetadata.some((algorithm) => algorithm.id === id);
