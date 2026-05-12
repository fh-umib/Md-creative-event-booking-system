import { API_URL } from '../apiBase';

export interface AuthUser {
  id: number;
  fullName?: string;
  full_name?: string;
  email: string;
  role: string;
  isActive?: boolean;
  is_active?: boolean;
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
  user?: AuthUser;
  token?: string;
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      'Serveri nuk ktheu përgjigje JSON. Kontrollo API URL dhe backend route.',
    );
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  const response = await fetch(`${API_URL}${cleanPath}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(
      (data as { message?: string })?.message || 'Request failed.',
    );
  }

  return data as T;
}

export const authService = {
  async login(payload: LoginRequest): Promise<{ user: AuthUser; token: string }> {
    const response = await request<RawAuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
      }),
    });

    const token = response.data?.token || response.token;
    const user = response.data?.user || response.user;

    if (!response.success || !token || !user) {
      throw new Error(response.message || 'Login failed.');
    }

    return {
      user,
      token,
    };
  },
};