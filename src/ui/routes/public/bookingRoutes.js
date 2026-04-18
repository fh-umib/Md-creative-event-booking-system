const express = require('express');
const bookingController = require('../../controllers/bookingController');

const router = express.Router();

/**
 * Public booking route
 * Customers are only allowed to create a booking from the public side.
 */
router.post('/', (req, res, next) => bookingController.create(req, res, next));

module.exports = router;