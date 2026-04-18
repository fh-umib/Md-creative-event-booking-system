const galleryRepository = require('../data/repositories/galleryRepository');

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeString(value) {
  return value !== undefined && value !== null ? String(value).trim() : '';
}

function parseId(value, label = 'id') {
  const numericId = Number(value);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw createHttpError(`A valid ${label} is required.`, 400);
  }

  return numericId;
}

function validateAlbumPayload(data) {
  const title = normalizeString(data.title);
  const category = normalizeString(data.category);
  const coverImageUrl = normalizeString(data.cover_image_url);

  if (!title) {
    throw createHttpError('Title is required.', 400);
  }

  if (!category) {
    throw createHttpError('Category is required.', 400);
  }

  if (!coverImageUrl) {
    throw createHttpError('Cover image URL is required.', 400);
  }
}

function validatePhotoPayload(data) {
  const albumId = parseId(data.album_id, 'album id');
  const imageUrl = normalizeString(data.image_url);

  if (!imageUrl) {
    throw createHttpError('Image URL is required.', 400);
  }

  return { albumId, imageUrl };
}

async function getAdminAlbums(filters) {
  return galleryRepository.getAllAlbums(filters);
}

async function getPublicAlbums() {
  return galleryRepository.getPublishedAlbums();
}

async function getAlbumDetailsById(id) {
  const albumId = parseId(id, 'album id');
  const album = await galleryRepository.getAlbumById(albumId);

  if (!album) {
    throw createHttpError('Album not found.', 404);
  }

  const photos = await galleryRepository.getPhotosByAlbumId(albumId);
  return { ...album, photos };
}

async function getAlbumDetailsBySlug(slug) {
  const normalizedSlug = normalizeString(slug);

  if (!normalizedSlug) {
    throw createHttpError('Album slug is required.', 400);
  }

  const album = await galleryRepository.getAlbumBySlug(normalizedSlug);

  if (!album || !album.is_published) {
    throw createHttpError('Album not found.', 404);
  }

  const photos = await galleryRepository.getPhotosByAlbumId(album.id);
  return { ...album, photos };
}

async function createAlbum(data) {
  validateAlbumPayload(data);

  const title = normalizeString(data.title);
  const slug = normalizeString(data.slug) || slugify(title);

  const existing = await galleryRepository.getAlbumBySlug(slug);

  if (existing) {
    throw createHttpError('Album slug already exists.', 409);
  }

  return galleryRepository.createAlbum({
    ...data,
    title,
    slug,
    category: normalizeString(data.category),
    cover_image_url: normalizeString(data.cover_image_url),
    description: normalizeString(data.description),
  });
}

async function updateAlbum(id, data) {
  const albumId = parseId(id, 'album id');
  validateAlbumPayload(data);

  const existingAlbum = await galleryRepository.getAlbumById(albumId);

  if (!existingAlbum) {
    throw createHttpError('Album not found.', 404);
  }

  const title = normalizeString(data.title);
  const slug = normalizeString(data.slug) || slugify(title);

  const existingSlug = await galleryRepository.getAlbumBySlug(slug);

  if (existingSlug && existingSlug.id !== albumId) {
    throw createHttpError('Album slug already exists.', 409);
  }

  return galleryRepository.updateAlbum(albumId, {
    ...data,
    title,
    slug,
    category: normalizeString(data.category),
    cover_image_url: normalizeString(data.cover_image_url),
    description: normalizeString(data.description),
  });
}

async function deleteAlbum(id) {
  const albumId = parseId(id, 'album id');
  const existingAlbum = await galleryRepository.getAlbumById(albumId);

  if (!existingAlbum) {
    throw createHttpError('Album not found.', 404);
  }

  return galleryRepository.deleteAlbum(albumId);
}

async function createPhoto(data) {
  const { albumId, imageUrl } = validatePhotoPayload(data);

  const album = await galleryRepository.getAlbumById(albumId);

  if (!album) {
    throw createHttpError('Album not found.', 404);
  }

  return galleryRepository.createPhoto({
    ...data,
    album_id: albumId,
    image_url: imageUrl,
    caption: normalizeString(data.caption),
  });
}

async function updatePhoto(id, data) {
  const photoId = parseId(id, 'photo id');
  const existingPhoto = await galleryRepository.getPhotoById(photoId);

  if (!existingPhoto) {
    throw createHttpError('Photo not found.', 404);
  }

  const imageUrl = normalizeString(data.image_url);

  if (!imageUrl) {
    throw createHttpError('Image URL is required.', 400);
  }

  return galleryRepository.updatePhoto(photoId, {
    ...data,
    image_url: imageUrl,
    caption: normalizeString(data.caption),
  });
}

async function deletePhoto(id) {
  const photoId = parseId(id, 'photo id');
  const existingPhoto = await galleryRepository.getPhotoById(photoId);

  if (!existingPhoto) {
    throw createHttpError('Photo not found.', 404);
  }

  return galleryRepository.deletePhoto(photoId);
}

module.exports = {
  getAdminAlbums,
  getPublicAlbums,
  getAlbumDetailsById,
  getAlbumDetailsBySlug,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createPhoto,
  updatePhoto,
  deletePhoto,
};