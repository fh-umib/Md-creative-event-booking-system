const API_BASE_URL = 'http://localhost:5000/api';

export type Mascot = {
  id: number;
  name: string;
  character_name: string;
  theme: string | null;
  description: string | null;
  price: string | number;
  duration_minutes: number;
  min_age: number | null;
  max_age: number | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

async function handleResponse<T>(
  response: Response,
  fallbackMessage: string
): Promise<T> {
  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((json as { message?: string }).message || fallbackMessage);
  }

  const parsed = json as ApiResponse<T> | T;

  if (typeof parsed === 'object' && parsed !== null && 'data' in parsed) {
    return (parsed as ApiResponse<T>).data as T;
  }

  return parsed as T;
}

export async function getPublicMascots(): Promise<Mascot[]> {
  const response = await fetch(`${API_BASE_URL}/mascots`);
  return handleResponse<Mascot[]>(response, 'Failed to load mascots');
}