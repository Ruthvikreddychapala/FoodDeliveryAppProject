const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// Get pending users
router.get("/pending", authMiddleware, adminMiddleware, adminController.getPendingUsers);

// Approve user
router.put("/approve/:id", authMiddleware, adminMiddleware, adminController.approveUser);

router.get("/drivers", authMiddleware, adminMiddleware, adminController.getDrivers);

module.exports = router;