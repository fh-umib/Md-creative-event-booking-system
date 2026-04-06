const galleryService = require('../../services/galleryService');

async function getAdminAlbums(req, res) {
  try {
    const albums = await galleryService.getAdminAlbums(req.query);
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch albums' });
  }
}

async function getPublicAlbums(req, res) {
  try {
    const albums = await galleryService.getPublicAlbums();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch gallery' });
  }
}

async function getAlbumById(req, res) {
  try {
    const album = await galleryService.getAlbumDetailsById(req.params.id);
    res.status(200).json(album);
  } catch (error) {
    if (error.message === 'Album not found') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to fetch album' });
  }
}

async function getAlbumBySlug(req, res) {
  try {
    const album = await galleryService.getAlbumDetailsBySlug(req.params.slug);
    res.status(200).json(album);
  } catch (error) {
    if (error.message === 'Album not found') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to fetch album' });
  }
}

async function createAlbum(req, res) {
  try {
    const album = await galleryService.createAlbum(req.body);
    res.status(201).json(album);
  } catch (error) {
    if (
      error.message === 'Title is required' ||
      error.message === 'Category is required' ||
      error.message === 'Cover image URL is required' ||
      error.message === 'Album slug already exists'
    ) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to create album' });
  }
}

async function updateAlbum(req, res) {
  try {
    const album = await galleryService.updateAlbum(req.params.id, req.body);
    res.status(200).json(album);
  } catch (error) {
    if (
      error.message === 'Album not found' ||
      error.message === 'Title is required' ||
      error.message === 'Category is required' ||
      error.message === 'Cover image URL is required' ||
      error.message === 'Album slug already exists'
    ) {
      const status = error.message === 'Album not found' ? 404 : 400;
      return res.status(status).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to update album' });
  }
}

async function deleteAlbum(req, res) {
  try {
    const album = await galleryService.deleteAlbum(req.params.id);
    res.status(200).json(album);
  } catch (error) {
    if (error.message === 'Album not found') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to delete album' });
  }
}

async function createPhoto(req, res) {
  try {
    const photo = await galleryService.createPhoto(req.body);
    res.status(201).json(photo);
  } catch (error) {
    if (
      error.message === 'Album ID is required' ||
      error.message === 'Image URL is required' ||
      error.message === 'Album not found'
    ) {
      const status = error.message === 'Album not found' ? 404 : 400;
      return res.status(status).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to create photo' });
  }
}

async function updatePhoto(req, res) {
  try {
    const photo = await galleryService.updatePhoto(req.params.id, req.body);
    res.status(200).json(photo);
  } catch (error) {
    if (
      error.message === 'Photo not found' ||
      error.message === 'Image URL is required'
    ) {
      const status = error.message === 'Photo not found' ? 404 : 400;
      return res.status(status).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to update photo' });
  }
}

async function deletePhoto(req, res) {
  try {
    const photo = await galleryService.deletePhoto(req.params.id);
    res.status(200).json(photo);
  } catch (error) {
    if (error.message === 'Photo not found') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || 'Failed to delete photo' });
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