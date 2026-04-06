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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'Request failed';

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      const text = await response.text();
      if (text) message = text;
    }

    throw new Error(message);
  }

  return response.json();
}

/* =========================
   PUBLIC
========================= */

export async function getPublicGalleryAlbums(): Promise<GalleryAlbum[]> {
  const response = await fetch(`${API_BASE_URL}/gallery`);
  return handleResponse<GalleryAlbum[]>(response);
}

export async function getPublicGalleryAlbumBySlug(
  slug: string
): Promise<GalleryAlbumDetails> {
  const response = await fetch(`${API_BASE_URL}/gallery/${slug}`);
  return handleResponse<GalleryAlbumDetails>(response);
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

  const response = await fetch(url);
  return handleResponse<GalleryAlbum[]>(response);
}

export async function getAdminGalleryAlbumById(
  id: number
): Promise<GalleryAlbumDetails> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`);
  return handleResponse<GalleryAlbumDetails>(response);
}

export async function createGalleryAlbum(
  payload: AdminGalleryAlbumPayload
): Promise<GalleryAlbum> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryAlbum>(response);
}

export async function updateGalleryAlbum(
  id: number,
  payload: AdminGalleryAlbumPayload
): Promise<GalleryAlbum> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryAlbum>(response);
}

export async function deleteGalleryAlbum(id: number): Promise<GalleryAlbum> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
    method: 'DELETE',
  });

  return handleResponse<GalleryAlbum>(response);
}

/* =========================
   ADMIN PHOTOS
========================= */

export async function createGalleryPhoto(
  payload: AdminGalleryPhotoPayload
): Promise<GalleryPhoto> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/photos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryPhoto>(response);
}

export async function updateGalleryPhoto(
  id: number,
  payload: Omit<AdminGalleryPhotoPayload, 'album_id'> & { album_id?: number }
): Promise<GalleryPhoto> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/photos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<GalleryPhoto>(response);
}

export async function deleteGalleryPhoto(id: number): Promise<GalleryPhoto> {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/photos/${id}`, {
    method: 'DELETE',
  });

  return handleResponse<GalleryPhoto>(response);
}