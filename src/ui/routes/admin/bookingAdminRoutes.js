const express = require('express');
const bookingController = require('../../controllers/bookingController');

const router = express.Router();

router.get('/', (req, res, next) => bookingController.getAll(req, res, next));
router.get('/:id', (req, res, next) => bookingController.getById(req, res, next));

router.patch('/:id/status', (req, res, next) =>
  bookingController.updateStatus(req, res, next)
);

router.patch('/:id/payment-status', (req, res, next) =>
  bookingController.updatePaymentStatus(req, res, next)
);

router.delete('/:id', (req, res, next) => bookingController.delete(req, res, next));

module.exports = router;