import React, {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";

export default function Tracking() {

  const { id } =
    useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDER
  const fetchOrder =
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

        console.log(
          "ALL ORDERS:",
          data
        );

        const foundOrder =
          data.find(
            (o) => o._id === id
          );

        console.log(
          "FOUND ORDER:",
          foundOrder
        );

        setOrder(
          foundOrder
        );

      } catch (error) {

        console.log(
          "TRACK ERROR:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  // AUTO REFRESH
  useEffect(() => {

    fetchOrder();

    const interval =
      setInterval(() => {

        fetchOrder();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [id]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-2xl">

        Loading Tracking...

      </div>
    );
  }

  // ORDER NOT FOUND
  if (!order) {

    return (

      <div className="min-h-screen bg-slate-950 text-red-500 flex items-center justify-center text-2xl">

        Order Not Found

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-8 max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-8">

          Live Order Tracking

        </h1>

        {/* STATUS */}
        <div className="bg-slate-900 p-6 rounded-2xl mb-6">

          <h2 className="text-2xl font-bold mb-4">

            Order Status

          </h2>

          <div className="bg-orange-500 inline-block px-5 py-3 rounded-xl text-lg font-bold capitalize">

            {order.status?.replaceAll(
              "_",
              " "
            )}

          </div>

        </div>

        {/* ITEMS */}
        <div className="bg-slate-900 p-6 rounded-2xl mb-6">

          <h2 className="text-2xl font-bold mb-5">

            Ordered Items

          </h2>

          <div className="space-y-4">

            {order.items?.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-slate-800 p-4 rounded-xl flex justify-between"
                >

                  <div>

                    <h3 className="font-bold text-lg">

                      {item.name}

                    </h3>

                    <p className="text-gray-400">

                      Quantity:
                      {" "}
                      {item.quantity}

                    </p>

                  </div>

                  <div className="text-orange-400 text-lg font-bold">

                    ₹ {item.price}

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* DRIVER */}
        {order.driver && (

          <div className="bg-slate-900 p-6 rounded-2xl mb-6">

            <h2 className="text-2xl font-bold mb-4">

              Driver Details

            </h2>

            <p className="text-lg mb-2">

              Name:
              {" "}
              {order.driver.name}

            </p>

            <p className="text-gray-400">

              {order.driver.email}

            </p>

          </div>

        )}

        {/* MAP */}
        {order.driver?.location && (

          <div className="bg-slate-900 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-5">

              Live Driver Location

            </h2>

            <iframe
              title="map"
              width="100%"
              height="450"
              className="rounded-2xl"
              src={`https://maps.google.com/maps?q=${order.driver.location.latitude},${order.driver.location.longitude}&z=15&output=embed`}
            />

          </div>

        )}

      </div>

    </div>
  );
}