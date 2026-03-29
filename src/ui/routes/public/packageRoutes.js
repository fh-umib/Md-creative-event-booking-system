const express = require('express');
const packageController = require('../../controllers/packageController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/', packageController.getAll);
router.get('/:id', packageController.getById);
router.post('/', authMiddleware, packageController.create);
router.put('/:id', authMiddleware, packageController.update);
router.delete('/:id', authMiddleware, packageController.remove);

module.exports = router;