import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

export default function MyOrders() {

  const navigate =
    useNavigate();

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

        // CUSTOMER ORDERS
        const customerOrders =
          data.filter(
            (order) =>
              order.user?._id ===
              user._id
          );

        setOrders(
          customerOrders
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // AUTO REFRESH
  useEffect(() => {

    fetchOrders();

    const interval =
      setInterval(() => {

        fetchOrders();

      }, 5000);

    return () =>
      clearInterval(interval);

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

              My Orders

            </h1>

            <p className="text-gray-400">

              Track all your food orders

            </p>

          </div>

          <button
            onClick={() => {

              localStorage.clear();

              navigate("/login");
            }}
            className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold"
          >

            Logout

          </button>

        </div>

        {/* NO ORDERS */}
        {orders.length === 0 ? (

          <div className="bg-slate-900 p-8 rounded-2xl text-center text-gray-400 text-xl">

            No Orders Found

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {orders.map(
              (order) => (

                <div
                  key={order._id}
                  className="bg-slate-900 p-6 rounded-2xl"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start mb-5">

                    <div>

                      <h2 className="text-2xl font-bold mb-2">

                        {
                          order.restaurant
                            ?.name
                        }

                      </h2>

                      <p className="text-gray-400 text-sm">

                        Order ID:
                        {" "}
                        {
                          order._id.slice(-6)
                        }

                      </p>

                    </div>

                    <div className="bg-orange-500 px-4 py-2 rounded-xl text-sm font-bold capitalize">

                      {order.status.replaceAll(
                        "_",
                        " "
                      )}

                    </div>

                  </div>

                  {/* ITEMS */}
                  <div className="space-y-3 mb-5">

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

                  {/* DRIVER */}
                  {order.driver && (

                    <div className="bg-slate-800 p-4 rounded-xl mb-5">

                      <p className="text-sm text-gray-400 mb-1">

                        Driver

                      </p>

                      <h3 className="text-lg font-bold">

                        {
                          order.driver
                            ?.name
                        }

                      </h3>

                      <p className="text-gray-400 text-sm">

                        {
                          order.driver
                            ?.email
                        }

                      </p>

                    </div>

                  )}

                  {/* TOTAL */}
                  <div className="text-orange-400 text-xl font-bold mb-5">

                    ₹
                    {" "}
                    {order.totalPrice}

                  </div>

                  {/* TRACK BUTTON */}
                  <button
                    onClick={() =>
                      navigate(
                        `/tracking/${order._id}`
                      )
                    }
                    className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-bold"
                  >

                    Track Order

                  </button>

                </div>
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}