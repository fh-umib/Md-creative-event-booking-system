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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
}

export async function getPublicDecorations(): Promise<Decoration[]> {
  const response = await fetch(`${API_BASE_URL}/decorations`);
  return handleResponse<Decoration[]>(response);
}

export async function getDecorationBySlug(slug: string): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/decorations/slug/${slug}`);
  return handleResponse<Decoration>(response);
}

export async function getAdminDecorations(): Promise<Decoration[]> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations`);
  return handleResponse<Decoration[]>(response);
}

export async function createDecoration(
  payload: DecorationPayload
): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Decoration>(response);
}

export async function updateDecoration(
  id: number,
  payload: DecorationPayload
): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Decoration>(response);
}

export async function deleteDecoration(id: number): Promise<Decoration> {
  const response = await fetch(`${API_BASE_URL}/admin/decorations/${id}`, {
    method: 'DELETE',
  });

  return handleResponse<Decoration>(response);
}