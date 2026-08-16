import { apiRequest } from "./api";
import type { AlgorithmInput, AlgorithmRecord, QuizQuestion, QuizQuestionInput, QuizSubmission, Topic, TopicInput, UserStats } from "../types/content";

export const getTopics = (): Promise<Topic[]> => apiRequest<Topic[]>("/topics");

export const getAlgorithms = (): Promise<AlgorithmRecord[]> => apiRequest<AlgorithmRecord[]>("/algorithms");

export const getQuizQuestions = (topicId: number): Promise<QuizQuestion[]> =>
  apiRequest<QuizQuestion[]>(`/quizzes/${topicId}`);

export const submitQuizAnswer = (token: string, questionId: number, selectedOptionId: number): Promise<QuizSubmission> =>
  apiRequest<QuizSubmission>(`/quizzes/${questionId}/submit`, { method: "POST", body: { selectedOptionId }, token });

export const getAdminStats = (token: string): Promise<UserStats> =>
  apiRequest<UserStats>("/admin/users/stats", { token });

export const createTopic = (token: string, input: TopicInput): Promise<Topic> =>
  apiRequest<Topic>("/admin/topics", { method: "POST", body: input, token });

export const createAlgorithm = (token: string, input: AlgorithmInput): Promise<void> =>
  apiRequest<void>("/admin/algorithms", { method: "POST", body: input, token });

export const updateAlgorithm = (token: string, id: number, input: AlgorithmInput): Promise<void> =>
  apiRequest<void>(`/admin/algorithms/${id}`, { method: "PUT", body: input, token });

export const createQuizQuestion = (token: string, input: QuizQuestionInput): Promise<void> =>
  apiRequest<void>("/admin/quizzes/questions", { method: "POST", body: input, token });
