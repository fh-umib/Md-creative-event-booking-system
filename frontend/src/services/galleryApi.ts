const API_BASE_URL = 'http://localhost:5000/api';

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
  return localStorage.getItem('md_auth_token');
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
  fallbackMessage = 'Request failed'
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

/* =========================
   PUBLIC
========================= */

export async function getPublicGalleryAlbums(): Promise<GalleryAlbum[]> {
  const response = await fetch(`${API_BASE_URL}/gallery`);
  return handleResponse<GalleryAlbum[]>(response, 'Failed to load gallery');
}

export async function getPublicGalleryAlbumBySlug(
  slug: string
): Promise<GalleryAlbumDetails> {
  const response = await fetch(`${API_BASE_URL}/gallery/${slug}`);
  return handleResponse<GalleryAlbumDetails>(response, 'Failed to load album');
}

/* =========================
   ADMIN ALBUMS
========================= */

export async function getAdminGalleryAlbums(
  params?: { search?: string; category?: string; published?: string }
): Promise<GalleryAlbum[]> {
  const searchParams = new URLSearchParams();

  if (params?.search) searchParams.set('search', params.search);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.published) searchParams.set('published', params.published);

  const query = searchParams.toString();
  const url = query
    ? `${API_BASE_URL}/admin/gallery?${query}`
    : `${API_BASE_URL}/admin/gallery`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  return handleResponse<GalleryAlbum[]>(response, 'Failed to load gallery');
}

export async function getAdminGalleryAlbumById(
  id: number
): Promise<GalleryAlbumDetails> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
    headers: getAuthHeaders(),
  });

  return handleResponse<GalleryAlbumDetails>(
    response,
    'Failed to load album details'
  );
}

export async function createGalleryAlbum(
  payload: AdminGalleryAlbumPayload
): Promise<GalleryAlbum> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryAlbum>(response, 'Failed to create album');
}

export async function updateGalleryAlbum(
  id: number,
  payload: AdminGalleryAlbumPayload
): Promise<GalleryAlbum> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryAlbum>(response, 'Failed to update album');
}

export async function deleteGalleryAlbum(id: number): Promise<GalleryAlbum> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return handleResponse<GalleryAlbum>(response, 'Failed to delete album');
}

/* =========================
   ADMIN PHOTOS
========================= */

export async function createGalleryPhoto(
  payload: AdminGalleryPhotoPayload
): Promise<GalleryPhoto> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/photos`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryPhoto>(response, 'Failed to create photo');
}

export async function updateGalleryPhoto(
  id: number,
  payload: Omit<AdminGalleryPhotoPayload, 'album_id'> & { album_id?: number }
): Promise<GalleryPhoto> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/photos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryPhoto>(response, 'Failed to update photo');
}

export async function deleteGalleryPhoto(id: number): Promise<GalleryPhoto> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/photos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return handleResponse<GalleryPhoto>(response, 'Failed to delete photo');
}