const express = require("express");
const mascotController = require("../controllers/mascotController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", mascotController.getAll);
router.post("/", authMiddleware, mascotController.create);

module.exports = router;