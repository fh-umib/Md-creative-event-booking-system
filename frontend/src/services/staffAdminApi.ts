import { API_URL } from './apiBase';

export type StaffMember = {
  id: number;
  full_name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
};

export type StaffPayload = {
  full_name: string;
  role: string;
  bio: string;
  image_url: string;
  email: string;
  phone: string;
  is_active: boolean;
  display_order: number;
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

export async function getAdminStaff(): Promise<StaffMember[]> {
  const response = await fetch(`${API_URL}/admin/staff`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<StaffMember[]>(response, 'Failed to load staff members');
}

export async function getAdminStaffById(id: number): Promise<StaffMember> {
  const response = await fetch(`${API_URL}/admin/staff/${id}`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<StaffMember>(response, 'Failed to load staff member');
}

export async function createStaff(payload: StaffPayload): Promise<StaffMember> {
  const response = await fetch(`${API_URL}/admin/staff`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<StaffMember>(response, 'Failed to create staff member');
}

export async function updateStaff(
  id: number,
  payload: StaffPayload,
): Promise<StaffMember> {
  const response = await fetch(`${API_URL}/admin/staff/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<StaffMember>(response, 'Failed to update staff member');
}

export async function deleteStaff(id: number): Promise<StaffMember> {
  const response = await fetch(`${API_URL}/admin/staff/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<StaffMember>(response, 'Failed to delete staff member');
}