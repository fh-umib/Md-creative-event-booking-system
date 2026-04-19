const API_BASE_URL = 'http://localhost:5000/api';

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

export async function getAdminStaff(): Promise<StaffMember[]> {
  const response = await fetch(`${API_BASE_URL}/admin/staff`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<StaffMember[]>(response, 'Failed to load staff members');
}

export async function getAdminStaffById(id: number): Promise<StaffMember> {
  const response = await fetch(`${API_BASE_URL}/admin/staff/${id}`, {
    headers: getAuthHeaders(),
  });

  return parseResponse<StaffMember>(response, 'Failed to load staff member');
}

export async function createStaff(payload: StaffPayload): Promise<StaffMember> {
  const response = await fetch(`${API_BASE_URL}/admin/staff`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<StaffMember>(response, 'Failed to create staff member');
}

export async function updateStaff(
  id: number,
  payload: StaffPayload
): Promise<StaffMember> {
  const response = await fetch(`${API_BASE_URL}/admin/staff/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return parseResponse<StaffMember>(response, 'Failed to update staff member');
}

export async function deleteStaff(id: number): Promise<StaffMember> {
  const response = await fetch(`${API_BASE_URL}/admin/staff/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseResponse<StaffMember>(response, 'Failed to delete staff member');
}