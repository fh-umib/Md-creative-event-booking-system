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

export type MascotPayload = {
  name: string;
  character_name: string;
  theme: string;
  description: string;
  price: number;
  duration_minutes: number;
  min_age: number | '';
  max_age: number | '';
  is_available: boolean;
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

async function parseResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((json as { message?: string }).message || fallbackMessage);
  }

  const parsed = json as ApiResponse<T> | T;

  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    'data' in parsed
  ) {
    return (parsed as ApiResponse<T>).data as T;
  }

  return parsed as T;
}

function normalizePayload(payload: MascotPayload) {
  return {
    ...payload,
    min_age: payload.min_age === '' ? null : payload.min_age,
    max_age: payload.max_age === '' ? null : payload.max_age,
  };
}

export async function getAdminMascots(): Promise<Mascot[]> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<Mascot[]>(response, 'Failed to load mascots');
}

export async function createMascot(payload: MascotPayload): Promise<Mascot> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(normalizePayload(payload)),
  });

  return parseResponse<Mascot>(response, 'Failed to create mascot');
}

export async function updateMascot(
  id: number,
  payload: MascotPayload
): Promise<Mascot> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(normalizePayload(payload)),
  });

  return parseResponse<Mascot>(response, 'Failed to update mascot');
}

export async function deleteMascot(id: number): Promise<Mascot> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<Mascot>(response, 'Failed to delete mascot');
}