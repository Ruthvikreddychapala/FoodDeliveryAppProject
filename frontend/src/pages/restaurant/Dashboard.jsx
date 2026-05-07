import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../../components/Navbar";

export default function Dashboard() {

  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [restaurant, setRestaurant] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [menuName, setMenuName] =
    useState("");

  const [menuPrice, setMenuPrice] =
    useState("");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // FETCH DATA
  const fetchData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // RESTAURANTS
        const restaurantResponse =
          await fetch(
            "http://localhost:5000/api/restaurants"
          );

        const restaurants =
          await restaurantResponse.json();

        const foundRestaurant =
        restaurants.find(
        (r) =>
        r.owner?._id === user._id
        );

        setRestaurant(
          foundRestaurant
        );

        // ORDERS
        const orderResponse =
          await fetch(
            "http://localhost:5000/api/orders",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const allOrders =
          await orderResponse.json();

        const restaurantOrders =
          allOrders.filter(
            (order) =>
              order.restaurant?._id ===
              foundRestaurant?._id
          );

        setOrders(
          restaurantOrders
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ADD MENU ITEM
  const addMenuItem =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(
          `http://localhost:5000/api/restaurants/${restaurant._id}/menu`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              name: menuName,
              price: menuPrice
            })
          }
        );

        setMenuName("");

        setMenuPrice("");

        fetchData();

      } catch (error) {

        console.log(error);
      }
    };

  // DELETE MENU ITEM
  const deleteMenuItem =
    async (menuId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(
          `http://localhost:5000/api/restaurants/${restaurant._id}/menu/${menuId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchData();

      } catch (error) {

        console.log(error);
      }
    };

  // EDIT MENU ITEM
  const editMenuItem =
    async (item) => {

      try {

        const newName =
          prompt(
            "Enter new name",
            item.name
          );

        const newPrice =
          prompt(
            "Enter new price",
            item.price
          );

        if (
          !newName ||
          !newPrice
        ) return;

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(
          `http://localhost:5000/api/restaurants/${restaurant._id}/menu/${item._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              name: newName,
              price: newPrice
            })
          }
        );

        fetchData();

      } catch (error) {

        console.log(error);
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

        fetchData();

      } catch (error) {

        console.log(error);
      }
    };

  // INITIAL FETCH
  useEffect(() => {

    fetchData();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center text-2xl">

        Loading Dashboard...

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

              Restaurant Dashboard

            </h1>

            <p className="text-gray-400">

              Manage menu and orders

            </p>

          </div>

        </div>

        {/* MENU */}
        {restaurant && (

          <div className="bg-slate-900 p-6 rounded-2xl mb-10">

            <h2 className="text-3xl font-bold mb-6">

              Menu Management

            </h2>

            {/* ADD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

              <input
                type="text"
                placeholder="Food Name"
                value={menuName}
                onChange={(e) =>
                  setMenuName(
                    e.target.value
                  )
                }
                className="bg-slate-800 p-3 rounded-xl outline-none"
              />

              <input
                type="number"
                placeholder="Price"
                value={menuPrice}
                onChange={(e) =>
                  setMenuPrice(
                    e.target.value
                  )
                }
                className="bg-slate-800 p-3 rounded-xl outline-none"
              />

              <button
                onClick={addMenuItem}
                className="bg-green-500 hover:bg-green-600 rounded-xl font-bold"
              >

                Add Item

              </button>

            </div>

            {/* MENU ITEMS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {restaurant.menu?.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-slate-800 p-5 rounded-2xl"
                  >

                    <h3 className="text-xl font-bold mb-2">

                      {item.name}

                    </h3>

                    <p className="text-orange-400 text-lg font-bold mb-5">

                      ₹ {item.price}

                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          editMenuItem(
                            item
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full"
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          deleteMenuItem(
                            item._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full"
                      >

                        Delete

                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}