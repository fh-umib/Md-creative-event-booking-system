const express = require('express');
const galleryController = require('../../controllers/galleryController');

const router = express.Router();

router.get('/', galleryController.getAdminAlbums);
router.get('/:id', galleryController.getAlbumById);
router.post('/', galleryController.createAlbum);
router.put('/:id', galleryController.updateAlbum);
router.delete('/:id', galleryController.deleteAlbum);

router.post('/photos', galleryController.createPhoto);
router.put('/photos/:id', galleryController.updatePhoto);
router.delete('/photos/:id', galleryController.deletePhoto);

module.exports = router;