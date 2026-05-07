import { Routes, Route } from "react-router-dom";

import Home from "./pages/customer/Home";
import MenuPage from "./pages/customer/MenuPage";
import CartPage from "./pages/customer/CartPage";
import TrackingPage from "./pages/customer/TrackingPage";
import PaymentSuccess from "./pages/customer/PaymentSuccess";

import RestaurantDashboard from "./pages/restaurant/Dashboard";
import MenuManager from "./pages/restaurant/MenuManager";
import OrderQueue from "./pages/restaurant/OrderQueue";

import DriverDashboard from "./pages/driver/Dashboard";

function App() {
  return (
    <Routes>
      {/* CUSTOMER */}
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/success" element={<PaymentSuccess />} />

      {/* RESTAURANT */}
      <Route
        path="/restaurant/dashboard"
        element={<RestaurantDashboard />}
      />

      <Route
        path="/restaurant/menu"
        element={<MenuManager />}
      />

      <Route
        path="/restaurant/orders"
        element={<OrderQueue />}
      />

      {/* DRIVER */}
      <Route
        path="/driver/dashboard"
        element={<DriverDashboard />}
      />
    </Routes>
  );
}

export default App;