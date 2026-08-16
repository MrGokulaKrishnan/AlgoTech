export type Topic = {
  id: number;
  slug: string;
  name: string;
  description: string;
  difficulty: string;
  estimatedMinutes: number;
  sortOrder: number;
};

export type QuizOption = { id: number; text: string };

export type QuizQuestion = {
  id: number;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "OUTPUT_PREDICTION" | "COMPLEXITY";
  questionText: string;
  options: QuizOption[];
};

export type QuizSubmission = {
  correct: boolean;
  explanation: string;
  correctOptionId: number;
};

export type UserStats = {
  totalUsers: number;
  totalProgressRecords: number;
  totalQuizAttempts: number;
};

export type TopicInput = Omit<Topic, "id">;

export type AlgorithmInput = {
  slug: string;
  name: string;
  category: string;
  difficulty: string;
  description: string;
  bestComplexity: string;
  averageComplexity: string;
  worstComplexity: string;
  spaceComplexity: string;
  language: string;
  sourceCode: string;
  topicId: number;
};

export type AlgorithmRecord = AlgorithmInput & { id: number };

export type QuizQuestionInput = {
  topicId: number;
  type: QuizQuestion["type"];
  questionText: string;
  explanation: string;
  options: Array<{ text: string; correct: boolean }>;
};
