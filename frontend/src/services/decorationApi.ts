import { API_URL } from './apiBase';

export type Decoration = {
  id: number;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  full_description: string;
  image_url: string;
  price_from: string | number;
  theme_colors: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type DecorationPayload = {
  title: string;
  category: string;
  short_description: string;
  full_description: string;
  image_url: string;
  price_from: number;
  theme_colors: string;
  is_featured: boolean;
  is_active: boolean;
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

export async function getPublicDecorations(): Promise<Decoration[]> {
  const response = await fetch(`${API_URL}/decorations`);

  return parseResponse<Decoration[]>(
    response,
    'Failed to load decorations',
  );
}

export async function getDecorationBySlug(slug: string): Promise<Decoration> {
  const response = await fetch(
    `${API_URL}/decorations/slug/${encodeURIComponent(slug)}`,
  );

  return parseResponse<Decoration>(
    response,
    'Failed to load decoration',
  );
}

export async function getAdminDecorations(): Promise<Decoration[]> {
  const response = await fetch(`${API_URL}/admin/decorations`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<Decoration[]>(
    response,
    'Failed to load admin decorations',
  );
}

export async function createDecoration(
  payload: DecorationPayload,
): Promise<Decoration> {
  const response = await fetch(`${API_URL}/admin/decorations`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<Decoration>(
    response,
    'Failed to create decoration',
  );
}

export async function updateDecoration(
  id: number,
  payload: DecorationPayload,
): Promise<Decoration> {
  const response = await fetch(`${API_URL}/admin/decorations/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<Decoration>(
    response,
    'Failed to update decoration',
  );
}

export async function deleteDecoration(id: number): Promise<Decoration> {
  const response = await fetch(`${API_URL}/admin/decorations/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<Decoration>(
    response,
    'Failed to delete decoration',
  );
}