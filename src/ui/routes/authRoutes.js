const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


const router = express.Router();

router.post('/login', (req, res, next) => authController.login(req, res, next));

router.post('/client-register', (req, res, next) =>
  authController.registerClient(req, res, next)
);

router.get('/verify-email', (req, res, next) =>
  authController.verifyEmail(req, res, next)
);

router.post(
  '/register',
  authMiddleware,
  roleMiddleware('Admin'),
  (req, res, next) => authController.register(req, res, next)
);

router.post('/forgot-password', (req, res, next) =>
  authController.forgotPassword(req, res, next)
);

router.post('/reset-password', (req, res, next) =>
  authController.resetPassword(req, res, next)
);

module.exports = router;