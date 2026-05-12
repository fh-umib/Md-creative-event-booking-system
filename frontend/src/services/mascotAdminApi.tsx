import { API_URL } from './apiBase';

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
  return localStorage.getItem('md_auth_token') || localStorage.getItem('token');
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
  fallbackMessage: string,
): Promise<T> {
  const text = await response.text();

  let json: ApiResponse<T> | T | { message?: string } = {};

  if (text) {
    try {
      json = JSON.parse(text) as ApiResponse<T> | T | { message?: string };
    } catch {
      throw new Error(
        'Serveri nuk ktheu përgjigje JSON. Kontrollo API URL dhe backend route.',
      );
    }
  }

  if (!response.ok) {
    throw new Error((json as { message?: string }).message || fallbackMessage);
  }

  if (
    typeof json === 'object' &&
    json !== null &&
    'success' in json &&
    (json as ApiResponse<T>).success === false
  ) {
    throw new Error((json as ApiResponse<T>).message || fallbackMessage);
  }

  if (
    typeof json === 'object' &&
    json !== null &&
    'data' in json
  ) {
    return (json as ApiResponse<T>).data as T;
  }

  return json as T;
}

function normalizePayload(payload: MascotPayload) {
  return {
    ...payload,
    min_age: payload.min_age === '' ? null : payload.min_age,
    max_age: payload.max_age === '' ? null : payload.max_age,
  };
}

export async function getAdminMascots(): Promise<Mascot[]> {
  const response = await fetch(`${API_URL}/admin/mascots`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<Mascot[]>(response, 'Failed to load mascots');
}

export async function createMascot(payload: MascotPayload): Promise<Mascot> {
  const response = await fetch(`${API_URL}/admin/mascots`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(normalizePayload(payload)),
  });

  return parseResponse<Mascot>(response, 'Failed to create mascot');
}

export async function updateMascot(
  id: number,
  payload: MascotPayload,
): Promise<Mascot> {
  const response = await fetch(`${API_URL}/admin/mascots/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(normalizePayload(payload)),
  });

  return parseResponse<Mascot>(response, 'Failed to update mascot');
}

export async function deleteMascot(id: number): Promise<Mascot> {
  const response = await fetch(`${API_URL}/admin/mascots/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<Mascot>(response, 'Failed to delete mascot');
}