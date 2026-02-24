const express = require("express");
const router = express.Router();
const capsuleController = require("../controllers/capsuleController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", capsuleController.createCapsule);
router.get("/", capsuleController.getCapsules);
router.get("/:id", capsuleController.openCapsule);

module.exports = router;
