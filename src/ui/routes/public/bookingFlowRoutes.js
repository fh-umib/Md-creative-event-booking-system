const express = require('express');
const bookingFlowController = require('../../controllers/bookingFlowController');

const router = express.Router();

router.get('/categories', (req, res, next) =>
  bookingFlowController.getCategories(req, res, next)
);

router.get('/configuration', (req, res, next) =>
  bookingFlowController.getFlowConfiguration(req, res, next)
);

router.get('/packages/:category', (req, res, next) =>
  bookingFlowController.getPackagesByCategory(req, res, next)
);

router.get('/customization/:category', (req, res, next) =>
  bookingFlowController.getCustomizationConfig(req, res, next)
);

module.exports = router;