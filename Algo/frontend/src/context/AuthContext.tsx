import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getCurrentUser, login as loginRequest, register as registerRequest } from "../services/auth";
import type { AppUser } from "../types/auth";

type LoginInput = { email: string; password: string };
type RegisterInput = LoginInput & { name: string };

type AuthContextValue = {
  user: AppUser | null;
  token: string | null;
  isReady: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
};

const tokenKey = "algovisual.access-token";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(tokenKey));
  const [isReady, setIsReady] = useState(false);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem(tokenKey);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let active = true;
    if (!token) {
      setIsReady(true);
      return () => { active = false; };
    }
    void getCurrentUser(token)
      .then((currentUser) => { if (active) setUser(currentUser); })
      .catch(() => { if (active) clearSession(); })
      .finally(() => { if (active) setIsReady(true); });
    return () => { active = false; };
  }, [clearSession, token]);

  const applyAuth = useCallback((accessToken: string, authenticatedUser: AppUser) => {
    sessionStorage.setItem(tokenKey, accessToken);
    setToken(accessToken);
    setUser(authenticatedUser);
    setIsReady(true);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const response = await loginRequest(input);
    applyAuth(response.accessToken, response.user);
  }, [applyAuth]);

  const register = useCallback(async (input: RegisterInput) => {
    const response = await registerRequest(input);
    applyAuth(response.accessToken, response.user);
  }, [applyAuth]);

  const value = useMemo(() => ({ user, token, isReady, login, register, logout: clearSession }), [user, token, isReady, login, register, clearSession]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
