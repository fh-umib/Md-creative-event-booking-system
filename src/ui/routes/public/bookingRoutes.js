const express = require('express');
const bookingController = require('../../controllers/bookingController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, bookingController.getAll);
router.post('/', authMiddleware, bookingController.create);
router.patch('/:id/status', authMiddleware, bookingController.updateStatus);

module.exports = router;
