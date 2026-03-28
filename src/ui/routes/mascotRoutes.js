const express = require("express");
const mascotController = require("../controllers/mascotController");

const router = express.Router();

router.get("/", mascotController.getAll);
router.get("/:id", mascotController.getById);
router.post("/", mascotController.create);
router.put("/:id", mascotController.update);
router.delete("/:id", mascotController.delete);

module.exports = router;