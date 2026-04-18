const express = require('express');
const staffController = require('../../controllers/staffController');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

const router = express.Router();

/**
 * Protected admin staff routes
 */
router.use(authMiddleware);
router.use(roleMiddleware('Admin'));

router.get('/', (req, res, next) => staffController.getAll(req, res, next));
router.get('/:id', (req, res, next) => staffController.getById(req, res, next));
router.post('/', (req, res, next) => staffController.create(req, res, next));
router.put('/:id', (req, res, next) => staffController.update(req, res, next));
router.delete('/:id', (req, res, next) => staffController.delete(req, res, next));

module.exports = router;