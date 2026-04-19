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

export type ActivityPayload = {
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  is_active: boolean;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

function getAuthToken() {
  return localStorage.getItem('md_auth_token');
}

function getAuthHeaders(includeJson = false): HeadersInit {
  const token = getAuthToken();

  return {
    ...(includeJson ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseResponse<T>(
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

export async function getAdminActivities(): Promise<Activity[]> {
  const response = await fetch(`${API_BASE_URL}/admin/activities`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<Activity[]>(response, 'Failed to load activities');
}

export async function createActivity(payload: ActivityPayload): Promise<Activity> {
  const response = await fetch(`${API_BASE_URL}/admin/activities`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<Activity>(response, 'Failed to create activity');
}

export async function updateActivity(
  id: number,
  payload: ActivityPayload
): Promise<Activity> {
  const response = await fetch(`${API_BASE_URL}/admin/activities/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<Activity>(response, 'Failed to update activity');
}

export async function deleteActivity(id: number): Promise<Activity> {
  const response = await fetch(`${API_BASE_URL}/admin/activities/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<Activity>(response, 'Failed to delete activity');
}