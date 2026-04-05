const express = require('express');
const controller = require('../../controllers/decorationController');

const router = express.Router();

router.get('/', controller.getAllPublic);
router.get('/slug/:slug', controller.getBySlug);
router.get('/:id', controller.getById);

module.exports = router;