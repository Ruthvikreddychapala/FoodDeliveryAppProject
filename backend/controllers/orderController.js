const Order = require("../models/Order");

const Restaurant = require("../models/Restaurant");

const User = require("../models/User");


// ======================================
// CREATE ORDER
// ======================================

exports.createOrder = async (req, res) => {

  try {

    const {
      restaurantId,
      items,
      totalPrice
    } = req.body;

    // CHECK RESTAURANT
    const restaurant =
      await Restaurant.findById(
        restaurantId
      );

    if (!restaurant) {

      return res.status(404).json({
        message:
          "Restaurant not found"
      });
    }

    // CREATE ORDER
    const order =
      await Order.create({

        user: req.user._id,

        restaurant:
          restaurantId,

        items,

        totalPrice,

        status: "pending"
      });

    // LOYALTY POINTS
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: {
          loyaltyPoints:
            Math.floor(
              totalPrice / 10
            )
        }
      }
    );

    res.status(201).json(order);

  } catch (error) {

    console.log(
      "CREATE ORDER ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================
// GET ALL ORDERS
// ======================================

exports.getOrders = async (req, res) => {

  try {

    const orders =
      await Order.find()

      .populate(
        "user",
        "name email"
      )

      .populate(
        "restaurant",
        "name address cuisine"
      )

      .populate({
        path: "driver",
        select:
          "name email location",
        options: {
          strictPopulate: false
        }
      });

    res.json(orders);

  } catch (error) {

    console.log(
      "GET ORDERS ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================
// UPDATE STATUS
// ======================================

exports.updateStatus = async (req, res) => {

  try {

    const { status } =
      req.body;

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message:
          "Order not found"
      });
    }

    const allowedStatuses = [

      "accepted",

      "preparing",

      "out_for_delivery",

      "delivered"
    ];

    if (
      !allowedStatuses.includes(
        status
      )
    ) {

      return res.status(400).json({
        message:
          "Invalid status"
      });
    }

    order.status = status;

    await order.save();

    res.json(order);

  } catch (error) {

    console.log(
      "UPDATE STATUS ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================
// ASSIGN DRIVER
// ======================================

exports.assignDriver = async (req, res) => {

  try {

    const { driverId } =
      req.body;

    // CHECK DRIVER
    const driver =
      await User.findById(
        driverId
      );

    if (
      !driver ||
      driver.role !== "driver"
    ) {

      return res.status(400).json({
        message:
          "Invalid driver"
      });
    }

    // UPDATE ORDER
    const order =
      await Order.findByIdAndUpdate(

        req.params.id,

        {
          driver: driverId,

          status:
            "out_for_delivery"
        },

        {
          new: true
        }
      )

      .populate(
        "driver",
        "name email location"
      )

      .populate(
        "user",
        "name email"
      )

      .populate(
        "restaurant",
        "name"
      );

    res.json(order);

  } catch (error) {

    console.log(
      "ASSIGN DRIVER ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
};


// ======================================
// UPDATE DRIVER LOCATION
// ======================================

exports.updateDriverLocation =
  async (req, res) => {

    try {

      const {
        latitude,
        longitude
      } = req.body;

      await User.findByIdAndUpdate(

        req.user._id,

        {
          location: {
            latitude,
            longitude
          }
        }
      );

      res.json({
        message:
          "Driver location updated"
      });

    } catch (error) {

      console.log(
        "LOCATION UPDATE ERROR:",
        error
      );

      res.status(500).json({
        error: error.message
      });
    }
  };