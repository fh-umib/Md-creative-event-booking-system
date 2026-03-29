const express = require('express');
const reviewController = require('../../controllers/reviewController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getById);
router.post('/', authMiddleware, reviewController.create);
router.put('/:id', authMiddleware, reviewController.update);
router.delete('/:id', authMiddleware, reviewController.remove);

module.exports = router;