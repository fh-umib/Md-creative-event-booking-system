const express = require('express');
const controller = require('../../controllers/mascotController');

const router = express.Router();

router.get('/', controller.getAllPublic);
router.get('/:id', controller.getById);

module.exports = router;