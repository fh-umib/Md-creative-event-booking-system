const express = require('express');
const controller = require('../../controllers/mascotController');

const router = express.Router();

router.get('/', controller.getAllAdmin);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;