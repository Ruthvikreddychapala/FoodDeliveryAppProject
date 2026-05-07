const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const approvalMiddleware = require("../middleware/approvalMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


router.post("/", authMiddleware, approvalMiddleware, requireRole("customer"), orderController.createOrder);
router.get("/", authMiddleware, approvalMiddleware, orderController.getOrders);
router.put("/:id/status", authMiddleware, approvalMiddleware, requireRole("restaurant"), orderController.updateStatus);
router.put("/:id/assign-driver", authMiddleware, adminMiddleware, orderController.assignDriver);


module.exports = router;