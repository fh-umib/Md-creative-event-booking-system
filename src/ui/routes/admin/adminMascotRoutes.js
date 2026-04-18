const express = require('express');
const controller = require('../../controllers/mascotController');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

const router = express.Router();

/**
 * Protected admin mascot routes
 */
router.use(authMiddleware);
router.use(roleMiddleware('Admin'));

router.get('/', (req, res, next) => controller.getAllAdmin(req, res, next));
router.get('/:id', (req, res, next) => controller.getById(req, res, next));
router.post('/', (req, res, next) => controller.create(req, res, next));
router.put('/:id', (req, res, next) => controller.update(req, res, next));
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

module.exports = router;