import React from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";

export default function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const { cart } = useCart();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // TOTAL CART ITEMS
  const totalItems = cart.reduce(
    (acc, item) =>
      acc + item.quantity,
    0
  );

  // LOGOUT
  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <nav className="bg-black text-white px-8 py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">

      {/* LOGO */}
      <Link to="/home">

        <h1 className="text-3xl font-bold text-orange-500">

          FoodExpress

        </h1>

      </Link>

      {/* NAVIGATION */}
      <div className="flex items-center gap-6 text-lg">

        {/* CUSTOMER */}
        {user?.role === "customer" && (

          <>

            <Link
              to="/home"
              className={`hover:text-orange-400 transition ${
                location.pathname === "/home"
                  ? "text-orange-500 font-bold"
                  : ""
              }`}
            >

              Home

            </Link>

            <Link
              to="/cart"
              className={`hover:text-orange-400 transition ${
                location.pathname === "/cart"
                  ? "text-orange-500 font-bold"
                  : ""
              }`}
            >

              Cart ({totalItems})

            </Link>

            <Link
              to="/my-orders"
              className={`hover:text-orange-400 transition ${
                location.pathname === "/my-orders"
                  ? "text-orange-500 font-bold"
                  : ""
              }`}
            >

              My Orders

            </Link>

          </>

        )}

        {/* RESTAURANT */}
        {user?.role === "restaurant" && (

          <>

            <Link
              to="/restaurant/dashboard"
              className={`hover:text-orange-400 transition ${
                location.pathname ===
                "/restaurant/dashboard"
                  ? "text-orange-500 font-bold"
                  : ""
              }`}
            >

              Dashboard

            </Link>

            <Link
              to="/restaurant/orders"
              className={`hover:text-orange-400 transition ${
                location.pathname ===
                "/restaurant/orders"
                  ? "text-orange-500 font-bold"
                  : ""
              }`}
            >

              Orders

            </Link>

          </>

        )}

        {/* DRIVER */}
        {user?.role === "driver" && (

          <Link
            to="/driver/dashboard"
            className={`hover:text-orange-400 transition ${
              location.pathname ===
              "/driver/dashboard"
                ? "text-orange-500 font-bold"
                : ""
            }`}
          >

            Driver Dashboard

          </Link>

        )}

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold transition"
        >

          Logout

        </button>

      </div>

    </nav>
  );
}