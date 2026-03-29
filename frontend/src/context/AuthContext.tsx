import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authService } from '../services/auth/authService';
import { STORAGE_KEYS } from '../utils/constants';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(STORAGE_KEYS.TOKEN)
  );
  const [isLoading, setIsLoading] = useState(true);

  const saveAuth = (data: AuthResponse) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const login = async (payload: LoginRequest) => {
    const data = await authService.login(payload);
    saveAuth(data);
  };

  const register = async (payload: RegisterRequest) => {
    const data = await authService.register(payload);
    saveAuth(data);
  };

  const logout = () => {
    clearAuth();
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (!savedToken) {
          setIsLoading(false);
          return;
        }

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        const profile = await authService.getProfile();
        setUser(profile);
      } catch {
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}