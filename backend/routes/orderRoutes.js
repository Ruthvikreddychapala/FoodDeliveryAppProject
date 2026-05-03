const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const approvalMiddleware = require("../middleware/approvalMiddleware");

router.post("/", authMiddleware, approvalMiddleware, orderController.createOrder);
router.get("/", authMiddleware, approvalMiddleware, orderController.getOrders);
router.put("/:id/status", authMiddleware, approvalMiddleware, orderController.updateStatus);

module.exports = router;