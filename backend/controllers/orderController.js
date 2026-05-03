const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

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

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};