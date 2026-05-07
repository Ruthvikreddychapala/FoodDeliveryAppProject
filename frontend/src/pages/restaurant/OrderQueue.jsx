import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function OrderQueue() {

  const [orders, setOrders] = useState([
    {
      id: 101,
      customer: "Rahul",
      item: "Chicken Burger",
      status: "Pending",
    },

    {
      id: 102,
      customer: "Ananya",
      item: "Pepperoni Pizza",
      status: "Preparing",
    },

    {
      id: 103,
      customer: "Varun",
      item: "Hyderabadi Biryani",
      status: "Ready",
    },
  ]);

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  };

  const removeOrder = (id) => {
    setOrders(
      orders.filter((order) => order.id !== id)
    );
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Order Queue
          </h1>

          <Link to="/restaurant/dashboard">
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-bold">
              Back To Dashboard
            </button>
          </Link>

        </div>

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg"
            >

              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Customer: {order.customer}
                  </p>

                  <p className="text-gray-400">
                    Item: {order.item}
                  </p>

                  <div className="mt-4">

                    <span
                      className={`px-4 py-2 rounded-lg font-bold ${
                        order.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : order.status === "Preparing"
                          ? "bg-blue-500"
                          : order.status === "Ready"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={() =>
                      updateStatus(order.id, "Accepted")
                    }
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order.id, "Preparing")
                    }
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    Preparing
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order.id, "Ready")
                    }
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
                  >
                    Ready
                  </button>

                  <button
                    onClick={() => removeOrder(order.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}