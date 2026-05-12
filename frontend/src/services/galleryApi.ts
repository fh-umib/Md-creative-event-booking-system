import { API_URL } from './apiBase';

export type GalleryAlbum = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  cover_image_url: string;
  event_date: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
  photo_count?: number;
};

export type GalleryPhoto = {
  id: number;
  album_id: number;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  is_cover: boolean;
  display_order: number;
  created_at?: string;
};

export type GalleryAlbumDetails = GalleryAlbum & {
  photos: GalleryPhoto[];
};

export type AdminGalleryAlbumPayload = {
  title: string;
  slug?: string;
  description?: string;
  category: string;
  cover_image_url: string;
  event_date?: string | null;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
};

export type AdminGalleryPhotoPayload = {
  album_id: number;
  image_url: string;
  alt_text?: string;
  caption?: string;
  is_cover?: boolean;
  display_order?: number;
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

async function handleResponse<T>(
  response: Response,
  fallbackMessage = 'Request failed',
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

/* =========================
   PUBLIC
========================= */

export async function getPublicGalleryAlbums(): Promise<GalleryAlbum[]> {
  const response = await fetch(`${API_URL}/gallery`);

  return handleResponse<GalleryAlbum[]>(
    response,
    'Failed to load gallery',
  );
}

export async function getPublicGalleryAlbumBySlug(
  slug: string,
): Promise<GalleryAlbumDetails> {
  const response = await fetch(
    `${API_URL}/gallery/${encodeURIComponent(slug)}`,
  );

  return handleResponse<GalleryAlbumDetails>(
    response,
    'Failed to load album',
  );
}

/* =========================
   ADMIN ALBUMS
========================= */

export async function getAdminGalleryAlbums(
  params?: { search?: string; category?: string; published?: string },
): Promise<GalleryAlbum[]> {
  const searchParams = new URLSearchParams();

  if (params?.search?.trim()) {
    searchParams.set('search', params.search.trim());
  }

  if (params?.category?.trim()) {
    searchParams.set('category', params.category.trim());
  }

  if (params?.published?.trim()) {
    searchParams.set('published', params.published.trim());
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API_URL}/admin/gallery${query ? `?${query}` : ''}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return handleResponse<GalleryAlbum[]>(
    response,
    'Failed to load gallery',
  );
}

export async function getAdminGalleryAlbumById(
  id: number,
): Promise<GalleryAlbumDetails> {
  const response = await fetch(`${API_URL}/admin/gallery/${id}`, {
    headers: getAuthHeaders(),
  });

  return handleResponse<GalleryAlbumDetails>(
    response,
    'Failed to load album details',
  );
}

export async function createGalleryAlbum(
  payload: AdminGalleryAlbumPayload,
): Promise<GalleryAlbum> {
  const response = await fetch(`${API_URL}/admin/gallery`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryAlbum>(
    response,
    'Failed to create album',
  );
}

export async function updateGalleryAlbum(
  id: number,
  payload: AdminGalleryAlbumPayload,
): Promise<GalleryAlbum> {
  const response = await fetch(`${API_URL}/admin/gallery/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryAlbum>(
    response,
    'Failed to update album',
  );
}

export async function deleteGalleryAlbum(id: number): Promise<GalleryAlbum> {
  const response = await fetch(`${API_URL}/admin/gallery/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return handleResponse<GalleryAlbum>(
    response,
    'Failed to delete album',
  );
}

/* =========================
   ADMIN PHOTOS
========================= */

export async function createGalleryPhoto(
  payload: AdminGalleryPhotoPayload,
): Promise<GalleryPhoto> {
  const response = await fetch(`${API_URL}/admin/gallery/photos`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryPhoto>(
    response,
    'Failed to create photo',
  );
}

export async function updateGalleryPhoto(
  id: number,
  payload: Omit<AdminGalleryPhotoPayload, 'album_id'> & { album_id?: number },
): Promise<GalleryPhoto> {
  const response = await fetch(`${API_URL}/admin/gallery/photos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryPhoto>(
    response,
    'Failed to update photo',
  );
}

export async function deleteGalleryPhoto(id: number): Promise<GalleryPhoto> {
  const response = await fetch(`${API_URL}/admin/gallery/photos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return handleResponse<GalleryPhoto>(
    response,
    'Failed to delete photo',
  );
}