import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { getProfile, login as loginRequest, register as registerRequest } from './auth-api';
import { AuthUser, LoginPayload, RegisterPayload } from './auth.types';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<{ user: AuthUser; message?: string; hasToken: boolean }>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'aasapure.auth.token';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEY);

    if (!savedToken) {
      setIsLoading(false);
      return;
    }

    setToken(savedToken);

    getProfile(savedToken)
      .then((profile) => {
        setUser(profile);
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      login: async (payload) => {
        const response = await loginRequest(payload);

        if (!response.accessToken) {
          throw new Error('No access token returned from login');
        }

        localStorage.setItem(STORAGE_KEY, response.accessToken);
        setToken(response.accessToken);
        setUser(response.user);

        return response.user;
      },
      register: async (payload) => {
        const response = await registerRequest(payload);

        if (response.accessToken) {
          localStorage.setItem(STORAGE_KEY, response.accessToken);
          setToken(response.accessToken);
          setUser(response.user);
          return { user: response.user, message: response.message, hasToken: true };
        }

        return { user: response.user, message: response.message, hasToken: false };
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
        setToken(null);
      },
    }),
    [isLoading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
