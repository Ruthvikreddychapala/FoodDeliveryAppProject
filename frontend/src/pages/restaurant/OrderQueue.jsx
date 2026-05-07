import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function OrderQueue() {

  const [orders, setOrders] = useState([]);

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log(data);

      // CURRENT USER
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // FILTER ONLY THIS RESTAURANT
      const filteredOrders = data.filter(
        (order) =>
          order.restaurant &&
          order.restaurant.owner === user._id
      );

      setOrders(filteredOrders);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // UPDATE STATUS
  const updateStatus = async (
    orderId,
    status
  ) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            status
          })
        }
      );

      const data = await response.json();

      console.log(data);

      fetchOrders();

    } catch (error) {

      console.log(error);

      alert("Failed to update order");
    }
  };

  return (

    <div className="bg-slate-950 min-h-screen text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Order Queue
          </h1>

          <p className="text-gray-400 mt-3">
            Manage incoming customer orders
          </p>

        </div>

        <Link to="/restaurant/dashboard">

          <button className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-bold">
            Back To Dashboard
          </button>

        </Link>

      </div>

      {/* EMPTY */}
      {orders.length === 0 && (

        <div className="bg-slate-900 p-10 rounded-2xl text-center text-gray-400 text-xl">

          No Orders Available

        </div>

      )}

      {/* ORDERS */}
      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-slate-900 p-8 rounded-2xl shadow-xl"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-10">

              {/* LEFT */}
              <div className="flex-1">

                <h2 className="text-3xl font-bold mb-5">

                  Order #
                  {order._id.slice(-5)}

                </h2>

                {/* CUSTOMER */}
                <div className="mb-6">

                  <h3 className="text-xl font-bold mb-2 text-orange-400">

                    Customer Details

                  </h3>

                  <p>
                    Name:
                    {" "}
                    {order.user?.name || "N/A"}
                  </p>

                  <p>
                    Email:
                    {" "}
                    {order.user?.email || "N/A"}
                  </p>

                </div>

                {/* ITEMS */}
                <div className="mb-6">

                  <h3 className="text-xl font-bold mb-2 text-orange-400">

                    Ordered Items

                  </h3>

                  {order.items.map((item, index) => (

                    <div
                      key={index}
                      className="mb-3"
                    >

                      <p>

                        {item.name}
                        {" "}
                        ×
                        {" "}
                        {item.quantity}

                      </p>

                      <p className="text-gray-400">

                        ₹
                        {" "}
                        {item.price}

                      </p>

                    </div>

                  ))}

                </div>

                {/* TOTAL */}
                <div className="mb-6">

                  <h3 className="text-xl font-bold mb-2 text-orange-400">

                    Total Price

                  </h3>

                  <p className="text-2xl font-bold text-green-400">

                    ₹
                    {" "}
                    {order.totalPrice}

                  </p>

                </div>

                {/* DRIVER */}
                <div className="mb-6">

                  <h3 className="text-xl font-bold mb-2 text-orange-400">

                    Driver Details

                  </h3>

                  {order.driver ? (

                    <div>

                      <p>

                        Name:
                        {" "}
                        {order.driver.name}

                      </p>

                      <p>

                        Email:
                        {" "}
                        {order.driver.email}

                      </p>

                      {/* LOCATION */}
                      {order.driver.location && (

                        <div className="mt-4">

                          <p className="text-green-400">

                            Live Driver Location

                          </p>

                          <p>

                            Latitude:
                            {" "}
                            {order.driver.location.latitude}

                          </p>

                          <p>

                            Longitude:
                            {" "}
                            {order.driver.location.longitude}

                          </p>

                        </div>

                      )}

                    </div>

                  ) : (

                    <p className="text-red-400">

                      No Driver Assigned

                    </p>

                  )}

                </div>

                {/* STATUS */}
                <div>

                  <span
                    className={`px-5 py-3 rounded-xl font-bold ${
                      order.status === "pending"
                        ? "bg-yellow-500 text-black"
                        : order.status === "accepted"
                        ? "bg-green-500"
                        : order.status === "preparing"
                        ? "bg-blue-500"
                        : order.status === "out_for_delivery"
                        ? "bg-purple-500"
                        : order.status === "delivered"
                        ? "bg-green-700"
                        : "bg-red-500"
                    }`}
                  >

                    {order.status}

                  </span>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-4 min-w-[220px]">

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "accepted"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 p-4 rounded-xl font-bold"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "preparing"
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl font-bold"
                >
                  Preparing
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "out_for_delivery"
                    )
                  }
                  className="bg-purple-500 hover:bg-purple-600 p-4 rounded-xl font-bold"
                >
                  Out For Delivery
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "delivered"
                    )
                  }
                  className="bg-orange-500 hover:bg-orange-600 p-4 rounded-xl font-bold"
                >
                  Delivered
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}