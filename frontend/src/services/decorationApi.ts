const API_BASE_URL = 'http://localhost:5000/api';

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

  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    'data' in parsed
  ) {
    return (parsed as ApiResponse<T>).data as T;
  }

  return parsed as T;
}

export async function getPublicDecorations(): Promise<Decoration[]> {
  const response = await fetch(`${API_BASE_URL}/decorations`);
  return parseResponse<Decoration[]>(response, 'Failed to load decorations');
}

export async function getDecorationBySlug(slug: string): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/decorations/slug/${slug}`);
  return parseResponse<Decoration>(response, 'Failed to load decoration');
}

export async function getAdminDecorations(): Promise<Decoration[]> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<Decoration[]>(response, 'Failed to load admin decorations');
}

export async function createDecoration(
  payload: DecorationPayload
): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<Decoration>(response, 'Failed to create decoration');
}

export async function updateDecoration(
  id: number,
  payload: DecorationPayload
): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<Decoration>(response, 'Failed to update decoration');
}

export async function deleteDecoration(id: number): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<Decoration>(response, 'Failed to delete decoration');
}