const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

/**
 * Public route
 */
router.post('/login', (req, res, next) => authController.login(req, res, next));

/**
 * Protected route
 * Only authenticated admin users can create new staff/admin accounts
 */
router.post(
  '/register',
  authMiddleware,
  roleMiddleware('Admin'),
  (req, res, next) => authController.register(req, res, next)
);

module.exports = router;