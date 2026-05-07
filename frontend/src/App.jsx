// frontend/src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";

// AUTH PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";

// CUSTOMER PAGES
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Tracking from "./pages/Tracking";
import MyOrders from "./pages/MyOrders";

// RESTAURANT PAGES
import RestaurantDashboard from "./pages/restaurant/Dashboard";
import OrderQueue from "./pages/restaurant/OrderQueue";

// DRIVER PAGES
import DriverDashboard from "./pages/driver/Dashboard";




function App() {
  return (
    <Routes>

      {/* DEFAULT ROUTE */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CUSTOMER ROUTES */}
      <Route path="/home" element={<Home />} />
      <Route path="/menu/:id" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/tracking/:id" element={<Tracking />} />
      

      {/* RESTAURANT ROUTES */}
      <Route
        path="/restaurant/dashboard"
        element={<RestaurantDashboard />}
      />

      <Route
        path="/restaurant/orders"
        element={<OrderQueue />}
      />

      {/* DRIVER ROUTES */}
      <Route
        path="/driver/dashboard"
        element={<DriverDashboard />}
      />

      <Route
  path="/my-orders"
  element={<MyOrders />}
/>

    </Routes>

    
  );
}

export default App;