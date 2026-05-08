const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ======================================
// REGISTER
// ======================================

exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
      aadhaar,
      pan
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // APPROVAL LOGIC
    let isApproved = false;

    if (
      role === "customer" ||
      role === "admin"
    ) {

      isApproved = true;
    }

    // CREATE USER
    const user =
      await User.create({

        name,

        email,

        password:
          hashedPassword,

        role,

        isApproved,

        kycDetails:
          role === "driver"
            ? {
                aadhaar,
                pan
              }
            : {}
      });

    // ======================================
    // AUTO CREATE RESTAURANT
    // ======================================

    if (role === "restaurant") {

      await Restaurant.create({

        name:
          `${name}'s Restaurant`,

        owner:
          user._id,

        address:
          "Hyderabad",

        cuisine:
          "Indian",

        menu: [

          {
            name:
              "Chicken Burger",

            price: 199
          },

          {
            name:
              "Pizza",

            price: 299
          }
        ]
      });
    }

    // RESPONSE
    res.status(201).json({

      message:
        "User registered successfully",

      user: {

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        isApproved:
          user.isApproved
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        error.message
    });
  }
};


// ======================================
// LOGIN
// ======================================

exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // CHECK USER
    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }

    // PASSWORD CHECK
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }

    // TOKEN
    const token =
      jwt.sign(
        {
          id:
            user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn:
            "7d"
        }
      );

    // RESPONSE
    res.json({

      message:
        "Login successful",

      token,

      user: {

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        isApproved:
          user.isApproved,

        loyaltyPoints:
          user.loyaltyPoints
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        error.message
    });
  }
};