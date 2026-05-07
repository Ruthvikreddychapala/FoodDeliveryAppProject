const Restaurant =
  require("../models/Restaurant");


// ======================================
// CREATE RESTAURANT
// ======================================

const createRestaurant =
  async (req, res) => {

    try {

      const restaurant =
        await Restaurant.create({

          ...req.body,

          owner: req.user._id
        });

      res.status(201).json(
        restaurant
      );

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  };


// ======================================
// GET RESTAURANTS
// ======================================

const getRestaurants =
  async (req, res) => {

    try {

      let restaurants;

      // RESTAURANT OWNER
      if (
        req.user &&
        req.user.role ===
          "restaurant"
      ) {

        restaurants =
          await Restaurant.find({
            owner: req.user._id
          });

      } else {

        restaurants =
          await Restaurant.find()

          .populate(
            "owner",
            "name email"
          );
      }

      res.json(restaurants);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  };


// ======================================
// GET SINGLE RESTAURANT
// ======================================

const getRestaurantById =
  async (req, res) => {

    try {

      const restaurant =
        await Restaurant.findById(
          req.params.id
        );

      if (!restaurant) {

        return res.status(404).json({
          message:
            "Restaurant not found"
        });
      }

      res.json(restaurant);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  };


// ======================================
// ADD MENU ITEM
// ======================================

const addMenuItem =
  async (req, res) => {

    try {

      const {
        name,
        price
      } = req.body;

      const restaurant =
        await Restaurant.findById(
          req.params.id
        );

      if (!restaurant) {

        return res.status(404).json({
          message:
            "Restaurant not found"
        });
      }

      // OWNER CHECK
      if (
        restaurant.owner.toString() !==
        req.user._id.toString()
      ) {

        return res.status(403).json({
          message:
            "Unauthorized"
        });
      }

      restaurant.menu.push({
        name,
        price
      });

      await restaurant.save();

      const updatedRestaurant =
        await Restaurant.findById(
          req.params.id
        );

      res.json(
        updatedRestaurant
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  };


// ======================================
// EDIT MENU ITEM
// ======================================

const editMenuItem =
  async (req, res) => {

    try {

      const {
        name,
        price
      } = req.body;

      const restaurant =
        await Restaurant.findById(
          req.params.id
        );

      if (!restaurant) {

        return res.status(404).json({
          message:
            "Restaurant not found"
        });
      }

      const menuItem =
        restaurant.menu.id(
          req.params.menuId
        );

      if (!menuItem) {

        return res.status(404).json({
          message:
            "Menu item not found"
        });
      }

      menuItem.name = name;

      menuItem.price = price;

      await restaurant.save();

      res.json(restaurant);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  };


// ======================================
// DELETE MENU ITEM
// ======================================

const deleteMenuItem =
  async (req, res) => {

    try {

      const restaurant =
        await Restaurant.findById(
          req.params.id
        );

      if (!restaurant) {

        return res.status(404).json({
          message:
            "Restaurant not found"
        });
      }

      restaurant.menu =
        restaurant.menu.filter(
          (item) =>
            item._id.toString() !==
            req.params.menuId
        );

      await restaurant.save();

      res.json(restaurant);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  };


// ======================================
// EXPORTS
// ======================================

module.exports = {

  createRestaurant,

  getRestaurants,

  getRestaurantById,

  addMenuItem,

  editMenuItem,

  deleteMenuItem
};