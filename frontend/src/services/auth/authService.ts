export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  phone?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface RawAuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: AuthUser;
    token: string;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { message?: string }).message || 'Request failed.');
  }

  return data as T;
}

export const authService = {
  async login(payload: LoginRequest): Promise<{ user: AuthUser; token: string }> {
    const response = await request<RawAuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.success || !response.data?.token || !response.data?.user) {
      throw new Error(response.message || 'Login failed.');
    }

    return {
      user: response.data.user,
      token: response.data.token,
    };
  },
};