const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema({

    user: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    restaurant: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Restaurant"
    },

    items: [

      {
        name: String,

        price: Number,

        quantity: Number
      }
    ],

    totalPrice: {
      type: Number,
      default: 0
    },

    status: {
      type: String,

      enum: [

        "pending",

        "accepted",

        "preparing",

        "out_for_delivery",

        "delivered"
      ],

      default: "pending"
    },

    driver: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      default: null
    }

  },

  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );