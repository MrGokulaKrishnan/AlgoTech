export type RoadmapTopic = {
  id: string;
  title: string;
  difficulty: "Foundations" | "Beginner" | "Intermediate";
  duration: string;
  algorithmCount: number;
  completion: number;
  active?: boolean;
};

export const roadmap: RoadmapTopic[] = [
  { id: "basics", title: "Programming Basics", difficulty: "Foundations", duration: "2 hours", algorithmCount: 0, completion: 100 },
  { id: "arrays", title: "Arrays", difficulty: "Beginner", duration: "3 hours", algorithmCount: 3, completion: 72 },
  { id: "strings", title: "Strings", difficulty: "Beginner", duration: "3 hours", algorithmCount: 4, completion: 0 },
  { id: "searching", title: "Searching", difficulty: "Beginner", duration: "2 hours", algorithmCount: 2, completion: 40, active: true },
  { id: "sorting", title: "Sorting", difficulty: "Beginner", duration: "4 hours", algorithmCount: 3, completion: 0 },
  { id: "linked-lists", title: "Linked Lists", difficulty: "Intermediate", duration: "4 hours", algorithmCount: 4, completion: 0 },
  { id: "stack-queue", title: "Stack & Queue", difficulty: "Intermediate", duration: "3 hours", algorithmCount: 3, completion: 0 },
  { id: "recursion", title: "Recursion", difficulty: "Intermediate", duration: "3 hours", algorithmCount: 4, completion: 0 },
  { id: "trees", title: "Trees", difficulty: "Intermediate", duration: "5 hours", algorithmCount: 5, completion: 0 },
  { id: "graphs", title: "Graphs", difficulty: "Intermediate", duration: "6 hours", algorithmCount: 6, completion: 0 },
  { id: "dynamic-programming", title: "Dynamic Programming", difficulty: "Intermediate", duration: "8 hours", algorithmCount: 6, completion: 0 },
];
