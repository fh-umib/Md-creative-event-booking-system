const express = require('express');
const galleryController = require('../../controllers/galleryController');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

const router = express.Router();

/**
 * Protected admin gallery routes
 */
router.use(authMiddleware);
router.use(roleMiddleware('Admin'));

router.get('/', (req, res, next) => galleryController.getAdminAlbums(req, res, next));
router.get('/:id', (req, res, next) => galleryController.getAlbumById(req, res, next));
router.post('/', (req, res, next) => galleryController.createAlbum(req, res, next));
router.put('/:id', (req, res, next) => galleryController.updateAlbum(req, res, next));
router.delete('/:id', (req, res, next) => galleryController.deleteAlbum(req, res, next));

router.post('/photos', (req, res, next) => galleryController.createPhoto(req, res, next));
router.put('/photos/:id', (req, res, next) => galleryController.updatePhoto(req, res, next));
router.delete('/photos/:id', (req, res, next) => galleryController.deletePhoto(req, res, next));

module.exports = router;