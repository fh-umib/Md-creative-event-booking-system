const express = require('express');
const controller = require('../../controllers/bookingAdminController');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

const router = express.Router();

/**
 * Protected admin booking routes
 */
router.use(authMiddleware);
router.use(roleMiddleware('Admin'));

router.get('/', (req, res, next) => controller.getAll(req, res, next));
router.get('/:id', (req, res, next) => controller.getById(req, res, next));
router.patch('/:id/status', (req, res, next) => controller.updateStatus(req, res, next));
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

module.exports = router;