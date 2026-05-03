const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  address: String,
  cuisine: String,

  menu: [
    {
      name: String,
      price: Number,
      available: {
        type: Boolean,
        default: true
      }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);