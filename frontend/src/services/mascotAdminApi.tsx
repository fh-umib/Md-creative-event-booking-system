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

export async function getAdminMascots(): Promise<Mascot[]> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots`);

  if (!response.ok) {
    throw new Error('Failed to load mascots');
  }

  return response.json();
}

export async function createMascot(payload: MascotPayload): Promise<Mascot> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      min_age: payload.min_age === '' ? null : payload.min_age,
      max_age: payload.max_age === '' ? null : payload.max_age,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to create mascot');
  }

  return response.json();
}

export async function updateMascot(
  id: number,
  payload: MascotPayload
): Promise<Mascot> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      min_age: payload.min_age === '' ? null : payload.min_age,
      max_age: payload.max_age === '' ? null : payload.max_age,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update mascot');
  }

  return response.json();
}

export async function deleteMascot(id: number): Promise<Mascot> {
  const response = await fetch(`${API_BASE_URL}/admin/mascots/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete mascot');
  }

  return response.json();
}