export type AppUser = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

export type AuthResponse = {
  accessToken: string;
  user: AppUser;
};

export type ProgressRecord = {
  id: number;
  algorithmId: string;
  completed: boolean;
  progressPercentage: number;
  lastStep: number;
  updatedAt: string;
};

export type ProgressInput = {
  algorithmId: string;
  completed: boolean;
  progressPercentage: number;
  lastStep: number;
};
