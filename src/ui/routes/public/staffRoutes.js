const express = require('express');
const router = express.Router();
const staffController = require('../../controllers/staffController');

router.get('/', staffController.getPublicStaff);

module.exports = router;