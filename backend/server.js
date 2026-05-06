const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
delete mongoose.connection.models['User'];
const User = require("./models/User");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("API running...");
});

/* CREATE HTTP SERVER */
const server = http.createServer(app);

/* SOCKET.IO */
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

/* SOCKET CONNECTION */
io.on("connection", (socket) => {

  console.log("✅ User Connected:", socket.id);

  socket.on("driverLocationUpdate", async (data) => {

    console.log("📍 Driver Location:", data);

    try {

      const updatedUser = await User.findByIdAndUpdate(
  data.driverId,
  {
    location: {
      latitude: data.latitude,
      longitude: data.longitude
    }
  },
  { new: true }
);

console.log(updatedUser);

      io.emit("driverLocationChanged", data);

    } catch (error) {
      console.log(error);
    }

  });

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected");
  });

});

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    server.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log("❌ DB Error:", err);
  });