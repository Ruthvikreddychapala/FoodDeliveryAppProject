import React, {
  useEffect,
  useState
} from "react";

import Navbar from "../../components/Navbar";

import io from "socket.io-client";

const socket =
  io("http://localhost:5000");

export default function Dashboard() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // FETCH ORDERS
  const fetchOrders =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            "http://localhost:5000/api/orders",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        // ONLY DRIVER ORDERS
        const driverOrders =
          data.filter(
            (order) =>
              order.driver?._id ===
              user._id
          );

        setOrders(driverOrders);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // UPDATE STATUS
  const updateStatus =
    async (
      orderId,
      status
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(
          `http://localhost:5000/api/orders/${orderId}/status`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              status
            })
          }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);
      }
    };

  // LIVE LOCATION UPDATE
  useEffect(() => {

    if (
      navigator.geolocation
    ) {

      const interval =
        setInterval(() => {

          navigator.geolocation.getCurrentPosition(

            (
              position
            ) => {

              socket.emit(
                "driverLocationUpdate",
                {
                  driverId:
                    user._id,

                  latitude:
                    position
                      .coords
                      .latitude,

                  longitude:
                    position
                      .coords
                      .longitude
                }
              );

              console.log(
                "Location Sent"
              );
            },

            (error) => {
              console.log(error);
            }

          );

        }, 5000);

      return () =>
        clearInterval(
          interval
        );
    }

  }, []);

  // INITIAL FETCH
  useEffect(() => {

    fetchOrders();

  }, []);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center text-2xl">

        Loading Orders...

      </div>
    );
  }

  return (

    <div className="bg-slate-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold mb-2">

              Driver Dashboard

            </h1>

            <p className="text-gray-400">

              Manage assigned deliveries

            </p>

          </div>

          <div className="bg-orange-500 px-5 py-3 rounded-xl text-lg font-bold">

            Driver Mode

          </div>

        </div>

        {/* NO ORDERS */}
        {orders.length === 0 ? (

          <div className="bg-slate-900 p-8 rounded-2xl text-center text-gray-400 text-xl">

            No Assigned Orders

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {orders.map(
              (order) => (

                <div
                  key={order._id}
                  className="bg-slate-900 p-6 rounded-2xl shadow-lg"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start mb-5">

                    <div>

                      <h2 className="text-2xl font-bold mb-2">

                        {
                          order.user
                            ?.name
                        }

                      </h2>

                      <p className="text-gray-400 text-sm mb-1">

                        {
                          order.user
                            ?.email
                        }

                      </p>

                      <p className="text-orange-400 text-lg font-bold">

                        ₹
                        {" "}
                        {
                          order.totalPrice
                        }

                      </p>

                    </div>

                    <div className="bg-blue-500 px-4 py-2 rounded-xl text-sm font-bold capitalize">

                      {order.status.replaceAll(
                        "_",
                        " "
                      )}

                    </div>

                  </div>

                  {/* ITEMS */}
                  <div className="space-y-3 mb-6">

                    {order.items.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
                          className="bg-slate-800 px-4 py-3 rounded-xl flex justify-between"
                        >

                          <span>

                            {
                              item.name
                            }

                          </span>

                          <span className="text-gray-400">

                            ×
                            {" "}
                            {
                              item.quantity
                            }

                          </span>

                        </div>
                      )
                    )}

                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "out_for_delivery"
                        )
                      }
                      className="flex-1 bg-orange-500 hover:bg-orange-600 transition-all py-3 rounded-xl font-bold"
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
                      className="flex-1 bg-green-500 hover:bg-green-600 transition-all py-3 rounded-xl font-bold"
                    >

                      Delivered

                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}