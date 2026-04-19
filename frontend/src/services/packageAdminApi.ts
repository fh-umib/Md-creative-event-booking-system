const API_BASE_URL = 'http://localhost:5000/api';

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

  if (typeof parsed === 'object' && parsed !== null && 'data' in parsed) {
    return (parsed as ApiResponse<T>).data as T;
  }

  return parsed as T;
}

export async function getAdminPackages(search = ''): Promise<AdminPackage[]> {
  const response = await fetch(
    `${API_BASE_URL}/admin/packages?search=${encodeURIComponent(search)}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return parseResponse<AdminPackage[]>(response, 'Failed to load admin packages');
}

export async function createPackage(
  payload: AdminPackagePayload
): Promise<AdminPackage> {
  const response = await fetch(`${API_BASE_URL}/admin/packages`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<AdminPackage>(response, 'Failed to create package');
}

export async function updatePackage(
  id: number,
  payload: AdminPackagePayload
): Promise<AdminPackage> {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<AdminPackage>(response, 'Failed to update package');
}

export async function deletePackage(id: number): Promise<AdminPackage> {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<AdminPackage>(response, 'Failed to delete package');
}