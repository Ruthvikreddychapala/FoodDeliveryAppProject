const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, items, totalPrice } = req.body;

    // 1. Check restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // 2. Create order
    const order = await Order.create({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalPrice
    });

    const User = require("../models/User"); 

    await User.findByIdAndUpdate(req.user._id, {
    $inc: { loyaltyPoints: Math.floor(totalPrice / 10) }
});

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant")
      .populate("driver", "name");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Restaurant controls early stages
    if (req.user.role === "restaurant") {
      if (!["accepted", "preparing"].includes(status)) {
        return res.status(403).json({ message: "Invalid status for restaurant" });
      }
    }

    // Driver controls delivery stages
    if (req.user.role === "driver") {
      if (!["out_for_delivery", "delivered"].includes(status)) {
        return res.status(403).json({ message: "Invalid status for driver" });
      }
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignDriver = async (req, res) => {
  try {
    const { driverId } = req.body;

    // Check driver exists
    const driver = await User.findById(driverId);

    if (!driver || driver.role !== "driver") {
      return res.status(400).json({ message: "Invalid driver" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { driver: driverId, status: "out_for_delivery" },
      { new: true }
    ).populate("driver", "name email");

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};