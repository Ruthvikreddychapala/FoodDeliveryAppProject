import React, {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import { useCart } from "../context/CartContext";

export default function Menu() {

  const { id } = useParams();

  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty
  } = useCart();

  const [restaurant, setRestaurant] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH RESTAURANT
  useEffect(() => {

    const fetchRestaurant =
      async () => {

        try {

          const response =
            await fetch(
              `http://localhost:5000/api/restaurants/${id}`
            );

          const data =
            await response.json();

          setRestaurant(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchRestaurant();

  }, [id]);

  // GET CART ITEM
  const getCartItem = (itemId) => {

    return cart.find(
      (item) =>
        item.id === itemId
    );
  };

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-2xl">

        Loading Menu...

      </div>
    );
  }

  // NOT FOUND
  if (!restaurant) {

    return (

      <div className="min-h-screen bg-slate-950 text-red-500 flex items-center justify-center text-2xl">

        Restaurant Not Found

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <Navbar />

      <div className="p-8">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-3">

            {restaurant.name}

          </h1>

          <p className="text-gray-400 text-lg">

            {restaurant.cuisine}

          </p>

        </div>

        {/* MENU */}
        {!restaurant.menu ||
        restaurant.menu.length === 0 ? (

          <div className="bg-slate-900 rounded-2xl p-10 text-center text-gray-400 text-xl">

            No Menu Items Available

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {restaurant.menu.map(
              (item, index) => {

                const itemId =
                  item._id || item.name;

                const cartItem =
                  getCartItem(itemId);

                return (

                  <div
                    key={index}
                    className="bg-slate-900 rounded-2xl p-6 shadow-xl"
                  >

                    <h2 className="text-2xl font-bold mb-3">

                      {item.name}

                    </h2>

                    <p className="text-orange-400 text-xl mb-5">

                      ₹ {item.price}

                    </p>

                    {/* ADD BUTTON */}
                    {!cartItem ? (

                      <button
                        onClick={() =>
                          addToCart({
                            id: itemId,
                            name: item.name,
                            price: item.price,
                            restaurantId:
                              restaurant._id,
                            restaurantName:
                              restaurant.name
                          })
                        }
                        className="w-full bg-orange-500 hover:bg-orange-600 transition-all p-3 rounded-xl font-bold"
                      >

                        Add To Cart

                      </button>

                    ) : (

                      <div className="flex items-center justify-center gap-5">

                        <button
                          onClick={() =>
                            decreaseQty(
                              itemId
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 w-12 h-12 rounded-xl text-2xl font-bold"
                        >

                          -

                        </button>

                        <span className="text-2xl font-bold">

                          {
                            cartItem.quantity
                          }

                        </span>

                        <button
                          onClick={() =>
                            increaseQty(
                              itemId
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-xl text-2xl font-bold"
                        >

                          +

                        </button>

                      </div>

                    )}

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}