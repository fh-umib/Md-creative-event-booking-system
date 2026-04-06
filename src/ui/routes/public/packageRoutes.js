const express = require('express');
const controller = require('../../controllers/packageController');

const router = express.Router();

router.get('/', controller.getPublicCategories);
router.get('/category/:category', controller.getByCategory);
router.get('/:id', controller.getById);

module.exports = router;