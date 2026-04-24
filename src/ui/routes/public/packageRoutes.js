const express = require('express');
const controller = require('../../controllers/packageController');

const router = express.Router();

router.get('/', controller.getAllPublicPackages);
router.get('/categories', controller.getPublicCategories);
router.get('/category/:category', controller.getByCategory);
router.get('/:id', controller.getById);

module.exports = router;