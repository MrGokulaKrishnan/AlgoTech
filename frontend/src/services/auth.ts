import type { AppUser, AuthResponse } from "../types/auth";
import { apiRequest } from "./api";

type Credentials = { email: string; password: string };
type Registration = Credentials & { name: string };

export const login = (credentials: Credentials): Promise<AuthResponse> =>
  apiRequest<AuthResponse>("/auth/login", { method: "POST", body: credentials });

export const register = (registration: Registration): Promise<AuthResponse> =>
  apiRequest<AuthResponse>("/auth/register", { method: "POST", body: registration });

export const getCurrentUser = (token: string): Promise<AppUser> =>
  apiRequest<AppUser>("/users/me", { token });
