import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

export default function Home() {

  const navigate = useNavigate();

  const [restaurants, setRestaurants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH RESTAURANTS
  useEffect(() => {

    const fetchRestaurants =
      async () => {

        try {

          const response =
            await fetch(
              "http://localhost:5000/api/restaurants"
            );

          const data =
            await response.json();

          console.log(data);

          setRestaurants(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchRestaurants();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <Navbar />

      <div className="p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-6xl font-bold mb-3">

              Food Delivery

            </h1>

            <p className="text-gray-400 text-xl">

              Discover restaurants near you

            </p>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="text-2xl text-center mt-32">

            Loading Restaurants...

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {restaurants.map(
              (restaurant) => (

                <div
                  key={restaurant._id}
                  className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300"
                >

                  {/* IMAGE */}
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                    alt="food"
                    className="w-full h-64 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-6">

                    <h2 className="text-4xl font-bold mb-3">

                      {restaurant.name}

                    </h2>

                    <p className="text-gray-400 text-xl mb-2">

                      {restaurant.cuisine}

                    </p>

                    <p className="text-gray-500 text-lg mb-6">

                      {restaurant.address}

                    </p>

                    <Link
                      to={`/menu/${restaurant._id}`}
                    >

                      <button className="w-full bg-orange-500 hover:bg-orange-600 transition-all p-4 rounded-2xl text-xl font-bold">

                        View Menu

                      </button>

                    </Link>

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