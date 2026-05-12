import { API_URL } from './apiBase';

export type AdminPackage = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: string | number;
  is_active: boolean;
  extras: string[];
};

export type AdminPackagePayload = {
  title: string;
  description: string;
  category: string;
  duration_minutes: number;
  min_mascots: number;
  max_mascots: number;
  base_price: number;
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

export async function getAdminPackages(search = ''): Promise<AdminPackage[]> {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set('search', search.trim());
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/admin/packages${query ? `?${query}` : ''}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return parseResponse<AdminPackage[]>(
    response,
    'Failed to load admin packages',
  );
}

export async function createPackage(
  payload: AdminPackagePayload,
): Promise<AdminPackage> {
  const response = await fetch(`${API_URL}/admin/packages`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<AdminPackage>(response, 'Failed to create package');
}

export async function updatePackage(
  id: number,
  payload: AdminPackagePayload,
): Promise<AdminPackage> {
  const response = await fetch(`${API_URL}/admin/packages/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<AdminPackage>(response, 'Failed to update package');
}

export async function deletePackage(id: number): Promise<AdminPackage> {
  const response = await fetch(`${API_URL}/admin/packages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<AdminPackage>(response, 'Failed to delete package');
}