const Restaurant = require("../models/Restaurant");

// Create restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      owner: req.user._id
    });

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("owner", "name email");

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { name, price } = req.body;

    const restaurant = await Restaurant.findById(req.params.id);

    restaurant.menu.push({ name, price });

    await restaurant.save();

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};