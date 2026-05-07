const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

// MODELS
const User = require("./models/User");

// ROUTE MIDDLEWARE
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});

// SOCKET.IO SETUP
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log("✅ User Connected:", socket.id);

  // DRIVER LOCATION UPDATE
  socket.on("driverLocationUpdate", async (data) => {

    console.log("📍 Driver Location:", data);

    try {

      const updatedUser = await User.findByIdAndUpdate(
        data.driverId,
        {
          $set: {
            "location.latitude": data.latitude,
            "location.longitude": data.longitude
          }
        },
        {
          returnDocument: "after"
        }
      );

      console.log(updatedUser);

      io.emit("driverLocationChanged", data);

    } catch (error) {
      console.log(error);
    }

  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("❌ User Disconnected");
  });

});

// SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});