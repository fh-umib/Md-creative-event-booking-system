const express = require("express");
const packageController = require("../controllers/packageController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", packageController.getAll);
router.post("/", authMiddleware, packageController.create);

module.exports = router;
