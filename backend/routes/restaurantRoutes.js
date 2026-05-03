const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/restaurantController");
const authMiddleware = require("../middleware/authMiddleware");
const approvalMiddleware = require("../middleware/approvalMiddleware");

// Create restaurant
router.post("/", authMiddleware, approvalMiddleware, restaurantController.createRestaurant);

// Get all restaurants
router.get("/", restaurantController.getRestaurants);

// Add menu item
router.post("/:id/menu", authMiddleware, approvalMiddleware, restaurantController.addMenuItem);

module.exports = router;