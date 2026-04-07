const express = require("express");
const router = express.Router();
const staffController = require("../../controllers/staffController");

router.get("/", (req, res) => staffController.getAll(req, res));
router.get("/:id", (req, res) => staffController.getById(req, res));
router.post("/", (req, res) => staffController.create(req, res));
router.put("/:id", (req, res) => staffController.update(req, res));
router.delete("/:id", (req, res) => staffController.delete(req, res));

module.exports = router;