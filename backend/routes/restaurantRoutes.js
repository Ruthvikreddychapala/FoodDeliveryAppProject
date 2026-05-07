const express =
  require("express");

const router =
  express.Router();

const restaurantController =
  require("../controllers/restaurantController");

const authMiddleware =
  require("../middleware/authMiddleware");

const approvalMiddleware =
  require("../middleware/approvalMiddleware");


// ======================================
// PUBLIC ROUTES
// ======================================

router.get(
  "/",
  restaurantController.getRestaurants
);

router.get(
  "/:id",
  restaurantController.getRestaurantById
);


// ======================================
// CREATE RESTAURANT
// ======================================

router.post(
  "/",
  authMiddleware,
  approvalMiddleware,
  restaurantController.createRestaurant
);


// ======================================
// ADD MENU ITEM
// ======================================

router.post(
  "/:id/menu",
  authMiddleware,
  approvalMiddleware,
  restaurantController.addMenuItem
);


// ======================================
// EDIT MENU ITEM
// ======================================

router.put(
  "/:id/menu/:menuId",
  authMiddleware,
  approvalMiddleware,
  restaurantController.editMenuItem
);


// ======================================
// DELETE MENU ITEM
// ======================================

router.delete(
  "/:id/menu/:menuId",
  authMiddleware,
  approvalMiddleware,
  restaurantController.deleteMenuItem
);

module.exports = router;