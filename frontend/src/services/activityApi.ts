const API_BASE_URL = 'http://localhost:5000/api';

export type Activity = {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
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

export async function getPublicActivities(): Promise<Activity[]> {
  const response = await fetch(`${API_BASE_URL}/activities`);
  return handleResponse<Activity[]>(response, 'Failed to load activities');
}