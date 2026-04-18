const galleryService = require('../../services/galleryService');

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parseId(idParam, label = 'id') {
  const numericId = Number(idParam);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw createBadRequest(`A valid ${label} is required.`);
  }

  return numericId;
}

async function getAdminAlbums(req, res, next) {
  try {
    const albums = await galleryService.getAdminAlbums(req.query);

    return res.status(200).json({
      success: true,
      message: 'Admin gallery albums fetched successfully.',
      data: albums,
    });
  } catch (error) {
    next(error);
  }
}

async function getPublicAlbums(req, res, next) {
  try {
    const albums = await galleryService.getPublicAlbums();

    return res.status(200).json({
      success: true,
      message: 'Gallery albums fetched successfully.',
      data: albums,
    });
  } catch (error) {
    next(error);
  }
}

async function getAlbumById(req, res, next) {
  try {
    const albumId = parseId(req.params.id, 'album id');
    const album = await galleryService.getAlbumDetailsById(albumId);

    return res.status(200).json({
      success: true,
      message: 'Album fetched successfully.',
      data: album,
    });
  } catch (error) {
    next(error);
  }
}

async function getAlbumBySlug(req, res, next) {
  try {
    const slug = req.params.slug ? String(req.params.slug).trim() : '';

    if (!slug) {
      throw createBadRequest('Album slug is required.');
    }

    const album = await galleryService.getAlbumDetailsBySlug(slug);

    return res.status(200).json({
      success: true,
      message: 'Album fetched successfully.',
      data: album,
    });
  } catch (error) {
    next(error);
  }
}

async function createAlbum(req, res, next) {
  try {
    const album = await galleryService.createAlbum(req.body);

    return res.status(201).json({
      success: true,
      message: 'Album created successfully.',
      data: album,
    });
  } catch (error) {
    next(error);
  }
}

async function updateAlbum(req, res, next) {
  try {
    const albumId = parseId(req.params.id, 'album id');
    const album = await galleryService.updateAlbum(albumId, req.body);

    return res.status(200).json({
      success: true,
      message: 'Album updated successfully.',
      data: album,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const albumId = parseId(req.params.id, 'album id');
    const album = await galleryService.deleteAlbum(albumId);

    return res.status(200).json({
      success: true,
      message: 'Album deleted successfully.',
      data: album,
    });
  } catch (error) {
    next(error);
  }
}

async function createPhoto(req, res, next) {
  try {
    const photo = await galleryService.createPhoto(req.body);

    return res.status(201).json({
      success: true,
      message: 'Photo created successfully.',
      data: photo,
    });
  } catch (error) {
    next(error);
  }
}

async function updatePhoto(req, res, next) {
  try {
    const photoId = parseId(req.params.id, 'photo id');
    const photo = await galleryService.updatePhoto(photoId, req.body);

    return res.status(200).json({
      success: true,
      message: 'Photo updated successfully.',
      data: photo,
    });
  } catch (error) {
    next(error);
  }
}

async function deletePhoto(req, res, next) {
  try {
    const photoId = parseId(req.params.id, 'photo id');
    const photo = await galleryService.deletePhoto(photoId);

    return res.status(200).json({
      success: true,
      message: 'Photo deleted successfully.',
      data: photo,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAdminAlbums,
  getPublicAlbums,
  getAlbumById,
  getAlbumBySlug,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createPhoto,
  updatePhoto,
  deletePhoto,
};