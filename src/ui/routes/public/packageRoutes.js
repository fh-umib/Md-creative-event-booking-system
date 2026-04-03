const express = require('express');
const packageController = require('../../controllers/packageController');

const router = express.Router();

router.get('/', (req, res, next) => packageController.getAll(req, res, next));
router.get('/:id', (req, res, next) => packageController.getById(req, res, next));

router.post('/', (req, res, next) => packageController.create(req, res, next));
router.put('/:id', (req, res, next) => packageController.update(req, res, next));
router.delete('/:id', (req, res, next) => packageController.delete(req, res, next));

module.exports = router;