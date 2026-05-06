// backend/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["customer", "restaurant", "driver", "admin"],
    default: "customer"
  },

  isApproved: {
    type: Boolean,
    default: false
  },

  kycDetails: {
    aadhaar: String,
    pan: String
  },

  location: {
    latitude: {
      type: Number,
      default: 0
    },

    longitude: {
      type: Number,
      default: 0
    }
  },

  loyaltyPoints: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);