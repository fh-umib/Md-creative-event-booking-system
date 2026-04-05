const express = require('express');
const controller = require('../../controllers/bookingAdminController');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.patch('/:id/status', controller.updateStatus);
router.delete('/:id', controller.delete);

module.exports = router;