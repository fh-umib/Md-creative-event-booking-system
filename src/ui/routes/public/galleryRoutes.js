const express = require('express');
const galleryController = require('../../controllers/galleryController');

const router = express.Router();

router.get('/', galleryController.getPublicAlbums);
router.get('/:slug', galleryController.getAlbumBySlug);

module.exports = router;