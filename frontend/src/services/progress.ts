import type { ProgressInput, ProgressRecord } from "../types/auth";
import { apiRequest } from "./api";

export const getProgress = (token: string): Promise<ProgressRecord[]> =>
  apiRequest<ProgressRecord[]>("/progress", { token });

export const saveProgress = (token: string, progress: ProgressInput): Promise<ProgressRecord> =>
  apiRequest<ProgressRecord>("/progress", { method: "POST", body: progress, token });
