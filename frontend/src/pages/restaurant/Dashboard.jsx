import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Rahul",
      item: "Chicken Burger",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Ananya",
      item: "Pepperoni Pizza",
      status: "Preparing",
    },
    {
      id: 3,
      customer: "Varun",
      item: "Hyderabadi Biryani",
      status: "Ready",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />

      <div className="p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            Restaurant Dashboard
          </h1>

          <div className="flex gap-4">
            <Link to="/restaurant/menu">
              <button className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-bold">
                Menu Management
              </button>
            </Link>

            <Link to="/restaurant/orders">
              <button className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-bold">
                Order Queue
              </button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {order.customer}
                  </h2>

                  <p className="text-gray-300 mt-1">
                    Ordered: {order.item}
                  </p>

                  <span
                    className={`inline-block mt-3 px-4 py-2 rounded-lg font-bold ${
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

                <div className="flex gap-3 flex-wrap">
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
                      updateStatus(order.id, "Rejected")
                    }
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Reject
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}