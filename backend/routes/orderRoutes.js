const express = require("express");

const router = express.Router();

const orderController =
  require("../controllers/orderController");

const authMiddleware =
  require("../middleware/authMiddleware");

const approvalMiddleware =
  require("../middleware/approvalMiddleware");

const requireRole =
  require("../middleware/roleMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");


// ======================================
// CREATE ORDER
// ======================================

router.post(
  "/",
  authMiddleware,
  approvalMiddleware,
  requireRole("customer"),
  orderController.createOrder
);


// ======================================
// GET ORDERS
// ======================================

router.get(
  "/",
  authMiddleware,
  approvalMiddleware,
  orderController.getOrders
);


// ======================================
// UPDATE STATUS
// ======================================

router.put(
  "/:id/status",
  authMiddleware,
  approvalMiddleware,
  orderController.updateStatus
);


// ======================================
// ASSIGN DRIVER
// ======================================

router.put(
  "/:id/assign-driver",
  authMiddleware,
  adminMiddleware,
  orderController.assignDriver
);


// ======================================
// DRIVER LIVE LOCATION
// ======================================

router.put(
  "/driver/location",
  authMiddleware,
  approvalMiddleware,
  requireRole("driver"),
  orderController.updateDriverLocation
);


module.exports = router;