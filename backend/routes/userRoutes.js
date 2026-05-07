const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

// Driver updates location
router.put("/location", authMiddleware, requireRole("driver"), userController.updateLocation);

module.exports = router;