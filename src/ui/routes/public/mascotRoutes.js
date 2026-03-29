const express = require('express');
const mascotController = require('../../controllers/mascotController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/', mascotController.getAll);
router.get('/:id', mascotController.getById);
router.post('/', authMiddleware, mascotController.create);
router.put('/:id', authMiddleware, mascotController.update);
router.delete('/:id', authMiddleware, mascotController.remove);

module.exports = router;