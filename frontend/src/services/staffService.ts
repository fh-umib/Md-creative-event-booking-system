import type { PublicStaffResponse } from '../types/staff';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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

export async function getPublicStaff(): Promise<PublicStaffResponse> {
  const response = await fetch(`${API_BASE_URL}/api/public/staff`);
  return handleResponse<PublicStaffResponse>(
    response,
    'Failed to fetch staff data'
  );
}