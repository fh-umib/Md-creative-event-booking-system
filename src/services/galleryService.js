const galleryRepository = require('../data/repositories/galleryRepository');

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function validateAlbumPayload(data) {
  if (!data.title || !data.title.trim()) {
    throw new Error('Title is required');
  }

  if (!data.category || !data.category.trim()) {
    throw new Error('Category is required');
  }

  if (!data.cover_image_url || !data.cover_image_url.trim()) {
    throw new Error('Cover image URL is required');
  }
}

function validatePhotoPayload(data) {
  if (!data.album_id) {
    throw new Error('Album ID is required');
  }

  if (!data.image_url || !data.image_url.trim()) {
    throw new Error('Image URL is required');
  }
}

async function getAdminAlbums(filters) {
  return galleryRepository.getAllAlbums(filters);
}

async function getPublicAlbums() {
  return galleryRepository.getPublishedAlbums();
}

async function getAlbumDetailsById(id) {
  const album = await galleryRepository.getAlbumById(id);

  if (!album) {
    throw new Error('Album not found');
  }

  const photos = await galleryRepository.getPhotosByAlbumId(id);
  return { ...album, photos };
}

async function getAlbumDetailsBySlug(slug) {
  const album = await galleryRepository.getAlbumBySlug(slug);

  if (!album || !album.is_published) {
    throw new Error('Album not found');
  }

  const photos = await galleryRepository.getPhotosByAlbumId(album.id);
  return { ...album, photos };
}

async function createAlbum(data) {
  validateAlbumPayload(data);

  const slug =
    data.slug && data.slug.trim() ? slugify(data.slug) : slugify(data.title);

  const existing = await galleryRepository.getAlbumBySlug(slug);

  if (existing) {
    throw new Error('Album slug already exists');
  }

  return galleryRepository.createAlbum({
    ...data,
    slug,
  });
}

async function updateAlbum(id, data) {
  validateAlbumPayload(data);

  const existingAlbum = await galleryRepository.getAlbumById(id);

  if (!existingAlbum) {
    throw new Error('Album not found');
  }

  const slug =
    data.slug && data.slug.trim() ? slugify(data.slug) : slugify(data.title);

  const existingSlug = await galleryRepository.getAlbumBySlug(slug);

  if (existingSlug && existingSlug.id !== Number(id)) {
    throw new Error('Album slug already exists');
  }

  return galleryRepository.updateAlbum(id, {
    ...data,
    slug,
  });
}

async function deleteAlbum(id) {
  const existingAlbum = await galleryRepository.getAlbumById(id);

  if (!existingAlbum) {
    throw new Error('Album not found');
  }

  return galleryRepository.deleteAlbum(id);
}

async function createPhoto(data) {
  validatePhotoPayload(data);

  const album = await galleryRepository.getAlbumById(data.album_id);

  if (!album) {
    throw new Error('Album not found');
  }

  return galleryRepository.createPhoto(data);
}

async function updatePhoto(id, data) {
  const existingPhoto = await galleryRepository.getPhotoById(id);

  if (!existingPhoto) {
    throw new Error('Photo not found');
  }

  if (!data.image_url || !data.image_url.trim()) {
    throw new Error('Image URL is required');
  }

  return galleryRepository.updatePhoto(id, data);
}

async function deletePhoto(id) {
  const existingPhoto = await galleryRepository.getPhotoById(id);

  if (!existingPhoto) {
    throw new Error('Photo not found');
  }

  return galleryRepository.deletePhoto(id);
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